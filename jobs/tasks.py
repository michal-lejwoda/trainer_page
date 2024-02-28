import datetime
from sqlalchemy.orm import Session
from app.reservations.models import WorkHours


def remove_unactive_records(db: Session):
    current_time = datetime.datetime.utcnow()
    current_time = current_time + datetime.timedelta(hours=1)
    old_work_hours = db.query(WorkHours).filter(WorkHours.is_active == True, WorkHours.day < current_time.date()).all()
    for i in old_work_hours:
        i.is_active = False
        db.commit()
    today_work_hours = db.query(WorkHours).filter(WorkHours.is_active == True, WorkHours.day == current_time.date(),
                                                  WorkHours.start_time < current_time.time()).all()
    for i in today_work_hours:
        i.is_active = False
        db.commit()
    return "Success"
