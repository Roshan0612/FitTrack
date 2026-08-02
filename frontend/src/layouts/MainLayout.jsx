import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout = () => {
  const location = useLocation();

  return (
    <>
      <Header isHome={location.pathname === '/'} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
