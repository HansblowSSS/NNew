# Desktop Light 详情页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-premium, editorial product-detail page for the Desktop Ambient Light at `/works/desktop-light`, using existing 5 image assets and a new dark CSS token system.

**Architecture:** One bespoke React page component (`DesktopLightDetail.tsx`) + a companion CSS module (`DesktopLightDetail.css`). The page is routed from `ProjectDetail.tsx` via a slug check, following the same pattern as `LiftpodDetail`. No global CSS or design tokens are modified — all dark tokens are scoped to `.dl-` prefixed classes. Framer Motion is used for all animations, matching the existing project setup.

**Tech Stack:** React 18 + TypeScript, React Router, Framer Motion, CSS Modules, sharp (for image processing), Vite.

---

## Global Constraints

- All CSS variables scoped to `.dl-detail` root; do NOT write to `:root`
- Images referenced as `/images/works/desktop-light/<filename>` (URL path, not Windows path)
- No global variable writes, no `!important`, no design token pollution
- Framer Motion is already installed in the project
- `ScrollReveal` component from `src/components/ScrollReveal/ScrollReveal.tsx` is available and should be used
- Return link goes to `/works` (verified from `projects.ts`)
- Mobile-first breakpoints: 768px / 1024px

---

## Existing Image Assets (all in `/public/images/works/desktop-light/`)

| Filename | Dims | Ratio | Used In |
|---|---|---|---|
| `摆件灯商业主图.png` | 2048×2048 | 1:1 | Hero bg, Concept, Light, Closing |
| `摆件灯场景图.png` | 2048×1152 | 16:9 | Section 06 In Context |
| `摆件灯爆炸图.png` | 1920×1080 | 16:9 | Section 04 Structure |
| `摆件灯细节图.jpg` | 2048×2048 | 1:1 | Section 03 Detail |
| `cover.jpg` | 1500×1500 | 1:1 | Already in use |

**Missing images** (to be generated later by user — see `docs/superpowers/plans/YYYY-MM-DD-desktop-light-image-prompts.md`):
1. Warm light glow macro close-up (glowing strip + dark body contrast)
2. Layered structure close-up (top/bottom sections of the cylinder)
3. Modern minimal desk scene (product on sleek dark desk)
4. Quiet bedroom nightstand scene (product in dark/warm bedroom)

---

## File Inventory

### Create
- `src/data/desktopLight.ts` — all content data (text, image paths, section config)
- `src/pages/ProjectDetail/DesktopLightDetail.tsx` — main page component
- `src/pages/ProjectDetail/DesktopLightDetail.css` — scoped dark styles
- `docs/superpowers/plans/YYYY-MM-DD-desktop-light-image-prompts.md` — image generation prompts

### Modify
- `src/pages/ProjectDetail/ProjectDetail.tsx:30-40` — add `desktop-light` slug check
- `src/App.tsx` — no change needed (already uses `/works/:slug`)

---

## Color Token System (scoped to `.dl-detail`)

```css
--dl-bg:         #0C0C0C   /* deep charcoal-black */
--dl-bg-2:       #141414   /* slightly lighter section bg */
--dl-bg-3:       #1A1A1A   /* card / elevated surface */
--dl-text:       #F0EBE3   /* warm white */
--dl-text-2:     #9A9490   /* muted warm grey */
--dl-text-3:     #5C5855   /* very muted */
--dl-accent:     #C8874A   /* warm amber — ONLY for highlights */
--dl-accent-2:   #E8A96A   /* lighter amber for hover */
--dl-line:       rgba(240,235,227,0.08)
--dl-line-2:    rgba(240,235,227,0.14)
```

---

## Section Layout Summary

| # | Section | Layout | Image used |
|---|---|---|---|
| 01 | Hero | Full-bleed centered text over `摆件灯商业主图.png` | 商业主图 |
| 02 | Concept | 2-col: large EN title left, body+keywords right | 商业主图 (right) |
| 03 | Detail | 1 large + 2 small: `摆件灯细节图.jpg` | 细节图 |
| 04 | Structure | Full-width `摆件灯爆炸图.png` + annotation labels | 爆炸图 |
| 05 | Light | 2 images: 商业主图 + 细节图 | 商业主图+细节图 |
| 06 | Context | 1 wide image: `摆件灯场景图.png` | 场景图 |
| 07 | Closing | Centered text + back-to-works | 商业主图 (bg) |

---

## Content Data (`src/data/desktopLight.ts`)

