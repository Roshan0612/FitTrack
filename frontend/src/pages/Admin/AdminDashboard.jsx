import React from 'react';
import AdminMenu from './AdminMenu';
import { useAuth } from '../../context/Auth';
import '../../styles/AdminDashboard.css'; // Make sure this is imported

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <div className="admin-dashboard-bg">
      <div className="flex bg-overlay">
        <AdminMenu />
        <div className="flex-1 p-8 text-white">
          <div className="flex items-center mb-6">

            


            <div>
              <h1 className="text-3xl font-semibold">
                Welcome, <span className="text-red-500">{auth?.user?.name || 'Admin'}</span>
              </h1>
              <p className="text-sm text-gray-200">You have full access to manage the FitTrack system.</p>
            </div>
          </div>

          <div className="bg-white bg-opacity-80 p-6 shadow rounded-lg w-full max-w-lg text-black">

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
    </div>
  );
};

export default AdminDashboard;
