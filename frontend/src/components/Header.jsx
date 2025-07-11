import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/Auth';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [auth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollOrNavigate = (id) => {
    const onHome = location.pathname === '/';
    if (onHome) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const section = document.querySelector(hash);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          Fit<span>Track</span>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a onClick={() => handleScrollOrNavigate('home')}>Home</a>
          <a onClick={() => handleScrollOrNavigate('plans')}>Plans</a>
          <a onClick={() => handleScrollOrNavigate('about')}>About</a>

          <div className="auth-links">
            {auth?.user?.role === 'admin' ? (
              <Link
                to="/admin/dashboard"
                className="profile-icon"
                onClick={() => setMenuOpen(false)}
              >
                <FaUserCircle size={28} />
              </Link>
            ) : auth?.user?.role === 'user' ? (
              <Link
                to="/user/dashboard"
                className="profile-icon"
                onClick={() => setMenuOpen(false)}
              >
                <FaUserCircle size={28} />
              </Link>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="login-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link to="/auth/signup" onClick={() => setMenuOpen(false)}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
