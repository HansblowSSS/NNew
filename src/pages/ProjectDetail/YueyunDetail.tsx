import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import YueyunDotGridBackground from './YueyunDotGridBackground';
import { yueyun } from '../../data/yueyun';
import './YueyunDetail.css';

/* ============================================================
   TOKENS — local to the Yueyun page, scoped under .yy-page so
   they don't pollute the global design system.
   ============================================================ */

/** Split a string at Chinese / English punctuation so each visual
 *  line breaks on a natural boundary and never mid-word. Empty
 *  chunks (consecutive punctuation) are dropped. */
function splitAtPunctuation(s: string): string[] {
  if (!s) return [];
  const tokens = s.split(/([。，；：！？、,. ; : ! ?\n])/g);
  const out: string[] = [];
  let buf = '';
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (!t) continue;
    if (i % 2 === 0) {
      buf += t;
    } else {
      buf += t;
      // Newline explicitly flushes without consuming the punctuation
      // — punctuation has already been glued to the previous line.
      out.push(buf);
      buf = '';
    }
  }
  if (buf) out.push(buf);
  return out;
}

/* ============================================================
   HOOKS
   ============================================================ */

function useSectionParallax(ref: React.RefObject<HTMLElement>, depth = 60) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ['start end', 'end start'],
  });
  return {
    bgY: useTransform(scrollYProgress, [0, 1], [reduce ? 0 : depth, reduce ? 0 : -depth]),
    textY: useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -12, reduce ? 0 : 12]),
  };
}

/* ============================================================
   SECTION 01 · HERO
   ============================================================ */

