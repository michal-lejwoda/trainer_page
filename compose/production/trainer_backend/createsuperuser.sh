#!/bin/bash
python -c "from app.createsuperuser import create_superuser; create_superuser()"
exec "$@"