import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'emerald';
  change: string;
  changeType: 'positive' | 'negative';
  suffix?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  change,
  changeType,
  suffix = '',
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
    green: 'text-green-600 bg-green-100 dark:bg-green-900/20',
    yellow: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
    red: 'text-red-600 bg-red-100 dark:bg-red-900/20',
    purple: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20',
    emerald: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value.toLocaleString()}{suffix}
          </p>
          <div className="flex items-center mt-2">
            {changeType === 'positive' ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`ml-1 text-sm font-medium ${
                changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change}
            </span>
            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
              from last month
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;