import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './PageTransition.css';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Wraps a route outlet. AnimatePresence with mode="wait" guarantees
 * the leaving page finishes before the entering page starts.
 * Triggers on browser back/forward too (key = pathname).
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const { pathname } = useLocation();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Reset scroll on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        ref={scrollRef}
        className="page-transition"
        initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}