import React, { useState, useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const LocationDisplay = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(false);

  const watchIdRef = useRef(null);

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    setError(null);
    setActive(true);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const newLoc = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };

        setLocation((prev) => {
          // Only update if changed meaningfully (prevents jitter spam)
          if (
            !prev ||
            Math.abs(prev.latitude - newLoc.latitude) > 0.00001 ||
            Math.abs(prev.longitude - newLoc.longitude) > 0.00001
          ) {
            return newLoc;
          }
          return prev;
        });
      },
      (err) => {
        console.error("GPS error:", err);
        setError("Location access denied or unavailable");
        setActive(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 20000,
      }
    );
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setActive(false);
  };

  useEffect(() => {
    // Auto start when component loads
    startTracking();

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full bg-card rounded-2xl p-6 shadow-glow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon name="MapPin" size={24} className="text-accent" />
          <h3 className="text-xl font-semibold">Real-Time Location</h3>
        </div>

        <button
          onClick={active ? stopTracking : startTracking}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            active
              ? "bg-accent/20 text-accent border border-accent"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {active ? "Sharing" : "Private"}
        </button>
      </div>

      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      {!location && !error && (
        <div className="text-muted-foreground">
          Waiting for GPS signal...
        </div>
      )}

      {location && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-3 rounded">
              <p className="text-sm">Latitude</p>
              <p className="font-mono">{location.latitude}</p>
            </div>
            <div className="bg-muted p-3 rounded">
              <p className="text-sm">Longitude</p>
              <p className="font-mono">{location.longitude}</p>
            </div>
          </div>

          <div className="aspect-video rounded overflow-hidden">
            <iframe
              title="Map"
              width="100%"
              height="100%"
              loading="lazy"
              src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=16&output=embed`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDisplay;
