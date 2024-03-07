from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import time

from .database import Base


def get_time():
    return int(time.time())


# 表基本信息
class BaseInfo(object):
    created_at = Column(Integer, default=get_time)
    updated_at = Column(Integer, default=get_time, onupdate=get_time)


# 用户表
class User(Base, BaseInfo):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(length=255), unique=True, index=True)
    hashed_password = Column(String(length=255))


# 通知表
class Notification(Base, BaseInfo):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True)

    title = Column(String(length=255))
    content = Column(String(length=255))


# 面试申请表
class AppointmenApplication(Base, BaseInfo):
    __tablename__ = "appointment_applications"

    id = Column(Integer, primary_key=True)

    username = Column(String(length=255))
    title = Column(String(length=255))
    self_introduction = Column(String(length=255))
    learn_progress = Column(String(length=255))


# 面试Session表
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


# 个人与面试Session关联表
class UserInterviewSession(Base, BaseInfo):
    __tablename__ = "user_interview_sessions"

    id = Column(Integer, primary_key=True)
    username = Column(String(length=255))
    session_name = Column(String(length=255))
