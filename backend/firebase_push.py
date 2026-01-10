import firebase_admin
from firebase_admin import credentials, messaging
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SERVICE_ACCOUNT_PATH = os.path.join(BASE_DIR, "firebase-service-account.json")

cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
firebase_admin.initialize_app(cred)


def send_push(token: str, title: str, body: str, data: dict = None):
    if not token:
        print("❌ No FCM token, skipping push")
        return False

    message = messaging.Message(
        token=token,
        notification=messaging.Notification(
            title=title,
            body=body,
        ),
        data=data or {}
    )

    try:
        response = messaging.send(message)
        print("✅ Push sent:", response)
        return True
    except Exception as e:
        print("❌ Push failed:", e)
        return False
