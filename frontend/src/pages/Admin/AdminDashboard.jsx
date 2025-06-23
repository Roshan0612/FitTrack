import React from 'react';
import AdminMenu from './AdminMenu';
import { useAuth } from '../../context/Auth';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <div className="admin-dashboard-bg">
      <div className="flex bg-overlay min-h-screen">
        <AdminMenu />
        <div className="flex-1 p-8 text-white">
          <h1 className="text-3xl font-semibold mb-2">
            Welcome, <span className="text-red-500">{auth?.user?.name || 'Admin'}</span>
          </h1>
          <p className="text-sm text-gray-200 mb-6">
            You have full access to manage the FitTrack system.
          </p>


          <div className=" float-left transparent-card p-6 shadow rounded-lg w-full max-w-lg">
          
            <p><strong>Admin Name:</strong> {auth?.user?.name}</p>
            <p><strong>Email:</strong> {auth?.user?.email}</p>
            <p><strong>Role:</strong> {auth?.user?.role}</p>
            <p><strong>Dashboard Access:</strong> All Features Enabled</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
