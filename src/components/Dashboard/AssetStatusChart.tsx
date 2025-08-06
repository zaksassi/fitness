import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useAssetStore } from '../../store';

const AssetStatusChart: React.FC = () => {
  const { assets } = useAssetStore();

  // Calculate asset status distribution
  const getAssetStatusData = () => {
    const statusCounts = {
      'Active': 0,
      'Under Maintenance': 0,
      'Inactive': 0,
      'Retired': 0,
    };

    assets.forEach(asset => {
      statusCounts[asset.status] = (statusCounts[asset.status] || 0) + 1;
    });

    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const data = getAssetStatusData();

  const COLORS = ['#10B981', '#F59E0B', '#6B7280', '#EF4444'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#F9FAFB',
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AssetStatusChart;