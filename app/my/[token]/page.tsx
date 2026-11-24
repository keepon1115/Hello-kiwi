import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getLatestNzCard,
  getLatestVoice,
  getPastNzCards,
  getPastVoices,
  getStudentByToken
} from '@/lib/members';
import { MyPageClient } from './MyPageClient';

export const metadata: Metadata = {
  title: 'マイページ',
  robots: { index: false, follow: false }
};

export default async function MyPage(props: { params: Promise<{ token: string }> }) {
  const params = await props.params;
  const student = getStudentByToken(params.token);
  if (!student) notFound();

  return (
    <MyPageClient
      student={student}
      latestVoice={getLatestVoice()}
      pastVoices={getPastVoices()}
      latestNzCard={getLatestNzCard()}
      pastNzCards={getPastNzCards()}
    />
  );
}
