from datetime import datetime
from typing import Type

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.reservations.models import WorkHours, WorkingHour
from app.translation import trans as _
from app.user.models import User


def validate_user(user_id: int, db: Session) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail=_("User not found"))
    return user


def validate_work_hours(work_hours_id: int, db: Session) -> Type[WorkHours]:
    work_hours = db.query(WorkHours).filter_by(id=work_hours_id).with_for_update().one_or_none()
    if not work_hours or not work_hours.is_active:
        raise HTTPException(status_code=400, detail=_("Work hours are no longer active or not found"))
    return work_hours


def verify_user_permission(user: User, target_user: User):
    if user.id != target_user.id:
        raise HTTPException(status_code=403, detail=_("You can't perform this action for another user"))


def get_work_hour_or_404(id: int, db: Session):
    element = db.query(WorkHours).filter(WorkHours.id == id).first()
    if element is None:
        raise HTTPException(status_code=404, detail=_("Work hour not found"))
    return element


def validate_working_hours_not_exists(trainer_id: int, start_hour: datetime.time, end_hour: datetime.time,
                                      weekday: int, db: Session):
    if start_hour > end_hour:
        raise HTTPException(status_code=404, detail=_("End hour must be greater than start hour"))
    overlapping_hours = db.query(WorkingHour).filter(
        WorkingHour.trainer_id == trainer_id,
        WorkingHour.weekday == weekday,
        WorkingHour.start_hour < end_hour,
        WorkingHour.end_hour > start_hour
    ).first()

    if overlapping_hours:
        raise HTTPException(status_code=404, detail=_("Can't create working hour"))
