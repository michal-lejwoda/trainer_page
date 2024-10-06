import datetime
import gettext
from typing import List

from app.reservations.schemas import WorkHourCreate
from fastapi import Request

def hour_range(single_date: datetime.date, start_hour: datetime.time, end_hour: datetime.time, trainer_id: int) -> List[WorkHourCreate]:
    list_of_elements = []
    end_of_start_hour = datetime.time(hour=start_hour.hour + 1, minute=start_hour.minute, second=start_hour.second,
                                      microsecond=start_hour.microsecond)
    while end_of_start_hour <= end_hour:
        list_of_elements.append(
            WorkHourCreate(day=single_date, start_time=start_hour, end_time=end_of_start_hour, is_active=True, trainer_id=trainer_id))
        start_hour = datetime.time(hour=start_hour.hour + 1, minute=start_hour.minute,
                                          second=start_hour.second, microsecond=start_hour.microsecond)
        end_of_start_hour = datetime.time(hour=end_of_start_hour.hour + 1, minute=end_of_start_hour.minute,
                                          second=end_of_start_hour.second, microsecond=end_of_start_hour.microsecond)
    return list_of_elements

def daterange(start_date, end_date):
    for n in range(int((end_date - start_date).days) + 1):
        yield start_date + datetime.timedelta(n)



def get_locale(request: Request):
    accept_language = request.headers.get("Accept-Language", "en")
    lang_code = accept_language.split(",")[0].strip()
    return gettext.translation('base', localedir='locales', languages=[lang_code], fallback=True).gettext
