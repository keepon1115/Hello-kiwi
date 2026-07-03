import type { Metadata } from 'next';
import { FaqClient } from './FaqClient';

export const metadata: Metadata = {
  title: 'よくある質問',
  description:
    '英語が全く話せない方、幼児のお子様、友達や家族との受講、体験レッスンの持ち物など、Hello Kiwi英会話のよくある質問にお答えします。',
  alternates: { canonical: '/faq' }
};

export default function FaqPage() {
  return <FaqClient />;
}
