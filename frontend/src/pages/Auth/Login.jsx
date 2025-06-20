import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth'; 
import axios from 'axios';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;
import "../../styles/Login.css"
// import MainLayout from '../../layouts/MainLayout'
import { useState } from 'react';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth]=useAuth();
  const navigate =useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const res =await axios.post(`${API_URL}/api/v1/auth/login`, {email, password });
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
  const handleSignupRedirect = () => {
    navigate('/auth/signup');
  };
  return (
    
    <div className="background-wrap">
    <div className="login-container">
      <h2>Login</h2>
      <p>Enter your credentials to access your account.</p>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e)=> setEmail(e.target.value)}
        type="email" placeholder="Email" /><br />

        <input value={password} onChange={(e)=>setPassword(e.target.value)}
        type="password" placeholder="Password" /><br />

        <div className="button-group">

          <button
              type="button"
              className="register-btn ripple-btn"
              onClick={handleSignupRedirect}
          >
            SignUp
          </button>
          
          <button className="login-btn ripple-btn">
               Login
          </button>
        </div>
      </form> 
      <Link to="/auth/forgot-password">Forgot Password?</Link>
    </div>
    </div>
    
  );
};

export default Login;
