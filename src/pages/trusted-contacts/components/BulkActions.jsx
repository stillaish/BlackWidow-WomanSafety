import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ selectedCount, onTestNotify, onDelete, onClearSelection }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 lg:bottom-4 lg:left-auto lg:right-4 lg:max-w-md z-40">
      <div className="bg-card border border-border rounded-xl p-4 shadow-glow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Icon name="CheckSquare" size={20} className="text-primary" />
            </div>
            <span className="text-sm md:text-base font-medium text-foreground">
              {selectedCount} contact{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          <button
            onClick={onClearSelection}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
            aria-label="Clear selection"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Send"
            iconPosition="left"
            onClick={onTestNotify}
            fullWidth
            className="md:flex-1"
          >
            Test Notify
          </Button>

          <Button
            variant="destructive"
            size="sm"
            iconName="Trash2"
            iconPosition="left"
            onClick={onDelete}
            fullWidth
            className="md:flex-1"
          >
            Delete Selected
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;