import type { Metadata } from 'next';
import { CoursesClient } from './CoursesClient';

export const metadata: Metadata = {
  title: 'コース・料金｜キッズABC・キッズ英会話・大人の英会話',
  description:
    'キッズABC、キッズ英会話、大人の英会話の3つの基本コースと料金。1対1の個人レッスンなので、ご希望に合わせて内容を柔軟にアレンジできます。',
  alternates: { canonical: '/courses' }
};

export default function CoursesPage() {
  return <CoursesClient />;
}
