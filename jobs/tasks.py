import datetime
import os

from sqlalchemy.orm import Session
from app.reservations.models import WorkHours, Reservation


def remove_unactive_records(db: Session):
    print("remove_unactive_records", flush=True)
    current_time = datetime.datetime.now(datetime.timezone.utc)
    current_time = current_time + datetime.timedelta(hours=1)
    print("current_time", current_time)
    old_work_hours = db.query(WorkHours).filter(
        WorkHours.is_active == True,
        WorkHours.date < current_time.date()
    ).all()
    for i in old_work_hours:
        i.is_active = False
        db.commit()

    current_full_datetime = datetime.datetime.combine(current_time.date(), current_time.time(),
                                                      tzinfo=current_time.tzinfo)
    print("current_full_datetime", current_full_datetime)
    today_work_hours = db.query(WorkHours).filter(
        WorkHours.is_active == True,
        WorkHours.date == current_time.date(),
        WorkHours.start_datetime < current_full_datetime
    ).all()
    for i in today_work_hours:
        i.is_active = False
        db.commit()

    return "Success"

# TODO Back here and add buy time
def remove_unpaid_records(db: Session):
    print("remove_unactive_records", flush=True)
    current_time = datetime.datetime.now(datetime.timezone.utc)
    # stripe_api_key = os.environ.get('STRIPE_SECRET_KEY')
    # if not stripe_api_key:
    #     raise RuntimeError("Stripe API key not configured.")
    #
    # stripe.api_key = stripe_api_key
    unpaid_reservations = (
        db.query(Reservation)
        .filter(Reservation.is_paid == False,
                Reservation.payment_id.isnot(None),
                Reservation.payment_id != "",
                Reservation.payment_id != "undefined")
        .all()
    )
    pass