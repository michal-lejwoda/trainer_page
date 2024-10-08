from .base import create_app

origins = ['http://0.0.0.0:80']

app = create_app(origins)
