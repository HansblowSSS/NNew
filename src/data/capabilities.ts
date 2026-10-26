/**
 * Capabilities — drives Capabilities page editorial modules.
 */

export interface Capability {
  number: string;
  titleEN: string;
  titleCN: string;
  description: string;
  items: string[];
}

export const capabilities: Capability[] = [
  {
    number: '01',
    titleEN: 'PRODUCT DESIGN',
    titleCN: '产品设计',
    description: '从用户研究到概念落地的完整产品设计流程。',
    items: [
      '产品概念设计',
      '用户研究',
      '产品外观设计',
      'CMF',
      '3D 建模',
      '产品渲染',
    ],
  },
  {
    number: '02',
    titleEN: 'VISUAL DESIGN',
    titleCN: '视觉设计',
    description: '以编辑式思维构建品牌与视觉系统。',
    items: [
      '平面设计',
      '品牌视觉',
      'IP 设计',
      '海报设计',
      '版式设计',
      '信息视觉化',
    ],
  },
  {
    number: '03',
    titleEN: 'VIDEO & CONTENT',
    titleCN: '影像与内容',
    description: '从脚本到成片的影像内容创作能力。',
    items: [
      '摄影',
      '视频剪辑',
      '视频脚本',
      '分镜策划',
      'B-roll 策划',
      '视觉包装',
    ],
  },
  {
    number: '04',
    titleEN: '3D & AI',
    titleCN: '三维与智能',
    description: '以三维与 AI 工具拓展视觉边界。',
    items: [
      'Blender 建模与动画',
      'AI 视觉生成',
      'AI 辅助设计',
      'AI 视频制作',
      'AI 图片生成',
    ],
  },
];