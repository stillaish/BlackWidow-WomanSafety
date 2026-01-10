import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig } from "./firebase";

// ============================
//  INIT FIREBASE
// ============================
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// ============================
//  SAVE TOKEN TO BACKEND
// ============================
async function saveTokenToBackend(contactId, token) {
  try {
    await fetch(
      `https://black-widow-woman-safety.onrender.com/trusted-contacts/${contactId}/fcm?token=${token}`,
      { method: "POST" }
    );
    console.log("✅ FCM token saved to backend");
  } catch (e) {
    console.error("❌ Failed to save token to backend", e);
  }
}

// ============================
//  INIT PUSH NOTIFICATIONS
// ============================
export async function initPushNotifications(contactId) {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.warn("❌ Notification permission denied");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: "BAlosiC0elU_BQf7VFt-jDm3uHHmI7-A8Rl2tDlVoFJte-n5q1GZvTK_3R2onisvzPoFvHKK4n0N1PZFSRE5OFM",
    });

    console.log("🔥 FCM TOKEN:", token);

    if (token && contactId) {
      await saveTokenToBackend(contactId, token);
    }

    return token;
  } catch (err) {
    console.error("❌ Push init failed:", err);
    return null;
  }
}

// ============================
//  FOREGROUND LISTENER
// ============================
export function listenForPushMessages() {
  onMessage(messaging, (payload) => {
    console.log("🔥 PUSH RECEIVED:", payload);

    alert(
      (payload?.notification?.title || "Emergency Alert") +
        "\n" +
        (payload?.notification?.body || "")
    );
  });
}
