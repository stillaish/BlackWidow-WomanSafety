import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import TabNavigation from '../../components/navigation/TabNavigation';
import EmergencyStatusBar from '../../components/navigation/EmergencyStatusBar';

import TrustSignalFooter from '../../components/navigation/TrustSignalFooter';
import GuideSection from './components/GuideSection';
import QuickActionCard from './components/QuickActionCard';
import ProgressTracker from './components/ProgressTracker';


const CyberHarassmentGuide = () => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);
  const [completedActions, setCompletedActions] = useState({});

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('cyberHarassmentProgress');
    if (savedProgress) {
      try {
        setCompletedActions(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Failed to load progress:', e);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('cyberHarassmentProgress', JSON.stringify(completedActions));
  }, [completedActions]);

  const handleToggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleChecklistToggle = (sectionId, itemId) => {
    setCompletedActions(prev => ({
      ...prev,
      [`${sectionId}-${itemId}`]: !prev?.[`${sectionId}-${itemId}`]
    }));
  };

  const handleSOSTrigger = () => {
    navigate('/emergency-dashboard');
    // Trigger SOS event
    window.dispatchEvent(new CustomEvent('triggerSOS', { detail: { source: 'cyber-harassment-guide' } }));
  };

  const handleContactTrusted = () => {
    navigate('/trusted-contacts');
  };

  const sections = [
    {
      id: 'understanding',
      title: 'Understanding Cyber Harassment',
      icon: 'Info',
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-500/30',
      content: {
        description: 'Cyber harassment includes any form of online behavior intended to threaten, intimidate, or harm someone. Recognizing these patterns is the first step to protecting yourself.',
        subsections: [
          {
            title: 'Common Forms',
            items: [
              'Cyberbullying: Repeated hostile messages, threats, or intimidation',
              'Cyberstalking: Persistent unwanted contact and monitoring',
              'Doxxing: Publishing private information without consent',
              'Impersonation: Creating fake profiles to damage reputation',
              'Sexual harassment: Unwanted sexual messages, images, or advances',
              'Trolling: Deliberate provocation to cause distress'
            ]
          },
          {
            title: 'Warning Signs',
            items: [
              'Receiving threatening or abusive messages repeatedly',
              'Noticing unauthorized access to your accounts',
              'Finding personal information shared without permission',
              'Being tagged in inappropriate or harmful content',
              'Experiencing coordinated attacks from multiple accounts',
              'Feeling monitored or tracked online'
            ]
          }
        ]
      }
    },
    {
      id: 'immediate-response',
      title: 'Immediate Response Steps',
      icon: 'Zap',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      content: {
        description: 'Take these actions immediately when experiencing cyber harassment. Your safety and well-being are the top priority.',
        checklist: [
          { id: 'stop-engaging', text: 'Stop engaging with the harasser - do not respond to messages' },
          { id: 'document-everything', text: 'Take screenshots of all harassing messages and content' },
          { id: 'block-harasser', text: 'Block the harasser on all platforms' },
          { id: 'secure-accounts', text: 'Change passwords and enable two-factor authentication' },
          { id: 'privacy-settings', text: 'Review and tighten privacy settings on all social media' },
          { id: 'inform-trusted', text: 'Inform trusted contacts about the situation' },
          { id: 'report-platform', text: 'Report the harassment to the platform immediately' },
          { id: 'assess-threat', text: 'Assess if there is immediate physical danger (if yes, call 112)' }
        ]
      }
    },
    {
      id: 'evidence-collection',
      title: 'Evidence Collection',
      icon: 'Camera',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      content: {
        description: 'Proper documentation is crucial for reporting and legal action. Follow these guidelines to collect evidence effectively.',
        subsections: [
          {
            title: 'What to Document',
            items: [
              'Screenshots of all harassing messages, posts, and comments',
              'URLs of harassing content and profiles',
              'Dates and times of each incident',
              'Names/usernames of harassers',
              'Any threats or explicit content',
              'Evidence of impersonation or fake accounts'
            ]
          },
          {
            title: 'How to Take Screenshots',
            items: [
              'Capture full conversation threads with timestamps visible',
              'Include profile information and usernames in screenshots',
              'Save original quality images (do not crop or edit)',
              'Take multiple screenshots if content spans multiple screens',
              'Screenshot URL bars to show web addresses',
              'Document any witnesses or others who saw the harassment'
            ]
          },
          {
            title: 'Storage & Organization',
            items: [
              'Store all evidence in a secure folder with date labels',
              'Back up evidence to cloud storage and external drive',
              'Create a timeline document listing all incidents',
              'Keep original files - never delete evidence',
              'Organize by date and platform for easy reference',
              'Share copies (not originals) when reporting'
            ]
          }
        ]
      }
    },
    {
      id: 'india-reporting',
      title: 'India-Specific Reporting',
      icon: 'Flag',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      content: {
        description: 'India has specific laws and reporting mechanisms for cyber harassment. Use these official channels to report incidents.',
        subsections: [
          {
            title: 'National Cybercrime Reporting Portal',
            items: [
              'Website: cybercrime.gov.in',
              'Report online harassment, cyberbullying, and threats',
              'Anonymous reporting available',
              'Track complaint status online',
              'Available 24/7 in multiple languages'
            ]
          },
          {
            title: 'Emergency Helplines',
            items: [
              '1930: National Cybercrime Helpline',
              '181: Women Helpline (24/7)',
              '112: Emergency Services',
              '1091: Women in Distress',
              '7827-170-170: NCW Helpline (National Commission for Women)'
            ]
          },
          {
            title: 'Local Reporting',
            items: [
              'Visit nearest police station to file FIR',
              'Contact local Cyber Crime Cell',
              'Approach Women\'s Commission in your state',
              'File complaint with platform (Facebook, Instagram, Twitter)',
              'Contact your Internet Service Provider for serious threats'
            ]
          },
          {
            title: 'What Information to Provide',
            items: [
              'Your contact details and identification',
              'Detailed description of harassment incidents',
              'All collected evidence (screenshots, URLs)',
              'Harasser\'s profile information if known',
              'Timeline of events',
              'Any previous complaints or reports filed'
            ]
          }
        ]
      }
    },
    {
      id: 'legal-rights',
      title: 'Legal Rights & Resources',
      icon: 'Scale',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      content: {
        description: 'Know your legal rights under Indian law. Cyber harassment is a punishable offense with serious consequences for perpetrators.',
        subsections: [
          {
            title: 'Applicable Laws',
            items: [
              'IT Act Section 66A: Offensive messages (punishment up to 3 years)',
              'IT Act Section 66E: Privacy violation (punishment up to 3 years)',
              'IT Act Section 67: Publishing obscene content (punishment up to 5 years)',
              'IPC Section 354A: Sexual harassment',
              'IPC Section 354D: Stalking',
              'IPC Section 509: Insulting modesty of women'
            ]
          },
          {
            title: 'Your Rights',
            items: [
              'Right to file FIR at any police station',
              'Right to privacy and protection of personal data',
              'Right to legal representation',
              'Right to protection from further harassment',
              'Right to compensation for damages',
              'Right to remain anonymous during investigation (in some cases)'
            ]
          },
          {
            title: 'Support Organizations',
            items: [
              'National Commission for Women (NCW)',
              'State Women\'s Commissions',
              'Cyber Peace Foundation',
              'Internet Freedom Foundation',
              'Point of View (digital rights organization)',
              'Local women\'s rights NGOs and legal aid centers'
            ]
          },
          {
            title: 'Legal Process',
            items: [
              'File FIR at police station or online portal',
              'Police investigation begins within 24-48 hours',
              'Provide all evidence and statements',
              'Case registered under relevant sections',
              'Court proceedings if charges filed',
              'Seek legal counsel for guidance throughout process'
            ]
          }
        ]
      }
    }
  ];

  const quickActions = [
    {
      id: 'sos',
      title: 'Trigger SOS',
      description: 'Immediate emergency alert',
      icon: 'AlertCircle',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      action: handleSOSTrigger
    },
    {
      id: 'contacts',
      title: 'Contact Trusted',
      description: 'Reach your safety network',
      icon: 'Users',
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-500/30',
      action: handleContactTrusted
    },
    {
      id: 'cybercrime',
      title: 'Report Online',
      description: 'cybercrime.gov.in',
      icon: 'ExternalLink',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      action: () => window.open('https://cybercrime.gov.in', '_blank')
    },
    {
      id: 'helpline',
      title: 'Call 1930',
      description: 'Cybercrime helpline',
      icon: 'Phone',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      action: () => window.location.href = 'tel:1930'
    }
  ];

  const totalActions = sections?.reduce((acc, section) => {
    return acc + (section?.content?.checklist?.length || 0);
  }, 0);

  const completedCount = Object.values(completedActions)?.filter(Boolean)?.length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <EmergencyStatusBar />

      <main className="flex-1 pt-16 pb-32 lg:pb-24">
        <div className="w-full px-4 py-6 md:px-6 md:py-8 space-y-6 md:space-y-8">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                Cyber Harassment Guide
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Comprehensive resources and actionable guidance for online safety
              </p>
            </div>

            {/* Progress Tracker */}
            <ProgressTracker 
              completed={completedCount} 
              total={totalActions}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {quickActions?.map((action) => (
              <QuickActionCard
                key={action?.id}
                {...action}
              />
            ))}
          </div>

          {/* Emergency Notice */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-3">
              <Icon name="AlertTriangle" className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <h3 className="text-sm md:text-base font-semibold text-red-400 mb-1">
                  Immediate Danger?
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3">
                  If you are in immediate physical danger or experiencing threats of violence, call emergency services immediately.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    iconName="Phone"
                    onClick={() => window.location.href = 'tel:112'}
                  >
                    Call 112
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Phone"
                    onClick={() => window.location.href = 'tel:181'}
                  >
                    Women Helpline 181
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Guide Sections */}
          <div className="space-y-4">
            {sections?.map((section) => (
              <GuideSection
                key={section?.id}
                section={section}
                isExpanded={expandedSection === section?.id}
                onToggle={() => handleToggleSection(section?.id)}
                completedActions={completedActions}
                onChecklistToggle={handleChecklistToggle}
              />
            ))}
          </div>

          {/* Additional Resources */}
          <div className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6">
            <div className="flex items-start gap-3 mb-4">
              <Icon name="BookOpen" className="text-violet-400 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-1">
                  Additional Resources
                </h3>
                <p className="text-sm text-muted-foreground">
                  External links and support organizations
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="justify-start"
                iconName="ExternalLink"
                onClick={() => window.open('https://cybercrime.gov.in', '_blank')}
              >
                National Cybercrime Portal
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                iconName="ExternalLink"
                onClick={() => window.open('http://ncw.nic.in', '_blank')}
              >
                National Commission for Women
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                iconName="ExternalLink"
                onClick={() => window.open('https://www.cyberpeace.org', '_blank')}
              >
                Cyber Peace Foundation
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                iconName="ExternalLink"
                onClick={() => window.open('https://internetfreedom.in', '_blank')}
              >
                Internet Freedom Foundation
              </Button>
            </div>
          </div>
        </div>
      </main>

      
      <TabNavigation />
      <TrustSignalFooter />
    </div>
  );
};

export default CyberHarassmentGuide;