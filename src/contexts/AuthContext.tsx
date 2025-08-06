import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Supervisor' | 'Technician' | 'Viewer';
  department?: string;
  shift?: 'Day' | 'Night';
  contactInfo?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development (replace with Firebase later)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@facility.com',
    name: 'System Administrator',
    role: 'Admin',
    department: 'IT',
    shift: 'Day',
    contactInfo: '+1-555-0101'
  },
  {
    id: '2',
    email: 'supervisor@facility.com',
    name: 'John Supervisor',
    role: 'Supervisor',
    department: 'Maintenance',
    shift: 'Day',
    contactInfo: '+1-555-0102'
  },
  {
    id: '3',
    email: 'tech@facility.com',
    name: 'Mike Technician',
    role: 'Technician',
    department: 'HVAC',
    shift: 'Day',
    contactInfo: '+1-555-0103'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('facility_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Mock authentication - replace with Firebase
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser && password === 'password') {
        setUser(foundUser);
        localStorage.setItem('facility_user', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    localStorage.removeItem('facility_user');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const permissions: Record<string, string[]> = {
      'Admin': ['*'], // Admin has all permissions
      'Supervisor': [
        'work_orders.create', 'work_orders.view', 'work_orders.edit',
        'assets.view', 'assets.edit',
        'analytics.view',
        'inventory.view', 'inventory.edit',
        'scheduler.create', 'scheduler.view', 'scheduler.edit',
        'manpower.view', 'manpower.edit',
        'reports.view', 'reports.export'
      ],
      'Technician': [
        'work_orders.view', 'work_orders.edit',
        'assets.view',
        'inventory.view',
        'scheduler.view',
        'reports.view'
      ],
      'Viewer': [
        'work_orders.view',
        'assets.view',
        'analytics.view',
        'inventory.view',
        'scheduler.view',
        'reports.view'
      ]
    };

    const userPermissions = permissions[user.role] || [];
    return userPermissions.includes('*') || userPermissions.includes(permission);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};