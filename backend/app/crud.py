from sqlalchemy.orm import Session

from . import models, schemas, security

import hashlib


class ObjectAlreadyExists(Exception):
    pass


class ObjectNotFound(Exception):
    pass


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


def change_password(
    db: Session, user: schemas.UserInDB, pwd: schemas.UserChangePassword
):
    old_hashed_password = security.get_hashed(pwd.oldpassword)
    new_hashed_password = security.get_hashed(pwd.newpassword)
    if old_hashed_password != user.hashed_password:
        return None
    db_user = (
        db.query(models.User).filter(models.User.username == user.username).first()
    )
    db_user.hashed_password = new_hashed_password
    db.commit()
    return user


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


def add_appointmenApplication(
    db: Session, appointmenApplication: schemas.AppointmenApplicationInDB
):
    username = appointmenApplication.username
    application = (
        db.query(models.AppointmenApplication)
        .filter(models.AppointmenApplication.username == username)
        .first()
    )

    if application:
        raise ObjectAlreadyExists(application)
    db_appointmenApplication = models.AppointmenApplication(
        username=appointmenApplication.username,
        title=appointmenApplication.title,
        self_introduction=appointmenApplication.self_introduction,
        learn_progress=appointmenApplication.learn_progress,
    )
    db.add(db_appointmenApplication)
    db.commit()
    db.refresh(db_appointmenApplication)
    return db_appointmenApplication


def read_appointmenApplication(db: Session, username: str):
    res = (
        db.query(models.AppointmenApplication)
        .filter(models.AppointmenApplication.username == username)
        .first()
    )
    if res:
        return schemas.AppointmenApplicationInDB(
            id=res.id,
            username=res.username,
            title=res.title,
            self_introduction=res.self_introduction,
            learn_progress=res.learn_progress,
        )
    else:
        raise ObjectNotFound


def del_appointmenApplication(db: Session, username: str):
    res = (
        db.query(models.AppointmenApplication)
        .filter(models.AppointmenApplication.username == username)
        .first()
    )
    if res:
        db.delete(res)
        db.commit()
        return True
    else:
        raise ObjectNotFound


def read_interview_session(db: Session) -> list[schemas.InterviewSession]:
    res = db.query(models.InterviewSession).all()
    return [
        schemas.InterviewSession(
            id=item.id,
            name=item.name,
            start_time=item.start_time,
            end_time=item.end_time,
            capacity=item.capacity,
            registered=item.registered,
            location=item.location,
            tips=item.tips,
        )
        for item in res
    ]


def add_interview_session(db: Session, interview_session: schemas.InterviewSession):
    db_interview_session = models.InterviewSession(
        name=interview_session.name,
        start_time=interview_session.start_time,
        end_time=interview_session.end_time,
        capacity=interview_session.capacity,
        registered=interview_session.registered,
        location=interview_session.location,
        tips=interview_session.tips,
    )
    db.add(db_interview_session)
    db.commit()
    db.refresh(db_interview_session)
    return interview_session
