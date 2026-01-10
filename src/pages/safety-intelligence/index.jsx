import React, { useState, useEffect } from 'react';
import TabNavigation from '../../components/navigation/TabNavigation';
import EmergencyStatusBar from '../../components/navigation/EmergencyStatusBar';


import LocationPrivacyToggle from '../../components/navigation/LocationPrivacyToggle';
import TrustSignalFooter from '../../components/navigation/TrustSignalFooter';
import SafetyMap from './components/SafetyMap';
import SafetyTipsPanel from './components/SafetyTipsPanel';
import IncidentReportForm from './components/IncidentReportForm';
import SafetyScoreCard from './components/SafetyScoreCard';
import FilterControls from './components/FilterControls';
import IncidentList from './components/IncidentList';

const SafetyIntelligence = () => {
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      type: 'harassment',
      location: 'CI Park ,Prem Nagar, Bareilly ,Uttar Pradesh',
      description: 'Verbal harassment by group of individuals near park entrance.',
      timestamp: new Date(Date.now() - 7200000)?.toISOString(),
      riskLevel: 'high',
      anonymous: true,
      lat: 40.7829,
      lng: -73.9654
    },
    {
      id: 2,
      type: 'stalking',
      location: 'Koharapeer,Bareilly ,Uttar Pradesh',
      description: 'Followed for three blocks by unknown person.',
      timestamp: new Date(Date.now() - 14400000)?.toISOString(),
      riskLevel: 'high',
      anonymous: true,
      lat: 40.7536,
      lng: -73.9832
    },
  ]);

  const [selectedFilters, setSelectedFilters] = useState({
    incidentTypes: [],
    riskLevels: [],
    timeRange: '7days'
  });

  const [selectedIncident, setSelectedIncident] = useState(null);

  const areaData = {
    areaName: 'Your Area',
    safetyScore: 72,
    incidentCount: 23,
    incidentTrend: 'down',
    responseTime: 5,
    lightingScore: 85,
    patrolFrequency: 'Regular',
    recommendation: 'Exercise caution during evening hours.'
  };

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const handleIncidentSubmit = (newIncident) => {
    setIncidents(prev => [newIncident, ...prev]);
  };

  const handleIncidentSelect = (incident) => {
    setSelectedIncident(incident); // 🔥 THIS IS THE CONNECTION
  };

  useEffect(() => {
    const handleEmergencyStatusChange = () => {
      // If SOS happens, map will recenter automatically (handled in SafetyMap)
    };

    window.addEventListener('emergencyStatusChanged', handleEmergencyStatusChange);
    return () => {
      window.removeEventListener('emergencyStatusChanged', handleEmergencyStatusChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <EmergencyStatusBar />

      <main className="flex-1 pt-16 pb-32 lg:pb-24">
        <div className="w-full px-4 py-6 md:px-6 md:py-8 space-y-6 md:space-y-8">
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Safety Intelligence</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                AI-powered safety guidance and community-driven awareness
              </p>
            </div>
            <LocationPrivacyToggle />
          </div>

          <FilterControls onFilterChange={handleFilterChange} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              
              <div className="h-96 md:h-[500px] lg:h-[600px]">
                <SafetyMap 
                  incidents={incidents}
                  selectedFilters={selectedFilters}
                  selectedIncident={selectedIncident}   // 🔥 PASS THIS
                />
              </div>

              <IncidentReportForm onSubmit={handleIncidentSubmit} />
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="h-96 md:h-[500px]">
                <SafetyTipsPanel />
              </div>

              <SafetyScoreCard areaData={areaData} />
            </div>
          </div>

          <IncidentList 
            incidents={incidents}
            selectedFilters={selectedFilters}
            onIncidentSelect={handleIncidentSelect}   // 🔥 PASS THIS
          />
        </div>
      </main>

      
      <TabNavigation />
      <TrustSignalFooter />
    </div>
  );
};

export default SafetyIntelligence;
