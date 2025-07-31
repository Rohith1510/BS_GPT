import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingIndicator = ({ estimatedTime = 3 }) => {
  return (
    <div className="flex justify-start mb-6">
      <div className="flex space-x-3 max-w-4xl">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <Icon name="Bot" size={16} color="white" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="glass-morphic rounded-2xl rounded-tl-md p-4 shadow-elevation-2 border border-glass-border">
            <div className="flex items-center space-x-3">
              {/* Animated dots */}
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-foreground">AI is analyzing your query...</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Estimated response time: ~{estimatedTime} seconds
                </p>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-3">
              <div className="w-full bg-muted rounded-full h-1">
                <div className="bg-primary h-1 rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
            
            {/* Processing steps */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="CheckCircle" size={12} className="text-accent" />
                <span>Query received and parsed</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span>Processing financial data...</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground opacity-50">
                <Icon name="Circle" size={12} />
                <span>Generating insights and visualizations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;