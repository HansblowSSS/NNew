import { useRef, useState, useEffect, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import {
  dlHero,
  dlDesign,
  dlInteraction,
  dlDetail,
  dlStructure,
  dlClosing,
  dlMeta,
} from '../../data/desktopLight';
import './DesktopLightDetail.css';

/* ============================================================
   HELPER HOOKS
   ============================================================ */

/** Section-level parallax transforms (background vs foreground depth). */
function useSectionParallax(ref: React.RefObject<HTMLElement>) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ['start end', 'end start'],
  });
  return {
    bgY: useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 80, reduce ? 0 : -80]),
    fgY: useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -30, reduce ? 0 : 30]),
    textY: useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -20, reduce ? 0 : 20]),
  };
}

/**
 * Split a string into lines, breaking only at punctuation
 * (。，；：！？、,. ; : ! ? and the Chinese enumeration comma).
 * Punctuation is glued to the end of the previous line so the
 * headline reads naturally and never starts a line with a punctuation
 * mark. Empty chunks (caused by consecutive punctuation) are dropped.
 */
function splitAtPunctuation(s: string): string[] {
  if (!s) return [];
  const tokens = s.split(/([。，；：！？、,/])/g);
  const out: string[] = [];
  let buf = '';
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (!t) continue;
    // Even index = text, odd index = punctuation.
    // Append text to the current buffer, then on punctuation glue it
    // to the buffer and flush as a new line.
    if (i % 2 === 0) {
      buf += t;
    } else {
      buf += t;
      out.push(buf);
      buf = '';
    }
  }
  if (buf) out.push(buf);
  return out;
}

/** Subtle mouse-driven tilt for hero / design product shots. */
function usePointerTilt(intensity = 6) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 90,
    damping: 16,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 90,
    damping: 16,
  });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX / window.innerWidth - 0.5);
      y.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y, reduce]);

  return { rotateX, rotateY };
}

/* ============================================================
   SECTION 01 · HERO
   - Full-bleed scene (场景1)
   - Left-anchored copy
   - Back link
   - Scroll hint
   ============================================================ */
