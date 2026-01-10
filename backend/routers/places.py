from fastapi import APIRouter, HTTPException
import os
import requests

router = APIRouter(prefix="/places", tags=["Places"])

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

@router.get("/nearby")
def get_nearby_places(lat: float, lng: float, type: str):
    if not GOOGLE_MAPS_API_KEY:
        raise HTTPException(status_code=500, detail="Google Maps API key not configured")

    if type not in ["police", "hospital"]:
        raise HTTPException(status_code=400, detail="Type must be 'police' or 'hospital'")

    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

    params = {
        "location": f"{lat},{lng}",
        "radius": 3000,  # 3km
        "type": type,
        "key": GOOGLE_MAPS_API_KEY,
    }

    try:
        r = requests.get(url, params=params, timeout=15)
        r.raise_for_status()
        data = r.json()
        return data
    except Exception as e:
        print("Google Places Error:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch places")
