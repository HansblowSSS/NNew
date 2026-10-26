/**
 * Selected Experience — drives About page timeline.
 * (Internship media data lives in internship.ts below.)
 */

export interface ExperienceItem {
  number: string;
  title: string;
  role: string;
  period: string;
  responsibilities: string[];
  achievement?: string;
  achievementPrefix?: string;
}

export const experiences: ExperienceItem[] = [
  {
    number: '01',
    title: '槎城木韵——数字赋能河源木雕非遗及产业化路径研究',
    role: '项目负责人',
    period: '2025.11 — 2026.07',
    responsibilities: [
      '项目整体策划',
      '项目视觉设计',
      '团队 Logo 与品牌画册设计',
      '文创产品设计',
      '平面海报视觉设计',
      '项目 IP 形象衍生 AI 智能产品',
    ],
    achievement: '第十五届"挑战杯"广东大学生创业计划竞赛',
    achievementPrefix: '省级铜奖',
  },
  {
    number: '02',
    title: '数智民宿新质发力——激活百万千万古村全域振兴棋局',
    role: '项目成员',
    period: '2024.03 — 2025.06',
    responsibilities: [
      '乡村民宿与文旅产业研究',
      '项目 Logo 设计',
      '文创产品设计',
      '产品包装设计',
      '最终展板视觉输出',
      '新媒体平台直播等内容传播工作',
    ],
    achievement: '第十五届全国大学生电子商务"创新、创意及创业"挑战赛',
    achievementPrefix: '省级一等奖',
  },
];

export const education = {
  school: '五邑大学',
  major: '工业设计',
  rank: '专业前 15%',
};

export const languages = ['CET-4'];

export const disciplines = [
  'PRODUCT',
  'VISUAL',
  'GRAPHIC',
  'VIDEO',
  '3D',
  'AI',
];

/* ============================================
   Internship / Media data
   ============================================ */

export interface PlatformStats {
  followers: string;
  likes?: string;
}

export interface InternshipData {
  company: string;
  brand: string;
  role: string;
  period: string;
  companyDescription: string;
  studioUrl: string;
  verifiedFollowers: string;
  platforms: {
    douyin: PlatformStats;
    bilibili: PlatformStats;
    xiaohongshu: PlatformStats;
  };
  tasks: string[];
  /** Content participated during 2025.11 — present */
  selectedContent: SelectedContentItem[];
  internshipTotalViews: string;
  internshipVideoCount: string;
}

export interface SelectedContentItem {
  title: string;
  platform: 'Bilibili' | 'Douyin' | 'Xiaohongshu' | 'Other';
  views: string;
  date: string;
  role?: string;
  /** Video cover image path */
  cover?: string;
  /** Accessible description of the cover image */
  coverAlt?: string;
  /** Link to the original video page */
  videoUrl?: string;
}

/**
 * Six-stage content production workflow
 */
export interface WorkflowStage {
  number: string;
  /** Legacy English keyword (still used by the My Role list) */
  title: string;
  description: string;
  bullets: string[];
  /** Chinese stage name — primary label in the process module */
  titleCN: string;
  /** English supporting label — secondary only */
  titleEN: string;
  /** Short Chinese explanation of the stage */
  summary: string;
}

