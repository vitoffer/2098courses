from pydantic import BaseModel


class DeleteTables(BaseModel):
    tables_names: list[str]


class UploadTabelToDb(BaseModel):
    tables_names: list[str]
