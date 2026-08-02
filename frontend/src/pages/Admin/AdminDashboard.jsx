import React from 'react';
import AdminMenu from './AdminMenu';
import { useAuth } from '../../context/Auth';
import '../../styles/AdminDashboard.css';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Users, Dumbbell, BadgeCheck, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [auth] = useAuth();

  const statCards = [
    { label: 'Total users', value: '2,418', icon: Users },
    { label: 'Active plans', value: '18', icon: BadgeCheck },
    { label: 'Workout templates', value: '64', icon: Dumbbell },
    { label: 'System health', value: '98%', icon: BarChart3 },
  ];

  return (
    <div className="admin-dashboard-bg">
      <div className="bg-overlay min-h-screen overflow-x-hidden lg:grid lg:grid-cols-[290px_minmax(0,1fr)]">
        <AdminMenu />
        <div className="min-w-0 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
          <div className="mx-auto max-w-7xl space-y-6 text-white">
            <div className="transparent-card flex flex-col gap-6 p-6 md:p-8 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-2xl min-w-0">
                <p className="text-xs uppercase tracking-[0.34em] text-emerald-300/80">Admin dashboard</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                  Welcome back, <span className="text-emerald-300">{auth?.user?.name || 'Admin'}</span>
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                  You have full access to manage the FitTrack system. The layout is now structured like a high-end SaaS control center.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:min-w-[520px] xl:max-w-[560px]">
                {statCards.map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -4 }}
                    className="min-w-0 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                  >
                    <item.icon className="size-4 text-emerald-300" />
                    <p className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{item.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/45">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <div className="transparent-card min-w-0 self-start p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">Profile summary</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Operational overview</h2>
                  </div>
                  <Settings2 className="size-5 text-emerald-300" />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Admin Name</p>
                    <p className="mt-2 text-lg font-medium">{auth?.user?.name}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Email</p>
                    <p className="mt-2 text-lg font-medium">{auth?.user?.email}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Role</p>
                    <p className="mt-2 text-lg font-medium capitalize">{auth?.user?.role}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Dashboard Access</p>
                    <p className="mt-2 text-lg font-medium text-emerald-300">All features enabled</p>
                  </div>
                </div>
              </div>

              <div className="transparent-card min-w-0 self-start p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Quick actions</p>
                <div className="mt-5 space-y-3">
                  <Link to="/admin/dashboard/users" className="admin-nav-link bg-white/5">
                    <Users className="size-4" />
                    <span>Review all members</span>
                  </Link>
                  <Link to="/admin/dashboard/createsubscription" className="admin-nav-link bg-white/5">
                    <BadgeCheck className="size-4" />
                    <span>Create a subscription</span>
                  </Link>
                  <Link to="/admin/dashboard/create-exercise" className="admin-nav-link bg-white/5">
                    <Dumbbell className="size-4" />
                    <span>Create workout template</span>
                  </Link>
                  <Link to="/admin/dashboard/transactions" className="admin-nav-link bg-white/5">
                    <BarChart3 className="size-4" />
                    <span>Inspect transactions</span>
                  </Link>
                </div>

                <div className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/8 p-4 text-sm leading-7 text-white/70">
                  <p className="font-medium text-white">System note</p>
                  <p className="mt-2">All backend workflows remain unchanged. This page only upgrades hierarchy, spacing, and visual tone.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
