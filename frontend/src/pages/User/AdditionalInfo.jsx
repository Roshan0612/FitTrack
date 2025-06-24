import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import "../../styles/AdditionalInfo.css";
import { toast } from "react-toastify";

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
        console.error("Failed to fetch user info", error);
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
      console.error("Image upload error:", error);
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
      }, {
        headers: { Authorization: auth?.token },
      });

      
      toast.success("Info saved!");

      navigate("/user/dashboard");
    } catch (error) {
      console.error("Error saving info:", error);
      alert("Failed to save info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="info-page-container">
      <div className="info-overlay">
        <UserMenu />
        <div className="info-content">
          <h2 className="info-title">Update Your Details</h2>

          <div className="info-card">
            <div className="profile-upload" onClick={() => fileInputRef.current.click()}>
              {formData.profilePicture ? (
                <img src={formData.profilePicture} alt="Profile" className="profile-image" />
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
              className="hidden-input"
              onChange={handleImageUpload}
            />

            <form onSubmit={handleSubmit} className="info-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Height (cm)</label>
                  <input type="number" name="height" value={formData.height} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Mobile</label>
                  <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Fitness Goal</label>
                  <select name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange} required>
                    <option value="">Select Goal</option>
                    <option value="maintain">Maintain</option>
                    <option value="mildLoss">Mild Loss</option>
                    <option value="extremeLoss">Extreme Loss</option>
                    <option value="gain">Gain</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Activity Level</label>
                  <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} required>
                    <option value="">Select Level</option>
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="active">Active</option>
                    <option value="veryActive">Very Active</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Medical Conditions</label>
                <input
                  type="text"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? "Saving..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
