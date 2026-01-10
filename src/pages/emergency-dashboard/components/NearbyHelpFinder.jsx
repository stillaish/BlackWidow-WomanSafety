import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NearbyHelpFinder = () => {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('police');

  const mockNearbyPlaces = {
    police: [
      {
        id: 1,
        name: "Central Police Station",
        address: "Koharapeer (Bareilly)",
        distance: "0.8 km",
        phone: "+91 9454403099",
        isOpen: true,
        latitude: 28.6139,
        longitude: 77.2090
      },
      {
        id: 2,
        name: "Prem nagar Police Station",
        address: "Premnagar (Bareilly)",
        distance: "1.2 km",
        phone: "+91 9454403099",
        isOpen: true,
        latitude: 28.6239,
        longitude: 77.2190
      },
      {
        id: 3,
        name: "Women\'s Safety Cell",
        address: "123 Woman safety Center",
        distance: "1.5 km",
        phone: "+1-555-0103",
        isOpen: true,
        latitude: 28.6339,
        longitude: 77.2290
      }
    ],
    hospital: [
      {
        id: 4,
        name: "Gangasheel Hospital",
        address: "C 17, Deen Dayal Puram, Bareilly",
        distance: "0.5 km",
        phone: "+91 99275 44444",
        isOpen: true,
        hasEmergency: true,
        latitude: 28.6149,
        longitude: 77.2100
      },
      {
        id: 5,
        name: "Vinayak Hospital",
        address: "opp, City Station Rd, City Railway Colony",
        distance: "1.0 km",
        phone: "+91 73516 63333",
        isOpen: true,
        hasEmergency: true,
        latitude: 28.6249,
        longitude: 77.2200
      },
      {
        id: 6,
        name: "Radhika hospital",
        address: "Mini Byp, Karamchari Nagar",
        distance: "1.8 km",
        phone: "+91 63957 45113",
        isOpen: true,
        hasEmergency: false,
        latitude: 28.6349,
        longitude: 77.2300
      }
    ]
  };

  useEffect(() => {
    loadNearbyPlaces();
  }, [selectedType]);

  const loadNearbyPlaces = () => {
    setIsLoading(true);
    setTimeout(() => {
      setNearbyPlaces(mockNearbyPlaces?.[selectedType]);
      setIsLoading(false);
    }, 500);
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleDirections = (place) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place?.latitude},${place?.longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  // Rating / feedback state + persistence
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [ratingPlace, setRatingPlace] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingComment, setRatingComment] = useState('');

  const openRating = (place) => {
    const stored = JSON.parse(localStorage.getItem('locationRatings') || '{}');
    const existing = stored?.[place.id];
    setRatingPlace(place);
    setRatingValue(existing?.value || 0);
    setRatingComment(existing?.comment || '');
    setRatingModalOpen(true);
  };

  const saveRating = () => {
    if (!ratingPlace) return;
    const stored = JSON.parse(localStorage.getItem('locationRatings') || '{}');
    stored[ratingPlace.id] = {
      placeId: ratingPlace.id,
      value: ratingValue,
      comment: ratingComment,
      timestamp: new Date().toISOString(),
      placeName: ratingPlace.name
    };
    localStorage.setItem('locationRatings', JSON.stringify(stored));
    setRatingModalOpen(false);
    alert('Thanks for your feedback');
  };

  return (
    <div className="w-full bg-card rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-glow-md">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <Icon name="MapPin" size={24} className="text-accent w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">Nearby Help</h3>
      </div>
      <div className="flex gap-2 md:gap-3 mb-4 md:mb-6">
        <button
          onClick={() => setSelectedType('police')}
          className={`flex-1 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all duration-300 ${
            selectedType === 'police' ?'bg-primary text-primary-foreground shadow-glow-md' :'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
          type="button"
        >
          <Icon name="Shield" size={16} className="inline-block mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
          Police Stations
        </button>
        <button
          onClick={() => setSelectedType('hospital')}
          className={`flex-1 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all duration-300 ${
            selectedType === 'hospital' ?'bg-primary text-primary-foreground shadow-glow-md' :'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
          type="button"
        >
          <Icon name="Heart" size={16} className="inline-block mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
          Hospitals
        </button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-8 md:py-12">
          <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3 md:space-y-4">
          {nearbyPlaces?.map((place) => (
            <div
              key={place?.id}
              className="bg-muted/50 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 hover:bg-muted/70 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 md:gap-4 mb-2 md:mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm md:text-base lg:text-lg font-semibold mb-1 line-clamp-1">
                    {place?.name}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                    {place?.address}
                  </p>
                </div>
                <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-accent/20 text-accent rounded-lg md:rounded-xl whitespace-nowrap">
                  <Icon name="Navigation" size={14} className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-medium">{place?.distance}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                {place?.isOpen && (
                  <div className="flex items-center gap-1 md:gap-1.5 text-xs md:text-sm text-success">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span>Open Now</span>
                  </div>
                )}
                {place?.hasEmergency && (
                  <div className="flex items-center gap-1 md:gap-1.5 text-xs md:text-sm text-primary">
                    <Icon name="AlertCircle" size={14} className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>24/7 Emergency</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 md:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Phone"
                  iconPosition="left"
                  onClick={() => handleCall(place?.phone)}
                  className="flex-1"
                >
                  Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Navigation"
                  iconPosition="left"
                  onClick={() => handleDirections(place)}
                  className="flex-1"
                >
                  Directions
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openRating(place)}
                  className="flex-1"
                >
                  Rate
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Button
        variant="ghost"
        fullWidth
        iconName="RefreshCw"
        iconPosition="left"
        onClick={loadNearbyPlaces}
        className="mt-4 md:mt-6"
      >
        Refresh Nearby Places
      </Button>

      {ratingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setRatingModalOpen(false)} />
          <div className="relative w-full max-w-md bg-card rounded-2xl p-6 z-10">
            <h4 className="text-lg font-semibold mb-2">Rate {ratingPlace?.name}</h4>
            <div className="flex items-center gap-2 mb-4">
              {[1,2,3,4,5].map((s) => (
                <button
                  key={s}
                  onClick={() => setRatingValue(s)}
                  className={`px-2 py-1 rounded ${ratingValue>=s ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                  type="button"
                >{s}★</button>
              ))}
            </div>
            <textarea
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              placeholder="Optional comment"
              className="w-full p-3 rounded mb-4 bg-muted/50"
              rows={4}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setRatingModalOpen(false)}>Cancel</Button>
              <Button onClick={saveRating}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyHelpFinder;