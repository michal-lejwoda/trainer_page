#!/bin/bash
echo "tesadasdsasaddsadsa"
if [ ! -d "/code/migrations/versions" ]; then
    mkdir -p /code/migrations/versions
    echo "Utworzono folder /code/migrations/versions"
fi
echo "Nie trzeba"
exec "$@"
