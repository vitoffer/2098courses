from sqlmodel import Session
from fastapi import Header, HTTPException
from models.database import create_db_and_tables, engine
from models.models import *
from typing import Annotated
import jwt

from .settings import PWD_CONTEXT, ALGORITHM, SECRET


def get_password_hash(password):
    return PWD_CONTEXT.hash(password)


def create_api_token(host: str):
    data = {'th': host, 'iA': True}
    return jwt.encode(data, SECRET, algorithm=ALGORITHM)


def cerate_su():
    create_db_and_tables()
    username = input('Username: ')
    pass1 = input('Password: ')
    pass2 = input('Repeat password: ')
    if pass1 == pass2:
        with Session(engine) as session:
            session.add(
                User(
                    username=username,
                    password=get_password_hash(pass1),
                    disabled=False,
                    is_super_user=True,
                )
            )
            session.commit()
        print('Super user created successfully!')
        return
    print('Password are not correct')
    return


async def check_api_token(x_token: Annotated[str, Header()]):
    try:
        payload = jwt.decode(x_token, SECRET, algorithms=ALGORITHM)
        approved: bool = payload.get('iA')
        host: str = payload.get('th')
        if approved and host:
            return True
    except jwt.exceptions.DecodeError:
        raise HTTPException(status_code=400, detail='X-Token header invailid')
