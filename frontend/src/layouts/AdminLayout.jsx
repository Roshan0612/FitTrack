import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../components/Header';

const AdminLayout = () => {
  return (
    <div className="admin-container">
        <>
        <Header />
        </>


      <div className="admin-body">
        <nav className="admin-sidebar">
          <ul>
            <li><Link to="/admin/users">Users</Link></li>
            <li><Link to="/admin/create-subscription">Create Subscription</Link></li>
            <li><Link to="/admin/create-diet">Create Diet</Link></li>
            <li><Link to="/admin/assign-workout">Assign Workout</Link></li>
          </ul>
        </nav>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>

      <footer className="admin-footer">
        <p>&copy; 2025 FitTrack Admin</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
