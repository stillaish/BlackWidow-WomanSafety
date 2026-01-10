import React, { useRef, useEffect } from 'react';


const OTPInput = ({ otp, onChange, error, disabled }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs?.current?.[0]) {
      inputRefs?.current?.[0]?.focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/?.test(value)) return;

    const newOtp = otp?.split('');
    newOtp[index] = value?.slice(-1);
    onChange(newOtp?.join(''));

    if (value && index < 5) {
      inputRefs?.current?.[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !otp?.[index] && index > 0) {
      inputRefs?.current?.[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e?.preventDefault();
    const pastedData = e?.clipboardData?.getData('text')?.replace(/\D/g, '')?.slice(0, 6);
    onChange(pastedData?.padEnd(6, ''));
    
    const nextEmptyIndex = pastedData?.length < 6 ? pastedData?.length : 5;
    inputRefs?.current?.[nextEmptyIndex]?.focus();
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">
        Enter OTP Code
      </label>
      <div className="flex gap-2 md:gap-3 justify-center">
        {[0, 1, 2, 3, 4, 5]?.map((index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp?.[index] || ''}
            onChange={(e) => handleChange(index, e?.target?.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-center text-lg md:text-xl lg:text-2xl font-semibold rounded-lg border-2 transition-all duration-250 ${
              error
                ? 'border-error bg-error/10 text-error' :'border-input bg-card text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>
      {error && (
        <p className="text-sm text-error text-center">{error}</p>
      )}
      <p className="text-xs text-muted-foreground text-center">
        Enter the 6-digit code sent to your phone
      </p>
    </div>
  );
};

export default OTPInput;