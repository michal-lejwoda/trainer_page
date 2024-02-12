from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from .routers import users, reservation

app = FastAPI()

Base.metadata.create_all(bind=engine)

origins = ['http://trener-personalny-michal.pl', 'https://www.trener-personalny-michal.pl', 'https://trener-personalny-michal.pl']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(reservation.router)
