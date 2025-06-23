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
        <p>Access Denied. Admins only.</p>
      </div>
    );
  }

  return (
    <div className="relative w-64 min-h-screen shadow-md overflow-hidden">
      
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dswa5docr/image/upload/v1750358113/pexels-tima-miroshnichenko-5327467_e3ctrx.jpg')",
        }}
      ></div>

      
      <div className="admin-sidebar-glass">
  <h2 className="text-xl font-bold mb-6 text-white">FitTrack Admin Panel</h2>
  <ul className="space-y-4 text-white">
    <li><Link to="/admin/dashboard/users"><i className="fas fa-users mr-2"></i> All Users</Link></li>
    <li><Link to="/admin/dashboard/createsubscription"><i className="fas fa-plus-circle mr-2"></i> Create Subscription</Link></li>
    <li><Link to="/admin/dashboard/subscriptionlist"><i className="fas fa-list mr-2"></i> All Subscriptions</Link></li>
    <li><Link to="/admin/dashboard/create-diet"><i className="fas fa-apple-alt mr-2"></i> Create Diet</Link></li>
    <li><Link to="/admin/dashboard/create-exercise"><i className="fas fa-dumbbell mr-2"></i> Create Workout</Link></li>
    <li><Link to="/admin/dashboard/createcoupon"><i className="fas fa-tag mr-2"></i> Create Coupon</Link></li>
    <li><Link to="/admin/dashboard/transactions"><i className="fas fa-money-check-alt mr-2"></i> Transactions</Link></li>
    <li><Link to="/auth/login" onClick={handleLogout} className="text-red-300 hover:text-red-500"><i className="fas fa-sign-out-alt mr-2"></i> Logout</Link></li>
  </ul>
</div>

    </div>
  );
};

export default AdminMenu;
