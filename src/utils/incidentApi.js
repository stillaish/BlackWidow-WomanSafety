const API_BASE_URL = "https://black-widow-woman-safety.onrender.com";

export async function sendIncidentToBackend({ type, payload }) {
  try {
    const response = await fetch(`${API_BASE_URL}/incidents/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        payload: JSON.stringify(payload || {}),
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Incident backend error:", error);
    return null;
  }
}
