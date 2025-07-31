import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCards = ({ users }) => {
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const pendingUsers = users.filter(user => user.status === 'pending').length;
  const inactiveUsers = users.filter(user => user.status === 'inactive').length;

  const roleDistribution = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const recentLogins = users.filter(user => {
    const loginDate = new Date(user.lastLogin);
    const now = new Date();
    const diffInHours = (now - loginDate) / (1000 * 60 * 60);
    return diffInHours <= 24;
  }).length;

  const statsData = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Users',
      value: activeUsers,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Pending Approval',
      value: pendingUsers,
      icon: 'UserX',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '-3%',
      changeType: 'negative'
    },
    {
      title: 'Recent Logins',
      value: recentLogins,
      icon: 'Activity',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+15%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <div key={index} className="glass-morphic rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <Icon name={stat.icon} size={24} className={stat.color} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
            <div className={`text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              {stat.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;