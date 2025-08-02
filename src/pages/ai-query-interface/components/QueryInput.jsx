import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QueryInput = ({ onSubmitQuery, isLoading, suggestions = [] }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmitQuery(query.trim());
      setQuery('');
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 2 && suggestions.length > 0);
    setSelectedSuggestionIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative glass-morphic rounded-xl border border-glass-border shadow-elevation-2">
          <textarea
            ref={inputRef}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about your financial data..."
            className="w-full bg-transparent text-foreground placeholder-muted-foreground resize-none border-0 outline-none p-3 sm:p-4 pr-14 sm:pr-16 min-h-[50px] sm:min-h-[60px] max-h-32 rounded-xl text-sm sm:text-base"
            disabled={isLoading}
            rows={1}
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--color-muted) transparent'
            }}
          />
          
          <div className="absolute right-1.5 sm:right-2 bottom-1.5 sm:bottom-2 flex items-center space-x-1 sm:space-x-2">
            {query.trim() && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setQuery('');
                  setShowSuggestions(false);
                  inputRef.current?.focus();
                }}
                className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={14} className="sm:hidden" />
                <Icon name="X" size={16} className="hidden sm:block" />
              </Button>
            )}
            
            <Button
              type="submit"
              variant="default"
              size="icon"
              disabled={!query.trim() || isLoading}
              loading={isLoading}
              className="h-8 w-8 sm:h-10 sm:w-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-elevation-1"
            >
              {!isLoading && (
                <>
                  <Icon name="Send" size={14} className="sm:hidden" />
                  <Icon name="Send" size={18} className="hidden sm:block" />
                </>
              )}
            </Button>
          </div>
        </div>
        
        {/* Character count */}
        <div className="flex justify-between items-center mt-1 sm:mt-2 px-1">
          <div className="flex items-center space-x-2 sm:space-x-4 text-[10px] sm:text-xs text-muted-foreground">
            <span className="hidden xs:inline">Press Enter to send, Shift+Enter for new line</span>
            <span className="xs:hidden">Enter to send</span>
          </div>
          <span className={`text-[10px] sm:text-xs ${query.length > 500 ? 'text-error' : 'text-muted-foreground'}`}>
            {query.length}/1000
          </span>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 sm:mt-2 glass-morphic rounded-lg border border-glass-border shadow-elevation-3 z-50 max-h-40 sm:max-h-60 overflow-y-auto"
        >
          <div className="p-1 sm:p-2">
            <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 text-[10px] sm:text-xs text-muted-foreground border-b border-glass-border">
              <Icon name="Lightbulb" size={12} className="sm:hidden" />
              <Icon name="Lightbulb" size={14} className="hidden sm:block" />
              <span>Suggestions</span>
            </div>
            
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm transition-all duration-200 ${
                  index === selectedSuggestionIndex
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-glass-hover'
                }`}
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Icon name="MessageSquare" size={12} className="flex-shrink-0 sm:hidden" />
                  <Icon name="MessageSquare" size={14} className="flex-shrink-0 hidden sm:block" />
                  <span className="truncate">{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryInput;