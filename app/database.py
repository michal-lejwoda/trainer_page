import os

from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
OAUTH_SECRET_KEY = os.getenv("OAUTH_SECRET_KEY")
POSTGRES_URL = os.getenv("POSTGRES_URL")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")



engine = create_engine('postgresql://postgres:example@trainer_db:5432/postgres')

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()





def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
