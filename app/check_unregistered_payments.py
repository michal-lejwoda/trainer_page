import os

import stripe

from app.database import SessionLocal
from app.reservations.models import Reservation


def check_unregistered_payments():
    print("Checking unregistered payments")
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
        print(f"Unpaid reservations found: {len(unpaid_reservations)}")

        for element in unpaid_reservations:
            if not element.payment_id:
                print("Warning: payment_id is undefined or empty!")
                continue
            payment_intent = stripe.PaymentIntent.retrieve(element.payment_id)
            print(f"Payment ID: {element.payment_id}, Status: {payment_intent.status}")

            if payment_intent.status == "succeeded":
                element.is_paid = True
                db.add(element)
                print(f"Marked reservation {element.id} as paid.")

        db.commit()
        print("Changes committed to the database.")

    except Exception as e:
        db.rollback()
        print(f"An error occurred: {e}")

    finally:
        db.close()
