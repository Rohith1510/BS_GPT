import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentPreview = ({ selectedDocument, onClose }) => {
  const [activeTab, setActiveTab] = useState('preview');

  if (!selectedDocument) {
    return (
      <div className="glass-morphic rounded-lg p-8 text-center">
        <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Document Selected</h3>
        <p className="text-muted-foreground">Select a document from the table to view its details</p>
      </div>
    );
  }

  const tabs = [
    { id: 'preview', label: 'Preview', icon: 'Eye' },
    { id: 'metrics', label: 'Extracted Data', icon: 'BarChart3' },
    { id: 'details', label: 'Details', icon: 'Info' }
  ];

  const mockExtractedData = {
    totalAssets: "₹2,45,67,890",
    totalLiabilities: "₹1,23,45,678",
    revenue: "₹5,67,89,012",
    netProfit: "₹45,67,890",
    cashFlow: "₹23,45,678",
    equity: "₹1,22,22,212"
  };

  return (
    <div className="glass-morphic rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-glass-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-error/20 flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-error" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{selectedDocument.fileName}</h3>
            <p className="text-sm text-muted-foreground">{selectedDocument.companyName}</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          iconName="X"
          onClick={onClose}
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-glass-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-glass-hover'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'preview' && (
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Icon name="FileText" size={64} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">PDF Preview</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {selectedDocument.fileName}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" iconName="Download" fullWidth>
                Download PDF
              </Button>
              <Button variant="outline" size="sm" iconName="ExternalLink" fullWidth>
                Open in New Tab
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-6">
            {selectedDocument.status === 'processed' ? (
              <>
                <div>
                  <h4 className="font-medium text-foreground mb-4">Key Financial Metrics</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(mockExtractedData).map(([key, value]) => (
                      <div key={key} className="glass-morphic rounded-lg p-4">
                        <div className="text-sm text-muted-foreground capitalize mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-lg font-semibold text-foreground">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-4">Extraction Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Metrics Extracted</span>
                      <span className="font-medium text-foreground">{selectedDocument.extractedMetrics}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Confidence Score</span>
                      <span className="font-medium text-success">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Processing Time</span>
                      <span className="font-medium text-foreground">2.3 seconds</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h4 className="font-medium text-foreground mb-2">Processing in Progress</h4>
                <p className="text-muted-foreground">
                  Data extraction is currently in progress. Please check back in a few moments.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'details' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-foreground mb-4">Document Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">File Name</span>
                  <span className="font-medium text-foreground">{selectedDocument.fileName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Company</span>
                  <span className="font-medium text-foreground">{selectedDocument.companyName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Financial Year</span>
                  <span className="font-medium text-foreground">{selectedDocument.financialYear}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">File Size</span>
                  <span className="font-medium text-foreground">
                    {(selectedDocument.fileSize / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Upload Date</span>
                  <span className="font-medium text-foreground">
                    {new Date(selectedDocument.uploadDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    selectedDocument.status === 'processed' ? 'bg-success/20 text-success' :
                    selectedDocument.status === 'processing' ? 'bg-warning/20 text-warning' :
                    selectedDocument.status === 'failed'? 'bg-error/20 text-error' : 'bg-muted/20 text-muted-foreground'
                  }`}>
                    <span className="capitalize">{selectedDocument.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-4">Processing History</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">Document Uploaded</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(selectedDocument.uploadDate).toLocaleString('en-GB')}
                    </div>
                  </div>
                </div>
                
                {selectedDocument.status !== 'pending' && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-warning mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Processing Started</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(Date.now() - 300000).toLocaleString('en-GB')}
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedDocument.status === 'processed' && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Processing Completed</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(Date.now() - 120000).toLocaleString('en-GB')}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentPreview;