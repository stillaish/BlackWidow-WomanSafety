import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const SafetyMap = ({ incidents = [], selectedFilters, onIncidentSelect, sosLocation }) => {
  const [mapCenter, setMapCenter] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // 1️⃣ Get user location FIRST
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setUserLocation(location);
        setMapCenter(location); 
        // ✅ Center map on user
      },
      (error) => {
        console.error("Location access denied:", error);

        // Fallback: India center (Delhi)
        const fallback = { lat: 28.6139, lng: 77.2090 };
        setMapCenter(fallback);
      }
    );
  }, []);

  // 2️⃣ When user clicks an incident → center map there
  useEffect(() => {
    if (!onIncidentSelect) return;
    // This is handled by parent passing selected incident location
  }, []);

  // 3️⃣ When SOS triggers → jump to SOS location
  useEffect(() => {
    if (sosLocation && sosLocation.lat && sosLocation.lng) {
      setMapCenter(sosLocation);
    }
  }, [sosLocation]);

  // 4️⃣ When filters change → recenter to user
  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
    }
  }, [selectedFilters]);

  // Build iframe URL
  const mapUrl = mapCenter
    ? `https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=15&output=embed`
    : "";

  return (
    <div className="w-full h-full bg-card rounded-xl overflow-hidden border border-border">
      <div className="relative w-full h-full">
        {mapCenter ? (
          <iframe
            key={`${mapCenter.lat},${mapCenter.lng}`} // 🔥 forces reload when center changes
            width="100%"
            height="100%"
            loading="lazy"
            title="Safety Intelligence Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl}
            className="w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Detecting your location...
          </div>
        )}

        {/* TOP UI */}
        <div className="absolute top-4 left-4 right-4 z-10 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="bg-card/95 backdrop-blur-sm rounded-lg px-4 py-3 border border-border shadow-glow-md">
            <div className="flex items-center gap-3">
              <Icon name="MapPin" size={20} color="var(--color-primary)" />
              <div>
                <p className="text-xs text-muted-foreground">Current Location</p>
                <p className="text-sm font-medium">
                  {userLocation
                    ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
                    : "Detecting..."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM UI */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-card/95 backdrop-blur-sm rounded-lg px-4 py-3 border border-border shadow-glow-md">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
                <span className="text-sm font-medium">{incidents.length} Incidents</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={16} color="var(--color-accent)" />
                <span className="text-sm">Community Reports</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;
