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
import AdminUsersPage from './pages/Admin/AdminUsersPage';
import Webcam from 'react-webcam';
import AdminLayout from './layouts/AdminLayout'
import AdminProtectedRoute from './pages/Admin/AdminProtectedRoute';
import IndivisualUserDetail from './pages/Admin/IndivisualUserDetail';
import CreateExercisePage from './pages/Admin/CreateExercisePage';
import MaleExercisesPage from './pages/Admin/MaleExercisesPage';
import FemaleExercisesPage from './pages/Admin/FemaleExercisesPage';
import UserExercisePage from './pages/User/UserExercisePage';
import CalorieCalculator from './pages/User/CalorieCalculator';
import CreateDietPage from './pages/Admin/CreateDietPage';
import AdminDietPage from './pages/Admin/AdminDietPage';
import UserDietPage from './pages/User/userdietpage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepages />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} /> {/* ✅ Added dashboard route */}
            
            
          </Route>

          {/* Auth routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Reset password route (not inside layout) */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Admin routes inside AdminLayout */}
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="dashboard/users" element={<AdminUsersPage />} />
            <Route path="dashboard/user/:userId" element={<IndivisualUserDetail />} />
            <Route path="dashboard/create-exercise" element={<CreateExercisePage />} />
            <Route path="/admin/assign-exercise/male/:userId" element={<MaleExercisesPage />} />
            <Route path="/admin/assign-exercise/female/:userId" element={<FemaleExercisesPage />} />
            <Route path="dashboard/create-diet" element={<CreateDietPage />} />
            <Route path="/admin/dashboard/assign-diet/:userId" element={<AdminDietPage />} />
            


          </Route>

          {/* User protected routes */}
          <Route path="/user" element={<Userprotectedroute />}>
            <Route path="dashboard" element={<Userdashboard />} />
            <Route path="dashboard/add-info" element={<AdditionalInfo />} />
            <Route path="dashboard/profile" element={<Profile />} />
            <Route path="dashboard/exercises" element={<UserExercisePage />} />
            <Route path="dashboard/calorie" element={<CalorieCalculator />} />
            <Route path="dashboard/diets" element={<UserDietPage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;