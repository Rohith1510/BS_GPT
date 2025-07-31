import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QueryTemplates = ({ onSelectTemplate, isCollapsed }) => {
  const templateCategories = [
    {
      id: 'revenue',
      title: 'Revenue Analysis',
      icon: 'TrendingUp',
      templates: [
        "What was the total revenue for the last fiscal year?",
        "Show me revenue growth trends over the past 3 years",
        "Compare revenue by quarters for 2024",
        "Which product line generated the highest revenue?"
      ]
    },
    {
      id: 'growth',
      title: 'Growth Trends',
      icon: 'BarChart3',
      templates: [
        "Calculate year-over-year growth rate",
        "Show me the fastest growing business segments",
        "What are the key growth drivers this year?",
        "Compare our growth with industry benchmarks"
      ]
    },
    {
      id: 'comparative',
      title: 'Comparative Metrics',
      icon: 'GitCompare',
      templates: [
        "Compare assets vs liabilities over time",
        "Show debt-to-equity ratio trends",
        "Compare current ratio with previous years",
        "Analyze working capital changes"
      ]
    },
    {
      id: 'profitability',
      title: 'Profitability',
      icon: 'DollarSign',
      templates: [
        "What is our net profit margin trend?",
        "Show EBITDA performance over quarters",
        "Calculate return on equity (ROE)",
        "Analyze cost structure changes"
      ]
    }
  ];

  if (isCollapsed) {
    return (
      <div className="space-y-4">
        {templateCategories.map((category) => (
          <div key={category.id} className="group relative">
            <Button
              variant="ghost"
              size="icon"
              className="w-full h-12 glass-morphic glass-hover"
              title={category.title}
            >
              <Icon name={category.icon} size={20} />
            </Button>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-elevation-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
              {category.title}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="Lightbulb" size={20} className="text-accent" />
        <h3 className="text-lg font-semibold text-foreground">Query Templates</h3>
      </div>
      
      {templateCategories.map((category) => (
        <div key={category.id} className="space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name={category.icon} size={16} className="text-secondary" />
            <h4 className="text-sm font-medium text-foreground">{category.title}</h4>
          </div>
          
          <div className="space-y-2">
            {category.templates.map((template, index) => (
              <button
                key={index}
                onClick={() => onSelectTemplate(template)}
                className="w-full text-left p-3 rounded-lg glass-morphic glass-hover text-sm text-muted-foreground hover:text-foreground transition-all duration-200 border border-glass-border hover:border-primary/30"
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QueryTemplates;