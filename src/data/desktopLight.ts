/**
 * Desktop Light Detail — content data
 *
 * 6 sections, each with a clearly scoped purpose.
 * All image / video paths are real files in /public/.
 *
 * Section layout:
 *   01 HERO        — full-bleed scene with slogan
 *   02 DESIGN      — main product visual + giant EN wordmark
 *   03 INTERACTION — video background + two-state overlay
 *   04 DETAIL      — close-up of light + warm halo
 *   05 STRUCTURE   — product structural breakdown
 *   06 CLOSING     — full-bleed closing scene + back link
 */

export const dlMeta = {
  code: 'DL · 001',
  year: '2026',
  category: 'PRODUCT DESIGN',
};

export const dlHero = {
  productNameEN: 'DESKTOP AMBIENT LIGHT',
  productNameCN: '桌面摆件灯',
  sloganCN: '为热爱桌面美学的你，留一束温暖的光。',
  sloganEN: 'A LITTLE WARMTH FOR YOUR EVERYDAY SPACE.',
  scrollHint: 'Scroll',
  /** 场景1.png — 暖木桌 + 摆件灯 + 茶杯，最具氛围感 */
  bgImage: '/images/works/desktop-light/场景1.png',
};

export const dlDesign = {
  titleCN: '克制的形态，自有温度',
  titleEN: 'FORM MEETS LIGHT',
  bodyCN:
    '深色的几何轮廓与温暖的发光区域在产品中形成对比。它不仅提供氛围照明，也作为桌面空间中的视觉锚点，与周围物品共同构成克制的桌面语言。',
  /** 主图1.png — 纯色背景 + 摆件灯全身，最清晰的产品主图 */
  productImage: '/images/works/desktop-light/主图1.png',
  productImageAlt: '桌面摆件灯产品主视觉',
  caption: 'PRODUCT · MAIN VISUAL',
};

/**
 * 03 · INTERACTION
 * - Full-bleed video background (auto-plays when in viewport)
 * - Text anchored left
 * - 双状态对比图已删除，仅保留标题与视频
 */
export const dlInteraction = {
  titleCN: '伸缩之间，光随之变化',
  titleEN: 'ONE MOTION · A CHANGING LIGHT',
  bodyCN:
    '通过中间的伸缩结构，灯光能够随着产品的开合而变化：伸出时灯光亮起，射光范围与亮度随之改变；完全合拢时，灯光关闭。',
  /** 视频背景：用户提供的 3.mp4，进入视口自动循环播放 */
  videoSrc: '/video/works/desktop-light/3.mp4',
};

export const dlDetail = {
  titleCN: '触感的舒适，藏在材质里',
  titleEN: 'SOFTNESS IN EVERY DETAIL',
  bodyCN:
    '细腻的 TPE 材质与柔和的哑光质感相融，让触感与视觉达成平衡，在每一次触碰中，感受材质本身的舒适。',
  /** 特写1.png — 摆件灯 + 灯光流光特写 */
  image: '/images/works/desktop-light/特写1.png',
  imageAlt: '桌面摆件灯光发射区域特写',
};

export const dlStructure = {
  titleCN: '克制的结构，构成秩序',
  titleEN: 'A QUIET KIND OF STRUCTURE',
  bodyCN:
    '产品由清晰可见的几个主要部件构成。部件之间的组合关系与比例关系一目了然，让产品在使用中也能够被识别与理解。',
  /**
   * structure.png — 拆解结构图
   * 2026-10-14 更新 1：替换为用户提供的产品新图：结构新图.png
   * 2026-10-14 更新 2：替换为用户提供的产品特写图：产品特写-替换.png
   * 2026-10-14 更新 3：替换为用户提供的真实结构拆解爆炸图：结构拆解图.png
   * 2026-10-15 更新 A：作为全屏背景图（产品透视线稿），标题移至左上角避免遮挡主体
   * 2026-10-15 更新 B：换为暖光摆件灯场景作为背景（用户提供），标题仍在左上角
   * 2026-10-15 更新 C：标题 / 副标 / 正文移到画面右上方，右对齐；按标点分行
   */
  image: '/images/works/desktop-light/结构新图-橙色草图.png',
  imageAlt: '桌面摆件灯产品结构拆解图（爆炸图）',
  metaLeft: 'EXPLODED VIEW',
  metaRight: 'COMPONENTS · 04',
};

export const dlClosing = {
  titleEN: 'A QUIETER KIND OF LIGHT',
  titleCN: '给日常，留一点温柔',
  subtitle: '一件克制的桌面器物，为日常桌面与居家空间带来一束可控的暖光。',
  backLabel: 'BACK TO WORKS',
  /** 场景4.png — 暖灯特写 + 双手（最强氛围感） */
  bgImage: '/images/works/desktop-light/场景4.png',
};
