from sqlmodel import Field, SQLModel


class Course(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    is_paid: bool
    address: str
    teacher: str
    for_ages: str
    name: str
    monday: str | None
    tuesday: str | None
    wednesday: str | None
    thursday: str | None
    friday: str | None
    saturday: str | None


class Teacher(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    subject: str
