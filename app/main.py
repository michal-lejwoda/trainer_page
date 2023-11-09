import datetime
from typing import Any, List

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from sqlalchemy import func
from sqlalchemy.orm import Session
from starlette import status

from app.schemas import TrainerBase, ReservationCreate, ReservationList, WorkingHourBase, TrainerHolidayBase, \
    SmallBreakBase, TimeDiff, DateRange, WorkHourCreate, WorkHourGet, TrainerPlans, TrainerId, GetWorkHours, UserInDb, \
    TokenData, Token, UserBaseSchema
from .database import engine, SessionLocal, Base
from .helpers import daterange, hour_range
from .models import Trainer, Address, WorkingHour, TrainerHoliday, SmallBreak, WorkHours, Plan
from .schemas import AddressBase


SECRET_KEY = "sada2341235432423xfsds4dxgbfdb"
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

Base.metadata.create_all(bind=engine)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, username: str):
    if username in db:
        user_data = db[username]
        return UserInDb(**user_data)


def authenticate_user(db, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: datetime.timedelta or None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/reservation")
def create_reservation(reservation: ReservationCreate, db: Session = Depends(get_db)):
    reservation_model = ReservationCreate()
    pass


@app.get("/reservation")
def list_reservations(db: Session = Depends(get_db)):
    return db.query(ReservationList).all()


@app.get("/")
def read_api(db: Session = Depends(get_db)):
    return "Hello World"
    # return db.query(Trainer).all()


# @app.get("/trainers", response_model=List[Trainer])
@app.get("/trainers", response_model=List[TrainerBase])
def list_trainers(db: Session = Depends(get_db)) -> Any:
    return db.query(Trainer).all()


@app.post("/trainer", response_model=None)
def create_trainer(trainer: TrainerBase, db: Session = Depends(get_db)):
    # return "Create Trainer"
    trainer_model = Trainer()
    trainer_model.name = trainer.name
    trainer_model.last_name = trainer.last_name
    db.add(trainer_model)
    db.commit()
    return trainer


@app.get("/get_all_working_hours")
def get_all_working_hours(db: Session = Depends(get_db)):
    return db.query(WorkingHour).all()


@app.post("/create_working_hour", response_model=None)
def create_working_hour(working_hours: WorkingHourBase, db: Session = Depends(get_db)):
    working_hour_model = WorkingHour()
    working_hour_model.weekday = working_hours.weekday
    working_hour_model.start_hour = working_hours.start_time
    working_hour_model.end_hour = working_hours.end_time
    working_hour_model.trainer_id = working_hours.trainer_id
    db.add(working_hour_model)
    db.commit()
    return working_hour_model


@app.delete("/delete_working_hour", response_model=None)
def delete_working_hour(id: int, db: Session = Depends(get_db)):
    element_to_delete = db.query(WorkingHour).filter(
        WorkingHour.id == id
    ).first()
    if element_to_delete is None:
        raise HTTPException(status_code=404, detail='Work hour not found')
    db.query(WorkingHour).filter(WorkingHour.id == id).delete()
    db.commit()


@app.get('/get_all_trainer_holidays')
def get_all_trainer_holidays(db: Session = Depends(get_db)):
    return db.query(TrainerHoliday).all()


@app.get('/get_trainer_holidays')
def get_trainer_holidays(trainer_id: int, db: Session = Depends(get_db)):
    return db.query(TrainerHoliday).filter_by(trainer_id=trainer_id).all()


@app.post('/create_trainer_holiday')
def create_trainer_holiday(trainer_holiday: TrainerHolidayBase, db: Session = Depends(get_db)):
    trainer_holiday_model = TrainerHoliday()
    trainer_holiday_model.start_holidays = trainer_holiday.start_holidays
    trainer_holiday_model.end_holidays = trainer_holiday.end_holidays
    trainer_holiday_model.is_active = trainer_holiday.is_active
    trainer_holiday_model.trainer_id = trainer_holiday.trainer_id
    db.add(trainer_holiday_model)
    db.commit()
    return trainer_holiday_model


@app.get('/get_all_small_breaks')
def get_all_small_breaks(db: Session = Depends(get_db)):
    return db.query(SmallBreak).all()


@app.get('/get_trainer_small_break')
def get_trainer_small_break(trainer_id: int, db: Session = Depends(get_db)):
    return db.query(SmallBreak).filter_by(trainer_id=trainer_id).all()


@app.post('/create_small_break')
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


@app.post('/generate_hours_based_on_default')
def generate_hours_based_on_default(date_range: DateRange, db: Session = Depends(get_db)):
    default_hours = db.query(WorkingHour).filter(WorkingHour.trainer_id == date_range.trainer_id).all()
    for single_date in daterange(date_range.start_time, date_range.end_time):
        hours_based_on_weekday = [x for x in default_hours if x.weekday == single_date.weekday()]
        for hours in hours_based_on_weekday:
            for hour in hour_range(single_date, hours.start_hour, hours.end_hour, date_range.trainer_id):
                create_work_hour(hour, db)


@app.delete('/delete_work_hour')
def delete_work_hour(id: int, db: Session = Depends(get_db)):
    element_to_delete = db.query(WorkHours).filter(
        WorkHours.id == id
    ).first()
    if element_to_delete is None:
        raise HTTPException(status_code=404, detail='Work hour not found')
    db.query(WorkHours).filter(WorkHours.id == id).delete()
    db.commit()


@app.post('/generate_hours')
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


@app.get("/get_test_datetime_work_hours")
def get_test_datetime_work_hours(start_time: datetime.datetime, end_time: datetime.datetime,
                                 db: Session = Depends(get_db)):
    return db.query(WorkHours).filter(WorkHours.start_time == start_time, WorkHours.end_time == end_time).first()


@app.get("/get_test_work_hours")
def get_test_work_hours(db: Session = Depends(get_db)):
    return db.query(WorkHours).filter(func.date(WorkHours.start_time) == datetime.date.today()).all()


@app.get('/get_all_work_hours')
def get_all_work_hours(db: Session = Depends(get_db)):
    return db.query(WorkHours).all()


@app.get('/get_reservation_hours')
def get_reservation_hours(trainer_id: int, date_of_break: datetime.date, hours: int, db: Session = Depends(get_db)):
    small_breaks = db.query(SmallBreak).filter(SmallBreak.date == date_of_break, SmallBreak.trainer_id == trainer_id,
                                               SmallBreak.is_active == True).all()
    #     # trainer_holidays = db.query(TrainerHoliday).filter_by(trainer_id=trainer_id, is_active=True, start_holidays>date ).all()
    trainer_holidays = db.query(TrainerHoliday).filter(TrainerHoliday.trainer_id == trainer_id,
                                                       TrainerHoliday.start_holidays <= date_of_break,
                                                       TrainerHoliday.end_holidays >= date_of_break,
                                                       TrainerHoliday.is_active == True).all()
    return small_breaks


@app.get("/address")
async def get_address(db: Session = Depends(get_db)):
    return db.query(Address).all()


@app.post("/address")
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


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.post("/get_day_work_hours", response_model=List[GetWorkHours])
async def get_day_work_hours(work_hours: WorkHourGet, db: Session = Depends(get_db)):
    trainer_work_hours = db.query(WorkHours).filter(WorkHours.day == work_hours.day,
                                                    WorkHours.trainer_id == work_hours.trainer_id,
                                                    WorkHours.is_active == work_hours.is_active).all()

    return trainer_work_hours


@app.post("/get_trainer_plans")
async def get_trainer_plans(trainer_model: TrainerId, db: Session = Depends(get_db)):
    trainer_plans = db.query(Plan).filter(Plan.trainer_id == trainer_model.trainer_id).all()
    return trainer_plans


@app.post("/create_trainer_plan")
async def create_trainer_plan(plan: TrainerPlans, db: Session = Depends(get_db)):
    dumped_trainer_plan_model = plan.model_dump()
    db_trainer_plan = Plan(**dumped_trainer_plan_model)
    db.add(db_trainer_plan)
    db.commit()
    return db_trainer_plan



async def get_current_user(token: str = Depends(oauth_2_scheme)):
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credential_exception

        token_data = TokenData(username=username)


    except JWTError:
        raise credential_exception
    #TODO Check db
    user = get_user(get_db(), username=token_data.username)

async def get_current_active_user(current_user: UserInDb = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive User")
    return current_user


@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(get_db(), form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password", headers={"WWW-Authenticate": "Bearer"})
    access_token_expires = datetime.timedelta(minutes=80)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("users/me/", response_model=UserBaseSchema)
async def read_users_me(current_user: UserBaseSchema = Depends(get_current_active_user)):
    return current_user

@app.get("users/me/items")
async def read_users_me(current_user: UserBaseSchema = Depends(get_current_active_user)):
    return [{"item_id": 1, "owner": current_user}]

@app.post("/register")
async def register_user(user: UserBaseSchema, db: Session = Depends(get_db)):
    return [{"item_id": 1}]