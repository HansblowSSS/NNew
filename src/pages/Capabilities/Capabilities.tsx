import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { capabilities } from '../../data/capabilities';
import './Capabilities.css';

export default function Capabilities() {
  return (
    <main className="capabilities">
      <div className="container">
        {/* ----- Header ----- */}
        <header className="caps-header">
          <ScrollReveal variant="fade-up">
            <span className="label label-blue">— Capabilities / 能力方向</span>
            <h1 className="caps-title">设计能力</h1>
            <p className="caps-title-en">CAPABILITIES</p>
          </ScrollReveal>
        </header>

        {/* ----- Modules ----- */}
        <section className="caps-modules">
          {capabilities.map((c, i) => (
            <ScrollReveal
              key={c.number}
              variant="fade-up"
              delay={i * 80}
              className="caps-module"
            >
              <div className="caps-module-head">
                <span className="caps-module-num">{c.number}</span>
                <div className="caps-module-titles">
                  <h3 className="caps-module-title-cn">{c.titleCN}</h3>
                  <h2 className="caps-module-title-en">{c.titleEN}</h2>
                </div>
              </div>

              <p className="caps-module-desc">{c.description}</p>
            </ScrollReveal>
          ))}
        </section>

        {/* ----- Tools Strip ----- */}
        <section className="caps-tools">
          <ScrollReveal variant="fade-up" className="caps-tools-head">
            <span className="label label-blue">— Tools / 工具栈</span>
            <h2 className="caps-tools-title">TOOLS &amp; STACK</h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={120} className="caps-tools-row">
            {['Blender', 'AE', '剪映', 'Figma', 'Photoshop', 'Illustrator', 'Keyshot', 'AI'].map(
              (t) => (
                <span key={t} className="caps-tools-item">
                  {t}
                </span>
              )
            )}
          </ScrollReveal>
        </section>
      </div>
    </main>
  );
}
