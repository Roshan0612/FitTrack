// src/pages/User/UserDietPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";

const API_URL = import.meta.env.VITE_API_URL;

const UserDietPage = () => {
  const [auth] = useAuth();
  const userId = auth?.user?._id;
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    if (!userId) return;
    const fetchAssignedDiets = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/diet/assigned/${userId}`);
        setDiets(res.data);
      } catch (err) {
        console.error("Error fetching assigned diets:", err);
      }
    };

    fetchAssignedDiets();
  }, [userId]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Assigned Diets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {diets.length === 0 ? (
          <p>No diets assigned yet.</p>
        ) : (
          diets.map((diet) => (
            <div key={diet._id} className="border rounded p-3 shadow">
              <img src={diet.gifUrl} alt={diet.name} className="w-full h-40 object-cover rounded" />
              <h3 className="font-semibold text-lg mt-2">{diet.name}</h3>
              <p>Category: {diet.category}</p>
              <p>Protein: {diet.protein}g</p>
              <p>Fat: {diet.fat}g</p>
              <p>Carbs: {diet.carbs}g</p>
              <p>Calories: {diet.calories} kcal</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDietPage;
