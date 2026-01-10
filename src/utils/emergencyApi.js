const API_BASE_URL = "https://black-widow-woman-safety.onrender.com";

// =========================
// SOS API
// =========================
export async function sendSOSToBackend({ location }) {
  try {
    const response = await fetch(`${API_BASE_URL}/sos/trigger`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: location
          ? {
              lat: location.latitude,
              lng: location.longitude,
            }
          : null,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("SOS backend error:", error);
    return null;
  }
}
