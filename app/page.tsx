import type { Metadata } from 'next';
import { HomeClient } from './HomeClient';
import { getNotePosts } from '@/lib/note';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Hello Kiwi 英会話 ｜ 近鉄八尾・オンライン',
  description:
    'ニュージーランド育ちのバイリンガル講師による、1対1の英会話レッスン。小学生から大人まで、八尾市の教室またはオンラインで受講できます。',
  alternates: { canonical: '/' }
};

export default async function HomePage() {
  const posts = await getNotePosts(3);
  return <HomeClient posts={posts} />;
}
