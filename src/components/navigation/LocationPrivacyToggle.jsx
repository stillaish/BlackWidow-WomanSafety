// This Is A Prototype Only Do Not Use In Production It MAy Not Work As Expected And Developed by Aish Maheshwari
import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const LocationPrivacyToggle = () => {
  const [isLocationSharing, setIsLocationSharing] = useState(false);
  const [sharedWithCount, setSharedWithCount] = useState(0);

  useEffect(() => {
    const storedLocation = localStorage.getItem('locationSharing');
    if (storedLocation) {
      const locationData = JSON.parse(storedLocation);
      setIsLocationSharing(locationData?.isActive);
      setSharedWithCount(locationData?.sharedWith || 0);
    }
  }, []);

  const handleToggle = () => {
    const newStatus = !isLocationSharing;
    const locationData = {
      isActive: newStatus,
      sharedWith: newStatus ? 3 : 0,
      timestamp: new Date()?.toISOString()
    };

    setIsLocationSharing(newStatus);
    setSharedWithCount(locationData?.sharedWith);
    localStorage.setItem('locationSharing', JSON.stringify(locationData));
    window.dispatchEvent(new Event('emergencyStatusChanged'));
  };

  return (
    <button
      onClick={handleToggle}
      className={`location-privacy-toggle ${isLocationSharing ? 'active' : ''}`}
      aria-label={isLocationSharing ? 'Location sharing active' : 'Location sharing inactive'}
      aria-pressed={isLocationSharing}
      type="button"
    >
      <Icon 
        name={isLocationSharing ? 'MapPin' : 'MapPinOff'}
        className="location-privacy-icon"
        size={20}
      />
      <span className="location-privacy-label">
        {isLocationSharing ? `Sharing (${sharedWithCount})` : 'Location Off'}
      </span>
    </button>
  );
};

export default LocationPrivacyToggle;