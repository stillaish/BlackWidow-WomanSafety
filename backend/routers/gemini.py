import os
import requests
from dotenv import load_dotenv
load_dotenv()
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/gemini", tags=["Gemini AI"])

# =========================
# CONFIGURATION For Gemini API
# =========================
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("❌ GEMINI_API_KEY not set in environment variables")

GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent"

SYSTEM_PROMPT = """
You are a women safety assistant in India.

Rules:
- If user describes danger, harassment, stalking, threat, assault, fear, or emergency:
  - Tell them to use the SOS button immediately.
  - Do NOT say you will call anyone.
  - Do NOT say you will trigger anything.
- Do NOT give illegal advice.
- Do NOT replace police, ambulance, or emergency services.
- You only give guidance, steps, emotional support, and safety advice.

Always be calm, supportive, and practical.
"""

# =========================
# SCHEMA        
# =========================
class GeminiRequest(BaseModel):
    message: str

class GeminiResponse(BaseModel):
    response: str
    is_emergency: bool

# =========================
# CORE FUNCTION 
# =========================
def ask_gemini(user_message: str) -> tuple[str, bool]:
    prompt = f"""
{SYSTEM_PROMPT}

User message:
{user_message}
"""

    payload = {
        "contents": [
            {
                "parts": [{"text": prompt}]
            }
        ]
    }

    params = {
        "key": GEMINI_API_KEY
    }

    res = requests.post(GEMINI_URL, params=params, json=payload, timeout=30)

    if res.status_code != 200:
        print("❌ Gemini error:", res.text)
        raise RuntimeError("Gemini API failed")

    data = res.json()

    try:
        text = data["candidates"][0]["content"]["parts"][0]["text"]
    except Exception:
        print("❌ Bad Gemini response:", data)
        raise RuntimeError("Invalid Gemini response format")
    #======================  
    #  Emergency detection
    # =====================
    danger_words = [
        "attack", "following", "rape", "threat", "danger", "scared",
        "unsafe", "help me", "stalker", "knife", "gun", "hurt", "kidnap"
    ]

    is_emergency = any(word in user_message.lower() for word in danger_words)

    return text.strip(), is_emergency

# =========================
# API ENDPOINT
# =========================
@router.post("/chat", response_model=GeminiResponse)
def chat(req: GeminiRequest):
    try:
        reply, is_emergency = ask_gemini(req.message)
        return {
            "response": reply,
            "is_emergency": is_emergency
        }
    except Exception as e:
        print("❌ Gemini backend crash:", e)
        raise HTTPException(status_code=500, detail="Gemini AI failed")
