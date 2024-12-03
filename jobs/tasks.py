import datetime
import os

from sqlalchemy import func
from sqlalchemy.orm import Session
from app.reservations.models import WorkHours, Reservation, ReservationPlan


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

def remove_unpaid_records(db: Session):
    print("Starting removal of unpaid records...", flush=True)

    updated_count = db.query(Reservation).filter(
        Reservation.is_paid == False,
        Reservation.payment_id.isnot(None),
        Reservation.payment_id != "",
        Reservation.payment_id != "undefined",
        ReservationPlan.reservation_datetime < func.now() - datetime.timedelta(hours=1)
    ).update({"is_paid": False}, synchronize_session=False)

    print("updated_count",updated_count, flush=True)
    unpaid_plan_ids = db.query(ReservationPlan.id).join(
        Reservation, Reservation.id == ReservationPlan.reservation_id
    ).filter(
        Reservation.is_paid == False,
        Reservation.payment_id.isnot(None),
        Reservation.payment_id != "",
        Reservation.payment_id != "undefined",
        ReservationPlan.pay_datetime.is_(None),
        ReservationPlan.reservation_datetime < func.now() - datetime.timedelta(hours=1)
    ).all()

    print("unpaid_plan_ids", unpaid_plan_ids, flush=True)
    if unpaid_plan_ids:
        deleted_count = db.query(ReservationPlan).filter(
            ReservationPlan.id.in_([plan_id[0] for plan_id in unpaid_plan_ids])
        ).delete(synchronize_session=False)
        print(f"Deleted unpaid reservation plans: {deleted_count}", flush=True)
    else:
        print("No unpaid reservation plans to delete.", flush=True)

    db.commit()

    return "Success"