```typescript
// Export: dlHero, dlConcept, dlDetail, dlStructure, dlLight, dlContext, dlClosing
// Each exports: titleCN, titleEN, bodyCN (string | string[]), image, imageAlt
// Concept also: keywords: string[]
```

---

## Tasks

### Task 1: Create `src/data/desktopLight.ts`

**Files:** Create `src/data/desktopLight.ts`

**Interfaces:**
- Consumes: nothing (static data)
- Produces: `dlHero`, `dlConcept`, `dlDetail`, `dlStructure`, `dlLight`, `dlContext`, `dlClosing` — each a typed object with `titleEN`, `titleCN`, `bodyCN`, `image`, `imageAlt` and section-specific fields

```typescript
// src/data/desktopLight.ts
export const dlHero = {
  eyebrow: 'Desktop Ambient Light',
  titleCN: '让光，成为空间的一部分。',
  subtitle: '一款融合几何造型、柔和暖光与空间装饰属性的桌面氛围灯。',
  scrollHint: 'Scroll to explore',
  bgImage: '/images/works/desktop-light/摆件灯商业主图.png',
};

export const dlConcept = {
  titleEN: 'FORM MEETS LIGHT.',
  titleCN: '当形态遇见光。',
  bodyCN: '深色的主体构成稳定、克制的视觉轮廓，中间的发光区域打破了整体的沉静。通过实体与光线之间的对比，让灯具不仅承担照明角色，也成为桌面空间中的视觉元素。',
  keywords: ['形态', '光感', '氛围'],
  image: '/images/works/desktop-light/摆件灯商业主图.png',
  imageAlt: '桌面摆件灯产品整体',
};

export const dlDetail = {
  titleEN: 'THE BEAUTY OF SIMPLICITY.',
  titleCN: '简洁形态中的细节。',
  bodyCN: '完整的圆柱形轮廓，视觉稳定；上下分层结构建立层次感；中间发光区域与深色外壳形成对比，构成产品的核心识别特征。',
  image: '/images/works/desktop-light/摆件灯细节图.jpg',
  imageAlt: '桌面摆件灯细节',
};

export const dlStructure = {
  titleEN: 'A STUDY IN FORM.',
  titleCN: '结构，构成秩序。',
  bodyCN: '产品由可见的几个主要部件构成，各部件之间的组合关系与相对比例清晰可辨。',
  image: '/images/works/desktop-light/摆件灯爆炸图.png',
  imageAlt: '桌面摆件灯爆炸结构图',
};

export const dlLight = {
  titleEN: 'A QUIETER KIND OF LIGHT.',
  titleCN: '让光，安静地融入日常。',
  bodyCN: '发光区域与深色主体之间的对比，让光成为可见的形态，而非单纯的亮度。',
  image1: '/images/works/desktop-light/摆件灯商业主图.png',
  image1Alt: '桌面摆件灯整体光感',
  image2: '/images/works/desktop-light/摆件灯细节图.jpg',
  image2Alt: '桌面摆件灯发光区域特写',
};

export const dlContext = {
  titleEN: 'MADE FOR EVERYDAY SPACES.',
  titleCN: '在日常空间中，找到自己的位置。',
  bodyCN: '无论是工作桌面还是卧室角落，它以克制的形态融入不同的空间。',
  image: '/images/works/desktop-light/摆件灯场景图.png',
  imageAlt: '桌面摆件灯场景应用',
};

export const dlClosing = {
  titleEN: 'A QUIETER KIND OF LIGHT.',
  titleCN: '让光，安静地融入日常。',
  backLabel: 'BACK TO WORKS',
};
```

- [ ] **Step 1: Write `src/data/desktopLight.ts`**

