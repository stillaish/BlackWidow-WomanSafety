import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ResendTimer = ({ onResend, disabled }) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    if (canResend && !disabled) {
      setCountdown(60);
      setCanResend(false);
      onResend();
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 text-sm">
      {canResend ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResend}
          disabled={disabled}
          iconName="RefreshCw"
          iconPosition="left"
          iconSize={16}
        >
          Resend OTP
        </Button>
      ) : (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Resend available in {countdown}s</span>
        </div>
      )}
    </div>
  );
};

export default ResendTimer;