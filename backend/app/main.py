# -*- coding: utf-8 -*-
from .routers import users
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from . import crud, models, schemas
from .database import SessionLocal, engine, get_db

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


@app.get("/notifications", response_model=list[schemas.Notification])
def read_notifications(skip: int = 0, limit: int = 100, db=Depends(get_db)):
    notifications = crud.read_notifications(db, skip=skip, limit=limit)
    return notifications

@app.post("/notifications", response_model=schemas.Notification)
def add_notification(notification: schemas.NotificationBase, db=Depends(get_db)):
    return crud.add_notification(db, notification)
