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


class UserChangePassword(BaseModel):
    oldpassword: str
    newpassword: str


class Token(BaseModel):
    access_token: str
    token_type: str


class NotificationBase(BaseModel):
    title: str
    content: str


class Notification(NotificationBase):
    created_at: int
    updated_at: int


class AppointmenApplication(BaseModel):
    title: str
    self_introduction: str
    learn_progress: str

    class Config:
        orm_mode = True


class AppointmenApplicationInDB(AppointmenApplication):
    username: str

    class Config:
        orm_mode = True


class InterviewSession(BaseModel):
    id: int
    name: str
    start_time: int
    end_time: int
    capacity: int
    registered: int
    location: str
    tips: str

    class Config:
        orm_mode = True
