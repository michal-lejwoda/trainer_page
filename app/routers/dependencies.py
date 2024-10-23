from fastapi import Depends, HTTPException, Cookie, Header
from sqlalchemy.orm import Session
from starlette import status

from app.database import get_db
from app.user.dependencies import get_current_user
from app.user.models import User
from app.translation import trans as _


def verify_jwt_trainer_auth(jwt_trainer_auth: str | None = Cookie(None)):
    if jwt_trainer_auth is None:
        raise HTTPException(status_code=401, detail=_('You need to log in'))
    return jwt_trainer_auth


def admin_required(
        jwt_trainer_auth_header: str | None = Header(None),
        jwt_trainer_auth: str | None = Cookie(None),
        jwt_trainer_auth_query: str | None = None,
        db: Session = Depends(get_db)
):
    jwt_token = jwt_trainer_auth_header or jwt_trainer_auth or jwt_trainer_auth_query
    if not jwt_token:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=_("You do not have permission to perform this action.")
        )

    user = get_current_user(jwt_token, db)

    if user is None or not user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=_("You do not have permission to perform this action.")
        )

    return user
