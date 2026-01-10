const BASE_URL = "https://black-widow-woman-safety.onrender.com";

export async function fetchNearbyPlaces({ lat, lng, type }) {
  try {
    const res = await fetch(
      `${BASE_URL}/places/nearby?lat=${lat}&lng=${lng}&type=${type}`
    );

    const data = await res.json();

    return data.results || [];
  } catch (err) {
    console.error("Places API error:", err);
    return [];
  }
}
