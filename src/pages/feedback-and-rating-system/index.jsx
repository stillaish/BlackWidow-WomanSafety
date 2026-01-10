import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import { submitFeedback, fetchFeedback } from "../../utils/feedbackApi";
import TabNavigation from '../../components/navigation/TabNavigation';
import EmergencyStatusBar from '../../components/navigation/EmergencyStatusBar';


import TrustSignalFooter from '../../components/navigation/TrustSignalFooter';
import LocationPrivacyToggle from '../../components/navigation/LocationPrivacyToggle';
import RatingStars from './components/RatingStars';
import CategoryRating from './components/CategoryRating';
import FeedbackHistory from './components/FeedbackHistory';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';

const FeedbackAndRatingSystem = () => {
  const [formData, setFormData] = useState({
    overallRating: 0,
    categoryRatings: {
      appPerformance: 0,
      emergencyResponse: 0,
      safetyFeatures: 0,
      userInterface: 0
    },
    feedbackText: '',
    feedbackCategory: '',
    usageContext: '',
    anonymous: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [feedbackHistory, setFeedbackHistory] = useState([]);

  useEffect(() => {
    fetchFeedback()
      .then(setFeedbackHistory)
      .catch((err) => {
        console.error("Failed to load feedback:", err);
      });
  }, []);

  const feedbackCategoryOptions = [
    { value: 'bug_report', label: 'Bug Report' },
    { value: 'feature_request', label: 'Feature Request' },
    { value: 'general_feedback', label: 'General Feedback' },
    { value: 'emergency_experience', label: 'Emergency Experience' },
    { value: 'safety_concern', label: 'Safety Concern' },
    { value: 'usability', label: 'Usability' },
    { value: 'other', label: 'Other' }
  ];

  const usageContextOptions = [
    { value: 'emergency_situation', label: 'During Emergency Situation' },
    { value: 'daily_use', label: 'Daily Use' },
    { value: 'testing_features', label: 'Testing Features' },
    { value: 'first_time_use', label: 'First Time Use' },
    { value: 'other', label: 'Other' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (formData?.overallRating === 0) {
      newErrors.overallRating = 'Overall rating is required';
    }

    if (!formData?.feedbackText?.trim()) {
      newErrors.feedbackText = 'Feedback text is required';
    } else if (formData?.feedbackText?.trim()?.length < 10) {
      newErrors.feedbackText = 'Feedback must be at least 10 characters';
    } else if (formData?.feedbackText?.trim()?.length > 1000) {
      newErrors.feedbackText = 'Feedback must not exceed 1000 characters';
    }

    if (!formData?.feedbackCategory) {
      newErrors.feedbackCategory = 'Feedback category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const saved = await submitFeedback(formData);

      setFeedbackHistory((prev) => [saved, ...prev]);

      setShowSuccess(true);
      handleClearForm();

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback. Is backend running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCategoryRatingChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      categoryRatings: {
        ...prev?.categoryRatings,
        [category]: value
      }
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleClearForm = () => {
    setFormData({
      overallRating: 0,
      categoryRatings: {
        appPerformance: 0,
        emergencyResponse: 0,
        safetyFeatures: 0,
        userInterface: 0
      },
      feedbackText: '',
      feedbackCategory: '',
      usageContext: '',
      anonymous: true
    });
    setErrors({});
  };

  const characterCount = formData?.feedbackText?.length || 0;
  const maxCharacters = 1000;
  const characterPercentage = (characterCount / maxCharacters) * 100;

  return (
    <div className="min-h-screen bg-background">
      <EmergencyStatusBar />
      

      <main className="pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Icon name="MessageSquare" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Feedback & Rating</h1>
                <p className="text-sm text-muted-foreground">Help us improve Black Widow</p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-success/20 border border-success/30 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <div>
                <p className="text-sm font-medium text-success">Feedback Submitted Successfully</p>
                <p className="text-xs text-success/80">Thank you for helping us improve the app</p>
              </div>
            </div>
          )}

          {/* Feedback Form */}
          <div className="bg-card border border-border rounded-xl p-4 md:p-6 mb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Overall Rating */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Overall Rating <span className="text-primary">*</span>
                </label>
                <RatingStars
                  rating={formData?.overallRating}
                  onChange={(value) => handleRatingChange('overallRating', value)}
                  size="large"
                />
                {errors?.overallRating && (
                  <p className="text-sm text-destructive mt-2">{errors?.overallRating}</p>
                )}
              </div>

              {/* Category Ratings */}
              <div>
                <h3 className="text-sm font-medium mb-4">Rate Specific Aspects</h3>
                <div className="space-y-4">
                  <CategoryRating
                    label="App Performance"
                    description="Speed, reliability, and stability"
                    rating={formData?.categoryRatings?.appPerformance}
                    onChange={(value) => handleCategoryRatingChange('appPerformance', value)}
                  />
                  <CategoryRating
                    label="Emergency Response"
                    description="SOS features and emergency handling"
                    rating={formData?.categoryRatings?.emergencyResponse}
                    onChange={(value) => handleCategoryRatingChange('emergencyResponse', value)}
                  />
                  <CategoryRating
                    label="Safety Features"
                    description="Safety timer, trusted contacts, location sharing"
                    rating={formData?.categoryRatings?.safetyFeatures}
                    onChange={(value) => handleCategoryRatingChange('safetyFeatures', value)}
                  />
                  <CategoryRating
                    label="User Interface"
                    description="Design, ease of use, and navigation"
                    rating={formData?.categoryRatings?.userInterface}
                    onChange={(value) => handleCategoryRatingChange('userInterface', value)}
                  />
                </div>
              </div>

              {/* Feedback Category */}
              <Select
                label="Feedback Category"
                required
                options={feedbackCategoryOptions}
                value={formData?.feedbackCategory}
                onChange={(value) => handleInputChange('feedbackCategory', value)}
                placeholder="Select feedback category"
                error={errors?.feedbackCategory}
              />

              {/* Usage Context */}
              <Select
                label="Usage Context"
                options={usageContextOptions}
                value={formData?.usageContext}
                onChange={(value) => handleInputChange('usageContext', value)}
                placeholder="When did you use the app?"
                description="Optional: Helps us understand your experience better"
              />

              {/* Feedback Text */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Feedback <span className="text-primary">*</span>
                </label>
                <textarea
                  required
                  value={formData?.feedbackText}
                  onChange={(e) => handleInputChange('feedbackText', e?.target?.value)}
                  placeholder="Share your thoughts, suggestions, or report issues..."
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">
                    Minimum 10 characters, maximum 1000 characters
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${
                      characterPercentage > 100 ? 'text-destructive' :
                      characterPercentage > 80 ? 'text-warning': 'text-muted-foreground'
                    }`}>
                      {characterCount}/{maxCharacters}
                    </span>
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          characterPercentage > 100 ? 'bg-destructive' :
                          characterPercentage > 80 ? 'bg-warning': 'bg-primary'
                        }`}
                        style={{ width: `${Math.min(characterPercentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
                {errors?.feedbackText && (
                  <p className="text-sm text-destructive mt-2">{errors?.feedbackText}</p>
                )}
              </div>

              {/* Anonymous Submission */}
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
                    Your identity will be protected. Only your feedback and ratings will be shared with the development team.
                  </p>
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  variant="default"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  iconName="Send"
                  iconPosition="right"
                  fullWidth
                >
                  {isSubmitting ? 'Submitting Feedback...' : 'Submit Feedback'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearForm}
                  disabled={isSubmitting}
                  fullWidth
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </div>

          {/* Feedback History */}
          {feedbackHistory?.length > 0 && (
            <FeedbackHistory feedbackList={feedbackHistory} />
          )}
        </div>
      </main>

      <LocationPrivacyToggle />
      <TrustSignalFooter />
      <TabNavigation />
    </div>
  );
};

export default FeedbackAndRatingSystem;
