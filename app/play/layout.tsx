import type { Metadata } from 'next';

// 公開前のお試し期間：メニューにもサイトマップにも載せず、検索にも出さない。
// URLを知っている人だけが遊べる。正式公開するときは、このファイルを消し、
// lib/site.ts の NAV と app/sitemap.ts に /play を足す。
export const metadata: Metadata = {
  robots: { index: false, follow: false }
};

export default function PlayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
