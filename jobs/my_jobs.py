import logging
from apscheduler.schedulers.background import BackgroundScheduler

from app.check_unregistered_payments import check_unregistered_payments_with_db
from app.database import SessionLocal
from jobs.tasks import remove_unactive_records, remove_unpaid_records

logging.basicConfig()
logging.getLogger('apscheduler').setLevel(logging.DEBUG)


def remove_unactive_records_with_db():
    session = SessionLocal()
    try:
        remove_unactive_records(session)
    finally:
        session.close()

def delete_unpaid_records_with_db():
    session = SessionLocal()
    try:
        remove_unpaid_records(session)
    finally:
        session.close()



scheduler = BackgroundScheduler()
scheduler.add_job(remove_unactive_records_with_db, 'cron', minute=1)
scheduler.add_job(delete_unpaid_records_with_db, 'cron', minute=2)
scheduler.add_job(check_unregistered_payments_with_db, 'cron', minute='*', id='check_payments', replace_existing=True)


if not scheduler.running:
    scheduler.start()

