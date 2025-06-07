import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#eee' }}>
      <Link to="/" style={{ margin: '0 1rem' }}>Dashboard</Link>
      <Link to="/auth/login" style={{ margin: '0 1rem' }}>Login</Link>
      <Link to="/auth/signup" style={{ margin: '0 1rem' }}>Signup</Link>
      <Link to="/about" style={{ margin: '0 1rem' }}>About</Link>
    </header>
  );
};

export default Header;
