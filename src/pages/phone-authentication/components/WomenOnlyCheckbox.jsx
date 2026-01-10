import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const WomenOnlyCheckbox = ({ checked, onChange, error, disabled }) => {
  return (
    <div className="space-y-3">
      <Checkbox
        label="I confirm that I am a woman and understand this platform is designed exclusively for women's safety"
        checked={checked}
        onChange={onChange}
        error={error}
        disabled={disabled}
        required
        description="This self-declaration helps maintain a safe community for all users"
      />
      
      <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/10 border border-warning/30">
        <Icon 
          name="AlertTriangle" 
          size={20} 
          color="var(--color-warning)"
          className="flex-shrink-0 mt-0.5"
        />
        <div className="space-y-1">
          <p className="text-sm font-medium text-warning">
            Women-Only Platform
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This platform is exclusively designed for women's safety. False declarations may result in account suspension and legal action. By checking this box, you acknowledge that you meet the eligibility criteria.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WomenOnlyCheckbox;