```typescript
// src/data/desktopLight.ts
export const dlHero = {
  eyebrow: 'Desktop Ambient Light',
  titleCN: '让光，成为空间的一部分。',
  subtitle: '一款融合几何造型、柔和暖光与空间装饰属性的桌面氛围灯。',
  scrollHint: 'Scroll to explore',
  bgImage: '/images/works/desktop-light/摆件灯商业主图.png',
};

export const dlConcept = {
  titleEN: 'FORM MEETS LIGHT.',
  titleCN: '当形态遇见光。',
  bodyCN: '深色的主体构成稳定、克制的视觉轮廓，中间的发光区域打破了整体的沉静。通过实体与光线之间的对比，让灯具不仅承担照明角色，也成为桌面空间中的视觉元素。',
  keywords: ['形态', '光感', '氛围'],
  image: '/images/works/desktop-light/摆件灯商业主图.png',
  imageAlt: '桌面摆件灯产品整体',
};

export const dlDetail = {
  titleEN: 'THE BEAUTY OF SIMPLICITY.',
  titleCN: '简洁形态中的细节。',
  bodyCN: '完整的圆柱形轮廓，视觉稳定；上下分层结构建立层次感；中间发光区域与深色外壳形成对比，构成产品的核心识别特征。',
  image: '/images/works/desktop-light/摆件灯细节图.jpg',
  imageAlt: '桌面摆件灯细节',
};

export const dlStructure = {
  titleEN: 'A STUDY IN FORM.',
  titleCN: '结构，构成秩序。',
  bodyCN: '产品由可见的几个主要部件构成，各部件之间的组合关系与相对比例清晰可辨。',
  image: '/images/works/desktop-light/摆件灯爆炸图.png',
  imageAlt: '桌面摆件灯爆炸结构图',
};

export const dlLight = {
  titleEN: 'A QUIETER KIND OF LIGHT.',
  titleCN: '让光，安静地融入日常。',
  bodyCN: '发光区域与深色主体之间的对比，让光成为可见的形态，而非单纯的亮度。',
  image1: '/images/works/desktop-light/摆件灯商业主图.png',
  image1Alt: '桌面摆件灯整体光感',
  image2: '/images/works/desktop-light/摆件灯细节图.jpg',
  image2Alt: '桌面摆件灯发光区域特写',
};

export const dlContext = {
  titleEN: 'MADE FOR EVERYDAY SPACES.',
  titleCN: '在日常空间中，找到自己的位置。',
  bodyCN: '无论是工作桌面还是卧室角落，它以克制的形态融入不同的空间。',
  image: '/images/works/desktop-light/摆件灯场景图.png',
  imageAlt: '桌面摆件灯场景应用',
};

export const dlClosing = {
  titleEN: 'A QUIETER KIND OF LIGHT.',
  titleCN: '让光，安静地融入日常。',
  backLabel: 'BACK TO WORKS',
};
```

- [ ] **Step 2: Commit**

```bash
git add src/data/desktopLight.ts
git commit -m "feat: add desktop-light data file"
```

---

### Task 2: Create `src/pages/ProjectDetail/DesktopLightDetail.css`

**Files:** Create `src/pages/ProjectDetail/DesktopLightDetail.css`

**Interfaces:**
- Consumes: CSS token variables from the `.dl-detail` scope (defined in this file)
- Produces: all `.dl-*` class styles for the detail page

- [ ] **Step 1: Write the CSS module file** — see file content below

