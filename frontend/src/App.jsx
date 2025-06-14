import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
 
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import About from './pages/About';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import AdditionalInfo from './pages/User/AdditionalInfo';
import { ToastContainer } from 'react-toastify';
import Homepages from './components/Homepages';
import Profile from './pages/User/Profile';
import Userdashboard from './pages/User/Userdashboard';
import Userprotectedroute from './pages/User/Userprotectedroute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepages />} />
            <Route path="about" element={<About />} />
             
            
            
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/reset-password/:token" element={<ResetPassword />} />


          <Route path="/dashboard" element={<Userprotectedroute/>}>
                <Route path="user" element={<Userdashboard/>} />
                <Route path="user/add-info" element={<AdditionalInfo />} />
                <Route path="user/profile" element={<Profile/>} />
          </Route>

        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
