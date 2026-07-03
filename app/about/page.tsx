import type { Metadata } from 'next';
import { AboutClient } from './AboutClient';

export const metadata: Metadata = {
  title: 'Hello Kiwiについて｜英語ゼロからNZで育った講師のストーリー',
  description:
    '6歳でニュージーランドに渡り、英語ゼロからスタートした講師の実話。「伝え合いで学ぶ」というレッスンの原点を、3章のストーリーでお届けします。だから、初心者のあなたの不安が分かります。',
  alternates: { canonical: '/about' }
};

export default function AboutPage() {
  return <AboutClient />;
}
