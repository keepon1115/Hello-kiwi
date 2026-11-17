import type { Metadata } from 'next';
import { CodeTheKiwiClient } from './CodeTheKiwiClient';

export const metadata: Metadata = {
  title: 'Code the Kiwi｜英語の命令でキウイを動かすパズル',
  description:
    'go forward、turn left、repeat。英語のブロックをならべて、夜の森のキウイをごはんまで案内するプログラミングパズル。日本語に訳さず、英語のまま考える体験ができます。',
  alternates: { canonical: '/play/code-the-kiwi' }
};

export default function CodeTheKiwiPage() {
  return <CodeTheKiwiClient />;
}
