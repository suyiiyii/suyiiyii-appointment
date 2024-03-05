from pydantic import BaseModel


class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    username: str
    password: str


class TokenData(BaseModel):
    access_token: str
    token_type: str


class Token(BaseModel):
    status: str
    message: str
    token: TokenData

class Notification(BaseModel):
    title: str
    content: str