function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { bgY } = useSectionParallax(ref, 60);

  return (
    <section className="yy-hero" ref={ref} aria-label="粤韵芳华主视觉">
      <motion.div
        className="yy-hero-bg"
        aria-hidden="true"
        style={{ y: bgY }}
      >
        <img
          src={yueyun.heroImage}
          alt={yueyun.heroImageAlt}
          className="yy-hero-img"
        />
        <div className="yy-hero-veil" aria-hidden="true" />
      </motion.div>

      <div className="yy-hero-inner">
        <div className="yy-hero-text">
          <ScrollReveal variant="fade-up">
            <span className="yy-tag font-en">05 / 06 — CULTURAL CREATIVE</span>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={80}>
            <h1 className="yy-hero-title font-cn">
              <span className="yy-hero-title-cn">{yueyun.titleCN}</span>
              <span className="yy-hero-title-en font-en">{yueyun.titleEN}</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={180}>
            <p className="yy-hero-subtitle font-cn">{yueyun.heroSubtitle}</p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={260}>
            <p className="yy-hero-body font-cn">{yueyun.heroBody}</p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={360}>
            <ul className="yy-hero-keywords font-cn">
              {yueyun.heroKeywords.map((k) => (
                <li key={k}>
                  <span className="yy-hero-kw-dot" aria-hidden="true" />
                  {k}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>

      <ScrollReveal variant="fade" delay={400} className="yy-hero-back-wrap">
        <Link to="/works" className="yy-back" data-cursor="link">
          <span aria-hidden="true">←</span>
          <span className="font-en">Back to My Work</span>
        </Link>
      </ScrollReveal>

      <ScrollReveal variant="fade" delay={reduce ? 0 : 500} className="yy-hero-scroll-hint">
        <span className="yy-hero-scroll-line" aria-hidden="true" />
        <span className="font-en">SCROLL</span>
      </ScrollReveal>
    </section>
  );
}

/* ============================================================
   SECTION 02 · CULTURE
   ============================================================ */

function CultureSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { textY } = useSectionParallax(ref, 16);
  const c = yueyun.culture;

  return (
    <section className="yy-culture" ref={ref} aria-label="文化来源">
      <motion.div className="yy-culture-inner" style={{ y: textY }}>
        <ScrollReveal variant="fade-up" className="yy-section-head yy-culture-head">
          <span className="yy-section-num font-en">
            {c.index} / {c.indexEN}
          </span>
          <h2 className="yy-section-title font-cn">
            {splitAtPunctuation(c.titleCN).map((line, i) => (
              <span className="yy-line" key={`ct${i}`}>
                {line}
              </span>
            ))}
          </h2>
          <p className="yy-section-subtitle font-cn">{c.subtitleCN}</p>
        </ScrollReveal>

        <ul className="yy-culture-refs" aria-label="六款角色传统造型参考">
          {c.references.map((r, i) => (
            <ScrollReveal
              key={r.id}
              variant="fade-up"
              delay={i * 80}
              as="li"
              className="yy-culture-ref"
            >
              <figure className="yy-img-frame" style={{ aspectRatio: '1 / 1' }}>
                <span className="yy-culture-ref-num font-en" aria-hidden="true">
                  {r.num}
                </span>
                <img
                  src={r.image}
                  alt={r.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="yy-culture-ref-cap">
                <span className="yy-culture-ref-name font-cn">{r.nameCN}</span>
                <span className="yy-culture-ref-en font-en">{r.nameEN}</span>
              </div>
            </ScrollReveal>
          ))}
        </ul>

        <ScrollReveal variant="fade-up" delay={120} className="yy-culture-body font-cn">
          <p>{c.bodyCN}</p>
        </ScrollReveal>
      </motion.div>
    </section>
  );
}

/* ============================================================
   SECTION 03 · DESIGN
   ============================================================ */

function DesignSection() {
  const d = yueyun.design;

  return (
    <section className="yy-design" id="yy-design" aria-label="设计解析">
      <div className="yy-design-inner">
      <ScrollReveal variant="fade-up" className="yy-section-head yy-design-head">
        <span className="yy-section-num font-en">
          {d.index} / {d.indexEN}
        </span>
        <h2 className="yy-section-title font-cn">
          {splitAtPunctuation(d.titleCN).map((line, i) => (
            <span className="yy-line" key={`dt${i}`}>
              {line}
            </span>
          ))}
        </h2>
        <p className="yy-section-subtitle font-cn">{d.subtitleCN}</p>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={120} className="yy-design-intro font-cn">
        <p>{d.bodyCN}</p>
      </ScrollReveal>

      <ol className="yy-design-rail" aria-label="设计过程三阶段">
        {d.phases.map((p, i) => (
          <ScrollReveal
            key={p.num}
            variant="fade-up"
            delay={i * 120}
            className="yy-design-phase"
          >
            <div className="yy-design-phase-marker">
              <span className="yy-design-phase-num font-en">{p.num}</span>
              <h3 className="yy-design-phase-cn font-cn">{p.cnTitle}</h3>
            </div>
            <figure className="yy-img-frame yy-design-phase-img" style={{ aspectRatio: '4 / 3' }}>
              <img src={p.image} alt={p.cnTitle} loading="lazy" decoding="async" />
            </figure>
            <div className="yy-design-phase-text">
              <p className="yy-design-phase-en font-en">{p.enTitle}</p>
              <p className="yy-design-phase-note font-cn">{p.note}</p>
            </div>
          </ScrollReveal>
        ))}
      </ol>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 04 · COLLECTION — 六款角色（错落式）
   ============================================================ */

function CollectionSection() {
  const c = yueyun.collection;

  return (
    <section className="yy-collection" id="yy-collection" aria-label="六款角色">
      <div className="yy-collection-inner">
      <ScrollReveal variant="fade-up" className="yy-section-head yy-collection-head">
        <span className="yy-section-num font-en">
          {c.index} / {c.indexEN}
        </span>
        <h2 className="yy-section-title font-cn">
          {splitAtPunctuation(c.titleCN).map((line, i) => (
            <span className="yy-line" key={`ctt${i}`}>
              {line}
            </span>
          ))}
        </h2>
        <p className="yy-section-subtitle font-cn">{c.subtitleCN}</p>
        <p className="yy-collection-intro font-cn">{c.bodyCN}</p>
      </ScrollReveal>

      <ol className="yy-collection-grid" aria-label="六款角色">
        {c.roles.map((role, i) => {
          // Alternating layout: even → image left, odd → image right.
          const flip = i % 2 === 1;
          return (
            <ScrollReveal
              key={role.id}
              variant="fade-up"
              delay={i * 80}
              as="li"
              className={`yy-role${flip ? ' yy-role--flip' : ''}`}
            >
              <figure className="yy-role-figure">
                <span className="yy-role-num font-en" aria-hidden="true">
                  {role.num}
                </span>
                <img
                  src={role.image}
                  alt={role.nameCN}
                  loading="lazy"
                  decoding="async"
                  className="yy-role-img"
                />
              </figure>
              <div className="yy-role-text">
                <h3 className="yy-role-name font-cn">{role.nameCN}</h3>
                <p className="yy-role-name-en font-en">{role.nameEN}</p>
                <p className="yy-role-intro font-cn">{role.intro}</p>
              </div>
            </ScrollReveal>
          );
        })}
      </ol>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 05 · PRODUCT SERIES
   ============================================================ */

function SeriesSection() {
  const s = yueyun.series;

  return (
    <section className="yy-series" id="yy-series" aria-label="系列产品">
      <div className="yy-series-inner">
      <ScrollReveal variant="fade-up" className="yy-section-head yy-series-head">
        <span className="yy-section-num font-en">
          {s.index} / {s.indexEN}
        </span>
        <h2 className="yy-section-title font-cn">
          {splitAtPunctuation(s.titleCN).map((line, i) => (
            <span className="yy-line" key={`st${i}`}>
              {line}
            </span>
          ))}
        </h2>
        <p className="yy-section-subtitle font-cn">{s.subtitleCN}</p>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={120} className="yy-series-intro font-cn">
        <p>{s.bodyCN}</p>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={180} className="yy-series-keywords font-cn">
        {s.keywords.map((k) => (
          <span className="yy-series-kw" key={k}>
            {k}
          </span>
        ))}
      </ScrollReveal>

      <ol className="yy-series-list" aria-label="系列产品">
        {s.cards.map((card, i) => {
          // Alternating layout: even → image left, text right; odd → flipped.
          const flip = i % 2 === 1;
          return (
            <ScrollReveal
              key={card.num}
              variant="fade-up"
              delay={i * 100}
              as="li"
              className={`yy-series-row${flip ? ' yy-series-row--flip' : ''}`}
            >
              <figure className="yy-series-row-figure">
                <span className="yy-series-row-num font-en" aria-hidden="true">
                  {card.num}
                </span>
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="yy-series-row-img"
                />
              </figure>
              <div className="yy-series-row-text">
                <h3 className="yy-series-row-title font-cn">{card.titleCN}</h3>
                <p className="yy-series-row-title-en font-en">{card.titleEN}</p>
                <p className="yy-series-row-body font-cn">{card.bodyCN}</p>
              </div>
            </ScrollReveal>
          );
        })}
      </ol>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 06 · CLOSING
   ============================================================ */

function ClosingSection() {
  const c = yueyun.closing;

  return (
    <section className="yy-closing" id="yy-closing" aria-label="项目价值总结">
      <div className="yy-closing-bg" aria-hidden="true">
        <img src={c.image} alt="" loading="lazy" decoding="async" />
        <div className="yy-closing-bg-veil" />
      </div>

      <div className="yy-closing-inner">
        <ScrollReveal variant="fade-up" className="yy-closing-head">
          <span className="yy-closing-rule" aria-hidden="true" />
          <h2 className="yy-closing-title font-cn">
            {c.titleCN === '让传统文化，被看见、被喜爱、被收藏' ? (
              <>
                <span className="yy-closing-title-line">让传统文化</span>
                <span className="yy-closing-title-line">被看见、被喜爱、被收藏</span>
              </>
            ) : (
              splitAtPunctuation(c.titleCN).map((line, i) => (
                <span className="yy-line" key={`ct${i}`}>
                  {line}
                </span>
              ))
            )}
          </h2>
          <p className="yy-closing-title-en font-en">{c.titleEN}</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={120} className="yy-closing-body font-cn">
          <p>{c.bodyCN}</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={200} className="yy-closing-foot">
          <Link to="/works" className="yy-closing-back" data-cursor="link">
            <span className="font-en">← Back to My Work</span>
          </Link>
          <a
            href="#yy-hero"
            className="yy-closing-top"
            data-cursor="link"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="font-en">Back to Top</span>
            <span className="yy-closing-top-arrow" aria-hidden="true">
              ↑
            </span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function YueyunDetail() {
  // Switch the global custom cursor to a light/white ring + dot
  // while this dark detail page is mounted, and restore the default
  // ink cursor when the user leaves the page.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const prev = root.dataset.cursorTheme ?? '';
    root.dataset.cursorTheme = 'inverse';
    return () => {
      if (prev) {
        root.dataset.cursorTheme = prev;
      } else {
        delete root.dataset.cursorTheme;
      }
    };
  }, []);

  return (
    <main className="yy-page" id="yy-hero">
      {/* Fixed dot-grid background for every section below the hero.
          Sits at z-index 0; section content is above it. */}
      <YueyunDotGridBackground />
      <HeroSection />
      <CultureSection />
      <DesignSection />
      <CollectionSection />
      <SeriesSection />
      <ClosingSection />
    </main>
  );
}

// re-export for any future tests / hooks
export { splitAtPunctuation, useSectionParallax as useYueyunParallax };
