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
    username = Column(String(length=255), unique=True, index=True)
    hashed_password = Column(String(length=255))


class Notification(Base, BaseInfo):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True)

    title = Column(String(length=255))
    content = Column(String(length=255))


class AppointmenApplication(Base, BaseInfo):
    __tablename__ = "appointment_applications"

    id = Column(Integer, primary_key=True)

    username = Column(String(length=255))
    title = Column(String(length=255))
    self_introduction = Column(String(length=255))
    learn_progress = Column(String(length=255))


class InterviewSession(Base, BaseInfo):
    __tablename__ = "interview_sessions"

    id = Column(Integer, primary_key=True)
    name = Column(String(length=255))
    start_time = Column(Integer)
    end_time = Column(Integer)
    capacity = Column(Integer)
    registered = Column(Integer)
    location = Column(String(length=255))
    tips = Column(String(length=255))
