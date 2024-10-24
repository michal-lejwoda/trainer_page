import datetime
import gettext

from fastapi import Request

from app.reservations.models import WorkHours


def daterange(start_date, end_date):
    for n in range((end_date - start_date).days + 1):
        yield start_date + datetime.timedelta(n)


def get_locale(request: Request):
    accept_language = request.headers.get("Accept-Language", "en")
    lang_code = accept_language.split(",")[0].strip()
    return gettext.translation('base', localedir='locales', languages=[lang_code], fallback=True).gettext


def generate_date_range(start_date, end_date):
    current_date = start_date
    while current_date <= end_date:
        yield current_date
        current_date += datetime.timedelta(days=1)


def generate_work_hours(single_date, start_hour, end_hour, trainer_id):
    current_time = datetime.datetime.combine(single_date, start_hour)
    end_time = datetime.datetime.combine(single_date, end_hour)

    work_hours_list = []

    while current_time < end_time:
        next_time = current_time + datetime.timedelta(hours=1)
        work_hours_list.append(
            WorkHours(
                start_datetime=current_time,
                end_datetime=next_time,
                trainer_id=trainer_id,
                is_active=True
            )
        )
        current_time = next_time

    return work_hours_list
