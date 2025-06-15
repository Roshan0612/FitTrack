import React, { useEffect, useState } from 'react';
import UserMenu from './UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import { Link } from 'react-router-dom';

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
    <div className="flex">
      <UserMenu />
      <div className="flex-1 p-8">
        <div className="flex items-center mb-6">
          <img
            src={userData.profilePicture || "/user.jpg"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mr-6"
          />
          <div>
            <h1 className="text-3xl font-semibold">
              Welcome, <span className="text-red-500">{userData.name?.split(' ')[0] || "User"}</span>
            </h1>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>
        </div>
        <div className="bg-white p-6 shadow rounded-lg w-full max-w-lg">
          <p><strong>Age:</strong> {userData.age}</p>
          <p><strong>Gender:</strong> {userData.gender}</p>
          <p><strong>Height:</strong> {userData.height} cm</p>
          <p><strong>Weight:</strong> {userData.weight} kg</p>
          <p><strong>Mobile:</strong> {userData.mobile}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>Fitness Goal:</strong> {userData.fitnessGoal}</p>
          <p><strong>Activity Level:</strong> {userData.activityLevel}</p>
          <p><strong>Medical Conditions:</strong> {userData.medicalConditions || "None"}</p>

          <div className="mt-4">
            <Link to="/user/dashboard/add-info" className="text-blue-500 hover:underline">Edit Your Info</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;
