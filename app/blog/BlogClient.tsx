'use client';
import { useState } from 'react';
import { useReveal } from '@/lib/useReveal';
import { POSTS, CATEGORIES } from '@/lib/data/posts';
import { Reveal } from '@/components/Reveal';

export function BlogClient() {
  useReveal();
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('すべて');
  const list = cat === 'すべて' ? POSTS : POSTS.filter((p) => p.category === cat);

  return (
    <>
      <section className="page-hero">
        <div className="container reveal">
          <p className="eyebrow">Blog &amp; News</p>
          <h1>お知らせ・NZコラム</h1>
          <p className="lead">教室のお知らせと、ニュージーランドの文化や英語にまつわるコラムをお届けします。</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cats reveal">
            {CATEGORIES.map((c) => (
              <button key={c} className={`cat ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className="post-grid">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="card card-hover post">
                  <div className="post-meta">
                    <span className="chip">{p.category}</span>
                    <time>{p.date}</time>
                  </div>
                  <h2>{p.title}</h2>
                  <p>{p.excerpt}</p>
                  <span className="post-go">読む →</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .page-hero {
          text-align: center;
          padding: clamp(44px, 7vw, 80px) 0;
          background: radial-gradient(80% 100% at 50% 0%, rgb(var(--yellow-rgb) / 0.3), transparent 60%);
        }
        .page-hero h1 { font-size: clamp(2rem, 6vw, 3rem); margin: 8px 0 14px; }
        .page-hero .lead { color: var(--cocoa-soft); max-width: 34em; margin: 0 auto; }
        .cats { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 34px; }
        .cat {
          font: inherit;
          font-family: var(--font-round);
          font-weight: 700;
          font-size: 0.88rem;
          padding: 8px 18px;
          border-radius: 999px;
          border: 1.5px solid rgb(var(--cocoa-rgb) / 0.16);
          background: #fff;
          color: var(--cocoa-soft);
          cursor: pointer;
        }
        .cat.on { background: var(--leaf-green); color: #fff; border-color: var(--leaf-green); }
        .post-grid { display: grid; gap: 22px; grid-template-columns: 1fr; }
        :global(.post) { display: flex; flex-direction: column; gap: 8px; height: 100%; align-items: flex-start; }
        .post-meta { display: flex; align-items: center; gap: 10px; }
        .post-meta time { font-size: 0.76rem; color: var(--cocoa-faint); }
        :global(.post) h2 { font-size: 1.1rem; }
        :global(.post) p { color: var(--cocoa-soft); font-size: 0.88rem; flex: 1; margin: 0; }
        .post-go { color: var(--kiwi-orange); font-weight: 700; font-family: var(--font-round); }
        @container (min-width: 760px) {
          .post-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </>
  );
}
