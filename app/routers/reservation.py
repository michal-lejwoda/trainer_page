import datetime
import os
from datetime import datetime
from typing import List, Annotated

import stripe
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, APIRouter, Form, Cookie, Header
from sqlalchemy import asc, desc
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, joinedload
from starlette.background import BackgroundTasks
from starlette.requests import Request

from app.database import get_db
from app.reservations.helpers import generate_date_range, generate_work_hours
from app.reservations.models import WorkHours, WorkingHour, Address, Plan, Trainer, \
    Reservation, PaymentType
from app.reservations.schemas import TrainerBase, \
    WorkingHourBase, WorkHourCreate, DateRange, AddressBase, WorkHourGet, \
    GetWorkHours, TrainerId, TrainerPlans, EmailBody, ReservationOut, TrainerOut, WorkingHourOut, WorkHourOut, \
    AddressOut, PlanOut, UserOut, WorkHourIn, MaxDate, PaymentIntentRequest, UserReservationOut
from app.routers.dependencies import verify_jwt_trainer_auth, admin_required, trainer_required
from app.routers.validation import validate_user, validate_work_hours, verify_user_permission, get_work_hour_or_404, \
    validate_working_hours_not_exists
from app.send_email import send_email_background, send_email, send_mail_to_admin
from app.translation import trans as _
from app.user.dependencies import get_current_user, get_user_by_email, get_password_hash
from app.user.models import User

load_dotenv()
FRONTEND_DOMAIN = os.getenv("FRONTEND_DOMAIN")
router = APIRouter(tags=["reservation"], prefix="/api")


# TODO BACK HERE NEXT TIME
@router.post("/reservation")
def create_reservation(
        title: Annotated[str, Form()],
        user_id: Annotated[int, Form()],
        work_hours_id: Annotated[int, Form()],
        is_paid: Annotated[bool, Form()],
        payment_type: Annotated[PaymentType, Form()],
        jwt_trainer_auth: str = Depends(verify_jwt_trainer_auth),
        db: Session = Depends(get_db)
):
    user = get_current_user(jwt_trainer_auth, db)
    user_based_on_id = validate_user(user_id, db)
    verify_user_permission(user, user_based_on_id)
    try:
        work_hours = validate_work_hours(work_hours_id, db)
        reservation_model = Reservation(
            title=title,
            work_hour_id=work_hours.id,
            is_paid=is_paid,
            user_id=user.id,
            payment_type=payment_type
        )
        db.add(reservation_model)
        db.commit()
        work_hours.is_active = False
        db.add(work_hours)
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail=_("Error creating reservation"))
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    return {"detail": _("Reservation created successfully")}


@router.get("/reservation", response_model=List[ReservationOut])
def list_reservations(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Reservation).offset(skip).limit(limit).all()


@router.get("/user_reservations", response_model=List[UserReservationOut])
def user_reservations(
        jwt_trainer_auth_header: str | None = Header(None),
        jwt_trainer_auth: str | None = Cookie(None),
        jwt_trainer_auth_query: str | None = None,
        skip: int = 0, limit: int = 10,
        db: Session = Depends(get_db)):
    jwt_token = jwt_trainer_auth_header or jwt_trainer_auth or jwt_trainer_auth_query
    user = get_current_user(jwt_token, db)

    reservations = (
        db.query(Reservation)
        .join(WorkHours)
        .join(Trainer)
        .filter(Reservation.user_id == user.id)
        .order_by(desc(WorkHours.start_datetime))
        .offset(skip)
        .limit(limit)
        .all()
    )

    return reservations


@router.get("/trainers", response_model=List[TrainerOut])
def list_trainers(db: Session = Depends(get_db)):
    return db.query(Trainer).all()


@router.get("/get_all_working_hours", response_model=List[WorkingHourOut])
def get_all_working_hours(db: Session = Depends(get_db)):
    return db.query(WorkingHour).all()


@router.post("/create_working_hour", response_model=WorkingHourOut)
def create_working_hour(working_hours: WorkingHourBase, trainer=Depends(trainer_required), db: Session = Depends(
    get_db)):
    validate_working_hours_not_exists(working_hours.trainer_id, working_hours.start_hour, working_hours.end_hour,
                                      working_hours.weekday, db)
    working_hour_model = WorkingHour(
        weekday=working_hours.weekday,
        start_hour=working_hours.start_hour,
        end_hour=working_hours.end_hour,
        trainer_id=working_hours.trainer_id
    )
    db.add(working_hour_model)
    db.commit()
    db.refresh(working_hour_model)
    return working_hour_model


