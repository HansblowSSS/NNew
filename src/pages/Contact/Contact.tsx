import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { owner } from '../../data/owner';
import './Contact.css';

export default function Contact() {
  return (
    <main className="contact">
      <div className="container">
        {/* ----- Section label ----- */}
        <ScrollReveal variant="fade-up" className="contact-head">
          <span className="label label-blue">— Contact / 联系</span>
        </ScrollReveal>

        {/* ----- Editorial Slogan ----- */}
        <section className="contact-statement">
          <ScrollReveal variant="blur-up" delay={120}>
            <h1 className="contact-slogan-cn">
              设计是一次安静的对话，
              <br />
              是理性的秩序，
              <br />
              也是感性的回声。
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={320} className="contact-slogan-en">
            Design is a quiet dialogue, an order of reason, and an echo of emotion.
          </ScrollReveal>
        </section>

        {/* ----- Symmetric Phone / Email — minimal, small ----- */}
        <section className="contact-info">
          <div className="contact-info-divider" aria-hidden="true" />

          <div className="contact-info-grid">
            <ScrollReveal variant="fade-up" className="contact-info-col">
              <a
                className="contact-info-card"
                href={`tel:${owner.contacts.phone}`}
                data-cursor="link"
                aria-label={`Call ${owner.contacts.phone}`}
              >
                <span className="contact-info-label">P H O N E · 电话</span>
                <span className="contact-info-value">{owner.contacts.phone}</span>
              </a>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={80} className="contact-info-col">
              <a
                className="contact-info-card"
                href={`mailto:${owner.contacts.email}`}
                data-cursor="link"
                aria-label={`Email ${owner.contacts.email}`}
              >
                <span className="contact-info-label">E M A I L · 邮箱</span>
                <span className="contact-info-value">{owner.contacts.email}</span>
              </a>
            </ScrollReveal>
          </div>
        </section>

        {/* ----- Footer ----- */}
        <footer className="contact-footer">
          <div className="contact-footer-grid">
            <span className="contact-footer-copy">© 2026 LI TIANLE · 黎天乐</span>
            <Link to="/" className="contact-footer-link" data-cursor="link">
              <span>Back to Top</span>
              <span aria-hidden="true">↑</span>
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
