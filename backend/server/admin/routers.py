import os
from shutil import copyfileobj
from typing import Annotated

from conf.settings import BASE_DIR
from fastapi import APIRouter, Path, UploadFile

TABLES_DIR = BASE_DIR / 'cache'

router = APIRouter(prefix='/admin', tags=['admin'])


@router.post('/upload_table')
async def upload_table(table: UploadFile):
    with open(f'{TABLES_DIR}/{table.filename}', 'wb') as buffer:
        copyfileobj(table.file, buffer)

    return {'filename': table.filename}


@router.post('/delete_table/{table_name}')
async def delete_table(
    table_name: Annotated[str, Path(title='Name of table to delete')],
):
    try:
        os.remove(f'{TABLES_DIR}/{table_name}.xlsx')
        return {'detail': 'Succsess'}
    except Exception:
        return {'detail': 'File doesn`t exist'}


@router.get('/get_tables')
async def get_tables_names():
    return {
        'tables': list(map(lambda x: x.split('.')[0], os.listdir(TABLES_DIR)))
    }
