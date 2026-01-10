import React from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const ProgressTracker = ({ completed, total }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon name="Target" className="text-violet-400" size={20} />
          <h3 className="text-sm md:text-base font-semibold">
            Your Progress
          </h3>
        </div>
        <span className="text-sm md:text-base font-semibold text-violet-400">
          {completed}/{total}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={cn(
            "absolute top-0 left-0 h-full transition-all duration-500 rounded-full",
            percentage === 100 ? "bg-emerald-500" : "bg-violet-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <p className="text-xs md:text-sm text-muted-foreground mt-2">
        {percentage === 100 
          ? "All actions completed! You're well-prepared." 
          : `${percentage}% complete - Keep going to ensure your safety`
        }
      </p>
    </div>
  );
};

export default ProgressTracker;