import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, trend }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-accent';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="glass-morphic rounded-xl p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20">
          <Icon name={icon} size={24} className="text-primary" />
        </div>
        {trend && (
          <div className="flex items-center space-x-1">
            <Icon name={getChangeIcon()} size={16} className={getChangeColor()} />
            <span className={`text-sm font-medium ${getChangeColor()}`}>
              {change}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      
      {!trend && change && (
        <div className="flex items-center space-x-1 mt-3">
          <Icon name={getChangeIcon()} size={14} className={getChangeColor()} />
          <span className={`text-xs ${getChangeColor()}`}>
            {change} from last quarter
          </span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;