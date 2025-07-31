import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Copy, Check } from 'lucide-react';

const AlertBanner = ({ 
  message, 
  type = 'error', 
  onClose, 
  allowCopy = true,
  autoClose = false,
  autoCloseDelay = 5000 
}) => {
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);

  const handleCopy = async () => {
    if (!allowCopy || !message) return;

    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log('Failed to copy error message:', error);
    }
  };

  const getAlertStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'success':
        return 'text-green-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  if (!message) return null;

  return (
    <div className={`border rounded-lg p-4 ${getAlertStyles()} flex items-start gap-3`}>
      <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${getIconColor()}`} />
      
      <div className="flex-1 min-w-0">
        <p className="text-sm break-words">{message}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {allowCopy && (
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-black/5 rounded transition-colors"
            title="Copy error message"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        )}
        
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-black/5 rounded transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertBanner;