from .base import create_app

origins = ['https://www.trener-personalny-michal.pl', 'https://trener-personalny-michal.pl']

app = create_app(origins)