function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50]);
  const textOp = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const { rotateX, rotateY } = usePointerTilt(3);

  return (
    <section className="dl-hero" ref={ref} aria-label="桌面摆件灯 · 产品主视觉">
      {/* Background image — slow parallax + subtle scale */}
      <motion.div
        className="dl-hero-bg"
        aria-hidden="true"
        style={{ y: bgY, scale: bgScale }}
      >
        <img src={dlHero.bgImage} alt="" className="dl-hero-bg-img" />
        <div className="dl-hero-bg-veil" />
      </motion.div>

      {/* Top bar — back link */}
      <div className="dl-topbar">
        <Link to="/works" className="dl-back-link" data-cursor="link">
          <span aria-hidden="true">←</span>
          <span>Back to Works</span>
        </Link>
        <span className="dl-topbar-meta font-en">{dlMeta.code}</span>
      </div>

      {/* Copy — staggered entrance, slight Y parallax on scroll */}
      <motion.div
        className="dl-hero-text"
        style={{ y: textY, opacity: textOp }}
      >
        <motion.p
          className="dl-hero-eyebrow font-en"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {dlHero.productNameEN}
        </motion.p>

        <div className="dl-hero-title-wrap" style={{ perspective: '1200px' }}>
          <motion.h1
            className="dl-hero-title-cn"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            style={{ rotateX, rotateY } as CSSProperties}
          >
            {dlHero.productNameCN}
          </motion.h1>
        </div>

        <motion.p
          className="dl-hero-slogan-cn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {dlHero.sloganCN}
        </motion.p>

        <motion.p
          className="dl-hero-slogan-en font-en"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {dlHero.sloganEN}
        </motion.p>
      </motion.div>

      {/* Scroll hint — bottom centre */}
      <div className="dl-scroll-hint" aria-hidden="true">
        <span className="dl-scroll-hint-line" />
        <span className="dl-scroll-hint-text font-en">{dlHero.scrollHint}</span>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 02 · DESIGN
   - Large product main visual (主图1) on the right
   - Giant EN title as background wordmark
   - Copy on the left
   ============================================================ */
function DesignSection() {
  const ref = useRef<HTMLElement | null>(null);
  const parallax = useSectionParallax(ref);

  return (
    <section className="dl-design" ref={ref} aria-label="设计语言">
      {/* Giant background EN wordmark */}
      <motion.div
        className="dl-design-wordmark"
        aria-hidden="true"
        style={{ y: parallax.textY }}
      >
        {dlDesign.titleEN}
      </motion.div>

      <div className="dl-design-inner">
        {/* Left — copy */}
        <div className="dl-design-copy">
          <ScrollReveal variant="fade-up">
            <span className="dl-section-tag font-en">02 / Design</span>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={80}>
            <h2 className="dl-section-title-cn">{dlDesign.titleCN}</h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={160}>
            <p className="dl-section-title-en font-en">{dlDesign.titleEN}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={220}>
            <p className="dl-section-body">{dlDesign.bodyCN}</p>
          </ScrollReveal>
        </div>

        {/* Right — product image */}
        <ScrollReveal variant="blur-up" delay={120} className="dl-design-visual">
          <motion.div
            className="dl-design-frame"
            style={{ y: parallax.fgY }}
            data-cursor="image"
            data-cursor-text="VIEW"
          >
            <img
              src={dlDesign.productImage}
              alt={dlDesign.productImageAlt}
              loading="lazy"
              decoding="async"
            />
            <div className="dl-design-frame-veil" aria-hidden="true" />
          </motion.div>
          <p className="dl-design-caption font-en">
            <span className="dl-design-caption-mark" aria-hidden="true" />
            {dlDesign.caption}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 03 · INTERACTION
   - Full-bleed video background (auto-plays when in viewport)
   - Text anchored left
   - Two-state comparison overlays
   ============================================================ */
function InteractionSection() {
  const ref = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play / pause video based on viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {/* autoplay blocked */});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="dl-interaction" ref={ref} aria-label="伸缩交互机制">
      {/* Video background */}
      <div className="dl-interaction-video-wrap">
        <video
          ref={videoRef}
          className="dl-interaction-video"
          src={dlInteraction.videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="dl-interaction-video-veil" />
      </div>

      <div className="dl-interaction-inner">
        {/* Text — anchored left, above the video */}
        <div className="dl-interaction-head">
          <ScrollReveal variant="fade-up">
            <span className="dl-section-tag font-en">03 / Interaction</span>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={80}>
            <h2 className="dl-section-title-cn">{dlInteraction.titleCN}</h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={160}>
            <p className="dl-section-title-en font-en">{dlInteraction.titleEN}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={220}>
            <p className="dl-section-body">{dlInteraction.bodyCN}</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 04 · DETAIL
   - Full-bleed warm close-up
   - Text overlay, large title
   ============================================================ */
function DetailSection() {
  const ref = useRef<HTMLElement | null>(null);
  const parallax = useSectionParallax(ref);

  const titleLines = splitAtPunctuation(dlDetail.titleCN);
  const bodyLines = splitAtPunctuation(dlDetail.bodyCN);

  return (
    <section className="dl-detail" ref={ref} aria-label="光感细节">
      <motion.div
        className="dl-detail-bg"
        aria-hidden="true"
        style={{ y: parallax.bgY, scale: 1.04 }}
      >
        <img
          src={dlDetail.image}
          alt=""
          className="dl-detail-bg-img"
        />
        <div className="dl-detail-veil" aria-hidden="true" />
      </motion.div>

      <div className="dl-detail-text">
        <ScrollReveal variant="fade-up">
          <span className="dl-section-tag font-en">04 / Detail</span>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={80}>
          <h2 className="dl-section-title-cn dl-section-title-cn--light dl-detail-title">
            {titleLines.map((line, i) => (
              <span className="dl-line" key={`t${i}`}>
                {line}
              </span>
            ))}
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={160}>
          <p className="dl-section-title-en font-en dl-detail-title-en">
            <span className="dl-line">{dlDetail.titleEN}</span>
          </p>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={220}>
          <p className="dl-section-body dl-section-body--light dl-detail-body">
            {bodyLines.map((line, i) => (
              <span className="dl-line" key={`b${i}`}>
                {line}
              </span>
            ))}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 05 · STRUCTURE
   - Full-bleed warm-light product scene as background
   - Title + body anchored top-right, right-aligned
   - Lines break only at Chinese / English punctuation, never mid-word
   - Meta caption floats at the bottom
   ============================================================ */
function StructureSection() {
  const ref = useRef<HTMLElement | null>(null);
  const parallax = useSectionParallax(ref);

  const titleLines = splitAtPunctuation(dlStructure.titleCN);
  const bodyLines = splitAtPunctuation(dlStructure.bodyCN);

  return (
    <section className="dl-structure" ref={ref} aria-label="产品结构">
      {/* Full-bleed warm-light product scene */}
      <motion.div
        className="dl-structure-bg"
        aria-hidden="true"
        style={{ y: parallax.bgY, scale: 1.04 }}
      >
        <img
          src={dlStructure.image}
          alt=""
          className="dl-structure-bg-img"
        />
        <div className="dl-structure-veil" aria-hidden="true" />
      </motion.div>

      {/* Copy — top-right of the section, right-aligned */}
      <div className="dl-structure-head">
        <ScrollReveal variant="fade-up">
          <span className="dl-section-tag font-en">05 / Structure</span>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={80}>
          <h2 className="dl-section-title-cn dl-structure-title-cn">
            {titleLines.map((line, i) => (
              <span className="dl-line" key={`t${i}`}>
                {line}
              </span>
            ))}
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={160}>
          <p className="dl-section-title-en font-en dl-structure-title-en">
            <span className="dl-line">{dlStructure.titleEN}</span>
          </p>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={220}>
          <p className="dl-section-body dl-structure-body">
            {bodyLines.map((line, i) => (
              <span className="dl-line" key={`b${i}`}>
                {line}
              </span>
            ))}
          </p>
        </ScrollReveal>
      </div>

      {/* Meta — bottom of the section */}
      <div className="dl-structure-meta font-en">
        <span>{dlStructure.metaLeft}</span>
        <span>{dlStructure.metaRight}</span>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 06 · CLOSING  (原 07，现 06，删除了 LIFESTYLE)
   - Full-bleed scene (场景4)
   - Minimal centred text
   - Back link
   ============================================================ */
function ClosingSection() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 100]);

  return (
    <section className="dl-closing" ref={ref} aria-label="收尾">
      <motion.div
        className="dl-closing-bg"
        aria-hidden="true"
        style={{ y: bgY, scale: 1.04 }}
      >
        <img src={dlClosing.bgImage} alt="" className="dl-closing-bg-img" />
        <div className="dl-closing-veil" aria-hidden="true" />
      </motion.div>

      <div className="dl-closing-content">
        <ScrollReveal variant="fade-up">
          <p className="dl-closing-en font-en">{dlClosing.titleEN}</p>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={140}>
          <h2 className="dl-closing-cn">{dlClosing.titleCN}</h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={300}>
          <p className="dl-closing-sub">{dlClosing.subtitle}</p>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={420}>
          <Link to="/works" className="dl-closing-link" data-cursor="link">
            <span aria-hidden="true">←</span>
            <span>{dlClosing.backLabel}</span>
          </Link>
        </ScrollReveal>
      </div>

      {/* Footer — project credit */}
      <div className="dl-closing-foot font-en">
        <span>{dlMeta.code}</span>
        <span>·</span>
        <span>{dlMeta.year}</span>
        <span>·</span>
        <span>PRODUCT DESIGN</span>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION NAV — Right-side dots, fixed
   ============================================================ */
const sectionAnchors = [
  { id: 'dl-hero', label: 'HERO' },
  { id: 'dl-design', label: 'DESIGN' },
  { id: 'dl-interaction', label: 'INTERACTION' },
  { id: 'dl-detail', label: 'DETAIL' },
  { id: 'dl-structure', label: 'STRUCTURE' },
  { id: 'dl-closing', label: 'CLOSING' },
];

function SectionNav() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const handler = () => {
      const viewportMid = window.scrollY + window.innerHeight * 0.4;
      let idx = 0;
      sectionAnchors.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        if (el.offsetTop <= viewportMid) idx = i;
      });
      setActive(idx);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className="dl-sectionnav" aria-label="页面章节">
      {sectionAnchors.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`dl-sectionnav-dot${i === active ? ' is-active' : ''}`}
          data-cursor="link"
        >
          <span className="dl-sectionnav-line" aria-hidden="true" />
          <span className="dl-sectionnav-label font-en">{s.label}</span>
        </a>
      ))}
    </nav>
  );
}

/* ============================================================
   PAGE ENTRY
   ============================================================ */
export default function DesktopLightDetail() {
  // Page is dark — flip the global custom cursor to the light variant for
  // the lifetime of this detail page. Other pages stay untouched.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const previous = root.dataset.cursorTheme ?? '';
    root.dataset.cursorTheme = 'inverse';
    return () => {
      if (previous) root.dataset.cursorTheme = previous;
      else delete root.dataset.cursorTheme;
    };
  }, []);

  return (
    <main className="dl-page">
      <SectionNav />
      <div id="dl-hero"><HeroSection /></div>
      <div id="dl-design"><DesignSection /></div>
      <div id="dl-interaction"><InteractionSection /></div>
      <div id="dl-detail"><DetailSection /></div>
      <div id="dl-structure"><StructureSection /></div>
      <div id="dl-closing"><ClosingSection /></div>
    </main>
  );
}
