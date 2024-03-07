# -*- coding: utf-8 -*-
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

# from ..dependencies import SECRET_KEY
# from ..dependencies import ALGORITHM
import time
from fastapi.security import OAuth2PasswordRequestForm

from .. import crud, models, schemas, security
from ..database import get_db


router = APIRouter(prefix='/users', tags=['users'])


class User_login(BaseModel):
    username: str
    password: str


@router.post('/login', response_model=schemas.Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> schemas.Token:
    user = security.authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = security.create_access_token(form_data.username)
    token = schemas.Token(access_token=access_token, token_type="bearer")
    return token


@router.post('/register', response_model=schemas.User)
def register(user: schemas.UserLogin, db: Session = Depends(get_db)):

    # if user.username[:4] != '3123':
    #     raise HTTPException(
    #         status_code=status.HTTP_400_BAD_REQUEST, detail="username is invalid"
    #     )

    if res := crud.create_user(db, user):
        return res
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="username already exists",
        )


@router.post('/change_password', response_model=schemas.User)
def change_password(
    passwd: schemas.UserChangePassword,
    current_user: schemas.UserInDB = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    if res := crud.change_password(db, current_user, passwd):
        return current_user
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="password is incorrect",
        )


@router.get('/me', response_model=schemas.UserInDB)
def read_me(current_user: models.User = Depends(security.get_current_user)):
    return current_user
