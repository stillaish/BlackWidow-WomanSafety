import React from 'react';
import Icon from '../../../components/AppIcon';

const SafetyScoreCard = ({ areaData }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--color-accent)';
    if (score >= 60) return 'var(--color-warning)';
    return 'var(--color-primary)';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Safe';
    if (score >= 60) return 'Moderate';
    return 'High Risk';
  };

  const safetyMetrics = [
    {
      id: 'incidents',
      label: 'Recent Incidents',
      value: areaData?.incidentCount,
      icon: 'AlertTriangle',
      trend: areaData?.incidentTrend,
      color: 'var(--color-primary)'
    },
    {
      id: 'response',
      label: 'Response Time',
      value: `${areaData?.responseTime} min`,
      icon: 'Clock',
      trend: 'stable',
      color: 'var(--color-secondary)'
    },
    {
      id: 'lighting',
      label: 'Street Lighting',
      value: `${areaData?.lightingScore}%`,
      icon: 'Lightbulb',
      trend: 'up',
      color: 'var(--color-accent)'
    },
    {
      id: 'patrol',
      label: 'Police Patrol',
      value: areaData?.patrolFrequency,
      icon: 'Shield',
      trend: 'stable',
      color: 'var(--color-secondary)'
    }
  ];

  return (
    <div className="w-full bg-card rounded-xl border border-border p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-semibold">Area Safety Score</h2>
          <p className="text-xs md:text-sm text-muted-foreground">{areaData?.areaName}</p>
        </div>
        <div className="text-right">
          <div 
            className="text-3xl md:text-4xl font-bold"
            style={{ color: getScoreColor(areaData?.safetyScore) }}
          >
            {areaData?.safetyScore}
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">{getScoreLabel(areaData?.safetyScore)}</p>
        </div>
      </div>
      <div className="mb-4 md:mb-6">
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500 ease-out rounded-full"
            style={{
              width: `${areaData?.safetyScore}%`,
              backgroundColor: getScoreColor(areaData?.safetyScore)
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {safetyMetrics?.map((metric) => (
          <div
            key={metric?.id}
            className="p-3 md:p-4 bg-muted/50 rounded-lg border border-border"
          >
            <div className="flex items-center justify-between mb-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${metric?.color}20` }}
              >
                <Icon name={metric?.icon} size={16} color={metric?.color} />
              </div>
              {metric?.trend === 'up' && (
                <Icon name="TrendingUp" size={14} color="var(--color-accent)" />
              )}
              {metric?.trend === 'down' && (
                <Icon name="TrendingDown" size={14} color="var(--color-primary)" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-1">{metric?.label}</p>
            <p className="text-base md:text-lg font-semibold">{metric?.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={16} color="var(--color-secondary)" className="mt-0.5" />
          <div>
            <p className="text-xs md:text-sm font-medium text-secondary mb-1">Safety Recommendation</p>
            <p className="text-xs text-muted-foreground">
              {areaData?.recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyScoreCard;