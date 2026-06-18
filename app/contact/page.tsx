import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'お問い合わせ｜LINE・体験レッスン',
  description:
    'Hello Kiwi英会話へのお問い合わせ。LINEでの相談、または無料体験レッスンの予約からお気軽にどうぞ。',
  alternates: { canonical: '/contact' }
};

export default function ContactPage() {
  return <ContactClient />;
}
