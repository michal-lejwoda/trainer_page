import os

import stripe
import logging
from app.database import SessionLocal
from app.reservations.models import Reservation

logger = logging.getLogger(__name__)

def check_unregistered_payments():
    db = SessionLocal()
    stripe_api_key = os.environ.get('STRIPE_SECRET_KEY')

    if not stripe_api_key:
        logger.error("Stripe API key not configured.")
        return

    stripe.api_key = stripe_api_key

    try:
        unpaid_reservations = (
            db.query(Reservation)
            .filter(
                Reservation.is_paid == False,
                Reservation.payment_id.isnot(None),
                Reservation.payment_id != "",
                Reservation.payment_id != "undefined"
            )
            .all()
        )
        updated_count = 0
        for reservation in unpaid_reservations:
            try:
                if not reservation.payment_id:
                    continue
                payment_intent = stripe.PaymentIntent.retrieve(reservation.payment_id)
                if payment_intent.status == "succeeded":
                    reservation.is_paid = True
                    db.add(reservation)
                    updated_count += 1
                    logger.info(f"Updated reservation {reservation.id} to paid status")

            except stripe.error.InvalidRequestError as e:
                logger.warning(f"Invalid payment_id {reservation.payment_id} for reservation {reservation.id}: {e}")
            except stripe.error.StripeError as e:
                logger.error(f"Stripe error for reservation {reservation.id}: {e}")
            except Exception as e:
                logger.error(f"Unexpected error processing reservation {reservation.id}: {e}")

        if updated_count > 0:
            db.commit()
            logger.info(f"Updated {updated_count} reservations to paid status")
        else:
            logger.info("No payments to update")

    except Exception as e:
        logger.error(f"Error in check_unregistered_payments: {e}")
        db.rollback()
    finally:
        db.close()


def check_unregistered_payments_with_db():
    try:
        check_unregistered_payments()
    except Exception as e:
        logger.error(f"Failed to check unregistered payments: {e}")