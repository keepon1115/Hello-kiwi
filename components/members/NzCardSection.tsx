import type { NzCard, Tone } from '@/lib/members';
import { toneText } from '@/lib/members';
import { ImageSlot } from '@/components/ImageSlot';

function formatMD(date: string) {
  const [, m, d] = date.split('-');
  return `${Number(m)}/${Number(d)}`;
}

export function NzCardSection({ latest, past, tone }: { latest?: NzCard; past: NzCard[]; tone: Tone }) {
  if (!latest) return null;

  return (
    <div className="nz-section">
      <div className="nz-latest">
        {latest.imageSrc ? (
          <ImageSlot src={latest.imageSrc} label={latest.id} alt={latest.titleJa} ratio="4/3" className="nz-img" />
        ) : (
          <span className="nz-emoji" aria-hidden>
            {latest.emoji ?? '🥝'}
          </span>
        )}
        <p className="nz-date">{formatMD(latest.date)}</p>
        <h3>{latest.titleJa}</h3>
        <p className="nz-en">{latest.titleEn}</p>
        <p className="nz-body">{latest.body}</p>
      </div>

      {past.length > 0 && (
        <div className="nz-past">
          <p className="nz-past-label">{toneText(tone, 'まえの たんけんカード', '過去のカード')}</p>
          <div className="nz-past-scroll">
            {past.map((c) => (
              <div key={c.id} className="nz-mini">
                <span className="nz-mini-emoji" aria-hidden>
                  {c.emoji ?? '🥝'}
                </span>
                <p className="nz-mini-title">{c.titleJa}</p>
                <p className="nz-mini-date">{formatMD(c.date)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .nz-section {
          display: grid;
          gap: 20px;
        }
        .nz-latest {
          background: #fff;
          border-radius: 26px;
          padding: clamp(20px, 5cqi, 30px);
          box-shadow: var(--shadow-soft);
          border: 1px solid rgb(var(--cocoa-rgb) / 0.06);
          text-align: center;
        }
        .nz-emoji {
          display: block;
          font-size: 3rem;
          margin-bottom: 6px;
        }
        :global(.nz-img) {
          margin: 0 auto 10px;
          border-radius: 18px;
          max-width: 280px;
        }
        .nz-date {
          font-family: var(--font-pop);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--leaf-green);
          margin: 0 0 4px;
        }
        .nz-latest h3 {
          font-size: 1.2rem;
          margin: 0 0 2px;
        }
        .nz-en {
          color: var(--cocoa-faint);
          font-style: italic;
          font-size: 0.85rem;
          margin: 0 0 14px;
        }
        .nz-body {
          color: var(--cocoa-soft);
          margin: 0;
          text-align: left;
        }
        .nz-past-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--cocoa-soft);
          margin: 0 0 10px;
        }
        .nz-past-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 6px;
        }
        .nz-mini {
          flex: 0 0 auto;
          width: 110px;
          background: #fff;
          border-radius: 18px;
          padding: 14px 10px;
          text-align: center;
          box-shadow: var(--shadow-soft);
          border: 1px solid rgb(var(--cocoa-rgb) / 0.06);
        }
        .nz-mini-emoji {
          display: block;
          font-size: 1.6rem;
          margin-bottom: 6px;
        }
        .nz-mini-title {
          font-size: 0.78rem;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .nz-mini-date {
          font-family: var(--font-pop);
          font-size: 0.66rem;
          color: var(--cocoa-faint);
          margin: 0;
        }
      `}</style>
    </div>
  );
}
