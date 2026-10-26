import { useEffect, useState } from 'react';
import FloatingLines from '../FloatingLines/FloatingLines';
import './HeroBackground.css';

/**
 * HeroBackground
 *
 * Wraps the React Bits `FloatingLines` component and adapts it to
 * the light editorial palette of this site:
 *  - LightMode shader output (ink lines on light base)
 *  - Klein Blue → Soft cobalt ink gradient
 *  - Reduced line count and density so it reads as a quiet
 *    background gesture, not a logo animation.
 *
 * The wrapper also respects reduced-motion preference.
 */
export default function HeroBackground() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (reduced) {
    return <div className="hero-background hero-background--static" aria-hidden="true" />;
  }

  return (
    <div className="hero-background" aria-hidden="true">
      <FloatingLines
        linesGradient={['#2457FF', '#0F1E3F', '#6F7075']}
        enabledWaves={['middle', 'bottom', 'top']}
        lineCount={[3, 4, 2]}
        lineDistance={[12, 18, 22]}
        bendRadius={6}
        bendStrength={-1.2}
        interactive
        parallax
        animationSpeed={0.6}
        lightMode
        mixBlendMode="multiply"
        backgroundColor="#F5F5F2"
      />
    </div>
  );
}
