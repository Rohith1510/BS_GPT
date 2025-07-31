import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ChatMessage = ({ message, onFollowUp }) => {
  const { type, content, timestamp, confidence, charts, tables, suggestions } = message;
  
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount, currency = 'INR') => {
    if (currency === 'INR') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(amount);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const renderChart = (chart) => {
    const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];
    
    switch (chart.type) {
      case 'bar':
        return (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-popover-foreground)'
                  }}
                />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'line':
        return (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chart.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-popover-foreground)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'pie':
        return (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chart.data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chart.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-popover-foreground)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderTable = (table) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-glass-border">
            {table.headers.map((header, index) => (
              <th key={index} className="text-left py-2 px-3 font-medium text-foreground">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-glass-border/50">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-2 px-3 text-muted-foreground">
                  {typeof cell === 'number' && table.headers[cellIndex].toLowerCase().includes('amount') 
                    ? formatCurrency(cell)
                    : cell
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (type === 'user') {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-3xl">
          <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3 shadow-elevation-1">
            <p className="text-sm leading-relaxed">{content}</p>
          </div>
          <div className="flex justify-end mt-1">
            <span className="text-xs text-muted-foreground">{formatTimestamp(timestamp)}</span>
          </div>
        </div>
      </div>
    );
  }

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
            {/* Content */}
            <div className="prose prose-sm max-w-none text-foreground">
              <p className="leading-relaxed whitespace-pre-wrap">{content}</p>
            </div>

            {/* Charts */}
            {charts && charts.length > 0 && (
              <div className="mt-4 space-y-4">
                {charts.map((chart, index) => (
                  <div key={index} className="glass-morphic rounded-lg p-4 border border-glass-border">
                    <h4 className="text-sm font-medium text-foreground mb-3">{chart.title}</h4>
                    {renderChart(chart)}
                  </div>
                ))}
              </div>
            )}

            {/* Tables */}
            {tables && tables.length > 0 && (
              <div className="mt-4 space-y-4">
                {tables.map((table, index) => (
                  <div key={index} className="glass-morphic rounded-lg p-4 border border-glass-border">
                    <h4 className="text-sm font-medium text-foreground mb-3">{table.title}</h4>
                    {renderTable(table)}
                  </div>
                ))}
              </div>
            )}

            {/* Confidence Indicator */}
            {confidence && (
              <div className="mt-4 flex items-center space-x-2">
                <Icon name="Target" size={14} className="text-accent" />
                <span className="text-xs text-muted-foreground">
                  Confidence: {Math.round(confidence * 100)}%
                </span>
                <div className="flex-1 bg-muted rounded-full h-1.5 ml-2">
                  <div 
                    className="bg-accent h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${confidence * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Follow-up Suggestions */}
            {suggestions && suggestions.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-2">Follow-up questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => onFollowUp(suggestion)}
                      className="text-xs h-7 px-3 glass-morphic glass-hover border-glass-border hover:border-primary/30"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-start mt-1">
            <span className="text-xs text-muted-foreground">{formatTimestamp(timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;