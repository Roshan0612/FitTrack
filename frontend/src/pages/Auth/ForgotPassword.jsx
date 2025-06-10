import React, { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      console.log("📨 Sending forgot password request for:", email);

      const res = await axios.post(`${API_URL}/api/v1/auth/forgot-password`, {
        email,
      });

      console.log("✅ Server response:", res.data); // 🔍 Log full response
      setMessage(res.data.message);

    } catch (err) {
      console.error("❌ API error:", err.response?.data || err.message); // 🔍 Log detailed error
      setMessage(err.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgot}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <button type="submit">Send Reset Link</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
