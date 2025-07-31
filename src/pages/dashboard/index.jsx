import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricCard from './components/MetricCard';
import RevenueChart from './components/RevenueChart';
import AssetLiabilityChart from './components/AssetLiabilityChart';
import RevenueDistributionChart from './components/RevenueDistributionChart';
import ActivityFeed from './components/ActivityFeed';
import DocumentsList from './components/DocumentsList';
import QuickActions from './components/QuickActions';
import AIQueryBar from './components/AIQueryBar';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('analyst'); // Mock user role
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Mock metrics data based on user role
  const getMetricsData = () => {
    const baseMetrics = [
      {
        title: "Total Revenue",
        value: "₹92.5L",
        change: "+12.5%",
        changeType: "positive",
        icon: "TrendingUp",
        trend: true
      },
      {
        title: "Net Profit",
        value: "₹31.2L",
        change: "+8.3%",
        changeType: "positive",
        icon: "DollarSign",
        trend: true
      },
      {
        title: "Total Assets",
        value: "₹132.8L",
        change: "+15.2%",
        changeType: "positive",
        icon: "Building",
        trend: true
      },
      {
        title: "Current Ratio",
        value: "2.45",
        change: "-0.12",
        changeType: "negative",
        icon: "Calculator"
      }
    ];

    if (userRole === 'ceo') {
      return [
        ...baseMetrics,
        {
          title: "ROI",
          value: "23.5%",
          change: "+2.1%",
          changeType: "positive",
          icon: "Target"
        },
        {
          title: "Market Share",
          value: "18.2%",
          change: "+1.5%",
          changeType: "positive",
          icon: "PieChart"
        }
      ];
    }

    if (userRole === 'group_admin') {
      return [
        ...baseMetrics,
        {
          title: "Companies",
          value: "12",
          change: "+2",
          changeType: "positive",
          icon: "Building2"
        },
        {
          title: "Total Portfolio",
          value: "₹1,250L",
          change: "+18.7%",
          changeType: "positive",
          icon: "Briefcase"
        }
      ];
    }

    return baseMetrics;
  };

  const formatTime = (date) => {
    return date.toLocaleString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleBasedGreeting = () => {
    const hour = currentTime.getHours();
    let greeting = 'Good morning';
    if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
    if (hour >= 17) greeting = 'Good evening';

    const roleTitle = {
      'analyst': 'Financial Analyst',
      'ceo': 'Chief Executive Officer',
      'group_admin': 'Group Administrator'
    }[userRole];

    return `${greeting}, John Doe - ${roleTitle}`;
  };

  const metricsData = getMetricsData();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="ml-0 md:ml-80 pt-16 transition-all duration-300">
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="glass-morphic rounded-xl p-6 shadow-elevation-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {getRoleBasedGreeting()}
                </h1>
                <p className="text-muted-foreground">
                  {formatTime(currentTime)}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span>System Status: Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricsData.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                trend={metric.trend}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <AssetLiabilityChart />
            <RevenueDistributionChart />
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Activity Feed */}
            <div className="lg:col-span-1">
              <ActivityFeed />
            </div>
            
            {/* Middle Column - Documents */}
            <div className="lg:col-span-1">
              <DocumentsList />
            </div>
            
            {/* Right Column - Quick Actions & AI */}
            <div className="lg:col-span-1 space-y-6">
              <AIQueryBar />
              <QuickActions />
            </div>
          </div>

          {/* Role-specific Additional Content */}
          {userRole === 'group_admin' && (
            <div className="glass-morphic rounded-xl p-6 shadow-elevation-2">
              <h3 className="text-lg font-semibold text-foreground mb-4">Portfolio Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Active Companies</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-accent/10">
                  <div className="text-2xl font-bold text-accent">₹1,250L</div>
                  <div className="text-sm text-muted-foreground">Total Assets</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/10">
                  <div className="text-2xl font-bold text-secondary">23.5%</div>
                  <div className="text-sm text-muted-foreground">Avg. ROI</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;