import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PhoneInput from './components/PhoneInput';
import WomenOnlyCheckbox from './components/WomenOnlyCheckbox';
import OTPInput from './components/OTPInput';
import ResendTimer from './components/ResendTimer';
import TrustBadges from './components/TrustBadges';
import AuthHeader from './components/AuthHeader';

const PhoneAuthentication = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState('phone');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [womenOnlyChecked, setWomenOnlyChecked] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const mockCredentials = {
    phone: '999 999 9999',
    otp: '123456'
  };

  const validatePhoneNumber = () => {
    const newErrors = {};
    
    if (!phoneNumber) {
      newErrors.phone = 'Phone number is required';
    } else if (countryCode === '+91') {
      const cleaned = phoneNumber?.replace(/\D/g, '');
      if (cleaned?.length !== 10) {
        newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
      }
    }
    
    if (!womenOnlyChecked) {
      newErrors.womenOnly = 'You must confirm eligibility to continue';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSendOTP = () => {
    if (!validatePhoneNumber()) return;
    
    setLoading(true);
    
    setTimeout(() => {
      if (phoneNumber === mockCredentials?.phone) {
        setStep('otp');
        setErrors({});
      } else {
        setErrors({ 
          phone: `Invalid phone number. Use ${mockCredentials?.phone} for demo` 
        });
      }
      setLoading(false);
    }, 1500);
  };

  const handleVerifyOTP = () => {
    if (otp?.length !== 6) {
      setErrors({ otp: 'Please enter complete 6-digit OTP' });
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      if (otp === mockCredentials?.otp) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userPhone', `${countryCode}${phoneNumber}`);
        localStorage.setItem('authTimestamp', new Date()?.toISOString());
        
        navigate('/emergency-dashboard');
      } else {
        setErrors({ 
          otp: `Invalid OTP. Use ${mockCredentials?.otp} for demo` 
        });
      }
      setLoading(false);
    }, 1500);
  };

  const handleResendOTP = () => {
    setOtp('');
    setErrors({});
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp('');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-md lg:max-w-lg space-y-6 md:space-y-8">
          <AuthHeader step={step} />

          <div className="bg-card rounded-xl md:rounded-2xl border border-border p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8 shadow-glow-lg">
            {step === 'phone' ? (
              <>
                <PhoneInput
                  countryCode={countryCode}
                  phoneNumber={phoneNumber}
                  onCountryCodeChange={setCountryCode}
                  onPhoneNumberChange={setPhoneNumber}
                  error={errors?.phone}
                  disabled={loading}
                />

                <WomenOnlyCheckbox
                  checked={womenOnlyChecked}
                  onChange={(e) => setWomenOnlyChecked(e?.target?.checked)}
                  error={errors?.womenOnly}
                  disabled={loading}
                />

                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  onClick={handleSendOTP}
                  loading={loading}
                  iconName="Send"
                  iconPosition="right"
                >
                  Send OTP
                </Button>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-center text-muted-foreground mb-4">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </>
            ) : (
              <>
                <OTPInput
                  otp={otp}
                  onChange={setOtp}
                  error={errors?.otp}
                  disabled={loading}
                />

                <div className="space-y-3">
                  <Button
                    variant="default"
                    size="lg"
                    fullWidth
                    onClick={handleVerifyOTP}
                    loading={loading}
                    disabled={otp?.length !== 6}
                    iconName="CheckCircle"
                    iconPosition="right"
                  >
                    Verify OTP
                  </Button>

                  <Button
                    variant="ghost"
                    size="default"
                    fullWidth
                    onClick={handleBackToPhone}
                    disabled={loading}
                    iconName="ArrowLeft"
                    iconPosition="left"
                  >
                    Change Phone Number
                  </Button>
                </div>

                <ResendTimer
                  onResend={handleResendOTP}
                  disabled={loading}
                />

                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        Demo Credentials
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Phone: {mockCredentials?.phone}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        OTP: {mockCredentials?.otp}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {step === 'phone' && <TrustBadges />}

          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Need help? Contact our 24/7 support team
            </p>
            <button
              type="button"
              className="text-xs text-primary hover:text-primary/80 underline transition-colors"
            >
              support@blackwidow.com
            </button>
          </div>
        </div>
      </div>
      <footer className="bg-card border-t border-border py-4 px-4 md:px-6">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={20} color="var(--color-primary)" />
            <span className="text-sm font-semibold text-foreground">Black Widow</span>
          </div>
          <p className="text-xs text-muted-foreground text-center md:text-right">
            © {new Date()?.getFullYear()} Black Widow | This Web Is A Prototype Only And Developed By Aish Maheshwari
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PhoneAuthentication;