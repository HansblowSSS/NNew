import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { awards } from '../../data/awards';
import './Awards.css';

export default function Awards() {
  return (
    <main className="awards">
      <div className="container">
        {/* ----- Header ----- */}
        <header className="awards-header">
          <ScrollReveal variant="fade-up">
            <span className="label label-blue">— Awards / 获奖经历</span>
            <h1 className="awards-title">获奖经历</h1>
            <p className="awards-title-en">AWARDS</p>
          </ScrollReveal>
        </header>

        {/* ----- List ----- */}
        <section className="awards-list">
          <div className="awards-list-head">
            <span className="label">YEAR · 年份</span>
            <span className="label">AWARD · 名称</span>
            <span className="label">LEVEL · 级别</span>
          </div>

          {awards.map((a, i) => (
            <ScrollReveal
              key={`${a.year}-${a.title}`}
              variant="fade-up"
              delay={i * 80}
              className="awards-row"
            >
              <span className="awards-row-year">{a.year}</span>
              <span className="awards-row-title">{a.title}</span>
              <span className="awards-row-level">{a.level}</span>
            </ScrollReveal>
          ))}
        </section>

        {/* ----- Footer note ----- */}
        <footer className="awards-footer">
          <span className="klein-rule" />
          <p className="awards-footer-text">Awards listed in reverse chronological order · 05 entries</p>
        </footer>
      </div>
    </main>
  );
}
