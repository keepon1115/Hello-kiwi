import type { Voice, Tone } from '@/lib/members';
import { toneText } from '@/lib/members';
import { Accordion } from '@/components/Accordion';
import { AudioSlot } from '@/components/AudioSlot';

function formatMD(date: string) {
  const [, m, d] = date.split('-');
  return `${Number(m)}/${Number(d)}`;
}

export function VoiceSection({ latest, past, tone }: { latest?: Voice; past: Voice[]; tone: Tone }) {
  if (!latest) return null;

  const items = past.map((v) => ({
    q: `${v.title}（${formatMD(v.date)}）`,
    a: (
      <div className="voice-past">
        <p className="voice-meaning">{v.meaning}</p>
        <AudioSlot src={v.audioSrc} label={`voice ${v.id}`} />
        {v.script && <p className="voice-script">{v.script}</p>}
      </div>
    )
  }));

  return (
    <div className="voice-section">
      <div className="voice-latest">
        <p className="voice-date">{formatMD(latest.date)}</p>
        <h3>{latest.title}</h3>
        <p className="voice-meaning">{latest.meaning}</p>
        <AudioSlot src={latest.audioSrc} label={`voice ${latest.id}`} />
        {latest.script && <p className="voice-script">{latest.script}</p>}
      </div>

      {items.length > 0 && (
        <div className="voice-history">
          <p className="voice-history-label">{toneText(tone, 'まえの こえポスト', '過去の投稿')}</p>
          <Accordion items={items} />
        </div>
      )}

      <style jsx>{`
        .voice-section {
          display: grid;
          gap: 24px;
        }
        .voice-latest {
          background: #fff;
          border-radius: 26px;
          padding: clamp(20px, 5cqi, 30px);
          box-shadow: var(--shadow-soft);
          border: 1px solid rgb(var(--cocoa-rgb) / 0.06);
        }
        .voice-date {
          font-family: var(--font-pop);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--leaf-green);
          margin: 0 0 4px;
        }
        .voice-latest h3 {
          font-size: 1.3rem;
          margin: 0 0 10px;
        }
        .voice-meaning {
          color: var(--cocoa-soft);
          margin: 0 0 14px;
        }
        .voice-script {
          margin: 12px 0 0;
          font-style: italic;
          color: var(--cocoa-faint);
          font-size: 0.9rem;
        }
        .voice-history-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--cocoa-soft);
          margin: 0 0 10px;
        }
        .voice-past .voice-meaning {
          margin-bottom: 12px;
        }
      `}</style>
    </div>
  );
}
