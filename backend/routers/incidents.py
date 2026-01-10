from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Incident
from schemas import IncidentCreate

router = APIRouter(prefix="/incidents", tags=["Incidents"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def log_incident(data: IncidentCreate, db: Session = Depends(get_db)):
    incident = Incident(type=data.type, payload=data.payload)
    db.add(incident)
    db.commit()
    return {"status": "logged"}
