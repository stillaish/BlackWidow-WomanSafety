from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import Feedback
from schemas import FeedbackCreate, FeedbackOut

router = APIRouter(prefix="/feedback", tags=["Feedback"])


@router.post("/", response_model=FeedbackOut)
def create_feedback(payload: FeedbackCreate, db: Session = Depends(get_db)):
    fb = Feedback(
        overall_rating=payload.overallRating,
        category_ratings=payload.categoryRatings,
        feedback_text=payload.feedbackText,
        feedback_category=payload.feedbackCategory,
        usage_context=payload.usageContext,
        anonymous=payload.anonymous,
    )
    db.add(fb)
    db.commit()
    db.refresh(fb)
    return fb


@router.get("/", response_model=List[FeedbackOut])
def list_feedback(db: Session = Depends(get_db)):
    return db.query(Feedback).order_by(Feedback.created_at.desc()).all()
