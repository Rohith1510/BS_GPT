import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QueryHistory = ({ history, onSelectQuery, onClearHistory, isCollapsed }) => {
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const queryTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - queryTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return queryTime.toLocaleDateString();
  };

  const truncateQuery = (query, maxLength = 50) => {
    return query.length > maxLength ? `${query.substring(0, maxLength)}...` : query;
  };

  if (isCollapsed) {
    return (
      <div className="space-y-2">
        <div className="group relative">
          <Button
            variant="ghost"
            size="icon"
            className="w-full h-12 glass-morphic glass-hover"
            title="Query History"
          >
            <Icon name="History" size={20} />
          </Button>
          
          {/* Tooltip */}
          <div className="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-elevation-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
            Query History ({history.length})
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Recent Queries</h3>
        </div>
        
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="Trash2" size={14} />
          </Button>
        )}
      </div>
      
      {history.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="MessageSquare" size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No queries yet</p>
          <p className="text-xs text-muted-foreground mt-1">Start asking questions about your financial data</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {history.map((query) => (
            <button
              key={query.id}
              onClick={() => onSelectQuery(query.query)}
              className="w-full text-left p-3 rounded-lg glass-morphic glass-hover border border-glass-border hover:border-primary/30 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                    {truncateQuery(query.query)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTimestamp(query.timestamp)}
                  </p>
                </div>
                <Icon name="ArrowUpRight" size={14} className="text-muted-foreground group-hover:text-primary transition-colors duration-200 ml-2 flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueryHistory;