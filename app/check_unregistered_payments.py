import os

import stripe

from app.database import SessionLocal
from app.reservations.models import Reservation


def check_unregistered_payments():
    db = SessionLocal()
    stripe_api_key = os.environ.get('STRIPE_SECRET_KEY')
    if not stripe_api_key:
        raise RuntimeError("Stripe API key not configured.")

    stripe.api_key = stripe_api_key
    try:

        unpaid_reservations = (
            db.query(Reservation)
            .filter(Reservation.is_paid == False, Reservation.payment_id.isnot(None),
                    Reservation.payment_id != "",
                    Reservation.payment_id != "undefined")
            .all()
        )

        for element in unpaid_reservations:
            if not element.payment_id:
                continue
            payment_intent = stripe.PaymentIntent.retrieve(element.payment_id)

            if payment_intent.status == "succeeded":
                element.is_paid = True
                db.add(element)

        db.commit()

    except Exception as e:
        db.rollback()

    finally:
        db.close()
