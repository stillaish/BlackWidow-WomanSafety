import React from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const QuickActionCard = ({ 
  title, 
  description, 
  icon, 
  color, 
  bgColor, 
  borderColor, 
  action 
}) => {
  return (
    <button
      onClick={action}
      className={cn(
        "p-4 rounded-xl border transition-all hover:scale-105 active:scale-95 text-left",
        bgColor,
        borderColor,
        "hover:opacity-80"
      )}
    >
      <div className="flex flex-col gap-2">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          bgColor,
          "border",
          borderColor
        )}>
          <Icon name={icon} className={color} size={20} />
        </div>
        <div>
          <h3 className="text-sm md:text-base font-semibold mb-0.5">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default QuickActionCard;