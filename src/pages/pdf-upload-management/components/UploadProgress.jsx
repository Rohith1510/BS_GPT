import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadProgress = ({ uploads, onCancel, onRetry }) => {
  if (uploads.length === 0) return null;

  return (
    <div className="mb-8 space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Icon name="Upload" size={20} />
        Upload Progress ({uploads.length})
      </h3>
      
      <div className="space-y-3">
        {uploads.map((upload) => (
          <div key={upload.id} className="glass-morphic rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  upload.status === 'completed' ? 'bg-success/20' :
                  upload.status === 'error' ? 'bg-error/20' :
                  upload.status === 'processing'? 'bg-warning/20' : 'bg-primary/20'
                }`}>
                  {upload.status === 'completed' && <Icon name="CheckCircle" size={16} className="text-success" />}
                  {upload.status === 'error' && <Icon name="XCircle" size={16} className="text-error" />}
                  {upload.status === 'processing' && <Icon name="Loader2" size={16} className="text-warning animate-spin" />}
                  {upload.status === 'uploading' && <Icon name="Upload" size={16} className="text-primary" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground truncate">{upload.fileName}</span>
                    <span className="text-xs text-muted-foreground">
                      {(upload.fileSize / 1024 / 1024).toFixed(1)}MB
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {upload.status === 'completed' && 'Upload completed successfully'}
                    {upload.status === 'error' && upload.error}
                    {upload.status === 'processing' && 'Extracting financial data...'}
                    {upload.status === 'uploading' && `Uploading... ${upload.progress}%`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {upload.status === 'error' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="RotateCcw"
                    onClick={() => onRetry(upload.id)}
                  >
                    Retry
                  </Button>
                )}
                
                {(upload.status === 'uploading' || upload.status === 'processing') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => onCancel(upload.id)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>

            {(upload.status === 'uploading' || upload.status === 'processing') && (
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    upload.status === 'processing' ? 'bg-warning' : 'bg-primary'
                  }`}
                  style={{ width: `${upload.progress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadProgress;