from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request

from jobs.my_jobs import scheduler
from .database import engine, Base
from .routers import users, reservation
from .translation import active_translation


def create_app(origins: list) -> FastAPI:
    app = FastAPI()

    Base.metadata.create_all(bind=engine)


    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.middleware("http")
    async def get_accept_language(request: Request, call_next):
        lang = request.headers.get("Accept-Language", None)
        active_translation(lang)
        response = await call_next(request)
        return response


    app.include_router(users.router)
    app.include_router(reservation.router)

    scheduler.start()

    return app
