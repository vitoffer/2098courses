from typing import Annotated, List

from fastapi import APIRouter, Depends, Path
from models.database import get_session
from models.models import Course
from sqlmodel import Session, select, text
from conf.depencies import check_is_super_user

router = APIRouter(
    prefix='/courses',
    tags=['courses'],
)


@router.get('/')
async def get_courses(*, session: Session = Depends(get_session)):
    courses = session.exec(select(Course))
    cs = []
    for i in courses:
        s = i.schedule.model_dump()
        c = i.model_dump()
        c.update({'schedule': s})
        cs.append(c)
        print(cs)
    return cs


@router.get(
    '/{course_id}',
)
async def get_course(
    course_id: Annotated[int, Path(title='The ID of item to get')],
): ...


@router.get('/teachers/')
async def get_teachers(*, session: Session = Depends(get_session)):
    teachers = set(
        [i.model_dump()['teacher'] for i in session.exec(select(Course)).all()]
    )
    return list(teachers)


@router.get('/addresses/')
async def get_addresses(*, session: Session = Depends(get_session)):
    addresses = set(
        [i.model_dump()['address'] for i in session.exec(select(Course)).all()]
    )
    return addresses


@router.get('/orientation/')
async def get_orientarions(*, session: Session = Depends(get_session)):
    orientations = set(
        [
            i.model_dump()['orientation']
            for i in session.exec(select(Course)).all()
        ]
    )
    return orientations
