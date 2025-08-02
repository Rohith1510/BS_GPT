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
      <div className="space-y-3 sm:space-y-4">
        {templateCategories.map((category) => (
          <div key={category.id} className="group relative">
            <Button
              variant="ghost"
              size="icon"
              className="w-full h-10 sm:h-12 glass-morphic glass-hover"
              title={category.title}
            >
              <Icon name={category.icon} size={16} className="sm:hidden" />
              <Icon name={category.icon} size={20} className="hidden sm:block" />
            </Button>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-2 px-2 py-1 sm:px-3 sm:py-2 bg-popover text-popover-foreground text-xs sm:text-sm rounded-lg shadow-elevation-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
              {category.title}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="Lightbulb" size={18} className="text-accent sm:size-20" />
        <h3 className="text-base sm:text-lg font-semibold text-foreground">Query Templates</h3>
      </div>
      
      {templateCategories.map((category) => (
        <div key={category.id} className="space-y-2 sm:space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name={category.icon} size={14} className="text-secondary sm:size-16" />
            <h4 className="text-xs sm:text-sm font-medium text-foreground">{category.title}</h4>
          </div>
          
          <div className="space-y-1.5 sm:space-y-2">
            {category.templates.map((template, index) => (
              <button
                key={index}
                onClick={() => onSelectTemplate(template)}
                className="w-full text-left p-2 sm:p-3 rounded-lg glass-morphic glass-hover text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-all duration-200 border border-glass-border hover:border-primary/30"
                title={template}
              >
                <span className="line-clamp-2">{template}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QueryTemplates;