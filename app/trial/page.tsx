import type { Metadata } from 'next';
import { TrialClient } from './TrialClient';

export const metadata: Metadata = {
  title: '無料体験レッスン｜オンライン・教室どちらもOK',
  description:
    '体験レッスンは約50分。オンラインはGoogle Meetを使用し、URLをクリックするだけで参加できます。教室での対面レッスンも選べます。',
  alternates: { canonical: '/trial' }
};

export default function TrialPage() {
  return <TrialClient />;
}
