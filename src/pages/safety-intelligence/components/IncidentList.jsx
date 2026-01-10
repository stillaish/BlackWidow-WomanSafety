import React from 'react';
import Icon from '../../../components/AppIcon';

const IncidentList = ({ incidents, selectedFilters }) => {
  const filteredIncidents = incidents?.filter(incident => {
    if (selectedFilters?.incidentTypes?.length > 0 && !selectedFilters?.incidentTypes?.includes(incident?.type)) {
      return false;
    }
    if (selectedFilters?.riskLevels?.length > 0 && !selectedFilters?.riskLevels?.includes(incident?.riskLevel)) {
      return false;
    }
    return true;
  });

  const getIncidentIcon = (type) => {
    const iconMap = {
      harassment: 'UserX',
      stalking: 'Eye',
      assault: 'AlertTriangle',
      theft: 'ShoppingBag',
      suspicious: 'Search',
      unsafe_area: 'MapPin',
      poor_lighting: 'Lightbulb',
      other: 'AlertCircle'
    };
    return iconMap?.[type] || 'AlertCircle';
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'high':
        return 'var(--color-primary)';
      case 'medium':
        return 'var(--color-warning)';
      case 'low':
        return 'var(--color-accent)';
      default:
        return 'var(--color-secondary)';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = now - new Date(timestamp)?.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="w-full bg-card rounded-xl border border-border p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-semibold">Recent Incidents</h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            {filteredIncidents?.length} {filteredIncidents?.length === 1 ? 'report' : 'reports'}
          </p>
        </div>
        <Icon name="List" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-3 md:space-y-4 max-h-96 overflow-y-auto">
        {filteredIncidents?.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No incidents match your filters</p>
          </div>
        ) : (
          filteredIncidents?.map((incident) => (
            <div
              key={incident?.id}
              className="p-3 md:p-4 bg-muted/50 rounded-lg border border-border hover:bg-muted transition-smooth"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${getRiskColor(incident?.riskLevel)}20` }}
                >
                  <Icon
                    name={getIncidentIcon(incident?.type)}
                    size={18}
                    color={getRiskColor(incident?.riskLevel)}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm md:text-base font-medium capitalize">
                      {incident?.type?.replace('_', ' ')}
                    </h3>
                    <span
                      className="text-xs px-2 py-1 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: `${getRiskColor(incident?.riskLevel)}20`,
                        color: getRiskColor(incident?.riskLevel)
                      }}
                    >
                      {incident?.riskLevel}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">
                    {incident?.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={12} />
                      <span className="line-clamp-1">{incident?.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      <span>{formatTimeAgo(incident?.timestamp)}</span>
                    </div>
                    {incident?.anonymous && (
                      <div className="flex items-center gap-1">
                        <Icon name="EyeOff" size={12} />
                        <span>Anonymous</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IncidentList;