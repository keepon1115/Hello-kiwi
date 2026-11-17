import type { Metadata } from 'next';
import { KiwiCafeClient } from './KiwiCafeClient';

export const metadata: Metadata = {
  title: 'Kiwi Café｜ニュージーランドのカフェで注文をとるゲーム',
  description:
    'flat white、mince pie、takeaway。ニュージーランドのカフェの店員になって、お客さんの英語の注文をトレイにのせるゲーム。全8問で、合いそうなコースも分かります。',
  alternates: { canonical: '/play/kiwi-cafe' }
};

export default function KiwiCafePage() {
  return <KiwiCafeClient />;
}
