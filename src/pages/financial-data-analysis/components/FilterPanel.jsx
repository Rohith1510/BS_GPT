import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ onFiltersChange }) => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [comparisonMode, setComparisonMode] = useState('year-over-year');

  const companies = [
    { value: 'reliance', label: 'Reliance Industries Ltd.' },
    { value: 'tcs', label: 'Tata Consultancy Services' },
    { value: 'infosys', label: 'Infosys Limited' },
    { value: 'hdfc', label: 'HDFC Bank Limited' },
    { value: 'icici', label: 'ICICI Bank Limited' },
    { value: 'wipro', label: 'Wipro Limited' }
  ];

  const metricCategories = [
    { value: 'revenue', label: 'Revenue & Income' },
    { value: 'assets', label: 'Assets' },
    { value: 'liabilities', label: 'Liabilities' },
    { value: 'equity', label: 'Shareholders Equity' },
    { value: 'ratios', label: 'Financial Ratios' },
    { value: 'growth', label: 'Growth Metrics' }
  ];

  const comparisonOptions = [
    { value: 'year-over-year', label: 'Year over Year' },
    { value: 'quarter-over-quarter', label: 'Quarter over Quarter' },
    { value: 'multi-year', label: 'Multi-Year Trend' },
    { value: 'peer-comparison', label: 'Peer Comparison' }
  ];

  const handleApplyFilters = () => {
    const filters = {
      company: selectedCompany,
      dateRange,
      metrics: selectedMetrics,
      comparison: comparisonMode
    };
    onFiltersChange(filters);
  };

  const handleResetFilters = () => {
    setSelectedCompany('');
    setDateRange({ start: '', end: '' });
    setSelectedMetrics([]);
    setComparisonMode('year-over-year');
    onFiltersChange({
      company: '',
      dateRange: { start: '', end: '' },
      metrics: [],
      comparison: 'year-over-year'
    });
  };

  return (
    <div className="glass-morphic rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Filters & Controls</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResetFilters}
          iconName="RotateCcw"
          iconSize={16}
        >
          Reset
        </Button>
      </div>

      {/* Company Selection */}
      <div className="space-y-3">
        <Select
          label="Select Company"
          placeholder="Choose a company to analyze"
          options={companies}
          value={selectedCompany}
          onChange={setSelectedCompany}
          searchable
        />
      </div>

      {/* Date Range */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Date Range</label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="date"
            placeholder="Start Date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
          />
          <Input
            type="date"
            placeholder="End Date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
          />
        </div>
      </div>

      {/* Quick Date Presets */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Quick Presets</label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const end = new Date();
              const start = new Date();
              start.setFullYear(end.getFullYear() - 1);
              setDateRange({
                start: start.toISOString().split('T')[0],
                end: end.toISOString().split('T')[0]
              });
            }}
          >
            Last Year
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const end = new Date();
              const start = new Date();
              start.setFullYear(end.getFullYear() - 3);
              setDateRange({
                start: start.toISOString().split('T')[0],
                end: end.toISOString().split('T')[0]
              });
            }}
          >
            Last 3 Years
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const end = new Date();
              const start = new Date();
              start.setFullYear(end.getFullYear() - 5);
              setDateRange({
                start: start.toISOString().split('T')[0],
                end: end.toISOString().split('T')[0]
              });
            }}
          >
            Last 5 Years
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const end = new Date();
              const start = new Date();
              start.setMonth(end.getMonth() - 6);
              setDateRange({
                start: start.toISOString().split('T')[0],
                end: end.toISOString().split('T')[0]
              });
            }}
          >
            Last 6 Months
          </Button>
        </div>
      </div>

      {/* Metric Categories */}
      <div className="space-y-3">
        <Select
          label="Financial Metrics"
          placeholder="Select metrics to analyze"
          options={metricCategories}
          value={selectedMetrics}
          onChange={setSelectedMetrics}
          multiple
          searchable
        />
      </div>

      {/* Comparison Mode */}
      <div className="space-y-3">
        <Select
          label="Comparison Type"
          options={comparisonOptions}
          value={comparisonMode}
          onChange={setComparisonMode}
        />
      </div>

      {/* Search */}
      <div className="space-y-3">
        <Input
          type="search"
          label="Search Data"
          placeholder="Search financial data..."
          iconName="Search"
        />
      </div>

      {/* Apply Filters */}
      <Button
        variant="default"
        fullWidth
        onClick={handleApplyFilters}
        iconName="Filter"
        iconPosition="left"
      >
        Apply Filters
      </Button>

      {/* Export Options */}
      <div className="pt-4 border-t border-glass-border">
        <label className="text-sm font-medium text-foreground mb-3 block">Export Data</label>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Download"
            iconPosition="left"
          >
            Export as CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="FileText"
            iconPosition="left"
          >
            Export as PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="FileSpreadsheet"
            iconPosition="left"
          >
            Export as Excel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;