import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroBackground from '../../components/HeroBackground/HeroBackground';
import './Hero.css';

const HERO_TAGS = ['PRODUCT', 'VISUAL', 'VIDEO', '3D', 'AI'] as const;

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [scrollHint, setScrollHint] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setScrollHint(false);
      else setScrollHint(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={heroRef} className="hero" aria-label="Hero">
      {/* Background: React Bits FloatingLines adapted for light editorial */}
      <HeroBackground />

      {/* Foreground */}
      <div className="hero-foreground container">
        <motion.div
          className="hero-meta-top"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <span className="label label-blue">— 2026 / Portfolio</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <span className="hero-title-cn">黎天乐</span>
          <span className="hero-title-en">LI&nbsp;TIANLE</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
          工业设计 / 视觉设计 / 内容创作
        </motion.p>

        <motion.p
          className="hero-subtitle-en"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
        >
          Industrial · Visual · Content
        </motion.p>

        <motion.div
          className="hero-meta-tags"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
        >
          {HERO_TAGS.map((t) => (
            <span key={t} className="hero-tag">
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="hero-scroll"
        animate={{ opacity: scrollHint ? 1 : 0, y: scrollHint ? 0 : 12 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="label">SCROLL TO EXPLORE</span>
        <span className="hero-scroll-line" aria-hidden="true" />
      </motion.div>

      {/* Frame corners — minimal */}
      <div className="hero-frame" aria-hidden="true">
        <span className="hero-frame-tl">01&nbsp;/&nbsp;HOME</span>
        <span className="hero-frame-br">2026 — LI TIANLE</span>
      </div>
    </section>
  );
}
