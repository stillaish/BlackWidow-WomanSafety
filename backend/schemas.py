from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import datetime

# =========================
# COMMON
# =========================

class Location(BaseModel):
    latitude: float
    longitude: float


# =========================
# SOS
# =========================

class SOSCreate(BaseModel):
    location: Optional[Location] = None
    level: Optional[str] = "LOW"



# =========================
# INCIDENTS
# =========================

class IncidentCreate(BaseModel):
    type: str
    payload: dict


# =========================
# UNSAFE AREAS
# =========================

class UnsafeAreaReportCreate(BaseModel):
    latitude: float
    longitude: float
    description: Optional[str] = None


# =========================
# TRUSTED CONTACTS
# =========================

class TrustedContactCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None


class TrustedContactUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    enabled: Optional[bool] = None


# =========================
# GEMINI
# =========================

class GeminiRequest(BaseModel):
    message: str


class GeminiResponse(BaseModel):
    response: str
    is_emergency: bool


# =========================
# EMERGENCY SESSIONS
# =========================

class EmergencySessionStart(BaseModel):
    location: Optional[Location] = None
    trigger_source: str


class EmergencySessionEnd(BaseModel):
    location: Optional[Location] = None
    reason: Optional[str] = "manual"


class EmergencySessionOut(BaseModel):
    id: int
    started_at: datetime
    ended_at: Optional[datetime] = None
    is_active: bool
    start_lat: Optional[float] = None
    start_lng: Optional[float] = None
    end_lat: Optional[float] = None
    end_lng: Optional[float] = None
    trigger_source: str

    class Config:
        from_attributes = True


# =========================
# FEEDBACK
# =========================

class FeedbackCreate(BaseModel):
    overallRating: int
    categoryRatings: Dict[str, int]
    feedbackText: str
    feedbackCategory: str
    usageContext: Optional[str] = None
    anonymous: bool = True


class FeedbackOut(BaseModel):
    id: int
    overall_rating: int
    category_ratings: Dict[str, int]
    feedback_text: str
    feedback_category: str
    usage_context: Optional[str]
    anonymous: bool
    created_at: datetime

    class Config:
        from_attributes = True
# =========================
# LIVE LOCATION
# =========================

class LiveLocationPing(BaseModel):
    latitude: float
    longitude: float
