'use client';
import Link from 'next/link';
import { CTASection } from '@/components/CTASection';

const GAMES = [
  {
    href: '/play/kiwi-quiz',
    emoji: '🗺️',
    en: 'Kiwi Check',
    title: 'Kiwi度チェック',
    lead: 'jandals、sweet as、chilly bin。NZの英語を3択で7問。北から南へ旅をしながら答えます。',
    meta: '約3分・大人も子どもも',
    tone: 'day'
  },
  {
    href: '/play/code-the-kiwi',
    emoji: '🌙',
    en: 'English × Coding',
    title: 'Code the Kiwi',
    lead: '英語のブロックをならべて、夜の森のキウイをごはんまで案内するパズル。全6ステージ。',
    meta: '約5分・小学生から',
    tone: 'night'
  },
  {
    href: '/play/kiwi-cafe',
    emoji: '☕',
    en: 'Kiwi Café',
    title: 'Kiwi Café',
    lead: 'NZのカフェの店員になって、英語の注文をトレイにのせます。数や言い直しに気をつけて、全8人。',
    meta: '約4分・大人も子どもも',
    tone: 'day'
  },
  {
    href: '/play/kiwi-dress-up',
    emoji: '🧢',
    en: 'Kiwi Dress-Up',
    title: 'Kiwi Dress-Up',
    lead: 'キウイを着せかえて、つまんで引っ張って、できあがりをアイコン画像として保存できます。',
    meta: '好きなだけ・正解はありません',
    tone: 'day'
  }
] as const;

export function PlayClient() {
  return (
    <>
      <section className="page-hero">
        <div className="container reveal">
          <p className="eyebrow">Play</p>
          <h1>ゲームであそぶ</h1>
          <p className="lead">
            英語とニュージーランドを、ちょっとだけ体験できるゲームです。登録はいりません。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container games">
          {GAMES.map((g, i) => (
            <Link key={g.href} href={g.href} className={`game reveal d${(i % 3) + 1} is-${g.tone}`}>
              <span className="game-emoji" aria-hidden="true">
                {g.emoji}
              </span>
              <span className="game-en">{g.en}</span>
              <strong>{g.title}</strong>
              <span className="game-lead">{g.lead}</span>
              <span className="game-meta">{g.meta}</span>
              <span className="game-go">あそぶ →</span>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />

      <style jsx>{`
        .page-hero {
          text-align: center;
          padding: clamp(44px, 7vw, 80px) 0 0;
          background: radial-gradient(80% 100% at 50% 0%, rgb(var(--yellow-rgb) / 0.3), transparent 60%);
        }
        .page-hero h1 { font-size: clamp(2rem, 6vw, 3rem); margin: 8px 0 14px; }
        .page-hero .lead { color: var(--cocoa-soft); margin: 0 auto; max-width: 30em; }
        .games { display: grid; gap: 18px; }
        .games :global(.game) {
          display: grid;
          gap: 6px;
          padding: 24px 22px;
          border-radius: 26px;
          background: #fff;
          border: 1px solid rgb(var(--cocoa-rgb) / 0.06);
          box-shadow: var(--shadow-soft);
          transition: transform 0.22s ease, box-shadow 0.22s ease, opacity 0.5s ease;
        }
        .games :global(.game:hover) { transform: translateY(-4px); box-shadow: var(--shadow-lift); }
        .games :global(.game.is-night) { background: #14233b; color: #eef3fb; border-color: transparent; }
        .game-emoji { font-size: 2.4rem; line-height: 1; }
        .game-en {
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--kiwi-orange);
        }
        .games :global(.is-night) .game-en { color: var(--sunny-yellow); }
        strong { font-family: var(--font-round); font-size: 1.5rem; line-height: 1.3; }
        .game-lead { font-size: 0.95rem; opacity: 0.85; }
        .game-meta { font-size: 0.8rem; font-weight: 700; opacity: 0.7; }
        .game-go {
          justify-self: start;
          margin-top: 8px;
          padding: 0.6em 1.3em;
          border-radius: 999px;
          background: var(--kiwi-orange);
          color: #fff;
          font-family: var(--font-round);
          font-weight: 700;
        }
        @container (min-width: 680px) {
          .games { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </>
  );
}
