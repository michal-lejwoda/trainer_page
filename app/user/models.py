from sqlalchemy import Column, Integer, String

from app.database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, nullable=False, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    last_name = Column(String)
    phone_number = Column(String)
    password = Column(String)
