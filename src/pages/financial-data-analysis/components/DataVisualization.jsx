import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataVisualization = ({ filters }) => {
  const [activeChart, setActiveChart] = useState('revenue-trend');

  const revenueData = [
    { year: '2019', revenue: 185000, profit: 28000, assets: 650000, liabilities: 420000 },
    { year: '2020', revenue: 198000, profit: 32000, assets: 720000, liabilities: 450000 },
    { year: '2021', revenue: 215000, profit: 38000, assets: 785000, liabilities: 480000 },
    { year: '2022', revenue: 232000, profit: 42000, assets: 850000, liabilities: 510000 },
    { year: '2023', revenue: 245670, profit: 45230, assets: 895450, liabilities: 535000 }
  ];

  const assetLiabilityData = [
    { category: 'Current Assets', value: 285000, color: '#3B82F6' },
    { category: 'Non-Current Assets', value: 610450, color: '#8B5CF6' },
    { category: 'Current Liabilities', value: 185000, color: '#EF4444' },
    { category: 'Non-Current Liabilities', value: 350000, color: '#F59E0B' }
  ];

  const quarterlyGrowthData = [
    { quarter: 'Q1 2023', growth: 8.5, target: 10 },
    { quarter: 'Q2 2023', growth: 12.3, target: 10 },
    { quarter: 'Q3 2023', growth: 15.7, target: 12 },
    { quarter: 'Q4 2023', growth: 18.2, target: 15 },
    { quarter: 'Q1 2024', growth: 14.8, target: 16 }
  ];

  const ratioData = [
    { name: 'Current Ratio', value: 1.85, benchmark: 2.0 },
    { name: 'Quick Ratio', value: 1.42, benchmark: 1.5 },
    { name: 'Debt-to-Equity', value: 0.45, benchmark: 0.5 },
    { name: 'ROE', value: 18.7, benchmark: 15.0 },
    { name: 'ROA', value: 12.3, benchmark: 10.0 },
    { name: 'Gross Margin', value: 35.8, benchmark: 30.0 }
  ];

  const chartOptions = [
    { id: 'revenue-trend', label: 'Revenue Trend', icon: 'TrendingUp' },
    { id: 'asset-liability', label: 'Assets vs Liabilities', icon: 'PieChart' },
    { id: 'quarterly-growth', label: 'Quarterly Growth', icon: 'BarChart3' },
    { id: 'financial-ratios', label: 'Financial Ratios', icon: 'Activity' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-morphic p-4 rounded-lg shadow-elevation-3 border border-glass-border">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-muted-foreground">{entry.dataKey}:</span>
              <span className="font-medium text-foreground">
                {typeof entry.value === 'number' && entry.value > 1000
                  ? `₹${(entry.value / 1000).toLocaleString('en-IN')}K Cr`
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'revenue-trend':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
              <XAxis dataKey="year" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#3B82F6' }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#10B981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'asset-liability':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={assetLiabilityData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {assetLiabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'quarterly-growth':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={quarterlyGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
              <XAxis dataKey="quarter" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="growth" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'financial-ratios':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={ratioData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
              <XAxis type="number" stroke="#94A3B8" />
              <YAxis dataKey="name" type="category" stroke="#94A3B8" width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" fill="#10B981" radius={[0, 4, 4, 0]} />
              <Bar dataKey="benchmark" fill="#F59E0B" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="glass-morphic rounded-xl p-6">
      {/* Chart Selection */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Data Visualization</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export Chart
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Maximize"
            iconPosition="left"
          >
            Fullscreen
          </Button>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {chartOptions.map((option) => (
          <Button
            key={option.id}
            variant={activeChart === option.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveChart(option.id)}
            iconName={option.icon}
            iconPosition="left"
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="bg-surface/50 rounded-lg p-4 min-h-[400px]">
        {renderChart()}
      </div>

      {/* Chart Insights */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Key Insights</h4>
            <p className="text-sm text-muted-foreground">
              {activeChart === 'revenue-trend' && 
                "Revenue shows consistent growth with 12.5% YoY increase. Profit margins have improved from 15.1% to 18.4% over the 5-year period."
              }
              {activeChart === 'asset-liability' && 
                "Asset composition is well-balanced with 68% non-current assets. Debt levels are manageable at 60% of total assets."
              }
              {activeChart === 'quarterly-growth' && 
                "Q3 2023 showed exceptional growth of 15.7%, exceeding targets. Current quarter maintains strong performance above industry average."
              }
              {activeChart === 'financial-ratios' && 
                "ROE and ROA exceed industry benchmarks, indicating efficient capital utilization. Current ratio suggests healthy liquidity position."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;