import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContextSuggestions = ({ suggestions, onSelectSuggestion, currentContext, isCollapsed }) => {
  const contextCategories = [
    {
      id: 'related',
      title: 'Related Questions',
      icon: 'MessageCircle',
      suggestions: suggestions.filter(s => s.type === 'related')
    },
    {
      id: 'drill-down',
      title: 'Drill Down',
      icon: 'ZoomIn',
      suggestions: suggestions.filter(s => s.type === 'drill-down')
    },
    {
      id: 'compare',
      title: 'Compare',
      icon: 'GitCompare',
      suggestions: suggestions.filter(s => s.type === 'compare')
    }
  ];

  const allSuggestions = [
    {
      id: 'related',
      type: 'related',
      text: "What factors contributed to this trend?",
      confidence: 0.9
    },
    {
      id: 'drill-1',
      type: 'drill-down',
      text: "Show me quarterly breakdown",
      confidence: 0.85
    },
    {
      id: 'drill-2',
      type: 'drill-down',
      text: "Analyze by business segment",
      confidence: 0.8
    },
    {
      id: 'compare-1',
      type: 'compare',
      text: "Compare with industry average",
      confidence: 0.75
    },
    {
      id: 'compare-2',
      type: 'compare',
      text: "Compare with previous year",
      confidence: 0.9
    },
    {
      id: 'related-2',
      type: 'related',
      text: "What are the key risks?",
      confidence: 0.7
    }
  ];

  if (isCollapsed) {
    return (
      <div className="space-y-3 sm:space-y-4">
        <div className="group relative">
          <Button
            variant="ghost"
            size="icon"
            className="w-full h-10 sm:h-12 glass-morphic glass-hover"
            title="Context Suggestions"
          >
            <Icon name="Lightbulb" size={16} className="sm:hidden" />
            <Icon name="Lightbulb" size={20} className="hidden sm:block" />
          </Button>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-2 px-2 py-1 sm:px-3 sm:py-2 bg-popover text-popover-foreground text-xs sm:text-sm rounded-lg shadow-elevation-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
            Context Suggestions
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center space-x-1.5 sm:space-x-2">
        <Icon name="Lightbulb" size={16} className="text-accent sm:hidden" />
        <Icon name="Lightbulb" size={20} className="text-accent hidden sm:block" />
        <h3 className="text-base sm:text-lg font-semibold text-foreground">Smart Suggestions</h3>
      </div>

      {/* Current Context */}
      {currentContext && (
        <div className="glass-morphic rounded-lg p-3 sm:p-4 border border-glass-border">
          <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1.5 sm:mb-2">
            <Icon name="Target" size={14} className="text-secondary sm:hidden" />
            <Icon name="Target" size={16} className="text-secondary hidden sm:block" />
            <h4 className="text-xs sm:text-sm font-medium text-foreground">Current Context</h4>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">{currentContext}</p>
        </div>
      )}

      {/* Categorized Suggestions */}
      {contextCategories.map((category) => {
        const categorySuggestions = allSuggestions.filter(s => s.type === category.id);
        
        if (categorySuggestions.length === 0) return null;

        return (
          <div key={category.id} className="space-y-2 sm:space-y-3">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <Icon name={category.icon} size={14} className="text-secondary sm:hidden" />
              <Icon name={category.icon} size={16} className="text-secondary hidden sm:block" />
              <h4 className="text-xs sm:text-sm font-medium text-foreground">{category.title}</h4>
            </div>
            
            <div className="space-y-1.5 sm:space-y-2">
              {categorySuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => onSelectSuggestion(suggestion.text)}
                  className="w-full text-left p-2 sm:p-3 rounded-lg glass-morphic glass-hover border border-glass-border hover:border-primary/30 transition-all duration-200 group"
                  title={suggestion.text}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors duration-200 truncate max-w-[70%]">
                      {suggestion.text}
                    </span>
                    <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                      <div className="flex items-center space-x-0.5 sm:space-x-1">
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                          suggestion.confidence > 0.8 ? 'bg-accent' :
                          suggestion.confidence > 0.6 ? 'bg-warning' : 'bg-muted'
                        }`} />
                        <span className="text-[10px] sm:text-xs text-muted-foreground">
                          {Math.round(suggestion.confidence * 100)}%
                        </span>
                      </div>
                      <Icon name="ArrowUpRight" size={10} className="text-muted-foreground group-hover:text-primary transition-colors duration-200 sm:hidden" />
                      <Icon name="ArrowUpRight" size={12} className="text-muted-foreground group-hover:text-primary transition-colors duration-200 hidden sm:block" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {/* Quick Actions */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <Icon name="Zap" size={14} className="text-accent sm:hidden" />
          <Icon name="Zap" size={16} className="text-accent hidden sm:block" />
          <h4 className="text-xs sm:text-sm font-medium text-foreground">Quick Actions</h4>
        </div>
        
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectSuggestion("Export this data to Excel")}
            className="glass-morphic glass-hover border-glass-border hover:border-primary/30 text-[10px] sm:text-xs h-7 sm:h-8 px-1.5 sm:px-2"
          >
            <Icon name="Download" size={12} className="mr-0.5 sm:mr-1 sm:size-14" />
            <span className="truncate">Export Data</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectSuggestion("Create a summary report")}
            className="glass-morphic glass-hover border-glass-border hover:border-primary/30 text-[10px] sm:text-xs h-7 sm:h-8 px-1.5 sm:px-2"
          >
            <Icon name="FileText" size={12} className="mr-0.5 sm:mr-1 sm:size-14" />
            <span className="truncate">Summary</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectSuggestion("Schedule regular updates")}
            className="glass-morphic glass-hover border-glass-border hover:border-primary/30 text-[10px] sm:text-xs h-7 sm:h-8 px-1.5 sm:px-2"
          >
            <Icon name="Calendar" size={12} className="mr-0.5 sm:mr-1 sm:size-14" />
            <span className="truncate">Schedule</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectSuggestion("Share with team")}
            className="glass-morphic glass-hover border-glass-border hover:border-primary/30 text-[10px] sm:text-xs h-7 sm:h-8 px-1.5 sm:px-2"
          >
            <Icon name="Share2" size={12} className="mr-0.5 sm:mr-1 sm:size-14" />
            <span className="truncate">Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContextSuggestions;