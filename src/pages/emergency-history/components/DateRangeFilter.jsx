import React from 'react';
import Icon from '../../../components/AppIcon';

const DateRangeFilter = ({ startDate, endDate, onStartDateChange, onEndDateChange, onQuickSelect }) => {
  const quickRanges = [
    { id: 'today', label: 'Today', days: 0 },
    { id: 'week', label: 'Last 7 Days', days: 7 },
    { id: 'month', label: 'Last 30 Days', days: 30 },
    { id: 'all', label: 'All Time', days: null }
  ];

  const handleQuickSelect = (days) => {
    const end = new Date();
    const start = days !== null ? new Date(Date.now() - days * 24 * 60 * 60 * 1000) : null;
    onQuickSelect(start, end);
  };

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex flex-wrap gap-2">
        {quickRanges?.map((range) => (
          <button
            key={range?.id}
            onClick={() => handleQuickSelect(range?.days)}
            className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-all duration-250"
            type="button"
          >
            {range?.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground">
            <Icon name="Calendar" size={16} />
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e?.target?.value)}
            className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-muted border border-border rounded-lg text-sm md:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs md:text-sm font-medium text-foreground">
            <Icon name="Calendar" size={16} />
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e?.target?.value)}
            className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-muted border border-border rounded-lg text-sm md:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;