import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import {
  copawHero,
  copawInsight,
  copawProduct,
  copawEmotion,
  copawApp,
  copawConnection,
  copawClosing,
} from '../../data/copaw';
import './CopawDetail.css';

/* =================================================================
   Small helpers
   ================================================================= */

function SectionTag({
  num,
  en,
  cn,
  tone = 'dark',
}: {
  num: string;
  en: string;
  cn: string;
  tone?: 'dark' | 'light';
}) {
  return (
    <span
      className={`cpaw-tag${tone === 'light' ? ' cpaw-tag-light' : ''}`}
      aria-hidden="true"
    >
      <span className="cpaw-tag-num font-en">{num}</span>
      <span className="cpaw-tag-rule" />
      <span className="cpaw-tag-en font-en">{en}</span>
      <span className="cpaw-tag-cn">{cn}</span>
    </span>
  );
}

/* Hook: returns true while a ref is in viewport. Used to autoplay
   background videos only when they're actually visible. */
function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true);
          // We keep the video in DOM mounted while in the area,
          // so we only set false if the user has scrolled well
          // past it (so it doesn't keep decoding forever).
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* =================================================================
   01 · HERO  —  hero video dropped a little so the two-column
                  rhythm is balanced
   ================================================================= */
function HeroSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 56]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -22]);
  const op = useTransform(scrollYProgress, [0, 0.9], [1, reduce ? 1 : 0.4]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoOk, setVideoOk] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.then === 'function') p.catch(() => setVideoOk(false));
  }, []);

  return (
    <section className="cpaw-hero" ref={ref}>
      <div className="container cpaw-hero-inner">
        <motion.div
          className="cpaw-hero-text"
          style={{ y: textY, opacity: op }}
        >
          <ScrollReveal variant="fade" delay={0}>
            <p className="cpaw-hero-eyebrow">PRODUCT DESIGN · SMART PET CARE</p>
          </ScrollReveal>

          <ScrollReveal variant="blur-up" delay={120}>
            <h1 className="cpaw-hero-name">{copawHero.titleCN}</h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={220}>
            <h2 className="cpaw-hero-slogan">{copawHero.sloganCN}</h2>
            <p className="cpaw-hero-slogan-en font-en">
              {copawHero.sloganEN}
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={340}>
            <p className="cpaw-hero-intro">{copawHero.introCN}</p>
          </ScrollReveal>
        </motion.div>

        <motion.div className="cpaw-hero-visual" style={{ y: videoY }}>
          <ScrollReveal
            variant="blur-up"
            delay={140}
            className="cpaw-hero-stage"
          >
            {videoOk ? (
              <video
                ref={videoRef}
                className="cpaw-hero-video"
                src={copawHero.video}
                poster={copawHero.fallback}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onError={() => setVideoOk(false)}
                data-cursor="image"
                data-cursor-text="VIEW"
              />
            ) : (
              <img
                src={copawHero.fallback}
                alt={copawHero.titleCN}
                className="cpaw-hero-fallback"
                data-cursor="image"
                data-cursor-text="VIEW"
              />
            )}
          </ScrollReveal>

          <ScrollReveal
            variant="fade"
            delay={900}
            className="cpaw-hero-hint"
          >
            <span className="cpaw-hero-hint-line" aria-hidden="true" />
            <span className="cpaw-hero-hint-text font-en">
              {copawHero.scrollHintCN}
            </span>
          </ScrollReveal>
        </motion.div>
      </div>
    </section>
  );
}

/* =================================================================
   02 · INSIGHT — full-bleed background video + white type
   ================================================================= */
function InsightSection() {
  const { ref, inView } = useInView<HTMLElement>(0.25);
  const vRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const v = vRef.current;
    if (!v) return;
    v.muted = true;
    if (inView) {
      const p = v.play();
      if (p && typeof p.then === 'function') p.catch(() => {});
    } else {
      v.pause();
    }
  }, [inView]);

  return (
    <section className="cpaw-insight" ref={ref}>
      <div className="cpaw-insight-bg" aria-hidden="true">
        <video
          ref={vRef}
          className="cpaw-insight-video"
          src={copawInsight.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div className="cpaw-insight-overlay" />
      </div>

      <div className="container cpaw-insight-inner">
        <ScrollReveal variant="fade-up" className="cpaw-insight-text">
          <SectionTag num="02" en="Insight" cn="设计洞察" tone="light" />
          <h2 className="cpaw-section-title cpaw-section-title-light">
            {copawInsight.titleCN}
          </h2>
          <div className="cpaw-section-body cpaw-section-body-light">
            {copawInsight.bodyCN.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* =================================================================
   03 · PRODUCT — six aligned plates: collar first, then handle
   ================================================================= */
function ProductSection() {
  return (
    <section className="cpaw-product">
      <div className="container">
        <ScrollReveal variant="fade-up" className="cpaw-product-head">
          <SectionTag num="03" en="Product" cn="产品设计" />
          <h2 className="cpaw-section-title">{copawProduct.titleCN}</h2>
          <p className="cpaw-section-intro">{copawProduct.bodyCN}</p>
        </ScrollReveal>

        {/* Collar block: title + 3 plates */}
        <ScrollReveal variant="fade-up" className="cpaw-product-block">
          <div className="cpaw-product-block-head">
            <h3 className="cpaw-product-sub">{copawProduct.collar.titleCN}</h3>
            <p className="cpaw-product-sub-en font-en">
              {copawProduct.collar.titleEN}
            </p>
            <p className="cpaw-product-sub-body">{copawProduct.collar.descCN}</p>
          </div>

          <div className="cpaw-product-plates">
            {copawProduct.collar.plates.map((plate, i) => (
              <ScrollReveal
                key={plate.image}
                variant="blur-up"
                delay={i * 120}
                className="cpaw-product-plate"
              >
                <div
                  className="cpaw-product-plate-frame"
                  data-cursor="image"
                  data-cursor-text="VIEW"
                >
                  <img
                    src={plate.image}
                    alt={plate.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="cpaw-product-plate-label font-en">
                  {plate.label}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        {/* Handle block: title + 3 plates */}
        <ScrollReveal
          variant="fade-up"
          delay={120}
          className="cpaw-product-block"
        >
          <div className="cpaw-product-block-head">
            <h3 className="cpaw-product-sub">{copawProduct.handle.titleCN}</h3>
            <p className="cpaw-product-sub-en font-en">
              {copawProduct.handle.titleEN}
            </p>
            <p className="cpaw-product-sub-body">
              {copawProduct.handle.descCN}
            </p>
          </div>

          <div className="cpaw-product-plates">
            {copawProduct.handle.plates.map((plate, i) => (
              <ScrollReveal
                key={plate.image}
                variant="blur-up"
                delay={i * 120}
                className="cpaw-product-plate"
              >
                <div
                  className="cpaw-product-plate-frame"
                  data-cursor="image"
                  data-cursor-text="VIEW"
                >
                  <img
                    src={plate.image}
                    alt={plate.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="cpaw-product-plate-label font-en">
                  {plate.label}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        {/* Motion video of the leash */}
        <ScrollReveal
          variant="blur-up"
          delay={200}
          className="cpaw-product-video-wrap"
        >
          <div
            className="cpaw-product-video-frame"
            data-cursor="image"
            data-cursor-text="VIEW"
          >
            <video
              src={copawProduct.handleVideo}
              className="cpaw-product-video-el"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
          <span className="cpaw-product-video-label font-en">
            {copawProduct.handleVideoLabel}
          </span>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* =================================================================
   04 · EMOTION LIGHT — cross-fade switcher
   ================================================================= */
function EmotionSection() {
  const [active, setActive] = useState(0);
  // We render two layers stacked on top of each other and
  // cross-fade between them. This gives a "seamless" feel —
  // the next image is already loaded before the previous one
  // fades out, so the container itself never resizes.
  const current = copawEmotion.states[active];
  const previous =
    copawEmotion.states[
      (active - 1 + copawEmotion.states.length) % copawEmotion.states.length
    ];

  return (
    <section className="cpaw-emotion">
      <div className="container">
        <ScrollReveal variant="fade-up" className="cpaw-emotion-head">
          <SectionTag num="04" en="Emotion Light" cn="情绪灯效" />
          <h2 className="cpaw-section-title">{copawEmotion.titleCN}</h2>
          <p className="cpaw-section-intro">{copawEmotion.bodyCN}</p>
        </ScrollReveal>

        {/* The two stacked images share the same fixed-size
            box, so changing the image never resizes the layout
            and we get a true cross-fade with no white border. */}
        <div className="cpaw-emotion-stage">
          <div className="cpaw-emotion-canvas" data-cursor="image" data-cursor-text="VIEW">
            <img
              key={'p-' + previous.key}
              src={previous.image}
              alt={previous.imageAlt}
              className="cpaw-emotion-img cpaw-emotion-img-prev"
              loading="eager"
              decoding="async"
              aria-hidden="true"
            />
            <img
              key={'c-' + current.key}
              src={current.image}
              alt={current.imageAlt}
              className="cpaw-emotion-img cpaw-emotion-img-curr"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="cpaw-emotion-meta">
            <span
              className="cpaw-emotion-swatch"
              style={{ background: current.swatch }}
              aria-hidden="true"
            />
            <h3 className="cpaw-emotion-cn">{current.labelCN}</h3>
            <p className="cpaw-emotion-note">{current.noteCN}</p>
          </div>
        </div>

        <div className="cpaw-emotion-tabs" role="tablist" aria-label="灯效状态">
          {copawEmotion.states.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`cpaw-emotion-tab${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
              data-cursor="link"
            >
              <span
                className="cpaw-emotion-tab-dot"
                style={{ background: s.swatch }}
                aria-hidden="true"
              />
              <span className="cpaw-emotion-tab-label font-en">
                {s.labelCN}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   05 · APP — text on top, then HTML iframe + scene side-by-side
   ================================================================= */
function AppSection() {
  const { ref, inView } = useInView<HTMLElement>(0.18);
  return (
    <section
      ref={ref}
      className={`cpaw-app-cinema${inView ? ' is-revealed' : ''}`}
    >
      <div
        className="cpaw-app-bg"
        aria-hidden="true"
        data-cursor="image"
        data-cursor-text="VIEW"
      >
        <img
          src={copawApp.bgImage}
          alt=""
          className="cpaw-app-bg-img"
          loading="lazy"
          decoding="async"
        />
        <div className="cpaw-app-bg-veil" />
      </div>

      <div className="container cpaw-app-cinema-inner">
        <div className="cpaw-app-cinema-text">
          <SectionTag num="05" en="Watch App" cn="手表端" tone="light" />
          <h2 className="cpaw-app-cinema-title">{copawApp.titleCN}</h2>
          <div className="cpaw-app-cinema-body">
            <p>{copawApp.bodyCN}</p>
          </div>
          <ul className="cpaw-app-cinema-points">
            {copawApp.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   06 · CONNECTION — full-bleed background video
   ================================================================= */
function ConnectionSection() {
  const { ref, inView } = useInView<HTMLElement>(0.25);
  const vRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const v = vRef.current;
    if (!v) return;
    v.muted = true;
    if (inView) {
      const p = v.play();
      if (p && typeof p.then === 'function') p.catch(() => {});
    } else {
      v.pause();
    }
  }, [inView]);

  return (
    <section className="cpaw-connection" ref={ref}>
      <div className="cpaw-connection-bg" aria-hidden="true">
        <video
          ref={vRef}
          className="cpaw-connection-video"
          src={copawConnection.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div className="cpaw-connection-overlay" />
      </div>

      <div className="container cpaw-connection-inner">
        <ScrollReveal variant="fade-up" className="cpaw-connection-text">
          <SectionTag num="06" en="Connection" cn="人宠连接" tone="light" />
          <h2 className="cpaw-section-title cpaw-section-title-light">
            {copawConnection.titleCN}
          </h2>
          <p className="cpaw-section-intro cpaw-section-intro-light">
            {copawConnection.bodyCN}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* =================================================================
   07 · CLOSING — text only
   ================================================================= */
function ClosingSection() {
  return (
    <section className="cpaw-closing">
      <div className="container cpaw-closing-inner">
        <ScrollReveal variant="fade">
          <span className="cpaw-closing-brand">{copawClosing.brandCN}</span>
        </ScrollReveal>

        <ScrollReveal variant="blur-up" delay={140}>
          <p className="cpaw-closing-slogan">{copawClosing.sloganCN}</p>
        </ScrollReveal>

        <ScrollReveal
          variant="fade-up"
          delay={260}
          className="cpaw-closing-cta"
        >
          <Link
            to="/works"
            className="cpaw-closing-link"
            data-cursor="link"
          >
            <span aria-hidden="true">←</span>
            <span>{copawClosing.backToWorksCN}</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* =================================================================
   Page entry
   ================================================================= */
export default function CopawDetail() {
  return (
    <main className="cpaw-detail">
      <HeroSection />
      <InsightSection />
      <ProductSection />
      <EmotionSection />
      <AppSection />
      <ConnectionSection />
      <ClosingSection />
    </main>
  );
}
