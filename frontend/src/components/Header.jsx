import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Dumbbell, Menu, UserCircle2, X } from 'lucide-react';
import { useAuth } from '../context/Auth';

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Plans', id: 'plans' },
];

const solidButtonClass =
  'inline-flex h-10 items-center justify-center gap-2 rounded-full border border-emerald-300/20 bg-gradient-to-r from-emerald-300 to-lime-300 px-4 text-sm font-semibold !text-zinc-950 shadow-[0_14px_32px_rgba(16,185,129,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(16,185,129,0.28)]';

const softButtonClass =
  'inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_14px_32px_rgba(0,0,0,0.22)]';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [auth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <span className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white shadow-[0_0_40px_rgba(16,185,129,0.2)] backdrop-blur-xl">
            <Dumbbell className="size-5 text-emerald-300" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/45">Premium Fitness</span>
            <span className="text-xl font-semibold tracking-[-0.04em] text-white">FitTrack</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-xl lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollOrNavigate(item.id)}
              className="group relative rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:text-white"
            >
              {item.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-px origin-center scale-x-0 bg-gradient-to-r from-emerald-300 via-white to-lime-300 transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {auth?.user?.role ? (
            <Link
              to={auth.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
              className={softButtonClass}
            >
              <UserCircle2 className="mr-2 size-4" />
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold text-white/72 transition hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className={solidButtonClass}
              >
                Start free
                <ChevronRight className="ml-2 size-4" />
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="border-t border-white/10 bg-zinc-950/95 px-4 pb-5 pt-3 backdrop-blur-2xl lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollOrNavigate(item.id)}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                  <ChevronRight className="size-4 text-white/35" />
                </button>
              ))}

              {auth?.user?.role ? (
                <Link
                  to={auth.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
                  onClick={() => setMenuOpen(false)}
                  className={`${solidButtonClass} mt-2 h-11 w-full`}
                >
                  Open dashboard
                </Link>
              ) : (
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <Link
                    to="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className={`${softButtonClass} h-11 w-full rounded-2xl`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/signup"
                    onClick={() => setMenuOpen(false)}
                    className={`${solidButtonClass} h-11 w-full rounded-2xl`}
                  >
                    Start free
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
