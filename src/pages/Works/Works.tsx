import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import ProjectShowcase from '../../components/ProjectShowcase/ProjectShowcase';
import { projects, type Project } from '../../data/projects';
import './Works.css';

export default function Works() {
  const navigate = useNavigate();

  const handleProjectClick = (project: Project) => {
    navigate(`/works/${project.slug}`);
  };

  return (
    <main className="works">
      <div className="container">
        {/* ----- Header ----- */}
        <header className="works-header">
          <div className="works-header-left">
            <ScrollReveal variant="fade-up">
              <span className="label label-blue">— Works / 作品</span>
              <h1 className="works-title">作品集</h1>
              <p className="works-title-en">SELECTED WORKS</p>
            </ScrollReveal>
          </div>
          <div className="works-header-right">
            <ScrollReveal variant="blur-up" delay={120}>
              <p className="works-header-desc">
                涵盖产品设计、视觉设计、视频与三维的作品选辑。每一个项目，都是概念与材料的对话。
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={240} className="works-header-meta">
              <span className="label">06 — Projects</span>
              <span className="label">2022 — 2026</span>
            </ScrollReveal>
          </div>
        </header>

        {/* ----- Showcase ----- */}
        <section className="works-stage">
          <ProjectShowcase projects={projects} onProjectClick={handleProjectClick} />
        </section>

        {/* ----- Footer note ----- */}
        <footer className="works-footer">
          <span className="klein-rule" />
          <p>Use arrow keys or swipe to navigate · Click the cover to view the project.</p>
        </footer>
      </div>
    </main>
  );
}
