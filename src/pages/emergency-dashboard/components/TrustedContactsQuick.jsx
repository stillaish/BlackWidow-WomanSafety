import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrustedContactsQuick = () => {
  const navigate = useNavigate();

  const trustedContacts = [
  {
    id: 1,
    name: "Khanak",
    relationship: "Sister",
    phone: "+91 9454403099",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d99ce68c-1763293773878.png",
    avatarAlt: "Professional headshot of young woman with long brown hair wearing blue blazer",
    isAvailable: true,
    lastActive: "2 min ago"
  },
  {
    id: 2,
    name: "Aman",
    relationship: "Friend",
    phone: "+91 9999999999",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13a48293d-1763296098326.png",
    avatarAlt: "Professional headshot of Asian man with short black hair wearing gray suit",
    isAvailable: true,
    lastActive: "5 min ago"
  },
  {
    id: 3,
    name: "Vanshika chitransh",
    relationship: "Colleague",
    phone: "+91 8888888888",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1402ef150-1763296666361.png",
    avatarAlt: "Professional headshot of Hispanic woman with curly dark hair wearing white blouse",
    isAvailable: false,
    lastActive: "1 hour ago"
  }];


  const handleContactCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleShareLocation = (contact) => {
    const locationData = {
      contactId: contact?.id,
      contactName: contact?.name,
      timestamp: new Date()?.toISOString(),
      shared: true
    };

    localStorage.setItem(`locationShare_${contact?.id}`, JSON.stringify(locationData));
  };

  return (
    <div className="w-full bg-card rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-glow-md">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <Icon name="Users" size={24} className="text-secondary w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">Trusted Contacts</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="Plus"
          onClick={() => navigate('/trusted-contacts')}>

          <span className="hidden sm:inline">Add</span>
        </Button>
      </div>
      <div className="space-y-3 md:space-y-4">
        {trustedContacts?.map((contact) =>
        <div
          key={contact?.id}
          className="bg-muted/50 rounded-xl md:rounded-2xl p-3 md:p-4 hover:bg-muted/70 transition-all duration-300">

            <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="relative">
                <Image
                src={contact?.avatar}
                alt={contact?.avatarAlt}
                className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover" />

                <div
                className={`absolute bottom-0 right-0 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-card ${
                contact?.isAvailable ? 'bg-success' : 'bg-muted-foreground'}`
                }
                aria-label={contact?.isAvailable ? 'Available' : 'Unavailable'} />

              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm md:text-base lg:text-lg font-semibold line-clamp-1">
                  {contact?.name}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {contact?.relationship}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Active {contact?.lastActive}
                </p>
              </div>
            </div>

            <div className="flex gap-2 md:gap-3">
              <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              onClick={() => handleContactCall(contact?.phone)}
              className="flex-1">

                Call
              </Button>
              <Button
              variant="outline"
              size="sm"
              iconName="MapPin"
              iconPosition="left"
              onClick={() => handleShareLocation(contact)}
              className="flex-1">

                Share Location
              </Button>
            </div>
          </div>
        )}
      </div>
      <Button
        variant="secondary"
        fullWidth
        iconName="Users"
        iconPosition="left"
        onClick={() => navigate('/trusted-contacts')}
        className="mt-4 md:mt-6">

        Manage All Contacts
      </Button>
    </div>);

};

export default TrustedContactsQuick;