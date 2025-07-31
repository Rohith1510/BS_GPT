import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DocumentTable = ({ documents, onAction, selectedDocuments, onSelectionChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('uploadDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'processed', label: 'Processed' },
    { value: 'processing', label: 'Processing' },
    { value: 'failed', label: 'Failed' },
    { value: 'pending', label: 'Pending' }
  ];

  const filteredAndSortedDocuments = useMemo(() => {
    let filtered = documents.filter(doc => {
      const matchesSearch = doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'uploadDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [documents, searchTerm, sortField, sortDirection, statusFilter]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(filteredAndSortedDocuments.map(doc => doc.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectDocument = (docId, checked) => {
    if (checked) {
      onSelectionChange([...selectedDocuments, docId]);
    } else {
      onSelectionChange(selectedDocuments.filter(id => id !== docId));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      processed: { color: 'bg-success/20 text-success', icon: 'CheckCircle' },
      processing: { color: 'bg-warning/20 text-warning', icon: 'Loader2' },
      failed: { color: 'bg-error/20 text-error', icon: 'XCircle' },
      pending: { color: 'bg-muted/20 text-muted-foreground', icon: 'Clock' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} className={status === 'processing' ? 'animate-spin' : ''} />
        <span className="capitalize">{status}</span>
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search documents or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
            className="w-full sm:w-48"
          />
        </div>

        {selectedDocuments.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedDocuments.length} selected
            </span>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => onAction('bulk-download', selectedDocuments)}
            >
              Download
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              onClick={() => onAction('bulk-delete', selectedDocuments)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="glass-morphic rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-glass-border">
              <tr>
                <th className="text-left p-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.length === filteredAndSortedDocuments.length && filteredAndSortedDocuments.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-glass-border"
                  />
                </th>
                
                <th 
                  className="text-left p-4 cursor-pointer hover:bg-glass-hover transition-colors"
                  onClick={() => handleSort('fileName')}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Document</span>
                    {sortField === 'fileName' && (
                      <Icon name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={16} />
                    )}
                  </div>
                </th>
                
                <th 
                  className="text-left p-4 cursor-pointer hover:bg-glass-hover transition-colors"
                  onClick={() => handleSort('companyName')}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Company</span>
                    {sortField === 'companyName' && (
                      <Icon name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={16} />
                    )}
                  </div>
                </th>
                
                <th 
                  className="text-left p-4 cursor-pointer hover:bg-glass-hover transition-colors"
                  onClick={() => handleSort('uploadDate')}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Upload Date</span>
                    {sortField === 'uploadDate' && (
                      <Icon name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={16} />
                    )}
                  </div>
                </th>
                
                <th className="text-left p-4">
                  <span className="font-medium text-foreground">Status</span>
                </th>
                
                <th className="text-left p-4">
                  <span className="font-medium text-foreground">Size</span>
                </th>
                
                <th className="text-left p-4">
                  <span className="font-medium text-foreground">Actions</span>
                </th>
              </tr>
            </thead>
            
            <tbody>
              {filteredAndSortedDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-glass-border hover:bg-glass-hover transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(doc.id)}
                      onChange={(e) => handleSelectDocument(doc.id, e.target.checked)}
                      className="rounded border-glass-border"
                    />
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-error/20 flex items-center justify-center">
                        <Icon name="FileText" size={16} className="text-error" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{doc.fileName}</div>
                        <div className="text-xs text-muted-foreground">
                          {doc.extractedMetrics} metrics extracted
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="font-medium text-foreground">{doc.companyName}</div>
                    <div className="text-sm text-muted-foreground">{doc.financialYear}</div>
                  </td>
                  
                  <td className="p-4">
                    <div className="text-sm text-foreground">{formatDate(doc.uploadDate)}</div>
                  </td>
                  
                  <td className="p-4">
                    {getStatusBadge(doc.status)}
                  </td>
                  
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{formatFileSize(doc.fileSize)}</span>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onAction('view', doc.id)}
                        title="View Document"
                      />
                      
                      {doc.status === 'processed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="BarChart3"
                          onClick={() => onAction('analyze', doc.id)}
                          title="View Analysis"
                        />
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Download"
                        onClick={() => onAction('download', doc.id)}
                        title="Download"
                      />
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => onAction('delete', doc.id)}
                        title="Delete"
                        className="text-error hover:text-error"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredAndSortedDocuments.length === 0 && (
            <div className="text-center py-12">
              <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No documents found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' ?'Try adjusting your search or filter criteria' :'Upload your first balance sheet to get started'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentTable;