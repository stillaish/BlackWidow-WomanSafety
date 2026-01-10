import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExportControls = ({ onExport }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  const exportFormats = [
    { id: 'pdf', label: 'PDF Report', icon: 'FileText' },
    { id: 'csv', label: 'CSV Data', icon: 'Table' },
    { id: 'json', label: 'JSON Export', icon: 'Code' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    await onExport(exportFormat);
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Download" size={20} className="text-foreground" />
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          Export History
        </h3>
      </div>
      <div className="space-y-3 mb-4">
        {exportFormats?.map((format) => (
          <button
            key={format?.id}
            onClick={() => setExportFormat(format?.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-250 ${
              exportFormat === format?.id
                ? 'bg-primary/10 border-2 border-primary' :'bg-muted border-2 border-transparent hover:bg-muted/80'
            }`}
            type="button"
          >
            <Icon
              name={format?.icon}
              size={20}
              className={exportFormat === format?.id ? 'text-primary' : 'text-muted-foreground'}
            />
            <span className={`text-sm md:text-base font-medium ${
              exportFormat === format?.id ? 'text-primary' : 'text-foreground'
            }`}>
              {format?.label}
            </span>
          </button>
        ))}
      </div>
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-250"
        type="button"
      >
        {isExporting ? (
          <>
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <Icon name="Download" size={20} />
            <span>Export Data</span>
          </>
        )}
      </button>
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-start gap-2">
          <Icon name="Lock" size={14} className="text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Exported data is encrypted and includes privacy controls for sensitive information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExportControls;