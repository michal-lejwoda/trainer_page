import logging
from apscheduler.schedulers.background import BackgroundScheduler
from app.database import SessionLocal
from jobs.tasks import remove_unactive_records

logging.basicConfig()
logging.getLogger('apscheduler').setLevel(logging.DEBUG)

def test_message_every_minute():
    print("test_message", flush=True)
    logging.info("test_message123")

def remove_unactive_records_with_db():
    session = SessionLocal()
    try:
        remove_unactive_records(session)
    finally:
        session.close()

scheduler = BackgroundScheduler()
scheduler.add_job(test_message_every_minute, 'interval', minutes=1)

if not scheduler.running:
    print("Starting scheduler...")
    scheduler.start()
else:
    print("Scheduler already running.")
