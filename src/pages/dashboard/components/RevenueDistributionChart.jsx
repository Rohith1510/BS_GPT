import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const RevenueDistributionChart = () => {
  const revenueDistribution = [
    { name: "Product Sales", value: 45, amount: 4500000 },
    { name: "Services", value: 30, amount: 3000000 },
    { name: "Licensing", value: 15, amount: 1500000 },
    { name: "Consulting", value: 10, amount: 1000000 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-morphic rounded-lg p-3 shadow-elevation-3">
          <p className="text-sm font-medium text-foreground mb-1">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {`₹${(data.amount / 100000).toFixed(1)}L (${data.value}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="glass-morphic rounded-xl p-6 shadow-elevation-2">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Revenue Distribution</h3>
        <p className="text-sm text-muted-foreground">Breakdown by business segment</p>
      </div>
      
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={revenueDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {revenueDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        {revenueDistribution.map((item, index) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: COLORS[index] }}
            ></div>
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">₹{(item.amount / 100000).toFixed(1)}L</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueDistributionChart;