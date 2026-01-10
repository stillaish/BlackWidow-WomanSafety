import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';



const AddContactForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: '',
    sosNotifications: true,
    locationSharing: true,
    priority: 'medium'
  });

  const [errors, setErrors] = useState({});

  const relationshipOptions = [
    { value: 'family', label: 'Family Member' },
    { value: 'friend', label: 'Friend' },
    { value: 'partner', label: 'Partner/Spouse' },
    { value: 'colleague', label: 'Colleague' },
    { value: 'neighbor', label: 'Neighbor' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'High Priority', description: 'Notified first in emergencies' },
    { value: 'medium', label: 'Medium Priority', description: 'Notified after high priority contacts' },
    { value: 'low', label: 'Low Priority', description: 'Notified last' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/?.test(formData?.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (!formData?.relationship) {
      newErrors.relationship = 'Relationship is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      onAdd({
        ...formData,
        id: Date.now()?.toString(),
        verified: false,
        addedDate: new Date()?.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        lastNotified: null,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData?.name}`,
        avatarAlt: `Profile avatar for ${formData?.name}, ${formData?.relationship}`
      });

      setFormData({
        name: '',
        phone: '',
        relationship: '',
        sosNotifications: true,
        locationSharing: true,
        priority: 'medium'
      });
      setErrors({});
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Icon name="UserPlus" size={20} className="text-primary" />
          </div>
          <h2 className="text-lg md:text-xl font-semibold text-foreground">Add Trusted Contact</h2>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
            aria-label="Close form"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter contact name"
            value={formData?.name}
            onChange={(e) => handleChange('name', e?.target?.value)}
            error={errors?.name}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 1234567890"
            value={formData?.phone}
            onChange={(e) => handleChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Relationship"
            placeholder="Select relationship"
            options={relationshipOptions}
            value={formData?.relationship}
            onChange={(value) => handleChange('relationship', value)}
            error={errors?.relationship}
            required
          />

          <Select
            label="Priority Level"
            placeholder="Select priority"
            options={priorityOptions}
            value={formData?.priority}
            onChange={(value) => handleChange('priority', value)}
            required
          />
        </div>

        <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm font-medium text-foreground mb-3">Notification Permissions</p>
          
          <Checkbox
            label="Enable SOS Notifications"
            description="Contact will receive emergency alerts"
            checked={formData?.sosNotifications}
            onChange={(e) => handleChange('sosNotifications', e?.target?.checked)}
          />

          <Checkbox
            label="Enable Location Sharing"
            description="Contact can view your real-time location during emergencies"
            checked={formData?.locationSharing}
            onChange={(e) => handleChange('locationSharing', e?.target?.checked)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3 pt-2">
          <Button
            type="submit"
            variant="default"
            iconName="UserPlus"
            iconPosition="left"
            fullWidth
            className="md:flex-1"
          >
            Add Contact
          </Button>

          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              fullWidth
              className="md:flex-1"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddContactForm;