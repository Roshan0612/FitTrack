import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/CreateExercisePage.css'; // Keep for additional form styling
import '../../styles/AdminDashboard.css'; // Reuse global glass/bg styles
import AdminMenu from './AdminMenu';

const API_URL = import.meta.env.VITE_API_URL;

const CreateExercisePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    gifUrl: '',
    targetGender: '',
  });

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
        <div className={`fixed md:static z-10 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <AdminMenu />
        </div>

        {/* Form Content */}
        <div className="flex-1 p-6 md:p-10 flex flex-col justify-center items-center text-white">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-semibold">🏋️ Create New Exercise</h1>
            <p className="text-sm text-gray-200">Add a custom workout to your system</p>
          </div>

          <div className="transparent-card w-full max-w-xl bg-white bg-opacity-80 text-black p-6 md:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-medium mb-1">Exercise Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="E.g. Push Ups"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the workout..."
                  required
                  rows={3}
                />
              </div>

              <div>
                <label className="block font-medium mb-1">GIF URL</label>
                <input
                  type="text"
                  name="gifUrl"
                  value={formData.gifUrl}
                  onChange={handleChange}
                  placeholder="Link to a GIF"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Target Gender</label>
                <select
                  name="targetGender"
                  value={formData.targetGender}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Gender --</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
              >
                Create Exercise
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExercisePage;
