import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SafetyTimerCard = () => {
  const navigate = useNavigate();
  const [timerStatus, setTimerStatus] = useState({
    isActive: false,
    remainingTime: 0,
    checkInTime: null
  });

  useEffect(() => {
    const storedTimer = localStorage.getItem('safetyTimer');
    if (storedTimer) {
      setTimerStatus(JSON.parse(storedTimer));
    }

    const interval = setInterval(() => {
      const stored = localStorage.getItem('safetyTimer');
      if (stored) {
        const timer = JSON.parse(stored);
        if (timer?.isActive && timer?.remainingTime > 0) {
          const newRemainingTime = timer?.remainingTime - 1;
          const updatedTimer = {
            ...timer,
            remainingTime: newRemainingTime
          };
          
          if (newRemainingTime <= 0) {
            handleAutoSOS();
          } else {
            localStorage.setItem('safetyTimer', JSON.stringify(updatedTimer));
            setTimerStatus(updatedTimer);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAutoSOS = () => {
    const emergencyData = {
      isActive: true,
      type: 'auto-sos',
      message: 'Auto-SOS Triggered - Safety timer expired without check-in',
      timestamp: new Date()?.toISOString(),
      trigger: 'timer-expiry'
    };

    localStorage.setItem('emergencyStatus', JSON.stringify(emergencyData));
    
    const timerData = {
      isActive: false,
      remainingTime: 0,
      checkInTime: null
    };
    localStorage.setItem('safetyTimer', JSON.stringify(timerData));
    setTimerStatus(timerData);
    
    window.dispatchEvent(new Event('emergencyStatusChanged'));
  };

  const handleCheckIn = () => {
    const safeStatus = {
      isActive: false,
      type: 'safe',
      message: 'Safe Check-In Confirmed',
      timestamp: new Date()?.toISOString()
    };

    localStorage.setItem('emergencyStatus', JSON.stringify(safeStatus));

    const timerData = {
      isActive: false,
      remainingTime: 0,
      checkInTime: new Date()?.toISOString()
    };

    localStorage.setItem('safetyTimer', JSON.stringify(timerData));
    setTimerStatus(timerData);
    window.dispatchEvent(new Event('emergencyStatusChanged'));
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  };

  const getTimerColor = () => {
    if (!timerStatus?.isActive) return 'text-muted-foreground';
    if (timerStatus?.remainingTime <= 300) return 'text-destructive';
    if (timerStatus?.remainingTime <= 600) return 'text-warning';
    return 'text-accent';
  };

  return (
    <div className="w-full bg-card rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-glow-md">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <Icon name="Timer" size={24} className="text-secondary w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">Safety Timer</h3>
      </div>
      {timerStatus?.isActive ? (
        <div className="space-y-4 md:space-y-6">
          <div className="text-center py-6 md:py-8">
            <p className="text-sm md:text-base text-muted-foreground mb-2 md:mb-3">Time Remaining</p>
            <p className={`text-4xl md:text-5xl lg:text-6xl font-bold font-mono ${getTimerColor()}`}>
              {formatTime(timerStatus?.remainingTime)}
            </p>
            {timerStatus?.remainingTime <= 300 && (
              <p className="text-xs md:text-sm text-destructive mt-2 md:mt-3 font-medium">
                Check in soon or SOS will be triggered automatically
              </p>
            )}
          </div>

          <Button
            variant="success"
            size="lg"
            fullWidth
            iconName="CheckCircle"
            iconPosition="left"
            onClick={handleCheckIn}
            className="h-14 md:h-16 lg:h-20 text-base md:text-lg lg:text-xl"
          >
            I'm Safe - Check In
          </Button>

          <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-secondary/10 border border-secondary/20 rounded-xl md:rounded-2xl">
            <Icon name="Info" size={20} className="text-secondary w-5 h-5 md:w-6 md:h-6" />
            <p className="text-xs md:text-sm text-muted-foreground">
              SOS will be automatically triggered if you don't check in before timer expires
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          <div className="text-center py-6 md:py-8">
            <Icon name="Clock" size={48} className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-muted-foreground mx-auto mb-3 md:mb-4" />
            <p className="text-sm md:text-base text-muted-foreground">No active safety timer</p>
          </div>

          <Button
            variant="secondary"
            size="lg"
            fullWidth
            iconName="Timer"
            iconPosition="left"
            onClick={() => navigate('/safety-timer')}
            className="h-12 md:h-14 lg:h-16"
          >
            Start Safety Timer
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
            <button
              onClick={() => {
                const timer = { isActive: true, remainingTime: 900, checkInTime: new Date(Date.now() + 900000)?.toISOString() };
                localStorage.setItem('safetyTimer', JSON.stringify(timer));
                setTimerStatus(timer);
              }}
              className="px-3 md:px-4 py-2 md:py-3 bg-muted hover:bg-muted/80 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all duration-300"
              type="button"
            >
              15 minutes
            </button>
            <button
              onClick={() => {
                const timer = { isActive: true, remainingTime: 1800, checkInTime: new Date(Date.now() + 1800000)?.toISOString() };
                localStorage.setItem('safetyTimer', JSON.stringify(timer));
                setTimerStatus(timer);
              }}
              className="px-3 md:px-4 py-2 md:py-3 bg-muted hover:bg-muted/80 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all duration-300"
              type="button"
            >
              30 minutes
            </button>
            <button
              onClick={() => {
                const timer = { isActive: true, remainingTime: 3600, checkInTime: new Date(Date.now() + 3600000)?.toISOString() };
                localStorage.setItem('safetyTimer', JSON.stringify(timer));
                setTimerStatus(timer);
              }}
              className="px-3 md:px-4 py-2 md:py-3 bg-muted hover:bg-muted/80 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all duration-300"
              type="button"
            >
              1 hour
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyTimerCard;