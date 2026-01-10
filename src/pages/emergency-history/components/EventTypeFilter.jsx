import React from 'react';
import Icon from '../../../components/AppIcon';

const EventTypeFilter = ({ selectedTypes, onTypeToggle }) => {
  const eventTypes = [
    {
      id: 'sos',
      label: 'SOS Alerts',
      icon: 'AlertCircle',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'timer',
      label: 'Safety Timers',
      icon: 'Timer',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 'safe',
      label: 'Safe Check-ins',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'incident',
      label: 'Incident Reports',
      icon: 'FileText',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'location',
      label: 'Location Shares',
      icon: 'MapPin',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {eventTypes?.map((type) => {
        const isSelected = selectedTypes?.includes(type?.id);
        return (
          <button
            key={type?.id}
            onClick={() => onTypeToggle(type?.id)}
            className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-lg transition-all duration-250 ${
              isSelected
                ? `${type?.bgColor} ${type?.color} shadow-glow-sm`
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            aria-pressed={isSelected}
            type="button"
          >
            <Icon name={type?.icon} size={16} className="flex-shrink-0" />
            <span className="text-xs md:text-sm font-medium whitespace-nowrap">
              {type?.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default EventTypeFilter;