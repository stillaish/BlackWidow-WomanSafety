import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TimerControls = ({ 
  isActive, 
  onStart, 
  onCheckIn, 
  onCancel, 
  onEmergencyOverride,
  locationSharing,
  onLocationToggle 
}) => {
  return (
    <div className="w-full space-y-4 md:space-y-6">
      <div className="w-full bg-card rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-8 shadow-glow-md">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-2 md:gap-3">
            <Icon 
              name="MapPin"
              className="w-5 h-5 md:w-6 md:h-6 text-accent"
              size={24}
            />
            <span className="text-sm md:text-base lg:text-lg font-medium">
              Location Sharing
            </span>
          </div>
          <button
            onClick={onLocationToggle}
            className={`relative w-12 h-6 md:w-14 md:h-7 lg:w-16 lg:h-8 rounded-full transition-all duration-250 ease-out ${
              locationSharing ? 'bg-accent' : 'bg-muted'
            }`}
            type="button"
            aria-label={locationSharing ? 'Disable location sharing' : 'Enable location sharing'}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-white rounded-full transition-transform duration-250 ease-out ${
                locationSharing ? 'translate-x-6 md:translate-x-7 lg:translate-x-8' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground">
          {locationSharing 
            ? 'Your real-time location will be included in auto-SOS messages' :'Enable to share your location with emergency contacts'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {!isActive ? (
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={onStart}
            iconName="Play"
            iconPosition="left"
            className="h-14 md:h-16 lg:h-20 text-base md:text-lg lg:text-xl"
          >
            Start Timer
          </Button>
        ) : (
          <>
            <Button
              variant="success"
              size="lg"
              fullWidth
              onClick={onCheckIn}
              iconName="CheckCircle"
              iconPosition="left"
              className="h-14 md:h-16 lg:h-20 text-base md:text-lg lg:text-xl"
            >
              I'm Safe - Check In
            </Button>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={onCancel}
              iconName="X"
              iconPosition="left"
              className="h-14 md:h-16 lg:h-20 text-base md:text-lg lg:text-xl"
            >
              Cancel Timer
            </Button>
          </>
        )}
      </div>

      {isActive && (
        <Button
          variant="destructive"
          size="lg"
          fullWidth
          onClick={onEmergencyOverride}
          iconName="AlertTriangle"
          iconPosition="left"
          className="h-14 md:h-16 lg:h-20 text-base md:text-lg lg:text-xl"
        >
          Emergency Override - SOS Now
        </Button>
      )}
    </div>
  );
};

export default TimerControls;