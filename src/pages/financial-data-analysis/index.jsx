import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import FilterPanel from './components/FilterPanel';
import MetricSummaryCards from './components/MetricSummaryCards';
import DataVisualization from './components/DataVisualization';
import AIQueryInterface from './components/AIQueryInterface';

const FinancialDataAnalysis = () => {
  const [filters, setFilters] = useState({
    company: '',
    dateRange: { start: '', end: '' },
    metrics: [],
    comparison: 'year-over-year'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Helmet>
        <title>Financial Data Analysis - BalanceSheet GPT</title>
        <meta name="description" content="Comprehensive financial data analysis with interactive visualizations and AI-powered insights for balance sheet data." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        
        <main className="ml-0 md:ml-80 pt-16 min-h-screen">
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Financial Data Analysis</h1>
                  <p className="text-muted-foreground">
                    Explore financial data through interactive visualizations and AI-powered insights
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date().toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="glass-morphic rounded-xl p-8 mb-8">
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="text-muted-foreground">Loading financial data...</span>
                </div>
              </div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Left Panel - Filters */}
              <div className="xl:col-span-3">
                <FilterPanel onFiltersChange={handleFiltersChange} />
              </div>

              {/* Center Panel - Visualizations */}
              <div className="xl:col-span-6 space-y-6">
                {/* Metric Summary Cards */}
                <MetricSummaryCards selectedCompany={filters.company} />
                
                {/* Data Visualization */}
                <DataVisualization filters={filters} />
              </div>

              {/* Right Panel - AI Query Interface */}
              <div className="xl:col-span-3">
                <div className="sticky top-24">
                  <AIQueryInterface />
                </div>
              </div>
            </div>

            {/* Mobile Responsive Adjustments */}
            <div className="xl:hidden mt-8">
              <div className="glass-morphic rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 bg-primary/10 rounded-lg text-center hover:bg-primary/20 transition-colors duration-200">
                    <div className="text-primary font-medium">Export Data</div>
                    <div className="text-xs text-muted-foreground mt-1">Download reports</div>
                  </button>
                  <button className="p-4 bg-accent/10 rounded-lg text-center hover:bg-accent/20 transition-colors duration-200">
                    <div className="text-accent font-medium">AI Insights</div>
                    <div className="text-xs text-muted-foreground mt-1">Get AI analysis</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-12 pt-8 border-t border-glass-border">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-sm text-muted-foreground">
                  <p>Data sources: Balance sheet PDFs, Financial statements</p>
                  <p>Analysis powered by AI • Real-time updates • Secure processing</p>
                </div>
                <div className="text-sm text-muted-foreground text-right">
                  <p>© {new Date().getFullYear()} BalanceSheet GPT</p>
                  <p>Financial Analysis Platform</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default FinancialDataAnalysis;