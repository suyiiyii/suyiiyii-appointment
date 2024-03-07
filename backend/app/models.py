from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import time

from .database import Base


def get_time():
    return int(time.time())


class BaseInfo(object):
    created_at = Column(Integer, default=get_time)
    updated_at = Column(Integer, default=get_time, onupdate=get_time)


class User(Base, BaseInfo):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(length=100), unique=True, index=True)
    hashed_password = Column(String(length=100))


class Notification(Base, BaseInfo):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True)

    title = Column(String(length=100))
    content = Column(String(length=100))
