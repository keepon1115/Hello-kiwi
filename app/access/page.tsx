import type { Metadata } from 'next';
import { AccessClient } from './AccessClient';

export const metadata: Metadata = {
  title: 'アクセス｜近鉄八尾から徒歩8分',
  description:
    '大阪府八尾市光町1-2 マイシン光町ビル4階。近鉄八尾から徒歩8分。オンラインでも全国から受講できます。',
  alternates: { canonical: '/access' }
};

export default function AccessPage() {
  return <AccessClient />;
}
