from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import SOSEvent, TrustedContact, EmergencySession
from schemas import SOSCreate
from datetime import datetime
import threading
import os
# =========================
#  Firebase
# =========================
import firebase_admin
from firebase_admin import credentials, messaging

router = APIRouter(prefix="/sos", tags=["SOS"])

# =========================
#  FIREBASE INIT 
# =========================
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SERVICE_ACCOUNT_PATH = os.getenv("RENDER_SERVICE_ACCOUNT_PATH", "firebase.json")


FIREBASE_READY = False

if not firebase_admin._apps:
    try:
        cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
        firebase_admin.initialize_app(cred)
        FIREBASE_READY = True
        print("✅ Firebase Admin Initialized Successfully")
    except Exception as e:
        print("❌ Firebase init failed:", e)

# =========================
# DB
# =========================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# =========================
#  REAL FIREBASE PUSH
# =========================
def send_firebase_push(contact, message):
    if not FIREBASE_READY:
        print("⚠️ Firebase not ready, skipping push")
        return

    if not contact.fcm_token:
        print(f"⚠️ No FCM token for {contact.name}")
        return

    try:
        msg = messaging.Message(
            token=contact.fcm_token,
            notification=messaging.Notification(
                title="🚨 BLACK WIDOW SOS ALERT",
                body=message[:200],
            ),
            data={"type": "SOS"}
        )

        response = messaging.send(msg)
        print(f"✅ FIREBASE PUSH SENT to {contact.name}: {response}")

    except Exception as e:
        print(f"❌ FIREBASE PUSH FAILED for {contact.name}:", e)

# =========================
# PLACEHOLDER TWILIO
# =========================
def send_twilio_sms(contact, message):
    print(f"📨 TWILIO SMS to {contact.phone}: {message}")

def send_twilio_call(contact, message):
    print(f"📞 TWILIO CALL to {contact.phone}: {message}")

# =========================
# MESSAGE BUILDER
# =========================
def build_message(lat, lng, severity):
    maps = f"https://www.google.com/maps?q={lat},{lng}"
    return f"""🚨 BLACK WIDOW EMERGENCY

Severity: {severity.upper()}
Time: {datetime.utcnow()} UTC
Location: {maps}

Please respond immediately.
"""

# =========================
# DISPATCHER
# =========================
def dispatch_alert(session_id: int, lat: float, lng: float, severity: str):
    db = SessionLocal()
    try:
        contacts = db.query(TrustedContact).filter(TrustedContact.enabled == True).all()
        msg = build_message(lat, lng, severity)

        for c in contacts:
            send_firebase_push(c, msg)

            if severity == "high":
                send_twilio_sms(c, msg)
                send_twilio_call(c, msg)

    finally:
        db.close()

# =========================
# API
# =========================
@router.post("/trigger")
def trigger_sos(data: SOSCreate, db: Session = Depends(get_db)):
    lat = data.location.latitude if data.location else None
    lng = data.location.longitude if data.location else None
    severity = "high"


    sos = SOSEvent(
        latitude=lat,
        longitude=lng,
    )
    db.add(sos)
    db.commit()
    db.refresh(sos)

    session = db.query(EmergencySession).filter(EmergencySession.is_active == True).first()

    if session:
        t = threading.Thread(
            target=dispatch_alert,
            args=(session.id, lat, lng, severity)
        )
        t.daemon = True
        t.start()

    return {"status": "SOS dispatched", "severity": severity}
