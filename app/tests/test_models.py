from datetime import date, datetime, time

import pytest

from app.database import Base
from app.reservations.models import Trainer, WorkHours, ReservationPlan, Reservation, PaymentType, Address, WorkingHour, \
    Plan
from app.tests.conftest import engine, TestingSessionLocal

@pytest.fixture(scope="module")
def test_db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
    Base.metadata.drop_all(bind=engine)

def setup_test_data(test_db):

    trainer = Trainer(name="John", last_name="Doe", phone_number="123456789")
    test_db.add(trainer)
    test_db.commit()
    test_db.refresh(trainer)


    plan = Plan(title="Basic Plan", price=100.0, currency="PLN", trainer_id=trainer.id)
    test_db.add(plan)
    test_db.commit()
    test_db.refresh(plan)

    return trainer, plan

def test_create_trainer(db_session):
    trainer = Trainer(name="John", last_name="Doe", phone_number="123456789")
    db_session.add(trainer)
    db_session.commit()

    trainer_from_db = db_session.query(Trainer).first()
    assert trainer_from_db is not None
    assert trainer_from_db.name == "John"
    assert trainer_from_db.last_name == "Doe"
    assert trainer_from_db.phone_number == "123456789"


def test_create_work_hours(test_db):
    trainer, _ = setup_test_data(test_db)
    work_hour = WorkHours(
        title="Test Work Hour",
        date=date(2024, 12, 18),
        start_datetime=datetime(2024, 12, 18, 9, 0, 0),
        end_datetime=datetime(2024, 12, 18, 10, 0, 0),
        trainer_id=trainer.id,
        is_active=True,
    )
    test_db.add(work_hour)
    test_db.commit()
    test_db.refresh(work_hour)

    assert work_hour.id is not None
    assert work_hour.title == "Test Work Hour"
    assert work_hour.is_active is True


def test_create_reservation_plan(test_db):
    reservation_plan = ReservationPlan(
        reservation_id=1,
        plan_id=1,
        price_at_booking=150.0,
    )
    test_db.add(reservation_plan)
    test_db.commit()
    test_db.refresh(reservation_plan)

    assert reservation_plan.id is not None
    assert reservation_plan.price_at_booking == 150.0


def test_create_reservation(test_db):
    reservation = Reservation(
        title="Test Reservation",
        work_hour_id=1,
        user_id=1,
        plan_id=1,
        payment_type=PaymentType.cash,
        is_paid=False,
    )
    test_db.add(reservation)
    test_db.commit()
    test_db.refresh(reservation)

    assert reservation.id is not None
    assert reservation.title == "Test Reservation"
    assert reservation.payment_type == PaymentType.cash
    assert reservation.is_paid is False


def test_create_trainer(test_db):
    trainer = Trainer(
        name="John",
        last_name="Doe",
        phone_number="123456789",
    )
    test_db.add(trainer)
    test_db.commit()
    test_db.refresh(trainer)

    assert trainer.id is not None
    assert trainer.name == "John"
    assert trainer.last_name == "Doe"


def test_create_address(test_db):
    address = Address(
        address1="123 Test St",
        address2="Apt 4B",
    )
    test_db.add(address)
    test_db.commit()
    test_db.refresh(address)

    assert address.id is not None
    assert address.address1 == "123 Test St"

def test_create_working_hour(test_db):
    trainer, _ = setup_test_data(test_db)
    working_hour = WorkingHour(
        weekday=1,
        start_hour=time(9, 0, 0),
        end_hour=time(17, 0, 0),
        trainer_id=trainer.id,
    )
    test_db.add(working_hour)
    test_db.commit()
    test_db.refresh(working_hour)

    assert working_hour.id is not None
    assert working_hour.weekday == 1
    assert working_hour.start_hour == time(9, 0, 0)
    assert working_hour.end_hour == time(17, 0, 0)

def test_create_plan(test_db):
    trainer, _ = setup_test_data(test_db)
    test_db.rollback()

    plan = Plan(
        title="Basic Plan",
        price=99.99,
        currency="PLN",
        trainer_id=trainer.id,
    )
    test_db.add(plan)
    test_db.commit()
    test_db.refresh(plan)

    assert plan.id is not None
    assert plan.title == "Basic Plan"
    assert plan.price == 99.99