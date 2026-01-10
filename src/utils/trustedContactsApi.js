const API_BASE_URL = "https://black-widow-woman-safety.onrender.com";

// ==============================
// TRUSTED CONTACTS API
// ==============================

export async function fetchTrustedContacts() {
  try {
    const res = await fetch(`${API_BASE_URL}/trusted-contacts/`);
    return await res.json();
  } catch (err) {
    console.error("Fetch trusted contacts error:", err);
    return [];
  }
}

export async function addTrustedContactToBackend({ name, phone, email }) {
  try {
    const res = await fetch(`${API_BASE_URL}/trusted-contacts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
      }),
    });

    return await res.json();
  } catch (err) {
    console.error("Add trusted contact error:", err);
    return null;
  }
}

export async function updateTrustedContactInBackend(contactId, updates) {
  try {
    const res = await fetch(`${API_BASE_URL}/trusted-contacts/${contactId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    return await res.json();
  } catch (err) {
    console.error("Update trusted contact error:", err);
    return null;
  }
}

export async function deleteTrustedContactFromBackend(contactId) {
  try {
    const res = await fetch(`${API_BASE_URL}/trusted-contacts/${contactId}`, {
      method: "DELETE",
    });

    return await res.json();
  } catch (err) {
    console.error("Delete trusted contact error:", err);
    return null;
  }
}
