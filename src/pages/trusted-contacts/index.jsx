import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { initPushNotifications, listenForPushMessages } from "../../utils/pushNotifications";
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TabNavigation from '../../components/navigation/TabNavigation';
import EmergencyStatusBar from '../../components/navigation/EmergencyStatusBar';


import LocationPrivacyToggle from '../../components/navigation/LocationPrivacyToggle';
import TrustSignalFooter from '../../components/navigation/TrustSignalFooter';
import ContactCard from './components/ContactCard';
import AddContactForm from './components/AddContactForm';
import ContactStats from './components/ContactStats';
import BulkActions from './components/BulkActions';
import ImportContactsModal from './components/ImportContactsModal';
import EmptyState from './components/EmptyState';

const BASE_URL = "https://black-widow-woman-safety.onrender.com";

const TrustedContacts = () => {
  const [contacts, setContacts] = useState([
    { id: "1", name: "khanak", phone: "+91 1234567890", priority: "high" },
    { id: "2", name: "aman", phone: "++91 81125 45387", priority: "high" },
    { id: "3", name: "anshika", phone: "+91 9999999999", priority: "medium" },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [filterPriority, setFilterPriority] = useState('all');

  // ==============================
  //  SAVE FCM TOKEN
  // ==============================
  const enableAlertsForContact = async (contactId) => {
    const token = await initPushNotifications();
    listenForPushMessages();

    if (!token) {
      alert("❌ Failed to get FCM token");
      return;
    }

    await fetch(`${BASE_URL}/trusted-contacts/${contactId}/fcm?token=${token}`, {
      method: "POST",
    });

    alert("✅ This device will now receive SOS alerts");
  };

  // ==============================
  // STORAGE
  // ==============================
  useEffect(() => {
    const saved = localStorage.getItem("trustedContacts");
    if (saved) setContacts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("trustedContacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (newContact) => {
    setContacts((prev) => [newContact, ...prev]);
    setShowAddForm(false);
  };

  const handleDeleteContact = (contactId) => {
    if (!window.confirm("Delete contact?")) return;
    setContacts((prev) => prev.filter((c) => c.id !== contactId));
  };

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    const matchesPriority = filterPriority === "all" || c.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <>
      <Helmet>
        <title>Trusted Contacts - Black Widow</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <EmergencyStatusBar />

        <main className="pt-16 pb-32 lg:pb-8">
          <div className="w-full px-4 py-6">

            <h1 className="text-3xl font-bold mb-4">Trusted Contacts</h1>

            <ContactStats contacts={contacts} />

            {showAddForm && (
              <AddContactForm
                onAdd={handleAddContact}
                onCancel={() => setShowAddForm(false)}
              />
            )}

            <div className="bg-card border rounded-xl p-4 mt-6">

              <div className="flex gap-2 mb-4">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <Button onClick={() => setShowAddForm(true)}>Add Contact</Button>
              </div>

              {filteredContacts.length === 0 ? (
                <EmptyState
                  onAddContact={() => setShowAddForm(true)}
                  onImportContacts={() => setShowImportModal(true)}
                />
              ) : (
                <div className="space-y-4">
                  {filteredContacts.map((contact) => (
                    <div key={contact.id} className="border rounded-xl p-4">

                      <ContactCard
                        contact={contact}
                        onDelete={handleDeleteContact}
                      />

                      {/* 🔥 THIS IS STEP 3 BUTTON */}
                      <div className="mt-3 flex justify-end">
                        <Button
                          variant="outline"
                          onClick={() => enableAlertsForContact(contact.id)}
                        >
                          🔔 Enable Alerts On This Device
                        </Button>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>
        </main>

       
        <TabNavigation />
        <TrustSignalFooter />

        {showImportModal && (
          <ImportContactsModal
            onClose={() => setShowImportModal(false)}
            onImport={(list) => setContacts(list)}
          />
        )}
      </div>
    </>
  );
};

export default TrustedContacts;
