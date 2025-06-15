import React from 'react';
import AdminMenu from './AdminMenu';
import { useAuth } from '../../context/Auth';

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <div className="flex">
      <AdminMenu />
      <div className="flex-1 p-8">
        <div className="flex items-center mb-6">
          <img
            src="/admin.jpg"
            alt="Admin Profile"
            className="w-20 h-20 rounded-full object-cover mr-6"
          />
          <div>
            <h1 className="text-3xl font-semibold">
              Welcome, <span className="text-red-500">{auth?.user?.name || 'Admin'}</span>
            </h1>
            <p className="text-sm text-gray-500">You have full access to manage the FitTrack system.</p>
          </div>
        </div>

        <div className="bg-white p-6 shadow rounded-lg w-full max-w-lg">
          <p><strong>Admin Name:</strong> {auth?.user?.name}</p>
          <p><strong>Email:</strong> {auth?.user?.email}</p>
          <p><strong>Role:</strong> {auth?.user?.role}</p>
          <p><strong>Dashboard Access:</strong> All Features Enabled</p>

          <div className="mt-4">
            <a href="#" className="text-blue-500 hover:underline">Manage Users & Submissions</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
