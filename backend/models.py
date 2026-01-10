from sqlalchemy import Column, String, DateTime, Boolean, Integer, Float, JSON
from database import Base
from datetime import datetime
import uuid

# =========================
# UTIL
# =========================

def uuid_str():
    return str(uuid.uuid4())

# =========================
# INCIDENTS
# =========================

class Incident(Base):
    __tablename__ = "incidents"

    id = Column(String, primary_key=True, default=uuid_str)
    type = Column(String, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    payload = Column(String)

# =========================
# SOS EVENTS
# =========================

class SOSEvent(Base):
    __tablename__ = "sos_events"

    id = Column(String, primary_key=True, default=uuid_str)
    active = Column(Boolean, default=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    triggered_at = Column(DateTime, default=datetime.utcnow)

# =========================
# EMERGENCY SESSIONS
# =========================

class EmergencySession(Base):
    __tablename__ = "emergency_sessions"

    id = Column(Integer, primary_key=True, index=True)

    started_at = Column(DateTime, default=datetime.utcnow)
    ended_at = Column(DateTime, nullable=True)

    is_active = Column(Boolean, default=True)

    start_lat = Column(Float, nullable=True)
    start_lng = Column(Float, nullable=True)

    end_lat = Column(Float, nullable=True)
    end_lng = Column(Float, nullable=True)

    trigger_source = Column(String, nullable=False)

# =========================
# TRUSTED CONTACTS
# =========================

class TrustedContact(Base):
    __tablename__ = "trusted_contacts"

    id = Column(String, primary_key=True, default=uuid_str)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=True)
    enabled = Column(Boolean, default=True)
    added_at = Column(DateTime, default=datetime.utcnow)
    fcm_token = Column(String, nullable=True)

# =========================
# UNSAFE AREA REPORTS
# =========================

class UnsafeAreaReport(Base):
    __tablename__ = "unsafe_area_reports"

    id = Column(Integer, primary_key=True, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

# =========================
# FEEDBACK
# =========================

class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    overall_rating = Column(Integer, nullable=False)
    category_ratings = Column(JSON, nullable=False)
    feedback_text = Column(String, nullable=False)
    feedback_category = Column(String, nullable=False)
    usage_context = Column(String, nullable=True)
    anonymous = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
