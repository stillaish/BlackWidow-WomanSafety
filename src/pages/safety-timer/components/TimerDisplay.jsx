import React from 'react';
import Icon from '../../../components/AppIcon';

const TimerDisplay = ({ remainingTime, status, isActive }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
    }
    return `${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    if (!isActive) return 'text-muted-foreground';
    if (status === 'critical') return 'text-primary';
    if (status === 'warning') return 'text-warning';
    return 'text-accent';
  };

  const getStatusIcon = () => {
    if (!isActive) return 'Clock';
    if (status === 'critical') return 'AlertTriangle';
    if (status === 'warning') return 'AlertCircle';
    return 'Timer';
  };

  const getStatusText = () => {
    if (!isActive) return 'Timer Inactive';
    if (status === 'critical') return 'Critical - Check In Now!';
    if (status === 'warning') return 'Warning - 5 Minutes Remaining';
    return 'Timer Active';
  };

  return (
    <div className="w-full bg-card rounded-xl lg:rounded-2xl p-6 md:p-8 lg:p-10 shadow-glow-lg">
      <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
        <div className="flex items-center gap-3 md:gap-4">
          <Icon 
            name={getStatusIcon()}
            className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${getStatusColor()}`}
            size={48}
          />
          <h2 className={`text-lg md:text-xl lg:text-2xl font-semibold ${getStatusColor()}`}>
            {getStatusText()}
          </h2>
        </div>

        <div className={`text-6xl md:text-7xl lg:text-8xl font-bold ${getStatusColor()} font-mono tracking-wider`}>
          {formatTime(remainingTime)}
        </div>

        {isActive && (
          <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
            <Icon name="MapPin" size={16} className="w-4 h-4 md:w-5 md:h-5" />
            <span>Location tracking active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimerDisplay;