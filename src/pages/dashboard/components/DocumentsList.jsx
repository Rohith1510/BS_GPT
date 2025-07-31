import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentsList = () => {
  const documents = [
    {
      id: 1,
      name: "Balance Sheet Q3 2024.pdf",
      uploadDate: "2024-07-28",
      size: "2.4 MB",
      status: "processed",
      company: "TechCorp Ltd"
    },
    {
      id: 2,
      name: "Annual Report 2023.pdf",
      uploadDate: "2024-07-25",
      size: "5.1 MB",
      status: "processing",
      company: "TechCorp Ltd"
    },
    {
      id: 3,
      name: "Q2 Financial Statement.pdf",
      uploadDate: "2024-07-20",
      size: "1.8 MB",
      status: "processed",
      company: "TechCorp Ltd"
    },
    {
      id: 4,
      name: "Cash Flow Analysis.pdf",
      uploadDate: "2024-07-15",
      size: "3.2 MB",
      status: "processed",
      company: "TechCorp Ltd"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed': return 'text-accent';
      case 'processing': return 'text-warning';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processed': return 'CheckCircle';
      case 'processing': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'FileText';
    }
  };

  return (
    <div className="glass-morphic rounded-xl p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Documents</h3>
          <p className="text-sm text-muted-foreground">Uploaded financial reports</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => window.location.href = '/pdf-upload-management'}
        >
          Upload
        </Button>
      </div>
      
      <div className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-glass-hover transition-all duration-200">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {doc.name}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-xs text-muted-foreground">
                  {new Date(doc.uploadDate).toLocaleDateString('en-GB')}
                </p>
                <span className="text-xs text-muted-foreground">•</span>
                <p className="text-xs text-muted-foreground">{doc.size}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-1 ${getStatusColor(doc.status)}`}>
                <Icon name={getStatusIcon(doc.status)} size={14} />
                <span className="text-xs font-medium capitalize">{doc.status}</span>
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="MoreVertical" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-glass-border">
        <button 
          className="w-full text-sm text-primary hover:text-primary/80 transition-colors"
          onClick={() => window.location.href = '/pdf-upload-management'}
        >
          View All Documents
        </button>
      </div>
    </div>
  );
};

export default DocumentsList;