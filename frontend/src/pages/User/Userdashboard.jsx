import React, { useEffect, useState } from 'react';
import UserMenu from './UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import { Link } from 'react-router-dom';
import '../../styles/UserDashboard.css';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Apple, Dumbbell, UserRound } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const Userdashboard = () => {
  const [auth] = useAuth();
  const [userData, setUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // New toggle state
  const [profileImageError, setProfileImageError] = useState(false);

  const quickStats = [
    { label: 'Workout score', value: '84%', icon: Dumbbell },
    { label: 'Diet streak', value: '12 days', icon: Apple },
    { label: 'Weekly activity', value: '5 sessions', icon: Activity },
  ];

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/v1/auth/user-info/${auth?.user?._id}`, {
          headers: {
            Authorization: auth?.token,
          },
        });
        setUserData(data.user);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };

    if (auth?.user?._id) fetchUserInfo();
  }, [auth?.user?._id]);

  useEffect(() => {
    setProfileImageError(false);
  }, [userData?.profilePicture]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard-bg">
      <div className="bg-overlay relative min-h-screen overflow-x-hidden lg:grid lg:grid-cols-[290px_minmax(0,1fr)]">
        
        {/* Mobile Hamburger */}
        <button className="user-hamburger md:hidden absolute top-4 left-4 text-white text-2xl z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>

        {/* Sidebar */}
        <div className={`transition-transform duration-300 ease-in-out z-40 lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 w-72 lg:static lg:w-[290px] lg:translate-x-0 lg:transform-none`}>
          <UserMenu />
        </div>

        {/* Main Content */}
        <div className="min-w-0 px-4 py-16 sm:px-6 md:py-10 lg:px-8 xl:px-10">
          <div className="mx-auto max-w-7xl space-y-6 text-white">
            <div className="transparent-card flex flex-col gap-6 p-6 md:p-8 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-2xl min-w-0">
                <p className="text-xs uppercase tracking-[0.34em] text-emerald-300/80">Member dashboard</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                  Welcome, <span className="text-emerald-300">{userData.name}</span>
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">Track your fitness journey with a cleaner, more premium portal experience.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[520px] xl:max-w-[560px]">
                {quickStats.map((item) => (
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

            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div className="transparent-card min-w-0 self-start p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-emerald-400/20 bg-white/5 ring-4 ring-emerald-400/20">
                    {!profileImageError && userData.profilePicture ? (
                      <img
                        src={userData.profilePicture}
                        alt="Profile"
                        className="h-full w-full object-cover"
                        onError={() => setProfileImageError(true)}
                      />
                    ) : (
                      <span className="text-2xl font-semibold tracking-[-0.04em] text-emerald-300">
                        {userData.name?.[0]?.toUpperCase() || 'M'}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">Member profile</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">{userData.name}</h2>
                    <p className="mt-1 text-sm text-white/60">{userData.address || 'Location not added'}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Age</p>
                    <p className="mt-2 text-lg font-medium">{userData.age || 'Not set'}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Gender</p>
                    <p className="mt-2 text-lg font-medium">{userData.gender || 'Not set'}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Height</p>
                    <p className="mt-2 text-lg font-medium">{userData.height ? `${userData.height} cm` : 'Not set'}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Weight</p>
                    <p className="mt-2 text-lg font-medium">{userData.weight ? `${userData.weight} kg` : 'Not set'}</p>
                  </div>
                </div>

                <Link
                  to="/user/dashboard/add-info"
                  className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-emerald-300/20 bg-gradient-to-r from-emerald-300 via-emerald-400 to-lime-300 px-4 text-sm font-semibold !text-zinc-950 shadow-[0_18px_40px_rgba(16,185,129,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(16,185,129,0.3)]"
                >
                  Edit your info
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>

              <div className="transparent-card min-w-0 self-start p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">Journey overview</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Fitness profile</h3>
                  </div>
                  <UserRound className="size-5 text-emerald-300" />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Mobile</p>
                    <p className="mt-2 text-lg font-medium">{userData.mobile || 'Not set'}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Fitness goal</p>
                    <p className="mt-2 text-lg font-medium">{userData.fitnessGoal || 'Not set'}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Activity level</p>
                    <p className="mt-2 text-lg font-medium">{userData.activityLevel || 'Not set'}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">Medical conditions</p>
                    <p className="mt-2 text-lg font-medium">{userData.medicalConditions || 'None'}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/8 p-4 text-sm leading-7 text-white/70">
                  <p className="font-medium text-white">Next step</p>
                  <p className="mt-1">Complete your profile to unlock more accurate program and diet recommendations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;
