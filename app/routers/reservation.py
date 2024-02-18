import os

from dotenv import load_dotenv
import datetime
from typing import List, Any, Annotated

from fastapi import Depends, HTTPException, APIRouter, Form, Cookie
from sqlalchemy import func
from sqlalchemy.orm import Session
from starlette import status
from starlette.background import BackgroundTasks

from app.database import get_db
from app.reservations.helpers import daterange, hour_range
from app.reservations.models import WorkHours, SmallBreak, TrainerHoliday, WorkingHour, Address, Plan, Trainer, \
    Reservation
from app.reservations.schemas import TimeDiff, TrainerBase, \
    WorkingHourBase, TrainerHolidayBase, SmallBreakBase, WorkHourCreate, DateRange, AddressBase, WorkHourGet, \
    GetWorkHours, TrainerId, TrainerPlans, AssignReservation
from app.send_email import send_email_async, send_email_background, send_email, send_mail_to_admin
from app.user.dependencies import get_current_user, get_user_by_email, get_password_hash
from app.user.models import User

load_dotenv()

FRONTEND_DOMAIN = os.getenv("FRONTEND_DOMAIN")
router = APIRouter(
    tags=["reservation"],
    prefix="/api"
)


@router.post("/reservation")
def create_reservation(title: Annotated[str, Form()], user_id: Annotated[str, Form()],
                       work_hours_id: Annotated[str, Form()], jwt_trainer_auth: Annotated[str | None, Cookie()] = None,
                       db: Session = Depends(get_db)):
    user_based_on_id = db.query(User).filter(User.id == user_id).first()
    work_hours = db.query(WorkHours).filter(WorkHours.id == work_hours_id, WorkHours.is_active == True).first()
    if jwt_trainer_auth is None:
        raise HTTPException(status_code=401, detail='You need to log in')
    user = get_current_user(jwt_trainer_auth, db)
    if user.id == user_based_on_id.id:
        reservation_model = Reservation()
        reservation_model.title = title
        reservation_model.work_hour_id = work_hours.id
        reservation_model.user_id = user.id
        work_hours.is_active = False
        db.add(reservation_model)
        db.add(work_hours)
        db.commit()


@router.get("/reservation")
def list_reservations(db: Session = Depends(get_db)):
    return db.query(Reservation).all()


@router.get("/")
def read_api(db: Session = Depends(get_db)):
    return "Hello World"


@router.get("/trainers",
            response_model=None
            )
def list_trainers(db: Session = Depends(get_db)) -> Any:
    return db.query(Trainer).all()


@router.get("/get_all_working_hours")
def get_all_working_hours(db: Session = Depends(get_db)):
    return db.query(WorkingHour).all()


@router.post("/create_working_hour", response_model=None)
def create_working_hour(working_hours: WorkingHourBase, db: Session = Depends(get_db)):
    working_hour_model = WorkingHour()
    working_hour_model.weekday = working_hours.weekday
    working_hour_model.start_hour = working_hours.start_time
    working_hour_model.end_hour = working_hours.end_time
    working_hour_model.trainer_id = working_hours.trainer_id
    db.add(working_hour_model)
    db.commit()
    return working_hour_model


@router.delete("/delete_working_hour", response_model=None)
def delete_working_hour(id: int, db: Session = Depends(get_db)):
    element_to_delete = db.query(WorkingHour).filter(
        WorkingHour.id == id
    ).first()
    if element_to_delete is None:
        raise HTTPException(status_code=404, detail='Work hour not found')
    db.query(WorkingHour).filter(WorkingHour.id == id).delete()
    db.commit()


@router.get('/get_all_trainer_holidays')
def get_all_trainer_holidays(db: Session = Depends(get_db)):
    return db.query(TrainerHoliday).all()


@router.get('/get_trainer_holidays')
def get_trainer_holidays(trainer_id: int, db: Session = Depends(get_db)):
    return db.query(TrainerHoliday).filter_by(trainer_id=trainer_id).all()


