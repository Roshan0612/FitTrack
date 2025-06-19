import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useRef } from 'react';

const MainLayout = () => {
  const location = useLocation();

  const homeRef = useRef();
  const plansRef = useRef();
  const aboutRef = useRef();

  const scrollToSection = (ref) => {
    if (ref?.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <Header
        onHomeClick={() => scrollToSection(homeRef)}
        onPlansClick={() => scrollToSection(plansRef)}
        onAboutClick={() => scrollToSection(aboutRef)}
        isHome={location.pathname === '/'}
      />
      <main>
        <Outlet context={{ homeRef, plansRef, aboutRef }} />
      </main>
    </>
  );
};

export default MainLayout;
