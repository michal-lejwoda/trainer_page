from os import environ as env

from app.database import SessionLocal, pwd_context
from app.reservations.models import Reservation
from app.user.models import User



def create_superuser():
    db = SessionLocal()
    email = env['ADMIN_EMAIL']
    password = env['ADMIN_PASSWORD']
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        print("Superuser already exists!")
        return

    hashed_password = pwd_context.hash(password)
    superuser = User(email=email, password=hashed_password, is_admin=True, is_trainer=True)

    db.add(superuser)
    db.commit()
    db.refresh(superuser)
    print(f"Superuser {email} created!")


