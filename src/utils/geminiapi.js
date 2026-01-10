const BASE_URL = "https://black-widow-woman-safety.onrender.com";

export async function askGemini(message) {
  const res = await fetch(`${BASE_URL}/gemini/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error("Gemini API failed");
  }

  return await res.json();
}
