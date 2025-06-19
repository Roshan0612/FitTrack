import React, { useEffect, useState } from 'react';
import UserMenu from './UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import { Link } from 'react-router-dom';
import '../../styles/UserDashboard.css';

const API_URL = import.meta.env.VITE_API_URL;

const Userdashboard = () => {
  const [auth] = useAuth();
  const [userData, setUserData] = useState(null);

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
        console.error("❌ Failed to fetch user info", error);
      }
    };

    if (auth?.user?._id) fetchUserInfo();
  }, [auth?.user?._id]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <UserMenu />
      </div>

      <div className="user-dashboard-container">
        <div className="profile-banner" />

        <div className="profile-image-wrapper">
          <img src={userData.profilePicture || "/user.jpg"} alt="Profile" />
        </div>

        <div className="user-info-card">
          <div className="user-info-text">
            <h1>{userData.name}</h1>
            <p>Fitness Enthusiast</p>
            <p>{userData.address || "Location not added"}</p>
          </div>

          <div className="user-details">
            <p><strong>Age:</strong> {userData.age}</p>
            <p><strong>Gender:</strong> {userData.gender}</p>
            <p><strong>Height:</strong> {userData.height} cm</p>
            <p><strong>Weight:</strong> {userData.weight} kg</p>
            <p><strong>Mobile:</strong> {userData.mobile}</p>
            <p><strong>Fitness Goal:</strong> {userData.fitnessGoal}</p>
            <p><strong>Activity Level:</strong> {userData.activityLevel}</p>
            <p><strong>Medical Conditions:</strong> {userData.medicalConditions || "None"}</p>
            <Link to="/user/dashboard/add-info" className="edit-link">Edit Your Info</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;
