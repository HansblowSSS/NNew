/**
 * LiftPod data — single source of truth for the LiftPod pen holder
 * detail page. All paths point to real files under public/.
 */

const IMG = (name: string) => `/images/works/liftpod/${name}`;
const VID = (name: string) => `/video/works/liftpod/${name}`;

/* =================================================================
   01 · HERO — full-bleed product scene
   ================================================================= */
export const liftPodHero = {
  eyebrow: 'LIFTPOD / PRODUCT DESIGN',
  titleCN: 'LiftPod 笔筒',
  // Product positioning: who it is for, what it does, and what makes
  // it different — all in one short paragraph.
  subtitleCN:
    '一款面向现代办公、学习与个人创作桌面的升降式笔筒，以升降结构整合上下分层收纳空间，让常用文具与零散小物在同一产品中有序共存。',
  scrollHint: 'SCROLL TO EXPLORE ↓',
  bgImage: IMG('笔筒高端桌面场景主视觉.png'),
};

/* =================================================================
   02 · PRODUCT POSITIONING — narrative chapter
   ================================================================= */
export const liftPodPositioning = {
  eyebrow: 'PRODUCT POSITIONING',
  eyebrowCN: '产品定位',
  titleCN: '让收纳不止于容纳。',
  bodyCN: [
    '在办公、学习与个人创作的桌面上，文具与零散小物往往需要不同的收纳方式。LiftPod 以升降结构为核心，将常用文具与隐藏收纳空间整合在同一产品中。',
    '上层容纳日常使用的文具，底部收纳容易散落的小物，通过升降状态的切换，让收纳与取用形成连续的使用体验。',
  ],
  keywords: ['升降收纳', '上下分层', '桌面秩序'],
  oneLiner: '一款以升降结构整合上下层收纳空间的现代桌面笔筒。',
  // Three short blocks under the lead text
  blocks: [
    {
      num: '01',
      title: '使用场景',
      body: '电脑旁的办公桌、学习与阅读桌面、个人创作工作台。',
    },
    {
      num: '02',
      title: '核心问题',
      body: '传统笔筒收纳空间单一，零散小物容易散落，收纳与取用之间缺少整体组织。',
    },
    {
      num: '03',
      title: '设计回应',
      body: '以升降结构整合上下分层收纳，让常用文具与零散小物在同一产品中有序共存。',
    },
  ],
};

/* =================================================================
   02 · PRODUCT OVERVIEW — two hero images
   ================================================================= */
export const liftPodOverview = {
  titleCN: '重新组织桌面收纳的方式。',
  bodyCN:
    'LiftPod 以升降收纳为核心，将常用文具与零散桌面物件整合在同一产品之中，让收纳与取用形成更清晰的使用关系。',
  // Main product shot: full form, blue body, base relationship
  // Extended to 4:3 landscape so it fills the overview cell with no borders.
  mainImage: IMG('primary_ext.png'),
  mainImageAlt: 'LiftPod 笔筒产品整体展示',
  // Secondary: front-facing product view (also 4:3 landscape)
  frontImage: IMG('front_ext.png'),
  frontImageAlt: 'LiftPod 笔筒正面产品图',
};

/* =================================================================
   03 · PRODUCT DETAILS — three editorial detail images
   ================================================================= */
export const liftPodDetails = {
  titleCN: '从整体形态，到每一处细节。',
  bodyCN:
    '通过主体、侧边控制结构与上下收纳空间的细节，呈现 LiftPod 在外观与功能之间的设计关系。',
  base: {
    image: IMG('笔筒底座结构图.png'),
    imageAlt: '底座结构与隐藏收纳空间',
    label: '底座结构',
    desc: '展示底部结构与隐藏收纳空间之间的关系。',
  },
  slot: {
    image: IMG('笔筒开槽细节图.png'),
    imageAlt: '侧边开槽及滑动控制结构',
    label: '侧边开槽',
    desc: '展示侧边开槽及滑动控制结构的外观细节。',
  },
  opening: {
    image: IMG('笔筒筒身开口细节产品图.png'),
    imageAlt: '筒身开口与上层文具收纳',
    label: '筒身开口',
    desc: '展示上层开口与日常文具收纳的关系。',
  },
};

/* =================================================================
   04 · STORAGE STRUCTURE — two-column with annotated image
   ================================================================= */
export const liftPodStructure = {
  titleCN: '上下分层，让收纳更有序。',
  bodyCN:
    '通过上下两层收纳空间与侧边滑动机构的组合，让常用文具与零散桌面物件各有其位。',
  structureImage: IMG('笔筒上下层收纳功能分解图.png'),
  structureImageAlt: '上下层收纳功能分解图',
  upper: {
    label: '上层收纳仓',
    desc: '用于放置笔、尺子、圆规等常用文具，让日常工具集中收纳、方便取用。',
  },
  side: {
    label: '侧边滑动机构',
    desc: '通过侧边滑动控制结构，实现产品的升降操作，切换收纳与取用状态。',
  },
  lower: {
    label: '底部隐藏收纳仓',
    desc: '利用底部空间收纳回形针、U 盘等小型桌面物件，让零散物件不再暴露在桌面上。',
  },
};

/* =================================================================
   05 · LIFTING MOTION — product video
   ================================================================= */
export const liftPodMotion = {
  titleCN: '让取用，成为一个自然的动作。',
  bodyCN:
    '通过升降结构的变化，在收纳状态与取用状态之间切换，直观呈现 LiftPod 的核心功能。',
  video: VID('笔筒开合产品宣传片.mp4'),
  poster: IMG('笔筒产品主图.png'),
};

/* =================================================================
   06 · DESIGN PROCESS — concise 3-stage overview
   ================================================================= */
export const liftPodProcess = {
  titleCN: '从三维建模，到产品视觉呈现。',
  modeling: {
    // 3D modelling: use the user's reference sketch — full annotated
    // multi-view line drawing on dark background.
    image: IMG('modeling_ext.png'),
    imageAlt: 'LiftPod 三维建模',
  },
  structure: {
    // Structure: exploded view of the LiftPod on white background
    image: IMG('structure_ext.jpg'),
    imageAlt: 'LiftPod 结构设计',
  },
  visualization: {
    // Final render: front-facing product
    image: IMG('笔筒正面产品图.png'),
    imageAlt: 'LiftPod 产品渲染',
  },
};

/* =================================================================
   07 · CLOSING
   ================================================================= */
export const liftPodClosing = {
  titleCN: '让日常物件，拥有更好的使用体验。',
  bodyCN: '以升降收纳重新思考桌面用品的功能与形态。',
};
