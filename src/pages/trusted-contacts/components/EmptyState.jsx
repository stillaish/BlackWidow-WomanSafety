import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onAddContact, onImportContacts }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-8 md:p-12 text-center">
      <div className="inline-flex p-6 bg-muted rounded-full mb-6">
        <Icon name="Users" size={64} className="text-muted-foreground" />
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
        No Trusted Contacts Yet
      </h2>

      <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-md mx-auto">
        Add trusted contacts who will receive your emergency alerts and location during SOS situations. Build your safety network now.
      </p>

      <div className="flex flex-col md:flex-row gap-3 justify-center max-w-md mx-auto">
        <Button
          variant="default"
          iconName="UserPlus"
          iconPosition="left"
          onClick={onAddContact}
          fullWidth
          className="md:flex-1"
        >
          Add First Contact
        </Button>

        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          onClick={onImportContacts}
          fullWidth
          className="md:flex-1"
        >
          Import Contacts
        </Button>
      </div>

      <div className="mt-8 p-4 bg-accent/10 border border-accent/30 rounded-lg">
        <div className="flex items-start gap-3 text-left">
          <Icon name="Info" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Why Add Trusted Contacts?
            </p>
            <p className="text-xs text-muted-foreground">
              Your trusted contacts will be automatically notified with your location when you activate SOS. They can track your safety in real-time and coordinate help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;