/**
 * Awards — drives Awards page editorial layout.
 */

export interface Award {
  year: string;
  title: string;
  level: string;
  /** Optional numeric rank */
  rank?: string;
}

export const awards: Award[] = [
  {
    year: '2026.05',
    title: '第十五届“挑战杯”广东大学生创业计划竞赛',
    level: '省级铜奖',
  },
  {
    year: '2025.12',
    title: '2025全球视野国际摄影大赛',
    level: '铜奖',
  },
  {
    year: '2025.11',
    title: '第十五届全国大学生纺织贸易与商业策划创新能力大赛',
    level: '全国三等奖',
  },
  {
    year: '2025.07',
    title: '第十八届“挑战杯”广东大学生课外学术科技作品竞赛',
    level: '省级二等奖',
  },
  {
    year: '2025.06',
    title: '第十五届全国大学生电子商务“创新、创意及创业”挑战赛',
    level: '一等奖',
  },
];