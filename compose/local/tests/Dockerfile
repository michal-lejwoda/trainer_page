# Używamy obrazu Pythona jako bazowego
FROM python:3.10.12-bullseye

# Ustawiamy katalog roboczy
WORKDIR /code

RUN apt-get update

COPY . /code

COPY ./requirements.txt /code/requirements.txt

# Instalujemy zależności
RUN pip install --no-cache-dir -r requirements.txt


# Jeśli testy mają działać w osobnym kontenerze, dodajemy możliwość ich uruchomienia
CMD ["pytest", "code/tests"]