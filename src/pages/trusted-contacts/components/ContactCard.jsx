import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ContactCard = ({ 
  contact, 
  onEdit, 
  onDelete, 
  onToggleNotification, 
  onToggleLocation, 
  onTogglePriority,
  onSelect,
  isSelected 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    contact?.name || "User"
  )}&background=111827&color=ffffff&bold=true&size=128`;

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return 'Not Set';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 transition-smooth hover:shadow-glow-md">
      <div className="flex items-start gap-3 md:gap-4">
        <Checkbox
          checked={isSelected}
          onChange={(e) => onSelect(contact?.id, e?.target?.checked)}
          className="mt-1"
        />

        <div className="relative flex-shrink-0">
          <Image
            src={avatarUrl}
            alt={contact?.name}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
          />
          {contact?.verified && (
            <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-1">
              <Icon name="Check" size={12} color="white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-semibold text-foreground truncate">
                {contact?.name}
              </h3>
              <p className="text-sm text-muted-foreground">{contact?.relationship}</p>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-muted rounded-lg transition-smooth"
            >
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={20}
                className="text-muted-foreground"
              />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Icon name="Phone" size={16} className="text-muted-foreground" />
            <span className="text-sm md:text-base text-foreground">{contact?.phone}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium bg-muted text-muted-foreground">
              <Icon name="Bell" size={14} />
              SOS
            </span>

            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium bg-muted text-muted-foreground">
              <Icon name="MapPin" size={14} />
              Location
            </span>

            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium bg-muted text-muted-foreground">
              <Icon name="Flag" size={14} />
              {getPriorityLabel(contact?.priority)}
            </span>
          </div>

          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-border space-y-3">
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  iconPosition="left"
                  onClick={() => onEdit(contact)}
                  className="flex-1 md:flex-initial"
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={() => onDelete(contact?.id)}
                  className="flex-1 md:flex-initial"
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
