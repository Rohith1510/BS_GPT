import React from 'react';
import Icon from '../../../components/AppIcon';


const BrandingSection = () => {
  const trustIndicators = [
    {
      icon: 'Shield',
      title: 'Bank-Grade Security',
      description: 'Your financial data is protected with enterprise-level encryption'
    },
    {
      icon: 'FileCheck',
      title: 'Audit Compliance',
      description: 'Complete audit trail and compliance with financial regulations'
    },
    {
      icon: 'Users',
      title: 'Role-Based Access',
      description: 'Granular permissions ensure data access control'
    },
    {
      icon: 'Globe',
      title: 'Multi-Currency Support',
      description: 'Support for INR, USD, and other major currencies'
    }
  ];

  const supportedFormats = [
    { label: 'Currency', value: 'INR (₹) / USD ($)' },
    { label: 'Date Format', value: 'DD/MM/YYYY' },
    { label: 'Number Format', value: '1,00,000 (Indian)' },
    { label: 'Language', value: 'English' }
  ];

  return (
    <div className="flex flex-col justify-center h-full p-8 lg:p-12">
      {/* Logo and Brand */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary shadow-elevation-2">
            <Icon name="Calculator" size={32} color="white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">BalanceSheet</h2>
            <p className="text-xl text-secondary font-semibold -mt-1">GPT</p>
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground leading-relaxed">
          AI-powered financial analysis platform for balance sheet processing and natural language querying.
        </p>
      </div>

      {/* Financial Data Visualization Preview */}
      <div className="mb-8 p-6 glass-morphic rounded-xl">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
          <Icon name="TrendingUp" size={16} className="mr-2" />
          Live Financial Insights
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">₹2.4M</div>
            <div className="text-xs text-muted-foreground">Total Assets</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">+12.5%</div>
            <div className="text-xs text-muted-foreground">YoY Growth</div>
          </div>
        </div>
        <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-semibold text-foreground">Security & Compliance</h3>
        {trustIndicators.map((indicator, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Icon name={indicator.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground">{indicator.title}</h4>
              <p className="text-xs text-muted-foreground">{indicator.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Localization Support */}
      <div className="glass-morphic rounded-lg p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Globe" size={16} className="mr-2" />
          Localization Support
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {supportedFormats.map((format, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-muted-foreground">{format.label}</span>
              <span className="text-foreground font-medium">{format.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-glass-border">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} BalanceSheet GPT. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default BrandingSection;