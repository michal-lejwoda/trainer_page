from typing import Annotated

from fastapi import APIRouter, HTTPException
from fastapi import Depends, Cookie, Form
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import exc

from app.database import get_db
from app.user.dependencies import get_password_hash, get_current_user, \
    authenticate_and_generate_token_for_user, get_user_by_email
from app.user.models import User
from app.user.schemas import Token

router = APIRouter(
    tags=["users"],
    prefix="/api"
)


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
                                 ) -> dict:
    user_token = authenticate_and_generate_token_for_user(form_data.username, form_data.password, db)
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
            raise HTTPException(status_code=404, detail="Wystąpił błąd")
    else:
        raise HTTPException(status_code=401, detail="Użytkownik z takim emailem już istnieje")


@router.get("/users", response_model=None)
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@router.get("/users/me")
async def read_users_me(jwt_trainer_auth: Annotated[str | None, Cookie()] = None, db: Session = Depends(get_db)):
    if jwt_trainer_auth is None:
        return None
    user = get_current_user(jwt_trainer_auth, db)
    return user
