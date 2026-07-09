import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import CreatePGProfile from './pages/CreatePGProfile';
import ManageRooms from './pages/ManageRooms';
import ManageTenants from './pages/ManageTenants';
import ManageStaff from './pages/ManageStaff';
import StaffAttendance from './pages/StaffAttendance';
import StaffWork from './pages/StaffWork';
import ManageAccount from './pages/ManageAccount';
import VendorTransactions from './pages/VendorTransactions';
import Reports from './pages/Reports';
import Inventory from './pages/Inventory';
import Enquiry from './pages/Enquiry';
import Complain from './pages/Complain';
import RequestBox from './pages/RequestBox';
import Leave from './pages/Leave';
import Subscription from './pages/Subscription';
import PriceMenu from './pages/PriceMenu';
import UserProfile from './pages/UserProfile';
import StaffProfile from './pages/StaffProfile';

// Redirect helper
const RootRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin' && !user.hasProfile) return <Navigate to="/create-pg-profile" replace />;
  return <Navigate to={`/${user.role}-dashboard`} replace />;
};

// Admin-only route helper
const AdminRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['admin']}>{children}</ProtectedRoute>
);

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/create-pg-profile" element={<AdminRoute><CreatePGProfile /></AdminRoute>} />
      <Route path="/manage-rooms" element={<AdminRoute><ManageRooms /></AdminRoute>} />
      <Route path="/manage-tenants" element={<AdminRoute><ManageTenants /></AdminRoute>} />
      <Route path="/user/:id" element={<AdminRoute><UserProfile /></AdminRoute>} />
      <Route path="/manage-staff" element={<AdminRoute><ManageStaff /></AdminRoute>} />
      <Route path="/staff/:id" element={<AdminRoute><StaffProfile /></AdminRoute>} />
      <Route path="/staff-attendance" element={<AdminRoute><StaffAttendance /></AdminRoute>} />
      <Route path="/staff-work" element={<AdminRoute><StaffWork /></AdminRoute>} />
      <Route path="/manage-account" element={<AdminRoute><ManageAccount /></AdminRoute>} />
      <Route path="/vendor-transactions" element={<AdminRoute><VendorTransactions /></AdminRoute>} />
      <Route path="/reports" element={<AdminRoute><Reports /></AdminRoute>} />
      <Route path="/inventory" element={<ProtectedRoute allowedRoles={['admin', 'customer']}><Inventory /></ProtectedRoute>} />
      <Route path="/enquiry" element={<AdminRoute><Enquiry /></AdminRoute>} />
      <Route path="/complain" element={<AdminRoute><Complain /></AdminRoute>} />
      <Route path="/request-box" element={<AdminRoute><RequestBox /></AdminRoute>} />
      <Route path="/leave" element={<ProtectedRoute allowedRoles={['admin', 'staff']}><Leave /></ProtectedRoute>} />
      <Route path="/subscription" element={<AdminRoute><Subscription /></AdminRoute>} />
      <Route path="/price-menu" element={<AdminRoute><PriceMenu /></AdminRoute>} />

      {/* Staff Routes */}
      <Route path="/staff-dashboard" element={<ProtectedRoute allowedRoles={['staff']}><StaffDashboard /></ProtectedRoute>} />

      {/* Customer Routes */}
      <Route path="/customer-dashboard" element={<ProtectedRoute allowedRoles={['customer']}><CustomerDashboard /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
