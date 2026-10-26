import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '../../data/projects';
import './ProjectShowcase.css';

/**
 * Placeholder Project Showcase
 * ----------------------------------------------------------------
 *  This is the SOCKET that Codex will fill in. The interface here
 *  is intentionally minimal so that when Codex provides its real
 *  animated showcase component, swapping is a single-file change.
 *
 *  Expected prop API (final):
 *    <ProjectShowcase
 *      projects={projects}
 *      onProjectClick={(p) => navigate(`/works/${p.slug}`)}
 *    />
 *
 *  Currently we provide:
 *    - Full-width cinematic cover
 *    - Editorial meta column (number / name / category / view)
 *    - Thumbnail strip navigation
 *    - Keyboard arrow + swipe gestures
 * ----------------------------------------------------------------
 */

interface ProjectShowcaseProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export default function ProjectShowcase({ projects, onProjectClick }: ProjectShowcaseProps) {
  const [index, setIndex] = useState(0);
  const current = projects[index];

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setIndex((i) => (i + 1) % projects.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setIndex((i) => (i - 1 + projects.length) % projects.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [projects.length]);

  // Touch swipe
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx < 0) setIndex((i) => (i + 1) % projects.length);
        else setIndex((i) => (i - 1 + projects.length) % projects.length);
      }
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [projects.length]);

  if (!current) return null;

  return (
    <div className="project-showcase">
      {/* Stage */}
      <div className="project-showcase-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="project-showcase-cover"
            data-cursor="image"
            data-cursor-text="VIEW"
            initial={{ opacity: 0, scale: 1.02, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.99, filter: 'blur(8px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onProjectClick?.(current)}
          >
            <img src={current.cover} alt={current.titleCN} loading="lazy" decoding="async" />
            <div className="project-showcase-cover-overlay" aria-hidden="true" />
          </motion.div>
        </AnimatePresence>

        {/* Meta column */}
        <div className="project-showcase-meta">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="project-showcase-meta-inner"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <span className="project-showcase-num">
                {current.number} <span className="klein-rule" />
              </span>
              <h2 className="project-showcase-title">{current.titleCN}</h2>
              <p className="project-showcase-cat">{current.category}</p>
              {current.year && (
                <p className="project-showcase-year">{current.year}</p>
              )}
              <button
                className="project-showcase-view"
                onClick={() => onProjectClick?.(current)}
                data-cursor="link"
              >
                <span>View Project</span>
                <span className="project-showcase-arrow" aria-hidden="true">→</span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="project-showcase-nav">
          <button
            className="project-showcase-arrow-btn"
            onClick={() =>
              setIndex((i) => (i - 1 + projects.length) % projects.length)
            }
            aria-label="Previous project"
            data-cursor="link"
          >
            <span aria-hidden="true">←</span>
          </button>
          <span className="project-showcase-counter">
            {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <button
            className="project-showcase-arrow-btn"
            onClick={() => setIndex((i) => (i + 1) % projects.length)}
            aria-label="Next project"
            data-cursor="link"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* Thumbnails strip */}
      <div className="project-showcase-thumbs" role="tablist" aria-label="Project thumbnails">
        {projects.map((p, i) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={i === index}
            className={`project-showcase-thumb${i === index ? ' is-active' : ''}`}
            onClick={() => setIndex(i)}
            data-cursor="image"
            data-cursor-text="VIEW"
          >
            <span className="project-showcase-thumb-num">{p.number}</span>
            <span className="project-showcase-thumb-cover">
              <img src={p.cover} alt={p.titleCN} loading="lazy" decoding="async" />
            </span>
            <span className="project-showcase-thumb-name">{p.titleCN}</span>
          </button>
        ))}
      </div>
    </div>
  );
}