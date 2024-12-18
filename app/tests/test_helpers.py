from datetime import date, time, datetime, timedelta
from unittest.mock import MagicMock

from app.reservations.helpers import daterange, get_locale, generate_date_range, generate_work_hours
from app.reservations.models import WorkHours


def test_daterange():
    start_date = date(2024, 12, 1)
    end_date = date(2024, 12, 5)

    result = list(daterange(start_date, end_date))

    assert len(result) == 5
    assert result[0] == date(2024, 12, 1)
    assert result[-1] == date(2024, 12, 5)

def test_get_locale():
    request = MagicMock()
    request.headers = {"Accept-Language": "pl,en;q=0.9"}
    gettext_func = get_locale(request)
    assert callable(gettext_func)

def test_get_locale_default():
    request = MagicMock()
    request.headers = {}


    gettext_func = get_locale(request)


    assert callable(gettext_func)


def test_generate_date_range():
    start_date = date(2024, 12, 1)
    end_date = date(2024, 12, 3)

    result = list(generate_date_range(start_date, end_date))

    assert len(result) == 3
    assert result[0] == date(2024, 12, 1)
    assert result[1] == date(2024, 12, 2)
    assert result[2] == date(2024, 12, 3)


def test_generate_work_hours():
    single_date = date(2024, 12, 18)
    start_hour = time(9, 0)
    end_hour = time(12, 0)
    trainer_id = 1

    work_hours_list = generate_work_hours(single_date, start_hour, end_hour, trainer_id)

    assert len(work_hours_list) == 3
    assert isinstance(work_hours_list[0], WorkHours)
    assert work_hours_list[0].start_datetime == datetime(2024, 12, 18, 9, 0)
    assert work_hours_list[0].end_datetime == datetime(2024, 12, 18, 10, 0)
    assert work_hours_list[1].start_datetime == datetime(2024, 12, 18, 10, 0)
    assert work_hours_list[2].start_datetime == datetime(2024, 12, 18, 11, 0)
    assert work_hours_list[2].end_datetime == datetime(2024, 12, 18, 12, 0)
