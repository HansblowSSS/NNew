import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { owner } from '../../data/owner';
import {
  education,
  experiences,
  internship,
  disciplines,
} from '../../data/experience';
import './About.css';

export default function About() {
  return (
    <main className="about">
      {/* ----- Hero ----- */}
      <section className="about-hero">
        <div className="container about-hero-grid">
          <motion.div
            className="about-portrait-wrap"
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-portrait" data-cursor="image" data-cursor-text="黎天乐">
              <img
                src="/images/profile/portrait.jpg"
                alt={`${owner.nameCN} portrait`}
                loading="eager"
                decoding="async"
              />
            </div>
            <span className="about-portrait-meta">
              <span>LI TIANLE · 黎天乐</span>
              <span>江门 · 广东</span>
            </span>
          </motion.div>

          <div className="about-intro">
            <ScrollReveal variant="fade-up">
              <span className="label label-blue">— About / 关于我</span>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={120}>
              <h1 className="about-name">{owner.nameCN}</h1>
              <p className="about-role">{owner.roles.join(' / ')}</p>
            </ScrollReveal>

            <ScrollReveal variant="blur-up" delay={240}>
              <p className="about-text">{owner.intro}</p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={360}>
              <div className="about-tags">
                {disciplines.map((d) => (
                  <span key={d} className="about-tag">
                    {d}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ----- Information Grid ----- */}
      <section className="about-info section">
        <div className="container">
          <div className="about-info-row">
            <ScrollReveal variant="fade-up" className="about-info-block">
              <span className="label">Education</span>
              <h3 className="about-info-title">{education.school}</h3>
              <p className="about-info-meta">{education.major}</p>
              <span className="about-info-accent">{education.rank}</span>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={80} className="about-info-block">
              <span className="label">Language</span>
              <h3 className="about-info-title">CET-4</h3>
              <p className="about-info-meta">College English Test Band 4</p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={160} className="about-info-block">
              <span className="label">Role</span>
              <h3 className="about-info-title">{owner.roles.join(' · ')}</h3>
              <p className="about-info-meta">{owner.rolesEN.join(' / ')}</p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={240} className="about-info-block">
              <span className="label">Disciplines</span>
              <h3 className="about-info-title">产品 · 视觉 · 视频 · 3D · AI</h3>
              <p className="about-info-meta">六大设计方向，统一的实践语言。</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ----- Internship ----- */}
      <section className="about-intern section">
        <div className="container">
          <ScrollReveal variant="fade-up" className="about-section-head">
            <span className="label label-blue">— Internship / 实习经历</span>
          </ScrollReveal>

          <div className="about-timeline">
            <ScrollReveal variant="fade-up" className="about-timeline-row">
              <div className="about-timeline-period">{internship.period}</div>
              <div className="about-timeline-body">
                <h3 className="about-timeline-title">{internship.company}</h3>
                <p className="about-timeline-role">{internship.role}</p>
                <ul className="about-timeline-tasks">
                  {internship.tasks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ----- Selected Experience ----- */}
      <section className="about-selected section">
        <div className="container">
          <ScrollReveal variant="fade-up" className="about-section-head">
            <span className="label label-blue">— Selected Experience / 项目经历</span>
          </ScrollReveal>

          <div className="about-selected-list">
            {experiences.map((exp, i) => (
              <ScrollReveal
                key={exp.title}
                variant="fade-up"
                delay={i * 100}
                className="about-selected-item"
              >
                <div className="about-selected-num">{exp.number}</div>
                <div className="about-selected-body">
                  <div className="about-selected-head">
                    <h3 className="about-selected-title">{exp.title}</h3>
                    <span className="about-selected-period">{exp.period}</span>
                  </div>
                  <p className="about-selected-role">{exp.role}</p>

                  <div className="about-selected-cols">
                    <div className="about-selected-col">
                      <span className="label">Responsibilities</span>
                      <ul>
                        {exp.responsibilities.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </div>
                    {exp.achievement && (
                      <div className="about-selected-col">
                        <span className="label">Achievement</span>
                        <p className="about-selected-achievement">
                          {exp.achievementPrefix && (
                            <span className="about-selected-prefix">
                              {exp.achievementPrefix}
                            </span>
                          )}
                          {exp.achievement}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
