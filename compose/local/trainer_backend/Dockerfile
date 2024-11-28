FROM python:3.10.12-bullseye
LABEL author="michal"

WORKDIR /code

RUN apt-get update && apt-get install -y gettext && apt-get install -y nano


COPY . /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./compose/local/trainer_backend/create_versions_directory.sh /scripts/create_versions_directory.sh
RUN chmod +x /scripts/create_versions_directory.sh

COPY ./compose/local/trainer_backend/createsuperuser.sh /scripts/createsuperuser.sh
COPY ./compose/local/trainer_backend/check_unregistered_payments.sh /scripts/check_unregistered_payments.sh

RUN chmod +x /scripts/createsuperuser.sh
RUN chmod +x /scripts/check_unregistered_payments.sh

ENTRYPOINT ["/scripts/create_versions_directory.sh","/scripts/createsuperuser.sh","/scripts/check_unregistered_payments.sh"]

CMD ["sh", "-c", "python -m app.createsuperuser && uvicorn app.local:app --host 0.0.0.0 --port 8000 --reload"]

