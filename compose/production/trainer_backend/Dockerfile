FROM python:3.10.12-bullseye
LABEL author="michal"

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

COPY ./compose/local/trainer_backend/start_trainer_backend ./start_trainer_backend

RUN sed -i 's/\r$//g' ./start_trainer_backend
RUN chmod +x ./start_trainer_backend

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app

COPY ./migrations /code/migrations

COPY ./alembic.ini /code/alembic.ini


CMD ["uvicorn", "app.production:app", "--host", "0.0.0.0", "--port", "8000"]