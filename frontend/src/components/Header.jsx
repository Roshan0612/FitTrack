import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // for profile icon
import { useAuth } from '../context/Auth';
import { useTheme } from '../context/ThemeContext'; //  Import theme context

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const { theme, toggleTheme } = useTheme(); //  Get theme and toggle

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

          {/*  Theme toggle button */}
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <div className="auth-links">
            {auth?.user?.role === 'admin' ? (
              <Link to="/admin/dashboard" className="profile-icon" onClick={() => setMenuOpen(false)}>
                <FaUserCircle size={28} />
              </Link>
            ) : auth?.user?.role === 'user' ? (
              <Link to="/user/dashboard" className="profile-icon" onClick={() => setMenuOpen(false)}>
                <FaUserCircle size={28} />
              </Link>
            ) : (
              <>
                <Link to="/auth/login" className="login-link" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/auth/signup" onClick={() => setMenuOpen(false)}>Sign up</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
