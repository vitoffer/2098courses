from pydantic import BaseModel


class DeleteTables(BaseModel):
    tables_names: list[str]


class UploadTabelToDb(BaseModel):
    tables_names: list[str]


class CourseType(BaseModel):
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
