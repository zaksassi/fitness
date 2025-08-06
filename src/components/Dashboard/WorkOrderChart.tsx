import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useWorkOrderStore } from '../../store';

const WorkOrderChart: React.FC = () => {
  const { workOrders } = useWorkOrderStore();

  // Generate sample data for the last 7 days
  const generateChartData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      // Simulate work order counts for each day
      const created = Math.floor(Math.random() * 10) + 5;
      const completed = Math.floor(Math.random() * 8) + 3;
      
      data.push({
        name: dayName,
        created,
        completed,
      });
    }
    
    return data;
  };

  const chartData = generateChartData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="name" 
          stroke="#6B7280"
          fontSize={12}
        />
        <YAxis 
          stroke="#6B7280"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#F9FAFB',
          }}
        />
        <Line 
          type="monotone" 
          dataKey="created" 
          stroke="#3B82F6" 
          strokeWidth={2}
          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
        />
        <Line 
          type="monotone" 
          dataKey="completed" 
          stroke="#10B981" 
          strokeWidth={2}
          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WorkOrderChart;