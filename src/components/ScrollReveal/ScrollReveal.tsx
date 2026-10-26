import { useEffect, useRef, useState, ReactNode } from 'react';
import './ScrollReveal.css';

interface ScrollRevealProps {
  children: ReactNode;
  /** Animation order, used for stagger effect within the same group */
  index?: number;
  /** Animation variant */
  variant?: 'fade-up' | 'fade' | 'scale' | 'blur-up';
  /** delay in ms */
  delay?: number;
  /** className passthrough */
  className?: string;
  /** tag */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Re-fires every time it enters viewport (NOT once:true).
 * Uses IntersectionObserver + CSS animations for performance.
 */
export default function ScrollReveal({
  children,
  index = 0,
  variant = 'fade-up',
  delay = 0,
  className = '',
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          } else {
            // Re-fires when scrolling back into view
            setVisible(false);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Component: any = Tag;
  const computedDelay = delay + index * 80;

  return (
    <Component
      ref={ref as any}
      className={`reveal ${visible ? 'is-visible' : ''} reveal-${variant} ${className}`}
      style={{ '--reveal-delay': `${computedDelay}ms` } as React.CSSProperties}
    >
      {children}
    </Component>
  );
}