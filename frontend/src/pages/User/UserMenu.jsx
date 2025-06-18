import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/Auth';
const UserMenu = () => {
    const [auth, setAuth] = useAuth();
    const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    }
    localStorage.removeItem('auth');
  return (
    <>
    <div className="w-64 bg-gray-100 min-h-screen p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6">Custom User Profile</h2>
      <ul className="space-y-4">
        <li><Link to="/user/dashboard/add-info" className="text-gray-700 hover:text-blue-600">Personal Details</Link>
        <li><Link to="/user/dashboard/exercises" className="text-gray-700 hover:text-blue-600">My exercise</Link></li></li>
        <li><Link to="/user/dashboard/calorie" className="text-gray-700 hover:text-blue-600">My calorie intake</Link></li>
        <li>
            <Link className="nav-link  text-red-500 hover:text-red-700" to="/auth/login" onClick={handleLogout}>
                        Logout
            </Link>
        </li>
      </ul>
    </div>
    </>
  )
}

export default UserMenu