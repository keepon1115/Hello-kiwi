import Link from 'next/link';
import { Reveal } from './Reveal';

const TYPES = [
  {
    label: '小学生',
    sub: 'はじめての英語を楽しく',
    href: '/courses#kids-abc'
  },
  {
    label: '大人・やり直し',
    sub: '日常会話・旅行英語をマイペースに',
    href: '/courses#adult'
  }
];

export function AgeSelector() {
  return (
    <div className="age-list">
      {TYPES.map((t, i) => (
        <Reveal key={t.label} delay={((i % 3) + 1) as 1 | 2 | 3}>
          <Link href={t.href} className="age-card card card-hover">
            <span className="age-text">
              <strong>{t.label}</strong>
              <span className="age-sub">{t.sub}</span>
            </span>
            <span className="age-go" aria-hidden>
              →
            </span>
          </Link>
        </Reveal>
      ))}

  <style>{`
        .age-list { display: grid; gap: 14px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .age-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
        }
        .age-text { display: flex; flex-direction: column; flex: 1; }
        .age-card strong { font-family: var(--font-round); font-size: 1.15rem; }
        .age-sub { color: var(--cocoa-soft); font-size: 0.85rem; }
        .age-go {
          flex: none;
          color: var(--kiwi-orange);
          font-weight: 800;
          font-size: 1.4rem;
        }
        @container (max-width: 420px) {
          .age-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
