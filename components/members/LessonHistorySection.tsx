import type { Lesson, Tone } from '@/lib/members';
import { toneText } from '@/lib/members';
import { SlideSlot } from '@/components/SlideSlot';

function formatDate(date: string) {
  const [y, m, d] = date.split('-');
  return `${y}/${Number(m)}/${Number(d)}`;
}

export function LessonHistorySection({ lessons, tone }: { lessons: Lesson[]; tone: Tone }) {
  const slideLabel = toneText(tone, 'この日の スライドを みる', 'この日のスライドを見る');

  return (
    <div className="lesson-history">
      {lessons.map((lesson, i) => (
        <div key={lesson.date + i} className="lesson-page">
          <p className="lesson-date">{formatDate(lesson.date)}</p>
          <p className="lesson-message">{lesson.message}</p>
          {lesson.tryThis && (
            <p className="lesson-try">
              <span className="lesson-try-label">{toneText(tone, 'こんしゅうの チャレンジ', '今週のチャレンジ')}</span>
              {lesson.tryThis}
            </p>
          )}
          {lesson.slideSrc && (
            <div className="lesson-slide">
              <SlideSlot src={lesson.slideSrc} label={slideLabel} />
            </div>
          )}
        </div>
      ))}

      <style jsx>{`
        .lesson-history {
          display: grid;
          gap: 16px;
        }
        .lesson-page {
          background: #fff;
          border-radius: 22px;
          padding: 20px 22px;
          box-shadow: var(--shadow-soft);
          border: 1px solid rgb(var(--cocoa-rgb) / 0.06);
          position: relative;
        }
        .lesson-page::before {
          content: '';
          position: absolute;
          left: 0;
          top: 14px;
          bottom: 14px;
          width: 4px;
          border-radius: 4px;
          background: rgb(var(--yellow-rgb));
        }
        .lesson-date {
          font-family: var(--font-pop);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--leaf-green);
          margin: 0 0 6px;
        }
        .lesson-message {
          color: var(--cocoa);
          margin: 0;
        }
        .lesson-try {
          margin: 12px 0 0;
          padding: 10px 14px;
          background: rgb(var(--orange-rgb) / 0.08);
          border-radius: 14px;
          color: var(--cocoa-soft);
          font-size: 0.9rem;
        }
        .lesson-try-label {
          display: block;
          font-weight: 700;
          color: var(--kiwi-orange);
          font-size: 0.8rem;
          margin-bottom: 2px;
        }
        .lesson-slide {
          margin-top: 14px;
        }
      `}</style>
    </div>
  );
}
