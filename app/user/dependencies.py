import datetime
from typing import Annotated

from fastapi import Depends, HTTPException
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from starlette import status

from app.database import SECRET_KEY, oauth_2_scheme, ALGORITHM, pwd_context, get_db
from app.reservations.schemas import UserOut
from app.user.models import User
from app.user.schemas import TokenData


def authenticate_and_generate_token_for_user(email: str, password: str, db: Session):
    user = authenticate_user(email, password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password",
                            headers={"WWW-Authenticate": "Bearer"})
    access_token_expires = datetime.timedelta(minutes=80)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    expires_datetime = datetime.datetime.now(datetime.timezone.utc) + access_token_expires
    return {"access_token": access_token, "token_type": "bearer", "access_token_expires": expires_datetime}


def authenticate_user(email: str, password: str, db: Session):
    user = get_user_by_email(email, db)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user_by_email(email: str, db: Session):
    return db.query(User).filter(User.email == email).first()


def create_access_token(data: dict, expires_delta: datetime.timedelta or None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.now() + expires_delta
    else:
        expire = datetime.datetime.now() + datetime.timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

#TODO Check if i need it?
def get_and_validate_current_user(token: Annotated[str, Depends(oauth_2_scheme)], db: Session = Depends(get_db)) -> (
        UserOut):
    user = get_current_user(token,db)
    return UserOut.model_validate(user)



def get_current_user(token: Annotated[str, Depends(oauth_2_scheme)], db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception

    print("token", token)
    print("token_data", token_data)
    user = get_user_by_email(token_data.email, db)
    if user is None:
        raise credentials_exception
    print("user", user)
    return user
    # return UserOut.model_validate(user)
