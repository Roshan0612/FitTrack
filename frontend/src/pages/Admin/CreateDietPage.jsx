import React, { useState } from "react";
import axios from "axios";
import AdminMenu from "./AdminMenu";
import "../../styles/CreateDietPage.css"; // Add your CSS here

const API_URL = import.meta.env.VITE_API_URL;

const CreateDietPage = () => {
  const [form, setForm] = useState({
    name: "",
    gifUrl: "",
    category: "veg",
    protein: "",
    fat: "",
    carbs: "",
    calories: "",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/api/v1/diet/add`, form);
      alert("✅ Diet created successfully!");
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
      alert("❌ Error creating diet.");
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Toggle Button */}
      <button
        className="absolute top-4 left-4 z-20 md:hidden bg-black text-white px-3 py-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`fixed md:static z-10 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <AdminMenu />
      </div>

      {/* Main Form Section */}
      <div className="flex-1 p-4 md:p-10">
        <div className="form-card">
          <h2>Create New Diet</h2>
          <form onSubmit={handleSubmit}>
            <label>Diet Name</label>
            <input
              type="text"
              name="name"
              placeholder="Diet Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label>GIF URL</label>
            <input
              type="text"
              name="gifUrl"
              placeholder="GIF URL"
              value={form.gifUrl}
              onChange={handleChange}
              required
            />

            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>

            <label>Protein (g)</label>
            <input
              type="number"
              name="protein"
              placeholder="Protein"
              value={form.protein}
              onChange={handleChange}
              required
            />

            <label>Fat (g)</label>
            <input
              type="number"
              name="fat"
              placeholder="Fat"
              value={form.fat}
              onChange={handleChange}
              required
            />

            <label>Carbs (g)</label>
            <input
              type="number"
              name="carbs"
              placeholder="Carbs"
              value={form.carbs}
              onChange={handleChange}
              required
            />

            <label>Calories</label>
            <input
              type="number"
              name="calories"
              placeholder="Calories"
              value={form.calories}
              onChange={handleChange}
              required
            />

            <button type="submit">Create Diet</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDietPage;
