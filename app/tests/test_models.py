from app.reservations.models import Trainer


def test_create_trainer(db_session):
    trainer = Trainer(name="John", last_name="Doe", phone_number="123456789")
    db_session.add(trainer)
    db_session.commit()

    trainer_from_db = db_session.query(Trainer).first()
    assert trainer_from_db is not None
    assert trainer_from_db.name == "John"
    assert trainer_from_db.last_name == "Doe"
    assert trainer_from_db.phone_number == "123456789"
