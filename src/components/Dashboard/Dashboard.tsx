import React, { useEffect } from 'react';
import { 
  Wrench, 
  Building2, 
  Package, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar
} from 'lucide-react';
import { useDashboardStore, useWorkOrderStore, useAssetStore, useSparePartStore, useUserStore } from '../../store';
import { DashboardStats } from '../../types';
import StatCard from './StatCard';
import WorkOrderChart from './WorkOrderChart';
import AssetStatusChart from './AssetStatusChart';
import RecentWorkOrders from './RecentWorkOrders';
import LowStockAlert from './LowStockAlert';

const Dashboard: React.FC = () => {
  const { stats, setStats, addNotification } = useDashboardStore();
  const { workOrders } = useWorkOrderStore();
  const { assets } = useAssetStore();
  const { spareParts } = useSparePartStore();
  const { users } = useUserStore();

  useEffect(() => {
    // Calculate dashboard stats
    const newStats: DashboardStats = {
      totalWorkOrders: workOrders.length,
      pendingWorkOrders: workOrders.filter(wo => wo.status === 'Pending').length,
      completedWorkOrders: workOrders.filter(wo => wo.status === 'Done' || wo.status === 'Closed').length,
      totalAssets: assets.length,
      assetsUnderMaintenance: assets.filter(asset => asset.status === 'Under Maintenance').length,
      lowStockParts: spareParts.filter(part => part.currentStock <= part.minimumStock).length,
      totalTechnicians: users.filter(user => user.role === 'Technician').length,
      activeTasks: workOrders.filter(wo => wo.status === 'In Progress').length,
    };

    setStats(newStats);

    // Add sample notifications
    if (newStats.pendingWorkOrders > 0) {
      addNotification({
        id: 'pending-work-orders',
        title: 'Pending Work Orders',
        message: `You have ${newStats.pendingWorkOrders} pending work orders that need attention.`,
        type: 'warning',
        userId: '1',
        read: false,
        createdAt: new Date(),
      });
    }

    if (newStats.lowStockParts > 0) {
      addNotification({
        id: 'low-stock-alert',
        title: 'Low Stock Alert',
        message: `${newStats.lowStockParts} spare parts are running low on stock.`,
        type: 'error',
        userId: '1',
        read: false,
        createdAt: new Date(),
      });
    }
  }, [workOrders, assets, spareParts, users, setStats, addNotification]);

  const statCards = [
    {
      title: 'Total Work Orders',
      value: stats.totalWorkOrders,
      icon: Wrench,
      color: 'blue',
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: 'Pending Work Orders',
      value: stats.pendingWorkOrders,
      icon: Clock,
      color: 'yellow',
      change: '+5%',
      changeType: 'negative' as const,
    },
    {
      title: 'Total Assets',
      value: stats.totalAssets,
      icon: Building2,
      color: 'green',
      change: '+3%',
      changeType: 'positive' as const,
    },
    {
      title: 'Low Stock Parts',
      value: stats.lowStockParts,
      icon: Package,
      color: 'red',
      change: '+2',
      changeType: 'negative' as const,
    },
    {
      title: 'Active Technicians',
      value: stats.totalTechnicians,
      icon: Users,
      color: 'purple',
      change: '+1',
      changeType: 'positive' as const,
    },
    {
      title: 'Completion Rate',
      value: stats.totalWorkOrders > 0 ? Math.round((stats.completedWorkOrders / stats.totalWorkOrders) * 100) : 0,
      icon: CheckCircle,
      color: 'emerald',
      change: '+8%',
      changeType: 'positive' as const,
      suffix: '%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of your facility management operations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Work Order Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Work Order Trends
          </h3>
          <WorkOrderChart />
        </div>

        {/* Asset Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Asset Status Distribution
          </h3>
          <AssetStatusChart />
        </div>
      </div>

      {/* Recent Activity and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Work Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Work Orders
          </h3>
          <RecentWorkOrders />
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Low Stock Alerts
          </h3>
          <LowStockAlert />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Wrench className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">New Work Order</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Building2 className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Add Asset</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Calendar className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Schedule Task</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Package className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Check Inventory</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;