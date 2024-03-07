from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from .. import crud, models, schemas, security
from ..database import get_db

router = APIRouter(prefix='/interview', tags=['interview'])


@router.get("", response_model=list[schemas.InterviewSession])
def read_interview_session(db: Session = Depends(get_db)):
    return crud.read_interview_session(db)

@router.post("", response_model=schemas.InterviewSession)
def add_interview_session(interview_session: schemas.InterviewSession, db: Session = Depends(get_db)):
    return crud.add_interview_session(db, interview_session)