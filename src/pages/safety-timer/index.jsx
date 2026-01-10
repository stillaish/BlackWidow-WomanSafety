import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import TabNavigation from '../../components/navigation/TabNavigation';
import EmergencyStatusBar from '../../components/navigation/EmergencyStatusBar';



import TrustSignalFooter from '../../components/navigation/TrustSignalFooter';
import TimerDisplay from './components/TimerDisplay';
import DurationSelector from './components/DurationSelector';
import QuickPresets from './components/QuickPresets';
import EmergencyContactPreview from './components/EmergencyContactPreview';
import TimerControls from './components/TimerControls';

const SafetyTimer = () => {
  const navigate = useNavigate();
  const [selectedDuration, setSelectedDuration] = useState(1800);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timerStatus, setTimerStatus] = useState('active');
  const [locationSharing, setLocationSharing] = useState(true);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  const mockContacts = [
  {
    id: 1,
    name: "khanak",
    relationship: "Sister",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_159d2c8f8-1763294679735.png",
    avatarAlt: "Professional headshot of young woman with long brown hair wearing blue blouse smiling warmly"
  },
  {
    id: 2,
    name: "Aman",
    relationship: "Best Friend",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b96df5c7-1763298849215.png",
    avatarAlt: "Professional headshot of Asian man with short black hair in navy suit with confident smile"
  },
  {
    id: 3,
    name: "Vanshika Chitransh ",
    relationship: "Roommate",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14cdb05db-1763296723992.png",
    avatarAlt: "Professional headshot of Hispanic woman with curly dark hair wearing green top with friendly expression"
  }];


  useEffect(() => {
    const storedTimer = localStorage.getItem('safetyTimer');
    if (storedTimer) {
      const timerData = JSON.parse(storedTimer);
      if (timerData?.isActive) {
        const checkInTime = new Date(timerData.checkInTime);
        const now = new Date();
        const remaining = Math.max(0, Math.floor((checkInTime - now) / 1000));

        if (remaining > 0) {
          setRemainingTime(remaining);
          setIsActive(true);
          setSelectedDuration(timerData?.duration || 1800);
        } else {
          localStorage.removeItem('safetyTimer');
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isActive && remainingTime > 0) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          const newTime = prev - 1;

          if (newTime <= 300 && newTime > 60) {
            setTimerStatus('warning');
          } else if (newTime <= 60) {
            setTimerStatus('critical');
            if (newTime === 60 || newTime === 30 || newTime === 10) {
              playAlert();
            }
          }

          if (newTime <= 0) {
            handleTimerExpired();
            return 0;
          }

          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timerRef?.current) {
        clearInterval(timerRef?.current);
      }
    };
  }, [isActive, remainingTime]);

  const playAlert = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const handleTimerExpired = () => {
    setIsActive(false);
    setTimerStatus('active');

    const emergencyStatus = {
      isActive: true,
      type: 'auto-sos',
      message: 'Safety Timer Expired - Auto SOS Activated',
      timestamp: new Date()?.toISOString()
    };

    localStorage.setItem('emergencyStatus', JSON.stringify(emergencyStatus));
    localStorage.removeItem('safetyTimer');

    window.dispatchEvent(new Event('emergencyStatusChanged'));

    setTimeout(() => {
      navigate('/emergency-dashboard');
    }, 2000);
  };

  const handleStartTimer = () => {
    setRemainingTime(selectedDuration);
    setIsActive(true);
    setTimerStatus('active');

    const checkInTime = new Date(Date.now() + selectedDuration * 1000);
    const timerData = {
      isActive: true,
      remainingTime: selectedDuration,
      checkInTime: checkInTime?.toISOString(),
      duration: selectedDuration
    };

    localStorage.setItem('safetyTimer', JSON.stringify(timerData));
    window.dispatchEvent(new Event('emergencyStatusChanged'));
  };

  const handleCheckIn = () => {
    setIsActive(false);
    setRemainingTime(0);
    setTimerStatus('active');

    const safeStatus = {
      isActive: false,
      type: 'safe',
      message: 'Safe Check-In Confirmed',
      timestamp: new Date()?.toISOString()
    };

    localStorage.setItem('emergencyStatus', JSON.stringify(safeStatus));
    localStorage.removeItem('safetyTimer');

    window.dispatchEvent(new Event('emergencyStatusChanged'));
  };

  const handleCancelTimer = () => {
    setIsActive(false);
    setRemainingTime(0);
    setTimerStatus('active');

    localStorage.removeItem('safetyTimer');
    window.dispatchEvent(new Event('emergencyStatusChanged'));
  };

  const handleEmergencyOverride = () => {
    setIsActive(false);
    setRemainingTime(0);
    setTimerStatus('active');

    const emergencyStatus = {
      isActive: true,
      type: 'manual-sos',
      message: 'Manual SOS Override Activated',
      timestamp: new Date()?.toISOString()
    };

    localStorage.setItem('emergencyStatus', JSON.stringify(emergencyStatus));
    localStorage.removeItem('safetyTimer');

    window.dispatchEvent(new Event('emergencyStatusChanged'));

    navigate('/emergency-dashboard');
  };

  const handleDurationChange = (duration) => {
    if (!isActive) {
      setSelectedDuration(duration);
    }
  };

  const handlePresetSelect = (duration) => {
    if (!isActive) {
      setSelectedDuration(duration);
      setTimeout(() => {
        handleStartTimer();
      }, 100);
    }
  };

  const handleLocationToggle = () => {
    setLocationSharing(!locationSharing);
  };

  return (
    <>
      <Helmet>
        <title>Safety Timer - Black Widow</title>
        <meta name="description" content="Set up proactive safety monitoring with automatic SOS triggering if you fail to check in during potentially unsafe situations" />
      </Helmet>

      <div className="min-h-screen bg-background pb-20 lg:pb-0">
        <EmergencyStatusBar />
        
        <div className="pt-16 lg:pt-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
            <div className="mb-6 md:mb-8 lg:mb-10">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">
                Safety Timer
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
                Set up automatic safety check-ins for peace of mind during potentially risky situations
              </p>
            </div>

            <div className="space-y-6 md:space-y-8 lg:space-y-10">
              <TimerDisplay
                remainingTime={remainingTime}
                status={timerStatus}
                isActive={isActive} />


              {!isActive &&
              <>
                  <DurationSelector
                  selectedDuration={selectedDuration}
                  onDurationChange={handleDurationChange}
                  disabled={isActive} />


                  <QuickPresets
                  onPresetSelect={handlePresetSelect}
                  disabled={isActive} />

                </>
              }

              <EmergencyContactPreview contacts={mockContacts} />

              <TimerControls
                isActive={isActive}
                onStart={handleStartTimer}
                onCheckIn={handleCheckIn}
                onCancel={handleCancelTimer}
                onEmergencyOverride={handleEmergencyOverride}
                locationSharing={locationSharing}
                onLocationToggle={handleLocationToggle} />

            </div>
          </div>
        </div>

        
        <TabNavigation />
        <TrustSignalFooter />
      </div>
    </>);

};

export default SafetyTimer;