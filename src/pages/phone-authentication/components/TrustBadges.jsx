import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustBadges = () => {
  const badges = [
    {
      id: 'ssl',
      icon: 'Lock',
      text: 'Prototype Only',
      description: 'Prototype web application'
    },
    {
      id: 'privacy',
      icon: 'ShieldCheck',
      text: 'Privacy Protected',
      description: 'GDPR compliant'
    },
    {
      id: 'emergency',
      icon: 'Phone',
      text: 'Emergency Ready',
      description: '24/7 response'
    },
    {
      id: 'verified',
      icon: 'BadgeCheck',
      text: 'Verified Platform',
      description: 'Trusted by thousands'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {badges?.map((badge) => (
          <div
            key={badge?.id}
            className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-lg bg-card border border-border hover:border-success/30 transition-all duration-250"
          >
            <Icon
              name={badge?.icon}
              size={24}
              color="var(--color-success)"
            />
            <div className="text-center">
              <p className="text-xs md:text-sm font-medium text-foreground">
                {badge?.text}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {badge?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground">
          Your data is encrypted and secure. We never share your information.
        </p>
        <button
          type="button"
          className="text-xs text-primary hover:text-primary/80 underline transition-colors"
          onClick={() => window.open('/privacy-policy', '_blank')}
        >
          Read our Privacy Policy
        </button>
      </div>
    </div>
  );
};

export default TrustBadges;