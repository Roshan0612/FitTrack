import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
