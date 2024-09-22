from sqlmodel import Field, SQLModel, Relationship


class Course(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    is_paid: bool
    address: str
    teacher: str
    for_ages: str
    name: str
    orientation: str | None
    description: str | None
    url: str | None
    schedule_id: int | None = Field(default=None, foreign_key='schedule.id')
    schedule: 'Schedule' = Relationship(back_populates='course')


class Schedule(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    monday: str | None
    tuesday: str | None
    wednesday: str | None
    thursday: str | None
    friday: str | None
    saturday: str | None
    course: Course | None = Relationship(
        sa_relationship_kwargs={'uselist': False}, back_populates='schedule'
    )


class Teacher(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    subject: str


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(index=True)
    disabled: bool
    password: str
    is_super_user: bool
