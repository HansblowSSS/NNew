/**
 * 木木 AI 智能桌面伙伴 (Mumu AI) — 文案与素材配置
 * 当前所有图片均为 SVG 占位符，待真实素材到位后逐个替换。
 */

export interface MumuSection {
  index: string;
  indexEN: string;
  titleCN: string;
  subtitleCN?: string;
  bodyCN: string;
}

export interface MumuFeature {
  num: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
}

export interface MumuCharacter {
  id: string;
  num: string;
  nameCN: string;
  nameEN: string;
  intro: string;
  image: string;
  imageAlt: string;
}

export interface MumuCultureDirection {
  id: string;
  title: string;
  sub: string;
  body: string;
  image: string;
  imageAlt: string;
}

export interface MumuScenario {
  num: string;
  /** Small English auxiliary label, e.g. MORNING */
  time: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
}

export interface MumuDetailItem {
  num: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
}

export interface MumuTechNote {
  title: string;
  body: string;
}

export const BASE = '/images/works/mumu-ai';

export const mumuAI = {
  titleCN: '木木 AI 智能桌面伙伴',
  titleEN: 'MUMU AI DESK COMPANION',
  category: 'PRODUCT DESIGN / AI',

  meta: {
    year: '2025',
    role: 'Product Designer',
  },

  hero: {
    tag: 'MUMU · AI DESK COMPANION',
    titleCN: '木木 AI 智能桌面伙伴',
    sloganCN: '让智能有温度，让陪伴有模样。',
    bodyCN:
      '一位融合河源非遗文化的 AI 桌面伙伴。它尝试将语音交互、动态角色与氛围灯光融入日常，为工作、学习和居家时光增添一点温暖。',
    keywords: ['AI 智能助手', '情绪化陪伴', '非遗文化 IP'],
    image: `${BASE}/placeholder-hero.svg`,
    imageAlt: '木木 AI 桌面伙伴产品主图占位符',
    video: '/video/works/mumu-ai/Hero页视频.mp4',
  },

  positioning: {
    index: '01',
    indexEN: 'PRODUCT POSITIONING',
    titleCN: '不只是一个工具，还是桌面上的陪伴者。',
    bodyCN:
      '木木尝试把日常助手、虚拟角色与智能家居控制整合在一台桌面设备中。它能回应日常需求，也通过屏幕表情、角色动作与灯光变化，让人与设备的互动更有温度。',
    directions: [
      {
        title: '日常效率',
        body: '查看时间与天气，探索语音问答、提醒与信息查询等日常功能。',
      },
      {
        title: '情绪陪伴',
        body: '通过屏幕表情、角色动作与灯光反馈，让设备拥有更具亲和力的交互表达。',
      },
      {
        title: '文化表达',
        body: '将河源木雕、花朝戏与猫头狮元素融入数字 IP 形象。',
      },
    ],
    productImage: `${BASE}/product-positioning-uploaded.jpg`,
    productImageAlt: '木木产品多角度展示',
  },

  features: {
    index: '02',
    indexEN: 'CORE FEATURES',
    titleCN: '把日常需要，变成自然的互动。',
    subtitleCN: '从一句语音开始，让信息、角色与灯光共同参与日常。',
    items: [
      {
        num: '01',
        title: '语音交互',
        body: '通过语音识别与语音对话方案，探索问答、计算、翻译、提醒等日常功能。',
      },
      {
        num: '02',
        title: '人机语音交互',
        body: '通过语音识别与语音对话方案，探索问答、计算、翻译、提醒等日常功能。',
        image: `${BASE}/feat-2.png`,
        imageAlt: '木木多种颜色版本',
      },
      {
        num: '03',
        title: '多媒体体验',
        body: '规划音乐、有声书、广播播放及蓝牙音箱模式。',
        image: `${BASE}/feat-3.jpg`,
        imageAlt: '木木日程 / 提醒 / 智能家居界面',
      },
      {
        num: '04',
        title: '情绪氛围灯',
        body: '环绕灯带可作为角色状态的辅助视觉反馈，让光线成为互动体验的一部分。',
      },
      {
        num: '05',
        title: '灯带光效互动',
        body: '环绕灯带可作为角色状态的辅助视觉反馈，让光线成为互动体验的一部分。',
        image: `${BASE}/feat-4.jpg`,
        imageAlt: '木木时间与天气界面',
      },
      {
        num: '06',
        title: '智能家居联动',
        body: '探索灯光、空调、电视、窗帘等设备控制与场景联动。',
      },
    ],
    colorImage: `${BASE}/feat-1.jpg`,
    colorImageAlt: '木木核心功能示意',
  },

  culture: {
    index: '03',
    indexEN: 'IP & CULTURE',
    titleCN: '让传统文化，在数字角色中继续生长。',
    bodyCN:
      '木木从河源本土文化中汲取灵感，将传统造型、纹样与表演特征转化为屏幕中的动态 IP，让非遗文化以更轻松、更亲近的方式进入日常生活。',
    directions: [
      {
        id: 'mudiao',
        title: '河源木雕 / 雕刻肌理',
        body: '从传统木雕的人物造型、装饰纹样与刀刻肌理中提取视觉语言，让数字角色呈现温润而鲜明的视觉特征。',
        image: `${BASE}/culture-mudiao.png`,
        imageAlt: '河源木雕元素',
      },
      {
        id: 'huazhaoxi',
        title: '花朝戏 / 服饰与身段',
        body: '将花朝戏的服饰色彩、经典纹样与表演动作融入角色设计，为数字形象带来具有地方特色的造型表达。',
        image: `${BASE}/culture-huazhaoxi.jpg`,
        imageAlt: '花朝戏元素',
      },
      {
        id: 'maotoushi',
        title: '猫头狮 / 民俗与灵动',
        body: '提取猫头狮的造型轮廓、面部纹饰和鲜明配色，赋予角色活泼、有亲和力的视觉特征。',
        image: `${BASE}/culture-maotoushi.jpg`,
        imageAlt: '猫头狮元素',
      },
    ],
  },

  characters: {
    index: '04',
    indexEN: 'CHARACTER COLLECTION',
    titleCN: '不止一种模样，每个角色都有自己的故事。',
    bodyCN:
      '从猫头狮的灵动，到花朝戏人物的温婉与英气，木木以不同的数字角色承载文化表达、知识分享与日常陪伴。',
    roles: [
      {
        id: 'xianmumu',
        num: '01',
        nameCN: '贤木木',
        nameEN: 'XIAN MUMU',
        intro: '融合猫头狮、花朝戏与木雕质感，以客家文化科普和日常陪伴为主要方向。',
        image: `${BASE}/char-1.jpg`,
        imageAlt: '贤木木角色',
      },
      {
        id: 'mumu',
        num: '02',
        nameCN: '木木',
        nameEN: 'MUMU',
        intro: '延续猫头狮的经典配色与灵动造型，让民俗元素以更活泼的方式走进年轻人的日常。',
        image: `${BASE}/char-2.jpg`,
        imageAlt: '木木猫头狮IP角色',
      },
      {
        id: 'xiangu',
        num: '03',
        nameCN: '贤姑',
        nameEN: 'XIAN GU',
        intro: '以温婉典雅的角色形象，探索民间故事与花朝戏经典桥段的讲述体验。',
        image: `${BASE}/char-3.jpg`,
        imageAlt: '贤姑花朝戏青衣角色',
      },
      {
        id: 'dongyaxing',
        num: '04',
        nameCN: '董亚兴',
        nameEN: 'DONG YAXING',
        intro: '以英气俊朗的形象与轻快的互动风格，带来趣味交流与休闲陪伴。',
        image: `${BASE}/char-4.jpg`,
        imageAlt: '董亚兴杖头木偶小生角色',
      },
      {
        id: 'zhumei',
        num: '05',
        nameCN: '珠妹',
        nameEN: 'ZHU MEI',
        intro: '以俏皮可爱的形象，面向儿童与青少年群体，探索趣味科普与轻松对话。',
        image: `${BASE}/char-5.jpg`,
        imageAlt: '珠妹原创融合角色',
      },
    ],
  },

  aiExperience: {
    index: '05',
    indexEN: 'AI EXPERIENCE',
    titleCN: '让对话自然发生，让回应拥有表情。',
    bodyCN:
      '木木的 AI 交互方案围绕"听见、理解、回应"展开，并将语音交互与屏幕角色、氛围灯带结合，探索更自然的桌面交互体验。',
    steps: [
      {
        num: '01',
        label: '听见 · ASR',
        body: '通过语音识别理解用户的语音输入，方案关注普通话及粤语、客家话等方言交互需求。',
      },
      {
        num: '02',
        label: '理解 · LLM',
        body: '通过大语言模型处理问题、生成回答，并为日常问答与文化知识交互提供能力基础。',
      },
      {
        num: '03',
        label: '回应 · TTS',
        body: '将文字回复转化为语音，让角色通过声音与屏幕表情共同完成回应。',
      },
    ],
    multiModal: '多模态与本地部署探索：文档还规划了多模态模型与轻量化本地部署方向，用于探索更丰富的交互形式与边缘设备运行能力。',
    models: [
      { name: 'Fun-Audio-Chat-8B', desc: '语音交互候选方案' },
      { name: 'Qwen3-ASR', desc: '语音识别候选方案' },
      { name: 'Qwen3-TTS', desc: '语音合成候选方案' },
      { name: 'Qwen3-Omni', desc: '多模态候选方案' },
      { name: 'DeepSeek-R1 蒸馏版', desc: '轻量化本地推理探索方向' },
    ],
    productImage: `${BASE}/product.png`,
    productImageAlt: '木木AI交互方案对比',
  },

  scenarios: {
    index: '06',
    indexEN: 'DAILY SCENARIOS',
    titleCN: '从早晨到夜晚，陪伴融入每个日常片刻。',
    bodyCN: '木木围绕生活节奏设计交互场景，让信息提醒、文化内容与角色反馈自然融入日常。',
    items: [
      {
        num: '01',
        time: 'MORNING',
        title: '轻轻唤醒',
        body: '闹钟响起，角色以打哈欠、揉眼睛等动画回应，并呈现当天时间与天气信息。',
        image: `${BASE}/scenario-1.jpg`,
        imageAlt: '清晨卧室床头柜上的木木，屏幕显示日出图标与时间，柔和晨光洒落在桌面',
      },
      {
        num: '02',
        time: 'LEISURE',
        title: '发现本土文化',
        body: '当用户询问花朝戏等文化话题时，角色可以切换为对应的文化形象，结合语音与屏幕动画呈现内容。',
        image: `${BASE}/scenario-2.jpg`,
        imageAlt: '书桌上的木木显示花朝戏文化形象，旁侧摆放中式画作与线装书籍',
      },
      {
        num: '03',
        time: 'BEFORE GOING OUT',
        title: '信息提醒',
        body: '通过时间、天气与出行提醒，帮助用户在离开前快速了解日常信息，并探索智能家居联动体验。',
        image: `${BASE}/scenario-3.jpg`,
        imageAlt: '出门前的木木显示晴日天气与光照图标，作为生活场景中的桌面信息提示',
      },
      {
        num: '04',
        time: 'EVENING',
        title: '温柔收尾',
        body: '用户进入晚安模式后，角色闭眼休息，灯光与屏幕亮度随设定逐步降低，营造安静的睡前氛围。',
        image: `${BASE}/scenario-4.jpg`,
        imageAlt: '夜晚床头柜上的木木进入休眠状态，房间由台灯与壁灯提供暖色环境光',
      },
    ],
  },

  designDetails: {
    index: '07',
    indexEN: 'DESIGN DETAILS',
    titleCN: '让数字角色，拥有真实的桌面载体。',
    bodyCN:
      '产品以简洁的方形机身为基础，将屏幕显示、扬声器与环绕式氛围灯带整合在紧凑的桌面形态中。',
    items: [
      {
        num: '01',
        title: '屏幕交互',
        body: '方形屏幕作为数字角色与信息内容的主要展示界面，让角色表情、时间与天气信息融入同一视觉区域。',
      },
      {
        num: '02',
        title: '环绕灯带',
        body: '灯带为产品增加柔和的环境光表现，并作为角色状态的辅助视觉反馈。',
        image: `${BASE}/placeholder-light-detail.svg`,
        imageAlt: '木木环绕灯带细节占位符',
      },
      {
        num: '03',
        title: '紧凑机身',
        body: '简洁的几何外观与桌面使用场景相适配，让产品能够自然融入工作、学习与居家空间。',
        image: `${BASE}/placeholder-product.svg`,
        imageAlt: '木木产品紧凑机身展示占位符',
      },
    ],
    structureImage: `${BASE}/structure.jpg`,
    structureImageAlt: '木木产品结构与三视图',
  },

  techNotes: {
    index: '08',
    indexEN: 'TECHNICAL NOTES',
    titleCN: '从概念设计，到可靠体验。',
    bodyCN:
      '木木的设计仍需在技术实现、硬件成本与文化表达等方面持续验证。产品规划不仅关注功能与体验，也关注实际使用中的可靠性与合规性。',
    notes: [
      {
        title: 'AI 性能与交互稳定性',
        body: '轻量化模型在边缘设备上的运行效果、语音交互质量与灯光动画同步情况，仍需要通过测试与优化进行验证。',
      },
      {
        title: '硬件成本与产品实现',
        body: '屏幕、灯带及其他硬件的成本需要通过供应链评估与样机测试进一步确认。',
      },
      {
        title: '文化表达准确性',
        body: '猫头狮、河源木雕与花朝戏的视觉表达需要持续核对，避免文化元素在设计转化中出现偏差。',
      },
      {
        title: '模型许可与合规',
        body: '实际采用的开源模型需要逐一核查许可证及商用条件，并对部署、二次开发与使用方式进行合规审查。',
      },
    ],
  },

  closing: {
    tag: 'MUMU · A CULTURAL AI COMPANION',
    titleCN: '让科技有温度，让文化有新形态。',
    bodyCN:
      '木木尝试以 AI 为连接，以数字 IP 为表达，让河源本土文化走进当代桌面生活。让每一次互动，不止于获取信息，也成为一次与文化、情绪和日常生活的温柔连接。',
    image: `${BASE}/placeholder-hero.svg`,
    imageAlt: '木木产品主视觉占位符',
  },
};
