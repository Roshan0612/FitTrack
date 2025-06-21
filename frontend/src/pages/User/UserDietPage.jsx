// src/pages/User/UserDietPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import UserMenu from "./UserMenu";
import "../../styles/UserDietPage.css"; // Use dedicated CSS for diets

const API_URL = import.meta.env.VITE_API_URL;

const UserDietPage = () => {
  const [auth] = useAuth();
  const userId = auth?.user?._id;
  const [diets, setDiets] = useState([]);
  const [user, setUser] = useState(null);


  useEffect(() => {
    if (!userId) return;

    const fetchAssignedDiets = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/diet/assigned/${userId}`);
        setDiets(res.data || []);
      } catch (err) {
        console.error("Error fetching assigned diets:", err);
      }
    };

    fetchAssignedDiets();
  }, [userId]);
  

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
      setUser(data.user); // Assuming backend returns { user: { name, calorieRecommendation, ... } }
    } catch (error) {
      console.error('❌ Failed to fetch user info:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (auth?.user?._id) {
      fetchUserInfo();
    }
  }, [auth]);

  return (
    <div className="user-diet-bg">
      <div className="user-diet-overlay">
        <aside className="sidebar-wrapper">
          <UserMenu />
        </aside>

        <main className="diet-main-content">
          <h2 className="diet-title">My Assigned Diets</h2>
          <p className="flex  justify-center min-h-screen text-yellow-500 ">
        <span ><strong>Calorie Recommendation :  </strong>{'   '}
        {user?.calorieRecommendation ?? 'Not available'} kcal/day
        </span>
      </p>
          <div className="diet-grid">
            {diets.length === 0 ? (
              <p className="no-diet-msg">No diets assigned yet.</p>
            ) : (
              diets
                .filter((diet) => diet && diet.name)
                .map((diet) => (
                  <div key={diet._id} className="diet-card">
                    {diet?.gifUrl && (
                      <img src={diet.gifUrl} alt={diet.name} className="diet-image" />
                    )}
                    <h3 className="diet-name">{diet.name}</h3>
                    <p>Category: {diet.category}</p>
                    <p>Protein: {diet.protein}g</p>
                    <p>Fat: {diet.fat}g</p>
                    <p>Carbs: {diet.carbs}g</p>
                    <p>Calories: {diet.calories} kcal</p>
                  </div>
                ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDietPage;
