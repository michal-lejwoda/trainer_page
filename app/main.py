from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from .routers import users, reservation

app = FastAPI()

Base.metadata.create_all(bind=engine)

#TODO WTF!!! Back here
# origins = ['*']
# origins = ["http://0.0.0.0:80", "http://0.0.0.0:8000", "http://trainer_backend:8000", "http://localhost:80", "http://localhost:8000", "http://0.0.0.0"]
origins = ['http://trener-personalny-michal.pl', 'https://www.trener-personalny-michal.pl', 'https://trener-personalny-michal.pl',
           'http://0.0.0.0:8000', 'http://0.0.0.0:80', 'http://0.0.0.0:3000', 'http://localhost:8000', 'http://localhost:80', 'http://localhost:3000',
           'http://0.0.0.0', 'http://www.trener-personalny-michal.pl']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(reservation.router)
