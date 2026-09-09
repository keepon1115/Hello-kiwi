export type Plan = {
  course: string;
  format: string;
  regular: string;
  student: string;
  note: string;
  hasStudentPrice: boolean;
};

export const PLANS: Plan[] = [
  {
    course: '自由プラン（1回）',
    format: '50分',
    regular: '4,400円',
    student: '2,750円',
    note: 'お好きなペースで都度予約',
    hasStudentPrice: true
  },
  {
    course: '自由プラン（4回チケット）',
    format: '50分 × 4回',
    regular: '15,400円（1回あたり 3,850円）',
    student: 'ー',
    note: '隔週や月1など無理なく続けたい方に',
    hasStudentPrice: false
  },
  {
    course: '毎週プラン（4回チケット）',
    format: '50分 × 4回',
    regular: '13,200円（1回あたり 3,300円）',
    student: 'ー',
    note: '購入日から31日以内有効（定期受講でお得）',
    hasStudentPrice: false
  }
];

export const PRICING_NOTES: string[] = [
  '入会金：3,300円 (無料キャンペーン中)',
  '教材費：なし',
  '表示価格はすべて税込です',
  'オンライン・対面どちらでも料金は変わりません',
  '特別価格の対象：キープオンラボ、またはエジソンアカデミー本校の受講生'
];
