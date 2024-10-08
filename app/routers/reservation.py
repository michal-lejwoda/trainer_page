import datetime
import os
from typing import List, Annotated

from dotenv import load_dotenv
from fastapi import Depends, HTTPException, APIRouter, Form
from sqlalchemy import func
from sqlalchemy.orm import Session
from starlette.background import BackgroundTasks
from starlette.requests import Request

from app.database import get_db
from app.reservations.helpers import daterange, hour_range
from app.reservations.models import WorkHours, WorkingHour, Address, Plan, Trainer, \
    Reservation
from app.reservations.schemas import TimeDiff, TrainerBase, \
    WorkingHourBase, WorkHourCreate, DateRange, AddressBase, WorkHourGet, \
    GetWorkHours, TrainerId, TrainerPlans, EmailBody, ReservationOut, TrainerOut, WorkingHourOut, WorkHourOut, \
    AddressOut, PlanOut, UserOut
from app.routers.dependencies import verify_jwt_trainer_auth
from app.routers.validation import validate_user, validate_work_hours, verify_user_permission, get_work_hour_or_404
from app.send_email import send_email_background, send_email, send_mail_to_admin
from app.translation import trans as _
from app.user.dependencies import get_current_user, get_user_by_email, get_password_hash
from app.user.models import User

# from app.main import _


load_dotenv()
FRONTEND_DOMAIN = os.getenv("FRONTEND_DOMAIN")
router = APIRouter(tags=["reservation"], prefix="/api")


@router.post("/reservation")
def create_reservation(
        title: Annotated[str, Form()],
        user_id: Annotated[int, Form()],
        work_hours_id: Annotated[int, Form()],
        jwt_trainer_auth: str = Depends(verify_jwt_trainer_auth),
        db: Session = Depends(get_db)
):
    user = get_current_user(jwt_trainer_auth, db)
    user_based_on_id = validate_user(user_id, db)
    work_hours = validate_work_hours(work_hours_id, db)
    verify_user_permission(user, user_based_on_id)

    reservation_model = Reservation(
        title=title,
        work_hour_id=work_hours.id,
        user_id=user.id
    )
    work_hours.is_active = False
    db.add_all([reservation_model, work_hours])
    db.commit()
    return {"detail": _("Reservation created successfully")}


@router.get("/reservation", response_model=List[ReservationOut])
def list_reservations(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Reservation).offset(skip).limit(limit).all()


@router.get("/trainers", response_model=List[TrainerOut])
def list_trainers(db: Session = Depends(get_db)):
    return db.query(Trainer).all()


@router.get("/get_all_working_hours", response_model=List[WorkingHourOut])
def get_all_working_hours(db: Session = Depends(get_db)):
    return db.query(WorkingHour).all()


@router.post("/create_working_hour", response_model=WorkingHourOut)
def create_working_hour(working_hours: WorkingHourBase, db: Session = Depends(get_db)):
    working_hour_model = WorkingHour(
        weekday=working_hours.weekday,
        start_hour=working_hours.start_time,
        end_hour=working_hours.end_time,
        trainer_id=working_hours.trainer_id
    )

    db.add(working_hour_model)
    db.commit()
    db.refresh(working_hour_model)
    return working_hour_model


@router.delete("/delete_working_hour/{id}", response_model=dict)
def delete_working_hour(id: int, db: Session = Depends(get_db)):
    element_to_delete = db.query(WorkingHour).filter(WorkingHour.id == id).first()
    if element_to_delete is None:
        raise HTTPException(status_code=404, detail=_('Work hour not found'))
    db.delete(element_to_delete)
    db.commit()
    return {"detail": _("Work hour has been deleted successfully")}


def create_work_hour(hour_data: WorkHourCreate, db: Session):
    dumped_hour_model = hour_data.model_dump()
    db_work_hour = WorkHours(**dumped_hour_model)
    db.add(db_work_hour)
    db.commit()
    return db_work_hour


# TODO Back here
@router.post('/generate_hours_based_on_default')
def generate_hours_based_on_default(date_range: DateRange, db: Session = Depends(get_db)):
    default_hours = db.query(WorkingHour).filter(WorkingHour.trainer_id == date_range.trainer_id).all()
    for single_date in daterange(date_range.start_time, date_range.end_time):
        hours_based_on_weekday = [x for x in default_hours if x.weekday == single_date.weekday()]
        for hours in hours_based_on_weekday:
            for hour in hour_range(single_date, hours.start_hour, hours.end_hour, date_range.trainer_id):
                create_work_hour(hour, db)


@router.delete('/delete_work_hour/{id}', response_model=dict)
def delete_work_hour(id: int, db: Session = Depends(get_db)):
    element_to_delete = get_work_hour_or_404(id, db)
    db.delete(element_to_delete)
    db.commit()
    return {"detail": _("Work hour deleted successfully")}


# TODO BAck here
@router.post('/generate_hours')
def generate_hours(timediff: TimeDiff, db: Session = Depends(get_db)):
    start_time = timediff.start_time.replace(second=0, microsecond=0)
    end_time = timediff.end_time.replace(second=0, microsecond=0)
    diff = int((end_time - start_time).total_seconds() / timediff.interval)
    result = int(diff / timediff.interval)
    for i in range(result):
        actual_time = timediff.interval * i
        created_start_time = start_time + datetime.timedelta(minutes=actual_time)
        created_end_time = created_start_time + datetime.timedelta(minutes=timediff.interval)
        if db.query(WorkHours).filter(WorkHours.start_time == created_start_time,
                                      WorkHours.end_time == created_end_time).first() is None:
            work_hours_model = WorkHours()
            work_hours_model.start_time = created_start_time
            work_hours_model.end_time = created_end_time
            work_hours_model.trainer_id = timediff.trainer_id
            work_hours_model.is_active = True
            db.add(work_hours_model)
            db.commit()


@router.get("/get_test_datetime_work_hours", response_model=WorkHourOut)
def get_test_datetime_work_hours(start_time: datetime.datetime, end_time: datetime.datetime,
                                 db: Session = Depends(get_db)):
    return db.query(WorkHours).filter(WorkHours.start_time == start_time, WorkHours.end_time == end_time).first()


@router.get("/get_test_work_hours", response_model=list[WorkHourOut])
def get_test_work_hours(db: Session = Depends(get_db)):
    return db.query(WorkHours).filter(func.date(WorkHours.start_time) == datetime.date.today()).all()


@router.get('/get_all_work_hours', response_model=list[WorkHourOut])
def get_all_work_hours(db: Session = Depends(get_db)):
    return db.query(WorkHours).all()


@router.get("/address", response_model=list[AddressOut])
async def get_address(db: Session = Depends(get_db)):
    return db.query(Address).all()


@router.post("/address", response_model=AddressOut, status_code=201)
async def create_address(address: AddressBase, trainer: dict, db: Session = Depends(get_db)):
    address_model = Address(
        address1=address.address1,
        address2=address.address2
    )
    db.add(address_model)
    db.commit()
    trainer_model = db.query(Trainer).filter(Trainer.id == trainer.get('id')).first()
    if trainer_model is None:
        raise HTTPException(status_code=404, detail=_("Trainer not found"))

    trainer_model.address_id = address_model.id
    db.commit()

    return address_model


@router.post("/get_day_work_hours", response_model=List[GetWorkHours])
async def get_day_work_hours(work_hours: WorkHourGet, db: Session = Depends(get_db)):
    trainer_work_hours = db.query(WorkHours).filter(
        WorkHours.day == work_hours.day,
        WorkHours.trainer_id == work_hours.trainer_id,
        WorkHours.is_active == work_hours.is_active
    ).all()

    return trainer_work_hours


@router.post("/get_trainer_plans", response_model=List[PlanOut])
async def get_trainer_plans(trainer_model: TrainerId, db: Session = Depends(get_db)):
    trainer_plans = db.query(Plan).filter(Plan.trainer_id == trainer_model.trainer_id).all()

    if not trainer_plans:
        raise HTTPException(status_code=404, detail=_("No plans found for this trainer"))

    return trainer_plans


@router.post("/create_trainer_plan", response_model=PlanOut, status_code=201)
async def create_trainer_plan(plan: TrainerPlans, db: Session = Depends(get_db)):
    db_trainer_plan = Plan(**plan.model_dump())
    db.add(db_trainer_plan)
    db.commit()
    db.refresh(db_trainer_plan)
    return db_trainer_plan


@router.post("/trainer", response_model=TrainerOut, status_code=201)
async def create_trainer(trainer: TrainerBase, db: Session = Depends(get_db)):
    trainer_model = Trainer(
        name=trainer.name,
        last_name=trainer.last_name
    )
    db.add(trainer_model)
    db.commit()
    db.refresh(trainer_model)
    return trainer_model


@router.post("/send-email/background_task", status_code=200)
def send_email_backgroundtasks(background_tasks: BackgroundTasks, email_body: EmailBody):
    send_email_background(background_tasks, 'Potwierdzenie rezerwacji', email_body.email, email_body.body)
    return {'message': _('Success')}


@router.post("/send_reset_password_on_email", status_code=200)
def send_reset_password_on_email(email: str = Form(...), background_tasks=BackgroundTasks(),
                                 db: Session = Depends(get_db)):
    user = get_user_by_email(email, db)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    url = f"{FRONTEND_DOMAIN}/reset_password/{user.id}/{user.name}"
    send_email(background_tasks, _('Password reset on trener-personalny-michal.pl'), email, {'email': email,
                                                                                             'url': url},
               'reset_password.html')
    return {'message': _('Reset password email sent')}


@router.post("/reset_password", status_code=200)
def reset_password(password: str = Form(...), repeat_password: str = Form(...), email: str = Form(...),
                   db: Session = Depends(get_db)):
    if password != repeat_password:
        raise HTTPException(status_code=400, detail=_("Passwords do not match"))

    user = get_user_by_email(email, db)
    if user is None:
        raise HTTPException(status_code=404, detail=_("User not found"))

    hashed_password = get_password_hash(password)
    user.password = hashed_password
    db.add(user)
    db.commit()
    db.refresh(user)
    return {'message': _('Password reset successful')}


@router.post('/get_user', response_model=UserOut, status_code=200)
def get_user(id: str = Form(...), name: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id, User.name == name).first()
    if user is None:
        raise HTTPException(status_code=404, detail=_("User not found"))
    return user


@router.post('/send_direct_message')
def send_direct_message(
        name: str = Form(...),
        email: str = Form(...),
        message: str = Form(...),
        background_tasks: BackgroundTasks = BackgroundTasks()
):
    subject = _("Message from user") + f'{name} ({email})'
    send_mail_to_admin(background_tasks, subject, {'message': message}, 'mail_to_admin.html')
    return {'message': _('Direct message has been sent')}


locales_dir = "app/locales"


@router.get("/test")
def test_url(request: Request):
    lang = request.headers.get('Accept-Language', 'de').split(',')[0]
    print(f"Using language: {lang}")
    return {"message": _("Message")}

