from app.database import SessionLocal
from app.reservations.models import Reservation


def check_unregistered_payments():
    db = SessionLocal()
    unpaid_reservations = db.query(Reservation).filter(Reservation.is_paid == False, Reservation.payment_id != None).all()
    print(unpaid_reservations)
