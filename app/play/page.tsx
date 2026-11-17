import type { Metadata } from 'next';
import { PlayClient } from './PlayClient';

export const metadata: Metadata = {
  title: 'ゲームであそぶ｜英語×ニュージーランド',
  description:
    'ニュージーランドの英語クイズ「Kiwi度チェック」と、英語の命令でキウイを動かすパズル「Code the Kiwi」。登録なしで、ブラウザですぐ遊べます。',
  alternates: { canonical: '/play' }
};

export default function PlayPage() {
  return <PlayClient />;
}
