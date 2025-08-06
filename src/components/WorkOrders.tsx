import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Plus,
  Search,
  Filter,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  MapPin,
  Building,
  User,
  Calendar,
  Paperclip,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

interface WorkOrder {
  id: string;
  title: string;
  description: string;
  location: string;
  building: string;
  department: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'In Progress' | 'Done' | 'Closed';
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  dueDate: string;
  attachments?: string[];
  estimatedHours?: number;
  actualHours?: number;
}

const WorkOrders: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([
    {
      id: '1',
      title: 'HVAC System Maintenance',
      description: 'Regular maintenance check for HVAC system in Building A',
      location: 'Floor 3, Room 301',
      building: 'Building A',
      department: 'HVAC',
      priority: 'Medium',
      status: 'In Progress',
      assignedTo: 'Mike Technician',
      createdBy: 'John Supervisor',
      createdAt: '2024-01-15',
      dueDate: '2024-01-20',
      estimatedHours: 4,
      actualHours: 2
    },
    {
      id: '2',
      title: 'Electrical Panel Inspection',
      description: 'Quarterly inspection of main electrical panel',
      location: 'Basement, Electrical Room',
      building: 'Building B',
      department: 'Electrical',
      priority: 'High',
      status: 'Pending',
      assignedTo: 'Sarah Electrician',
      createdBy: 'System Administrator',
      createdAt: '2024-01-16',
      dueDate: '2024-01-18',
      estimatedHours: 2
    },
    {
      id: '3',
      title: 'Plumbing Leak Repair',
      description: 'Water leak reported in restroom on floor 2',
      location: 'Floor 2, Restroom B',
      building: 'Building C',
      department: 'Plumbing',
      priority: 'Critical',
      status: 'Done',
      assignedTo: 'Tom Plumber',
      createdBy: 'Jane Employee',
      createdAt: '2024-01-14',
      dueDate: '2024-01-16',
      estimatedHours: 3,
      actualHours: 2.5
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    department: '',
    assignedTo: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const [newWorkOrder, setNewWorkOrder] = useState({
    title: '',
    description: '',
    location: '',
    building: '',
    department: '',
    priority: 'Medium' as const,
    assignedTo: '',
    dueDate: '',
    estimatedHours: ''
  });

  const buildings = ['Building A', 'Building B', 'Building C', 'Building D'];
  const departments = ['HVAC', 'Electrical', 'Plumbing', 'General', 'Security'];
  const technicians = ['Mike Technician', 'Sarah Electrician', 'Tom Plumber', 'Alex General'];

  const priorityColors = {
    Low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    High: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    Critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  const statusColors = {
    Pending: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Done: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Closed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  };

  const statusIcons = {
    Pending: Clock,
    'In Progress': AlertCircle,
    Done: CheckCircle,
    Closed: XCircle
  };

  const filteredWorkOrders = workOrders.filter(wo => {
    const matchesSearch = wo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wo.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || wo.status === filters.status;
    const matchesPriority = !filters.priority || wo.priority === filters.priority;
    const matchesDepartment = !filters.department || wo.department === filters.department;
    const matchesAssignedTo = !filters.assignedTo || wo.assignedTo === filters.assignedTo;

    return matchesSearch && matchesStatus && matchesPriority && matchesDepartment && matchesAssignedTo;
  });

  const handleCreateWorkOrder = () => {
    if (!hasPermission('work_orders.create')) {
      alert('You do not have permission to create work orders');
      return;
    }

    const workOrder: WorkOrder = {
      id: (workOrders.length + 1).toString(),
      ...newWorkOrder,
      status: 'Pending',
      createdBy: user?.name || '',
      createdAt: new Date().toISOString().split('T')[0],
      estimatedHours: newWorkOrder.estimatedHours ? parseFloat(newWorkOrder.estimatedHours) : undefined
    };

    setWorkOrders([...workOrders, workOrder]);
    setNewWorkOrder({
      title: '',
      description: '',
      location: '',
      building: '',
      department: '',
      priority: 'Medium',
      assignedTo: '',
      dueDate: '',
      estimatedHours: ''
    });
    setShowCreateModal(false);
  };

  const handleStatusChange = (workOrderId: string, newStatus: WorkOrder['status']) => {
    if (!hasPermission('work_orders.edit')) {
      alert('You do not have permission to edit work orders');
      return;
    }

    setWorkOrders(workOrders.map(wo => 
      wo.id === workOrderId ? { ...wo, status: newStatus } : wo
    ));
  };

  const handleViewDetails = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Work Orders</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track facility maintenance requests</p>
        </div>
        {hasPermission('work_orders.create') && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create Work Order</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search work orders..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <select
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
          >
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

          <select
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={filters.department}
            onChange={(e) => setFilters({...filters, department: e.target.value})}
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={filters.assignedTo}
            onChange={(e) => setFilters({...filters, assignedTo: e.target.value})}
          >
            <option value="">All Technicians</option>
            {technicians.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Work Orders List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Work Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredWorkOrders.map((workOrder) => {
                const StatusIcon = statusIcons[workOrder.status];
                return (
                  <tr key={workOrder.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {workOrder.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {workOrder.department}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <Building className="h-4 w-4 mr-1 text-gray-400" />
                        {workOrder.building}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        {workOrder.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[workOrder.priority]}`}>
                        {workOrder.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon className="h-4 w-4 mr-2" />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[workOrder.status]}`}>
                          {workOrder.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <User className="h-4 w-4 mr-1 text-gray-400" />
                        {workOrder.assignedTo}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {workOrder.dueDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(workOrder)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {hasPermission('work_orders.edit') && (
                          <>
                            <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                              <Edit className="h-4 w-4" />
                            </button>
                            {workOrder.status !== 'Done' && (
                              <select
                                value={workOrder.status}
                                onChange={(e) => handleStatusChange(workOrder.id, e.target.value as WorkOrder['status'])}
                                className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                                <option value="Closed">Closed</option>
                              </select>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Work Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Work Order</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={newWorkOrder.title}
                  onChange={(e) => setNewWorkOrder({...newWorkOrder, title: e.target.value})}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={newWorkOrder.description}
                  onChange={(e) => setNewWorkOrder({...newWorkOrder, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Building *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={newWorkOrder.building}
                  onChange={(e) => setNewWorkOrder({...newWorkOrder, building: e.target.value})}
                >
                  <option value="">Select Building</option>
                  {buildings.map(building => (
                    <option key={building} value={building}>{building}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Floor 2, Room 201"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={newWorkOrder.location}
                  onChange={(e) => setNewWorkOrder({...newWorkOrder, location: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Department *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={newWorkOrder.department}
                  onChange={(e) => setNewWorkOrder({...newWorkOrder, department: e.target.value})}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={newWorkOrder.priority}
                  onChange={(e) => setNewWorkOrder({...newWorkOrder, priority: e.target.value as WorkOrder['priority']})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Assign To
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={newWorkOrder.assignedTo}
                  onChange={(e) => setNewWorkOrder({...newWorkOrder, assignedTo: e.target.value})}
                >
                  <option value="">Select Technician</option>
                  {technicians.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={newWorkOrder.dueDate}
                  onChange={(e) => setNewWorkOrder({...newWorkOrder, dueDate: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Estimated Hours
                </label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="e.g., 2.5"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={newWorkOrder.estimatedHours}
                  onChange={(e) => setNewWorkOrder({...newWorkOrder, estimatedHours: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateWorkOrder}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Work Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Work Order Details Modal */}
      {showDetailsModal && selectedWorkOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Work Order Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedWorkOrder.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{selectedWorkOrder.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Building</label>
                  <p className="text-gray-900 dark:text-white">{selectedWorkOrder.building}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                  <p className="text-gray-900 dark:text-white">{selectedWorkOrder.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Department</label>
                  <p className="text-gray-900 dark:text-white">{selectedWorkOrder.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Priority</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[selectedWorkOrder.priority]}`}>
                    {selectedWorkOrder.priority}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedWorkOrder.status]}`}>
                    {selectedWorkOrder.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Assigned To</label>
                  <p className="text-gray-900 dark:text-white">{selectedWorkOrder.assignedTo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Created By</label>
                  <p className="text-gray-900 dark:text-white">{selectedWorkOrder.createdBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Due Date</label>
                  <p className="text-gray-900 dark:text-white">{selectedWorkOrder.dueDate}</p>
                </div>
                {selectedWorkOrder.estimatedHours && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Estimated Hours</label>
                    <p className="text-gray-900 dark:text-white">{selectedWorkOrder.estimatedHours}h</p>
                  </div>
                )}
                {selectedWorkOrder.actualHours && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Actual Hours</label>
                    <p className="text-gray-900 dark:text-white">{selectedWorkOrder.actualHours}h</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkOrders;