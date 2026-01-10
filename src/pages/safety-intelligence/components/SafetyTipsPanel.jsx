import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SafetyTipsPanel = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const aiGeneratedTips = [
    {
      id: 1,
      category: 'Travel Safety',
      icon: 'Navigation',
      title: 'Evening Commute Guidance',
      content: `Based on your location and current time, consider these safety measures:\n\n• Use well-lit main roads instead of shortcuts\n• Share your live location with trusted contacts\n• Keep emergency contacts readily accessible\n• Stay aware of your surroundings and avoid distractions`,
      timestamp: new Date(Date.now() - 300000),
      riskLevel: 'medium'
    },
    {
      id: 2,
      category: 'Cyber Safety',
      icon: 'Shield',
      title: 'Online Harassment Prevention',
      content: `Protect yourself from cyber harassment with these AI-recommended steps:\n\n• Enable two-factor authentication on all accounts\n• Review privacy settings on social media platforms\n• Document any threatening messages with screenshots\n• Block and report suspicious accounts immediately\n• Never share personal location information publicly`,
      timestamp: new Date(Date.now() - 600000),
      riskLevel: 'high'
    },
    {
      id: 3,
      category: 'Area Safety',
      icon: 'MapPin',
      title: 'Current Location Analysis',
      content: `Your current area shows moderate safety levels:\n\n• 3 incidents reported in the past week\n• Peak risk hours: 8 PM - 11 PM\n• Recommended: Travel in groups after dark\n• Nearby safe zones: Police station 0.5 miles north\n• Emergency services response time: 4-6 minutes`,
      timestamp: new Date(Date.now() - 900000),
      riskLevel: 'medium'
    },
    {
      id: 4,
      category: 'Emergency Preparedness',
      icon: 'AlertCircle',
      title: 'Safety Checklist',
      content: `Ensure you're prepared for emergencies:\n\n• Verify trusted contacts are up to date\n• Test SOS button functionality weekly\n• Keep phone charged above 20%\n• Memorize local emergency numbers\n• Practice voice-activated SOS commands\n• Review escape routes in unfamiliar areas`,
      timestamp: new Date(Date.now() - 1200000),
      riskLevel: 'low'
    }
  ];

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % aiGeneratedTips?.length);
  };

  const handlePrevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + aiGeneratedTips?.length) % aiGeneratedTips?.length);
  };

  const handleRefreshTips = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1500);
  };

  const currentTip = aiGeneratedTips?.[currentTipIndex];

  const getRiskColor = (level) => {
    switch (level) {
      case 'high':
        return 'var(--color-primary)';
      case 'medium':
        return 'var(--color-warning)';
      case 'low':
        return 'var(--color-accent)';
      default:
        return 'var(--color-secondary)';
    }
  };

  return (
    <div className="w-full h-full bg-card rounded-xl border border-border p-4 md:p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
            <Icon name="Sparkles" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold">AI Safety Tips</h2>
            <p className="text-xs md:text-sm text-muted-foreground">Powered by Gemini AI</p>
          </div>
        </div>
        <button
          onClick={handleRefreshTips}
          disabled={isGenerating}
          className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-smooth disabled:opacity-50"
          aria-label="Refresh safety tips"
        >
          <Icon 
            name="RefreshCw" 
            size={18} 
            className={isGenerating ? 'animate-spin' : ''}
          />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="bg-muted/50 rounded-lg p-4 md:p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${getRiskColor(currentTip?.riskLevel)}20` }}
            >
              <Icon 
                name={currentTip?.icon} 
                size={18} 
                color={getRiskColor(currentTip?.riskLevel)}
              />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">{currentTip?.category}</p>
              <h3 className="text-base md:text-lg font-semibold">{currentTip?.title}</h3>
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-sm md:text-base text-foreground/90 whitespace-pre-line leading-relaxed">
              {currentTip?.content}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Generated {Math.floor((Date.now() - currentTip?.timestamp) / 60000)} minutes ago
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevTip}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-smooth text-sm font-medium"
            aria-label="Previous tip"
          >
            <Icon name="ChevronLeft" size={16} />
            <span className="hidden md:inline">Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {aiGeneratedTips?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTipIndex(index)}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  index === currentTipIndex ? 'bg-secondary w-6' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Go to tip ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNextTip}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-smooth text-sm font-medium"
            aria-label="Next tip"
          >
            <span className="hidden md:inline">Next</span>
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafetyTipsPanel;