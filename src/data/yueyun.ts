/**
 * 粤韵芳华 (Yueyun) — 文案与素材配置
 * ----------------------------------------------------------------
 * 项目专属的数据源。所有可读文字、栏目顺序与图片路径都集中
 * 在这里，方便后续用真实素材直接覆盖。
 *
 * 由于项目尚未上传真实产品图，所有图片路径都指向 /public
 * 下的 SVG 占位符。占位符会随真实图片到位而被同文件名覆盖，
 * 不需要再改组件代码。
 *
 * 角色名顺序严格按粤剧行当：
 *   01 武生 / 02 文武生 / 03 小生 / 04 丑生
 *   05 正印花旦 / 06 二帮花旦
 */

export interface YueyunRole {
  /** 内部 id，对应 svg 文件名 slug */
  id: string;
  /** 编号 01-06 */
  num: string;
  /** 中文名 */
  nameCN: string;
  /** 罗马/英文名 */
  nameEN: string;
  /** 单角色占位图（或最终产品图） */
  image: string;
  /** 单角色说明 */
  intro: string;
}

export interface YueyunReference {
  id: string;
  num: string;
  nameCN: string;
  nameEN: string;
  image: string;
  imageAlt: string;
}

export interface YueyunSeriesCard {
  num: string;
  image: string;
  imageAlt: string;
  titleCN: string;
  titleEN: string;
  bodyCN: string;
}

export interface YueyunDesignPhase {
  num: string;
  cnTitle: string;
  enTitle: string;
  note: string;
  /** 阶段主图 */
  image: string;
  /** 阶段副图（可与主图共用或留空使用统一占位） */
  imageAlt?: string;
}

export interface YueyunSeriesCard {
  image: string;
  label: string;
}

export const yueyun = {
  /** 项目名 / 英文辅助名 */
  titleCN: '粤韵芳华',
  titleEN: 'CANTONESE OPERA COLLECTION',

  /** Hero 文案 */
  heroSubtitle: '让粤剧走进日常',
  heroBody:
    '以粤剧经典行当为设计基础，将传统戏曲角色转化为具有收藏价值的盲盒手办。通过角色造型与系列化设计，让粤剧文化以更轻松、更具亲和力的方式融入当代生活。',
  heroKeywords: ['粤剧文化', '角色收藏', '系列化设计'],

  /** Hero 主图 */
  heroImage: '/images/works/yueyun/hero-main.png',
  heroImageAlt: '粤韵芳华六款角色整体主视觉',

  /** SECTION 02 · CULTURE */
  culture: {
    index: '01',
    indexEN: 'CULTURE',
    titleCN: '不止于戏服，更是角色文化的延续',
    subtitleCN: '从粤剧行当中，寻找设计的起点',
    bodyCN:
      '粤剧是具有鲜明地域特色的传统戏曲艺术，其角色行当、服饰造型与舞台表演共同构成了独特的视觉语言。\n本项目选取武生、文武生、小生、丑生、正印花旦、二帮花旦六种角色，将传统戏曲中的人物身份与造型特征融入盲盒设计，让文化不只停留在舞台之上，也成为可以被欣赏与收藏的日常产品。',
    /** 六款角色的传统造型原型参考图（与 Collection 区一一对应） */
    references: [
      {
        id: 'wusheng',
        num: '01',
        nameCN: '武生',
        nameEN: 'WUSHENG',
        image: '/images/works/yueyun/role-01-wusheng.jpg',
        imageAlt: '武生传统造型参考',
      },
      {
        id: 'wenwusheng',
        num: '02',
        nameCN: '文武生',
        nameEN: 'WENWUSHENG',
        image: '/images/works/yueyun/role-02-wenwusheng.jpg',
        imageAlt: '文武生传统造型参考',
      },
      {
        id: 'xiaosheng',
        num: '03',
        nameCN: '小生',
        nameEN: 'XIAOSHENG',
        image: '/images/works/yueyun/role-03-xiaosheng.jpg',
        imageAlt: '小生传统造型参考',
      },
      {
        id: 'chousheng',
        num: '04',
        nameCN: '丑生',
        nameEN: 'CHOUSHENG',
        image: '/images/works/yueyun/role-04-chousheng.jpg',
        imageAlt: '丑生传统造型参考',
      },
      {
        id: 'zhengyin',
        num: '05',
        nameCN: '正印花旦',
        nameEN: 'ZHENGYIN HUADAN',
        image: '/images/works/yueyun/role-05-huadan.jpg',
        imageAlt: '正印花旦传统造型参考',
      },
      {
        id: 'erbang',
        num: '06',
        nameCN: '二帮花旦',
        nameEN: 'ERBANG HUADAN',
        image: '/images/works/yueyun/role-06-erbanghuadan.jpg',
        imageAlt: '二帮花旦传统造型参考',
      },
    ] as YueyunReference[],
  },

  /** SECTION 03 · DESIGN — 三阶段设计解析 */
  design: {
    index: '02',
    indexEN: 'DESIGN',
    titleCN: '让传统角色，拥有当代形态',
    subtitleCN: '服饰、动作与造型的细节还原',
    bodyCN:
      '设计以粤剧真实角色为原型，从人物服饰、动作姿态与整体造型入手，将传统戏曲的角色特征转化为适合盲盒手办呈现的立体形象。\n在保留角色辨识度的同时，通过统一的系列设计语言，让六款人物既各具特色，又形成完整的产品系列。',
    phases: [
      {
        num: '01',
        cnTitle: '角色原型',
        enTitle: 'CHARACTER REFERENCE',
        note: '传统服饰与人物特征。',
        image: '/images/works/yueyun/phase-01-reference.jpg',
      },
      {
        num: '02',
        cnTitle: '造型转化',
        enTitle: 'FORM DEVELOPMENT',
        note: '人物动作与立体形态。',
        image: '/images/works/yueyun/phase-02-form.jpg',
      },
      {
        num: '03',
        cnTitle: '产品定型',
        enTitle: 'FINAL DESIGN',
        note: '三视图与系列统一。',
        image: '/images/works/yueyun/phase-03-final.png',
      },
    ] as YueyunDesignPhase[],
  },

  /** SECTION 04 · COLLECTION — 六款角色 */
  collection: {
    index: '03',
    indexEN: 'COLLECTION',
    titleCN: '六种角色，六种风采',
    subtitleCN: '以真实粤剧行当为原型，构建系列化人物收藏',
    bodyCN:
      '从武生的武戏角色，到花旦的女性角色，六款手办以不同的角色身份与造型特征，共同构成「粤韵芳华」的角色系列。',
    /** 6 款角色，顺序必须与名称严格对应 */
    roles: [
      {
        id: 'wusheng',
        num: '01',
        nameCN: '武生',
        nameEN: 'WUSHENG',
        image: '/images/works/yueyun/role-01-wusheng.jpg',
        intro: '以武戏角色为设计原型，重点呈现人物的动作张力与角色气势。',
      },
      {
        id: 'wenwusheng',
        num: '02',
        nameCN: '文武生',
        nameEN: 'WENWUSHENG',
        image: '/images/works/yueyun/role-02-wenwusheng.jpg',
        intro: '兼具文戏与武戏特征的角色，以人物姿态与整体造型体现其角色特点。',
      },
      {
        id: 'xiaosheng',
        num: '03',
        nameCN: '小生',
        nameEN: 'XIAOSHENG',
        image: '/images/works/yueyun/role-03-xiaosheng.jpg',
        intro: '以年轻男性角色为原型，通过服饰与人物形态呈现角色气质。',
      },
      {
        id: 'chousheng',
        num: '04',
        nameCN: '丑生',
        nameEN: 'CHOUSHENG',
        image: '/images/works/yueyun/role-04-chousheng.jpg',
        intro: '以丑行角色为原型，突出人物造型的辨识度与个性表达。',
      },
      {
        id: 'zhengyin',
        num: '05',
        nameCN: '正印花旦',
        nameEN: 'ZHENGYIN HUADAN',
        image: '/images/works/yueyun/role-05-huadan.jpg',
        intro: '以主要女性角色为原型，重点呈现服饰造型与人物仪态。',
      },
      {
        id: 'erbang',
        num: '06',
        nameCN: '二帮花旦',
        nameEN: 'ERBANG HUADAN',
        image: '/images/works/yueyun/role-06-erbanghuadan.jpg',
        intro: '以女性配角行当为原型，通过角色造型体现其与正印花旦的差异。',
      },
    ] as YueyunRole[],
  },

  /** SECTION 05 · PRODUCT SERIES */
  series: {
    index: '04',
    indexEN: 'PRODUCT SERIES',
    titleCN: '从角色设计，到系列收藏',
    subtitleCN: '统一的产品语言，丰富的角色表达',
    bodyCN:
      '六款角色在保留各自造型特征的基础上，形成统一的系列视觉。通过三视图呈现人物的立体形态，并结合盲盒卡片与产品效果图，构建从角色形象到收藏产品的完整展示体系。',
    keywords: ['角色辨识度', '系列统一性', '收藏体验'],
    /** 三张统一 16:9 占位图，左右交叉排版 */
    cards: [
      {
        num: '01',
        image: '/images/works/yueyun/series-01-overview.jpg',
        imageAlt: '六款角色整体效果图',
        titleCN: '整体系列',
        titleEN: 'COLLECTION OVERVIEW',
        bodyCN:
          '六款角色在统一系列语言下呈现各自造型特征，从角色识别到整体系列感，构建完整的收藏视觉。',
      },
      {
        num: '02',
        image: '/images/works/yueyun/series-02-threeview.jpg',
        imageAlt: '三视图与立体形态',
        titleCN: '三视图与立体形态',
        titleEN: 'TRIPLE VIEW & FORM',
        bodyCN:
          '通过三视图呈现人物的立体形态，确认比例、动作与服饰结构在盲盒尺寸下的可读性与完整度。',
      },
      {
        num: '03',
        image: '/images/works/yueyun/series-03-blindbox.jpg',
        imageAlt: '盲盒卡片与产品形态',
        titleCN: '盲盒卡片与产品形态',
        titleEN: 'BLIND-BOX & PACKAGING',
        bodyCN:
          '从角色造型到盲盒卡片，统一角色与包装之间的视觉语言，让收藏过程本身也成为系列表达的一部分。',
      },
    ] as YueyunSeriesCard[],
  },

  /** SECTION 06 · CLOSING */
  closing: {
    titleCN: '让传统文化，被看见、被喜爱、被收藏',
    titleEN: 'TRADITION, REIMAGINED FOR EVERYDAY LIFE.',
    bodyCN:
      '「粤韵芳华」尝试以盲盒这一当代收藏形式，重新呈现粤剧角色的文化魅力。让传统戏曲不只存在于舞台与历史记忆中，也能够通过人物收藏、视觉欣赏与日常接触，走近更多年轻用户。\n让文化传承拥有更亲近的表达方式，也让产品设计成为连接传统与当代生活的桥梁。',
    image: '/images/works/yueyun/placeholder-overview.svg',
    imageAlt: '六款角色整体系列产品图',
  },

  /** 全局元数据 */
  meta: {
    year: '2025',
    role: 'Product / IP Designer',
    category: 'CULTURAL CREATIVE / IP',
  },
};
