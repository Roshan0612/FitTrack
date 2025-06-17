import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/CreateExercisePage.css'; // keep for form styles
import AdminMenu from './AdminMenu';

const API_URL = import.meta.env.VITE_API_URL;

const CreateExercisePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    gifUrl: '',
    targetGender: '',
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/v1/exercises/add`, formData);
      alert('✅ Exercise created successfully!');
      setFormData({ name: '', description: '', gifUrl: '', targetGender: '' });
    } catch (err) {
      console.error(err);
      alert('❌ Failed to create exercise');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
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

      {/* Main form content */}
      <div className="flex-1 p-4 md:p-10">
        <div className="form-card">
          <h2>Create New Exercise</h2>
          <form onSubmit={handleSubmit}>
            <label>Exercise Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />

            <label>GIF URL</label>
            <input type="text" name="gifUrl" value={formData.gifUrl} onChange={handleChange} required />

            <label>Target Gender</label>
            <select name="targetGender" value={formData.targetGender} onChange={handleChange} required>
              <option value="">-- Select Gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <button type="submit">Create Exercise</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateExercisePage;
