from pydantic import BaseModel


class UserBase(BaseModel):
    username: str


class User(UserBase):
    id: int


class UserInDB(User):
    hashed_password: str


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class NotificationBase(BaseModel):
    title: str
    content: str


class Notification(NotificationBase):
    created_at: int
    updated_at: int
