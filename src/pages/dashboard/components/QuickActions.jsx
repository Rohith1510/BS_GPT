import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const actions = [
    {
      title: "Upload Document",
      description: "Add new financial reports",
      icon: "Upload",
      variant: "default",
      path: "/pdf-upload-management"
    },
    {
      title: "Ask AI Assistant",
      description: "Query your financial data",
      icon: "Bot",
      variant: "outline",
      path: "/ai-query-interface"
    },
    {
      title: "View Analysis",
      description: "Detailed financial insights",
      icon: "BarChart3",
      variant: "outline",
      path: "/financial-data-analysis"
    },
    {
      title: "Export Data",
      description: "Download reports & summaries",
      icon: "Download",
      variant: "ghost",
      path: "#"
    }
  ];

  const handleAction = (path) => {
    if (path !== '#') {
      window.location.href = path;
    }
  };

  return (
    <div className="glass-morphic rounded-xl p-6 shadow-elevation-2">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <p className="text-sm text-muted-foreground">Common platform tasks</p>
      </div>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            fullWidth
            iconName={action.icon}
            iconPosition="left"
            className="justify-start h-auto p-4"
            onClick={() => handleAction(action.path)}
          >
            <div className="text-left">
              <div className="font-medium">{action.title}</div>
              <div className="text-xs opacity-70 mt-1">{action.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;