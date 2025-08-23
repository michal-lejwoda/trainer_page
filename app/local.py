from .base import create_app

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
    "http://0.0.0.0:8000",
    "http://0.0.0.0:80",
    "http://0.0.0.0:3000",
]

app = create_app(origins)
