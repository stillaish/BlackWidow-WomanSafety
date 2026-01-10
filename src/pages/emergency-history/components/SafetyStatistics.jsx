import React from 'react';
import Icon from '../../../components/AppIcon';

const SafetyStatistics = ({ statistics }) => {
  const statCards = [
    {
      id: 'total-events',
      label: 'Total Events',
      value: statistics?.totalEvents,
      icon: 'Activity',
      color: 'text-foreground',
      bgColor: 'bg-muted'
    },
    {
      id: 'sos-activations',
      label: 'SOS Activations',
      value: statistics?.sosActivations,
      icon: 'AlertCircle',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'safe-checkins',
      label: 'Safe Check-ins',
      value: statistics?.safeCheckins,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'avg-response',
      label: 'Avg Response Time',
      value: statistics?.avgResponseTime,
      icon: 'Clock',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
        Safety Statistics
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
        {statCards?.map((stat) => (
          <div
            key={stat?.id}
            className={`${stat?.bgColor} rounded-xl p-4 md:p-5 lg:p-6`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">
                  {stat?.label}
                </p>
                <p className={`text-xl md:text-2xl lg:text-3xl font-bold ${stat?.color}`}>
                  {stat?.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
          Most Contacted
        </h3>
        <div className="space-y-3">
          {statistics?.mostContacted?.map((contact, index) => (
            <div
              key={contact?.id}
              className="flex items-center gap-3 p-3 bg-muted rounded-lg"
            >
              <span className="text-sm font-medium text-muted-foreground w-6">
                #{index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base font-medium text-foreground line-clamp-1">
                  {contact?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {contact?.contactCount} times
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
          Frequent Locations
        </h3>
        <div className="space-y-3">
          {statistics?.frequentLocations?.map((location, index) => (
            <div
              key={location?.id}
              className="flex items-start gap-3 p-3 bg-muted rounded-lg"
            >
              <Icon name="MapPin" size={16} className="text-accent flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base font-medium text-foreground line-clamp-1">
                  {location?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {location?.visitCount} visits
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetyStatistics;