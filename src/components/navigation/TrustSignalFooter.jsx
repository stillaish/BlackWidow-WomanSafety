import React from 'react';
import Icon from '../AppIcon';

const TrustSignalFooter = () => {
  const trustSignals = [
    {
      id: 'ssl',
      icon: 'Lock',
      text: 'Only prototye'
    },
    {
      id: 'emergency',
      icon: 'Phone',
      text: 'Emergency Services Connected'
    },
    {
      id: 'privacy',
      icon: 'ShieldCheck',
      text: 'Privacy Compliant'
    },
    {
      id: 'verified',
      icon: 'BadgeCheck',
      text: 'Verified Platform'
    }
  ];

  return (
    <footer className="trust-signal-footer" role="contentinfo">
      <div className="trust-signal-content">
        <div className="trust-signal-badges">
          {trustSignals?.map((signal) => (
            <div key={signal?.id} className="trust-signal-badge">
              <Icon 
                name={signal?.icon}
                className="trust-signal-icon"
                size={16}
              />
              <span>{signal?.text}</span>
            </div>
          ))}
        </div>
        <p className="trust-signal-text">
        © 2025 Black Widow | This Web Is Developed By Aish Maheshwari
        </p>
      </div>
    </footer>
  );
};

export default TrustSignalFooter;
// This Is A Prototype Only Do Not Use In Production It MAy Not Work As Expected And Developed by Aish Maheshwari