import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import {
  Apple,
  Dumbbell,
  Home,
  IdCard,
  LogOut,
  Sparkles,
} from 'lucide-react';

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
    <aside className="admin-sidebar-shell">
      <div className="admin-sidebar-shell__inner">
        <div className="flex items-start gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
            <Sparkles className="size-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/40">FitTrack Member</p>
            <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white">Member portal</h2>
            <p className="mt-1 text-xs leading-5 text-white/48">Track personal details, workouts, and nutrition in one place.</p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-sm font-semibold text-white">
              {auth?.user?.name?.[0]?.toUpperCase() || 'M'}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{auth?.user?.name || 'Member'}</p>
              <p className="text-xs uppercase tracking-[0.24em] text-emerald-300/80">Active profile</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 space-y-2">
          <Link to="/user/dashboard" className="admin-nav-link">
            <Home className="size-4" />
            <span>Dashboard</span>
          </Link>
          <Link to="/user/dashboard/add-info" className="admin-nav-link">
            <IdCard className="size-4" />
            <span>Personal Details</span>
          </Link>
          <Link to="/user/dashboard/exercises" className="admin-nav-link">
            <Dumbbell className="size-4" />
            <span>My Exercise</span>
          </Link>
          <Link to="/user/dashboard/diets" className="admin-nav-link">
            <Apple className="size-4" />
            <span>My Diet</span>
          </Link>
          <Link to="/" className="admin-nav-link">
            <Sparkles className="size-4" />
            <span>Go To Home</span>
          </Link>
        </nav>

        <Link to="/auth/login" onClick={handleLogout} className="admin-logout-link">
          <LogOut className="size-4" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default UserMenu;
