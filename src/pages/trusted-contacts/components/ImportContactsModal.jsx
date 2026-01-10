import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImportContactsModal = ({ onClose, onImport }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [importedContacts, setImportedContacts] = useState([]);

  const mockDeviceContacts = [
    {
      id: 'import-1',
      name: 'Khanak ',
      phone: '+1 (555) 234-5678',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      avatarAlt: 'Profile avatar for Khanak  from device contacts'
    },
    {
      id: 'import-2',
      name: 'Aman',
      phone: '+1 (555) 345-6789',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      avatarAlt: 'Profile avatar for Aman from device contacts'
    },
    {
      id: 'import-3',
      name: 'Vanshika Chitransh',
      phone: '+1 (555) 456-7890',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      avatarAlt: 'Profile avatar for Vanshika Chitransh from device contacts'
    },
    {
      id: 'import-4',
      name: 'Vanh Chitransh',
      phone: '+1 (555) 567-8901',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      avatarAlt: 'Profile avatar for Vanh Chitransh from device contacts'
    }
  ];

  const handleImportRequest = () => {
    setIsImporting(true);
    setTimeout(() => {
      setImportedContacts(mockDeviceContacts);
      setIsImporting(false);
    }, 1500);
  };

  const handleSelectContact = (contactId) => {
    setImportedContacts(prev =>
      prev?.map(contact =>
        contact?.id === contactId
          ? { ...contact, selected: !contact?.selected }
          : contact
      )
    );
  };

  const handleImportSelected = () => {
    const selectedContacts = importedContacts?.filter(c => c?.selected)?.map(c => ({
        ...c,
        relationship: 'friend',
        sosNotifications: true,
        locationSharing: true,
        priority: 'medium',
        verified: false,
        addedDate: new Date()?.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        lastNotified: null
      }));

    onImport(selectedContacts);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Icon name="Download" size={20} className="text-accent" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-foreground">
              Import from Device Contacts
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {importedContacts?.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex p-4 bg-muted rounded-full mb-4">
                <Icon name="Smartphone" size={48} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Access Device Contacts
              </h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                Grant permission to import contacts from your device. We'll only access contact names and phone numbers.
              </p>
              <Button
                variant="default"
                iconName="Download"
                iconPosition="left"
                onClick={handleImportRequest}
                loading={isImporting}
              >
                {isImporting ? 'Accessing Contacts...' : 'Import Contacts'}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  {importedContacts?.filter(c => c?.selected)?.length} of {importedContacts?.length} selected
                </p>
                <button
                  onClick={() => {
                    const allSelected = importedContacts?.every(c => c?.selected);
                    setImportedContacts(prev =>
                      prev?.map(c => ({ ...c, selected: !allSelected }))
                    );
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  {importedContacts?.every(c => c?.selected) ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              {importedContacts?.map((contact) => (
                <button
                  key={contact?.id}
                  onClick={() => handleSelectContact(contact?.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-smooth ${
                    contact?.selected
                      ? 'border-primary bg-primary/10' :'border-border hover:bg-muted'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-smooth ${
                    contact?.selected
                      ? 'border-primary bg-primary' :'border-muted-foreground'
                  }`}>
                    {contact?.selected && (
                      <Icon name="Check" size={14} color="white" />
                    )}
                  </div>

                  <img
                    src={contact?.avatar}
                    alt={contact?.avatarAlt}
                    className="w-12 h-12 rounded-full"
                  />

                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground">{contact?.name}</p>
                    <p className="text-sm text-muted-foreground">{contact?.phone}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {importedContacts?.length > 0 && (
          <div className="p-4 md:p-6 border-t border-border">
            <div className="flex flex-col md:flex-row gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                fullWidth
                className="md:flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                iconName="UserPlus"
                iconPosition="left"
                onClick={handleImportSelected}
                disabled={!importedContacts?.some(c => c?.selected)}
                fullWidth
                className="md:flex-1"
              >
                Import Selected ({importedContacts?.filter(c => c?.selected)?.length})
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportContactsModal;