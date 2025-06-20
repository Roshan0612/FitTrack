import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import AdminMenu from "./AdminMenu";
import "../../styles/IndivisualUserDetail.css";
import "../../styles/AdminDashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

const IndivisualUserDetail = () => {
  const { userId } = useParams();
  const [auth] = useAuth();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expiryCountdown, setExpiryCountdown] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/auth/admin/users/${userId}`, {
          headers: { Authorization: auth?.token },
        });

        const fetchedUser = res.data.user;
        setUser(fetchedUser);

        if (fetchedUser.subscriptionExpiry) {
          updateCountdown(fetchedUser.subscriptionExpiry);
        }
      } catch (error) {
        console.error("Error fetching user details:", error.response?.data || error.message);
      }
    };

    fetchUser();
  }, [userId, auth?.token]);

  const updateCountdown = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const interval = setInterval(() => {
      const now = new Date();
      const distance = expiry - now;

      if (distance < 0) {
        clearInterval(interval);
        setExpiryCountdown("Expired");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setExpiryCountdown(`${days}d ${hours}h ${minutes}m left`);
    }, 1000);
  };

  if (!user) {
    return <p className="text-center mt-10 text-white">Loading user info...</p>;
  }

  return (
    <div className="admin-dashboard-bg">
      <div className="flex bg-overlay min-h-screen relative">
        {/* Sidebar Toggle Button */}
        <button
          className="absolute top-4 left-4 z-20 md:hidden bg-white bg-opacity-20 text-white px-3 py-2 rounded backdrop-blur-sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        {/* Sidebar */}
        <div
          className={`fixed md:static z-10 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-10 text-white">
          <div className="transparent-card max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">{user.name}'s Details</h2>

            <img
              src={user.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="profile-pic"
            />

            <div className="user-detail-grid text-black">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Height:</strong> {user.height} cm</p>
              <p><strong>Weight:</strong> {user.weight} kg</p>
              <p><strong>Mobile:</strong> {user.mobile}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Fitness Goal:</strong> {user.fitnessGoal}</p>
              <p><strong>Activity Level:</strong> {user.activityLevel}</p>
              <p><strong>Medical Conditions:</strong> {user.medicalConditions || "None"}</p>
              <p><strong>Subscription Taken:</strong> {user.subscriptionTaken ? "Yes" : "No"}</p>
              {user.subscriptionTaken && user.subscriptionExpiry && (
                <p><strong>Expires In:</strong> {expiryCountdown}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndivisualUserDetail;
