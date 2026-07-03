import type { Metadata } from 'next';
import { MyGuideClient } from './MyGuideClient';

export const metadata: Metadata = {
  title: 'マイページ',
  robots: { index: false, follow: false }
};

export default function MyGuidePage() {
  return <MyGuideClient />;
}
