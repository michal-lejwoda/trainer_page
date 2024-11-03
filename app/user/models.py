from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, nullable=False, primary_key=True, unique=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    last_name = Column(String)
    phone_number = Column(String)
    password = Column(String)
    is_admin = Column(Boolean, default=False)
    is_trainer = Column(Boolean, default=False)
    reservations = relationship("Reservation", back_populates="user")
