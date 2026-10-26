/**
 * CoPaw — product detail page content & real asset paths.
 *
 * All real images and videos have been placed by the designer
 * under public/images/works/copaw/ and public/video/works/copaw/.
 * This file is the single source of truth for paths, copy,
 * and section ordering.
 */

const IMG = (name: string) => `/images/works/copaw/${name}`;
const VID = (name: string) => `/video/works/copaw/${name}`;

/* ---- shared ---- */
export const copawCover = IMG('cover.jpg');
export const petpulseUrl = '/petpulse.html';

/* =================================================================
   01 · HERO
   ================================================================= */
export const copawHero = {
  titleCN: '共感 CoPaw',
  sloganCN: '理解每一种情绪',
  sloganEN: 'Understand Every Feeling.',
  introCN:
    '一款关注宠物情绪感知与人宠沟通的智能穿戴产品，让那些无法言说的感受，也能被理解。',
  video: VID('CoPaw Hero 产品悬浮旋转视频.mp4'),
  fallback: copawCover,
  scrollHintCN: '向下探索',
};

/* =================================================================
   02 · INSIGHT — full-bleed background video, white type
   ================================================================= */
export const copawInsight = {
  titleCN: '它不会说话，却一直在表达',
  bodyCN: [
    '紧张、兴奋、恐惧与放松，宠物通过行为和身体反应传递自己的状态。',
    '我们希望通过设计，让这些容易被忽略的信号变得更容易被察觉。',
  ],
  // Rose/magenta lighting, full-bleed background video, looped.
  video: VID('video_1791622527956.mp4'),
};

/* =================================================================
   03 · PRODUCT DESIGN — six aligned product plates
   ================================================================= */
export const copawProduct = {
  titleCN: '从感知到回应，让沟通有迹可循',
  bodyCN:
    'CoPaw 将宠物状态感知、视觉化反馈与牵引控制融入一套产品体验中。它不仅是一件智能穿戴设备，也是一种帮助人们更细致地理解宠物的设计尝试。',
  // The section is split into two sub-blocks: collar first,
  // then handle. Each sub-block has 3 plates, all rendered at
  // the same aspect ratio so the layout stays consistent.
  collar: {
    titleCN: '智能宠物项圈',
    titleEN: 'Smart Pet Collar',
    descCN: '捕捉宠物状态与行为变化，是整件产品的感知起点。',
    plates: [
      {
        image: IMG('智能宠物项圈产品图.png'),
        alt: '智能宠物项圈产品图',
        label: 'Product · 产品图',
      },
      {
        image: IMG('智能宠物项圈-三视图v2.png'),
        alt: '智能宠物项圈 — 三视图',
        label: 'Three-View · 三视图',
      },
      {
        image: IMG('智能宠物项圈-线稿效果图.png'),
        alt: '智能宠物项圈 — 线稿效果图',
        label: 'Line-Art · 线稿效果图',
      },
    ],
  },
  handle: {
    titleCN: '智能牵引握把',
    titleEN: 'Smart Leash Handle',
    descCN: '主人与宠物之间最直接的连接点，关注真实使用中的握持与控制。',
    plates: [
      {
        image: IMG('牵引绳握柄产品图.png'),
        alt: '智能牵引握把 — 产品图',
        label: 'Product · 产品图',
      },
      {
        image: IMG('牵引绳握柄-三视图.png'),
        alt: '智能牵引握把 — 三视图',
        label: 'Three-View · 三视图',
      },
      {
        image: IMG('牵引绳握柄-线稿效果图.png'),
        alt: '智能牵引握把 — 线稿效果图',
        label: 'Line-Art · 线稿效果图',
      },
    ],
  },
  // 4K motion video of the leash product.
  handleVideo: VID('宠物牵引绳产品展示视频.mp4'),
  handleVideoLabel: '牵引绳动态展示',
};

/* =================================================================
   04 · EMOTION LIGHT — status colors
   ================================================================= */
export const copawEmotion = {
  titleCN: '看不见的情绪，也可以被感知',
  bodyCN:
    '通过不同的灯光状态，将抽象的情绪信息转化为更直观的视觉提示，帮助主人更快留意宠物当下的状态。',
  states: [
    {
      key: 'blue',
      labelCN: '蓝',
      noteCN: '状态灯效示例之一。',
      image: IMG('智能宠物项圈-蓝色灯光.png'),
      imageAlt: '智能宠物项圈 — 蓝色灯光',
      swatch: '#2C7BFF',
    },
    {
      key: 'green',
      labelCN: '绿',
      noteCN: '状态灯效示例之一。',
      image: IMG('智能宠物项圈-绿色灯光.png'),
      imageAlt: '智能宠物项圈 — 绿色灯光',
      swatch: '#34C759',
    },
    {
      key: 'yellow',
      labelCN: '黄',
      noteCN: '状态灯效示例之一。',
      image: IMG('智能宠物项圈-黄色灯光.png'),
      imageAlt: '智能宠物项圈 — 黄色灯光',
      swatch: '#FFCC00',
    },
    {
      key: 'red',
      labelCN: '红',
      noteCN: '状态灯效示例之一。',
      image: IMG('智能宠物项圈-红色灯光.png'),
      imageAlt: '智能宠物项圈 — 红色灯光',
      swatch: '#FF3B30',
    },
  ],
};

/* =================================================================
   05 · APP — embed the existing petpulse.html prototype
   ================================================================= */
export const copawApp = {
  titleCN: '不只看见情绪，也能随时了解',
  bodyCN:
    '通过 CoPaw Link，将宠物状态转化为清晰、直观的信息，帮助主人在日常生活中更方便地关注宠物。',
  prototypeUrl: petpulseUrl,
  // Kept for any future use in other sections; the WATCH APP
  // module itself now uses a full-bleed pet photo background.
  sceneImage: IMG('CoPaw-AppleWatch场景图v2.png'),
  sceneImageAlt: 'CoPaw Apple Watch 场景图',
  // Full-bleed cinematic background. The pet photo carries the
  // emotional weight of the section; type is overlaid on the
  // darker (left) side of the frame.
  bgImage: IMG('watch-scene-pet.jpg.png'),
  bgImageAlt: '宠物与主人相处的电影感照片',
  points: [
    '一眼看清当前情绪状态。',
    '回看历史变化曲线。',
    '异常情况即时通知主人。',
  ],
};

/* =================================================================
   06 · CONNECTION — full-bleed background video
   ================================================================= */
export const copawConnection = {
  titleCN: '科技的意义，是让彼此更靠近',
  bodyCN:
    '我们希望技术不只是记录数据，也能帮助人们更敏锐地理解宠物的感受。在每一次陪伴与互动中，让人与宠物之间的连接更加自然。',
  video: VID('video_1791622529430.mp4'),
};

/* =================================================================
   07 · CLOSING — text only
   ================================================================= */
export const copawClosing = {
  brandCN: '共感 CoPaw',
  sloganCN: '让每一种感受，都值得被理解',
  backToWorksCN: '返回作品集',
};
