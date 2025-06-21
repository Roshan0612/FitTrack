import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/Signup.css";

const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/v1/auth/register`, {
        name,
        email,
        password,
      });
      if (res.data.message) {
        toast.success(res.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network or server error");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Start your fitness journey with FitTrack</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="signup-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
          />
          <button type="submit" className="signup-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
