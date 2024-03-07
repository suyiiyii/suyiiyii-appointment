from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from .. import crud, models, schemas, security
from ..database import get_db
from ..security import get_current_user

router = APIRouter(prefix='/interview', tags=['interview'])


@router.get("", response_model=list[schemas.InterviewSession])
def get_interview_session(
    db: Session = Depends(get_db),
    current_user: schemas.UserInDB = Depends(get_current_user),
):
    return crud.read_interview_session(db)


@router.post("", response_model=schemas.InterviewSession)
def add_interview_session(
    interview_session: schemas.InterviewSession,
    db: Session = Depends(get_db),
    current_user: schemas.UserInDB = Depends(get_current_user),
):
    return crud.add_interview_session(db, interview_session)


@router.get("/register")
def register_interview_session(
    session_name: str,
    db: Session = Depends(get_db),
    current_user: schemas.UserInDB = Depends(get_current_user),
):
    # 检查是否已经注册
    if crud.read_interview_session(db, session_name):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Session already registered"
        )
    crud.add_interview_session_relation(db, current_user.username, session_name)
    return session_name


@router.get("/by_username", response_model=list[schemas.InterviewSession])
def get_interview_session_by_username(
    db: Session = Depends(get_db),
    current_user: schemas.UserInDB = Depends(get_current_user),
):
    return crud.read_interveiw_session_by_username(db, current_user.username)
