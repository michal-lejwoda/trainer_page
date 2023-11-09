import enum

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Date, Float, Time
from .database import Base
from sqlalchemy.orm import relationship


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


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    start_time = Column(DateTime(timezone=True))
    end_time = Column(DateTime(timezone=True))
    trainer_id = Column(Integer, ForeignKey("trainers.id"))
    # trainer = relationship("Trainer")


class Trainer(Base):
    __tablename__ = "trainers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    last_name = Column(String, index=True)
    phone_number = Column(String)
    address_id = Column(Integer, ForeignKey("address.id"), nullable=True)
    address = relationship("Address", back_populates="trainer_address")
    working_hour = relationship("WorkingHour", back_populates="trainer_working_hour")
    holidays = relationship("TrainerHoliday", back_populates="trainer_holiday")
    small_break = relationship("SmallBreak", back_populates="trainer_small_break")


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
    # start_time = Column(Time())
    # end_time = Column(Time())
    start_hour = Column(Time())
    end_hour = Column(Time())
    trainer_id = Column(Integer, ForeignKey("trainers.id"), nullable=True)
    trainer_working_hour = relationship("Trainer", back_populates="working_hour")


class TrainerHoliday(Base):
    __tablename__ = "trainer_holidays"
    id = Column(Integer, primary_key=True, index=True, nullable=False)
    start_holidays = Column(Date)
    end_holidays = Column(Date)
    is_active = Column(Boolean, default=True)
    trainer_id = Column(Integer, ForeignKey("trainers.id"), nullable=True)
    trainer_holiday = relationship("Trainer", back_populates="holidays")


class SmallBreak(Base):
    __tablename__ = "small_breaks"
    id = Column(Integer, nullable=False, primary_key=True, index=True)
    start_break = Column(DateTime(timezone=True))
    end_break = Column(DateTime(timezone=True))
    date = Column(Date())
    is_active = Column(Boolean, default=True)
    trainer_id = Column(Integer, ForeignKey("trainers.id"), nullable=True)
    trainer_small_break = relationship("Trainer", back_populates="small_break")


class Plan(Base):
    __tablename__ = "plans"
    id = Column(Integer, nullable=False, primary_key=True, index=True)
    title = Column(String)
    price = Column(Float)
    currency = Column(String)
    trainer_id = Column(Integer, ForeignKey("trainers.id"), nullable=True)


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, nullable=False, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    last_name = Column(String)
    phone_number = Column(String)
