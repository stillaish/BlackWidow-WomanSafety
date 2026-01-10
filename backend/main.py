from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import sessions, sos, trusted_contacts  

app = FastAPI(title="BLACK WIDOW BACKEND")

from routers import gemini
app.include_router(gemini.router)

# ==============================
#  CORS 
# ==============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# ROUTERS
# ==============================
app.include_router(sessions.router)
app.include_router(sos.router)
app.include_router(trusted_contacts.router)

@app.get("/")
def root():
    return {
        "status": "Black Widow Backend Running",
        "cors": "ENABLED"
    }
