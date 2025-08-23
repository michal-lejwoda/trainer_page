#!/bin/bash

if [ ! -d "/code/migrations/versions" ]; then
    mkdir -p /code/migrations/versions
    echo "Created migrations versions /code/migrations/versions"
fi
exec "$@"
