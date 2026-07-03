export type Course = {
  slug: string;
  name: string;
  enName: string;
  target: string;
  ageBadge: string;
  lead: string;
  points: string[];
  topics: string[];
  audience: 'kids' | 'teen' | 'adult';
};

export const COURSES: Course[] = [
  {
    slug: 'kids-abc',
    name: 'キッズABC',
    enName: 'Kids ABC',
    target: '小学生',
    ageBadge: '小学生',
    lead:
      'はじめての英語。音と形に親しみながら、英語を「楽しいもの」として好きになってもらうためのコースです。',
    points: [],
    topics: [
      '英語の基本フレーズ',
      '身近な日常単語',
      'かんたんなやり取りの練習',
      '発音とアルファベット'
    ],
    audience: 'kids'
  },
  {
    slug: 'kids-eikaiwa',
    name: 'キッズ英会話',
    enName: 'Kids Conversation',
    target: '小学生〜中学生',
    ageBadge: '小学生〜中学生',
    lead:
      '「話してみたい！」を伸ばすコース。やりとりの楽しさを通して、自分の言葉で伝える力を育てます。',
    points: [],
    topics: [
      '名前・出身・好きなこと',
      '学校や趣味、家族のこと',
      'becauseを使った理由の説明',
      '旅行やカフェでのやり取り'
    ],
    audience: 'teen'
  },
  {
    slug: 'adult',
    name: '大人の英会話',
    enName: 'Adult Conversation',
    target: '日常・トラベル',
    ageBadge: '大人',
    lead:
      '「習ったけど話せない」を、もう一度。日常会話・旅行英語を、あなたのライフスタイルに合わせてマイペースに。',
    points: [],
    topics: [
      '名前・出身・好きなこと',
      '学校や趣味、家族のこと',
      'becauseを使った理由の説明',
      '旅行やカフェでのやり取り'
    ],
    audience: 'adult'
  }
];

export const COURSE_COMMON: string[] = [
  '1対1の個人レッスン',
  '教室（八尾）でも、オンラインでも受講可能',
  'スクール生の特別価格あり',
  'ニュージーランドの文化・習慣に触れられる'
];
