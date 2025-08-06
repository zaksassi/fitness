import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store';
import Layout from './components/Layout/Layout';
import LoginForm from './components/Auth/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
import WorkOrderList from './components/WorkOrders/WorkOrderList';

// Placeholder components for other modules
const AssetManagement = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Asset Management</h1>
    <p className="text-gray-600 dark:text-gray-400">Manage facility assets and equipment</p>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-500 dark:text-gray-400">Asset management module coming soon...</p>
    </div>
  </div>
);

const SpareParts = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Spare Parts Inventory</h1>
    <p className="text-gray-600 dark:text-gray-400">Track spare parts and inventory levels</p>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-500 dark:text-gray-400">Spare parts module coming soon...</p>
    </div>
  </div>
);

const Scheduler = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Work Scheduler</h1>
    <p className="text-gray-600 dark:text-gray-400">Schedule and manage recurring tasks</p>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-500 dark:text-gray-400">Scheduler module coming soon...</p>
    </div>
  </div>
);

const Manpower = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manpower Management</h1>
    <p className="text-gray-600 dark:text-gray-400">Manage technicians and employee profiles</p>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-500 dark:text-gray-400">Manpower module coming soon...</p>
    </div>
  </div>
);

const Reports = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
    <p className="text-gray-600 dark:text-gray-400">Generate and export facility reports</p>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-500 dark:text-gray-400">Reports module coming soon...</p>
    </div>
  </div>
);

const Analytics = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
    <p className="text-gray-600 dark:text-gray-400">Advanced analytics and insights</p>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-500 dark:text-gray-400">Analytics module coming soon...</p>
    </div>
  </div>
);

const Settings = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
    <p className="text-gray-600 dark:text-gray-400">Configure system settings and preferences</p>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-500 dark:text-gray-400">Settings module coming soon...</p>
    </div>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Layout>{children}</Layout>;
};

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className="App">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
        
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />} 
          />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/work-orders" 
            element={
              <ProtectedRoute>
                <WorkOrderList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/assets" 
            element={
              <ProtectedRoute>
                <AssetManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/spare-parts" 
            element={
              <ProtectedRoute>
                <SpareParts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/scheduler" 
            element={
              <ProtectedRoute>
                <Scheduler />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/manpower" 
            element={
              <ProtectedRoute>
                <Manpower />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;