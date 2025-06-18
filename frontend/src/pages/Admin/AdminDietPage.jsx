// src/pages/Admin/AdminDietPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDietPage = () => {
  const { userId } = useParams();
  const [category, setCategory] = useState("veg");
  const [diets, setDiets] = useState([]);
  const [assigned, setAssigned] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/v1/diet/${category}`).then((res) => {
      setDiets(res.data);
    });
  }, [category]);

  useEffect(() => {
    axios.get(`${API_URL}/api/v1/diet/assigned/${userId}`).then((res) => {
      setAssigned(res.data.map((diet) => diet._id));
    });
  }, [userId]);

  const toggleAssignment = (dietId) => {
    axios.post(`${API_URL}/api/v1/diet/assign`, { userId, dietId }).then(() => {
      setAssigned((prev) =>
        prev.includes(dietId)
          ? prev.filter((id) => id !== dietId)
          : [...prev, dietId]
      );
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Assign Diets to User</h2>

      <div className="flex gap-2 mb-4">
        {["veg", "non-veg", "vegan"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1 rounded ${
              category === cat ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {diets.map((diet) => (
          <div key={diet._id} className="border p-4 rounded shadow">
            <img src={diet.gifUrl} alt={diet.name} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="font-bold">{diet.name}</h3>
            <p>Protein: {diet.protein}g</p>
            <p>Fat: {diet.fat}g</p>
            <p>Carbs: {diet.carbs}g</p>
            <p>Calories: {diet.calories}kcal</p>
            <button
              onClick={() => toggleAssignment(diet._id)}
              className={`mt-2 w-full py-1 rounded ${
                assigned.includes(diet._id) ? "bg-red-500" : "bg-blue-500"
              } text-white`}
            >
              {assigned.includes(diet._id) ? "Unassign" : "Assign"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDietPage;
