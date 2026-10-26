import { useParams, Link, Navigate } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { getProjectBySlug } from '../../data/projects';
import PopmartDetail from './PopmartDetail';
import CopawDetail from './CopawDetail';
import LiftpodDetail from './LiftpodDetail';
import DesktopLightDetail from './DesktopLightDetail';
import YueyunDetail from './YueyunDetail';
import MumuAIDetail from './MumuAIDetail';
import './ProjectDetail.css';

/**
 * Project detail router. Bespoke editorial pages for two projects:
 *   - popmart-poster → PopmartDetail
 *   - copaw          → CopawDetail
 *   - liftpod         → LiftpodDetail
 * All other projects use the original unified template.
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/works" replace />;
  }

  // POP MART poster has its own dedicated layout.
  if (project.slug === 'popmart-poster') {
    return <PopmartDetail />;
  }

  // CoPaw product has a bespoke editorial layout.
  if (project.slug === 'copaw') {
    return <CopawDetail />;
  }

  // LiftPod pen holder has a bespoke editorial layout.
  if (project.slug === 'liftpod') {
    return <LiftpodDetail />;
  }

  // Desktop Ambient Light has a bespoke dark editorial layout.
  if (project.slug === 'desktop-light') {
    return <DesktopLightDetail />;
  }

  // Yueyun (粤韵芳华) has its own dark oriental toy-design layout.
  if (project.slug === 'yueyun') {
    return <YueyunDetail />;
  }

  // Mumu AI (木木) has its own warm cream editorial layout.
  if (project.slug === 'mumu-ai') {
    return <MumuAIDetail />;
  }

  return (
    <main className="project-detail">
      {/* ----- Hero ----- */}
      <section className="pd-hero">
        <div className="container">
          <ScrollReveal variant="fade-up" className="pd-back-wrap">
            <Link to="/works" className="pd-back" data-cursor="link">
              <span aria-hidden="true">←</span>
              <span>Back to Works</span>
            </Link>
          </ScrollReveal>

          <div className="pd-hero-grid">
            <ScrollReveal variant="fade-up">
              <span className="label label-blue">{project.number}</span>
              <h1 className="pd-title">{project.titleCN}</h1>
              <p className="pd-cat">{project.category}</p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={120} className="pd-meta">
              <div className="pd-meta-row">
                <span className="label">ROLE</span>
                <span className="pd-meta-val">{project.role ?? '—'}</span>
              </div>
              <div className="pd-meta-row">
                <span className="label">CATEGORY</span>
                <span className="pd-meta-val">{project.category}</span>
              </div>
              <div className="pd-meta-row">
                <span className="label">YEAR</span>
                <span className="pd-meta-val">{project.year ?? '—'}</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ----- Cover Image ----- */}
      <section className="pd-cover">
        <div className="container">
          <ScrollReveal variant="blur-up">
            <div className="pd-cover-frame" data-cursor="image" data-cursor-text="VIEW">
              <img src={project.cover} alt={project.titleCN} loading="lazy" decoding="async" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ----- Intro ----- */}
      <section className="pd-intro section">
        <div className="container pd-intro-grid">
          <ScrollReveal variant="fade-up">
            <span className="label label-blue">— Intro / 项目简介</span>
          </ScrollReveal>
          <ScrollReveal variant="blur-up" delay={120}>
            <p className="pd-intro-text">
              {project.intro ?? 'A short introduction of this project will be provided here.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ----- Case Study ----- */}
      <section className="pd-case section">
        <div className="container">
          <ScrollReveal variant="fade-up" className="pd-case-head">
            <span className="label label-blue">— Case Study / 设计过程</span>
            <h2 className="pd-case-title">设计过程</h2>
            <p className="pd-case-title-en">CASE STUDY</p>
          </ScrollReveal>

          <div className="pd-case-grid">
            {[
              { num: '01', en: 'Research', cn: '研究' },
              { num: '02', en: 'User', cn: '用户' },
              { num: '03', en: 'Concept', cn: '概念' },
              { num: '04', en: 'Sketch', cn: '草图' },
              { num: '05', en: 'Product Development', cn: '产品开发' },
              { num: '06', en: 'CMF', cn: 'CMF' },
              { num: '07', en: '3D', cn: '三维' },
              { num: '08', en: 'Rendering', cn: '渲染' },
              { num: '09', en: 'Prototype', cn: '原型' },
              { num: '10', en: 'Video', cn: '影像' },
              { num: '11', en: 'Final Result', cn: '最终成果' },
            ].map((step, i) => (
              <ScrollReveal
                key={step.num}
                variant="fade-up"
                delay={i * 60}
                className="pd-case-step"
              >
                <span className="pd-case-step-num">{step.num}</span>
                <span className="pd-case-step-cn">{step.cn}</span>
                <span className="pd-case-step-en">{step.en}</span>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade-up" delay={600} className="pd-case-note">
            <span className="klein-rule" />
            <p>Detailed case study content will be added here.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ----- Scroll to explore ----- */}
      <section className="pd-scroll-hint">
        <span className="label">SCROLL TO EXPLORE</span>
        <span className="pd-scroll-line" aria-hidden="true" />
      </section>

      {/* ----- Footer navigation ----- */}
      <section className="pd-footer section">
        <div className="container">
          <div className="pd-footer-grid">
            <ScrollReveal variant="fade-up" className="pd-footer-left">
              <span className="label">Next Project</span>
              <Link to="/works" className="pd-footer-link" data-cursor="link">
                <span>View All Projects</span>
                <span className="pd-footer-arrow" aria-hidden="true">→</span>
              </Link>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={120} className="pd-footer-right">
              <span className="label">{project.number} / 06</span>
              <h3 className="pd-footer-title">{project.titleCN}</h3>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
