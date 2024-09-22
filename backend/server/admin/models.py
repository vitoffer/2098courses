from pydantic import BaseModel
from typing import Optional


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
    description: Optional[str] = None
    orientation: Optional[str] = None
    url: Optional[str] = None


class ScheduleType(BaseModel):
    monday: Optional[str] = None
    tuesday: Optional[str] = None
    wednesday: Optional[str] = None
    thursday: Optional[str] = None
    friday: Optional[str] = None
    saturday: Optional[str] = None