export const workflow: WorkflowStage[] = [
  {
    number: '01',
    title: 'RESEARCH',
    description: '研究阶段',
    bullets: ['资料调研', '选题研究', '案例分析'],
    titleCN: '选题研究',
    titleEN: 'RESEARCH',
    summary:
      '围绕选题开展资料搜集与内容研究，梳理核心信息，寻找具有传播价值的切入点。',
  },
  {
    number: '02',
    title: 'SCRIPT',
    description: '脚本与选题',
    bullets: ['脚本拆解', '视频选题切入角度', '内容结构分析'],
    titleCN: '脚本策划',
    titleEN: 'SCRIPT',
    summary: '整理信息与叙事逻辑，提炼内容重点，构建视频脚本与表达结构。',
  },
  {
    number: '03',
    title: 'VISUAL',
    description: '视觉与素材',
    bullets: ['素材搜集', '视觉策划', 'B-roll 策划'],
    titleCN: '视觉设计',
    titleEN: 'VISUAL DESIGN',
    summary: '根据内容主题规划画面表达，整合视觉素材，建立统一的画面风格。',
  },
  {
    number: '04',
    title: '3D / AI',
    description: '三维与 AI',
    bullets: ['Blender 三维建模', '动画制作', 'AI 辅助设计', 'AI 视频制作'],
    titleCN: '三维与 AI',
    titleEN: '3D & AI',
    summary: '结合三维制作与 AI 工具，辅助完成所需的视觉画面与内容表现。',
  },
  {
    number: '05',
    title: 'EDIT',
    description: '剪辑与包装',
    bullets: ['剪映', 'After Effects', '视频包装'],
    titleCN: '视频剪辑',
    titleEN: 'VIDEO EDITING',
    summary: '通过素材编排、节奏控制与画面衔接，将脚本与视觉素材整合为完整视频。',
  },
  {
    number: '06',
    title: 'DATA',
    description: '数据与复盘',
    bullets: ['自媒体账号数据整理', '内容表现分析', '选题复盘'],
    titleCN: '数据复盘',
    titleEN: 'DATA REVIEW',
    summary: '结合视频播放数据与内容表现进行复盘，为后续选题和制作提供参考。',
  },
];

/** Base path for internship content images */
const IMG_BASE = '/images/experience';

export const internship: InternshipData = {
  company: '野生创造（深圳）设计咨询有限公司',
  brand: 'YEStudio 袁野',
  role: '自媒体助理',
  period: '2025.11 — 至今',
  companyDescription:
    'YEStudio 野生创造设计工作室创办于 2022 年，业务主要包含建筑空间设计以及设计传媒两大业务。"YEStudio 袁野"自媒体频道以设计科普为主要方向，通过口播、探访、访谈、Vlog 等内容传播设计价值。',
  studioUrl: 'https://yyestudio.com/',
  verifiedFollowers: '49.7W+',
  platforms: {
    douyin: { followers: '21.7W', likes: '160.9W' },
    bilibili: { followers: '12.6W' },
    xiaohongshu: { followers: '15.38W' },
  },
  selectedContent: [
    {
      title: '为什么世界杯最矮球场，造价却全球最贵',
      platform: 'Bilibili',
      views: '94.6W',
      date: '2026-07-16',
      role: 'Content Research · Visual Asset · Production Support',
      cover: `${IMG_BASE}/video-worldcup.jpg`,
      coverAlt: '《为什么世界杯最矮球场，造价却全球最贵》视频封面',
      videoUrl: 'https://www.bilibili.com/video/BV1EQK56xEA1/',
    },
    {
      title: '为了让员工爱上上班，亚马逊总部建了一座人造"热带雨林"球',
      platform: 'Bilibili',
      views: '72.3W',
      date: '2026-06-03',
      role: 'Content Research · Visual Asset · Production Support',
      cover: `${IMG_BASE}/video-amazon.jpg`,
      coverAlt: '《为了让员工爱上上班，亚马逊总部建了一座人造"热带雨林"球》视频封面',
      videoUrl: 'https://www.bilibili.com/video/BV1rkV26TEpv/',
    },
    {
      title: 'OPPO正在深圳用造手机的"精度"建造总部大楼',
      platform: 'Bilibili',
      views: '44.6W',
      date: '2026-02-11',
      role: 'Content Research · Visual Asset · Production Support',
      cover: `${IMG_BASE}/video-oppo.jpg`,
      coverAlt: '《OPPO正在深圳用造手机的"精度"建造总部大楼》视频封面',
      videoUrl: 'https://www.bilibili.com/video/BV1yhcszwEH5/',
    },
  ],
  tasks: [
    '视频选题的切入角度',
    '资料调研',
    '脚本拆解',
    '素材搜集',
    'Blender 三维建模与动画制作',
    'AI 辅助设计',
    'AI 视频制作',
    '剪映 / AE',
    '自媒体账号数据整理与内容分析',
  ],
  // Confirmed data — no more placeholders
  internshipTotalViews: '910.6W',
  internshipVideoCount: '16',
};
