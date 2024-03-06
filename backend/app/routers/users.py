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


# @router.post('/login', response_model=schemas.Token)
# def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
#     ret = crud.login(db, user)
#     if ret:
#         experation_time = int(time.time() + timedelta(days=1).total_seconds())
#         token_data = {"sub": ret.username, "exp": experation_time}
#         token = jwt.encode(token_data, SECRET_KEY, ALGORITHM)
#         return {
#             "status": "success",
#             "message": "login success",
#             "token": {"access_token": token, "token_type": "bearer"},
#         }
#     else:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="username or passwrod is incorrect",
#         )


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


@router.get('/me', response_model=schemas.User)
def read_me(current_user: models.User = Depends(security.get_current_user)):
    return current_user
