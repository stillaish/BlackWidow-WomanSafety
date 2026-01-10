import React from 'react';


const DurationSelector = ({ selectedDuration, onDurationChange, disabled }) => {
  const durations = [
    { value: 900, label: '15 min', description: 'Quick errand' },
    { value: 1800, label: '30 min', description: 'Short walk' },
    { value: 3600, label: '1 hour', description: 'Meeting' },
    { value: 7200, label: '2 hours', description: 'Date' },
    { value: 14400, label: '4 hours', description: 'Travel' },
    { value: 28800, label: '8 hours', description: 'Full day' }
  ];

  return (
    <div className="w-full bg-card rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-8 shadow-glow-md">
      <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-4 md:mb-6">
        Select Duration
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {durations?.map((duration) => (
          <button
            key={duration?.value}
            onClick={() => onDurationChange(duration?.value)}
            disabled={disabled}
            className={`flex flex-col items-center justify-center p-4 md:p-5 lg:p-6 rounded-lg lg:rounded-xl transition-all duration-250 ease-out ${
              selectedDuration === duration?.value
                ? 'bg-secondary text-secondary-foreground shadow-glow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-96'}`}
            type="button"
          >
            <span className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">
              {duration?.label}
            </span>
            <span className="text-xs md:text-sm opacity-80">
              {duration?.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DurationSelector;