@router.delete("/delete_working_hour/{id}", response_model=dict)
def delete_working_hour(id: int, trainer=Depends(trainer_required), db: Session = Depends(get_db)):
    element_to_delete = db.query(WorkingHour).filter(WorkingHour.id == id).first()
    if element_to_delete is None:
        raise HTTPException(status_code=404, detail=_("Work hour not found"))
    db.delete(element_to_delete)
    db.commit()
    return {"detail": _("Work hour has been deleted successfully")}


def create_work_hour(hour_data: WorkHourCreate, db: Session):
    dumped_hour_model = hour_data.model_dump()
    db_work_hour = WorkHours(**dumped_hour_model)
    db.add(db_work_hour)
    db.commit()
    return db_work_hour


@router.post('/generate_hours_based_on_default')
def generate_hours_based_on_default(date_range: DateRange, trainer=Depends(trainer_required), db: Session =
Depends(get_db)):
    start_time = datetime.combine(date_range.start_time, datetime.min.time())
    end_time = datetime.combine(date_range.end_time, datetime.max.time())

    existing_work_hours = set(
        (work_hour.start_datetime, work_hour.end_datetime, work_hour.trainer_id)
        for work_hour in db.query(WorkHours)
        .filter(
            WorkHours.trainer_id == date_range.trainer_id,
            WorkHours.start_datetime >= start_time,
            WorkHours.end_datetime <= end_time
        )
        .all()
    )

    default_hours = db.query(WorkingHour).filter(WorkingHour.trainer_id == date_range.trainer_id).all()
    new_work_hours = []

    for single_date in generate_date_range(date_range.start_time, date_range.end_time):
        for default_hour in filter(lambda x: x.weekday == single_date.weekday(), default_hours):
            work_hours_list = generate_work_hours(single_date, default_hour.start_hour, default_hour.end_hour,
                                                  date_range.trainer_id)
            for work_hour in work_hours_list:
                key = (work_hour.start_datetime, work_hour.end_datetime, work_hour.trainer_id)
                if key not in existing_work_hours:
                    new_work_hours.append(WorkHours(
                        date=work_hour.start_datetime.date(),
                        start_datetime=work_hour.start_datetime,
                        end_datetime=work_hour.end_datetime,
                        trainer_id=work_hour.trainer_id,
                        is_active=True,
                    ))

    if new_work_hours:
        db.bulk_save_objects(new_work_hours)
        db.commit()

    return {"message": _("Default work hours generated successfully")}


@router.delete('/delete_work_hour/{id}', response_model=dict)
def delete_work_hour(id: int, trainer=Depends(trainer_required), db: Session = Depends(get_db)):
    element_to_delete = get_work_hour_or_404(id, db)
    db.delete(element_to_delete)
    db.commit()
    return {"detail": _("Work hour deleted successfully")}


@router.post('/generate_hours_manually', response_model=WorkHourOut)
def generate_hours_manually(work_hour_in: WorkHourIn, trainer=Depends(trainer_required), db: Session = Depends(
    get_db)):
    if work_hour_in.start_datetime >= work_hour_in.end_datetime:
        raise HTTPException(status_code=400, detail=_("End time must be after start time."))

    overlapping_hours = db.query(WorkHours).filter(
        WorkHours.trainer_id == work_hour_in.trainer_id,
        WorkHours.start_datetime < work_hour_in.end_datetime,
        WorkHours.end_datetime > work_hour_in.start_datetime
    ).first()

    if overlapping_hours:
        raise HTTPException(status_code=400, detail=_("The time slot overlaps with existing work hours."))
    new_work_hour = WorkHours(
        date=work_hour_in.start_datetime.date(),
        start_datetime=work_hour_in.start_datetime,
        end_datetime=work_hour_in.end_datetime,
        trainer_id=work_hour_in.trainer_id,
        is_active=True
    )
    try:
        db.add(new_work_hour)
        db.commit()
        db.refresh(new_work_hour)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=_("An error occurred while saving work hours."))

    return new_work_hour


@router.get('/get_all_work_hours', response_model=list[WorkHourOut])
def get_all_work_hours(db: Session = Depends(get_db)):
    return db.query(WorkHours).all()


@router.get("/address", response_model=list[AddressOut])
async def get_address(db: Session = Depends(get_db)):
    return db.query(Address).all()


