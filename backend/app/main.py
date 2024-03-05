# -*- coding: utf-8 -*-
from .routers import users
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from . import crud, models, schemas
from .database import SessionLocal, engine

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
