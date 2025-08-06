import React from 'react';
import { Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useWorkOrderStore } from '../../store';
import { format } from 'date-fns';

const RecentWorkOrders: React.FC = () => {
  const { workOrders } = useWorkOrderStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'In Progress':
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      case 'Done':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Closed':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Done':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const recentWorkOrders = workOrders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (recentWorkOrders.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400">No work orders found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentWorkOrders.map((workOrder) => (
        <div
          key={workOrder.id}
          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          <div className="flex items-center space-x-3">
            {getStatusIcon(workOrder.status)}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {workOrder.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {format(new Date(workOrder.createdAt), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                workOrder.status
              )}`}
            >
              {workOrder.status}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {workOrder.priority}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentWorkOrders;