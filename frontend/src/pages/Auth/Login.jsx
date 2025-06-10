import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth'; 
import axios from 'axios';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth]=useAuth();
  const navigate =useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const res =await axios.post(`${API_URL}/api/auth/login`, {email, password });
      if(res.data.success){
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      }else{
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e)=> setEmail(e.target.value)}
        type="email" placeholder="Email" /><br />

        <input value={password} onChange={(e)=>setPassword(e.target.value)}
        type="password" placeholder="Password" /><br />
        <button type="submit">Login</button>
      </form>
      <Link to="/auth/forgot-password">Forgot Password?</Link>
    </div>
  );
};

export default Login;
