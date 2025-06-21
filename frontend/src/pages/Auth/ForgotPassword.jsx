import React, { useState } from "react";
import axios from "axios";
import "../../styles/ForgotPassword.css"; // Make sure this path is correct

const API_URL = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/v1/auth/forgot-password`, { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="forgot-container">
      <div>
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgot}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="forgot-btn">Send Reset Link</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
