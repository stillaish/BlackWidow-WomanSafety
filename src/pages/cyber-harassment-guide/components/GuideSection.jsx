import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import { cn } from '../../../utils/cn';

const GuideSection = ({ 
  section, 
  isExpanded, 
  onToggle, 
  completedActions, 
  onChecklistToggle 
}) => {
  const { id, title, icon, color, bgColor, borderColor, content } = section;

  return (
    <div className={cn(
      "bg-card border rounded-xl overflow-hidden transition-all",
      borderColor
    )}>
      {/* Section Header */}
      <button
        onClick={onToggle}
        className={cn(
          "w-full px-4 py-4 md:px-5 md:py-5 flex items-center justify-between gap-3 transition-colors",
          bgColor,
          "hover:opacity-80"
        )}
      >
        <div className="flex items-center gap-3 flex-1">
          <div className={cn(
            "w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0",
            bgColor,
            "border",
            borderColor
          )}>
            <Icon name={icon} className={color} size={20} />
          </div>
          <div className="text-left">
            <h2 className="text-base md:text-lg lg:text-xl font-semibold">
              {title}
            </h2>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          className="text-muted-foreground flex-shrink-0" 
          size={20} 
        />
      </button>

      {/* Section Content */}
      {isExpanded && (
        <div className="px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 border-t border-border space-y-4 md:space-y-5">
          {/* Description */}
          {content?.description && (
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {content?.description}
            </p>
          )}

          {/* Checklist */}
          {content?.checklist && (
            <div className="space-y-3">
              <h3 className="text-sm md:text-base font-semibold flex items-center gap-2">
                <Icon name="CheckSquare" className={color} size={18} />
                Action Checklist
              </h3>
              <div className="space-y-2">
                {content?.checklist?.map((item) => (
                  <Checkbox
                    key={item?.id}
                    id={`${id}-${item?.id}`}
                    checked={completedActions?.[`${id}-${item?.id}`] || false}
                    onChange={() => onChecklistToggle(id, item?.id)}
                    label={item?.text}
                    className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Subsections */}
          {content?.subsections && (
            <div className="space-y-4 md:space-y-5">
              {content?.subsections?.map((subsection, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-sm md:text-base font-semibold flex items-center gap-2">
                    <Icon name="ChevronRight" className={color} size={18} />
                    {subsection?.title}
                  </h3>
                  <ul className="space-y-2 ml-6">
                    {subsection?.items?.map((item, itemIndex) => (
                      <li 
                        key={itemIndex}
                        className="text-sm md:text-base text-muted-foreground leading-relaxed flex items-start gap-2"
                      >
                        <span className={cn("mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0", bgColor)} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GuideSection;