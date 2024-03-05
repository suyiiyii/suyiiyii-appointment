from sqlalchemy.orm import Session

from . import models, schemas

import hashlib


def get_hashed(password: str):
    return hashlib.md5((password + "suyiiyii").encode('utf-8')).hexdigest()

def check_user_exists(db: Session, username: str):
    user = db.query(models.User).filter(models.User.username == username).first()
    if user:
        return True
    return False
def create_user(db: Session, user: schemas.UserCreate):
    if check_user_exists(db, user.username):
        return None
    hashed_password = get_hashed(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def login(db: Session, user: schemas.UserLogin):
    username = user.username
    password = get_hashed(user.password)
    user = db.query(models.User).filter(models.User.username == username).first()
    if user:
        if user.hashed_password == password:
            return user
    return None
