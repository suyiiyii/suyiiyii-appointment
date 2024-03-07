from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from .. import crud, models, schemas, security
from ..database import get_db

router = APIRouter(prefix='/appointment', tags=['appointment'])


@router.get('', response_model=schemas.AppointmenApplication)
def read_appointmenApplication(
    # username: str,
    current_user: str = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """
    Get appointment application by username
    """
    try:
        appointmenApplication = crud.read_appointmenApplication(db, username=current_user.username)
    except crud.ObjectNotFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found"
        )
    return appointmenApplication


@router.post('', response_model=schemas.AppointmenApplication)
def add_appointmenApplication(
    appointmenApplication: schemas.AppointmenApplication,
    current_user: str = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    print(current_user)
    appointmenApplicationInDB = schemas.AppointmenApplicationInDB(
        **appointmenApplication.dict(), username=current_user.username
    )
    try:
        crud.add_appointmenApplication(db, appointmenApplicationInDB)
    except crud.ObjectAlreadyExists:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Appointment already exist"
        )
    return appointmenApplication


@router.delete('')
def del_appointmenApplication(
    # username: str,
    current_user: str = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """
    Delete appointment application by username
    """
    try:
        appointmenApplication = crud.del_appointmenApplication(
            db, username=current_user.username
        )
    except crud.ObjectNotFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found"
        )
    return "success"
