import os
from shutil import copyfileobj

# import openpyxl as xl
from docx.api import Document
from sqlmodel import Session
from models.models import Course
from models.database import get_session
from .models import DeleteTables, UploadTabelToDb
from conf.settings import BASE_DIR
from fastapi import APIRouter, Path, UploadFile, Depends
import bs4
import requests

TABLES_DIR = BASE_DIR / 'cache'
SCHOOL = 'https://sch2098s.mskobr.ru/o-nas/pedagogicheskii-sostav'

KEYS = [
    'teacher',
    'name',
    'for_ages',
    'class',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
]

router = APIRouter(prefix='/admin', tags=['admin'])


# Парсер для получения списка учителей
# @router.get('/get-teacher-list')
# async def get_tachers():
#     res = requests.get(SCHOOL)
#     with open(f'{TABLES_DIR}/index.txt', 'wb') as f:
#         f.write(res.content)
#     with open(f'{TABLES_DIR}/index.txt', 'r') as f:
#         s = f.read()
#     site = bs4.BeautifulSoup(s, 'html.parser')
#     divs = site.findAll('div')
#     # teachers = bs4.Tag()
#     for i in divs:
#         try:
#             if i['class'] == ['container-sortable2', 'group-teachers'] :
#                 teachers = i
#                 break
#         except Exception:
#             print('')
#     divs = bs4.BeautifulSoup(str(teachers.prettify()), 'html.parser')
#     return {}


@router.post('/upload_table')
async def upload_table(table: UploadFile):
    with open(f'{TABLES_DIR}/{table.filename}', 'wb') as buffer:
        copyfileobj(table.file, buffer)

    return {'filename': table.filename}


@router.post('/delete_table')
async def delete_table(
    table_names: DeleteTables,
):
    map(lambda x: os.remove(f'{TABLES_DIR}/{x}'), table_names.tables_names)
    return {'Detail': 'Success'}


@router.get('/get_tables')
async def get_tables_names():
    return {'tables': list(map(lambda x: x, os.listdir(TABLES_DIR)))}


@router.post('/add_data_to_base')
async def add_to_base(
    tables: UploadTabelToDb, session: Session = Depends(get_session)
):
    for name in tables.tables_names:
        document = Document(f'{TABLES_DIR}/{name}')
        tables = document.tables
        for j in tables:
            for k, row in enumerate(j.rows):
                if k > 1:
                    text = [cell.text for cell in row.cells]
                    data = {KEYS[_]: text[_] for _ in range(len(text))}
                    if 'is_paid' not in data.keys():
                        data['is_paid'] = False
                    if 'address' not in data.keys():
                        data['address'] = ''
                    session.add(Course(**data))
        session.commit()
        return {'Result': 'Success'}
