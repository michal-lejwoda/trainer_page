import datetime
import re
from typing import Optional

from pydantic import BaseModel, Field, validator, field_validator
from pydantic_core import PydanticCustomError
from validate_email import validate_email

from app.models import Day_of_Week


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


class Trainer(TrainerBase):
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
    trainer: Trainer

    class Config:
        from_attributes = True


class ReservationCreate(ReservationBase):
    start_time: datetime.datetime
    end_time: datetime.datetime
    trainer_id: int


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


class TrainerHolidayBase(BaseModel):
    start_holidays: datetime.date
    end_holidays: datetime.date
    is_active: bool
    trainer_id: int

    class Config:
        from_attributes = True


class SmallBreakBase(BaseModel):
    start_break: datetime.datetime
    end_break: datetime.datetime
    date: datetime.date
    is_active: bool
    trainer_id: int

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


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str or None = None


class UserBaseSchema(BaseModel):
    name: str
    last_name: str
    email: str
    phone_number: str

    @field_validator('name')
    def name_validator(cls, name):
        if len(name) < 3:
            raise PydanticCustomError(
                'validation_error',
                'name has less than 3 letters!',
                # {'number': v},
            )

    @field_validator('last_name')
    def last_name_validator(cls, last_name):
        if len(last_name) < 3:
            raise PydanticCustomError(
                'validation_error',
                'name has less than 3 letters!',
                # {'number': v},
            )

    @field_validator('email')
    def email_validator(cls, email):
        check_email = validate_email(email)
        if check_email is False:
            raise PydanticCustomError(
                'validation_error',
                'Email is incorrect',
                # {'number': v},
            )

        import re
    @field_validator('phone_number')
    def phone_number_validator(cls, phone_number):
        pattern = re.compile("^\\+?[1-9][0-9]{7,14}$", re.IGNORECASE)
        if pattern.match(phone_number) is None:
            raise PydanticCustomError(
                'validation_error',
                'Phone number is incorrect',
                # {'number': v},
            )

        # @field_validator('phone_number')
    # def parse_phone_number(cls, phone_number):
    #     print(phone_number)
    #     if len(phone_number) == 9:
    #         return True
    #     else:
    #         return False

    class Config:
        from_attributes = True


class UserInDb(UserBaseSchema):
    hashed_password: str

