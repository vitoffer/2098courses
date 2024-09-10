# Файл запуска API

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from conf.settings import ORIGINS
from conf.parser import called

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    called(app)