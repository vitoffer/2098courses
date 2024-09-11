# Файл запуска API

from conf.parser import called
from conf.settings import ORIGINS
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.database import create_db_and_tables, get_session
from models.models import *
from routers import courses
from admin import routers

from models import database

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(courses.router)
app.include_router(routers.router)


@app.on_event('startup')
def on_startup():
    create_db_and_tables()


if __name__ == '__main__':
    called(app)
