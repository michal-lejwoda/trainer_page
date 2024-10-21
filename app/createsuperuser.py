from os import environ as env

from app.database import SessionLocal, pwd_context
from app.user.models import User


def create_superuser():
    db = SessionLocal()
    print(env['SECRET_KEY'])
    email = env['ADMIN_EMAIL']
    password = env['ADMIN_PASSWORD']

    print("email", email)
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        print("Superuser already exists!")
        return

    # Tworzenie superusera
    hashed_password = pwd_context.hash(password)
    superuser = User(email=email, password=hashed_password, is_admin=True, is_trainer=True)

    db.add(superuser)
    db.commit()
    db.refresh(superuser)
    print(f"Superuser {email} created!")


