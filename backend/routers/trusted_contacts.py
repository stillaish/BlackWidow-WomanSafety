from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database import SessionLocal
from models import TrustedContact
from schemas import TrustedContactCreate, TrustedContactUpdate

router = APIRouter(prefix="/trusted-contacts", tags=["Trusted Contacts"])

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
# CREATE CONTACT
# =========================
@router.post("/")
def add_contact(data: TrustedContactCreate, db: Session = Depends(get_db)):
    contact = TrustedContact(
        name=data.name,
        phone=data.phone,
        email=data.email,
        enabled=True,
    )
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact

# =========================
# GET ALL CONTACTS
# =========================
@router.get("/")
def get_contacts(db: Session = Depends(get_db)):
    return db.query(TrustedContact).all()

# =========================
# UPDATE CONTACT
# =========================
@router.put("/{contact_id}")
def update_contact(contact_id: str, data: TrustedContactUpdate, db: Session = Depends(get_db)):
    contact = db.query(TrustedContact).filter(TrustedContact.id == contact_id).first()
    if not contact:
        return {"error": "Contact not found"}

    if data.name is not None:
        contact.name = data.name
    if data.phone is not None:
        contact.phone = data.phone
    if data.email is not None:
        contact.email = data.email
    if data.enabled is not None:
        contact.enabled = data.enabled

    db.commit()
    db.refresh(contact)
    return contact

# =========================
# DELETE CONTACT
# =========================
@router.delete("/{contact_id}")
def delete_contact(contact_id: str, db: Session = Depends(get_db)):
    contact = db.query(TrustedContact).filter(TrustedContact.id == contact_id).first()
    if not contact:
        return {"error": "Contact not found"}

    db.delete(contact)
    db.commit()
    return {"status": "deleted"}

# =========================
#  SAVE FCM TOKEN 
# =========================
@router.post("/{contact_id}/fcm")
def save_fcm_token(
    contact_id: str,
    token: str = Query(...),
    db: Session = Depends(get_db)
):
    contact = db.query(TrustedContact).filter(TrustedContact.id == contact_id).first()
    if not contact:
        return {"error": "Contact not found"}

    contact.fcm_token = token
    db.commit()

    return {"status": "token saved"}
