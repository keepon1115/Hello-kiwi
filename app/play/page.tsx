import type { Metadata } from 'next';
import { PlayClient } from './PlayClient';

export const metadata: Metadata = {
  title: 'ゲームであそぶ｜英語×ニュージーランド',
  description:
    'NZ英語クイズ「Kiwi度チェック」、英語の命令でキウイを動かす「Code the Kiwi」、カフェで注文をとる「Kiwi Café」、着せかえの「Kiwi Dress-Up」。登録なしで、ブラウザですぐ遊べます。',
  alternates: { canonical: '/play' }
};

export default function PlayPage() {
  return <PlayClient />;
}
