import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const BASE_URL = "https://black-widow-woman-safety.onrender.com";

const SOSButton = () => {
  const [mode, setMode] = useState("IDLE"); // IDLE | LOW | HIGH
  const [secondsLeft, setSecondsLeft] = useState(30);

  const timerRef = useRef(null);
  const locationTimerRef = useRef(null);

  // ===============================
  // GET LOCATION
  // ===============================
  const getLocation = () =>
    new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({ latitude: 28.6139, longitude: 77.209 });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        () => resolve({ latitude: 28.6139, longitude: 77.209 }),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    });

  // ===============================
  // SAFE FETCH
  // ===============================
  const safeFetch = async (url, body) => {
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.warn("Backend call failed:", url);
    }
  };

  const startSession = (level, location) => {
    safeFetch(`${BASE_URL}/sessions/start`, {
      trigger_source: level === "HIGH" ? "SOS_HIGH" : "SOS_LOW",
      location,
    });
  };

  const endSession = (location) => {
    safeFetch(`${BASE_URL}/sessions/end`, { location });
  };

  const triggerHighSOS = (location) => {
    console.log("🚨 TRIGGERING REAL SOS");
    safeFetch(`${BASE_URL}/sos/trigger`, { location });
  };

  const pushLiveLocation = (location) => {
    safeFetch(`${BASE_URL}/sessions/location`, location);
  };

  // ===============================
  // LOCATION STREAM
  // ===============================
  const startLocationStreaming = () => {
    locationTimerRef.current = setInterval(async () => {
      const location = await getLocation();
      pushLiveLocation(location);
      console.log("📍 Location sent:", location);
    }, 5000);
  };

  const stopLocationStreaming = () => {
    if (locationTimerRef.current) {
      clearInterval(locationTimerRef.current);
      locationTimerRef.current = null;
    }
  };

  // ===============================
  // START LOW
  // ===============================
  const startLowSOS = async () => {
    const location = await getLocation();

    setMode("LOW");
    setSecondsLeft(30);

    startSession("LOW", location);
    startLocationStreaming();

    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          autoEscalate();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  // ===============================
  // ESCALATE TO HIGH
  // ===============================
  const autoEscalate = async () => {
    const location = await getLocation();

    console.log("⬆️ AUTO ESCALATING TO HIGH");

    setMode("HIGH");

    startSession("HIGH", location);
    triggerHighSOS(location); // 🔥 THIS SENDS FIREBASE
  };

  // ===============================
  // MARK SAFE
  // ===============================
  const markSafe = async () => {
    clearInterval(timerRef.current);
    stopLocationStreaming();

    const location = await getLocation();
    endSession(location);

    setMode("IDLE");
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      stopLocationStreaming();
    };
  }, []);

  // ===============================
  // AI TRIGGER
  // ===============================
  useEffect(() => {
    const handler = () => {
      if (mode === "IDLE") {
        console.log("🧠 AI requested SOS activation");
        startLowSOS();
      }
    };

    window.addEventListener("AI_EMERGENCY_DETECTED", handler);

    return () => {
      window.removeEventListener("AI_EMERGENCY_DETECTED", handler);
    };
  }, [mode]);

  // ===============================
  // UI
  // ===============================
  return (
    <div className="w-full">
      {mode === "IDLE" && (
        <button
          onClick={startLowSOS}
          className="w-full h-40 rounded-3xl bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center"
        >
          <Icon name="AlertCircle" size={64} />
          <h2 className="text-4xl font-bold">SOS</h2>
          <p>Tap to send emergency alert</p>
        </button>
      )}

      {mode === "LOW" && (
        <button
          onClick={markSafe}
          className="w-full h-40 rounded-3xl bg-green-600 text-white flex flex-col items-center justify-center"
        >
          <Icon name="CheckCircle" size={64} />
          <h2 className="text-3xl font-bold">I'M SAFE</h2>
          <p>Auto escalation in {secondsLeft}s</p>
        </button>
      )}

      {mode === "HIGH" && (
        <div className="w-full h-40 rounded-3xl bg-red-900 text-white flex flex-col items-center justify-center animate-pulse">
          <Icon name="AlertTriangle" size={64} />
          <h2 className="text-3xl font-bold">EMERGENCY ACTIVE</h2>
          <p>Sharing live location...</p>
          <button
            onClick={markSafe}
            className="mt-3 px-6 py-2 bg-white text-black rounded-lg"
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
};

export default SOSButton;
