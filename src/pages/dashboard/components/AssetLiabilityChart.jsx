import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AssetLiabilityChart = () => {
  const assetLiabilityData = [
    { year: "2020", assets: 850000, liabilities: 420000 },
    { year: "2021", assets: 920000, liabilities: 450000 },
    { year: "2022", assets: 1050000, liabilities: 480000 },
    { year: "2023", assets: 1180000, liabilities: 520000 },
    { year: "2024", assets: 1320000, liabilities: 580000 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-morphic rounded-lg p-3 shadow-elevation-3">
          <p className="text-sm font-medium text-foreground mb-2">{`Year: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey === 'assets' ? 'Assets' : 'Liabilities'}: ₹${(entry.value / 100000).toFixed(1)}L`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-morphic rounded-xl p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Assets vs Liabilities</h3>
          <p className="text-sm text-muted-foreground">5-year comparison analysis</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-sm text-muted-foreground">Assets</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="text-sm text-muted-foreground">Liabilities</span>
          </div>
        </div>
      </div>
      
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={assetLiabilityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis 
              dataKey="year" 
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value / 100000}L`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="assets" 
              fill="#3B82F6" 
              radius={[4, 4, 0, 0]}
              name="Assets"
            />
            <Bar 
              dataKey="liabilities" 
              fill="#8B5CF6" 
              radius={[4, 4, 0, 0]}
              name="Liabilities"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AssetLiabilityChart;