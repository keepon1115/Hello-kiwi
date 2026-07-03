'use client';
import { useReveal } from '@/lib/useReveal';
import {
  getLatestLesson,
  getLessonHistory,
  getPassportStamps,
  getTicketStatus,
  studentPageHeading,
  toneText,
  type NzCard,
  type Student,
  type Voice
} from '@/lib/members';
import { Mascot } from '@/components/Mascot';
import { Reveal } from '@/components/Reveal';
import { Accordion } from '@/components/Accordion';
import { SectionHeading } from '@/components/SectionHeading';
import { TicketSection } from '@/components/members/TicketSection';
import { PassportSection } from '@/components/members/PassportSection';
import { VoiceSection } from '@/components/members/VoiceSection';
import { NzCardSection } from '@/components/members/NzCardSection';
import { LessonHistorySection } from '@/components/members/LessonHistorySection';
import { ReservationButton } from '@/components/members/ReservationButton';

const ADD_TO_HOME_ITEMS = [
  {
    q: 'iPhone・iPad（Safari）でついかする',
    a: '画面したの「共有」ボタン（□に↑）をタップ →「ホーム画面に追加」をタップ → 右上の「追加」をタップすると完了です。'
  },
  {
    q: 'Android（Chrome）でついかする',
    a: '右上の「⋮」（メニュー）をタップ →「アプリをインストール」または「ホーム画面に追加」をタップ → 案内にしたがって追加すると完了です。'
  }
];

export function MyPageClient({
  student,
  latestVoice,
  pastVoices,
  latestNzCard,
  pastNzCards
}: {
  student: Student;
  latestVoice?: Voice;
  pastVoices: Voice[];
  latestNzCard?: NzCard;
  pastNzCards: NzCard[];
}) {
  useReveal();

  const tone = student.tone;
  const latestLesson = getLatestLesson(student);
  const lessons = getLessonHistory(student);
  const ticket = getTicketStatus(student);
  const passportStamps = getPassportStamps(student);
  const showReservationEmphasis = ticket ? ticket.isLow || ticket.isEmpty : false;

  return (
    <div data-tone={tone === 'adult' ? 'adult' : undefined}>
      <section className="my-hero">
        <div className="container reveal">
          <Mascot pose="wave" size={104} className="floaty" />
          <h1>{studentPageHeading(student)}</h1>
        </div>
      </section>

      <section className="section my-section">
        <div className="container">
          <Reveal as="article" className="teacher-card">
            <p className="eyebrow">{toneText(tone, 'せんせいから', 'せんせいより')}</p>
            <p className="teacher-message">{latestLesson?.message ?? ''}</p>
            {latestLesson?.tryThis && (
              <p className="teacher-try">
                <span className="teacher-try-label">
                  {toneText(tone, 'こんしゅうの チャレンジ', '今週のチャレンジ')}
                </span>
                {latestLesson.tryThis}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {student.quizletUrl && (
        <section className="section my-section my-section-tight">
          <div className="container">
            <Reveal>
              <a
                href={student.quizletUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg homework-btn"
              >
                {toneText(tone, 'しゅくだい（Quizlet）', '宿題（Quizlet）')}
              </a>
            </Reveal>
          </div>
        </section>
      )}

      {ticket && (
        <section className="section my-section my-section-tight">
          <div className="container">
            <TicketSection ticket={ticket} tone={tone} />
          </div>
        </section>
      )}

      <section className="section my-section my-section-tight">
        <div className="container">
          <Reveal>
            <ReservationButton tone={tone} emphasize={showReservationEmphasis} />
          </Reveal>
        </div>
      </section>

      <section className="section my-section">
        <div className="container">
          <SectionHeading eyebrow="Passport" title={toneText(tone, 'キウィパスポート', 'キウィパスポート')} />
          <Reveal>
            <PassportSection stamps={passportStamps} tone={tone} />
          </Reveal>
        </div>
      </section>

      {latestVoice && (
        <section className="section my-section">
          <div className="container">
            <SectionHeading eyebrow="Voice" title={toneText(tone, 'せんせいの こえポスト', 'せんせいの声ポスト')} />
            <Reveal>
              <VoiceSection latest={latestVoice} past={pastVoices} tone={tone} />
            </Reveal>
          </div>
        </section>
      )}

      {latestNzCard && (
        <section className="section my-section">
          <div className="container">
            <SectionHeading eyebrow="NZ Card" title={toneText(tone, 'NZたんけんカード', 'NZたんけんカード')} />
            <Reveal>
              <NzCardSection latest={latestNzCard} past={pastNzCards} tone={tone} />
            </Reveal>
          </div>
        </section>
      )}

      <section className="section my-section">
        <div className="container">
          <SectionHeading eyebrow="History" title={toneText(tone, 'これまでの きろく', 'これまでの受講記録')} />
          <Reveal>
            <LessonHistorySection lessons={lessons} tone={tone} />
          </Reveal>
        </div>
      </section>

      <section className="section my-section my-section-tight">
        <div className="container">
          <Reveal className="add-home">
            <p className="add-home-lead">
              {toneText(
                tone,
                'ホームがめんに ついか すると アプリみたいに つかえるよ',
                'ホーム画面に追加すると、アプリのように使えます'
              )}
            </p>
            <Accordion items={ADD_TO_HOME_ITEMS} />
          </Reveal>
        </div>
      </section>

      <style jsx>{`
        .my-hero {
          text-align: center;
          padding: clamp(36px, 7vw, 64px) 0 clamp(20px, 4vw, 32px);
          background: radial-gradient(80% 100% at 50% 0%, rgb(var(--yellow-rgb) / 0.3), transparent 60%);
        }
        .my-hero h1 {
          font-size: clamp(1.6rem, 6vw, 2.2rem);
          margin: 10px 0 0;
        }
        .my-section {
          padding-top: 0;
          padding-bottom: clamp(28px, 5vw, 40px);
        }
        .my-section-tight {
          padding-bottom: 0;
          margin-bottom: clamp(20px, 4vw, 30px);
        }
        :global(.teacher-card) {
          background: #fff;
          border-radius: 26px;
          padding: clamp(20px, 5cqi, 30px);
          box-shadow: var(--shadow-soft);
          border: 1px solid rgb(var(--cocoa-rgb) / 0.06);
        }
        :global(.teacher-card) .eyebrow {
          margin-bottom: 8px;
        }
        .teacher-message {
          font-size: 1.05rem;
          color: var(--cocoa);
          margin: 0;
        }
        .teacher-try {
          margin: 14px 0 0;
          padding: 10px 14px;
          background: rgb(var(--orange-rgb) / 0.08);
          border-radius: 14px;
          color: var(--cocoa-soft);
          font-size: 0.9rem;
        }
        .teacher-try-label {
          display: block;
          font-weight: 700;
          color: var(--kiwi-orange);
          font-size: 0.8rem;
          margin-bottom: 2px;
        }
        :global(.homework-btn) {
          width: 100%;
        }
        :global(.add-home) {
          text-align: center;
        }
        .add-home-lead {
          font-weight: 700;
          color: var(--cocoa-soft);
          margin: 0 0 16px;
        }
      `}</style>
    </div>
  );
}
