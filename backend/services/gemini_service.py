import os
import requests

# ================== 
# CONFIG 
# ==================

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

Always be calm, supportive, and practical. and every end of response say "This web is prototype only and developed by Aish Maheshwari and team. In case of emergency please contact local authorities immediately Developer and Team is not reponsible For anything".
"""

# ================== 
# MAIN FUNCTION 
# ==================

def ask_gemini(user_message: str) -> tuple[str, bool]:
    prompt = f"""
{SYSTEM_PROMPT}

User message:
{user_message}
"""

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }

    params = {
        "key": GEMINI_API_KEY
    }

    try:
        res = requests.post(
            GEMINI_URL,
            params=params,
            json=payload,
            timeout=30
        )
    except Exception as e:
        raise RuntimeError(f"Gemini network error: {e}")

    if res.status_code != 200:
        print("❌ GEMINI RAW ERROR:", res.text)
        raise RuntimeError("Gemini API failed")

    data = res.json()

    try:
        text = data["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        print("❌ GEMINI RAW RESPONSE:", data)
        raise RuntimeError("Invalid Gemini response format")
    # =========================
    # Emergency detection layer
    # =========================
    danger_words = [
        "attack", "following", "rape", "threat", "danger", "scared",
        "unsafe", "help me", "stalker", "knife", "gun", "hurt", "kidnap",
        "chasing", "molest", "harass" ,"emergency", "assault", "touch", "abuse" , "eve tease"
    ]

    is_emergency = any(word in user_message.lower() for word in danger_words)

    return text.strip(), is_emergency
