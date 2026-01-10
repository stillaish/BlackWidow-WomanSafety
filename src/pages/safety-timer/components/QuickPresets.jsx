import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickPresets = ({ onPresetSelect, disabled }) => {
  const presets = [
    {
      id: 'walking',
      icon: 'Footprints',
      label: 'Walking Alone',
      duration: 1800,
      description: '30 min timer for walking'
    },
    {
      id: 'date',
      icon: 'Coffee',
      label: 'Date Check-In',
      duration: 7200,
      description: '2 hour timer for dates'
    },
    {
      id: 'travel',
      icon: 'Car',
      label: 'Travel Safety',
      duration: 14400,
      description: '4 hour timer for travel'
    },
    {
      id: 'night',
      icon: 'Moon',
      label: 'Night Out',
      duration: 10800,
      description: '3 hour timer for night activities'
    }
  ];

  return (
    <div className="w-full bg-card rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-8 shadow-glow-md">
      <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-4 md:mb-6">
        Quick Presets
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {presets?.map((preset) => (
          <button
            key={preset?.id}
            onClick={() => onPresetSelect(preset?.duration)}
            disabled={disabled}
            className={`flex items-center gap-3 md:gap-4 p-4 md:p-5 lg:p-6 rounded-lg lg:rounded-xl bg-muted text-foreground transition-all duration-250 ease-out ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted/80 active:scale-96 cursor-pointer'
            }`}
            type="button"
          >
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Icon 
                name={preset?.icon}
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-secondary"
                size={28}
              />
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm md:text-base lg:text-lg font-semibold mb-1">
                {preset?.label}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                {preset?.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickPresets;