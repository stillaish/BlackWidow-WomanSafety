const API_BASE = "https://black-widow-woman-safety.onrender.com";

export async function submitFeedback(data) {
  const res = await fetch(`${API_BASE}/feedback/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to submit feedback");
  }

  return res.json();
}

export async function fetchFeedback() {
  const res = await fetch(`${API_BASE}/feedback/`);

  if (!res.ok) {
    throw new Error("Failed to fetch feedback");
  }

  return res.json();
}
