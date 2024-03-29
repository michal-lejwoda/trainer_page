import enum

from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Date, Float, Time
from sqlalchemy.orm import relationship

from app.database import Base
#TODO IMportant dont remove that one
from app.user.models import User


class Day_of_Week(enum.Enum):
    MONDAY = 0
    TUESDAY = 1
    WEDNESDAY = 2
    THURSDAY = 3
    FRIDAY = 4
    SATURDAY = 5
    SUNDAY = 6


class WorkHours(Base):
    __tablename__ = "workhours"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    day = Column(Date)
    start_time = Column(Time)
    end_time = Column(Time)
    trainer_id = Column(Integer, ForeignKey("trainers.id"))
    is_active = Column(Boolean, default=True)
    reservation = relationship("Reservation", back_populates="work_hours")


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    work_hour_id = Column(Integer, ForeignKey("workhours.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    work_hours = relationship("WorkHours", back_populates="reservation")
    users = relationship("User", back_populates="reservations")


class Trainer(Base):
    __tablename__ = "trainers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    last_name = Column(String, index=True)
    phone_number = Column(String)
    address_id = Column(Integer, ForeignKey("address.id"), nullable=True)
    address = relationship("Address", back_populates="trainer_address")
    working_hour = relationship("WorkingHour", back_populates="trainer_working_hour")


class Address(Base):
    __tablename__ = "address"
    id = Column(Integer, primary_key=True, index=True)
    address1 = Column(String)
    address2 = Column(String)
    trainer_address = relationship("Trainer", back_populates="address")


class WorkingHour(Base):
    __tablename__ = "working_hours"
    id = Column(Integer, nullable=False, primary_key=True, index=True)
    weekday = Column(Integer)
    start_hour = Column(Time())
    end_hour = Column(Time())
    trainer_id = Column(Integer, ForeignKey("trainers.id"), nullable=True)
    trainer_working_hour = relationship("Trainer", back_populates="working_hour")


class Plan(Base):
    __tablename__ = "plans"
    id = Column(Integer, nullable=False, primary_key=True, index=True)
    title = Column(String)
    price = Column(Float)
    currency = Column(String)
    trainer_id = Column(Integer, ForeignKey("trainers.id"), nullable=True)
