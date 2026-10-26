/**
 * Popmart poster — project-specific content & image paths.
 * The cover image stays on /images/works/popmart-poster/cover.jpg
 * (shared with the listing card). Three narrative posters live
 * beside it, in this exact order: landscape, emotion, starry.
 */

export interface PosterChapter {
  num: string;
  titleCN: string;
  titleEN: string;
  subtitle: string;
  body: string[];
  image: string;
  imageAlt: string;
  /** 'left' = image on the left, text on the right (desktop). */
  layout: 'left' | 'right';
}

export interface WorkflowStep {
  num: string;
  titleCN: string;
  body: string;
  highlight?: boolean;
}

const base = '/images/works/popmart-poster';

export const popmartHero = {
  competition:
    '第 18 届全国大学生广告艺术大赛 · 泡泡玛特品牌赛道',
  award: '校级选拔赛 · 二等奖',
  titleEN: 'Paint Your World',
  titleCN: '描绘你的世界',
  tagline: '希望拥有 Molly 小画家的人，都能收获属于自己的梦幻世界',
  lede: '以 Molly 小画家为核心，用三支画笔绘出风景、情绪与星空——色彩落下之处，万物生长；灰暗被点亮，梦境照进现实。',
  posters: [
    `${base}/landscape.webp`,
    `${base}/emotion.webp`,
    `${base}/starry.webp`,
  ],
  posterLabels: ['风景', '情绪', '星空'],
};

export const popmartChapters: PosterChapter[] = [
  {
    num: '01',
    titleCN: '风景',
    titleEN: 'Scenery',
    subtitle: 'Molly 与色彩落下的地方，万物皆温柔生长。',
    body: [
      '小画家倾倒出的蓝色颜料，蜿蜒成山间的河流。河水滋养两岸，令花草盛放、万物生生不息——有 Molly 在的地方，就有色彩与生机。',
      '这不仅呼应了小画家的 IP 人设，更寓意泡泡玛特的产品能为每一位拥有者注入生活的活力，收获纯粹的快乐。',
    ],
    image: `${base}/landscape.webp`,
    imageAlt: 'Paint Your World · 风景 Scenery',
    layout: 'left',
  },
  {
    num: '02',
    titleCN: '情绪',
    titleEN: 'Emotion',
    subtitle: '她是你的情绪化身，为灰白的生活刷上色彩。',
    body: [
      '画面左侧是灰白单调的客厅，象征现代人疲惫乏味的日常；小画家挥舞画笔，右侧空间被粉刷成斑斓的彩色世界。',
      '画笔即泡泡玛特的产品 IP——它为疲乏的人们增添生活的色彩，让每一个消费者都能在日常中寻回快乐与温度。',
    ],
    image: `${base}/emotion.webp`,
    imageAlt: 'Paint Your World · 情绪 Emotion',
    layout: 'right',
  },
  {
    num: '03',
    titleCN: '星空',
    titleEN: 'Starry Sky',
    subtitle: '她把梦画进天空，也照亮人间。',
    body: [
      '小画家背对观者，举笔向夜空挥洒，颜料化作银河与繁星。她将梦中的星空画给所有人，让美好不再是遥不可及的想象。',
      '这既是 Molly 小画家的浪漫，也是整个泡泡玛特品牌想要带给人们的东西——守护每一份童心与幻想。',
    ],
    image: `${base}/starry.webp`,
    imageAlt: 'Paint Your World · 星空 Starry Sky',
    layout: 'left',
  },
];

export const popmartWorkflow: WorkflowStep[] = [
  {
    num: '01',
    titleCN: '赛事要求分析',
    body: '解读大广赛命题规则与泡泡玛特品牌赛道的评审标准，锁定创作边界与核心诉求。',
  },
  {
    num: '02',
    titleCN: '品牌内容多角度分析',
    body: '从 Molly 小画家 IP 人设、泡泡玛特品牌理念、目标受众情感需求三个维度拆解品牌内核。',
  },
  {
    num: '03',
    titleCN: '确定创作方向',
    body: '提炼「Paint Your World · 描绘你的世界」核心概念，确立风景、情绪、星空三联画的叙事结构。',
  },
  {
    num: '04',
    titleCN: '画面设计',
    body: '逐张规划构图、色彩基调、视觉隐喻与文字排版，完成手绘草图与分镜方案。',
  },
  {
    num: '05',
    titleCN: 'AI 辅助生图',
    body: '借助 AI 生成工具进行画面渲染与细节优化，在自主设计框架内提升视觉完成度。',
    highlight: true,
  },
  {
    num: '06',
    titleCN: '成品',
    body: '后期合成、文字排版、品牌元素校准，输出最终三张系列海报。',
  },
];

export const popmartClosing = {
  titleEN: 'Paint Your World',
  body: '愿每一个拥有 Molly 的人，都能画出属于自己的世界。',
};
