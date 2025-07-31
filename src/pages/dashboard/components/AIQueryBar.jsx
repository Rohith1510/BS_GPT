import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AIQueryBar = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestions = [
    "What is our current debt-to-equity ratio?",
    "Compare revenue growth with last year",
    "Show me asset allocation breakdown",
    "What are our top expense categories?",
    "Analyze cash flow trends"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = `/ai-query-interface?q=${encodeURIComponent(query)}`;
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
  };

  return (
    <div className="glass-morphic rounded-xl p-6 shadow-elevation-2">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/20">
            <Icon name="Bot" size={20} className="text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">AI Assistant</h3>
        </div>
        <p className="text-sm text-muted-foreground">Ask questions about your financial data</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Ask me anything about your financial data..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-12"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            loading={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
      </form>
      
      <div className="mt-6">
        <p className="text-xs font-medium text-muted-foreground mb-3">Suggested queries:</p>
        <div className="space-y-2">
          {suggestions.slice(0, 3).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left text-xs text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-glass-hover transition-all duration-200"
            >
              <Icon name="Lightbulb" size={12} className="inline mr-2" />
              {suggestion}
            </button>
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          className="mt-3"
          onClick={() => window.location.href = '/ai-query-interface'}
        >
          View All Suggestions
        </Button>
      </div>
    </div>
  );
};

export default AIQueryBar;