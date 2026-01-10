import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import TabNavigation from '../../components/navigation/TabNavigation';
import EmergencyStatusBar from '../../components/navigation/EmergencyStatusBar';


import TrustSignalFooter from '../../components/navigation/TrustSignalFooter';

import SOSButton from './components/SOSButton';
import VoiceSOSIndicator from './components/VoiceSOSIndicator';
import LocationDisplay from './components/LocationDisplay';
import SafetyTimerCard from './components/SafetyTimerCard';
import NearbyHelpFinder from './components/NearbyHelpFinder';
import TrustedContactsQuick from './components/TrustedContactsQuick';
import HelplineList from './components/HelplineList';
import SafetyIntelligencePanel from './components/SafetyIntelligencePanel';

const EmergencyDashboard = () => {
  const [emergencyStatus, setEmergencyStatus] = useState(null);

  useEffect(() => {
    const handleEmergencyChange = () => {
      const stored = localStorage.getItem('emergencyStatus');
      if (stored) {
        setEmergencyStatus(JSON.parse(stored));
      } else {
        setEmergencyStatus(null);
      }
    };

    handleEmergencyChange();
    window.addEventListener('emergencyStatusChanged', handleEmergencyChange);

    return () => {
      window.removeEventListener('emergencyStatusChanged', handleEmergencyChange);
    };
  }, []);

  const handleSOSActivate = (data) => {
    setEmergencyStatus(data);
  };

  const handleVoiceActivate = (data) => {
    setEmergencyStatus(data);
  };

  return (
    <>
      <Helmet>
        <title>Emergency Dashboard - Black Widow</title>
        <meta
          name="description"
          content="Emergency command center with instant SOS, real-time location tracking, and AI-powered safety intelligence for women's safety"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <EmergencyStatusBar />

        <main className="pt-16 pb-32 lg:pb-24">
          <div className="w-full max-w-none px-4 md:px-6 lg:px-10 xl:px-16 2xl:px-24 py-6 md:py-8 lg:py-12">

            {/* HEADER */}
            <div className="mb-6 md:mb-8 lg:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3">
                Emergency Dashboard
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
                Your safety command center - instant emergency response at your fingertips
              </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              
              {/* LEFT SIDE */}
              <div className="lg:col-span-2 space-y-4 md:space-y-6 lg:space-y-8">
                
                <div className="space-y-4 md:space-y-6">
                  <SOSButton onSOSActivate={handleSOSActivate} />
                  <VoiceSOSIndicator onVoiceActivate={handleVoiceActivate} />
                </div>

                {/* ✅ THIS IS THE ONLY MAP (iframe) */}
                <LocationDisplay />

                <SafetyTimerCard />

                <NearbyHelpFinder />
              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-4 md:space-y-6 lg:space-y-8">
                <TrustedContactsQuick />
                <HelplineList />
                <SafetyIntelligencePanel />
              </div>

            </div>
          </div>
        </main>

      
        <TabNavigation />
        <TrustSignalFooter />
      </div>
    </>
  );
};

export default EmergencyDashboard;
