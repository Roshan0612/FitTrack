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
import AdminDashboard from './pages/Admin/AdminDashboard';
import Profile from './pages/User/Profile';
import Userdashboard from './pages/User/Userdashboard';
import Userprotectedroute from './pages/User/Userprotectedroute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepages />} />
            <Route path="about" element={<About />} />
          </Route>

          {/* Auth routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Reset password */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Admin route */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* User routes protected */}
          <Route path="/user" element={<Userprotectedroute />}>
            <Route path="dashboard" element={<Userdashboard />} />
            <Route path="add-info" element={<AdditionalInfo />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
