import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  User, 
  WorkOrder, 
  Asset, 
  SparePart, 
  ScheduledTask, 
  Location, 
  Building, 
  Department,
  DashboardStats,
  Notification
} from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

interface WorkOrderState {
  workOrders: WorkOrder[];
  selectedWorkOrder: WorkOrder | null;
  setWorkOrders: (workOrders: WorkOrder[]) => void;
  addWorkOrder: (workOrder: WorkOrder) => void;
  updateWorkOrder: (id: string, updates: Partial<WorkOrder>) => void;
  deleteWorkOrder: (id: string) => void;
  setSelectedWorkOrder: (workOrder: WorkOrder | null) => void;
}

interface AssetState {
  assets: Asset[];
  selectedAsset: Asset | null;
  setAssets: (assets: Asset[]) => void;
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  setSelectedAsset: (asset: Asset | null) => void;
}

interface SparePartState {
  spareParts: SparePart[];
  selectedSparePart: SparePart | null;
  setSpareParts: (spareParts: SparePart[]) => void;
  addSparePart: (sparePart: SparePart) => void;
  updateSparePart: (id: string, updates: Partial<SparePart>) => void;
  deleteSparePart: (id: string) => void;
  setSelectedSparePart: (sparePart: SparePart | null) => void;
}

interface ScheduledTaskState {
  scheduledTasks: ScheduledTask[];
  selectedTask: ScheduledTask | null;
  setScheduledTasks: (tasks: ScheduledTask[]) => void;
  addScheduledTask: (task: ScheduledTask) => void;
  updateScheduledTask: (id: string, updates: Partial<ScheduledTask>) => void;
  deleteScheduledTask: (id: string) => void;
  setSelectedTask: (task: ScheduledTask | null) => void;
}

interface LocationState {
  locations: Location[];
  buildings: Building[];
  departments: Department[];
  setLocations: (locations: Location[]) => void;
  setBuildings: (buildings: Building[]) => void;
  setDepartments: (departments: Department[]) => void;
  addLocation: (location: Location) => void;
  addBuilding: (building: Building) => void;
  addDepartment: (department: Department) => void;
}

interface UserState {
  users: User[];
  selectedUser: User | null;
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  setSelectedUser: (user: User | null) => void;
}

interface DashboardState {
  stats: DashboardStats;
  notifications: Notification[];
  setStats: (stats: DashboardStats) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
}

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const useWorkOrderStore = create<WorkOrderState>((set) => ({
  workOrders: [],
  selectedWorkOrder: null,
  setWorkOrders: (workOrders) => set({ workOrders }),
  addWorkOrder: (workOrder) => set((state) => ({ 
    workOrders: [...state.workOrders, workOrder] 
  })),
  updateWorkOrder: (id, updates) => set((state) => ({
    workOrders: state.workOrders.map(wo => 
      wo.id === id ? { ...wo, ...updates } : wo
    )
  })),
  deleteWorkOrder: (id) => set((state) => ({
    workOrders: state.workOrders.filter(wo => wo.id !== id)
  })),
  setSelectedWorkOrder: (workOrder) => set({ selectedWorkOrder: workOrder }),
}));

export const useAssetStore = create<AssetState>((set) => ({
  assets: [],
  selectedAsset: null,
  setAssets: (assets) => set({ assets }),
  addAsset: (asset) => set((state) => ({ 
    assets: [...state.assets, asset] 
  })),
  updateAsset: (id, updates) => set((state) => ({
    assets: state.assets.map(asset => 
      asset.id === id ? { ...asset, ...updates } : asset
    )
  })),
  deleteAsset: (id) => set((state) => ({
    assets: state.assets.filter(asset => asset.id !== id)
  })),
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
}));

export const useSparePartStore = create<SparePartState>((set) => ({
  spareParts: [],
  selectedSparePart: null,
  setSpareParts: (spareParts) => set({ spareParts }),
  addSparePart: (sparePart) => set((state) => ({ 
    spareParts: [...state.spareParts, sparePart] 
  })),
  updateSparePart: (id, updates) => set((state) => ({
    spareParts: state.spareParts.map(part => 
      part.id === id ? { ...part, ...updates } : part
    )
  })),
  deleteSparePart: (id) => set((state) => ({
    spareParts: state.spareParts.filter(part => part.id !== id)
  })),
  setSelectedSparePart: (sparePart) => set({ selectedSparePart: sparePart }),
}));

export const useScheduledTaskStore = create<ScheduledTaskState>((set) => ({
  scheduledTasks: [],
  selectedTask: null,
  setScheduledTasks: (scheduledTasks) => set({ scheduledTasks }),
  addScheduledTask: (task) => set((state) => ({ 
    scheduledTasks: [...state.scheduledTasks, task] 
  })),
  updateScheduledTask: (id, updates) => set((state) => ({
    scheduledTasks: state.scheduledTasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    )
  })),
  deleteScheduledTask: (id) => set((state) => ({
    scheduledTasks: state.scheduledTasks.filter(task => task.id !== id)
  })),
  setSelectedTask: (task) => set({ selectedTask: task }),
}));

export const useLocationStore = create<LocationState>((set) => ({
  locations: [],
  buildings: [],
  departments: [],
  setLocations: (locations) => set({ locations }),
  setBuildings: (buildings) => set({ buildings }),
  setDepartments: (departments) => set({ departments }),
  addLocation: (location) => set((state) => ({ 
    locations: [...state.locations, location] 
  })),
  addBuilding: (building) => set((state) => ({ 
    buildings: [...state.buildings, building] 
  })),
  addDepartment: (department) => set((state) => ({ 
    departments: [...state.departments, department] 
  })),
}));

export const useUserStore = create<UserState>((set) => ({
  users: [],
  selectedUser: null,
  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ 
    users: [...state.users, user] 
  })),
  updateUser: (id, updates) => set((state) => ({
    users: state.users.map(user => 
      user.id === id ? { ...user, ...updates } : user
    )
  })),
  deleteUser: (id) => set((state) => ({
    users: state.users.filter(user => user.id !== id)
  })),
  setSelectedUser: (user) => set({ selectedUser: user }),
}));

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: {
    totalWorkOrders: 0,
    pendingWorkOrders: 0,
    completedWorkOrders: 0,
    totalAssets: 0,
    assetsUnderMaintenance: 0,
    lowStockParts: 0,
    totalTechnicians: 0,
    activeTasks: 0,
  },
  notifications: [],
  setStats: (stats) => set({ stats }),
  addNotification: (notification) => set((state) => ({ 
    notifications: [notification, ...state.notifications] 
  })),
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    )
  })),
  clearNotifications: () => set({ notifications: [] }),
}));

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'light',
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage',
    }
  )
);