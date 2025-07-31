import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "upload",
      title: "Balance Sheet Q3 2024",
      description: "Financial report uploaded successfully",
      timestamp: "2 hours ago",
      icon: "FileText",
      iconColor: "text-primary"
    },
    {
      id: 2,
      type: "analysis",
      title: "Revenue Analysis Complete",
      description: "AI analysis generated for Q3 performance",
      timestamp: "4 hours ago",
      icon: "TrendingUp",
      iconColor: "text-accent"
    },
    {
      id: 3,
      type: "query",
      title: "Query: Asset Growth Rate",
      description: "What is our asset growth rate compared to last year?",
      timestamp: "6 hours ago",
      icon: "MessageSquare",
      iconColor: "text-secondary"
    },
    {
      id: 4,
      type: "alert",
      title: "Liability Threshold Alert",
      description: "Current ratio below recommended threshold",
      timestamp: "1 day ago",
      icon: "AlertTriangle",
      iconColor: "text-warning"
    },
    {
      id: 5,
      type: "export",
      title: "Data Export Complete",
      description: "Financial summary exported to Excel",
      timestamp: "2 days ago",
      icon: "Download",
      iconColor: "text-muted-foreground"
    }
  ];

  return (
    <div className="glass-morphic rounded-xl p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest platform interactions</p>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-glass-hover transition-all duration-200">
            <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-muted/20 ${activity.iconColor}`}>
              <Icon name={activity.icon} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {activity.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activity.description}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {activity.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;