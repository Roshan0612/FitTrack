import React from 'react'
import { useAuth } from '../../context/Auth';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [auth, setAuth] = useAuth();
    const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });

    localStorage.removeItem('auth');
  };
  return (
    <>
    <div>Profile</div>
    <div>
        <Link className="nav-link" to="/auth/login" onClick={handleLogout}>
                          Logout
                        </Link>
    </div>
    
    </>
    
  )
}

export default Profile