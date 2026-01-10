from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import UnsafeAreaReport
from schemas import UnsafeAreaReportCreate

router = APIRouter(prefix="/unsafe-areas", tags=["Unsafe Areas"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/report")
def report_unsafe_area(data: UnsafeAreaReportCreate, db: Session = Depends(get_db)):
    report = UnsafeAreaReport(
        latitude=data.location["lat"],
        longitude=data.location["lng"],
        category=data.category,
        description=data.description,
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    return {"status": "reported", "id": report.id}

@router.get("/")
def get_reports(db: Session = Depends(get_db)):
    reports = db.query(UnsafeAreaReport).all()
    return reports
