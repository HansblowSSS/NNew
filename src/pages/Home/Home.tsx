import { Link } from 'react-router-dom';
import Hero from './Hero';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { projects } from '../../data/projects';
import { owner } from '../../data/owner';
import { internship } from '../../data/experience';
import { awards } from '../../data/awards';
import { capabilities } from '../../data/capabilities';
import './Home.css';

export default function Home() {
  return (
    <main className="home">
      {/* ── 01 · Hero ─────────────────────────────────── */}
      <Hero />

      {/* ── 02 · About Overview ───────────────────────── */}
      <section className="home-overview section">
        <div className="container">
          <ScrollReveal variant="fade-up" className="home-overview-label">
            <span className="label label-blue">— About / 关于我</span>
          </ScrollReveal>

          <div className="home-about-grid">
            {/* Portrait */}
            <ScrollReveal variant="fade-up" delay={100} className="home-about-portrait-wrap">
              <div className="home-about-portrait" data-cursor="image" data-cursor-text="黎天乐">
                <img src="/images/profile/portrait.jpg" alt="黎天乐" loading="lazy" decoding="async" />
              </div>
              <span className="home-about-portrait-meta">LI TIANLE · 黎天乐 · 江门 · 广东</span>
            </ScrollReveal>

            {/* Text */}
            <ScrollReveal variant="blur-up" delay={200} className="home-about-text">
              <h2 className="home-about-name">{owner.nameCN}</h2>
              <p className="home-about-role">{owner.roles.join(' / ')}</p>
              <p className="home-about-intro">{owner.intro}</p>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="fade-up" delay={300} className="home-overview-more">
            <Link to="/about" className="home-overview-link" data-cursor="link">
              <span>查看关于我</span>
              <span className="home-overview-arrow" aria-hidden="true">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 03 · Experience Overview ─────────────────── */}
      <section className="home-overview section">
        <div className="container">
          <ScrollReveal variant="fade-up" className="home-overview-label">
            <span className="label label-blue">— Experience / 实习经历</span>
          </ScrollReveal>

          {/* Meta */}
          <ScrollReveal variant="fade-up" delay={100} className="home-exp-meta">
            <div className="home-exp-meta-col">
              <span className="home-exp-meta-brand">YEStudio / 野生创造</span>
              <span className="home-exp-meta-company">野生创造（深圳）设计咨询有限公司</span>
            </div>
            <div className="home-exp-meta-col">
              <span className="home-exp-meta-role">{internship.role}</span>
              <span className="home-exp-meta-period">{internship.period}</span>
            </div>
          </ScrollReveal>

          {/* Brief */}
          <ScrollReveal variant="blur-up" delay={180} className="home-exp-brief">
            参与设计研究、内容策划、视觉素材、3D / AI 与视频制作等工作。
          </ScrollReveal>

          {/* Scale data */}
          <ScrollReveal variant="fade-up" delay={260} className="home-exp-scale">
            <div className="home-exp-scale-row">
              <div className="home-exp-scale-item">
                <span className="home-exp-scale-num">{internship.internshipTotalViews}</span>
                <span className="home-exp-scale-label">总播放量</span>
              </div>
              <div className="home-exp-scale-item">
                <span className="home-exp-scale-num">{internship.internshipVideoCount}个</span>
                <span className="home-exp-scale-label">视频数量</span>
              </div>
              <div className="home-exp-scale-item">
                <span className="home-exp-scale-num">{internship.platforms.douyin.followers}+</span>
                <span className="home-exp-scale-label">抖音粉丝</span>
              </div>
              <div className="home-exp-scale-item">
                <span className="home-exp-scale-num">{internship.platforms.bilibili.followers}+</span>
                <span className="home-exp-scale-label">B站粉丝</span>
              </div>
              <div className="home-exp-scale-item">
                <span className="home-exp-scale-num">{internship.platforms.xiaohongshu.followers}+</span>
                <span className="home-exp-scale-label">小红书粉丝</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={340} className="home-overview-more">
            <Link to="/experience" className="home-overview-link" data-cursor="link">
              <span>查看实习经历</span>
              <span className="home-overview-arrow" aria-hidden="true">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 04 · Works Overview ───────────────────────── */}
      <section className="home-overview section">
        <div className="container">
          <ScrollReveal variant="fade-up" className="home-overview-label">
            <span className="label label-blue">— Works / 作品</span>
          </ScrollReveal>

          <div className="home-works-grid">
            {projects.map((p, idx) => (
              <ScrollReveal key={p.id} variant="fade-up" delay={idx * 80} className="home-works-item">
                <Link
                  to={`/works/${p.slug}`}
                  className="home-works-card"
                  data-cursor="image"
                  data-cursor-text="VIEW"
                >
                  <div className="home-works-cover">
                    <img src={p.cover} alt={p.titleCN} loading="lazy" decoding="async" />
                  </div>
                  <div className="home-works-meta">
                    <span className="home-works-num">{p.number}</span>
                    <h3 className="home-works-name">{p.titleCN}</h3>
                    <p className="home-works-cat">{p.category}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade-up" delay={600} className="home-overview-more">
            <Link to="/works" className="home-overview-link" data-cursor="link">
              <span>查看全部作品</span>
              <span className="home-overview-arrow" aria-hidden="true">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 05 · Awards Overview ──────────────────────── */}
      <section className="home-overview section">
        <div className="container">
          <ScrollReveal variant="fade-up" className="home-overview-label">
            <span className="label label-blue">— Awards / 获奖经历</span>
          </ScrollReveal>

          <div className="home-awards-list">
            {awards.slice(0, 3).map((a, idx) => (
              <ScrollReveal
                key={`${a.year}-${a.title}`}
                variant="fade-up"
                delay={idx * 80}
                className="home-awards-row"
              >
                <span className="home-awards-year">{a.year}</span>
                <span className="home-awards-title">{a.title}</span>
                <span className="home-awards-level">{a.level}</span>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade-up" delay={320} className="home-overview-more">
            <Link to="/awards" className="home-overview-link" data-cursor="link">
              <span>查看全部奖项</span>
              <span className="home-overview-arrow" aria-hidden="true">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 06 · Capabilities Overview ────────────────── */}
      <section className="home-overview section">
        <div className="container">
          <ScrollReveal variant="fade-up" className="home-overview-label">
            <span className="label label-blue">— Capabilities / 能力方向</span>
          </ScrollReveal>

          <div className="home-caps-list">
            {capabilities.map((c, idx) => (
              <ScrollReveal
                key={c.number}
                variant="fade-up"
                delay={idx * 70}
                className="home-caps-row"
              >
                <span className="home-caps-num">{c.number}</span>
                <span className="home-caps-title-cn">{c.titleCN}</span>
                <span className="home-caps-title-en">{c.titleEN}</span>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade-up" delay={420} className="home-overview-more">
            <Link to="/capabilities" className="home-overview-link" data-cursor="link">
              <span>查看全部能力</span>
              <span className="home-overview-arrow" aria-hidden="true">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 07 · Contact Overview ─────────────────────── */}
      <section className="home-overview home-contact-overview section">
        <div className="container">
          <ScrollReveal variant="fade-up" className="home-overview-label">
            <span className="label label-blue">— Contact / 联系</span>
          </ScrollReveal>

          <ScrollReveal variant="blur-up" delay={120} className="home-contact-slogan">
            <h2 className="home-contact-slogan-cn">
              设计是一次安静的对话，
              <br />
              是理性的秩序，
              <br />
              也是感性的回声。
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={240} className="home-contact-links">
            <div className="home-contact-item">
              <span className="home-contact-item-label">P H O N E · 电话</span>
              <a href={`tel:${owner.contacts.phone}`} className="home-contact-item-val" data-cursor="link">
                {owner.contacts.phone}
              </a>
            </div>
            <div className="home-contact-divider" aria-hidden="true" />
            <div className="home-contact-item">
              <span className="home-contact-item-label">E M A I L · 邮箱</span>
              <a href={`mailto:${owner.contacts.email}`} className="home-contact-item-val" data-cursor="link">
                {owner.contacts.email}
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={360} className="home-overview-more">
            <Link to="/contact" className="home-overview-link" data-cursor="link">
              <span>联系我</span>
              <span className="home-overview-arrow" aria-hidden="true">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
