export type ColorGroup = 'green' | 'blue' | 'amber';

export type Course = {
  slug: string;
  name: string;
  enName: string;
  target: string;
  ageBadge: string;
  lead: string;
  points: string[];
  topics: string[];
  colorGroup: ColorGroup;
};

export const COURSES: Course[] = [
  {
    slug: 'phonics',
    name: 'フォニックスコース',
    enName: 'Phonics Course｜全48回',
    target: '小学生',
    ageBadge: '小学生',
    lead:
      '英語の「音」と「文字」のつながりを学び、自分で英単語を読める力を少しずつ身につけるコースです。はじめての英会話に',
    points: [],
    topics: ['英語の音と文字', 'アルファベット', '単語の読み方', '発音練習'],
    colorGroup: 'green'
  },
  {
    slug: 'oxford-discover',
    name: 'Oxford Discover コース',
    enName: 'Oxford Discover Course｜全38回',
    target: '小学生〜中学生',
    ageBadge: '小学生〜中学生',
    lead:
      'Oxford教材を使い、英語を学びながら「考える・話す・伝える」力をバランスよく伸ばすコースです。',
    points: [],
    topics: ['読む・聞く', '語彙と文法', '自分の意見を話す', 'Critical Thinking'],
    colorGroup: 'green'
  },
  {
    slug: 'basic',
    name: 'ベーシックコース',
    enName: 'Basic English Course｜全24回',
    target: '中学生〜大人',
    ageBadge: '中学生〜大人',
    lead:
      '英語の基礎を一から学び直し、日常で使える簡単な英語を自分で話せるようになることを目指します。',
    points: [],
    topics: ['基本文法', '日常英単語', '質問と答え方', '簡単な英会話'],
    colorGroup: 'blue'
  },
  {
    slug: 'travel',
    name: 'Travel英会話コース',
    enName: 'Travel English Course｜全24回',
    target: '高校生〜大人',
    ageBadge: '高校生〜大人',
    lead:
      '海外旅行で実際に使う英語を中心に、空港・ホテル・レストランなどで困らない会話力を身につけます。',
    points: [],
    topics: ['空港での英会話', 'ホテルでのやり取り', 'レストランで注文', '道の聞き方'],
    colorGroup: 'blue'
  },
  {
    slug: 'toeic',
    name: 'TOEIC＋英会話コース',
    enName: 'TOEIC + Conversation Course｜全24回',
    target: '高校生〜大人',
    ageBadge: '高校生〜大人',
    lead:
      'TOEIC対策だけでなく、学んだ英語を実際の会話でも使えるようにする実践型コースです。',
    points: [],
    topics: ['TOEIC Listening', 'TOEIC Reading', '頻出語彙・文法', '実践英会話'],
    colorGroup: 'blue'
  },
  {
    slug: 'free',
    name: 'フリーコース',
    enName: 'Free Course',
    target: '年齢・レベル問わず',
    ageBadge: '年齢・レベル問わず',
    lead:
      '決まったカリキュラムではなく、目標や興味に合わせてレッスン内容を自由に組み合わせられるコースです。',
    points: [],
    topics: ['英会話', '学校の英語', '資格対策', '希望に合わせたレッスン'],
    colorGroup: 'amber'
  }
];

export const COURSE_COMMON: string[] = [
  '1対1の個人レッスン',
  '教室（八尾）でも、オンラインでも受講可能',
  'スクール生の特別価格あり',
  'ニュージーランドの文化・習慣に触れられる'
];

export function chipClass(group: ColorGroup): string {
  return group === 'green' ? 'chip' : `chip chip-${group}`;
}

export function topicsClass(group: ColorGroup): string {
  return group === 'green' ? 'topics' : `topics topics-${group}`;
}

export function courseEnClass(group: ColorGroup): string {
  return group === 'green' ? 'course-en' : `course-en course-en-${group}`;
}
