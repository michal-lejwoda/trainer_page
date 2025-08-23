from typing import Annotated, Optional, Union

from fastapi import APIRouter, HTTPException
from fastapi import Depends, Cookie, Form, Header
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import exc
from sqlalchemy.orm import Session

from app.database import get_db
from app.reservations.schemas import UserBase
from app.routers.dependencies import admin_required
from app.user.dependencies import get_password_hash, get_current_user, \
    authenticate_and_generate_token_for_user, get_user_by_email, refresh_token_based_on_old
from app.user.models import User
from app.user.schemas import Token
from app.translation import trans as _

router = APIRouter(
    tags=["users"],
    prefix="/api"
)


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
                                 ) -> dict:
    user_token = authenticate_and_generate_token_for_user(form_data.username, form_data.password, db)
    return user_token


@router.post("/refresh_token", response_model=Token)
async def refresh_token(jwt_trainer_auth: Optional[str] = Cookie(None), db: Session = Depends(get_db)) -> dict:
    if jwt_trainer_auth is None:
        raise HTTPException(status_code=401, detail=_("Unauthorized"))
    user_token = refresh_token_based_on_old(jwt_trainer_auth, db)
    return user_token


@router.post("/register_user", response_model=None)
def register_user(name: Annotated[str, Form()], last_name: Annotated[str, Form()], email: Annotated[str, Form()],
                  phone_number: Annotated[str, Form()], password: Annotated[str, Form()],
                  db: Session = Depends(get_db)):
    user = get_user_by_email(email, db)
    if user is None:
        try:
            hashed_password = get_password_hash(password)
            user_dict = {"name": name, "last_name": last_name, "email": email, "phone_number": phone_number,
                         "password": hashed_password}
            db_user = User(**user_dict)
            db.add(db_user)
            db.commit()
            user_token = authenticate_and_generate_token_for_user(email, password, db)
            return user_token
        except exc.IntegrityError:
            raise HTTPException(status_code=404, detail=_("An error occurred"))
    else:
        raise HTTPException(status_code=401, detail=_("The user with this email already exists."))


@router.post("/register_trainer", response_model=None)
def register_trainer(name: Annotated[str, Form()], last_name: Annotated[str, Form()], email: Annotated[str, Form()],
                     phone_number: Annotated[str, Form()], password: Annotated[str, Form()], admin=Depends(
            admin_required), db: Session = Depends(get_db)):
    user = get_user_by_email(email, db)
    if user is None:
        try:
            hashed_password = get_password_hash(password)
            user_dict = {"name": name, "last_name": last_name, "email": email, "phone_number": phone_number,
                         "password": hashed_password, "is_trainer": True}
            db_user = User(**user_dict)
            db.add(db_user)
            db.commit()
            user_token = authenticate_and_generate_token_for_user(email, password, db)
            return user_token
        except exc.IntegrityError:
            raise HTTPException(status_code=404, detail=_("An error occurred"))
    else:
        raise HTTPException(status_code=401, detail=_("The user with this email already exists."))


@router.get("/users", response_model=None)
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@router.get("/users/me", response_model=UserBase)
async def read_users_me(jwt_trainer_auth: Optional[str] = Cookie(None),jwt_trainer_auth_header: str | None = Header(None),
        jwt_trainer_auth_query: str | None = None, db: Session = Depends(get_db)) -> Union[
    UserBase, None]:
    if jwt_trainer_auth is None:
        raise HTTPException(status_code=401, detail=_("Unauthorized"))
    user = get_current_user(jwt_trainer_auth, db)
    if not user:
        raise HTTPException(status_code=404, detail=_("User not found"))
    return user
