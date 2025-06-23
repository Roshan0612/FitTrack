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
        console.error("Failed to fetch user info", error);
      }
    };

    if (auth?.user?._id) fetchUserInfo();
  }, [auth?.user?._id]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard-bg">
      <div className="flex bg-overlay">
        <UserMenu />
        <div className="flex-1 p-8 text-white">
          <div className="flex items-center mb-6">
            <div>
              <h1 className="text-3xl font-semibold">
                Welcome, <span className="text-red-500">{userData.name}</span>
              </h1>
              <p className="text-sm text-gray-200">Track your fitness journey here.</p>
            </div>
          </div>

          <div className="transparent-card bg-white bg-opacity-80 p-6 shadow rounded-lg w-full max-w-xl text-black">
            <div className="flex flex-col items-center">
              <img
                src={userData.profilePicture || "/user.jpg"}
                alt="Profile"
                className="w-28 h-28 rounded-full mb-4 object-cover border border-gray-300"
              />
              <h2 className="text-xl font-bold mb-2">{userData.name}</h2>
              <p className="text-gray-700">{userData.address || "Location not added"}</p>
            </div>

            <div className="mt-6 space-y-2">
              <p><strong>Age:</strong> {userData.age}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
              <p><strong>Height:</strong> {userData.height} cm</p>
              <p><strong>Weight:</strong> {userData.weight} kg</p>
              <p><strong>Mobile:</strong> {userData.mobile}</p>
              <p><strong>Fitness Goal:</strong> {userData.fitnessGoal}</p>
              <p><strong>Activity Level:</strong> {userData.activityLevel}</p>
              <p><strong>Medical Conditions:</strong> {userData.medicalConditions || "None"}</p>
              <Link to="/user/dashboard/add-info" className="text-blue-600 hover:underline block mt-4">✏️ Edit Your Info</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;
