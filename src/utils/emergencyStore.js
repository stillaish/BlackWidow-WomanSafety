import { askGeminiFromBackend } from "./geminiapi";
import { sendSOSToBackend } from "./emergencyApi";
import { sendIncidentToBackend } from "./incidentApi";
import { sendUnsafeAreaToBackend } from "./unsafeAreaApi";
import {
  fetchTrustedContacts,
  addTrustedContactToBackend,
  updateTrustedContactInBackend,
  deleteTrustedContactFromBackend,
} from "./trustedContactsApi";

// ============================
// CORE STATE
// ============================

let safetyTimerTimeout = null;

export const INCIDENT_TYPES = {
  SOS_TRIGGERED: "SOS_TRIGGERED",
  SAFE_CHECKIN: "SAFE_CHECKIN",
  SAFETY_TIMER_STARTED: "SAFETY_TIMER_STARTED",
  SAFETY_TIMER_CANCELLED: "SAFETY_TIMER_CANCELLED",
  SAFETY_TIMER_EXPIRED: "SAFETY_TIMER_EXPIRED",
  LOCATION_SHARING_ENABLED: "LOCATION_SHARING_ENABLED",
  LOCATION_SHARING_DISABLED: "LOCATION_SHARING_DISABLED",
  TRUSTED_CONTACT_ADDED: "TRUSTED_CONTACT_ADDED",
  TRUSTED_CONTACT_REMOVED: "TRUSTED_CONTACT_REMOVED",
  TRUSTED_CONTACT_UPDATED: "TRUSTED_CONTACT_UPDATED",
  GEMINI_QUERY_RECEIVED: "GEMINI_QUERY_RECEIVED",
  GEMINI_RESPONSE_SENT: "GEMINI_RESPONSE_SENT",

};

const emergencyState = {
  sosActive: false,
  sosTriggeredAt: null,
  safetyTimer: { active: false, durationMinutes: null, startedAt: null },
  locationPrivacy: { sharingEnabled: false },
  lastKnownLocation: null,
  trustedContacts: [],
  events: [],
};

// ============================
// EVENT FACTORY
// ============================

function createEvent(type, payload = {}) {
  const event = {
    id: crypto.randomUUID(),
    type,
    timestamp: new Date().toISOString(),
    payload,
  };

  // fire & forget
  sendIncidentToBackend({ type, payload });

  return event;
}

// ============================
// SOS
// ============================

export function triggerSOS(location = null) {
  emergencyState.sosActive = true;
  emergencyState.sosTriggeredAt = Date.now();

  const allowedLocation =
    emergencyState.locationPrivacy.sharingEnabled ? location : null;

  emergencyState.lastKnownLocation = allowedLocation;

  emergencyState.events.push(
    createEvent(INCIDENT_TYPES.SOS_TRIGGERED, {
      location: allowedLocation,
    })
  );

  sendSOSToBackend({
    location: allowedLocation
      ? {
          latitude: allowedLocation.latitude,
          longitude: allowedLocation.longitude,
        }
      : null,
  });
}

export function markSafe(source = "manual") {
  emergencyState.sosActive = false;
  emergencyState.sosTriggeredAt = null;

  emergencyState.events.push(
    createEvent(INCIDENT_TYPES.SAFE_CHECKIN, { source })
  );
}

// ============================
// SAFETY TIMER
// ============================

export function startSafetyTimer(durationMinutes) {
  if (!durationMinutes || durationMinutes <= 0) return;

  if (safetyTimerTimeout) clearTimeout(safetyTimerTimeout);

  emergencyState.safetyTimer = {
    active: true,
    durationMinutes,
    startedAt: Date.now(),
  };

  emergencyState.events.push(
    createEvent(INCIDENT_TYPES.SAFETY_TIMER_STARTED, { durationMinutes })
  );

  safetyTimerTimeout = setTimeout(() => {
    emergencyState.safetyTimer.active = false;

    emergencyState.events.push(
      createEvent(INCIDENT_TYPES.SAFETY_TIMER_EXPIRED)
    );

    triggerSOS(emergencyState.lastKnownLocation);
  }, durationMinutes * 60 * 1000);
}

export function stopSafetyTimer(reason = "manual") {
  if (safetyTimerTimeout) clearTimeout(safetyTimerTimeout);

  emergencyState.safetyTimer.active = false;

  emergencyState.events.push(
    createEvent(INCIDENT_TYPES.SAFETY_TIMER_CANCELLED, { reason })
  );
}

// ============================
// LOCATION PRIVACY
// ============================

export function enableLocationSharing() {
  emergencyState.locationPrivacy.sharingEnabled = true;
}

export function disableLocationSharing() {
  emergencyState.locationPrivacy.sharingEnabled = false;
}

export function isLocationSharingEnabled() {
  return emergencyState.locationPrivacy.sharingEnabled;
}

// ============================
// TRUSTED CONTACTS
// ============================

export async function syncTrustedContactsFromBackend() {
  const contacts = await fetchTrustedContacts();
  if (Array.isArray(contacts)) {
    emergencyState.trustedContacts = contacts;
  }
  return structuredClone(emergencyState.trustedContacts);
}

export async function addTrustedContact({ name, phone, email }) {
  const contact = await addTrustedContactToBackend({ name, phone, email });
  if (!contact) return;
  emergencyState.trustedContacts.push(contact);
  return contact;
}

export async function removeTrustedContact(contactId) {
  await deleteTrustedContactFromBackend(contactId);
  emergencyState.trustedContacts =
    emergencyState.trustedContacts.filter(c => c.id !== contactId);
}

export async function updateTrustedContact(contactId, updates) {
  const updated = await updateTrustedContactInBackend(contactId, updates);
  if (!updated) return;

  const idx = emergencyState.trustedContacts.findIndex(c => c.id === contactId);
  if (idx !== -1) emergencyState.trustedContacts[idx] = updated;

  return updated;
}

export function getTrustedContacts() {
  return structuredClone(emergencyState.trustedContacts);
}

// ============================
// READ ONLY
// ============================

export function getEmergencyState() {
  return structuredClone(emergencyState);
}

export function getEventHistory() {
  return [...emergencyState.events];
}
// ============================
// GEMINI ASSISTANT (REAL BACKEND)
// ============================

export async function sendMessageToGemini(userMessage = "") {
  if (!userMessage || typeof userMessage !== "string") return null;

  emergencyState.events.push(
    createEvent(INCIDENT_TYPES.GEMINI_QUERY_RECEIVED, {
      message: userMessage,
    })
  );

  const result = await askGeminiFromBackend(userMessage);

  emergencyState.events.push(
    createEvent(INCIDENT_TYPES.GEMINI_RESPONSE_SENT, {
      response: result.response,
      isEmergency: result.is_emergency,
    })
  );

  // 🚨 AUTO SOS IF BACKEND SAYS EMERGENCY
  if (result.is_emergency) {
    triggerSOS(emergencyState.lastKnownLocation);
  }

  return result.response;
}
