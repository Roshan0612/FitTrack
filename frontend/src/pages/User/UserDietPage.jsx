import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import UserMenu from "./UserMenu";
import "../../styles/UserDietPage.css";

const API_URL = import.meta.env.VITE_API_URL;

const UserDietPage = () => {
  const [auth] = useAuth();
  const userId = auth?.user?._id;
  const [diets, setDiets] = useState([]);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!userId) return;

    axios.get(`${API_URL}/api/v1/diet/assigned/${userId}`)
      .then((res) => setDiets(res.data || []))
      .catch((err) => console.error("Error loading diets:", err));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    axios.get(`${API_URL}/api/v1/auth/user-info/${userId}`, {
      headers: { Authorization: auth?.token },
    })
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error("Error loading user info:", err));
  }, [userId, auth?.token]);

  return (
    <div className="user-diet-bg">
      <div className="user-diet-overlay">
        {/* Hamburger for mobile */}
        <button className="mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>

        {/* Sidebar */}
        <aside className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
          <UserMenu />
        </aside>

        {/* Main Content */}
        <main className="diet-main-content">
          <h2 className="diet-title">My Assigned Diets</h2>
          <p className="text-center text-yellow-500 mb-4">
            <strong>Calorie Recommendation:</strong> {user?.calorieRecommendation ?? "Not available"} kcal/day
          </p>

          {diets.length === 0 ? (
            <p className="text-center text-red-500">No diets assigned yet.</p>
          ) : (
            <div className="diet-grid">
              {diets.map((diet) => (
                <div key={diet._id} className="diet-card">
                  {diet.gifUrl && <img src={diet.gifUrl} alt={diet.name} className="diet-image" />}
                  <h3>{diet.name}</h3>
                  <p>Category: {diet.category}</p>
                  <p>Protein: {diet.protein}g</p>
                  <p>Fat: {diet.fat}g</p>
                  <p>Carbs: {diet.carbs}g</p>
                  <p>Calories: {diet.calories} kcal</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserDietPage;
