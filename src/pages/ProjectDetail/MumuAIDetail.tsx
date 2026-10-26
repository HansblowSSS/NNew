import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { mumuAI } from '../../data/mumuAI';
import './MumuAIDetail.css';

/* ============================================================
   HOOKS
   ============================================================ */

function useSectionParallax(ref: React.RefObject<HTMLElement>, bgDepth = 80, fgDepth = 30) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ['start end', 'end start'],
  });
  return {
    bgY: useTransform(scrollYProgress, [0, 1], [reduce ? 0 : bgDepth, reduce ? 0 : -bgDepth]),
    fgY: useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -fgDepth, reduce ? 0 : fgDepth]),
    textY: useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -18, reduce ? 0 : 18]),
  };
}

/** Split string at Chinese/English punctuation, gluing punctuation to end of line */
function splitAtPunctuation(s: string): string[] {
  if (!s) return [];
  const tokens = s.split(/([，。；：！？、,.])/g);
  const out: string[] = [];
  let buf = '';
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (!t) continue;
    if (i % 2 === 0) buf += t;
    else { buf += t; out.push(buf); buf = ''; }
  }
  if (buf) out.push(buf);
  return out;
}

/* ============================================================
   SECTION 01 · HERO
   ============================================================ */
function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const textOp = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="ma-hero" ref={ref} aria-label="木木AI产品主视觉">
      <motion.div className="ma-hero-bg" aria-hidden="true" style={{ y: bgY }}>
        {mumuAI.hero.video ? (
          <video
            className="ma-hero-bg-video"
            src={mumuAI.hero.video}
            poster={mumuAI.hero.image}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <img src={mumuAI.hero.image} alt="" className="ma-hero-bg-img" />
        )}
        <div className="ma-hero-bg-veil" />
      </motion.div>

      <div className="ma-hero-inner">
        <motion.div className="ma-hero-text" style={{ y: textY, opacity: textOp }}>
          <ScrollReveal variant="fade-up">
            <span className="ma-tag font-en">{mumuAI.hero.tag}</span>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={80}>
            <h1 className="ma-hero-title font-cn">{mumuAI.hero.titleCN}</h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={160}>
            <p className="ma-hero-slogan font-cn">{mumuAI.hero.sloganCN}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={240}>
            <p className="ma-hero-body font-cn">{mumuAI.hero.bodyCN}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={320}>
            <ul className="ma-hero-kw font-cn">
              {mumuAI.hero.keywords.map((k) => (
                <li key={k}>
                  <span className="ma-hero-kw-dot" aria-hidden="true" />
                  {k}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </motion.div>
      </div>

      <ScrollReveal variant="fade" delay={400} className="ma-hero-back-wrap">
        <Link to="/works" className="ma-back" data-cursor="link">
          <span aria-hidden="true">←</span>
          <span className="font-en">Back to My Work</span>
        </Link>
      </ScrollReveal>

      <ScrollReveal variant="fade" delay={reduce ? 0 : 500} className="ma-hero-scroll-hint">
        <span className="ma-hero-scroll-line" aria-hidden="true" />
        <span className="font-en">SCROLL</span>
      </ScrollReveal>
    </section>
  );
}

/* ============================================================
   SECTION 02 · PRODUCT POSITIONING
   ============================================================ */
function PositioningSection() {
  const ref = useRef<HTMLElement | null>(null);
  const parallax = useSectionParallax(ref, 60, 20);

  return (
    <section className="ma-positioning" ref={ref} aria-label="产品定位">
      <div className="ma-inner">
        <div className="ma-pos-grid">
          <div className="ma-pos-copy">
            <ScrollReveal variant="fade-up">
              <span className="ma-section-num font-en">{mumuAI.positioning.index} / {mumuAI.positioning.indexEN}</span>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={80}>
              <h2 className="ma-section-title font-cn">
                {splitAtPunctuation(mumuAI.positioning.titleCN).map((line, i) => (
                  <span className="ma-line" key={i}>{line}</span>
                ))}
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={160}>
              <p className="ma-section-body font-cn">{mumuAI.positioning.bodyCN}</p>
            </ScrollReveal>
            <div className="ma-pos-directions">
              {mumuAI.positioning.directions.map((d, i) => (
                <ScrollReveal key={d.title} variant="fade-up" delay={200 + i * 80} className="ma-pos-dir">
                  <span className="ma-pos-dir-num font-en">0{i + 1}</span>
                  <div>
                    <h3 className="ma-pos-dir-title font-cn">{d.title}</h3>
                    <p className="ma-pos-dir-body font-cn">{d.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
          <ScrollReveal variant="blur-up" delay={120} className="ma-pos-visual">
            <motion.div style={{ y: parallax.fgY }} data-cursor="image" data-cursor-text="VIEW">
              <img src={mumuAI.positioning.productImage} alt={mumuAI.positioning.productImageAlt} loading="lazy" decoding="async" />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 03 · CORE FEATURES
   ============================================================ */
function FeaturesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const parallax = useSectionParallax(ref, 50, 16);

  return (
    <section className="ma-features" ref={ref} aria-label="核心功能">
      <div className="ma-inner">
        <ScrollReveal variant="fade-up" className="ma-section-head">
          <span className="ma-section-num font-en">{mumuAI.features.index} / {mumuAI.features.indexEN}</span>
          <h2 className="ma-section-title font-cn">
            {splitAtPunctuation(mumuAI.features.titleCN).map((line, i) => (
              <span className="ma-line" key={i}>{line}</span>
            ))}
          </h2>
          <p className="ma-section-subtitle font-cn">{mumuAI.features.subtitleCN}</p>
        </ScrollReveal>

        <div className="ma-feat-main">
          <ScrollReveal variant="blur-up" delay={100} className="ma-feat-primary">
            <motion.img
              src={mumuAI.features.colorImage}
              alt={mumuAI.features.colorImageAlt}
              loading="lazy"
              decoding="async"
              style={{ y: parallax.fgY }}
            />
          </ScrollReveal>
          <div className="ma-feat-list">
            {mumuAI.features.items.map((item, i) => (
              <ScrollReveal key={item.num} variant="fade-up" delay={80 + i * 60} className="ma-feat-item">
                <span className="ma-feat-num font-en">{item.num}</span>
                <div className="ma-feat-content">
                  <h3 className="ma-feat-title font-cn">{item.title}</h3>
                  <p className="ma-feat-body font-cn">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="ma-feat-screens">
          {mumuAI.features.items.filter(i => i.image).map((item, i) => (
            <ScrollReveal key={item.num} variant="fade-up" delay={i * 80} className="ma-feat-screen">
              <img src={item.image} alt={item.imageAlt} loading="lazy" decoding="async" />
              <p className="ma-feat-screen-cap font-cn">{item.title}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 04 · IP & CULTURE
   ============================================================ */
function CultureSection() {
  const ref = useRef<HTMLElement | null>(null);
  const parallax = useSectionParallax(ref, 40, 16);

  return (
    <section className="ma-culture" ref={ref} aria-label="非遗文化与IP设计">
      <div className="ma-inner">
        <ScrollReveal variant="fade-up" className="ma-section-head">
          <span className="ma-section-num font-en">{mumuAI.culture.index} / {mumuAI.culture.indexEN}</span>
          <h2 className="ma-section-title font-cn">
            {splitAtPunctuation(mumuAI.culture.titleCN).map((line, i) => (
              <span className="ma-line" key={i}>{line}</span>
            ))}
          </h2>
          <p className="ma-section-body font-cn">{mumuAI.culture.bodyCN}</p>
        </ScrollReveal>

        <div className="ma-culture-rail">
          {mumuAI.culture.directions.map((d, i) => {
            const flip = i % 2 === 1;
            return (
              <ScrollReveal
                key={d.id}
                variant="fade-up"
                delay={i * 100}
                className={`ma-culture-item${flip ? ' ma-culture-item--flip' : ''}`}
              >
                <div className="ma-culture-item-copy">
                  <h3 className="ma-culture-item-title font-cn">{d.title}</h3>
                  <p className="ma-culture-item-body font-cn">{d.body}</p>
                </div>
                <motion.div className="ma-culture-item-visual" style={{ y: parallax.textY }}>
                  <span className="ma-culture-item-num font-en">0{i + 1}</span>
                  <img src={d.image} alt={d.imageAlt} loading="lazy" decoding="async" className="ma-culture-item-img" />
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 05 · CHARACTER COLLECTION
   ============================================================ */
function CharactersSection() {
  return (
    <section className="ma-chars" aria-label="角色系列">
      <div className="ma-inner">
        <ScrollReveal variant="fade-up" className="ma-section-head">
          <span className="ma-section-num font-en">{mumuAI.characters.index} / {mumuAI.characters.indexEN}</span>
          <h2 className="ma-section-title font-cn">
            {splitAtPunctuation(mumuAI.characters.titleCN).map((line, i) => (
              <span className="ma-line" key={i}>{line}</span>
            ))}
          </h2>
          <p className="ma-section-body font-cn">{mumuAI.characters.bodyCN}</p>
        </ScrollReveal>

        <ol className="ma-char-grid" aria-label="五款角色">
          {mumuAI.characters.roles.map((role, i) => {
            const flip = i % 2 === 1;
            return (
              <ScrollReveal
                key={role.id}
                variant="fade-up"
                delay={i * 80}
                as="li"
                className={`ma-char${flip ? ' ma-char--flip' : ''}`}
              >
                <figure className="ma-char-figure">
                  <span className="ma-char-num font-en" aria-hidden="true">{role.num}</span>
                  <img
                    src={role.image}
                    alt={role.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="ma-char-img"
                  />
                </figure>
                <div className="ma-char-text">
                  <h3 className="ma-char-name font-cn">{role.nameCN}</h3>
                  <p className="ma-char-name-en font-en">{role.nameEN}</p>
                  <p className="ma-char-intro font-cn">{role.intro}</p>
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
   SECTION 06 · AI EXPERIENCE
   ============================================================ */
function AIExperienceSection() {
  const ref = useRef<HTMLElement | null>(null);
  const parallax = useSectionParallax(ref, 50, 16);

  return (
    <section className="ma-ai" ref={ref} aria-label="AI技术与交互体验">
      <div className="ma-inner">
        <ScrollReveal variant="fade-up" className="ma-section-head">
          <span className="ma-section-num font-en">{mumuAI.aiExperience.index} / {mumuAI.aiExperience.indexEN}</span>
          <h2 className="ma-section-title font-cn">
            {splitAtPunctuation(mumuAI.aiExperience.titleCN).map((line, i) => (
              <span className="ma-line" key={i}>{line}</span>
            ))}
          </h2>
          <p className="ma-section-body font-cn">{mumuAI.aiExperience.bodyCN}</p>
        </ScrollReveal>

        <div className="ma-ai-flow">
          {mumuAI.aiExperience.steps.map((step, i) => (
            <ScrollReveal key={step.num} variant="fade-up" delay={i * 100} className="ma-ai-step">
              <div className="ma-ai-step-head">
                <span className="ma-ai-step-num font-en">{step.num}</span>
                <h3 className="ma-ai-step-label font-cn">{step.label}</h3>
              </div>
              <p className="ma-ai-step-body font-cn">{step.body}</p>
              {i < mumuAI.aiExperience.steps.length - 1 && (
                <span className="ma-ai-arrow" aria-hidden="true">→</span>
              )}
            </ScrollReveal>
          ))}
        </div>

        <div className="ma-ai-visual">
          <ScrollReveal variant="blur-up" delay={100} className="ma-ai-product">
            <motion.img
              src={mumuAI.aiExperience.productImage}
              alt={mumuAI.aiExperience.productImageAlt}
              loading="lazy"
              decoding="async"
              style={{ y: parallax.fgY }}
            />
          </ScrollReveal>
          <div className="ma-ai-models">
            <p className="ma-ai-models-label font-cn">{mumuAI.aiExperience.multiModal}</p>
            <div className="ma-ai-models-grid">
              {mumuAI.aiExperience.models.map((m) => (
                <div key={m.name} className="ma-ai-model">
                  <span className="ma-ai-model-name font-en">{m.name}</span>
                  <span className="ma-ai-model-desc font-cn">{m.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 07 · DAILY SCENARIOS
   ============================================================ */
function ScenariosSection() {
  const ref = useRef<HTMLElement | null>(null);

  return (
    <section className="ma-scenarios" ref={ref} aria-label="日常使用场景">
      <div className="ma-inner ma-scenarios-inner">
        <ScrollReveal variant="fade-up" className="ma-section-head ma-scenarios-head">
          <span className="ma-section-num font-en">{mumuAI.scenarios.index} / {mumuAI.scenarios.indexEN}</span>
          <h2 className="ma-section-title font-cn">
            {splitAtPunctuation(mumuAI.scenarios.titleCN).map((line, i) => (
              <span className="ma-line" key={i}>{line}</span>
            ))}
          </h2>
          <p className="ma-section-body font-cn">{mumuAI.scenarios.bodyCN}</p>
        </ScrollReveal>

        <div className="ma-scenario-list">
          {mumuAI.scenarios.items.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <ScrollReveal
                key={item.num}
                variant="fade-up"
                delay={i * 80}
                className={`ma-scenario${flip ? ' ma-scenario--flip' : ''}`}
              >
                <div className="ma-scenario-media">
                  <div className="ma-scenario-img-wrap">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="ma-scenario-img"
                    />
                  </div>
                </div>

                <div className="ma-scenario-text">
                  <span className="ma-scenario-meta font-en">
                    <span className="ma-scenario-num">{item.num}</span>
                    <span className="ma-scenario-divider" aria-hidden="true" />
                    <span className="ma-scenario-time">{item.time}</span>
                  </span>
                  <h3 className="ma-scenario-title font-cn">{item.title}</h3>
                  <p className="ma-scenario-body font-cn">{item.body}</p>
                </div>              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 08 · DESIGN DETAILS
   ============================================================ */
function DesignDetailsSection() {
  const ref = useRef<HTMLElement | null>(null);
  const parallax = useSectionParallax(ref, 50, 20);

  return (
    <section className="ma-details" ref={ref} aria-label="产品结构与设计细节">
      <div className="ma-inner">
        <ScrollReveal variant="fade-up" className="ma-section-head">
          <span className="ma-section-num font-en">{mumuAI.designDetails.index} / {mumuAI.designDetails.indexEN}</span>
          <h2 className="ma-section-title font-cn">
            {splitAtPunctuation(mumuAI.designDetails.titleCN).map((line, i) => (
              <span className="ma-line" key={i}>{line}</span>
            ))}
          </h2>
          <p className="ma-section-body font-cn">{mumuAI.designDetails.bodyCN}</p>
        </ScrollReveal>

        <div className="ma-details-grid">
          <ScrollReveal variant="blur-up" delay={100} className="ma-details-main">
            <motion.img
              src={mumuAI.designDetails.structureImage}
              alt={mumuAI.designDetails.structureImageAlt}
              loading="lazy"
              decoding="async"
              style={{ y: parallax.fgY }}
            />
          </ScrollReveal>
          <div className="ma-details-list">
            {mumuAI.designDetails.items.map((item, i) => (
              <ScrollReveal key={item.num} variant="fade-up" delay={80 + i * 80} className="ma-detail">
                <span className="ma-detail-num font-en">{item.num}</span>
                <div>
                  <h3 className="ma-detail-title font-cn">{item.title}</h3>
                  <p className="ma-detail-body font-cn">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 09 · TECHNICAL NOTES
   ============================================================ */
function TechNotesSection() {
  return (
    <section className="ma-tech" aria-label="技术规划与风险告知">
      <div className="ma-inner">
        <ScrollReveal variant="fade-up" className="ma-section-head">
          <span className="ma-section-num font-en">{mumuAI.techNotes.index} / {mumuAI.techNotes.indexEN}</span>
          <h2 className="ma-section-title font-cn">
            {splitAtPunctuation(mumuAI.techNotes.titleCN).map((line, i) => (
              <span className="ma-line" key={i}>{line}</span>
            ))}
          </h2>
          <p className="ma-section-body font-cn">{mumuAI.techNotes.bodyCN}</p>
        </ScrollReveal>

        <div className="ma-tech-notes">
          {mumuAI.techNotes.notes.map((note, i) => (
            <ScrollReveal key={note.title} variant="fade-up" delay={i * 80} className="ma-tech-note">
              <h3 className="ma-tech-note-title font-cn">{note.title}</h3>
              <p className="ma-tech-note-body font-cn">{note.body}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 10 · CLOSING
   ============================================================ */
function ClosingSection() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);

  return (
    <section className="ma-closing" ref={ref} aria-label="项目收束">
      <motion.div className="ma-closing-bg" aria-hidden="true" style={{ y: bgY }}>
        <img src={mumuAI.closing.image} alt="" className="ma-closing-bg-img" />
        <div className="ma-closing-bg-veil" />
      </motion.div>

      <div className="ma-closing-inner">
        <motion.div style={{ y: textY }}>
          <ScrollReveal variant="fade-up">
            <span className="ma-tag font-en">{mumuAI.closing.tag}</span>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={80}>
            <h2 className="ma-closing-title font-cn">{mumuAI.closing.titleCN}</h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={180}>
            <p className="ma-closing-body font-cn">{mumuAI.closing.bodyCN}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={300} className="ma-closing-foot">
            <Link to="/works" className="ma-closing-back" data-cursor="link">
              <span aria-hidden="true">←</span>
              <span className="font-en">Back to My Work</span>
            </Link>
            <button
              className="ma-closing-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              data-cursor="link"
            >
              <span className="font-en">Back to Top</span>
              <span className="ma-closing-top-arrow" aria-hidden="true">↑</span>
            </button>
          </ScrollReveal>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function MumuAIDetail() {
  return (
    <main className="ma-page">
      <HeroSection />
      <PositioningSection />
      <FeaturesSection />
      <CultureSection />
      <CharactersSection />
      <AIExperienceSection />
      <ScenariosSection />
      <DesignDetailsSection />
      <TechNotesSection />
      <ClosingSection />
    </main>
  );
}
