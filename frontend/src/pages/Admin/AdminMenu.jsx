import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import {
  BadgePlus,
  Dumbbell,
  LayoutDashboard,
  LogOut,
  Receipt,
  ShieldCheck,
  Sparkles,
  Table2,
  Users,
} from 'lucide-react';

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
      <div className="flex min-h-screen w-72 items-center justify-center border-r border-white/10 bg-zinc-950 px-6 text-sm text-red-300">
        <p>Access denied. Admins only.</p>
      </div>
    );
  }

  return (
    <aside className="admin-sidebar-shell">
      <div className="admin-sidebar-shell__inner">
        <div className="flex items-start gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
            <Sparkles className="size-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/40">FitTrack Admin</p>
            <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white">Operations panel</h2>
            <p className="mt-1 text-xs leading-5 text-white/48">Manage members, plans, and content from one premium workspace.</p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-sm font-semibold text-white">
              {auth?.user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{auth?.user?.name || 'Admin'}</p>
              <p className="text-xs uppercase tracking-[0.24em] text-emerald-300/80">System admin</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-white/45">
            <ShieldCheck className="size-3.5 text-emerald-300" />
            Protected access enabled
          </div>
        </div>

        <nav className="mt-6 space-y-2">
          <Link to="/admin/dashboard" className="admin-nav-link">
            <LayoutDashboard className="size-4" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/dashboard/users" className="admin-nav-link">
            <Users className="size-4" />
            <span>All Users</span>
          </Link>
          <Link to="/admin/dashboard/createsubscription" className="admin-nav-link">
            <BadgePlus className="size-4" />
            <span>Create Subscription</span>
          </Link>
          <Link to="/admin/dashboard/subscriptionlist" className="admin-nav-link">
            <Table2 className="size-4" />
            <span>Subscriptions</span>
          </Link>
          <Link to="/admin/dashboard/create-diet" className="admin-nav-link">
            <Dumbbell className="size-4" />
            <span>Create Diet</span>
          </Link>
          <Link to="/admin/dashboard/create-exercise" className="admin-nav-link">
            <Dumbbell className="size-4" />
            <span>Create Workout</span>
          </Link>
          <Link to="/admin/dashboard/createcoupon" className="admin-nav-link">
            <BadgePlus className="size-4" />
            <span>Create Coupon</span>
          </Link>
          <Link to="/admin/dashboard/transactions" className="admin-nav-link">
            <Receipt className="size-4" />
            <span>Transactions</span>
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

export default AdminMenu;
