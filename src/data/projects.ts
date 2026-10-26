/**
 * Projects data — drives Works page & Project Detail pages.
 * Cover images resolve under /images/works/<slug>/cover.{webp|svg}
 * (Use .svg placeholder during development; switch to .webp when real
 * images are placed in /public/images/works/<slug>/.)
 */

export interface Project {
  id: string;
  number: string;
  title: string;
  /** Chinese / project-given title */
  titleCN: string;
  category: string;
  year?: string;
  slug: string;
  cover: string;
  /** Optional short tagline shown on detail page */
  intro?: string;
  role?: string;
}

// Set to false when real cover.webp files are dropped into /public
const COVER_EXT = 'jpg';

export const projects: Project[] = [
  {
    id: 'copaw',
    number: '01',
    title: 'CoPaw',
    titleCN: '共感CoPaw',
    category: 'PRODUCT DESIGN / SMART PET CARE',
    slug: 'copaw',
    cover: `/images/works/copaw/cover.${COVER_EXT}`,
    intro: 'A smart pet care product exploring empathetic human-pet connection.',
    role: 'Product Designer',
  },
  {
    id: 'mumu-ai',
    number: '02',
    title: 'Mumu AI',
    titleCN: '木木AI智能桌面伙伴',
    category: 'PRODUCT DESIGN / AI',
    slug: 'mumu-ai',
    cover: `/images/works/mumu-ai/cover.${COVER_EXT}`,
    intro: 'An AI desktop companion product concept.',
    role: 'Product Designer',
  },
  {
    id: 'liftpod',
    number: '03',
    title: 'LiftPod',
    titleCN: 'LiftPod笔筒',
    category: 'PRODUCT DESIGN / DESKTOP',
    slug: 'liftpod',
    cover: `/images/works/liftpod/cover.${COVER_EXT}`,
    intro: 'A desktop pen holder with a distinctive lifting mechanism.',
    role: 'Product Designer',
  },
  {
    id: 'desktop-light',
    number: '04',
    title: 'Desktop Light',
    titleCN: '桌面摆件灯',
    category: 'PRODUCT DESIGN / LIGHTING',
    slug: 'desktop-light',
    cover: `/images/works/desktop-light/cover.${COVER_EXT}`,
    intro: 'A desktop decorative lighting object.',
    role: 'Product Designer',
  },
  {
    id: 'yueyun',
    number: '05',
    title: 'Yueyun',
    titleCN: '粤韵芳华盲盒文创',
    category: 'CULTURAL CREATIVE / IP',
    slug: 'yueyun',
    cover: `/images/works/yueyun/cover.${COVER_EXT}`,
    intro: 'A blind-box cultural creative project rooted in Cantonese aesthetics.',
    role: 'Product / IP Designer',
  },
  {
    id: 'popmart-poster',
    number: '06',
    title: 'POP MART Poster',
    titleCN: '泡泡玛特大广赛参赛海报',
    category: 'GRAPHIC DESIGN / POSTER',
    slug: 'popmart-poster',
    cover: `/images/works/popmart-poster/cover.${COVER_EXT}`,
    intro: 'Poster submission for the POP MART Advertising Competition.',
    role: 'Graphic Designer',
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const projectSlugs = projects.map((p) => p.slug);
