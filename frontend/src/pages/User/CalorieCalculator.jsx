import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/Auth';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const CalorieCalculator = () => {
  const [user, setUser] = useState(null);
  const [auth] = useAuth();

  const fetchUserInfo = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/auth/user-info/${auth?.user?._id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      setUser(data.user); 
    } catch (error) {
      console.error('Failed to fetch user info:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (auth?.user?._id) {
      fetchUserInfo();
    }
  }, [auth]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {user?.name || 'User'}</h2>
      <p>
        <strong>Calorie Recommendation:</strong>{' '}
        {user?.calorieRecommendation ?? 'Not available'} kcal/day
      </p>
    </div>
  );
};

export default CalorieCalculator;
