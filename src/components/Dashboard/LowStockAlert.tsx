import React from 'react';
import { AlertTriangle, Package } from 'lucide-react';
import { useSparePartStore } from '../../store';

const LowStockAlert: React.FC = () => {
  const { spareParts } = useSparePartStore();

  const lowStockParts = spareParts.filter(part => part.currentStock <= part.minimumStock);

  if (lowStockParts.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <p className="text-green-600 dark:text-green-400 font-medium">All stock levels are good</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">No low stock alerts</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lowStockParts.map((part) => (
        <div
          key={part.id}
          className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {part.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {part.category} • {part.partNumber}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-red-600 dark:text-red-400">
              {part.currentStock} / {part.minimumStock}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Stock Level
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LowStockAlert;