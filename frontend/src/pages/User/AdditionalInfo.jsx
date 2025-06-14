import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useAuth } from "../../context/Auth";

const API_URL = import.meta.env.VITE_API_URL;

const AdditionalInfo = () => {
  const webcamRef = useRef(null);
  
  
  
  const authRaw = useAuth();
  const auth = Array.isArray(authRaw) ? authRaw[0] : authRaw;
  const userId = auth?.user?._id;
  
console.log("useAuth() returns:", useAuth());



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

  const [imgSrc, setImgSrc] = useState(null);
  const [file, setFile] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [useWebcam, setUseWebcam] = useState(false);
  const [editingPhoto, setEditingPhoto] = true; // true = show buttons

  if (!userId) {
    return <p>Please log in again to fill your details.</p>;
  }

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setFile(null);
    setShowOptions(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImgSrc(null);
    setUseWebcam(false); // Stop webcam
    setShowOptions(false);
  };

  const uploadPhoto = async () => {
    const formDataUpload = new FormData();

    if (file) {
      formDataUpload.append("image", file);
    } else if (imgSrc) {
      const res = await fetch(imgSrc);
      const blob = await res.blob();
      formDataUpload.append("image", blob, "webcam.jpg");
    } else {
      alert("No image selected");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/upload`, formDataUpload);
      const uploadedPath = response.data.filePath;
      const fullUrl = `${API_URL}/uploads/${uploadedPath}`;
      setFormData((prev) => ({ ...prev, profilePicture: fullUrl }));
      setEditingPhoto(false); // Hide buttons after upload
      alert("Uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    }
  };

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
      <h2>Additional Information</h2>

      <div className="profile-section">
        <div
          className="profile-picture-circle"
          onClick={() => {
            setShowOptions(!showOptions);
            setEditingPhoto(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <img
            src={
              formData.profilePicture ||
              imgSrc ||
              (file && URL.createObjectURL(file)) ||
              "/default-profile.png"
            }
            alt="Profile"
            className="profile-img"
            style={{ width: "160px", height: "160px", borderRadius: "50%" }}
          />
        </div>

        {editingPhoto && (
          <>
            {showOptions && (
              <div className="option-modal" style={{ marginTop: "10px" }}>
                <button
                  onClick={() => {
                    setUseWebcam(true);
                    setShowOptions(false);
                  }}
                >
                  📸 Take Photo
                </button>
                <button
                  onClick={() => {
                    setUseWebcam(false); // Stop webcam
                    document.getElementById("fileInput").click();
                  }}
                >
                  📁 Upload Photo
                </button>
                <button onClick={() => setShowOptions(false)}>❌ Cancel</button>
              </div>
            )}

            {useWebcam && (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={160}
                  height={160}
                  className="webcam-circle"
                />
                <button onClick={capture}>Capture Photo</button>
              </>
            )}

            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <button onClick={uploadPhoto}>Upload</button>
          </>
        )}
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
          <option value="Slim">Slim</option>
          <option value="Fit">Fit</option>
          <option value="Muscular">Muscular</option>
        </select>

        <label>Activity Level</label>
        <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} required>
          <option value="">Select Level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label>Medical Conditions</label>
        <input type="text" name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} />

        <label>Profile Picture URL</label>
        <input type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdditionalInfo;
