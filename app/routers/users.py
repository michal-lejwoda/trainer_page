import datetime
from typing import Annotated, Union

from fastapi import HTTPException, Depends, Cookie, Form
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette import status

from app.database import get_db
from app.user.dependencies import authenticate_user, create_access_token, get_password_hash, get_current_user, \
    oauth_2_scheme
from app.user.models import User
from app.user.schemas import Token, UserBaseSchema
from fastapi import APIRouter

router = APIRouter(
    tags=["users"],
)


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
                                 ) -> dict:
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password",
                            headers={"WWW-Authenticate": "Bearer"})
    access_token_expires = datetime.timedelta(minutes=80)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register_user", response_model=None)
def register_user(name: Annotated[str, Form()], last_name: Annotated[str, Form()], email: Annotated[str, Form()],
                  phone_number: Annotated[str, Form()], password: Annotated[str, Form()], db: Session = Depends(get_db)):
    hashed_password = get_password_hash(password)
    password = hashed_password
    user_dict = {"name": name, "last_name": last_name, "email": email, "phone_number": phone_number,
                 "password": password}
    db_user = User(**user_dict)
    db.add(db_user)
    db.commit()
    return db_user


@router.get("/users", response_model=None)
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


# @router.get("/users/me/", response_model=UserBaseSchema)
# async def read_users_me(token: Annotated[str, Depends(oauth_2_scheme)], db: Session = Depends(get_db)):
#     user = get_current_user(token, db)
#     return user

@router.get("/users/me/")
async def read_users_me(jwt_trainer_auth: Annotated[str | None, Cookie()] = None, db: Session = Depends(get_db)):
    print("jwt_trainer_auth")
    print(jwt_trainer_auth)
    user = get_current_user(jwt_trainer_auth, db)
    print(user)
    return user
