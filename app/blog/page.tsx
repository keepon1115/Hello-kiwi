import type { Metadata } from 'next';
import { BlogClient } from './BlogClient';
import { getNotePosts } from '@/lib/note';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'お知らせ・NZコラム',
  description:
    '教室のお知らせと、NZの文化や英語にまつわるコラムをお届けします。',
  alternates: { canonical: '/blog' }
};

export default async function BlogPage() {
  const posts = await getNotePosts();
  return <BlogClient posts={posts} />;
}
