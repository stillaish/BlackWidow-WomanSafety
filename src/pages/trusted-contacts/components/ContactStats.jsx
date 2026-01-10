import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactStats = ({ contacts }) => {
  const stats = {
    total: contacts?.length,
    verified: contacts?.filter(c => c?.verified)?.length,
    sosEnabled: contacts?.filter(c => c?.sosNotifications)?.length,
    locationEnabled: contacts?.filter(c => c?.locationSharing)?.length,
    highPriority: contacts?.filter(c => c?.priority === 'high')?.length
  };

  const statCards = [
    {
      id: 'total',
      label: 'Total Contacts',
      value: stats?.total,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/20'
    },
    {
      id: 'verified',
      label: 'Verified',
      value: stats?.verified,
      icon: 'ShieldCheck',
      color: 'text-success',
      bgColor: 'bg-success/20'
    },
    {
      id: 'sos',
      label: 'SOS Enabled',
      value: stats?.sosEnabled,
      icon: 'Bell',
      color: 'text-warning',
      bgColor: 'bg-warning/20'
    },
    {
      id: 'location',
      label: 'Location Sharing',
      value: stats?.locationEnabled,
      icon: 'MapPin',
      color: 'text-accent',
      bgColor: 'bg-accent/20'
    },
    {
      id: 'priority',
      label: 'High Priority',
      value: stats?.highPriority,
      icon: 'Flag',
      color: 'text-primary',
      bgColor: 'bg-primary/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      {statCards?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card border border-border rounded-xl p-4 md:p-5 transition-smooth hover:shadow-glow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            {stat?.value}
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            {stat?.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ContactStats;