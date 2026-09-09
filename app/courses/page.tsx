import type { Metadata } from 'next';
import { CoursesClient } from './CoursesClient';

export const metadata: Metadata = {
  title: 'コース・料金｜Hello Kiwi英会話',
  description:
    'フォニックス、Oxford Discover、ベーシック、Travel英会話、TOEIC＋英会話、フリーの6コースと料金。1対1の個人レッスンなので、ご希望に合わせて内容を柔軟にアレンジできます。',
  alternates: { canonical: '/courses' }
};

export default function CoursesPage() {
  return <CoursesClient />;
}
