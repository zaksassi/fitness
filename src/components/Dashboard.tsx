import React from 'react';
import {
  ClipboardList,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Dashboard: React.FC = () => {
  // Mock data for dashboard
  const kpis = [
    {
      title: 'Open Work Orders',
      value: '23',
      change: '+5',
      changeType: 'increase',
      icon: ClipboardList,
      color: 'bg-blue-500'
    },
    {
      title: 'Assets Monitored',
      value: '1,247',
      change: '+12',
      changeType: 'increase',
      icon: Package,
      color: 'bg-green-500'
    },
    {
      title: 'Critical Issues',
      value: '3',
      change: '-2',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'bg-red-500'
    },
    {
      title: 'Completion Rate',
      value: '94%',
      change: '+2%',
      changeType: 'increase',
      icon: CheckCircle,
      color: 'bg-purple-500'
    }
  ];

  const workOrdersByDepartment = [
    { name: 'HVAC', completed: 45, pending: 12, inProgress: 8 },
    { name: 'Electrical', completed: 32, pending: 7, inProgress: 5 },
    { name: 'Plumbing', completed: 28, pending: 9, inProgress: 4 },
    { name: 'General', completed: 38, pending: 15, inProgress: 6 },
    { name: 'Security', completed: 22, pending: 4, inProgress: 2 }
  ];

  const assetStatusData = [
    { name: 'Operational', value: 1156, color: '#10B981' },
    { name: 'Maintenance', value: 67, color: '#F59E0B' },
    { name: 'Critical', value: 24, color: '#EF4444' }
  ];

  const weeklyTrends = [
    { day: 'Mon', workOrders: 12, completion: 89 },
    { day: 'Tue', workOrders: 15, completion: 92 },
    { day: 'Wed', workOrders: 18, completion: 87 },
    { day: 'Thu', workOrders: 14, completion: 94 },
    { day: 'Fri', workOrders: 16, completion: 91 },
    { day: 'Sat', workOrders: 8, completion: 96 },
    { day: 'Sun', workOrders: 6, completion: 98 }
  ];

  const recentActivities = [
    { id: 1, type: 'work_order', message: 'HVAC maintenance completed in Building A', time: '2 minutes ago', status: 'completed' },
    { id: 2, type: 'alert', message: 'Low stock alert: HVAC filters', time: '15 minutes ago', status: 'warning' },
    { id: 3, type: 'work_order', message: 'Electrical inspection scheduled for tomorrow', time: '1 hour ago', status: 'scheduled' },
    { id: 4, type: 'asset', message: 'New generator added to inventory', time: '2 hours ago', status: 'info' },
    { id: 5, type: 'work_order', message: 'Plumbing repair completed in Building C', time: '3 hours ago', status: 'completed' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome to Facility Management Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Monitor your facility operations and track performance metrics
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Last updated</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{kpi.title}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  {kpi.changeType === 'increase' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.change} from last week
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${kpi.color}`}>
                <kpi.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Work Orders by Department */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Work Orders by Department
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workOrdersByDepartment}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#10B981" name="Completed" />
              <Bar dataKey="inProgress" fill="#F59E0B" name="In Progress" />
              <Bar dataKey="pending" fill="#EF4444" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Asset Status Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Asset Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {assetStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Trends and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Trends */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Weekly Performance Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="workOrders" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Work Orders"
              />
              <Line 
                type="monotone" 
                dataKey="completion" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Completion Rate %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'completed' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  activity.status === 'scheduled' ? 'bg-blue-500' : 'bg-gray-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
            <ClipboardList className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
            <span className="text-blue-600 dark:text-blue-400 font-medium">Create Work Order</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
            <Package className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
            <span className="text-green-600 dark:text-green-400 font-medium">Add Asset</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
            <Users className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
            <span className="text-purple-600 dark:text-purple-400 font-medium">Schedule Task</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-orange-50 dark:bg-orange-900 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors">
            <Activity className="h-6 w-6 text-orange-600 dark:text-orange-400 mr-3" />
            <span className="text-orange-600 dark:text-orange-400 font-medium">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;