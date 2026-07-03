export const SITE = {
  name: 'Hello Kiwi',
  fullName: 'Hello Kiwi 英会話',
  tagline: '近鉄八尾・オンライン',
  mission: '一人ひとりのペースで、伝わる楽しさを育てます。',
  url: 'https://www.hellokiwieikaiwa.com',
  description:
    '近鉄八尾・オンラインで受講できる、バイリンガル講師による1対1の英会話教室。小学生から大人まで、一人ひとりに合わせて学べます。',
  address: {
    postalCode: '581-0803',
    region: '大阪府',
    locality: '八尾市',
    street: '光町1-2 マイシン光町ビル4階',
    full: '大阪府八尾市光町1-2 マイシン光町ビル4階',
    access: '近鉄八尾から徒歩8分'
  }
} as const;

export const LINKS = {
  line: 'https://lin.ee/q499XJD',
  lineId: '@402yhkvg',
  instagram: 'https://www.instagram.com/hellokiwi.english/',
  instagramHandle: '@hellokiwi.english',
  keeponLabo: 'https://keeponlabo.com',
  booking: 'https://hellokiwi.youcanbook.me/',
  englishSteam: 'https://claft.keeponlearning.fun/english-steam'
} as const;

export const NAV: { href: string; label: string; en: string }[] = [
  { href: '/', label: 'ホーム', en: 'Home' },
  { href: '/about', label: 'Hello Kiwiについて', en: 'About' },
  { href: '/courses', label: 'コース・料金', en: 'Courses' },
  { href: '/trial', label: '体験レッスン', en: 'Trial' },
  { href: '/blog', label: 'お知らせ・ブログ', en: 'Blog' },
  { href: '/access', label: 'アクセス', en: 'Access' },
  { href: '/faq', label: 'よくある質問', en: 'FAQ' },
  { href: '/contact', label: 'お問い合わせ', en: 'Contact' }
];