@router.post('/create_trainer_holiday')
def create_trainer_holiday(trainer_holiday: TrainerHolidayBase, db: Session = Depends(get_db)):
    trainer_holiday_model = TrainerHoliday()
    trainer_holiday_model.start_holidays = trainer_holiday.start_holidays
    trainer_holiday_model.end_holidays = trainer_holiday.end_holidays
    trainer_holiday_model.is_active = trainer_holiday.is_active
    trainer_holiday_model.trainer_id = trainer_holiday.trainer_id
    db.add(trainer_holiday_model)
    db.commit()
    return trainer_holiday_model


@router.get('/get_all_small_breaks')
def get_all_small_breaks(db: Session = Depends(get_db)):
    return db.query(SmallBreak).all()


@router.get('/get_trainer_small_break')
def get_trainer_small_break(trainer_id: int, db: Session = Depends(get_db)):
    return db.query(SmallBreak).filter_by(trainer_id=trainer_id).all()


@router.post('/create_small_break')
def create_small_break(small_break: SmallBreakBase, db: Session = Depends(get_db)):
    small_break_model = SmallBreak()
    small_break_model.start_break = small_break.start_break
    small_break_model.date = small_break.date
    small_break_model.end_break = small_break.end_break
    small_break_model.is_active = small_break.is_active
    small_break_model.trainer_id = small_break.trainer_id
    db.add(small_break_model)
    db.commit()
    return small_break_model


def create_work_hour(hour_data: WorkHourCreate, db: Session):
    dumped_hour_model = hour_data.model_dump()
    db_work_hour = WorkHours(**dumped_hour_model)
    db.add(db_work_hour)
    db.commit()
    # db.refresh(db_work_hour)
    return db_work_hour


@router.post('/generate_hours_based_on_default')
def generate_hours_based_on_default(date_range: DateRange, db: Session = Depends(get_db)):
    default_hours = db.query(WorkingHour).filter(WorkingHour.trainer_id == date_range.trainer_id).all()
    for single_date in daterange(date_range.start_time, date_range.end_time):
        hours_based_on_weekday = [x for x in default_hours if x.weekday == single_date.weekday()]
        for hours in hours_based_on_weekday:
            for hour in hour_range(single_date, hours.start_hour, hours.end_hour, date_range.trainer_id):
                create_work_hour(hour, db)


@router.delete('/delete_work_hour')
def delete_work_hour(id: int, db: Session = Depends(get_db)):
    element_to_delete = db.query(WorkHours).filter(
        WorkHours.id == id
    ).first()
    if element_to_delete is None:
        raise HTTPException(status_code=404, detail='Work hour not found')
    db.query(WorkHours).filter(WorkHours.id == id).delete()
    db.commit()


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


@router.get("/get_test_datetime_work_hours")
def get_test_datetime_work_hours(start_time: datetime.datetime, end_time: datetime.datetime,
                                 db: Session = Depends(get_db)):
    return db.query(WorkHours).filter(WorkHours.start_time == start_time, WorkHours.end_time == end_time).first()


@router.get("/get_test_work_hours")
def get_test_work_hours(db: Session = Depends(get_db)):
    return db.query(WorkHours).filter(func.date(WorkHours.start_time) == datetime.date.today()).all()


@router.get('/get_all_work_hours')
def get_all_work_hours(db: Session = Depends(get_db)):
    return db.query(WorkHours).all()


@router.get('/get_reservation_hours')
def get_reservation_hours(trainer_id: int, date_of_break: datetime.date, hours: int, db: Session = Depends(get_db)):
    small_breaks = db.query(SmallBreak).filter(SmallBreak.date == date_of_break, SmallBreak.trainer_id == trainer_id,
                                               SmallBreak.is_active == True).all()
    #     # trainer_holidays = db.query(TrainerHoliday).filter_by(trainer_id=trainer_id, is_active=True, start_holidays>date ).all()
    trainer_holidays = db.query(TrainerHoliday).filter(TrainerHoliday.trainer_id == trainer_id,
                                                       TrainerHoliday.start_holidays <= date_of_break,
                                                       TrainerHoliday.end_holidays >= date_of_break,
                                                       TrainerHoliday.is_active == True).all()
    return small_breaks


@router.get("/address")
async def get_address(db: Session = Depends(get_db)):
    return db.query(Address).all()


@router.post("/address")
async def create_address(address: AddressBase, trainer: dict, db: Session = Depends(get_db)):
    address_model = Address()
    address_model.address1 = address.address1
    address_model.address2 = address.address2
    db.add(address_model)
    db.flush()

    trainer_model = db.query(Trainer).filter(Trainer.id == trainer.get('id')).first()
    trainer_model.address_id = address_model.id
    db.add(trainer_model)
    db.commit()


@router.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@router.post("/get_day_work_hours", response_model=List[GetWorkHours])
async def get_day_work_hours(work_hours: WorkHourGet, db: Session = Depends(get_db)):
    trainer_work_hours = db.query(WorkHours).filter(WorkHours.day == work_hours.day,
                                                    WorkHours.trainer_id == work_hours.trainer_id,
                                                    WorkHours.is_active == work_hours.is_active).all()

    return trainer_work_hours


@router.post("/get_trainer_plans")
async def get_trainer_plans(trainer_model: TrainerId, db: Session = Depends(get_db)):
    trainer_plans = db.query(Plan).filter(Plan.trainer_id == trainer_model.trainer_id).all()
    return trainer_plans


@router.post("/create_trainer_plan")
async def create_trainer_plan(plan: TrainerPlans, db: Session = Depends(get_db)):
    dumped_trainer_plan_model = plan.model_dump()
    db_trainer_plan = Plan(**dumped_trainer_plan_model)
    db.add(db_trainer_plan)
    db.commit()
    return db_trainer_plan


@router.post("/trainer", response_model=None)
def create_trainer(trainer: TrainerBase, db: Session = Depends(get_db)):
    trainer_model = Trainer()
    trainer_model.name = trainer.name
    trainer_model.last_name = trainer.last_name
    db.add(trainer_model)
    db.commit()
    return trainer


@router.post("/assign_reservation", response_model=None)
def assign_reservation_to_user(assign_reservation: AssignReservation, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == assign_reservation.user_id).first()
    # reservation = db.query(Re).filter(User.id == assign_reservation.user_id).first()


@router.get('/send-email/asynchronous')
async def send_email_asynchronous():
    await send_email_async('Hello World', 'saxatachi@gmail.com',
                           {'title': 'Hello World', 'name': 'John Doe'})
    # return 'Success' @ router.get('/send-email/backgroundtasks')
    return "Success"


@router.get("/send-email/background_task")
def send_email_backgroundtasks(background_tasks: BackgroundTasks):
    send_email_background(background_tasks, 'Hello World',
                          'saxatachi@gmail.com', {'title': 'Hello World', 'name': 'John Doe'})
    return 'Success'


@router.post("/send_reset_password_on_email")
def send_reset_password_on_email(email: Annotated[str, Form()], background_tasks: BackgroundTasks,
                                 db: Session = Depends(get_db)):
    user = get_user_by_email(email, db)
    url = f"{FRONTEND_DOMAIN}/reset_password/{user.id}/{user.name}"
    send_email(background_tasks, 'Reset hasła na stronie trener michał',
               email, {'email': email, 'url': url}, 'reset_password.html')


@router.post("/reset_password")
def reset_password(password: Annotated[str, Form()], repeat_password: Annotated[str, Form()],
                   email: Annotated[str, Form()], db: Session = Depends(get_db)):
    if password == repeat_password:
        user = get_user_by_email(email, db)
        if user is not None:
            hashed_password = get_password_hash(password)
            user.password = hashed_password
            db.add(user)
            db.commit()
            return user
        else:
            credentials_exception = HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
            raise credentials_exception


@router.post('/get_user')
def get_user(id: Annotated[str, Form()], name: Annotated[str, Form()], db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id, User.name == name).first()
    if user is not None:
        return user
    else:
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        raise credentials_exception


@router.post('/send_direct_message')
def send_direct_message(name: Annotated[str, Form()], email: Annotated[str, Form()], message: Annotated[str, Form()],
                        background_tasks: BackgroundTasks):
    subject = f'Wiadomość od użytkownika {name} {email}'
    send_mail_to_admin(background_tasks, subject,
                       {'message': message}, 'mail_to_admin.html')
