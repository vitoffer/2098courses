from typing import Annotated, List

from fastapi import APIRouter, Depends, Path
from models.database import get_session
from models.models import Course
from sqlmodel import Session, select

router = APIRouter(
    prefix='/courses',
    tags=['courses'],
)


@router.get('/', response_model=List[Course])
async def get_courses(*, session: Session = Depends(get_session)):
    courses = session.exec(select(Course))
    return courses


@router.get(
    '/{course_id}',
)
async def get_course(
    course_id: Annotated[int, Path(title='The ID of item to get')],
): ...
