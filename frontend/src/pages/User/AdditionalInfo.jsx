import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AdditionalInfo = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const user = auth?.user || {};
  const userId = user?._id;

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

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/v1/auth/user-info/${userId}`, {
          headers: { Authorization: auth?.token },
        });

        const user = data.user;
        setFormData((prev) => ({
          ...prev,
          age: user.age || "",
          gender: user.gender || "",
          height: user.height || "",
          weight: user.weight || "",
          mobile: user.mobile || "",
          address: user.address || "",
          fitnessGoal: user.fitnessGoal || "",
          activityLevel: user.activityLevel || "",
          medicalConditions: user.medicalConditions || "",
          profilePicture: user.profilePicture || "",
        }));
      } catch (error) {
        console.error("❌ Failed to fetch user info", error);
      }
    };

    if (userId) fetchUserInfo();
  }, [userId]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImage = new FormData();
    formDataImage.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(`${API_URL}/api/v1/auth/upload-profile`, formDataImage, {
        headers: {
          Authorization: auth?.token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.imageUrl) {
        setFormData((prev) => ({
          ...prev,
          profilePicture: data.imageUrl,
        }));
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("❌ Image upload error:", error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${API_URL}/api/v1/auth/user/additional-info`, {
        ...formData,
        userId,
      },{
          headers: { Authorization: auth?.token },
        });

      alert("✅ Info saved!");
      navigate("/user/dashboard");
    } catch (error) {
      console.error("❌ Error saving info:", error);
      alert("Failed to save info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="additional-info-container">
      <h2>Additional Information</h2>

      {/* Profile Picture Upload Section */}
      <div className="profile-section">
        <div
          onClick={() => fileInputRef.current.click()}
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            backgroundColor: "#eee",
            cursor: "pointer",
            overflow: "hidden",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #ccc",
          }}
        >
          {formData.profilePicture ? (
            <img
              src={formData.profilePicture}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : uploading ? (
            <span>Uploading...</span>
          ) : (
            <span>Upload</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </div>

      <form onSubmit={handleSubmit} className="info-form">
        <label>Age</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />

        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Height (cm)</label>
        <input type="number" name="height" value={formData.height} onChange={handleChange} required />

        <label>Weight (kg)</label>
        <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />

        <label>Mobile</label>
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />

        <label>Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />

        <label>Fitness Goal</label>
        <select name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange} required>
          <option value="">Select Goal</option>
          <option value="maintain">maintain</option>
          <option value="mildLoss">mildLoss</option>
          <option value="extremeLoss">extremeLoss</option>
          <option value="gain">gain</option>
        </select>

        <label>Activity Level</label>
        <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} required>
          <option value="">Select Level</option>
          <option value="sedentary">Sedentary: little or no exercise</option>
          <option value="light">Light: exercise 1–3 times/week</option>
          <option value="moderate">Moderate: exercise 4–5 times/week</option>
          <option value="active">Active: daily exercise or intense exercise 3–4 times/week</option>
          <option value="veryActive">Very Active: intense exercise 6–7 times/week</option>
        </select>

        <label>Medical Conditions</label>
        <input
          type="text"
          name="medicalConditions"
          value={formData.medicalConditions}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AdditionalInfo;
