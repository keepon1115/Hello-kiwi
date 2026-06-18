'use client';
import { STORY } from '@/lib/data/story';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { ImageSlot } from '@/components/ImageSlot';

export function AboutClient() {
  return (
    <>
      <section className="about-hero">
        <div className="container reveal">
          <p className="eyebrow">About Hello Kiwi</p>
          <h1>「英語ゼロ」からのスタートでした</h1>
          <p className="lead">
            6歳でニュージーランドへ渡り、言葉が通じない苦労を経験しています。
            <br />
            「話せないもどかしさ」がよく分かるからこそ、初心者の目線に立った丁寧なレッスンを行います。
          </p>
        </div>
      </section>

      <div className="story-track">
        {STORY.map((ch, i) => (
          <section key={ch.no} className={`chapter ${i % 2 ? 'alt' : ''}`}>
            <div className="container">
              <Reveal className="ch-head">
                <div>
                  <p className="ch-en">{ch.enTitle}</p>
                  <h2>{ch.title}</h2>
                </div>
              </Reveal>

              <Reveal className="ch-manga" delay={1}>
                <ImageSlot
                  src={ch.image}
                  label={ch.image.split('/').pop() ?? ''}
                  alt={ch.alt}
                  ratio="3/2"
                  priority={i === 0}
                  className="manga-img"
                />
              </Reveal>

              <Reveal className="ch-narration" delay={2}>
                <ol>
                  {ch.narration.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <section className="section philosophy">
        <div className="container reveal">
          <h2>1対1だから、自分のペースで一歩ずつ</h2>
          <p>
            完璧な英語を話そうとしなくて大丈夫です。言葉に詰まっても、単語を並べるだけでも問題ありません。
            あなたの理解度やペースに合わせて、最初の一歩を丁寧にサポートします。
          </p>
          <div className="movie">
            <iframe
              src="https://www.youtube.com/embed/Wbbu2HKMNdo"
              title="Hello Kiwi 英会話"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <CTASection />

      <style jsx>{`
        .about-hero {
          text-align: center;
          padding: clamp(36px, 7vw, 64px) 0 clamp(16px, 4vw, 32px);
          background: radial-gradient(90% 100% at 50% 0%, rgb(var(--yellow-rgb) / 0.34), transparent 62%);
        }
        .about-hero h1 { font-size: clamp(1.6rem, 8cqi, 2.3rem); margin: 12px 0 14px; }
        .about-hero .lead { color: var(--cocoa-soft); }
        .chapter { padding: clamp(32px, 6vw, 56px) 0; }
        .chapter.alt { background: color-mix(in srgb, var(--page) 72%, var(--leaf-green) 8%); }
        :global(.ch-head) { margin-bottom: 18px; text-align: center; }
        .ch-en { font-family: var(--font-pop); color: var(--leaf-green); font-weight: 700; margin: 0; font-size: 0.82rem; }
        :global(.ch-head) h2 { font-size: clamp(1.2rem, 6cqi, 1.7rem); }
        :global(.ch-manga) { position: relative; display: block; }
        :global(.ch-manga) :global(.manga-img) {
          width: 100%;
          border-radius: 16px;
          box-shadow: var(--shadow-lift);
          border: 5px solid #fff;
        }
        :global(.ch-narration) {
          margin-top: 22px;
          background: #fff;
          border-radius: 20px;
          padding: clamp(20px, 5cqi, 30px);
          box-shadow: var(--shadow-soft);
          border-left: 6px solid rgb(var(--yellow-rgb));
        }
        :global(.ch-narration) ol { margin: 0; padding-left: 1.3em; display: grid; gap: 10px; }
        :global(.ch-narration) li { color: var(--cocoa-soft); }
        .philosophy { text-align: center; background: color-mix(in srgb, var(--page) 60%, var(--kiwi-orange) 8%); }
        .philosophy h2 { font-size: clamp(1.4rem, 7cqi, 2rem); margin-bottom: 16px; }
        .philosophy p { color: var(--cocoa-soft); }
        .movie {
          margin: 28px auto 0;
          max-width: 760px;
          aspect-ratio: 16 / 9;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: var(--shadow-lift);
          background: #000;
        }
        .movie iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }
      `}</style>
    </>
  );
}