@router.post("/address", response_model=AddressOut, status_code=201)
async def create_address(address: AddressBase, trainer: dict, trainer_required=Depends(trainer_required), db: Session
= (
        Depends(get_db))):
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
        WorkHours.date == work_hours.date,
        WorkHours.trainer_id == work_hours.trainer_id,
        WorkHours.is_active == work_hours.is_active
    ).order_by(asc(WorkHours.start_datetime)).all()

    return trainer_work_hours


@router.post("/get_next_available_day_work_hours", response_model=List[GetWorkHours])
async def get_next_available_day_work_hours(trainer_id: int, data: MaxDate, db: Session = Depends(get_db)):
    next_available_work_hour = db.query(WorkHours).filter(
        WorkHours.trainer_id == trainer_id,
        WorkHours.is_active == True,
        WorkHours.date >= datetime.now().date(),
        WorkHours.date <= data.max_date
    ).order_by(asc(WorkHours.date)).first()

    if not next_available_work_hour:
        return []

    work_hours_on_day = db.query(WorkHours).filter(
        WorkHours.date == next_available_work_hour.date,
        WorkHours.trainer_id == trainer_id,
        WorkHours.is_active == True
    ).order_by(asc(WorkHours.start_datetime)).all()

    return work_hours_on_day


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
async def create_trainer(trainer: TrainerBase, db: Session = Depends(get_db), admin=Depends(admin_required)):
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
    send_email_background(background_tasks, _("Reservation Confirmation"), email_body.email, email_body.body)
    return {'message': _("Success")}


@router.post("/send_reset_password_on_email", status_code=200)
def send_reset_password_on_email(email: str = Form(...), background_tasks=BackgroundTasks(),
                                 db: Session = Depends(get_db)):
    user = get_user_by_email(email, db)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    url = f"{FRONTEND_DOMAIN}/reset_password/{user.id}/{user.name}"
    send_email(background_tasks, _("Password reset on trener-personalny-michal.pl website"), email, {'email': email,
                                                                                                     'url': url},
               'reset_password.html')
    return {'message': _("Reset password email has been sent")}


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
    return {'message': _("Password reset successful")}


@router.post('/get_user', response_model=UserOut, status_code=200)
def get_user(id: str = Form(...), name: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id, User.name == name).first()
    if user is None:
        raise HTTPException(status_code=404, detail=_("User not found"))
    return user


@router.post("/process-payment/")
async def process_payment(amount: int, currency: str, token: str):
    try:

        charge = stripe.Charge.create(
            amount=amount,
            currency=currency,
            source=token,
            description="Payment for FastAPI Store",
        )

        return {"status": "success", "charge_id": charge.id}

    except stripe.error.CardError as e:
        return {"status": "error", "message": str(e)}
    except stripe.error.StripeError as e:
        return {"status": "error", "message": "Something went wrong. Please try again later."}


@router.post('/send_direct_message')
def send_direct_message(
        name: str = Form(...),
        email: str = Form(...),
        message: str = Form(...),
        background_tasks: BackgroundTasks = BackgroundTasks()
):
    subject = _("Message from user") + f'{name} ({email})'
    send_mail_to_admin(background_tasks, subject, {'message': message}, 'mail_to_admin.html')
    return {'message': _("Direct message has been sent")}


@router.get("/test")
def test_url(request: Request):
    lang = request.headers.get('Accept-Language', 'de').split(',')[0]
    print(f"Using language: {lang}")
    return {"message": _("Message")}


@router.get("/admin-only")
async def admin_only_endpoint(superuser=Depends(admin_required)):
    print("admin", superuser)
    return {"message": "This is a protected endpoint for admins."}


@router.post("/create-intent")
async def create_payment_intent(payment_intent_request: PaymentIntentRequest):
    print("payment_intent_request", payment_intent_request)
    print("payment_intent_request.amount", payment_intent_request.amount)
    print("payment_intent_request.currency", payment_intent_request.currency.value)
    print("payment_intent_request.payment_method_types", payment_intent_request.payment_method_types)
    try:

        payment_intent = stripe.PaymentIntent.create(
            amount=payment_intent_request.amount,
            currency=payment_intent_request.currency.value,
            payment_method_types=[method.value for method in payment_intent_request.payment_method_types]

        )

        return {"client_secret": payment_intent.client_secret}
    except Exception as e:
        print(f"Error creating payment intent: {e}")
        raise HTTPException(status_code=500, detail="Failed to create PaymentIntent")