```css
/* ============================================================
   Desktop Light Detail — Dark Premium Editorial
   All classes scoped to .dl-detail root.
   ============================================================ */

/* ----------------------------------------------------------------
   Scoped dark token system
   ---------------------------------------------------------------- */
.dl-detail {
  /* Colors */
  --dl-bg: #0C0C0C;
  --dl-bg-2: #141414;
  --dl-bg-3: #1A1A1A;
  --dl-text: #F0EBE3;
  --dl-text-2: #9A9490;
  --dl-text-3: #5C5855;
  --dl-accent: #C8874A;
  --dl-accent-2: #E8A96A;
  --dl-line: rgba(240, 235, 227, 0.08);
  --dl-line-2: rgba(240, 235, 227, 0.14);

  /* Layout */
  --dl-content-max: 1280px;
  --dl-gutter: clamp(20px, 4vw, 56px);
  --dl-section-pad: clamp(80px, 11vw, 160px);
  --dl-grid-gap: clamp(12px, 1.5vw, 24px);

  /* Typography */
  --dl-font-en: 'Inter', 'Helvetica Neue', Arial, system-ui, sans-serif;
  --dl-font-cn: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;

  /* Derived */
  --dl-accent-glow: rgba(200, 135, 74, 0.15);

  /* Reset */
  padding-top: 64px;
  color: var(--dl-text);
  background: var(--dl-bg);
}

/* ----------------------------------------------------------------
   Layout
   ---------------------------------------------------------------- */
.dl-container {
  max-width: var(--dl-content-max);
  margin: 0 auto;
  padding-left: var(--dl-gutter);
  padding-right: var(--dl-gutter);
  width: 100%;
  box-sizing: border-box;
}

/* ----------------------------------------------------------------
   01 — HERO
   ---------------------------------------------------------------- */
.dl-hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.dl-hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.dl-hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.55) saturate(0.9);
}

.dl-hero-bg-veil {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 80% at 50% 50%,
    transparent 20%,
    rgba(12, 12, 12, 0.5) 100%
  );
}

/* Back link */
.dl-hero-back {
  position: absolute;
  top: clamp(20px, 4vw, 36px);
  left: var(--dl-gutter);
  z-index: 10;
}

.dl-back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--dl-font-en);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(240, 235, 227, 0.6);
  transition: color 0.3s ease;
}
.dl-back-link:hover {
  color: var(--dl-accent);
}

/* Hero content — centered */
.dl-hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 780px;
  padding: 0 var(--dl-gutter);
}

.dl-hero-eyebrow {
  font-family: var(--dl-font-en);
  font-size: clamp(0.7rem, 1vw, 0.8rem);
  letter-spacing: 0.36em;
  text-transform: uppercase;
  color: var(--dl-accent);
  margin-bottom: clamp(16px, 2vw, 24px);
}

.dl-hero-title-cn {
  font-family: var(--dl-font-cn);
  font-size: clamp(2.4rem, 5vw, 5rem);
  font-weight: 400;
  line-height: 1.15;
  color: var(--dl-text);
  letter-spacing: 0.02em;
  margin-bottom: clamp(16px, 2vw, 24px);
}

.dl-hero-subtitle {
  font-family: var(--dl-font-cn);
  font-size: clamp(0.95rem, 1.4vw, 1.1rem);
  color: var(--dl-text-2);
  line-height: 1.7;
  max-width: 520px;
  margin: 0 auto;
}

.dl-hero-scroll {
  margin-top: clamp(48px, 6vw, 80px);
  font-family: var(--dl-font-en);
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--dl-text-3);
  animation: dl-scroll-pulse 2.5s ease-in-out infinite;
}

@keyframes dl-scroll-pulse {
  0%, 100% { opacity: 0.4; transform: translateY(0); }
  50% { opacity: 0.8; transform: translateY(6px); }
}

/* ----------------------------------------------------------------
   02 — CONCEPT
   ---------------------------------------------------------------- */
.dl-concept {
  padding-block: var(--dl-section-pad);
  background: var(--dl-bg);
}

.dl-concept-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: start;
  margin-top: clamp(40px, 5vw, 64px);
}

.dl-concept-left {}

.dl-concept-title-en {
  font-family: var(--dl-font-en);
  font-size: clamp(2.4rem, 4.5vw, 4.5rem);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.01em;
  color: var(--dl-text);
  margin-bottom: clamp(20px, 2.5vw, 32px);
}

.dl-concept-title-cn {
  font-family: var(--dl-font-cn);
  font-size: clamp(1.2rem, 1.8vw, 1.6rem);
  font-weight: 400;
  color: var(--dl-text-2);
  margin-bottom: 0;
}

.dl-concept-right {}

.dl-concept-body {
  font-family: var(--dl-font-cn);
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  color: var(--dl-text-2);
  line-height: 1.85;
  margin-bottom: clamp(28px, 3vw, 40px);
}

.dl-concept-keywords {
  display: flex;
  gap: clamp(16px, 2vw, 28px);
  list-style: none;
  padding: 0;
  border-top: 1px solid var(--dl-line-2);
  padding-top: clamp(20px, 2.5vw, 28px);
}

.dl-concept-keyword {
  font-family: var(--dl-font-cn);
  font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  color: var(--dl-text-3);
  letter-spacing: 0.08em;
  position: relative;
  padding-left: 14px;
}
.dl-concept-keyword::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--dl-accent);
}

/* ----------------------------------------------------------------
   03 — DETAIL
   ---------------------------------------------------------------- */
.dl-detail-section {
  padding-block: var(--dl-section-pad);
  background: var(--dl-bg-2);
}

.dl-section-head {
  margin-bottom: clamp(24px, 3vw, 40px);
}

.dl-section-num {
  display: block;
  font-family: var(--dl-font-en);
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--dl-accent);
  margin-bottom: 10px;
}

.dl-section-title-en {
  font-family: var(--dl-font-en);
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  font-weight: 300;
  line-height: 1.1;
  color: var(--dl-text);
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}

.dl-section-title-cn {
  font-family: var(--dl-font-cn);
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  color: var(--dl-text-2);
  font-weight: 400;
}

.dl-detail-body {
  font-family: var(--dl-font-cn);
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  color: var(--dl-text-2);
  line-height: 1.85;
  max-width: 640px;
  margin-bottom: clamp(32px, 4vw, 56px);
}

/* 1 large + 2 small grid */
.dl-detail-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  grid-template-rows: auto auto;
  gap: var(--dl-grid-gap);
}

.dl-detail-grid .dl-img-wrap:first-child {
  grid-row: 1 / 3;
}

.dl-img-wrap {
  overflow: hidden;
  background: var(--dl-bg-3);
  aspect-ratio: 1;
}

.dl-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.dl-img-wrap:hover img {
  transform: scale(1.03);
}

/* ----------------------------------------------------------------
   04 — STRUCTURE
   ---------------------------------------------------------------- */
.dl-structure {
  padding-block: var(--dl-section-pad);
  background: #080808;
}

.dl-structure-wide {
  margin-top: clamp(32px, 4vw, 56px);
  overflow: hidden;
  background: var(--dl-bg-3);
}

.dl-structure-wide img {
  width: 100%;
  height: auto;
  display: block;
  max-height: 80vh;
  object-fit: cover;
}

.dl-structure-body {
  font-family: var(--dl-font-cn);
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  color: var(--dl-text-2);
  line-height: 1.85;
  max-width: 640px;
  margin-top: clamp(24px, 3vw, 40px);
  margin-bottom: 0;
}

/* ----------------------------------------------------------------
   05 — LIGHT EXPERIENCE
   ---------------------------------------------------------------- */
.dl-light {
  padding-block: var(--dl-section-pad);
  background: var(--dl-bg);
}

.dl-light-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: var(--dl-grid-gap);
  margin-top: clamp(32px, 4vw, 56px);
}

.dl-light-grid .dl-img-wrap {
  aspect-ratio: 1;
}

/* ----------------------------------------------------------------
   06 — CONTEXT
   ---------------------------------------------------------------- */
.dl-context {
  padding-block: var(--dl-section-pad);
  background: var(--dl-bg-2);
}

.dl-context-wide {
  margin-top: clamp(32px, 4vw, 56px);
  overflow: hidden;
  background: var(--dl-bg-3);
}

.dl-context-wide img {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: cover;
  display: block;
}

/* ----------------------------------------------------------------
   07 — CLOSING
   ---------------------------------------------------------------- */
.dl-closing {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #080808;
}

.dl-closing-bg {
  position: absolute;
  inset: 0;
}

.dl-closing-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.3) saturate(0.7);
}

.dl-closing-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(8,8,8,0.6) 0%,
    rgba(8,8,8,0.4) 50%,
    rgba(8,8,8,0.7) 100%
  );
}

.dl-closing-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: var(--dl-section-pad) var(--dl-gutter);
}

.dl-closing-title-en {
  font-family: var(--dl-font-en);
  font-size: clamp(2.4rem, 4.5vw, 4.5rem);
  font-weight: 300;
  color: var(--dl-text);
  letter-spacing: 0.01em;
  margin-bottom: clamp(12px, 1.5vw, 20px);
}

.dl-closing-title-cn {
  font-family: var(--dl-font-cn);
  font-size: clamp(1.1rem, 1.6vw, 1.4rem);
  color: var(--dl-text-2);
  margin-bottom: clamp(32px, 4vw, 56px);
}

.dl-closing-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--dl-font-en);
  font-size: 12px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--dl-accent);
  border: 1px solid rgba(200, 135, 74, 0.4);
  padding: 14px 28px;
  transition: all 0.35s ease;
}
.dl-closing-link:hover {
  background: var(--dl-accent);
  color: #0C0C0C;
  border-color: var(--dl-accent);
}

/* ----------------------------------------------------------------
   Shared image wrapper
   ---------------------------------------------------------------- */
.dl-img-frame {
  overflow: hidden;
  background: var(--dl-bg-3);
}

.dl-img-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.dl-img-frame:hover img {
  transform: scale(1.03);
}

/* ----------------------------------------------------------------
   Responsive
   ---------------------------------------------------------------- */
@media (max-width: 900px) {
  .dl-concept-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .dl-detail-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  .dl-detail-grid .dl-img-wrap:first-child {
    grid-row: auto;
  }
  .dl-light-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .dl-hero {
    min-height: 90svh;
  }
  .dl-hero-title-cn {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  .dl-concept-title-en {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  .dl-closing {
    min-height: 80svh;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ProjectDetail/DesktopLightDetail.css
git commit -m "feat: add DesktopLightDetail CSS module"
```

