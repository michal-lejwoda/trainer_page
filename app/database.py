from os import environ as env
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


SECRET_KEY = env['SECRET_KEY']
ALGORITHM = env['ALGORITHM']
OAUTH_SECRET_KEY = env['OAUTH_SECRET_KEY']
POSTGRES_URL = env['POSTGRES_URL']
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")
CURRENT_DOMAIN = env['DOMAIN']

engine = create_engine(POSTGRES_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
