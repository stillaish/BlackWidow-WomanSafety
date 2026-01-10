import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EventDetailModal = ({ event, onClose }) => {
  if (!event) return null;

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

  const formatFullTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] bg-card border border-border rounded-2xl shadow-glow-xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-${event?.type === 'sos' ? 'primary' : event?.type === 'safe' ? 'success' : 'secondary'}/10 flex items-center justify-center`}>
              <Icon
                name={getEventIcon(event?.type)}
                size={20}
                className={getEventColor(event?.type)}
              />
            </div>
            <div>
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
                {event?.title}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                {formatFullTimestamp(event?.timestamp)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-all duration-250"
            aria-label="Close modal"
            type="button"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
          <div>
            <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
              Description
            </h3>
            <p className="text-sm md:text-base text-foreground/80">
              {event?.description}
            </p>
          </div>

          {event?.aiMessage && (
            <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Sparkles" size={16} className="text-secondary" />
                <h3 className="text-sm md:text-base font-semibold text-secondary">
                  AI-Generated Message
                </h3>
              </div>
              <p className="text-sm md:text-base text-foreground/80">
                {event?.aiMessage}
              </p>
            </div>
          )}

          {event?.location && (
            <div>
              <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
                Location
              </h3>
              <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                <Icon name="MapPin" size={16} className="text-accent flex-shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base text-foreground">
                    {event?.location}
                  </p>
                  {event?.coordinates && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {event?.coordinates?.lat}, {event?.coordinates?.lng}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {event?.contacts && event?.contacts?.length > 0 && (
            <div>
              <h3 className="text-sm md:text-base font-semibold text-foreground mb-3">
                Notified Contacts ({event?.contacts?.length})
              </h3>
              <div className="space-y-2">
                {event?.contacts?.map((contact) => (
                  <div
                    key={contact?.id}
                    className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={contact?.avatar}
                        alt={contact?.avatarAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-base font-medium text-foreground line-clamp-1">
                        {contact?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {contact?.relationship}
                      </p>
                    </div>
                    {contact?.responded && (
                      <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {event?.responseTime && (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm md:text-base font-medium text-foreground">
                  Response Time
                </span>
              </div>
              <span className="text-sm md:text-base font-semibold text-foreground">
                {event?.responseTime}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="Info" size={16} className="text-muted-foreground" />
              <span className="text-sm md:text-base font-medium text-foreground">
                Status
              </span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              event?.status === 'Resolved' ? 'bg-success/20 text-success' :
              event?.status === 'Active'? 'bg-primary/20 text-primary' : 'bg-warning/20 text-warning'
            }`}>
              {event?.status}
            </span>
          </div>
        </div>

        <div className="p-4 md:p-6 border-t border-border">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all duration-250"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;