---

### Task 3: Create `src/pages/ProjectDetail/DesktopLightDetail.tsx`

**Files:** Create `src/pages/ProjectDetail/DesktopLightDetail.tsx`

**Interfaces:**
- Consumes: `dlHero`, `dlConcept`, `dlDetail`, `dlStructure`, `dlLight`, `dlContext`, `dlClosing` from `src/data/desktopLight.ts`
- Produces: default export `DesktopLightDetail` React component

- [ ] **Step 1: Write the component file**

```tsx
// src/pages/ProjectDetail/DesktopLightDetail.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import {
  dlHero,
  dlConcept,
  dlDetail,
  dlStructure,
  dlLight,
  dlContext,
  dlClosing,
} from '../../data/desktopLight';
import './DesktopLightDetail.css';

/* ============================================================
   01 · HERO
   ============================================================ */
function HeroSection() {
  return (
    <section className="dl-hero" aria-label="产品主视觉">
      {/* Full-bleed background */}
      <div className="dl-hero-bg" aria-hidden="true">
        <img
          src={dlHero.bgImage}
          alt=""
          className="dl-hero-bg-img"
        />
        <div className="dl-hero-bg-veil" />
      </div>

      {/* Back link */}
      <div className="dl-hero-back">
        <Link to="/works" className="dl-back-link" data-cursor="link">
          <span aria-hidden="true">←</span>
          <span>Back to Works</span>
        </Link>
      </div>

      {/* Centered text */}
      <div className="dl-hero-content">
        <ScrollReveal variant="fade-up" delay={0}>
          <p className="dl-hero-eyebrow font-en">{dlHero.eyebrow}</p>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={100}>
          <h1 className="dl-hero-title-cn">{dlHero.titleCN}</h1>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={200}>
          <p className="dl-hero-subtitle">{dlHero.subtitle}</p>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={340}>
          <p className="dl-hero-scroll font-en" aria-hidden="true">
            {dlHero.scrollHint}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================================
   02 · CONCEPT
   ============================================================ */
function ConceptSection() {
  return (
    <section className="dl-concept" aria-label="设计理念">
      <div className="dl-container">
        <ScrollReveal variant="fade-up">
          <div className="dl-section-head">
            <span className="dl-section-num font-en">02</span>
            <h2 className="dl-section-title-en">FORM MEETS LIGHT.</h2>
            <p className="dl-section-title-cn">当形态遇见光。</p>
          </div>
        </ScrollReveal>

        <div className="dl-concept-grid">
          <ScrollReveal variant="fade-up" delay={80} className="dl-concept-left">
            <h2 className="dl-concept-title-en">{dlConcept.titleEN}</h2>
            <p className="dl-concept-title-cn">{dlConcept.titleCN}</p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={160} className="dl-concept-right">
            <p className="dl-concept-body">{dlConcept.bodyCN}</p>
            <ul className="dl-concept-keywords">
              {dlConcept.keywords.map((k) => (
                <li key={k} className="dl-concept-keyword">{k}</li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   03 · DETAIL
   ============================================================ */
function DetailSection() {
  return (
    <section className="dl-detail-section" aria-label="形态与细节">
      <div className="dl-container">
        <ScrollReveal variant="fade-up">
          <div className="dl-section-head">
            <span className="dl-section-num font-en">03</span>
            <h2 className="dl-section-title-en">{dlDetail.titleEN}</h2>
            <p className="dl-section-title-cn">{dlDetail.titleCN}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={80}>
          <p className="dl-detail-body">{dlDetail.bodyCN}</p>
        </ScrollReveal>

        {/* 1 large + 2 smaller tiles using the same image */}
        <div className="dl-detail-grid">
          <ScrollReveal variant="blur-up" delay={0} className="dl-img-wrap">
            <motion.div
              className="dl-img-frame"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={dlDetail.image}
                alt={dlDetail.imageAlt}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </ScrollReveal>

          <ScrollReveal variant="blur-up" delay={80} className="dl-img-wrap">
            <motion.div
              className="dl-img-frame"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={dlDetail.image}
                alt={`${dlDetail.imageAlt} — 局部`}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </ScrollReveal>

          <ScrollReveal variant="blur-up" delay={160} className="dl-img-wrap">
            <motion.div
              className="dl-img-frame"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={dlDetail.image}
                alt={`${dlDetail.imageAlt} — 局部`}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   04 · STRUCTURE
   ============================================================ */
function StructureSection() {
  return (
    <section className="dl-structure" aria-label="结构展示">
      <div className="dl-container">
        <ScrollReveal variant="fade-up">
          <div className="dl-section-head">
            <span className="dl-section-num font-en">04</span>
            <h2 className="dl-section-title-en">{dlStructure.titleEN}</h2>
            <p className="dl-section-title-cn">{dlStructure.titleCN}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="blur-up" delay={80} className="dl-structure-wide">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={dlStructure.image}
              alt={dlStructure.imageAlt}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={120}>
          <p className="dl-structure-body">{dlStructure.bodyCN}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================================
   05 · LIGHT EXPERIENCE
   ============================================================ */
function LightSection() {
  return (
    <section className="dl-light" aria-label="光感体验">
      <div className="dl-container">
        <ScrollReveal variant="fade-up">
          <div className="dl-section-head">
            <span className="dl-section-num font-en">05</span>
            <h2 className="dl-section-title-en">{dlLight.titleEN}</h2>
            <p className="dl-section-title-cn">{dlLight.titleCN}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={80}>
          <p className="dl-detail-body">{dlLight.bodyCN}</p>
        </ScrollReveal>

        <div className="dl-light-grid">
          <ScrollReveal variant="blur-up" delay={0} className="dl-img-wrap">
            <motion.div
              className="dl-img-frame"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={dlLight.image1}
                alt={dlLight.image1Alt}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </ScrollReveal>

          <ScrollReveal variant="blur-up" delay={100} className="dl-img-wrap">
            <motion.div
              className="dl-img-frame"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={dlLight.image2}
                alt={dlLight.image2Alt}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   06 · IN CONTEXT
   ============================================================ */
function ContextSection() {
  return (
    <section className="dl-context" aria-label="场景应用">
      <div className="dl-container">
        <ScrollReveal variant="fade-up">
          <div className="dl-section-head">
            <span className="dl-section-num font-en">06</span>
            <h2 className="dl-section-title-en">{dlContext.titleEN}</h2>
            <p className="dl-section-title-cn">{dlContext.titleCN}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={80}>
          <p className="dl-detail-body">{dlContext.bodyCN}</p>
        </ScrollReveal>

        <ScrollReveal variant="blur-up" delay={0} className="dl-context-wide">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={dlContext.image}
              alt={dlContext.imageAlt}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================================
   07 · CLOSING
   ============================================================ */
function ClosingSection() {
  return (
    <section className="dl-closing" aria-label="收尾">
      <div className="dl-closing-bg" aria-hidden="true">
        <img
          src={dlHero.bgImage}
          alt=""
        />
        <div className="dl-closing-veil" />
      </div>

      <div className="dl-closing-content">
        <ScrollReveal variant="fade-up">
          <h2 className="dl-closing-title-en">{dlClosing.titleEN}</h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={100}>
          <p className="dl-closing-title-cn">{dlClosing.titleCN}</p>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={200}>
          <Link to="/works" className="dl-closing-link" data-cursor="link">
            <span aria-hidden="true">←</span>
            <span>{dlClosing.backLabel}</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ============================================================
   Entry
   ============================================================ */
export default function DesktopLightDetail() {
  return (
    <main className="dl-detail">
      <HeroSection />
      <ConceptSection />
      <DetailSection />
      <StructureSection />
      <LightSection />
      <ContextSection />
      <ClosingSection />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ProjectDetail/DesktopLightDetail.tsx
git commit -m "feat: add DesktopLightDetail page component"
```

