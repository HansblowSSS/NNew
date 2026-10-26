import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import {
  liftPodHero,
  liftPodPositioning,
  liftPodOverview,
  liftPodDetails,
  liftPodStructure,
  liftPodMotion,
  liftPodProcess,
  liftPodClosing,
} from '../../data/liftpod';
import './LiftpodDetail.css';

/* ============================================================
   01 · HERO
   ----------------------------------------------------------
   - Full-bleed scene background.
   - Text group is centered (horizontally + vertically) within
     the first viewport. It is positioned via absolute centring
     (NOT via scroll progress).
   - Text only plays a one-shot entrance animation, then stays
     fully visible. It never fades with scroll.
   ============================================================ */
function HeroSection() {
  return (
    <section className="lp-hero" aria-label="LiftPod 产品首屏">
      {/* Full-bleed scene */}
      <div className="lp-hero-bg" aria-hidden="true">
        <img
          src={liftPodHero.bgImage}
          alt=""
          className="lp-hero-bg-img"
        />
        {/* Soft, asymmetric veil so centered text reads well
            without darkening the product region too much. */}
        <div className="lp-hero-bg-veil" />
      </div>

      {/* Back link — fixed top-left, always visible */}
      <div className="lp-hero-back">
        <Link to="/works" className="lp-back-link" data-cursor="link">
          <span aria-hidden="true">←</span>
          <span>返回作品</span>
        </Link>
      </div>

      {/* Centered text group. Position is FIXED at 50% / 45% via
          CSS transform — never controlled by scroll progress.
          The text only plays a one-shot entry animation
          (animation-fill-mode: forwards) and then remains at its
          final visible state. No setTimeout, no scroll listener. */}
      <div className="lp-hero-stage">
        <div className="lp-hero-center">
          <p className="lp-hero-eyebrow font-en">{liftPodHero.eyebrow}</p>
          <h1 className="lp-hero-title-cn">{liftPodHero.titleCN}</h1>
          <p className="lp-hero-subtitle">{liftPodHero.subtitleCN}</p>
          <p className="lp-hero-scroll font-en" aria-hidden="true">
            {liftPodHero.scrollHint}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   02 · PRODUCT POSITIONING
   ----------------------------------------------------------
   Two-column lead + three small blocks below.
   ============================================================ */
function PositioningSection() {
  return (
    <section className="lp-positioning" aria-label="产品定位">
      <div className="container">
        <ScrollReveal variant="fade-up" className="lp-section-head">
          <span className="lp-section-num label label-blue font-en">02</span>
          <span className="lp-section-eyebrow-en font-en">
            {liftPodPositioning.eyebrow}
          </span>
          <span className="lp-section-eyebrow-cn">
            {liftPodPositioning.eyebrowCN}
          </span>
        </ScrollReveal>

        <div className="lp-positioning-grid">
          {/* Left — headline + one-liner */}
          <ScrollReveal variant="fade-up" className="lp-positioning-left">
            <h2 className="lp-positioning-title">
              {liftPodPositioning.titleCN}
            </h2>
            <p className="lp-positioning-one">
              {liftPodPositioning.oneLiner}
            </p>
          </ScrollReveal>

          {/* Right — body + keywords */}
          <ScrollReveal variant="fade-up" delay={120} className="lp-positioning-right">
            <div className="lp-positioning-body">
              {liftPodPositioning.bodyCN.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <ul className="lp-positioning-keywords">
              {liftPodPositioning.keywords.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        {/* Three small blocks: use scene, problem, response */}
        <div className="lp-positioning-blocks">
          {liftPodPositioning.blocks.map((b, i) => (
            <ScrollReveal
              key={b.num}
              variant="fade-up"
              delay={i * 90}
              className="lp-positioning-block"
            >
              <span className="lp-positioning-block-num label-blue font-en">
                {b.num}
              </span>
              <h3 className="lp-positioning-block-title">{b.title}</h3>
              <p className="lp-positioning-block-body">{b.body}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   03 · PRODUCT OVERVIEW — two hero images
   ============================================================ */
function OverviewSection() {
  return (
    <section className="lp-overview" aria-label="产品整体展示">
      <div className="container">
        <ScrollReveal variant="fade-up" className="lp-section-head">
          <span className="lp-section-num label label-blue font-en">03</span>
          <h2 className="lp-section-title">{liftPodOverview.titleCN}</h2>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={80} className="lp-overview-body">
          <p>{liftPodOverview.bodyCN}</p>
        </ScrollReveal>

        {/* Two-column unified grid */}
        <div className="lp-overview-grid">
          <ScrollReveal
            variant="blur-up"
            delay={0}
            className="lp-overview-cell"
          >
            <motion.div
              className="lp-img-frame"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              data-cursor="image"
              data-cursor-text="VIEW"
            >
              <img
                src={liftPodOverview.mainImage}
                alt={liftPodOverview.mainImageAlt}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <span className="lp-img-meta font-en">PRIMARY VIEW</span>
          </ScrollReveal>

          <ScrollReveal
            variant="blur-up"
            delay={120}
            className="lp-overview-cell"
          >
            <motion.div
              className="lp-img-frame"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              data-cursor="image"
              data-cursor-text="VIEW"
            >
              <img
                src={liftPodOverview.frontImage}
                alt={liftPodOverview.frontImageAlt}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <span className="lp-img-meta font-en">FRONT VIEW</span>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   04 · PRODUCT DETAILS — strict three-column grid
   ============================================================ */
function DetailsSection() {
  const items = [
    { key: 'base', ...liftPodDetails.base },
    { key: 'slot', ...liftPodDetails.slot },
    { key: 'opening', ...liftPodDetails.opening },
  ];
  return (
    <section className="lp-details" aria-label="产品细节">
      <div className="container">
        <ScrollReveal variant="fade-up" className="lp-section-head">
          <span className="lp-section-num label label-blue font-en">04</span>
          <h2 className="lp-section-title">{liftPodDetails.titleCN}</h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={80} className="lp-details-body">
          <p>{liftPodDetails.bodyCN}</p>
        </ScrollReveal>

        {/* Uniform three-column grid */}
        <div className="lp-details-grid">
          {items.map((item, i) => (
            <ScrollReveal
              key={item.key}
              variant="blur-up"
              delay={i * 90}
              className="lp-details-cell"
            >
              <motion.div
                className="lp-img-frame"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                data-cursor="image"
                data-cursor-text="VIEW"
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
              <div className="lp-img-caption">
                <h3 className="lp-img-caption-title">{item.label}</h3>
                <p className="lp-img-caption-desc">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   05 · STORAGE STRUCTURE
   ============================================================ */
function StructureSection() {
  const blocks = [
    { key: 'upper', ...liftPodStructure.upper },
    { key: 'side', ...liftPodStructure.side },
    { key: 'lower', ...liftPodStructure.lower },
  ];
  return (
    <section className="lp-structure" aria-label="收纳结构">
      <div className="container">
        <ScrollReveal variant="fade-up" className="lp-section-head">
          <span className="lp-section-num label label-blue font-en">05</span>
          <h2 className="lp-section-title">{liftPodStructure.titleCN}</h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={80} className="lp-structure-body">
          <p>{liftPodStructure.bodyCN}</p>
        </ScrollReveal>

        {/* Standalone full-width structure image */}
        <ScrollReveal variant="blur-up" delay={0} className="lp-structure-visual">
          <motion.div
            className="lp-img-frame lp-img-frame--wide"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            data-cursor="image"
            data-cursor-text="VIEW"
          >
            <img
              src={liftPodStructure.structureImage}
              alt={liftPodStructure.structureImageAlt}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </ScrollReveal>

        {/* Annotation blocks — aligned to grid */}
        <div className="lp-structure-annotations">
          {blocks.map((b, i) => (
            <ScrollReveal
              key={b.key}
              variant="fade-up"
              delay={i * 90}
              className="lp-structure-annot"
            >
              <span className="lp-structure-annot-num label label-blue font-en">
                0{i + 1}
              </span>
              <div className="lp-structure-annot-text">
                <h3 className="lp-structure-annot-title">{b.label}</h3>
                <p className="lp-structure-annot-desc">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Hook: returns true while a ref is in viewport. Used to autoplay
   the background video only when the section is actually visible.
   ---------------------------------------------------------------- */
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
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}


function MotionSection() {
  const { ref, inView } = useInView<HTMLElement>(0.25);
  const vRef = useRef<HTMLVideoElement | null>(null);
  const [videoOk, setVideoOk] = useState(true);

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
    <section className="lp-motion" ref={ref} aria-label="升降动态演示">
      {/* Full-bleed video background */}
      <div className="lp-motion-bg" aria-hidden="true">
        {videoOk ? (
          <video
            ref={vRef}
            className="lp-motion-video"
            src={liftPodMotion.video}
            poster={liftPodMotion.poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setVideoOk(false)}
          />
        ) : (
          <img
            src={liftPodMotion.poster}
            alt=""
            className="lp-motion-fallback"
            loading="eager"
            decoding="async"
          />
        )}
        {/* Soft veil so the overlaid type reads cleanly */}
        <div className="lp-motion-veil" />
      </div>

      {/* Overlaid content */}
      <div className="container lp-motion-inner">
        <ScrollReveal variant="fade-up" className="lp-motion-text">
          <span className="lp-motion-tag font-en">
            <span className="lp-motion-tag-num">06</span>
            <span className="lp-motion-tag-rule" aria-hidden="true" />
            <span className="lp-motion-tag-en">Lifting Motion</span>
            <span className="lp-motion-tag-cn">升降动态</span>
          </span>
          <h2 className="lp-motion-title">{liftPodMotion.titleCN}</h2>
          <p className="lp-motion-body">{liftPodMotion.bodyCN}</p>

          <div className="lp-motion-states">
            <span className="lp-motion-state font-en">CLOSED</span>
            <span className="lp-motion-arrow" aria-hidden="true">→</span>
            <span className="lp-motion-state lp-motion-state--blue font-en">
              LIFTED
            </span>
            <span className="lp-motion-arrow" aria-hidden="true">→</span>
            <span className="lp-motion-state font-en">CLOSED</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================================
   07 · DESIGN PROCESS
   ============================================================ */
function ProcessSection() {
  const stages = [
    {
      num: '01',
      en: '3D Modeling',
      cn: '三维建模',
      image: liftPodProcess.modeling.image,
      imageAlt: liftPodProcess.modeling.imageAlt,
    },
    {
      num: '02',
      en: 'Structure',
      cn: '结构设计',
      image: liftPodProcess.structure.image,
      imageAlt: liftPodProcess.structure.imageAlt,
    },
    {
      num: '03',
      en: 'Visualization',
      cn: '产品渲染',
      image: liftPodProcess.visualization.image,
      imageAlt: liftPodProcess.visualization.imageAlt,
    },
  ];
  return (
    <section className="lp-process" aria-label="设计过程">
      <div className="container">
        <ScrollReveal variant="fade-up" className="lp-section-head">
          <span className="lp-section-num label label-blue font-en">07</span>
          <h2 className="lp-section-title">{liftPodProcess.titleCN}</h2>
        </ScrollReveal>

        <div className="lp-process-grid">
          {stages.map((s, i) => (
            <ScrollReveal
              key={s.num}
              variant="blur-up"
              delay={i * 90}
              className="lp-process-cell"
            >
              <motion.div
                className="lp-img-frame"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                data-cursor="image"
                data-cursor-text="VIEW"
              >
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
              <div className="lp-process-meta">
                <span className="lp-process-num label-blue font-en">{s.num}</span>
                <div className="lp-process-names">
                  <span className="lp-process-en font-en">{s.en}</span>
                  <span className="lp-process-cn">{s.cn}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   08 · CLOSING
   ============================================================ */
function ClosingSection() {
  return (
    <section className="lp-closing" aria-label="项目收尾">
      <div className="container lp-closing-inner">
        <ScrollReveal variant="fade-up" className="lp-closing-head">
          <span className="lp-section-num label label-blue font-en">08</span>
          <h2 className="lp-closing-title">{liftPodClosing.titleCN}</h2>
          <p className="lp-closing-body">{liftPodClosing.bodyCN}</p>
        </ScrollReveal>

        <ScrollReveal
          variant="fade-up"
          delay={160}
          className="lp-closing-actions"
        >
          <Link to="/works" className="lp-closing-link" data-cursor="link">
            <span aria-hidden="true">←</span>
            <span>返回作品列表</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================================
   Entry
   ============================================================ */
export default function LiftpodDetail() {
  return (
    <main className="lp-detail">
      <HeroSection />
      <PositioningSection />
      <OverviewSection />
      <DetailsSection />
      <StructureSection />
      <MotionSection />
      <ProcessSection />
      <ClosingSection />
    </main>
  );
}
