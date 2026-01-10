import React from 'react';
import Icon from '../../../components/AppIcon';
import RatingStars from './RatingStars';

const FeedbackHistory = ({ feedbackList }) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryLabel = (value) => {
    const categoryMap = {
      bug_report: 'Bug Report',
      feature_request: 'Feature Request',
      general_feedback: 'General Feedback',
      emergency_experience: 'Emergency Experience',
      safety_concern: 'Safety Concern',
      usability: 'Usability',
      other: 'Other'
    };
    return categoryMap?.[value] || value;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      submitted: { label: 'Submitted', color: 'text-primary bg-primary/20' },
      under_review: { label: 'Under Review', color: 'text-warning bg-warning/20' },
      resolved: { label: 'Resolved', color: 'text-success bg-success/20' }
    };
    const config = statusConfig?.[status] || statusConfig?.submitted;
    return (
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-secondary/20 rounded-lg">
          <Icon name="History" size={20} className="text-secondary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Feedback History</h2>
          <p className="text-xs text-muted-foreground">Your previous submissions</p>
        </div>
      </div>

      <div className="space-y-4">
        {feedbackList?.map((feedback) => (
          <div
            key={feedback?.id}
            className="p-4 bg-muted/30 border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <RatingStars rating={feedback?.overallRating} readonly size="small" />
                  {getStatusBadge(feedback?.status)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDate(feedback?.timestamp)}
                </p>
              </div>
              <span className="text-xs font-medium text-secondary px-2 py-1 bg-secondary/20 rounded">
                {getCategoryLabel(feedback?.feedbackCategory)}
              </span>
            </div>

            <p className="text-sm text-foreground mb-3">{feedback?.feedbackText}</p>

            {feedback?.categoryRatings && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {Object.entries(feedback?.categoryRatings)
                  ?.filter(([_, rating]) => rating > 0)
                  ?.map(([category, rating]) => (
                    <div key={category} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground capitalize">
                        {category?.replace(/([A-Z])/g, ' $1')?.trim()}:
                      </span>
                      <RatingStars rating={rating} readonly size="small" />
                    </div>
                  ))}
              </div>
            )}

            {feedback?.adminResponse && (
              <div className="mt-3 p-3 bg-background border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="MessageCircle" size={14} className="text-accent" />
                  <span className="text-xs font-medium text-accent">Admin Response</span>
                </div>
                <p className="text-xs text-muted-foreground">{feedback?.adminResponse}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackHistory;