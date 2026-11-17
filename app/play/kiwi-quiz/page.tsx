import type { Metadata } from 'next';
import { KiwiQuizClient } from './KiwiQuizClient';

export const metadata: Metadata = {
  title: 'Kiwi度チェック｜3分でめぐるニュージーランド英語の旅',
  description:
    'jandals、sweet as、chilly bin。ニュージーランドの英語を3択クイズで7問。北から南へ旅をしながら、あなたのKiwi度をチェックできます。',
  alternates: { canonical: '/play/kiwi-quiz' }
};

export default function KiwiQuizPage() {
  return <KiwiQuizClient />;
}
