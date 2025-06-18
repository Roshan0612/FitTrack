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

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/v1/auth/user-info/${userId}`, {
          headers: { Authorization: auth?.token },
        });

        const user = data.user;
        setFormData({
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
        });
      } catch (error) {
        console.error("❌ Failed to fetch user info", error);
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      alert("❌ Please upload a valid image file.");
      return;
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      alert("❌ Image size must be less than 2MB.");
      return;
    }

    setFile(selectedFile);
    await handleImageUpload(selectedFile);
  };

  const handleImageUpload = async (imageFile) => {
    const formDataUpload = new FormData();
    setLoading(true);

    try {
      formDataUpload.append("image", imageFile);
      formDataUpload.append("userId", userId);

      const response = await axios.post(`${API_URL}/api/v1/auth/upload`, formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedPath = response.data.filePath;
      const fullUrl = `${API_URL}${uploadedPath}`;
      setFormData((prev) => ({ ...prev, profilePicture: fullUrl }));

      alert("✅ Uploaded successfully");
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
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

  const handleCircleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="additional-info-container">
      <h2>Additional Information</h2>

      <div className="profile-section">
        <div
          onClick={handleCircleClick}
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
          }}
        >
          {formData.profilePicture ? (
            <img
              src={formData.profilePicture}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span>+</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
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
