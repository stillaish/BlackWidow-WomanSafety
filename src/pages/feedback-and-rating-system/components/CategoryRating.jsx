import React from 'react';
import RatingStars from './RatingStars';

const CategoryRating = ({ label, description, rating, onChange }) => {
  return (
    <div className="flex items-start justify-between gap-4 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-foreground">{label}</h4>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="flex-shrink-0">
        <RatingStars
          rating={rating}
          onChange={onChange}
          size="small"
        />
      </div>
    </div>
  );
};

export default CategoryRating;