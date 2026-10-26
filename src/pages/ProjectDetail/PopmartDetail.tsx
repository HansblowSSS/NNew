import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import {
  popmartHero,
  popmartChapters,
  popmartWorkflow,
  popmartClosing,
} from '../../data/popmartPoster';
import './PopmartDetail.css';

/* -----------------------------------------------------------------
   Small, focused components — page is split so it's not one giant
   monolith. Each subcomponent reuses existing project primitives.
   ----------------------------------------------------------------- */

function PosterThumb({
  src,
  label,
  index,
}: {
  src: string;
  label: string;
  index: number;
}) {
  return (
    <ScrollReveal variant="fade-up" delay={index * 120}>
      <Link
        to="/works/popmart-poster"
        className="pop-hero-thumb"
        data-cursor="image"
        data-cursor-text={label}
        aria-label={`跳到 ${label}`}
      >
        <span className="pop-hero-thumb-num">0{index + 1}</span>
        <span className="pop-hero-thumb-frame">
          <img src={src} alt={label} loading="lazy" decoding="async" />
        </span>
        <span className="pop-hero-thumb-label">{label}</span>
      </Link>
    </ScrollReveal>
  );
}

function HeroSection() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Subtle mouse-style parallax: shrink the lede slightly with scroll.
  // Disabled when reduced-motion is requested.
  const ledeY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -24]);
  const ledeOpacity = useTransform(scrollY, [0, 500], [1, reduce ? 1 : 0.6]);

  return (
    <section className="pop-hero">
      <div className="container pop-hero-inner">
        {/* Top meta strip — competition + award (light text labels) */}
        <ScrollReveal variant="fade" delay={0} className="pop-hero-meta">
          <span className="pop-hero-meta-rule" aria-hidden="true" />
          <span className="label">{popmartHero.competition}</span>
          <span className="pop-hero-meta-dot" aria-hidden="true" />
          <span className="label pop-hero-meta-award">{popmartHero.award}</span>
        </ScrollReveal>

        {/* Title block — English restrained, Chinese primary */}
        <div className="pop-hero-title">
          <ScrollReveal variant="fade-up">
            <span className="pop-hero-title-en font-en">
              {popmartHero.titleEN}
            </span>
          </ScrollReveal>
          <ScrollReveal variant="blur-up" delay={120}>
            <h1 className="pop-hero-title-cn">{popmartHero.titleCN}</h1>
          </ScrollReveal>
        </div>

        {/* Tagline + lede */}
        <motion.div
          className="pop-hero-lede"
          style={{ y: ledeY, opacity: ledeOpacity }}
        >
          <ScrollReveal variant="fade-up" delay={220}>
            <p className="pop-hero-tagline">「{popmartHero.tagline}」</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={320}>
            <p className="pop-hero-paragraph">{popmartHero.lede}</p>
          </ScrollReveal>
        </motion.div>

        {/* Three poster thumbnails — visual entry to the work */}
        <div className="pop-hero-thumbs">
          {popmartHero.posters.map((src, i) => (
            <PosterThumb
              key={src}
              src={src}
              label={popmartHero.posterLabels[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChapterSection({
  chapter,
  index,
}: {
  chapter: (typeof popmartChapters)[number];
  index: number;
}) {
  const isLeft = chapter.layout === 'left';
  // Alternating entry directions — text "comes from" the image side
  const imageFromX = isLeft ? -24 : 24;
  const textFromX = isLeft ? 24 : -24;

  return (
    <section
      className={`pop-chapter pop-chapter-${chapter.layout}`}
      aria-label={`第 ${chapter.num} 章 ${chapter.titleCN}`}
    >
      <div className="container pop-chapter-grid">
        {/* Image */}
        <ScrollReveal
          variant="blur-up"
          delay={0}
          className="pop-chapter-image"
          as="figure"
        >
          <motion.div
            className="pop-chapter-image-frame"
            data-cursor="image"
            data-cursor-text="VIEW"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ aspectRatio: '3 / 4' }}
          >
            <img
              src={chapter.image}
              alt={chapter.imageAlt}
              loading="lazy"
              decoding="async"
            />
            <span className="pop-chapter-image-meta" aria-hidden="true">
              <span className="label">POSTER · 0{index + 1}</span>
            </span>
          </motion.div>
        </ScrollReveal>

        {/* Text */}
        <ScrollReveal
          variant="fade-up"
          delay={140}
          className="pop-chapter-text"
        >
          <div className="pop-chapter-head">
            <span className="pop-chapter-num label-blue font-en">
              {chapter.num}
            </span>
            <h2 className="pop-chapter-title">
              {chapter.titleCN}
              <span className="pop-chapter-title-en font-en">
                {chapter.titleEN}
              </span>
            </h2>
          </div>

          <p className="pop-chapter-subtitle">{chapter.subtitle}</p>

          <div className="pop-chapter-body">
            {chapter.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section className="pop-workflow">
      <div className="container">
        <ScrollReveal variant="fade-up" className="pop-workflow-head">
          <span className="label label-blue">— 创作工作流 · Creative Workflow</span>
          <h2 className="pop-workflow-title">创作工作流</h2>
          <p className="pop-workflow-intro">
            从赛事解读到成品落地，六步构建完整创作链路——自主设计主导，AI 工具辅助执行。
          </p>
        </ScrollReveal>

        {/* Lightweight flow indicator — no heavy divider, just a hairline + dots */}
        <ScrollReveal variant="fade" delay={100} className="pop-workflow-flow">
          <span className="pop-workflow-flow-rule" aria-hidden="true" />
          {popmartWorkflow.map((s) => (
            <span
              key={s.num}
              className="pop-workflow-flow-dot"
              data-num={s.num}
              aria-hidden="true"
            />
          ))}
        </ScrollReveal>

        <div className="pop-workflow-grid">
          {popmartWorkflow.map((step, i) => (
            <ScrollReveal
              key={step.num}
              variant="fade-up"
              delay={i * 90}
              className={`pop-workflow-step${step.highlight ? ' is-highlight' : ''}`}
            >
              <span className="pop-workflow-step-num label-blue font-en">
                {step.num}
              </span>
              <h3 className="pop-workflow-step-title">{step.titleCN}</h3>
              <p className="pop-workflow-step-body">{step.body}</p>
              {step.highlight && (
                <span className="pop-workflow-step-tag" aria-hidden="true">
                  AI · 辅助
                </span>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="pop-closing">
      {/* Very subtle decorative backdrop — soft color diffusion echoing the
          three themes. Implemented purely with CSS to keep file count low. */}
      <div className="pop-closing-backdrop" aria-hidden="true">
        <span className="pop-closing-glow pop-closing-glow--scenery" />
        <span className="pop-closing-glow pop-closing-glow--emotion" />
        <span className="pop-closing-glow pop-closing-glow--starry" />
      </div>

      <div className="container pop-closing-inner">
        <ScrollReveal variant="fade-up">
          <span className="pop-closing-en font-en">
            {popmartClosing.titleEN}
          </span>
        </ScrollReveal>
        <ScrollReveal variant="blur-up" delay={140}>
          <p className="pop-closing-body">{popmartClosing.body}</p>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={260} className="pop-closing-cta">
          <Link
            to="/works"
            className="pop-closing-link"
            data-cursor="link"
          >
            <span aria-hidden="true">←</span>
            <span>返回作品列表</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------
   Page entry
   ----------------------------------------------------------------- */

export default function PopmartDetail() {
  // Stable order; using index as key is fine for a static array.
  const chapters = useMemo(() => popmartChapters, []);

  return (
    <main className="pop-detail">
      <HeroSection />

      {/* Section: Three Posters */}
      <div className="pop-section-head">
        <div className="container">
          <ScrollReveal variant="fade-up" className="pop-section-head-inner">
            <span className="label label-blue">— 作品展示</span>
            <h2 className="pop-section-title">作品展示</h2>
            <span className="pop-section-title-en font-en">Three Posters</span>
          </ScrollReveal>
        </div>
      </div>

      {chapters.map((c, i) => (
        <ChapterSection key={c.num} chapter={c} index={i} />
      ))}

      <WorkflowSection />
      <ClosingSection />
    </main>
  );
}
