from .base import create_app

origins = [
    "http://localhost",
    "http://localhost:80",
    "http://127.0.0.1",
    "http://127.0.0.1:80",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://trainer_frontend:3000",
    "http://trainer_nginx",
    "http://trainer_nginx:80",
    "https://localhost",
    "https://localhost:443",

]

app = create_app(origins)
