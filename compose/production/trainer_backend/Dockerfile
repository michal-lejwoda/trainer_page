FROM python:3.10.12-bullseye
LABEL author="michal"

WORKDIR /code

RUN apt-get update && apt-get install -y gettext

COPY . /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./compose/local/trainer_backend/create_versions_directory.sh /scripts/create_versions_directory.sh
RUN chmod +x /scripts/create_versions_directory.sh

COPY ./compose/production/trainer_backend/createsuperuser.sh /scripts/createsuperuser.sh
COPY ./compose/production/trainer_backend/check_unregistered_payments.sh /scripts/check_unregistered_payments.sh

RUN chmod +x /scripts/createsuperuser.sh
RUN chmod +x /scripts/check_unregistered_payments.sh

#COPY ./compose/local/trainer_backend/start_trainer_backend ./start_trainer_backend
#
#RUN sed -i 's/\r$//g' ./start_trainer_backend
#RUN chmod +x ./start_trainer_backend
#

COPY ./app /code/app

COPY ./migrations /code/migrations

COPY ./alembic.ini /code/alembic.ini


#CMD ["uvicorn", "app.production:app", "--host", "0.0.0.0", "--port", "8000"]

ENTRYPOINT ["/scripts/create_versions_directory.sh","/scripts/createsuperuser.sh","/scripts/check_unregistered_payments.sh"]

CMD ["sh", "-c", "python -m app.createsuperuser && uvicorn app.production:app --host 0.0.0.0 --port 8000"]