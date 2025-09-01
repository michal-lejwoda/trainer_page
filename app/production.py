from .base import create_app

origins = ['https://www.personal-trainer-michal.pl', 'https://personal-trainer-michal.pl']

app = create_app(origins)
