import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const RatingStars = ({ rating = 0, onChange, size = 'default', readonly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeMap = {
    small: 20,
    default: 28,
    large: 36
  };

  const iconSize = sizeMap?.[size] || sizeMap?.default;

  const handleClick = (value) => {
    if (!readonly && onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5]?.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleClick(value)}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
            className={cn(
              "transition-all duration-200",
              !readonly && "cursor-pointer hover:scale-110 active:scale-95",
              readonly && "cursor-default"
            )}
            aria-label={`Rate ${value} out of 5 stars`}
          >
            <Icon
              name={value <= displayRating ? "Star" : "Star"}
              size={iconSize}
              className={cn(
                "transition-colors duration-200",
                value <= displayRating ? "text-warning fill-warning" : "text-muted-foreground"
              )}
              fill={value <= displayRating ? "currentColor" : "none"}
            />
          </button>
        ))}
      </div>
      {rating > 0 && (
        <span className="text-sm font-medium text-foreground ml-1">
          {rating?.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;