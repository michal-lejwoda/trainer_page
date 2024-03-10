from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from jobs.my_jobs import scheduler
from .database import engine, Base
from .routers import users, reservation

app = FastAPI()

Base.metadata.create_all(bind=engine)

origins = ['http://0.0.0.0:80',
           'http://0.0.0.0:80'
           ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(reservation.router)
scheduler.start()
