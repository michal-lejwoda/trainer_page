import datetime

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.reservations.models import WorkHours, Reservation, ReservationPlan


def remove_unactive_records(db: Session):
    current_time = datetime.datetime.now(datetime.timezone.utc)
    current_time = current_time + datetime.timedelta(hours=1)
    old_work_hours = db.query(WorkHours).filter(
        WorkHours.is_active == True,
        WorkHours.date < current_time.date()
    ).all()
    for i in old_work_hours:
        i.is_active = False
        db.commit()

    current_full_datetime = datetime.datetime.combine(current_time.date(), current_time.time(),
                                                      tzinfo=current_time.tzinfo)
    today_work_hours = db.query(WorkHours).filter(
        WorkHours.is_active == True,
        WorkHours.date == current_time.date(),
        WorkHours.start_datetime < current_full_datetime
    ).all()
    for i in today_work_hours:
        i.is_active = False
        db.commit()

    return None


def remove_unpaid_records(db: Session):

    updated_count = db.query(Reservation).filter(
        Reservation.is_paid == False,
        Reservation.payment_id.isnot(None),
        Reservation.payment_id != "",
        Reservation.payment_id != "undefined",
        ReservationPlan.reservation_datetime < func.now() - datetime.timedelta(hours=1)
    ).update({"is_paid": False}, synchronize_session=False)

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

    if unpaid_plan_ids:
        db.query(ReservationPlan).filter(
            ReservationPlan.id.in_([plan_id[0] for plan_id in unpaid_plan_ids])
        ).delete(synchronize_session=False)
    db.commit()

    return None
