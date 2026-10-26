# LI TIANLE — Portfolio

> 工业设计师 / 视觉创作者 — Personal Portfolio Website
> A Dark Creative Studio + Editorial Portfolio + Interactive Designer Portfolio.

---

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite 5
- **Routing**: react-router-dom 6
- **Animation**: framer-motion + GSAP
- **Styling**: Vanilla CSS Modules with Design Tokens (CSS variables)

---

## Project Structure

```
src/
├── components/
│   ├── Navigation/        # Floating Capsule nav (desktop + mobile)
│   ├── CustomCursor/      # Global hollow circle cursor
│   ├── PageTransition/    # Route fade + translateY + blur
│   ├── ScrollReveal/      # IntersectionObserver-based reveal (re-fires)
│   ├── GridMotion/        # React Bits Grid Motion (Hero background)
│   └── ProjectShowcase/   # WORKS page cinematic showcase (Codex-replaceable)
│
├── pages/
│   ├── Home/              # / — Hero + Manifesto + Featured + CTA
│   ├── About/             # /about — portrait + bio + experience
│   ├── Works/             # /works — Project Showcase
│   ├── Awards/            # /awards — Editorial list
│   ├── Capabilities/      # /capabilities — Editorial typography
│   ├── Contact/           # /contact — large typography
│   └── ProjectDetail/     # /works/:slug — 6 project routes
│
├── data/                  # Pure data — no JSX
│   ├── projects.ts
│   ├── awards.ts
│   ├── experience.ts
│   ├── capabilities.ts
│   └── owner.ts
│
└── styles/
    ├── variables.css      # Design tokens
    └── globals.css        # Resets + utilities
```

---

## Commands

```bash
npm install           # Install dependencies
npm run dev           # Start dev server (localhost:5173)
npm run build         # Production build to /dist
npm run preview       # Preview production build
```

---

## Image Placeholders

Cover images currently use SVG placeholders. To use real images:

1. Drop `cover.webp` into each `/public/images/works/<slug>/` directory
2. Change `COVER_EXT` constant in `src/data/projects.ts` from `'svg'` to `'webp'`
3. Drop `portrait.webp` into `/public/images/profile/`
4. Update the portrait src in `src/pages/About/About.tsx`

Required structure (already created):
```
public/images/
├── profile/portrait.webp
└── works/
    ├── copaw/cover.webp
    ├── mumu-ai/cover.webp
    ├── liftpod/cover.webp
    ├── desktop-light/cover.webp
    ├── yueyun/cover.webp
    └── popmart-poster/cover.webp
```

---

## Project Showcase (Codex handoff)

`src/components/ProjectShowcase/ProjectShowcase.tsx` is the **placeholder socket** for the Codex animated component.

The expected final API:

```tsx
<ProjectShowcase
  projects={projects}                 // from src/data/projects.ts
  onProjectClick={(p) => navigate(`/works/${p.slug}`)}
/>
```

When Codex delivers its component:

1. Drop the file(s) into `src/components/ProjectShowcase/`
2. Replace the default export (preserve filename `ProjectShowcase.tsx`) **or** update the import in `src/pages/Works/Works.tsx`
3. Required props: `projects`, `onProjectClick`
4. Data shape is `Project` from `src/data/projects.ts` (already defined)

---

## Design Tokens

All design tokens live in `src/styles/variables.css`:

- **Colors**: `--bg`, `--bg-soft`, `--surface`, `--text`, `--text-secondary`, `--text-muted`, `--klein-blue`, `--blue-bright`, `--line`
- **Fonts**: `--font-en` (Inter / Manrope), `--font-cn` (Noto Sans SC)
- **Type scale**: `--fs-display`, `--fs-hero`, `--fs-h1`, ... `--fs-micro`
- **Motion**: `--ease-out`, `--ease-editorial`, `--d-fast`, `--d-base`, `--d-slow`

---

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/works` | Works |
| `/works/:slug` | Project Detail (6 slugs) |
| `/awards` | Awards |
| `/capabilities` | Capabilities |
| `/contact` | Contact |

---

## Notes

- **No serif fonts** anywhere in the project (per requirements).
- **Klein Blue** is used sparingly — accents, hovers, dividers, numbers, labels, indicators only.
- **Dark theme only** — light theme intentionally not implemented.
- **Touch devices**: custom cursor hidden; Grid Motion reduced; Project Showcase supports swipe.
- **Reduced motion**: custom cursor off, animations zeroed, Grid Motion row transform disabled.

---

© 2026 LI TIANLE