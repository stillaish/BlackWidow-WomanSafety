const API_BASE_URL = "https://black-widow-woman-safety.onrender.com";

export async function sendUnsafeAreaToBackend({ location, category, description }) {
  try {
    const response = await fetch(`${API_BASE_URL}/unsafe-areas/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: {
          lat: location.lat,
          lng: location.lng,
        },
        category,
        description,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Unsafe area backend error:", error);
    return null;
  }
}
