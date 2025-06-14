import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AdditionalInfo = () => {
  // ✅ Get userId from localStorage
  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth?.user?._id;

  // ❗ Handle case where user is not logged in
  if (!userId) {
    return <p>Please log in again to fill your details.</p>;
  }

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    mobile: "",
    address: "",
    fitnessGoal: "",
    activityLevel: "",
    medicalConditions: "",
    profilePicture: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/api/v1/auth/user/additional-info`, {
        ...formData,
        userId,
      });

      alert("✅ Additional info saved successfully!");
    } catch (error) {
      console.error("❌ Error saving info:", error);
      alert("Failed to save info.");
    }
  };

  return (
    <div className="additional-info-container">
       <div className="profile-picture-circle">
        <img
          src={formData.profilePicture || "https://via.placeholder.com/80"}
          alt="Profile"
          className="profile-img"
         />
      </div> 

      <h2>Additional Information</h2>
      <form onSubmit={handleSubmit}>
        <label>Age</label>
        <input
          type="number"
          name="age"
          min="1"
          max="100"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Height (cm)</label>
        <input
          type="number"
          name="height"
          min="50"
          max="250"
          value={formData.height}
          onChange={handleChange}
          required
        />

        <label>Weight (kg)</label>
        <input
          type="number"
          name="weight"
          min="1"
          max="200"
          value={formData.weight}
          onChange={handleChange}
          required
        />

        <label>Mobile</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>Fitness Goal</label>
        <select
          name="fitnessGoal"
          value={formData.fitnessGoal}
          onChange={handleChange}
          required
        >
          <option value="">Select Goal</option>
          <option value="Slim">Slim</option>
          <option value="Fit">Fit</option>
          <option value="Muscular">Muscular</option>
        </select>

        <label>Activity Level</label>
        <select
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
          required
        >
          <option value="">Select Level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label>Medical Conditions</label>
        <input
          type="text"
          name="medicalConditions"
          value={formData.medicalConditions}
          onChange={handleChange}
        />

        <label>Profile Picture URL</label>
        <input
          type="text"
          name="profilePicture"
          value={formData.profilePicture}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdditionalInfo;
