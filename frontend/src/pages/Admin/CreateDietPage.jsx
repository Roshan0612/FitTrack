// src/pages/Admin/CreateDietPage.jsx
import React, { useState } from "react";
import axios from "axios";

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
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create New Diet</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Diet Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="gifUrl"
          placeholder="GIF URL"
          value={form.gifUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>
        <input
          type="number"
          name="protein"
          placeholder="Protein (g)"
          value={form.protein}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="fat"
          placeholder="Fat (g)"
          value={form.fat}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="carbs"
          placeholder="Carbs (g)"
          value={form.carbs}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={form.calories}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Create Diet
        </button>
      </form>
    </div>
  );
};

export default CreateDietPage;
