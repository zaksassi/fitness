export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Supervisor' | 'Technician' | 'Viewer';
  department: string;
  shift: 'Day' | 'Night';
  contactInfo: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  buildings: Building[];
}

export interface Building {
  id: string;
  name: string;
  locationId: string;
  departments: Department[];
}

export interface Department {
  id: string;
  name: string;
  buildingId: string;
  managerId?: string;
}

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  locationId: string;
  buildingId: string;
  departmentId: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'In Progress' | 'Done' | 'Closed';
  assignedTo?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  attachments: Attachment[];
  estimatedHours?: number;
  actualHours?: number;
  cost?: number;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  uploadedAt: Date;
}

export interface Asset {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  locationId: string;
  buildingId: string;
  departmentId: string;
  supplier: string;
  warrantyDate: Date;
  status: 'Active' | 'Inactive' | 'Under Maintenance' | 'Retired';
  purchaseDate: Date;
  purchaseCost: number;
  currentValue?: number;
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;
  specifications?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface SparePart {
  id: string;
  name: string;
  category: 'HVAC' | 'Electrical' | 'Plumbing' | 'Mechanical' | 'General';
  partNumber: string;
  supplier: string;
  currentStock: number;
  minimumStock: number;
  unitCost: number;
  location: string;
  lastRestocked?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScheduledTask {
  id: string;
  title: string;
  description: string;
  type: 'Recurring' | 'One-time';
  frequency?: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
  assignedTo: string;
  locationId: string;
  buildingId: string;
  departmentId: string;
  startDate: Date;
  endDate?: Date;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  estimatedHours: number;
  actualHours?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Report {
  id: string;
  title: string;
  type: 'Daily' | 'Weekly' | 'Monthly' | 'Custom';
  filters: ReportFilters;
  generatedAt: Date;
  generatedBy: string;
  data: any;
  format: 'PDF' | 'Excel' | 'CSV';
}

export interface ReportFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  locations?: string[];
  departments?: string[];
  technicians?: string[];
  status?: string[];
}

export interface DashboardStats {
  totalWorkOrders: number;
  pendingWorkOrders: number;
  completedWorkOrders: number;
  totalAssets: number;
  assetsUnderMaintenance: number;
  lowStockParts: number;
  totalTechnicians: number;
  activeTasks: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  userId: string;
  read: boolean;
  createdAt: Date;
}