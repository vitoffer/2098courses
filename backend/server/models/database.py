from conf.settings import DB_URL, DEBUG
from sqlmodel import SQLModel, create_engine, Session

engine = create_engine(DB_URL, echo=DEBUG)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
