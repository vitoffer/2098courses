from sqlmodel import Session
from fastapi import Header
from models.database import create_db_and_tables, engine
from models.models import *
from typing import Annotated

from .settings import PWD_CONTEXT


def get_password_hash(password):
    return PWD_CONTEXT.hash(password)


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


async def check_is_super_user(Authorization: Annotated[str, Header()]):
    print(Authorization)
