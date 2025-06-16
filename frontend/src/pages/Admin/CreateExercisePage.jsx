import React, { useState } from 'react';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;

const CreateExercisePage = () => {
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
      await axios.post(`${API_URL}/api/v1/exercises/add`,formData);
      alert('✅ Exercise created successfully!');
      setFormData({ name: '', description: '', gifUrl: '', targetGender: '' });
    } catch (err) {
      console.error(err);
      alert('❌ Failed to create exercise');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>Create New Exercise</h2>
      <form onSubmit={handleSubmit}>
        <label>Exercise Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        /><br /><br />

        <label>GIF URL:</label>
        <input
          type="text"
          name="gifUrl"
          value={formData.gifUrl}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Target Gender:</label>
        <select
          name="targetGender"
          value={formData.targetGender}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select><br /><br />

        <button type="submit">Create Exercise</button>
      </form>
    </div>
  );
};

export default CreateExercisePage;
