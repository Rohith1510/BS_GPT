import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFileUpload, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    if (pdfFiles.length > 0) {
      onFileUpload(pdfFiles);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFileUpload(files);
    }
  }, [onFileUpload]);

  return (
    <div className="mb-8">
      <div
        className={`relative glass-morphic rounded-2xl border-2 border-dashed transition-all duration-300 ${
          isDragOver 
            ? 'border-primary bg-primary/10 scale-[1.02]' 
            : 'border-glass-border hover:border-primary/50'
        } ${isUploading ? 'pointer-events-none opacity-75' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-12 text-center">
          {isUploading ? (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <div className="animate-spin">
                  <Icon name="Loader2" size={32} className="text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Processing Files...</h3>
                <p className="text-muted-foreground">Please wait while we upload and process your documents</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Upload" size={40} className="text-primary" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-foreground">Upload Balance Sheet PDFs</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Drag and drop your financial documents here, or click to browse. 
                  We support PDF files up to 50MB each.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  variant="default"
                  size="lg"
                  iconName="FolderOpen"
                  iconPosition="left"
                  onClick={() => document.getElementById('file-input').click()}
                  className="min-w-[160px]"
                >
                  Browse Files
                </Button>
                
                <div className="text-sm text-muted-foreground">
                  or drag files here
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="FileText" size={14} />
                  <span>PDF Only</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="HardDrive" size={14} />
                  <span>Max 50MB</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Shield" size={14} />
                  <span>Secure Upload</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <input
          id="file-input"
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default UploadZone;