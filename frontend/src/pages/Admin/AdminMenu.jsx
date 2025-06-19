import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

const AdminMenu = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
  };

  // Protect menu: Only show if role is admin
  if (!auth?.user || auth.user.role !== 'admin') {
    return (
      <div className="p-4 text-red-600">
        <p>⛔ Access Denied. Admins only.</p>
      </div>
    );
  }

  return (
    <div className="w-64 bg-gray-100 min-h-screen p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6">FitTrack Admin Panel</h2>
      <ul className="space-y-4">
        <li><Link to="/admin/dashboard/users" className="text-gray-700 hover:text-blue-600">All Users</Link></li>
        <li><Link to="/admin/dashboard/createsubscription" className="text-gray-700 hover:text-blue-600">Create subscription</Link></li>
        <li><Link to="/admin/create-diet" className="text-gray-700 hover:text-blue-600">Create Diet</Link></li>
        <li><Link to="/admin/dashboard/create-exercise" className="text-gray-700 hover:text-blue-600">Create Workout</Link></li>
        <li><Link to="/admin/dashboard/createcoupon" className="text-gray-700 hover:text-blue-600">Create Coupon</Link></li>
        <li><Link to="/admin/dashboard/transactions" className="text-gray-700 hover:text-blue-600">view All trnsation</Link></li>
        <li>
          <Link
            className="nav-link text-red-500 hover:text-red-700"
            to="/auth/login"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
