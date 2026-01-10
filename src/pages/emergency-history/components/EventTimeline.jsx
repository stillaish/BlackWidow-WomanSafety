import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EventTimeline = ({ events, onEventClick }) => {
  const getEventIcon = (type) => {
    const icons = {
      sos: 'AlertCircle',
      timer: 'Timer',
      safe: 'CheckCircle',
      incident: 'FileText',
      location: 'MapPin'
    };
    return icons?.[type] || 'Circle';
  };

  const getEventColor = (type) => {
    const colors = {
      sos: 'text-primary',
      timer: 'text-secondary',
      safe: 'text-success',
      incident: 'text-warning',
      location: 'text-accent'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const getEventBgColor = (type) => {
    const bgColors = {
      sos: 'bg-primary/10',
      timer: 'bg-secondary/10',
      safe: 'bg-success/10',
      incident: 'bg-warning/10',
      location: 'bg-accent/10'
    };
    return bgColors?.[type] || 'bg-muted';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (events?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20">
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-muted flex items-center justify-center mb-4 md:mb-6">
          <Icon name="Clock" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2">
          No Events Found
        </h3>
        <p className="text-sm md:text-base text-muted-foreground text-center max-w-md">
          No emergency events match your current filters. Try adjusting your date range or event types.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {events?.map((event, index) => (
        <div
          key={event?.id}
          className="relative pl-8 md:pl-10 lg:pl-12"
        >
          {index !== events?.length - 1 && (
            <div className="absolute left-3 md:left-4 lg:left-5 top-8 md:top-10 bottom-0 w-0.5 bg-border" />
          )}

          <div className={`absolute left-0 top-0 w-6 h-6 md:w-8 md:h-8 rounded-full ${getEventBgColor(event?.type)} flex items-center justify-center`}>
            <Icon
              name={getEventIcon(event?.type)}
              size={14}
              className={getEventColor(event?.type)}
            />
          </div>

          <button
            onClick={() => onEventClick(event)}
            className="w-full text-left bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6 hover:border-border/60 transition-all duration-250 shadow-glow-sm hover:shadow-glow-md"
            type="button"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground mb-1 line-clamp-1">
                  {event?.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {formatTimestamp(event?.timestamp)}
                </p>
              </div>
              <span className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-medium ${getEventBgColor(event?.type)} ${getEventColor(event?.type)} whitespace-nowrap`}>
                {event?.status}
              </span>
            </div>

            <p className="text-sm md:text-base text-foreground/80 mb-3 md:mb-4 line-clamp-2">
              {event?.description}
            </p>

            {event?.location && (
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-3">
                <Icon name="MapPin" size={14} />
                <span className="line-clamp-1">{event?.location}</span>
              </div>
            )}

            {event?.contacts && event?.contacts?.length > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Users" size={14} className="text-muted-foreground flex-shrink-0" />
                <div className="flex -space-x-2">
                  {event?.contacts?.slice(0, 3)?.map((contact, idx) => (
                    <div
                      key={idx}
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-card overflow-hidden"
                    >
                      <Image
                        src={contact?.avatar}
                        alt={contact?.avatarAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {event?.contacts?.length > 3 && (
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium text-muted-foreground">
                        +{event?.contacts?.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {event?.responseTime && (
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>Response time: {event?.responseTime}</span>
              </div>
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default EventTimeline;