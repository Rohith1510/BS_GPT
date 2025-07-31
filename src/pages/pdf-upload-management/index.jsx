import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import UploadZone from './components/UploadZone';
import UploadProgress from './components/UploadProgress';
import DocumentTable from './components/DocumentTable';
import DocumentPreview from './components/DocumentPreview';
import Icon from '../../components/AppIcon';


const PDFUploadManagement = () => {
  const [uploads, setUploads] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Mock documents data
  const mockDocuments = [
    {
      id: 1,
      fileName: "Reliance_Industries_Balance_Sheet_2023.pdf",
      companyName: "Reliance Industries Ltd",
      financialYear: "FY 2022-23",
      uploadDate: "2025-01-28T10:30:00Z",
      status: "processed",
      fileSize: 2456789,
      extractedMetrics: 47
    },
    {
      id: 2,
      fileName: "TCS_Annual_Report_2023.pdf",
      companyName: "Tata Consultancy Services",
      financialYear: "FY 2022-23",
      uploadDate: "2025-01-27T14:15:00Z",
      status: "processed",
      fileSize: 3567890,
      extractedMetrics: 52
    },
    {
      id: 3,
      fileName: "HDFC_Bank_Financial_Statement_2023.pdf",
      companyName: "HDFC Bank Limited",
      financialYear: "FY 2022-23",
      uploadDate: "2025-01-26T09:45:00Z",
      status: "processing",
      fileSize: 1890456,
      extractedMetrics: 0
    },
    {
      id: 4,
      fileName: "Infosys_Balance_Sheet_2023.pdf",
      companyName: "Infosys Limited",
      financialYear: "FY 2022-23",
      uploadDate: "2025-01-25T16:20:00Z",
      status: "processed",
      fileSize: 2234567,
      extractedMetrics: 43
    },
    {
      id: 5,
      fileName: "Wipro_Annual_Report_2023.pdf",
      companyName: "Wipro Limited",
      financialYear: "FY 2022-23",
      uploadDate: "2025-01-24T11:10:00Z",
      status: "failed",
      fileSize: 4567890,
      extractedMetrics: 0
    }
  ];

  useEffect(() => {
    setDocuments(mockDocuments);
  }, []);

  const handleFileUpload = async (files) => {
    setIsUploading(true);
    
    const newUploads = files.map((file, index) => ({
      id: Date.now() + index,
      fileName: file.name,
      fileSize: file.size,
      status: 'uploading',
      progress: 0,
      error: null
    }));

    setUploads(prev => [...prev, ...newUploads]);

    // Simulate upload process
    for (const upload of newUploads) {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploads(prev => prev.map(u => 
          u.id === upload.id ? { ...u, progress } : u
        ));
      }

      // Change to processing
      setUploads(prev => prev.map(u => 
        u.id === upload.id ? { ...u, status: 'processing', progress: 100 } : u
      ));

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Complete upload
      setUploads(prev => prev.map(u => 
        u.id === upload.id ? { ...u, status: 'completed' } : u
      ));

      // Add to documents list
      const newDocument = {
        id: Date.now() + Math.random(),
        fileName: upload.fileName,
        companyName: "New Company Ltd",
        financialYear: "FY 2023-24",
        uploadDate: new Date().toISOString(),
        status: "processed",
        fileSize: upload.fileSize,
        extractedMetrics: Math.floor(Math.random() * 50) + 20
      };

      setDocuments(prev => [newDocument, ...prev]);
    }

    setIsUploading(false);
    
    // Clear completed uploads after 3 seconds
    setTimeout(() => {
      setUploads(prev => prev.filter(u => u.status !== 'completed'));
    }, 3000);
  };

  const handleUploadCancel = (uploadId) => {
    setUploads(prev => prev.filter(u => u.id !== uploadId));
  };

  const handleUploadRetry = (uploadId) => {
    setUploads(prev => prev.map(u => 
      u.id === uploadId ? { ...u, status: 'uploading', progress: 0, error: null } : u
    ));
    // Restart upload process for this file
  };

  const handleDocumentAction = (action, documentId) => {
    switch (action) {
      case 'view':
        const doc = documents.find(d => d.id === documentId);
        setSelectedDocument(doc);
        setShowPreview(true);
        break;
      case 'analyze':
        // Navigate to analysis page
        window.location.href = `/financial-data-analysis?document=${documentId}`;
        break;
      case 'download':
        // Simulate download
        console.log('Downloading document:', documentId);
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this document?')) {
          setDocuments(prev => prev.filter(d => d.id !== documentId));
        }
        break;
      case 'bulk-download':
        console.log('Bulk downloading documents:', documentId);
        break;
      case 'bulk-delete':
        if (window.confirm(`Are you sure you want to delete ${documentId.length} documents?`)) {
          setDocuments(prev => prev.filter(d => !documentId.includes(d.id)));
          setSelectedDocuments([]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="ml-0 md:ml-80 pt-16 min-h-screen">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Icon name="Upload" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">PDF Upload & Management</h1>
                <p className="text-muted-foreground">
                  Upload and manage your balance sheet documents with AI-powered data extraction
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="glass-morphic rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Icon name="FileText" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{documents.length}</span>
                  <span className="text-sm text-muted-foreground">Total Documents</span>
                </div>
              </div>
              
              <div className="glass-morphic rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm font-medium text-foreground">
                    {documents.filter(d => d.status === 'processed').length}
                  </span>
                  <span className="text-sm text-muted-foreground">Processed</span>
                </div>
              </div>
              
              <div className="glass-morphic rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Icon name="Loader2" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-foreground">
                    {documents.filter(d => d.status === 'processing').length}
                  </span>
                  <span className="text-sm text-muted-foreground">Processing</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-6">
              <UploadZone onFileUpload={handleFileUpload} isUploading={isUploading} />
              
              <UploadProgress 
                uploads={uploads}
                onCancel={handleUploadCancel}
                onRetry={handleUploadRetry}
              />
              
              <DocumentTable
                documents={documents}
                onAction={handleDocumentAction}
                selectedDocuments={selectedDocuments}
                onSelectionChange={setSelectedDocuments}
              />
            </div>

            {/* Preview Panel */}
            <div className="xl:col-span-1">
              <div className="sticky top-24">
                {showPreview ? (
                  <DocumentPreview
                    selectedDocument={selectedDocument}
                    onClose={() => {
                      setShowPreview(false);
                      setSelectedDocument(null);
                    }}
                  />
                ) : (
                  <div className="glass-morphic rounded-lg p-8 text-center">
                    <Icon name="FileSearch" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Document Preview</h3>
                    <p className="text-muted-foreground mb-6">
                      Select a document from the table to view its preview and extracted data
                    </p>
                    
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Eye" size={16} />
                        <span>View document preview</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="BarChart3" size={16} />
                        <span>Review extracted metrics</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Info" size={16} />
                        <span>Check processing details</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PDFUploadManagement;