#!/bin/bash
python -c "from app.check_unregistered_payments import check_unregistered_payments; check_unregistered_payments()"
exec "$@"