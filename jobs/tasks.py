import datetime
from sqlalchemy.orm import Session
from app.reservations.models import WorkHours


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

