'use client';
import { useReveal } from '@/lib/useReveal';
import { LINKS } from '@/lib/site';
import { ImageSlot } from '@/components/ImageSlot';
import { Reveal } from '@/components/Reveal';

export function TrialClient() {
  useReveal();

  return (
    <>
      <section className="page-hero">
        <div className="container reveal">
          <ImageSlot
            src="/assets/images/hero/kiwi.png"
            label="kiwi"
            alt="Hello Kiwiのキャラクター"
            w={132}
            h={132}
            className="floaty trial-character"
          />
          <p className="eyebrow">Free Trial</p>
          <h1>まずは、無料体験から。</h1>
          <p className="lead">
            体験レッスンは約50分。レッスンは「オンライン」か「教室（対面）」をお選びいただけます。
            <br />
            オンラインはGoogle Meetを使用します。お送りするURLをクリックするだけで簡単に参加でき、アプリのダウンロードや会員登録は一切不要ですので、初めての方もご安心ください。
          </p>
          <a href={LINKS.booking} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
            無料体験レッスンを予約する
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container trial-card-wrap">
          <Reveal className="trial-card card">
            <h2>体験レッスンでできること</h2>
            <ul>
              <li>現在の英語レベルや目標を確認します。</li>
              <li>簡単なあいさつや自己紹介から、無理なく始めます。</li>
              <li>教室・オンラインどちらが合うかも相談できます。</li>
            </ul>
            <a href={LINKS.booking} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              予約ページを開く
            </a>
          </Reveal>
        </div>
      </section>

      <style jsx>{`
        .page-hero {
          text-align: center;
          padding: clamp(44px, 7vw, 80px) 0;
          background: radial-gradient(80% 100% at 50% 0%, rgb(var(--yellow-rgb) / 0.34), transparent 60%);
        }
        .page-hero h1 { font-size: clamp(2rem, 6vw, 3rem); margin: 10px 0 14px; }
        .page-hero .lead { color: var(--cocoa-soft); max-width: 42em; margin: 0 auto 24px; }
        :global(.trial-character) { margin: 0 auto; overflow: visible; }
        :global(.trial-character) :global(img) { object-fit: contain; }
        .trial-card-wrap { max-width: 720px; }
        :global(.trial-card) { text-align: center; }
        :global(.trial-card) h2 { font-size: 1.35rem; margin-bottom: 16px; }
        :global(.trial-card) ul {
          display: grid;
          gap: 10px;
          text-align: left;
          color: var(--cocoa-soft);
          margin: 0 0 24px;
          padding-left: 1.2em;
        }
      `}</style>
    </>
  );
}
