from sqlmodel import Field, SQLModel


class Course(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    is_paid: bool
    address: str
    teacher: str
    time: str
    schedule: str
    for_ages: str
    name: str
