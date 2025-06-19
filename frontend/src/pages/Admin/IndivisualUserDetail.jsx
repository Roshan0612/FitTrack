import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import AdminMenu from "./AdminMenu";
import "../../styles/IndivisualUserDetail.css";

const API_URL = import.meta.env.VITE_API_URL;

const IndivisualUserDetail = () => {
  const { userId } = useParams();
  const [auth] = useAuth();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [expiryCountdown, setExpiryCountdown] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/auth/admin/users/${userId}`, {
          headers: {
            Authorization: auth?.token,
          },
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

  if (!user) return <p>Loading...</p>;

  return (
    <div className="page-container">
      <div className="admin-menu-desktop">
        <AdminMenu />
      </div>

      <div className="admin-menu-mobile">
        <button onClick={() => setShowMenu(!showMenu)} className="menu-toggle">
          ☰ Menu
        </button>
        {showMenu && <AdminMenu />}
      </div>

      <div className="user-detail">
        <div className="user-detail-container">
          <h2>{user.name}'s Details</h2>
          <img
            src={user.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-pic"
          />

          <div className="user-detail-grid">
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
  );
};

export default IndivisualUserDetail;
