from datetime import datetime, timedelta
from typing import Union

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
import hashlib
from . import crud, schemas
from .database import get_db
import time
from sqlalchemy.orm import Session

SECRET_KEY = "suyiiyii"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/users/login')


class TokenPayload(BaseModel):
    sub: str
    exp: int


class Token(BaseModel):
    access_token: TokenPayload
    token_type: str


class TokenData(BaseModel):
    username: Union[str, None] = None


def get_hashed(password: str) -> str:
    return hashlib.sha256((password + 'suyiiyii').encode()).hexdigest()


def verify_password(password: str, hashed_password: str) -> bool:
    return hashed_password == get_hashed(password)


def authenticate_user(username: str, password: str, db=Depends(get_db)):
    user = crud.get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return True


def create_access_token(data: dict, expires_delta: int = -1):
    expire = time.time() + timedelta(days=1).total_seconds()
    to_encode = {'sub': data, 'exp': expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> schemas.UserInDB:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud.get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user
