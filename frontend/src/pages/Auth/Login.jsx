import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" /><br />
        <input type="password" placeholder="Password" /><br />
        <button type="submit">Login</button>
      </form>
      <Link to="/auth/forgot-password">Forgot Password?</Link>
    </div>
  );
};

export default Login;
