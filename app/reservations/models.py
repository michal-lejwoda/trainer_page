import enum

import sqlalchemy.sql
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Date, Float, Time, DateTime, func
from sqlalchemy import Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from app.database import Base
# TODO Important dont remove that one
from app.user.models import User


class PaymentType(str, enum.Enum):
    cash = "cash"
    card = "card"


class PaymentCurrency(str, enum.Enum):
    pln = "pln"
    eur = "eur"


class PaymentMethodType(str, enum.Enum):
    card = 'card'
    p24 = 'p24'


class WorkHours(Base):
    __tablename__ = "workhours"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    date = Column(Date)
    start_datetime = Column(DateTime)
    end_datetime = Column(DateTime)
    trainer_id = Column(Integer, ForeignKey("trainers.id"))
    is_active = Column(Boolean, default=True)
    reservation = relationship("Reservation", back_populates="work_hours")
    trainer = relationship("Trainer", back_populates="work_hours")


class ReservationPlan(Base):
    __tablename__ = "reservation_plans"

    id = Column(Integer, primary_key=True, index=True)
    reservation_id = Column(Integer, ForeignKey("reservations.id"))
    plan_id = Column(Integer, ForeignKey("plans.id"))
    price_at_booking = Column(Float)
    reservation_datetime = Column(DateTime, default=func.now())
    pay_datetime = Column(DateTime, default=None)
    reservation = relationship("Reservation", back_populates="reservation_plans")
    plan = relationship("Plan")


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    work_hour_id = Column(Integer, ForeignKey("workhours.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    plan_id = Column(Integer, ForeignKey("plans.id"))
    payment_type = Column(SQLAlchemyEnum(PaymentType, name="paymenttype", create_type=False), default=PaymentType.cash)
    plan = relationship("Plan", back_populates="reservations")
    work_hours = relationship("WorkHours", back_populates="reservation")
    is_paid = Column(Boolean, default=False, server_default=sqlalchemy.sql.false())
    payment_id = Column(String)
    user = relationship("User", back_populates="reservations")
    reservation_plans = relationship("ReservationPlan", back_populates="reservation")


class Trainer(Base):
    __tablename__ = "trainers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    last_name = Column(String, index=True)
    phone_number = Column(String)
    address_id = Column(Integer, ForeignKey("address.id"), nullable=True)
    address = relationship("Address", back_populates="trainer_address")
    working_hour = relationship("WorkingHour", back_populates="trainer_working_hour"
                                )
    work_hours = relationship("WorkHours", back_populates="trainer")


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
    reservations = relationship("Reservation", back_populates="plan")
