import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const helplines = [
  { id: 'national', label: 'National Emergency', phone: '112', desc: 'Immediate police, ambulance, and fire' },
  { id: 'women', label: "Women\'s Helpline", phone: '1091', desc: 'Women helpline for safety and counseling' },
  { id: 'poison', label: 'Poison Control', phone: '1066', desc: 'Toxic exposure assistance' },
  { id: 'medical', label: 'Medical Emergency', phone: '102', desc: 'Ambulance services' },
];

const HelplineList = () => {
  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleCopy = async (phone) => {
    try {
      await navigator.clipboard.writeText(phone);
      alert(`Copied ${phone} to clipboard`);
    } catch (e) {
      console.warn('Clipboard write failed', e);
    }
  };

  return (
    <div className="w-full bg-card rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-glow-md">
      <div className="flex items-center gap-2 md:gap-3 mb-4">
        <Icon name="Phone" size={20} className="text-accent w-5 h-5 md:w-6 md:h-6" />
        <h3 className="text-lg md:text-xl font-semibold">Emergency Helplines</h3>
      </div>

      <div className="space-y-3">
        {helplines.map((h) => (
          <div key={h.id} className="flex items-start justify-between gap-3 bg-muted/50 rounded-xl p-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm md:text-base font-semibold">{h.label}</h4>
                <span className="text-xs text-muted-foreground">{h.phone}</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{h.desc}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" iconName="Phone" onClick={() => handleCall(h.phone)}>Call</Button>
              <Button size="sm" variant="ghost" onClick={() => handleCopy(h.phone)}>Copy</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelplineList;
