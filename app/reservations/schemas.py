import datetime
from typing import Optional

from pydantic import BaseModel, Field, field_validator, validator

from app.reservations.models import PaymentCurrency, PaymentMethodType


class AddressBase(BaseModel):
    id: int
    address1: str
    address2: Optional[str]

    class Config:
        from_attributes = True


class AddressOut(AddressBase):
    pass


class TrainerBase(BaseModel):
    id: int
    name: str
    last_name: str | None = None
    address_id: int | None = None
    address: AddressBase | None = None

    class Config:
        from_attributes = True


class TrainerOut(TrainerBase):
    pass


class TrainerCreate(TrainerBase):
    pass


class TrainerSchema(TrainerBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True


class ReservationBase(BaseModel):
    title: str


class ReservationList(ReservationBase):
    start_time: datetime.datetime
    end_time: datetime.datetime
    trainer_id: int
    trainer: TrainerSchema

    class Config:
        from_attributes = True


class ReservationOut(ReservationBase):
    start_time: datetime.datetime
    end_time: datetime.datetime
    trainer_id: int
    trainer: TrainerSchema

    class Config:
        from_attributes = True


class ReservationCreate(ReservationBase):
    user_id: int
    work_hours_id: int


class WorkingHourBase(BaseModel):
    weekday: int = Field(None, ge=0, le=6)
    start_hour: datetime.time
    end_hour: datetime.time
    trainer_id: int

    class Config:
        from_attributes = True


class WorkingHourOut(WorkingHourBase):
    pass


class WorkHourBase(BaseModel):
    title: Optional[str]
    start_datetime: datetime.datetime
    end_datetime: datetime.datetime
    trainer_id: int
    is_active: bool

    class Config:
        from_attributes = True


class WorkHourOut(WorkHourBase):
    date: datetime.date


class WorkHourIn(BaseModel):
    start_datetime: datetime.datetime
    end_datetime: datetime.datetime
    trainer_id: int


class WorkHourCreate(BaseModel):
    date: datetime.date
    start_datetime: datetime.datetime
    end_datetime: datetime.datetime
    trainer_id: int
    is_active: bool

    class Config:
        from_attributes = True


class WorkHourGet(BaseModel):
    trainer_id: int
    is_active: bool
    date: datetime.date

    class Config:
        from_attributes = True


class MaxDate(BaseModel):
    max_date: datetime.date


class TimeDiff(BaseModel):
    start_time: datetime.datetime
    end_time: datetime.datetime
    interval: int
    trainer_id: int


class DateRange(BaseModel):
    start_time: datetime.date
    end_time: datetime.date
    trainer_id: int


class TrainerPlans(BaseModel):
    title: str
    price: float
    currency: str
    trainer_id: int


class TrainerId(BaseModel):
    trainer_id: int


class GetWorkHours(BaseModel):
    id: int
    start_datetime: datetime.datetime
    end_datetime: datetime.datetime
    date: datetime.date
    trainer_id: int
    is_active: bool

    @field_validator('start_datetime')
    def parse_start_datetime(cls, v):
        return v.strftime('%H:%M')

    @field_validator('end_datetime')
    def parse_end_datetime(cls, v):
        return v.strftime('%H:%M')


class EmailBody(BaseModel):
    email: str
    body: dict


class PlanOut(TrainerPlans):
    pass


class UserBase(BaseModel):
    id: int
    email: str
    name: str | None
    last_name: str | None
    phone_number: str | None

    class Config:
        from_attributes = True


class UserOut(UserBase):
    is_admin: bool
    is_trainer: bool

class PaymentIntentRequest(BaseModel):
    amount: int
    currency: PaymentCurrency
    payment_method_types: list[PaymentMethodType]

class UserTrainerOut(BaseModel):
    id: int
    name: str
    last_name: str | None = None
    phone_number: str | None = None

class UserWorkHourOut(BaseModel):
    date: datetime.date
    id: int
    trainer: UserTrainerOut
    start_datetime: datetime.datetime
    end_datetime: datetime.datetime


    @field_validator('start_datetime')
    @classmethod
    def convert_start_datetime_to_time(cls, v: datetime.datetime) -> str:
        return v.time()

    @field_validator('end_datetime')
    @classmethod
    def convert_end_datetime_to_time(cls, v: datetime.datetime) -> str:
        return v.time()



class UserReservationOut(BaseModel):
    id: int
    user_id: int
    is_paid: bool
    work_hour_id: int
    title: str
    payment_type: str
    payment_id: Optional[str]
    work_hours: UserWorkHourOut

class CancelIntentRequest(BaseModel):
    payment_intent_id: str

class PaymentIdSchema(BaseModel):
    payment_id: str