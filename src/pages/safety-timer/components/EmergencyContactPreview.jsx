import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EmergencyContactPreview = ({ contacts }) => {
  return (
    <div className="w-full bg-card rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-8 shadow-glow-md">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <Icon 
          name="Users"
          className="w-5 h-5 md:w-6 md:h-6 text-accent"
          size={24}
        />
        <h3 className="text-base md:text-lg lg:text-xl font-semibold">
          Auto-SOS Recipients
        </h3>
      </div>
      {contacts?.length === 0 ? (
        <div className="text-center py-6 md:py-8">
          <Icon 
            name="UserX"
            className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-muted-foreground mx-auto mb-3 md:mb-4"
            size={64}
          />
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
            No trusted contacts added yet
          </p>
          <button
            className="px-4 md:px-6 py-2 md:py-3 bg-secondary text-secondary-foreground rounded-lg lg:rounded-xl text-sm md:text-base font-medium hover:bg-secondary/90 transition-all duration-250 ease-out active:scale-96"
            type="button"
          >
            Add Contacts
          </button>
        </div>
      ) : (
        <div className="space-y-3 md:space-y-4">
          {contacts?.map((contact) => (
            <div
              key={contact?.id}
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-muted/50"
            >
              <Image
                src={contact?.avatar}
                alt={contact?.avatarAlt}
                className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm md:text-base lg:text-lg font-semibold truncate">
                  {contact?.name}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground truncate">
                  {contact?.relationship}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Icon 
                  name="Phone"
                  className="w-4 h-4 md:w-5 md:h-5 text-accent"
                  size={20}
                />
                <Icon 
                  name="MessageSquare"
                  className="w-4 h-4 md:w-5 md:h-5 text-accent"
                  size={20}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start gap-2 md:gap-3">
          <Icon 
            name="Info"
            className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0 mt-0.5"
            size={20}
          />
          <p className="text-xs md:text-sm text-foreground">
            If you don't check in before timer expires, these contacts will receive an automatic SOS message with your location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactPreview;