import type { Metadata } from 'next';
import { EnClient } from './EnClient';

export const metadata: Metadata = {
  title: 'Hello Kiwi English School｜Yao & Online',
  description:
    'English conversation taught by a bilingual Japanese teacher who grew up in New Zealand from zero English. Beginner-friendly, fully 1-on-1. In Yao/Kashiwara and online across Japan.',
  alternates: { canonical: '/en' }
};

export default function EnPage() {
  return <EnClient />;
}
