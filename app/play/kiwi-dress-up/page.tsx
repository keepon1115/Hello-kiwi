import type { Metadata } from 'next';
import { KiwiDressUpClient } from './KiwiDressUpClient';

export const metadata: Metadata = {
  title: 'Kiwi Dress-Up｜キウイの着せかえとアイコンづくり',
  description:
    'キウイに beanie や jandals を着せて、つまんで引っ張って、できあがりをアイコン画像として保存できる遊び場。英語の名前のまま着せかえを楽しめます。',
  alternates: { canonical: '/play/kiwi-dress-up' }
};

export default function KiwiDressUpPage() {
  return <KiwiDressUpClient />;
}
