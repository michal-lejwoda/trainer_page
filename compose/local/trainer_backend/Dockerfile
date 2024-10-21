FROM python:3.10.12-bullseye
LABEL author="michal"

WORKDIR /code

RUN apt-get update && apt-get install -y gettext

COPY . /code

COPY ./requirements.txt /code/requirements.txt

COPY ./migrations /code/migrations

COPY ./compose/local/trainer_backend/create_versions_directory.sh /code/create_versions_directory.sh

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt





#RUN sed -i 's/\r$//g' ./create_versions_directory.sh.sh
#RUN chmod +x ./create_versions_directory.sh.sh





COPY ./alembic.ini /code/alembic.ini



CMD ["uvicorn", "app.local:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]