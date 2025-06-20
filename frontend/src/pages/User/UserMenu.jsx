import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

const UserMenu = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
  };

  return (
    <div className="admin-sidebar-glass">
      <h2 className="text-xl font-bold mb-6 text-white">FitTrack User Panel</h2>
      <ul className="space-y-4 text-white">
        <li><Link to="/user/dashboard/add-info"><i className="fas fa-id-card mr-2"></i> Personal Details</Link></li>
        <li><Link to="/user/dashboard/exercises"><i className="fas fa-dumbbell mr-2"></i> My Exercise</Link></li>
        <li><Link to="/user/dashboard/calorie"><i className="fas fa-utensils mr-2"></i> My Calorie Intake</Link></li>
        <li><Link to="/user/dashboard/diets"><i className="fas fa-apple-alt mr-2"></i> My Diet</Link></li>
        <li>
          <Link to="/auth/login" onClick={handleLogout} className="text-red-300 hover:text-red-500">
            <i className="fas fa-sign-out-alt mr-2"></i> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
