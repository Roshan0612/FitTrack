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

  if (!auth?.user || auth.user.role !== 'admin') {
    return (
      <div className="p-4 text-red-600">
        <p>⛔ Access Denied. Admins only.</p>
      </div>
    );
  }

  return (
    <div className="relative w-64 min-h-screen shadow-md overflow-hidden">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dswa5docr/image/upload/v1750358113/pexels-tima-miroshnichenko-5327467_e3ctrx.jpg')",
        }}
      ></div>

      {/* Menu Content */}
{/* <<<<<<< HEAD */}
      <div className="relative z-10 p-4 text-white">
        <h2 className="text-xl font-bold mb-6">FitTrack Admin Panel</h2>
        <ul className="space-y-4">
          <li><Link to="/admin/dashboard/users" className="hover:text-blue-300">All Users</Link></li>
          <li><Link to="/admin/dashboard/createsubscription" className="hover:text-blue-300">Create Subscription</Link></li>
          <li><Link to="/admin/dashboard/subscriptionlist" className="hover:text-blue-300">All Subscriptions List</Link></li>
          <li><Link to="/admin/dashboard/create-diet" className="hover:text-blue-300">Create Diet</Link></li>
          <li><Link to="/admin/dashboard/create-exercise" className="hover:text-blue-300">Create Workout</Link></li>
          <li><Link to="/admin/dashboard/createcoupon" className="hover:text-blue-300">Create Coupon</Link></li>
          <li><Link to="/admin/dashboard/transactions" className="hover:text-blue-300">View All Transactions</Link></li>
          <li>
            <Link
              className="text-red-300 hover:text-red-500"
              to="/auth/login"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default AdminMenu;
