// This Is A Prototype Only Do Not Use In Production It MAy Not Work As Expected And Developed by Aish Maheshwari
import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const EmergencyStatusBar = () => {
  const [emergencyStatus, setEmergencyStatus] = useState({
    isActive: false,
    type: null,
    message: '',
    timestamp: null
  });

  const [safetyTimer, setSafetyTimer] = useState({
    isActive: false,
    remainingTime: 0,
    checkInTime: null
  });

  const [locationSharing, setLocationSharing] = useState({
    isActive: false,
    sharedWith: 0
  });

  useEffect(() => {
    const storedEmergency = localStorage.getItem('emergencyStatus');
    const storedTimer = localStorage.getItem('safetyTimer');
    const storedLocation = localStorage.getItem('locationSharing');

    if (storedEmergency) {
      setEmergencyStatus(JSON.parse(storedEmergency));
    }
    if (storedTimer) {
      setSafetyTimer(JSON.parse(storedTimer));
    }
    if (storedLocation) {
      setLocationSharing(JSON.parse(storedLocation));
    }
  }, []);

  const getStatusDisplay = () => {
    if (emergencyStatus?.isActive) {
      return {
        icon: 'AlertTriangle',
        text: emergencyStatus?.message || 'Emergency Active',
        badge: 'active',
        badgeText: 'SOS ACTIVE'
      };
    }

    if (safetyTimer?.isActive) {
      const minutes = Math.floor(safetyTimer?.remainingTime / 60);
      return {
        icon: 'Timer',
        text: `Safety Timer Active`,
        badge: 'active',
        badgeText: `${minutes}m remaining`
      };
    }

    if (locationSharing?.isActive) {
      return {
        icon: 'MapPin',
        text: `Location Shared`,
        badge: 'safe',
        badgeText: `${locationSharing?.sharedWith} contacts`
      };
    }

    return {
      icon: 'Shield',
      text: 'All Systems Normal',
      badge: 'safe',
      badgeText: 'SAFE'
    };
  }

  const statusDisplay = getStatusDisplay();

  return (
    <div className="emergency-status-bar" role="banner">
      <div className="emergency-status-content">
        <div className="emergency-status-indicator">
          <Icon 
            name={statusDisplay?.icon}
            className="emergency-status-icon"
            color={emergencyStatus?.isActive ? 'var(--color-primary)' : 'var(--color-success)'}
            size={24}
          />
          <span className="emergency-status-text">
            {statusDisplay?.text}
          </span>
        </div>
        <div 
          className={`emergency-status-badge ${statusDisplay?.badge}`}
          role="status"
          aria-live="polite"
        >
          {statusDisplay?.badgeText}
        </div>
      </div>
    </div>
  );
};

export default EmergencyStatusBar;