import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Dashboard from './components/Dashboard'; 
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import About from './pages/About';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import AdditionalInfo from './pages/User/AdditionalInfo';
import { ToastContainer } from 'react-toastify';
import Homepages from './components/Homepages';
import Profile from './pages/Profile';
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepages />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} /> {/* ✅ Added dashboard route */}
            <Route path="user/add-info" element={<AdditionalInfo />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
