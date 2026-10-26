import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.css';

const NAV_ITEMS = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT', to: '/about' },
  { label: 'EXPERIENCE', to: '/experience' },
  { label: 'WORKS', to: '/works' },
  { label: 'AWARDS', to: '/awards' },
  { label: 'CAPABILITIES', to: '/capabilities' },
  { label: 'CONTACT', to: '/contact' },
];

interface NavigationProps {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export default function Navigation({ mobileOpen, setMobileOpen }: NavigationProps) {
  const { pathname } = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop Floating Capsule */}
      <motion.nav
        className="nav-capsule"
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        aria-label="Primary"
      >
        <ul className="nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.to} className="nav-item">
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
              >
                <span className="nav-link-text">{item.label}</span>
                <span className="nav-link-indicator" aria-hidden="true" />
              </NavLink>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Mobile toggle */}
      <button
        className={`nav-mobile-toggle${mobileOpen ? ' is-open' : ''}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.ul
              className="nav-mobile-list"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.15 },
                },
              }}
            >
              {NAV_ITEMS.map((item, idx) => (
                <motion.li
                  key={item.to}
                  className="nav-mobile-item"
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `nav-mobile-link${isActive ? ' is-active' : ''}`
                    }
                  >
                    <span className="nav-mobile-index">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="nav-mobile-label">{item.label}</span>
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
            <div className="nav-mobile-footer">
              <span className="label">LI TIANLE — 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}