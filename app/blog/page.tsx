import type { Metadata } from 'next';
import { BlogClient } from './BlogClient';

export const metadata: Metadata = {
  title: 'お知らせ・NZコラム',
  description:
    '教室のお知らせと、NZの文化や英語にまつわるコラムをお届けします。',
  alternates: { canonical: '/blog' }
};

export default function BlogPage() {
  return <BlogClient />;
}
