from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class UserType(BaseModel):
    username: str
    disabled: bool | None = None
    is_super_user: bool = False


class UserTypeInDB(UserType):
    password: str
