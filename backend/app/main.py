# -*- coding: utf-8 -*-
from .routers import users, appointment, interview
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import uvicorn, time
from jose import JWTError, jwt
from .dependencies import SECRET_KEY, ALGORITHM

from . import crud, models, schemas
from .database import SessionLocal, engine, get_db
from .security import get_current_user

models.Base.metadata.create_all(bind=engine)


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(appointment.router)
app.include_router(interview.router)


@app.get("/notifications", response_model=list[schemas.Notification])
def read_notifications(
    skip: int = 0,
    limit: int = 100,
    db=Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    notifications = crud.read_notifications(db, skip=skip, limit=limit)
    return notifications


@app.post("/notifications", response_model=schemas.Notification)
def add_notification(notification: schemas.NotificationBase, db=Depends(get_db)):
    return crud.add_notification(db, notification)
