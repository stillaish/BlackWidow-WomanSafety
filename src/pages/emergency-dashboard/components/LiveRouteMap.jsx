import React, { useEffect, useRef, useState } from "react";

const BASE_URL = "https://black-widow-woman-safety.onrender.com";

const LiveRouteMap = () => {
  const mapRef = useRef(null);
  const polylineRef = useRef(null);
  const mapInstance = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // ===============================
  // LOAD GOOGLE MAP
  // ===============================
  useEffect(() => {
    if (!window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 28.6139, lng: 77.209 },
      zoom: 16,
    });

    mapInstance.current = map;

    polylineRef.current = new window.google.maps.Polyline({
      path: [],
      geodesic: true,
      strokeColor: "#ff0000",
      strokeOpacity: 1.0,
      strokeWeight: 4,
    });

    polylineRef.current.setMap(map);

    setLoaded(true);
  }, []);

  // ===============================
  // FETCH ROUTE
  // ===============================
  const fetchRoute = async () => {
    try {
      const res = await fetch(`${BASE_URL}/sessions/route`);
      const data = await res.json();

      if (!data || data.length === 0) return;

      const path = data.map((p) => ({
        lat: p.latitude,
        lng: p.longitude,
      }));

      polylineRef.current.setPath(path);

      const last = path[path.length - 1];
      mapInstance.current.setCenter(last);
    } catch (e) {
      console.warn("Route fetch failed");
    }
  };

  // ===============================
  // POLL EVERY 5s
  // ===============================
  useEffect(() => {
    if (!loaded) return;

    fetchRoute();

    const t = setInterval(fetchRoute, 5000);
    return () => clearInterval(t);
  }, [loaded]);

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default LiveRouteMap;
