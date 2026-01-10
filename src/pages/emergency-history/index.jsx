import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import TabNavigation from '../../components/navigation/TabNavigation';
import EmergencyStatusBar from '../../components/navigation/EmergencyStatusBar';


import LocationPrivacyToggle from '../../components/navigation/LocationPrivacyToggle';
import TrustSignalFooter from '../../components/navigation/TrustSignalFooter';
import EventTypeFilter from './components/EventTypeFilter';
import DateRangeFilter from './components/DateRangeFilter';
import EventTimeline from './components/EventTimeline';
import SafetyStatistics from './components/SafetyStatistics';
import EventDetailModal from './components/EventDetailModal';
import ExportControls from './components/ExportControls';

const EmergencyHistory = () => {
  const [selectedTypes, setSelectedTypes] = useState(['sos', 'timer', 'safe', 'incident', 'location']);
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-12-29');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const mockEvents = [
  {
    id: 1,
    type: 'sos',
    title: 'SOS Emergency Activated',
    description: 'Emergency SOS was triggered from downtown area. All trusted contacts were notified immediately with location details and AI-generated emergency message.',
    timestamp: new Date('2025-12-28T20:30:00'),
    status: 'Resolved',
    location: 'Koharapeer (Bareilly)',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    responseTime: '2m 34s',
    aiMessage: 'URGENT: I need immediate help. I am at Koharapeer (Bareilly). This is an emergency situation. Please contact me or emergency services immediately.',
    contacts: [
    {
      id: 1,
      name: 'khanak',
      relationship: 'Emergency Contact',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9e8814c-1763296696290.png",
      avatarAlt: 'Professional woman with brown hair in business attire smiling at camera',
      responded: true
    },
    {
      id: 2,
      name: 'Aman',
      relationship: 'Family Member',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_144f5236b-1763295524542.png",
      avatarAlt: 'Asian man with short black hair wearing casual blue shirt',
      responded: true
    },
    {
      id: 3,
      name: 'Vanshika Chitransh ',
      relationship: 'Close Friend',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19dc372df-1763294269106.png",
      avatarAlt: 'Hispanic woman with long dark hair in professional attire',
      responded: false
    }]

  },
  {
    id: 2,
    type: 'timer',
    title: 'Safety Timer Activated',
    description: 'Safety timer was set for 30 minutes during evening commute. Timer completed successfully with safe check-in confirmation.',
    timestamp: new Date('2025-12-27T18:45:00'),
    status: 'Completed',
    location: 'Sector 62, Noida',
    coordinates: { lat: 40.6782, lng: -73.9442 },
    responseTime: '30m 00s',
    contacts: [
    {
      id: 1,
      name: 'khanak',
      relationship: 'Emergency Contact',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9e8814c-1763296696290.png",
      avatarAlt: 'Professional woman with brown hair in business attire smiling at camera',
      responded: true
    }]

  },
  {
    id: 3,
    type: 'safe',
    title: 'Safe Check-in Confirmed',
    description: 'Successfully checked in as safe after evening walk. All active safety timers were cancelled and contacts were notified of safe status.',
    timestamp: new Date('2025-12-26T21:15:00'),
    status: 'Completed',
    location: 'Rajendra Nagar,Bareilly',
    coordinates: { lat: 40.7282, lng: -73.8150 },
    contacts: [
    {
      id: 2,
      name: 'Aman',
      relationship: 'Family Member',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_144f5236b-1763295524542.png",
      avatarAlt: 'Asian man with short black hair wearing casual blue shirt',
      responded: true
    }]

  },
  {
    id: 4,
    type: 'incident',
    title: 'Incident Report Submitted',
    description: 'Anonymous incident report was submitted regarding suspicious activity in the area. Report includes detailed description and location information for community safety awareness.',
    timestamp: new Date('2025-12-25T16:20:00'),
    status: 'Under Review',
    location: 'Rajendra Nagar,Bareilly',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    aiMessage: 'Incident report analyzed: Suspicious activity reported in commercial area during evening hours. Recommend increased awareness and avoiding isolated areas in this location.'
  },
  {
    id: 5,
    type: 'location',
    title: 'Location Sharing Activated',
    description: 'Real-time location sharing was enabled with 3 trusted contacts during late-night travel. Location updates were sent every 5 minutes until arrival at destination.',
    timestamp: new Date('2025-12-24T23:00:00'),
    status: 'Completed',
    location: 'Connaught Place, Delhi',
    coordinates: { lat: 40.7580, lng: -73.9855 },
    contacts: [
    {
      id: 1,
      name: 'khanak',
      relationship: 'Emergency Contact',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9e8814c-1763296696290.png",
      avatarAlt: 'Professional woman with brown hair in business attire smiling at camera',
      responded: true
    },
    {
      id: 2,
      name: 'Aman',
      relationship: 'Family Member',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_144f5236b-1763295524542.png",
      avatarAlt: 'Asian man with short black hair wearing casual blue shirt',
      responded: true
    },
    {
      id: 3,
      name: 'Vanshika Chitransh ',
      relationship: 'Close Friend',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19dc372df-1763294269106.png",
      avatarAlt: 'Hispanic woman with long dark hair in professional attire',
      responded: true
    }]

  },
  {
    id: 6,
    type: 'sos',
    title: 'Voice-Activated SOS',
    description: 'Emergency SOS was triggered using voice command. System detected distress keywords and automatically activated emergency protocols with location sharing.',
    timestamp: new Date('2025-12-23T19:30:00'),
    status: 'Resolved',
    location: 'Connaught Place, Delhi',
    coordinates: { lat: 40.6437, lng: -74.0831 },
    responseTime: '1m 45s',
    aiMessage: 'EMERGENCY ALERT: Voice-activated SOS detected. User is at 888 River Road, Waterfront Area. Immediate assistance required. Emergency services have been notified.',
    contacts: [
    {
      id: 1,
      name: 'khanak',
      relationship: 'Emergency Contact',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9e8814c-1763296696290.png",
      avatarAlt: 'Professional woman with brown hair in business attire smiling at camera',
      responded: true
    },
    {
      id: 2,
      name: 'Aman',
      relationship: 'Family Member',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_144f5236b-1763295524542.png",
      avatarAlt: 'Asian man with short black hair wearing casual blue shirt',
      responded: true
    }]

  },
  {
    id: 7,
    type: 'timer',
    title: 'Safety Timer Auto-SOS',
    description: 'Safety timer expired without check-in. Automatic SOS was triggered and emergency contacts were notified. User confirmed safe status 5 minutes after auto-trigger.',
    timestamp: new Date('2025-12-22T22:00:00'),
    status: 'Resolved',
    location: 'Ekta Nagar,Bareilly',
    coordinates: { lat: 40.8448, lng: -73.9242 },
    responseTime: '5m 12s',
    contacts: [
    {
      id: 3,
      name: 'Vanshika Chitransh ',
      relationship: 'Close Friend',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19dc372df-1763294269106.png",
      avatarAlt: 'Hispanic woman with long dark hair in professional attire',
      responded: true
    }]

  },
  {
    id: 8,
    type: 'incident',
    title: 'Unsafe Area Reported',
    description: 'Community member reported unsafe area with poor lighting and isolated location. Report added to community safety map for awareness and route planning.',
    timestamp: new Date('2025-12-21T17:45:00'),
    status: 'Published',
    location: 'Ekta Nagar,Bareilly',
    coordinates: { lat: 40.6565, lng: -74.0106 },
    aiMessage: 'Safety analysis: Area reported as unsafe due to poor lighting and isolation. Recommend alternative routes and increased awareness when traveling through this location.'
  }];


  const mockStatistics = {
    totalEvents: 8,
    sosActivations: 2,
    safeCheckins: 1,
    avgResponseTime: '3m 15s',
    mostContacted: [
    { id: 1, name: 'khanak', contactCount: 5 },
    { id: 2, name: 'Aman', contactCount: 4 },
    { id: 3, name: 'Vanshika Chitransh ', contactCount: 3 }],

    frequentLocations: [
    { id: 1, name: 'Connaught Place, Delhi', visitCount: 3 },
    { id: 2, name: 'Rajendra Nagar ,Bareilly', visitCount: 2 },
    { id: 3, name: 'Ekta Nagar ,Bareilly', visitCount: 1 }]

  };

  useEffect(() => {
    filterEvents();
  }, [selectedTypes, startDate, endDate]);

  const filterEvents = () => {
    let filtered = mockEvents?.filter((event) => selectedTypes?.includes(event?.type));

    if (startDate) {
      filtered = filtered?.filter((event) => new Date(event.timestamp) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered?.filter((event) => new Date(event.timestamp) <= new Date(endDate));
    }

    filtered?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredEvents(filtered);
  };

  const handleTypeToggle = (typeId) => {
    setSelectedTypes((prev) =>
    prev?.includes(typeId) ?
    prev?.filter((id) => id !== typeId) :
    [...prev, typeId]
    );
  };

  const handleQuickDateSelect = (start, end) => {
    setStartDate(start ? start?.toISOString()?.split('T')?.[0] : '');
    setEndDate(end?.toISOString()?.split('T')?.[0]);
  };

  const handleExport = async (format) => {
    console.log(`Exporting data in ${format} format...`);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Export completed');
  };

  return (
    <div className="min-h-screen bg-background">
      <EmergencyStatusBar />
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12 pb-32 lg:pb-12">
        <div className="mb-6 md:mb-8 lg:mb-12">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Emergency History
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Track your safety events and emergency responses
              </p>
            </div>
            <div className="hidden lg:block">
              <LocationPrivacyToggle />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6 space-y-4 md:space-y-6">
            <div>
              <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">
                Filter Events
              </h2>
              <EventTypeFilter
                selectedTypes={selectedTypes}
                onTypeToggle={handleTypeToggle} />

            </div>

            <DateRangeFilter
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onQuickSelect={handleQuickDateSelect} />

          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
                  Event Timeline
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Activity" size={16} />
                  <span>{filteredEvents?.length} events</span>
                </div>
              </div>

              <EventTimeline
                events={filteredEvents}
                onEventClick={setSelectedEvent} />

            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <SafetyStatistics statistics={mockStatistics} />
            <ExportControls onExport={handleExport} />
          </div>
        </div>
      </div>
      
      <TabNavigation />
      <TrustSignalFooter />
      {selectedEvent &&
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)} />

      }
    </div>);

};

export default EmergencyHistory;