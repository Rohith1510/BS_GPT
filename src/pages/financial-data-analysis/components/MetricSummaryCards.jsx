import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricSummaryCards = ({ selectedCompany }) => {
  const mockMetrics = [
    {
      id: 1,
      title: 'Total Revenue',
      value: '₹2,45,670',
      unit: 'Crores',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      description: 'Year over year growth'
    },
    {
      id: 2,
      title: 'Net Profit',
      value: '₹45,230',
      unit: 'Crores',
      change: '+8.3%',
      changeType: 'positive',
      icon: 'DollarSign',
      description: 'Compared to last year'
    },
    {
      id: 3,
      title: 'Total Assets',
      value: '₹8,95,450',
      unit: 'Crores',
      change: '+15.2%',
      changeType: 'positive',
      icon: 'Building',
      description: 'Asset growth rate'
    },
    {
      id: 4,
      title: 'Debt to Equity',
      value: '0.45',
      unit: 'Ratio',
      change: '-5.1%',
      changeType: 'positive',
      icon: 'Scale',
      description: 'Improved leverage'
    },
    {
      id: 5,
      title: 'ROE',
      value: '18.7%',
      unit: '',
      change: '+2.3%',
      changeType: 'positive',
      icon: 'Percent',
      description: 'Return on Equity'
    },
    {
      id: 6,
      title: 'Current Ratio',
      value: '1.85',
      unit: 'Ratio',
      change: '+0.15',
      changeType: 'positive',
      icon: 'Activity',
      description: 'Liquidity position'
    }
  ];

  const getChangeColor = (changeType) => {
    return changeType === 'positive' ? 'text-accent' : 'text-error';
  };

  const getChangeIcon = (changeType) => {
    return changeType === 'positive' ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {mockMetrics.map((metric) => (
        <div
          key={metric.id}
          className="glass-morphic rounded-xl p-6 hover:bg-glass-hover transition-all duration-200 group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-200">
                <Icon name={metric.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
                <p className="text-xs text-muted-foreground/70">{metric.description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-foreground">{metric.value}</span>
              {metric.unit && (
                <span className="text-sm text-muted-foreground">{metric.unit}</span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-1 ${getChangeColor(metric.changeType)}`}>
                <Icon name={getChangeIcon(metric.changeType)} size={14} />
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
              <span className="text-xs text-muted-foreground">vs last period</span>
            </div>
          </div>

          {/* Mini trend indicator */}
          <div className="mt-4 pt-4 border-t border-glass-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Trend</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span className="text-accent">Strong</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricSummaryCards;