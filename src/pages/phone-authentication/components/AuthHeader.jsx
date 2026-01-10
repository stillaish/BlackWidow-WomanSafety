import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ step }) => {
  return (
    <div className="text-center space-y-4 mb-6 md:mb-8">
      <div className="flex justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon
            name={step === 'phone' ? 'Smartphone' : 'ShieldCheck'}
            size={40}
            color="var(--color-primary)"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
          {step === 'phone' ? 'Welcome to Black Widow' : 'Verify Your Number'}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
          {step === 'phone' ?'Your personal safety companion. Enter your phone number to get started with secure emergency services.' :'We\'ve sent a 6-digit verification code to your phone. Please enter it below to continue.'}
        </p>
      </div>

      {step === 'phone' && (
        <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/30 max-w-md mx-auto">
          <Icon name="Users" size={20} color="var(--color-accent)" />
          <p className="text-xs md:text-sm text-accent font-medium">
            Join 50,000+ women staying safe with Black Widow
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthHeader;