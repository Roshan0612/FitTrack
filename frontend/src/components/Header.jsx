import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // for profile icon
import { useAuth } from '../context/Auth';
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // change to false when testing logout
  const [auth,setAuth]=useAuth();
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">Fit<span>Track</span></Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/plans" onClick={() => setMenuOpen(false)}>Plans</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>

          <div className="auth-links">
            {auth.user ? (
              <Link to="/dashboard/user" className="profile-icon" onClick={() => setMenuOpen(false)}>
                <FaUserCircle size={28} />
              </Link>
            ) : (
              <>
                <Link to="/auth/login" className="login-link" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/auth/signup"  onClick={() => setMenuOpen(false)}>Sign up</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
