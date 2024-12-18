import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import sessionmaker, Session

from app.local import app
from app.reservations.models import Reservation, Plan, WorkHours
from app.tests.conftest import engine
from app.user.models import User

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)



@pytest.fixture
def db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()



def test_get_reservation():
    client = TestClient(app)
    response = client.get("/api/reservation123")
    assert response.status_code == 200
    assert response.json() == {"message": "Reservation endpoint works"}



@pytest.mark.parametrize("title, user_id, plan_id, work_hours_id, is_paid, payment_type, payment_id", [
    ("Test reservation", 1, 1, 1, True, "credit_card", "pay_123"),
])
def test_create_reservation(db: Session, title, user_id, plan_id, work_hours_id, is_paid, payment_type, payment_id):


    plan = Plan(id=1, name="Test Plan", price=100)
    db.add(plan)
    db.commit()

    work_hour = WorkHours(id=1, start_datetime="2024-12-18 10:00:00", end_datetime="2024-12-18 11:00:00", trainer_id=1)
    db.add(work_hour)
    db.commit()


    client = TestClient(app)
    response = client.post(
        "/api/reservation",
        data={
            "title": title,
            "user_id": user_id,
            "plan_id": plan_id,
            "work_hours_id": work_hours_id,
            "is_paid": is_paid,
            "payment_type": payment_type,
            "payment_id": payment_id,
        },
    )

    assert response.status_code == 200
    assert response.json() == {"detail": "Reservation created successfully"}


    reservation = db.query(Reservation).filter(Reservation.payment_id == payment_id).first()
    assert reservation is not None
    assert reservation.title == title


def test_user_reservations(db: Session):
    user = User(id=1, name="Test User", email="test@user.com")
    db.add(user)
    db.commit()

    work_hour = WorkHours(id=1, start_datetime="2024-12-18 10:00:00", end_datetime="2024-12-18 11:00:00", trainer_id=1)
    db.add(work_hour)
    db.commit()

    reservation = Reservation(
        id=1, title="Test Reservation", user_id=user.id, work_hour_id=work_hour.id, is_paid=True,
        payment_type="credit_card", payment_id="pay_123"
    )
    db.add(reservation)
    db.commit()


    client = TestClient(app)
    response = client.get("/api/user_reservations", cookies={"jwt_trainer_auth": "test_token"})

    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]["title"] == "Test Reservation"


def test_get_all_working_hours(db: Session):
    work_hour = WorkHours(id=1, start_datetime="2024-12-18 10:00:00", end_datetime="2024-12-18 11:00:00", trainer_id=1)
    db.add(work_hour)
    db.commit()

    client = TestClient(app)
    response = client.get("/api/get_all_working_hours")

    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]["start_datetime"] == "2024-12-18 10:00:00"
