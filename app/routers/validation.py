from typing import Type

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.reservations.models import WorkHours
from app.user.models import User


def validate_user(user_id: int, db: Session) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail='User not found')
    return user

def validate_work_hours(work_hours_id: int, db: Session) -> Type[WorkHours]:
    work_hours = db.query(WorkHours).filter(WorkHours.id == work_hours_id, WorkHours.is_active == True).first()
    if not work_hours:
        raise HTTPException(status_code=404, detail='Work hours not found or not active')
    return work_hours

def verify_user_permission(user: User, target_user: User):
    if user.id != target_user.id:
        raise HTTPException(status_code=403, detail="You can't perform this action for another user")

def get_work_hour_or_404(id: int, db: Session):
    element = db.query(WorkHours).filter(WorkHours.id == id).first()
    if element is None:
        raise HTTPException(status_code=404, detail='Work hour not found')
    return element