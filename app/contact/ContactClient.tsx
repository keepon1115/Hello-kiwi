'use client';
import Link from 'next/link';
import { useReveal } from '@/lib/useReveal';
import { LINKS } from '@/lib/site';
import { Reveal } from '@/components/Reveal';
import { ImageSlot } from '@/components/ImageSlot';

export function ContactClient() {
  useReveal();

  return (
    <>
      <section className="page-hero">
        <div className="container reveal">
          <ImageSlot
            src="/assets/images/hero/kiwi3.png"
            label="kiwi3"
            alt="Hello Kiwiのキャラクター"
            w={132}
            h={114}
            className="floaty contact-character"
          />
          <p className="eyebrow">Contact</p>
          <h1>お問い合わせ</h1>
          <p className="lead">LINEでのご相談、または無料体験レッスンの予約からお気軽にどうぞ。</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <Reveal className="ct-line card">
            <h2>LINEで相談</h2>
            <p>LINEアカウント：{LINKS.lineId}</p>
            <a href={LINKS.line} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-lg">
              友だち追加
            </a>
          </Reveal>

          <Reveal className="ct-trial card" delay={1}>
            <h2>体験レッスン</h2>
            <p>オンライン・教室どちらでも無料で体験できます。</p>
            <Link href="/trial" className="btn btn-primary btn-lg">
              無料体験に申し込む
            </Link>
          </Reveal>
        </div>

        <div className="container">
          <Reveal className="ct-sns" delay={2}>
            <p>教室の様子はInstagramから</p>
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="instagram-link" aria-label="Instagram">
              <ImageSlot
                src="/assets/images/Instagram/Instagram_icon.png"
                label="Instagram"
                alt="Instagram"
                w={28}
                h={28}
                className="instagram-icon"
              />
            </a>
          </Reveal>
        </div>
      </section>

      <style jsx>{`
        .page-hero {
          text-align: center;
          padding: clamp(44px, 7vw, 80px) 0;
          background: radial-gradient(80% 100% at 50% 0%, rgb(var(--yellow-rgb) / 0.32), transparent 60%);
        }
        .page-hero h1 { font-size: clamp(2rem, 6vw, 3rem); margin: 10px 0 14px; }
        .page-hero .lead { color: var(--cocoa-soft); }
        :global(.contact-character) { margin: 0 auto; overflow: visible; }
        :global(.contact-character) :global(img) { object-fit: contain; }
        .contact-grid { display: grid; gap: 22px; grid-template-columns: 1fr; align-items: stretch; }
        :global(.ct-line), :global(.ct-trial) { text-align: center; }
        :global(.ct-line) h2, :global(.ct-trial) h2 { font-size: 1.25rem; margin: 8px 0 12px; }
        :global(.ct-line) p, :global(.ct-trial) p { color: var(--cocoa-soft); margin: 0 0 20px; }
        :global(.ct-sns) { text-align: center; margin-top: 30px; }
        :global(.ct-sns) p { color: var(--cocoa-soft); margin-bottom: 14px; }
        .instagram-link {
          display: inline-grid;
          place-items: center;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #fff;
          box-shadow: var(--shadow-soft);
        }
        :global(.instagram-icon) :global(img) { object-fit: contain; }
        @container (min-width: 820px) {
          .contact-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </>
  );
}
