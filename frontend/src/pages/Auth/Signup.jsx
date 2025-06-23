import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/Signup.css";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/v1/auth/register`, formData);
      if (res.data.message) {
        toast.success(res.data.message);
        setFormData({ name: "", email: "", password: "" });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Network or server error");
    }
  };

  return (
    <div className="signup-container">
      
      <div>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="signup-btn ripple-btn">
            Create Account
          </button>
        </form>
        <p className="login-prompt">
          <span>Already have an account?</span>
          <Link to="/auth/login" className="login-link">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
