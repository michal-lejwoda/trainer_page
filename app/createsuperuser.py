from os import environ as env

from app.database import SessionLocal, pwd_context
from app.reservations.models import Reservation
from app.user.dependencies import authenticate_and_generate_token_for_user
from app.user.models import User


def create_superuser():
    db = SessionLocal()
    email = env['ADMIN_EMAIL']
    password = env['ADMIN_PASSWORD']
    name = env['ADMIN_NAME']
    last_name = env['ADMIN_LAST_NAME']
    phone_number = env['ADMIN_PHONE_NUMBER']
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        print("Superuser already exists!")
        return

    hashed_password = pwd_context.hash(password)
    superuser = User(email=email, password=hashed_password, name=name, last_name=last_name, phone_number=phone_number,
                     is_admin=True,
                     is_trainer=True)

    db.add(superuser)
    db.commit()
    db.refresh(superuser)
    authenticate_and_generate_token_for_user(email, password, db)
    print(f"Superuser {email} created!")
