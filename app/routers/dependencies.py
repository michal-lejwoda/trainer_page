from fastapi import HTTPException, Cookie


def verify_jwt_trainer_auth(jwt_trainer_auth: str | None = Cookie(None)):
    if jwt_trainer_auth is None:
        raise HTTPException(status_code=401, detail='You need to log in')
    return jwt_trainer_auth