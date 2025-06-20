import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminMenu from "./AdminMenu";
import "../../styles/AdminDietPage.css"; 
import "../../styles/AdminDashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDietPage = () => {
  const { userId } = useParams();
  const [category, setCategory] = useState("veg");
  const [diets, setDiets] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="admin-dashboard-bg">
      <div className="flex bg-overlay min-h-screen relative">
        {/* Mobile Sidebar Toggle */}
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
        <div className="flex-1 p-4 md:p-10">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Assign Diet Plans</h2>

          <div className="flex justify-center gap-3 mb-6">
            {["veg", "non-veg", "vegan"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-md font-semibold text-sm transition ${
                  category === cat
                    ? "bg-green-600 text-white"
                    : "bg-white bg-opacity-20 text-white hover:bg-opacity-40"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {diets.map((diet) => (
              <div key={diet._id} className="diet-card">
                <img
                  src={diet.gifUrl}
                  alt={diet.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="font-bold text-lg text-white">{diet.name}</h3>
                <p className="text-sm text-white/80">Protein: {diet.protein}g</p>
                <p className="text-sm text-white/80">Fat: {diet.fat}g</p>
                <p className="text-sm text-white/80">Carbs: {diet.carbs}g</p>
                <p className="text-sm text-white/80 mb-3">Calories: {diet.calories} kcal</p>
                <button
                  onClick={() => toggleAssignment(diet._id)}
                  className={`w-full py-2 rounded-md font-medium text-sm transition ${
                    assigned.includes(diet._id)
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {assigned.includes(diet._id) ? "Unassign" : "Assign"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDietPage;
