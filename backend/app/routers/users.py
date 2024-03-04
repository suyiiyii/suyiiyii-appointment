# -*- coding: utf-8 -*-
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel
import jwt
from ..dependencies import SECRET_KEY
from ..dependencies import ALGORITHM
from datetime import timedelta
import time

router = APIRouter(prefix='/users', tags=['users'])


users_sheet = [{"username": "su", "password": "qwe"}]


@router.get('/', tags=["users"])
async def read_users():
    return users_sheet


class User_login(BaseModel):
    username: str
    password: str


@router.post('/login')
def login(user: User_login):
    username = user.username
    password = user.password
    for user in users_sheet:
        if user['username'] == username and user['password'] == password:
            experation_time = int(time.time() + timedelta(days=1).total_seconds())
            token_data = {"sub": user["username"], "exp": experation_time}
            token = jwt.encode(token_data, SECRET_KEY, ALGORITHM)
            return {
                "status": "success",
                "message": "login success",
                "token": {"access_token": token, "token_type": "bearer"},
            }
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="username or passwrod is incorrect",
    )
