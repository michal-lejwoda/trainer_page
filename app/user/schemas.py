import datetime
import re

from pydantic import BaseModel, field_validator
from pydantic_core import PydanticCustomError
from validate_email import validate_email


class Token(BaseModel):
    access_token: str
    token_type: str
    access_token_expires: datetime.datetime


class TokenData(BaseModel):
    email: str or None = None


class UserLogin(BaseModel):
    email: str
    password: str

    class Config:
        from_attributes = True


class UserBaseSchema(BaseModel):
    name: str
    last_name: str
    email: str
    phone_number: str
    password: str

    class Config:
        from_attributes = True

    @field_validator('name')
    def name_validator(cls, name):
        if len(name) < 3:
            raise PydanticCustomError(
                'validation_error',
                'name has less than 3 letters!',
                # {'number': v},
            )
        return name

    @field_validator('last_name')
    def last_name_validator(cls, last_name):
        if len(last_name) < 3:
            raise PydanticCustomError(
                'validation_error',
                'name has less than 3 letters!',
                # {'number': v},
            )
        return last_name

    @field_validator('email')
    def email_validator(cls, email):
        check_email = validate_email(email)
        if check_email is False:
            raise PydanticCustomError(
                'validation_error',
                'Email is incorrect',
                # {'number': v},
            )
        return email

    @field_validator('phone_number')
    def phone_number_validator(cls, phone_number):
        pattern = re.compile("^\\+?[1-9][0-9]{7,14}$", re.IGNORECASE)
        if pattern.match(phone_number) is None:
            raise PydanticCustomError(
                'validation_error',
                'Phone number is incorrect',
            )
        return phone_number

    #
    @field_validator('password')
    def password_validator(cls, password):
        if len(password) < 5:
            raise PydanticCustomError(
                'validation_error',
                'Password is too short',

            )
        if len(password) > 100:
            raise PydanticCustomError(
                'validation_error',
                'Password is too long',

            )
        return password


class UserInDb(UserBaseSchema):
    hashed_password: str
