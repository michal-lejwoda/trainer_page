import datetime
from typing import Optional

from pydantic import BaseModel, Field, field_validator


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
    start_time: datetime.time
    end_time: datetime.time
    day: datetime.date
    trainer_id: int
    is_active: bool

    @field_validator('start_time')
    def parse_start_time(cls, v):
        return v.strftime('%H:%M')

    @field_validator('end_time')
    def parse_end_time(cls, v):
        return v.strftime('%H:%M')


class EmailBody(BaseModel):
    email: str
    body: dict

class PlanOut(TrainerPlans):
    pass

class UserBase(BaseModel):
    pass
    class Config:
        from_attributes = True

class UserOut(UserBase):
    pass