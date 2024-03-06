from sqlalchemy.orm import Session

from . import models, schemas, security

import hashlib


def check_user_exists(db: Session, username: str):
    user = db.query(models.User).filter(models.User.username == username).first()
    if user:
        return True
    return False


def get_user(db: Session, username: str):
    user = db.query(models.User).filter(models.User.username == username).first()
    if user:
        return schemas.UserInDB(
            id=user.id, username=user.username, hashed_password=user.hashed_password
        )
    return None


def create_user(db: Session, user: schemas.UserCreate):
    if check_user_exists(db, user.username):
        return None
    hashed_password = security.get_hashed(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def login(db: Session, user: schemas.UserLogin):
    if not check_user_exists(db, user.username):
        return None
    username = user.username
    password = security.get_hashed(user.password)
    user = db.query(models.User).filter(models.User.username == username).first()
    if user:
        if user.hashed_password == password:
            return user
    return None


def read_notifications(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Notification).offset(skip).limit(limit).all()


def add_notification(db: Session, notification: schemas.NotificationBase):
    db_notification = models.Notification(
        title=notification.title, content=notification.content
    )
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification
