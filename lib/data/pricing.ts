export type Plan = {
  course: string;
  format: string;
  regular: string;
  student: string;
};

export const PLANS: Plan[] = [
  {
    course: '1回',
    format: '50分',
    regular: '4,400円',
    student: '2,750円'
  },
  {
    course: '6回チケット',
    format: '50分',
    regular: '23,100円（1回3,850円）',
    student: '2,750円'
  },
  {
    course: '12回チケット',
    format: '50分',
    regular: '39,600円（1回3,300円）',
    student: '2,750円'
  }
];

export const PRICING_NOTES: string[] = [
  '入会金：3,300円（7月末まで無料キャンペーン中）',
  '教材費：なし',
  '表示価格はすべて税込です',
  'オンライン・対面どちらでも料金は変わりません',
  '特別価格の対象：キープオンラボ、またはエジソンアカデミー本校の受講生'
];
