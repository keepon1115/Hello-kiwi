'use client';
import { useState } from 'react';
import type { PassportStamp, Tone } from '@/lib/members';
import { toneText } from '@/lib/members';
import { KiwiStamp, StarStamp } from './stamps';

function formatMD(date: string) {
  const [, m, d] = date.split('-');
  return `${Number(m)}/${Number(d)}`;
}

function monthLabel(ym: string, tone: Tone) {
  const [y, m] = ym.split('-');
  return toneText(tone, `${y}ねん ${Number(m)}がつ`, `${y}年${Number(m)}月`);
}

function groupByMonth(stamps: PassportStamp[]) {
  const groups = new Map<string, PassportStamp[]>();
  for (const stamp of stamps) {
    const ym = stamp.date.slice(0, 7);
    const list = groups.get(ym) ?? [];
    list.push(stamp);
    groups.set(ym, list);
  }
  return [...groups.entries()];
}

export function PassportSection({ stamps, tone }: { stamps: PassportStamp[]; tone: Tone }) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const latestDate = stamps[0]?.date;
  const groups = groupByMonth(stamps);

  if (stamps.length === 0) return null;

  return (
    <div className="passport">
      {groups.map(([ym, list]) => (
        <div key={ym} className="passport-month">
          <h3>{monthLabel(ym, tone)}</h3>
          <div className="stamp-row">
            {list.map((s, i) => {
              const key = `${ym}-${i}`;
              const isNew = s.date === latestDate;
              const isActive = activeKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  className={`stamp ${isNew ? 'is-new' : ''}`}
                  onClick={() => setActiveKey(isActive ? null : key)}
                  aria-pressed={isActive}
                >
                  {s.type === 'homework' ? <StarStamp /> : <KiwiStamp />}
                  <span className="stamp-date">{formatMD(s.date)}</span>
                  {isNew && <span className="stamp-new-badge">NEW</span>}
                  {isActive && s.note && <span className="stamp-note">{s.note}</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <style jsx>{`
        .passport {
          display: grid;
          gap: 22px;
        }
        .passport-month h3 {
          font-size: 0.92rem;
          color: var(--cocoa-soft);
          margin-bottom: 10px;
        }
        .stamp-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .stamp {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 12px;
          min-width: 44px;
          min-height: 44px;
        }
        .stamp:hover {
          background: rgb(var(--green-rgb) / 0.08);
        }
        .stamp-date {
          font-family: var(--font-pop);
          font-size: 0.66rem;
          font-weight: 700;
          color: var(--cocoa-soft);
        }
        .stamp-new-badge {
          position: absolute;
          top: -4px;
          right: -2px;
          background: var(--kiwi-orange);
          color: #fff;
          font-family: var(--font-pop);
          font-size: 0.56rem;
          font-weight: 800;
          padding: 1px 6px;
          border-radius: 999px;
          animation: stamp-pop 0.5s ease;
        }
        .stamp-note {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 8px;
          width: max-content;
          max-width: 220px;
          background: var(--cocoa);
          color: #fff;
          font-size: 0.76rem;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 12px;
          box-shadow: var(--shadow-soft);
          z-index: 5;
          white-space: normal;
        }
        @keyframes stamp-pop {
          0% { transform: scale(0.4); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .stamp-new-badge { animation: none; }
        }
      `}</style>
    </div>
  );
}
