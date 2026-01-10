import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const FilterControls = ({ onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    incidentTypes: [],
    riskLevels: [],
    timeRange: '7days'
  });

  const incidentTypes = [
    { value: 'harassment', label: 'Harassment', icon: 'UserX' },
    { value: 'stalking', label: 'Stalking', icon: 'Eye' },
    { value: 'assault', label: 'Assault', icon: 'AlertTriangle' },
    { value: 'theft', label: 'Theft', icon: 'ShoppingBag' },
    { value: 'suspicious', label: 'Suspicious Activity', icon: 'Search' },
    { value: 'unsafe_area', label: 'Unsafe Area', icon: 'MapPin' }
  ];

  const riskLevels = [
    { value: 'high', label: 'High Risk', color: 'var(--color-primary)' },
    { value: 'medium', label: 'Medium Risk', color: 'var(--color-warning)' },
    { value: 'low', label: 'Low Risk', color: 'var(--color-accent)' }
  ];

  const timeRanges = [
    { value: '24hours', label: 'Last 24 Hours' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: 'all', label: 'All Time' }
  ];

  const handleIncidentTypeToggle = (type) => {
    setFilters(prev => {
      const newTypes = prev?.incidentTypes?.includes(type)
        ? prev?.incidentTypes?.filter(t => t !== type)
        : [...prev?.incidentTypes, type];
      
      const newFilters = { ...prev, incidentTypes: newTypes };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleRiskLevelToggle = (level) => {
    setFilters(prev => {
      const newLevels = prev?.riskLevels?.includes(level)
        ? prev?.riskLevels?.filter(l => l !== level)
        : [...prev?.riskLevels, level];
      
      const newFilters = { ...prev, riskLevels: newLevels };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleTimeRangeChange = (range) => {
    setFilters(prev => {
      const newFilters = { ...prev, timeRange: range };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      incidentTypes: [],
      riskLevels: [],
      timeRange: '7days'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const activeFilterCount = filters?.incidentTypes?.length + filters?.riskLevels?.length;

  return (
    <div className="w-full bg-card rounded-xl border border-border">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 md:px-6 md:py-4 flex items-center justify-between hover:bg-muted/50 transition-smooth"
      >
        <div className="flex items-center gap-3">
          <Icon name="Filter" size={20} />
          <span className="text-sm md:text-base font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <Icon 
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
          size={20} 
        />
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 md:px-6 md:pb-6 space-y-4 md:space-y-6 border-t border-border">
          <div className="pt-4 md:pt-6">
            <h3 className="text-sm font-medium mb-3 md:mb-4">Incident Types</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
              {incidentTypes?.map((type) => (
                <button
                  key={type?.value}
                  onClick={() => handleIncidentTypeToggle(type?.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-smooth text-left ${
                    filters?.incidentTypes?.includes(type?.value)
                      ? 'bg-primary/20 border-primary/30 text-primary' :'bg-muted/50 border-border hover:bg-muted'
                  }`}
                >
                  <Icon name={type?.icon} size={16} />
                  <span className="text-xs md:text-sm">{type?.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 md:mb-4">Risk Levels</h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {riskLevels?.map((level) => (
                <button
                  key={level?.value}
                  onClick={() => handleRiskLevelToggle(level?.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-smooth ${
                    filters?.riskLevels?.includes(level?.value)
                      ? 'border-current' :'bg-muted/50 border-border hover:bg-muted'
                  }`}
                  style={{
                    backgroundColor: filters?.riskLevels?.includes(level?.value) 
                      ? `${level?.color}20` 
                      : undefined,
                    color: filters?.riskLevels?.includes(level?.value) 
                      ? level?.color 
                      : undefined
                  }}
                >
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: level?.color }}
                  />
                  <span className="text-xs md:text-sm">{level?.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 md:mb-4">Time Range</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
              {timeRanges?.map((range) => (
                <button
                  key={range?.value}
                  onClick={() => handleTimeRangeChange(range?.value)}
                  className={`px-4 py-2 rounded-lg border transition-smooth text-xs md:text-sm ${
                    filters?.timeRange === range?.value
                      ? 'bg-secondary/20 border-secondary/30 text-secondary' :'bg-muted/50 border-border hover:bg-muted'
                  }`}
                >
                  {range?.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              iconName="X"
              iconPosition="left"
              fullWidth
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;