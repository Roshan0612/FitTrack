import React, { useState } from "react";
import axios from "axios";
import AdminMenu from "./AdminMenu";
import "../../styles/CreateDietPage.css";
import "../../styles/AdminDashboard.css"; 

const API_URL = import.meta.env.VITE_API_URL;

const CreateDietPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    gifUrl: "",
    category: "veg",
    protein: "",
    fat: "",
    carbs: "",
    calories: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/v1/diet/add`, form);
      alert("Diet created successfully!");
      setForm({
        name: "",
        gifUrl: "",
        category: "veg",
        protein: "",
        fat: "",
        carbs: "",
        calories: "",
      });
    } catch (err) {
      alert("Error creating diet.");
      console.error(err);
    }
  };

  return (
    <div className="admin-dashboard-bg">
      <div className="flex bg-overlay min-h-screen relative">
        
        <button
          className="absolute top-4 left-4 z-20 md:hidden bg-white bg-opacity-20 text-white px-3 py-2 rounded backdrop-blur-sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        
        <div
          className={`fixed md:static z-10 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <AdminMenu />
        </div>

        
        <div className="flex-1 p-6 md:p-10 flex flex-col justify-center items-center text-white">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-semibold">🥗 Create New Diet</h1>
            <p className="text-sm text-gray-200">Add a diet plan to the system.</p>
          </div>

          <div className="transparent-card w-full max-w-xl bg-white bg-opacity-80 text-black p-6 md:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-medium mb-1">Diet Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="E.g. High Protein Plan"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Image/GIF URL</label>
                <input
                  type="text"
                  name="gifUrl"
                  placeholder="GIF URL"
                  value={form.gifUrl}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Category</label>
                <select name="category" value={form.category} onChange={handleChange} required>
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Protein (g)</label>
                  <input
                    type="number"
                    name="protein"
                    placeholder="Protein"
                    value={form.protein}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Fat (g)</label>
                  <input
                    type="number"
                    name="fat"
                    placeholder="Fat"
                    value={form.fat}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    name="carbs"
                    placeholder="Carbs"
                    value={form.carbs}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Calories</label>
                  <input
                    type="number"
                    name="calories"
                    placeholder="Calories"
                    value={form.calories}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
              >
                Create Diet
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDietPage;