---

### Task 4: Add route in `ProjectDetail.tsx`

**Files:** Modify `src/pages/ProjectDetail/ProjectDetail.tsx:30-40`

- [ ] **Step 1: Add the desktop-light slug check**

Find this section in `ProjectDetail.tsx`:
```tsx
  // LiftPod pen holder has a bespoke editorial layout.
  if (project.slug === 'liftpod') {
    return <LiftpodDetail />;
  }
```

Insert after it:
```tsx
  // Desktop Ambient Light has a bespoke dark editorial layout.
  if (project.slug === 'desktop-light') {
    return <DesktopLightDetail />;
  }
```

And add the import at the top:
```tsx
import DesktopLightDetail from './DesktopLightDetail';
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ProjectDetail/ProjectDetail.tsx
git commit -m "feat: route desktop-light slug to DesktopLightDetail"
```

---

### Task 5: Verify build

- [ ] **Step 1: Run TypeScript check**

```bash
cd c:/Zuopin/NNew
npx tsc --noEmit 2>&1
```

Expected: no TypeScript errors.

- [ ] **Step 2: Run dev server and verify route**

Visit: `http://127.0.0.1:5173/works/desktop-light`
Expected: dark premium page renders correctly with all 7 sections.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: complete desktop-light detail page"
```

---

### Task 6: Save image generation prompts

**Files:** Create `docs/superpowers/plans/2026-10-13-desktop-light-image-prompts.md`

- [ ] **Step 1: Write prompts file**

```markdown
# Desktop Light — Missing Image Generation Prompts

