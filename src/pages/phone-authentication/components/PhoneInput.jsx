import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PhoneInput = ({ 
  countryCode, 
  phoneNumber, 
  onCountryCodeChange, 
  onPhoneNumberChange,
  error,
  disabled 
}) => {
  const countryCodes = [
    { value: '+1', label: '🇺🇸 +1 (United States)' },
    { value: '+44', label: '🇬🇧 +44 (United Kingdom)' },
    { value: '+91', label: '🇮🇳 +91 (India)' },
    { value: '+61', label: '🇦🇺 +61 (Australia)' },
    { value: '+81', label: '🇯🇵 +81 (Japan)' },
    { value: '+86', label: '🇨🇳 +86 (China)' },
    { value: '+49', label: '🇩🇪 +49 (Germany)' },
    { value: '+33', label: '🇫🇷 +33 (France)' }
  ];

  const formatPhoneNumber = (value) => {
    const cleaned = value?.replace(/\D/g, '');
    
    if (countryCode === '+91') {
      if (cleaned?.length <= 3) return cleaned;
      if (cleaned?.length <= 6) return `${cleaned?.slice(0, 3)} ${cleaned?.slice(3)}`;
      return `${cleaned?.slice(0, 3)} ${cleaned?.slice(3, 6)} ${cleaned?.slice(6, 10)}`;
    }
    
    return cleaned;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e?.target?.value);
    onPhoneNumberChange(formatted);
  };

  return (
    <div className="space-y-4">
      <Select
        label="Country Code"
        options={countryCodes}
        value={countryCode}
        onChange={onCountryCodeChange}
        disabled={disabled}
        searchable
        className="mb-4"
      />
      
      <Input
        label="Phone Number"
        type="tel"
        placeholder={countryCode === '+91' ? '999 999 9999' : 'Enter phone number'}
        value={phoneNumber}
        onChange={handlePhoneChange}
        error={error}
        disabled={disabled}
        required
        description="Enter your mobile number for OTP verification"
      />
    </div>
  );
};

export default PhoneInput;