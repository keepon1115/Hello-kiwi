import type { Metadata } from 'next';
import { Zen_Maru_Gothic, Noto_Sans_JP, Baloo_2 } from 'next/font/google';
import { SITE, LINKS } from '@/lib/site';
import { SiteShell } from '@/components/SiteShell';
import './globals.css';

const zenMaru = Zen_Maru_Gothic({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-round',
  display: 'swap'
});

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap'
});

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-pop',
  display: 'swap'
});

const siteTitle = 'Hello Kiwi 英会話 ｜ 近鉄八尾・オンライン';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: siteTitle,
    template: `%s ｜ ${SITE.fullName}`
  },
  description: SITE.description,
  keywords: [
    '八尾市 英会話',
    '近鉄八尾 英会話',
    'オンライン 英会話 初心者',
    '小学生 英会話',
    'ニュージーランド 英語',
    'バイリンガル講師'
  ],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: SITE.fullName,
    title: siteTitle,
    description: SITE.description,
    images: ['/assets/images/hero/og.png']
  },
  twitter: {
    card: 'summary_large_image'
  },
  alternates: { canonical: '/' }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LanguageSchool',
  name: SITE.fullName,
  description: SITE.description,
  url: SITE.url,
  telephone: '',
  image: `${SITE.url}/assets/images/hero/og.png`,
  address: {
    '@type': 'PostalAddress',
    postalCode: SITE.address.postalCode,
    addressRegion: SITE.address.region,
    addressLocality: SITE.address.locality,
    streetAddress: SITE.address.street,
    addressCountry: 'JP'
  },
  areaServed: ['八尾市', 'オンライン'],
  knowsLanguage: ['ja', 'en'],
  sameAs: [LINKS.instagram, LINKS.keeponLabo]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${zenMaru.variable} ${notoSans.variable} ${baloo.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
