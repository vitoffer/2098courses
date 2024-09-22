from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
import jwt
from jwt.exceptions import InvalidTokenError
from typing import Annotated

from models.models import User
from models.database import get_session
from models.types import UserType, UserTypeInDB, Token, TokenData
from conf.settings import (
    AUTH_SCHEME,
    SECRET,
    ALGORITHM,
    EXPIRE_DELTA,
    PWD_CONTEXT,
)
from conf.depencies import get_password_hash

router = APIRouter(
    prefix='/auth',
)


def verify_password(plain_password, hash_password) -> bool:
    return PWD_CONTEXT.verify(plain_password, hash_password)


def get_user(session: Session, username: str):
    user = session.exec(select(User).where(User.username == username)).one()
    if user:
        return UserTypeInDB(**user.model_dump())


def authenticate_user(session: Session, username: str, password: str):
    user = get_user(session, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({'exp': expire})
    return jwt.encode(to_encode, SECRET, algorithm=ALGORITHM)


async def get_current_user(
    token: Annotated[str, Depends(AUTH_SCHEME)],
    session: Session = Depends(get_session),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not load credentials',
        headers={'WWW-Authenticate': 'Bearer'},
    )
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        username: str = payload.get('sub')
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = get_user(session, token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail='Inactive user')
    return current_user


@router.post('/token')
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Session = Depends(get_session),
) -> Token:
    user = authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect username or password',
            headers={'WWW-Authenticate': 'Bearer'},
        )
    access_token_expires = timedelta(minutes=EXPIRE_DELTA)
    access_token = create_access_token(
        data={'sub': user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type='bearer')


@router.get('/users/me/', response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user


@router.post('/users/create/')
async def create_user(
    user_data: UserTypeInDB, session: Session = Depends(get_session)
):
    user_data.password = get_password_hash(user_data.password)
    session.add(User(**user_data.model_dump()))
    session.commit()
    return {'detail': 'success'}
