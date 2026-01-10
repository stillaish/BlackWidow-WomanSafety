from fastapi import APIRouter, HTTPException
from datetime import datetime
from schemas import Location, LiveLocationPing

router = APIRouter(prefix="/sessions", tags=["Emergency Sessions"])

# =========================
# IN-MEMORY SESSION STORE
# =========================

CURRENT_SESSION = {
    "is_active": False,
    "started_at": None,
    "ended_at": None,
    "start_location": None,
    "end_location": None,
    "route": []
}

# =========================
# START SESSION
# =========================
@router.post("/start")
def start_session(data: dict):
    if CURRENT_SESSION["is_active"]:
        return CURRENT_SESSION

    CURRENT_SESSION["is_active"] = True
    CURRENT_SESSION["started_at"] = datetime.utcnow()
    CURRENT_SESSION["ended_at"] = None
    CURRENT_SESSION["start_location"] = data.get("location")
    CURRENT_SESSION["end_location"] = None
    CURRENT_SESSION["route"] = []

    return CURRENT_SESSION

# =========================
# END SESSION
# =========================
@router.post("/end")
def end_session(data: dict):
    if not CURRENT_SESSION["is_active"]:
        raise HTTPException(status_code=404, detail="No active session")

    CURRENT_SESSION["is_active"] = False
    CURRENT_SESSION["ended_at"] = datetime.utcnow()
    CURRENT_SESSION["end_location"] = data.get("location")

    return CURRENT_SESSION

# =========================
# PUSH LIVE LOCATION
# =========================
@router.post("/location")
def push_location(data: LiveLocationPing):
    if not CURRENT_SESSION["is_active"]:
        return {"status": "no active session"}

    CURRENT_SESSION["route"].append({
        "latitude": data.latitude,
        "longitude": data.longitude,
        "timestamp": datetime.utcnow().isoformat()
    })

    return {"status": "location saved"}

# =========================
# GET LIVE ROUTE
# =========================
@router.get("/route")
def get_route():
    if not CURRENT_SESSION["is_active"]:
        return []

    return CURRENT_SESSION["route"]

# =========================
# GET CURRENT SESSION
# =========================
@router.get("/current")
def get_current():
    return CURRENT_SESSION