Save generated images to: `C:\Zuopin\NNew\public\images\works\desktop-light\generated\`

---

## 1. Warm Light Glow Macro Close-up

**Filename:** `generated/light-glow-macro.jpg`
**Aspect ratio:** 1:1 (2048×2048 output)
**Purpose:** Section 05 Light Experience — second image (currently uses `细节图.jpg`)

### Prompt
A photorealistic macro close-up of a dark cylindrical desk lamp with a warm amber glowing strip running horizontally through the middle section. The lamp body is matte dark charcoal/almost black. The glowing area emits a soft warm amber-orange light (approximately 2700K) that spills softly onto the surrounding surfaces. Shallow depth of field. Background is pure black. Studio product photography, soft box lighting, ultra-sharp detail on the lamp surface texture. Cinematic mood, no harsh reflections.

---

## 2. Layered Structure Close-up (Top/Bottom Sections)

**Filename:** `generated/layer-detail.jpg`
**Aspect ratio:** 1:1 (2048×2048 output)
**Purpose:** Section 03 Detail — third image tile (currently uses `细节图.jpg`)

### Prompt
A photorealistic close-up product shot of a dark cylindrical desk lamp showing the visible seam/division between the top cylinder section and the bottom base section. The lamp sits on a dark surface. Top section is slightly lighter charcoal, bottom base is darker charcoal. The warm amber light glow is visible in the middle connecting area. Studio lighting, black background, ultra-clean product photography style. The structural detail and material finish should be clearly visible.

---

## 3. Modern Minimal Desk Scene

**Filename:** `generated/scene-desk.jpg`
**Aspect ratio:** 16:9 (2048×1152 or wider output)
**Purpose:** Section 06 In Context — first scene image (currently uses `场景图.png`)

### Prompt
A photorealistic wide-angle shot of a sleek modern workspace. A dark cylindrical desk lamp with a warm amber glowing middle section sits on a dark walnut or matte black desk. Background is a softly lit, minimalist room with warm-toned walls and dark furniture. Evening/late afternoon atmosphere. The lamp is the main subject, softly illuminating the immediate desk area. Cinematic, editorial product photography style. High-end lifestyle imagery. No people visible. Ultra-clean composition.

---

## 4. Quiet Bedroom Nightstand Scene

**Filename:** `generated/scene-bedroom.jpg`
**Aspect ratio:** 16:9 (2048×1152 or wider output)
**Purpose:** Section 06 In Context — additional scene (page can show this as a secondary variant)

### Prompt
A photorealistic lifestyle shot of a quiet, dark bedroom at night. A dark cylindrical desk lamp with a warm amber glowing middle section sits on a dark wooden nightstand. The room has warm ambient lighting from the lamp creating a pool of warm light. Dark grey or charcoal bedding, minimalist decor. The lamp is the main light source creating an intimate, warm atmosphere. Cinematic, editorial photography. High-end product lifestyle. No people visible. Ultra-clean composition, dark moody atmosphere.

---

## Post-Generation Steps

1. Save generated images to `C:\Zuopin\NNew\public\images\works\desktop-light\generated\`
2. Update `src/data/desktopLight.ts` image paths to point to generated files
3. Re-run build and verify
```

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/plans/2026-10-13-desktop-light-image-prompts.md
git commit -m "docs: add image generation prompts for desktop-light"
```

---

## Self-Review Checklist

- [ ] All 7 sections present in component
- [ ] `.dl-*` classes only, no global variable writes
- [ ] `object-fit: cover` on all images
- [ ] `loading="lazy"` on non-hero images
- [ ] `loading="eager"` on hero background image
- [ ] `data-cursor="link"` on all clickable elements
- [ ] `aria-label` on all sections
- [ ] `/works` back link works
- [ ] Route works: `/works/desktop-light` → `DesktopLightDetail`
- [ ] Mobile responsive at 900px and 600px breakpoints
- [ ] No TypeScript errors
- [ ] No broken image URLs
```
