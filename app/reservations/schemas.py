import datetime
from typing import Optional

from pydantic import BaseModel, Field, field_validator


class AddressBase(BaseModel):
    id: int
    address1: str
    address2: Optional[str]

    class Config:
        from_attributes = True


class TrainerBase(BaseModel):
    id: int
    name: str
    last_name: str | None = None
    address_id: int | None = None
    address: AddressBase | None = None

    class Config:
        from_attributes = True


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


class ReservationCreate(ReservationBase):
    user_id: int
    work_hours_id: int


class WorkingHourBase(BaseModel):
    weekday: int = Field(None, ge=0, le=6)
    start_time: datetime.time
    end_time: datetime.time
    trainer_id: int

    class Config:
        from_attributes = True


class WorkHourBase(BaseModel):
    title: Optional[str]
    start_time: datetime.time
    end_time: datetime.time
    trainer_id: int
    is_active: bool

    class Config:
        from_attributes = True


class WorkHourCreate(BaseModel):
    day: datetime.date
    start_time: datetime.time
    end_time: datetime.time
    trainer_id: int
    is_active: bool

    class Config:
        from_attributes = True


class WorkHourGet(BaseModel):
    trainer_id: int
    is_active: bool
    day: datetime.date

    class Config:
        from_attributes = True


# class TrainerHolidayBase(BaseModel):
#     start_holidays: datetime.date
#     end_holidays: datetime.date
#     is_active: bool
#     trainer_id: int
#
#     class Config:
#         from_attributes = True


# class SmallBreakBase(BaseModel):
#     start_break: datetime.datetime
#     end_break: datetime.datetime
#     date: datetime.date
#     is_active: bool
#     trainer_id: int
#
#     class Config:
#         from_attributes = True


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