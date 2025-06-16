import { useState } from "react";
import axios from 'axios'
import {  toast } from 'react-toastify';
// import MainLayout from "../../layouts/MainLayout";
const API_URL = import.meta.env.VITE_API_URL;
const Signup = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
    const res = await axios.post(`${API_URL}/api/v1/auth/register`, { name, email, password });
    if (res.data.message) {
      toast.success(res.data.message);
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    console.error(error);
    toast.error("Network or server error");
  }
    }

  return (
    
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e)=> setName(e.target.value)} type="text" placeholder="Full Name" /><br />
        <input 
        value={email}
        onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" /><br />
        <input
        value={password}
        onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" /><br />
        <button type="submit" className="signup-btn ripple-btn">Create Account</button>
      </form>
    </div>
    
  );
};

export default Signup;
