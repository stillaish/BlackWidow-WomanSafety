export async function saveFcmToContact(contactId) {
  const token = localStorage.getItem("fcmToken");

  if (!token) {
    console.warn("❌ No FCM token found");
    return;
  }

  await fetch(
    `https://black-widow-woman-safety.onrender.com/trusted-contacts/${contactId}/fcm?token=${encodeURIComponent(token)}`,
    {
      method: "POST",
    }
  );

  console.log("✅ FCM token saved for contact:", contactId);
}
