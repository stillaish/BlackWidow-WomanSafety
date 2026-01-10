import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BASE_URL = "https://black-widow-woman-safety.onrender.com";

const IncidentReportForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    incidentType: '',
    location: '',
    description: '',
    timeOfIncident: '',
    anonymous: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const incidentTypeOptions = [
    { value: 'harassment', label: 'Harassment' },
    { value: 'stalking', label: 'Stalking' },
    { value: 'assault', label: 'Assault' },
    { value: 'theft', label: 'Theft' },
    { value: 'suspicious', label: 'Suspicious Activity' },
    { value: 'unsafe_area', label: 'Unsafe Area' },
    { value: 'poor_lighting', label: 'Poor Lighting' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ===============================
  // GET REAL LOCATION
  // ===============================
  const getLocation = () =>
    new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({ latitude: 28.6139, longitude: 77.2090 });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        () => resolve({ latitude: 28.6139, longitude: 77.2090 }),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    });

  // ===============================
  // SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      const location = await getLocation();

      const payload = {
        incident_type: formData.incidentType,
        description: formData.description,
        address_text: formData.location,
        time_of_incident: formData.timeOfIncident || null,
        is_anonymous: formData.anonymous,
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const res = await fetch(`${BASE_URL}/incidents/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit incident");
      }

      const saved = await res.json();

      if (onSubmit) {
        onSubmit(saved);
      }

      setShowSuccess(true);

      setFormData({
        incidentType: '',
        location: '',
        description: '',
        timeOfIncident: '',
        anonymous: true
      });

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

    } catch (err) {
      alert("Failed to submit incident. Check backend.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData?.incidentType && formData?.location && formData?.description;

  return (
    <div className="w-full bg-card rounded-xl border border-border p-4 md:p-6">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/20 flex items-center justify-center">
          <Icon name="FileText" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-semibold">Report Incident</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Help keep the community safe</p>
        </div>
      </div>

      {showSuccess && (
        <div className="mb-4 md:mb-6 p-4 bg-success/20 border border-success/30 rounded-lg flex items-center gap-3">
          <Icon name="CheckCircle" size={20} color="var(--color-success)" />
          <div>
            <p className="text-sm font-medium text-success">Report Submitted Successfully</p>
            <p className="text-xs text-success/80">Thank you for contributing to community safety</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <Select
          label="Incident Type"
          required
          options={incidentTypeOptions}
          value={formData?.incidentType}
          onChange={(value) => handleInputChange('incidentType', value)}
          placeholder="Select incident type"
        />

        <Input
          label="Location"
          type="text"
          required
          placeholder="Enter location or address"
          value={formData?.location}
          onChange={(e) => handleInputChange('location', e?.target?.value)}
          description="Be as specific as possible"
        />

        <Input
          label="Time of Incident"
          type="datetime-local"
          required
          value={formData?.timeOfIncident}
          onChange={(e) => handleInputChange('timeOfIncident', e?.target?.value)}
        />

        <div>
          <label className="block text-sm font-medium mb-2">
            Description <span className="text-primary">*</span>
          </label>
          <textarea
            required
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            placeholder="Describe what happened in detail..."
            rows={4}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Provide as much detail as possible to help others stay safe
          </p>
        </div>

        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
          <input
            type="checkbox"
            id="anonymous"
            checked={formData?.anonymous}
            onChange={(e) => handleInputChange('anonymous', e?.target?.checked)}
            className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
          />
          <label htmlFor="anonymous" className="flex-1">
            <p className="text-sm font-medium">Submit Anonymously</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your identity will be protected. Only location and incident details will be shared.
            </p>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            variant="default"
            loading={isSubmitting}
            disabled={!isFormValid || isSubmitting}
            iconName="Send"
            iconPosition="right"
            fullWidth
          >
            {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setFormData({
              incidentType: '',
              location: '',
              description: '',
              timeOfIncident: '',
              anonymous: true
            })}
            disabled={isSubmitting}
            fullWidth
          >
            Clear Form
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IncidentReportForm;
