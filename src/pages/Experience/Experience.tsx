import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { internship, workflow } from '../../data/experience';
import './Experience.css';

const cnWorkflowLabels: Record<string, string> = {
  RESEARCH: '资料调研',
  SCRIPT: '脚本拆解',
  VISUAL: '素材搜集',
  '3D / AI': '三维 / AI',
  EDIT: '视频剪辑',
  DATA: '数据分析',
};

export default function Experience() {
  const i = internship;

  return (
    <main className="experience">
      <div className="container">
        {/* ============================================
            Header — only metadata
            ============================================ */}
        <header className="exp-header">
          <ScrollReveal variant="fade-up">
            <span className="label label-blue">— Experience / 经验</span>
          </ScrollReveal>

          <div className="exp-header-grid">
            <ScrollReveal variant="blur-up" delay={120} className="exp-header-title">
              <h1 className="exp-title">实习经验</h1>
              <p className="exp-title-accent">DESIGN × MEDIA</p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={200} className="exp-header-meta">
              <div className="exp-header-meta-row">
                <span className="label">COMPANY</span>
                <span className="exp-header-meta-val">{i.company}</span>
              </div>
              <div className="exp-header-meta-row">
                <span className="label">BRAND</span>
                <span className="exp-header-meta-val">{i.brand}</span>
              </div>
              <div className="exp-header-meta-row">
                <span className="label">ROLE</span>
                <span className="exp-header-meta-val">{i.role}</span>
              </div>
              <div className="exp-header-meta-row">
                <span className="label">PERIOD</span>
                <span className="exp-header-meta-val">{i.period}</span>
              </div>
            </ScrollReveal>
          </div>
        </header>

        {/* ============================================
            Studio — full-width, generous whitespace
            ============================================ */}
        <section className="exp-company section">
          <ScrollReveal variant="fade-up" className="exp-section-label">
            <span className="label label-blue">— Studio / 工作机构</span>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100} className="exp-company-head">
            <span className="exp-company-brand-en">YEStudio</span>
            <span className="exp-company-brand-cn">野生创造设计工作室</span>
          </ScrollReveal>

          <ScrollReveal variant="blur-up" delay={200} className="exp-company-text">
            <p>{i.companyDescription}</p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={300} className="exp-company-cta">
            <a
              href={i.studioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="exp-company-link"
              data-cursor="link"
            >
              <span>VISIT STUDIO</span>
              <span className="exp-company-arrow" aria-hidden="true">→</span>
            </a>
            <span className="exp-company-url">{i.studioUrl.replace(/^https?:\/\//, '')}</span>
          </ScrollReveal>
        </section>

        {/* ============================================
            Platforms — minimal three-col editorial list
            ============================================ */}
        <section className="exp-platforms section">
          <ScrollReveal variant="fade-up" className="exp-section-label">
            <span className="label label-blue">— Platforms / 平台数据</span>
            <h2 className="exp-section-title">MEDIA SCALE</h2>
          </ScrollReveal>

          <div className="exp-platforms-list">
            <ScrollReveal variant="fade-up" className="exp-platform-row">
              <span className="exp-platform-name-en">DOUYIN</span>
              <span className="exp-platform-name-cn">抖音</span>
              <span className="exp-platform-num">{i.platforms.douyin.followers}+</span>
              <span className="exp-platform-meta">粉丝</span>
              {i.platforms.douyin.likes && (
                <span className="exp-platform-meta-soft">
                  {i.platforms.douyin.likes} 点赞
                </span>
              )}
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={80} className="exp-platform-row">
              <span className="exp-platform-name-en">BILIBILI</span>
              <span className="exp-platform-name-cn">哔哩哔哩</span>
              <span className="exp-platform-num">{i.platforms.bilibili.followers}+</span>
              <span className="exp-platform-meta">粉丝</span>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={160} className="exp-platform-row">
              <span className="exp-platform-name-en">XIAOHONGSHU</span>
              <span className="exp-platform-name-cn">小红书</span>
              <span className="exp-platform-num">{i.platforms.xiaohongshu.followers}+</span>
              <span className="exp-platform-meta">粉丝</span>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="fade-up" delay={240} className="exp-platforms-meta">
            <span className="klein-rule" />
            <span className="exp-platforms-meta-text">
              公开可核实数据 · Public data reference · 2026
            </span>
          </ScrollReveal>
        </section>

        {/* ============================================
            My Role — editorial list
            ============================================ */}
        <section className="exp-role section">
          <ScrollReveal variant="fade-up" className="exp-section-label">
            <span className="label label-blue">— My Role / 我的工作</span>
            <h2 className="exp-section-title">六阶段内容生产</h2>
          </ScrollReveal>

          <div className="exp-role-list">
            {workflow.map((stage, idx) => (
              <ScrollReveal
                key={stage.number}
                variant="fade-up"
                delay={idx * 60}
                className="exp-role-row"
              >
                <span className="exp-role-num">{stage.number}</span>
                <span className="exp-role-cn">{cnWorkflowLabels[stage.title] ?? stage.description}</span>
                <span className="exp-role-en">{stage.title}</span>
                <span className="exp-role-arrow" aria-hidden="true">—</span>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ============================================
            Selected Content — 3 specified works
            ============================================ */}
        <section className="exp-content section">
          <ScrollReveal variant="fade-up" className="exp-section-label">
            <span className="label label-blue">— Selected Content / 代表内容</span>
            <h2 className="exp-section-title">SELECTED CONTENT</h2>
            <p className="exp-content-sub">
              参与内容研究、资料搜集、视觉素材与视频制作流程。
            </p>
          </ScrollReveal>

          <div className="exp-content-list">
            {i.selectedContent.map((item, idx) => (
              <ScrollReveal
                key={`${item.title}-${idx}`}
                variant="fade-up"
                delay={idx * 100}
                className="exp-content-item"
              >
                {/* Left: video cover */}
                <div
                  className="exp-content-cover"
                  data-cursor="image"
                  data-cursor-text="VIEW"
                >
                  {item.cover ? (
                    <img
                      className="exp-content-cover-img"
                      src={item.cover}
                      alt={item.coverAlt || `${item.title} 视频封面`}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="exp-content-cover-img exp-content-cover-img--fallback" aria-hidden="true">
                      <span className="exp-content-cover-platform">{item.platform}</span>
                      <span className="exp-content-cover-num">{item.views}</span>
                    </div>
                  )}
                  <div className="exp-content-cover-overlay" aria-hidden="true">
                    <span className="exp-content-cover-platform">{item.platform}</span>
                    <span className="exp-content-cover-num">{item.views}</span>
                  </div>
                </div>

                {/* Right: info */}
                <div className="exp-content-body">
                  <h3 className="exp-content-title">{item.title}</h3>

                  <div className="exp-content-meta">
                    <div className="exp-content-meta-row">
                      <span className="label">PLATFORM</span>
                      <span className="exp-content-meta-val">{item.platform}</span>
                    </div>
                    <div className="exp-content-meta-row">
                      <span className="label">VIEWS</span>
                      <span className="exp-content-meta-val">{item.views}</span>
                    </div>
                    <div className="exp-content-meta-row">
                      <span className="label">DATE</span>
                      <span className="exp-content-meta-val">{item.date}</span>
                    </div>
                    {item.role && (
                      <div className="exp-content-meta-row">
                        <span className="label">ROLE</span>
                        <span className="exp-content-meta-val exp-content-meta-role">
                          {item.role}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* External jump to the original Bilibili video */}
                  {item.videoUrl && (
                    <a
                      className="exp-content-link"
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`在新标签页打开 Bilibili 原视频《${item.title}》`}
                      data-cursor="link"
                    >
                      <span className="exp-content-link-arrow" aria-hidden="true">↗</span>
                      <span className="exp-content-link-cn">点击查看原视频</span>
                      <span className="exp-content-link-en">WATCH ORIGINAL VIDEO</span>
                    </a>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ============================================
            Content Impact — confirmed data
            ============================================ */}
        <section className="exp-impact section">
          <ScrollReveal variant="fade-up" className="exp-section-label">
            <span className="label label-blue">— Content Impact / 内容影响力</span>
            <h2 className="exp-section-title">CONTENT IMPACT</h2>
            <p className="exp-content-sub">{i.period}</p>
          </ScrollReveal>

          <div className="exp-impact-list">
            <ScrollReveal variant="fade-up" className="exp-impact-row">
              <span className="exp-impact-num">{i.internshipTotalViews}</span>
              <span className="exp-impact-label">TOTAL VIEWS · 总播放量</span>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={80} className="exp-impact-row">
              <span className="exp-impact-num">{i.internshipVideoCount}</span>
              <span className="exp-impact-label">VIDEOS · 视频数量</span>
            </ScrollReveal>
          </div>
        </section>

        {/* ============================================
            Content Flow — Chinese-led process
            ============================================ */}
        <section className="exp-flow section">
          <ScrollReveal variant="fade-up" className="exp-section-label">
            <span className="label label-blue">— 实习经历 / 内容生产流程</span>
            <h2 className="exp-section-title exp-flow-title">
              <span className="exp-flow-title-cn">从创意到成片</span>
              <span className="exp-flow-title-en">FROM IDEA TO CONTENT</span>
            </h2>
          </ScrollReveal>

          <div className="exp-flow-list">
            {workflow.map((stage, idx) => (
              <ScrollReveal
                key={stage.number}
                variant="fade-up"
                delay={idx * 90}
                className="exp-flow-step-wrap"
              >
                <div className="exp-flow-step">
                  <span className="exp-flow-step-num">{stage.number}</span>
                  <h3 className="exp-flow-step-title">{stage.titleCN}</h3>
                  <p className="exp-flow-step-summary">{stage.summary}</p>
                  <span className="exp-flow-step-en">{stage.titleEN}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ============================================
            Closing
            ============================================ */}
        <section className="exp-closing section">
          <ScrollReveal variant="fade-up" className="exp-section-label">
            <span className="label label-blue">— Reflection / 阶段思考</span>
            <h2 className="exp-section-title">WHAT I LEARNED</h2>
          </ScrollReveal>

          <ScrollReveal variant="blur-up" delay={120}>
            <p className="exp-closing-text">
              在设计咨询与内容传播的交叉环境中，我开始理解一个设计观点如何从研究，转化为视觉语言，并最终成为能够被大众理解和传播的内容。
            </p>
          </ScrollReveal>
        </section>
      </div>
    </main>
  );
}
