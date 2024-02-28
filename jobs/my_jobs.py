from functools import partial

from apscheduler.schedulers.background import BackgroundScheduler

from app.database import SessionLocal
from jobs.tasks import remove_unactive_records

scheduler = BackgroundScheduler()
remove_unactive_records_with_db = partial(remove_unactive_records)
scheduler.add_job(remove_unactive_records, 'cron', minute=1, args=[SessionLocal()])