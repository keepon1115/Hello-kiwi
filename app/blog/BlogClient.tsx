'use client';

import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import type { NotePost } from '@/lib/note';
import { useReveal } from '@/lib/useReveal';

const CATEGORY_TABS = [
  { id: 'すべて', label: 'すべて' },
  { id: 'お知らせ', label: 'お知らせ' },
  { id: 'NZコラム', label: 'NZコラム' }
] as const;

type CategoryId = (typeof CATEGORY_TABS)[number]['id'];

export function BlogClient({ posts }: { posts: NotePost[] }) {
  const [cat, setCat] = useState<CategoryId>('すべて');
  useReveal(cat);

  const list = cat === 'すべて' ? posts : posts.filter((p) => p.category === cat);

  return (
    <>
      <section className="page-hero">
        <div className="container reveal">
          <p className="eyebrow">Blog &amp; News</p>
          <h1>お知らせ・NZコラム</h1>
          <p className="lead">noteで更新している最新記事を自動で表示しています。</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cats reveal">
            {CATEGORY_TABS.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`cat ${cat === c.id ? 'on' : ''}`}
                aria-pressed={cat === c.id}
                onClick={() => setCat(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="post-grid">
            {list.map((p, i) => (
              <Reveal key={p.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
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
          {list.length === 0 && (
            <p className="empty-message">
              {posts.length === 0
                ? '現在、記事を読み込めませんでした。少し時間をおいて再度ご確認ください。'
                : '現在、このカテゴリーの記事はありません。'}
            </p>
          )}
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
        .cat[aria-pressed='true'] { background: var(--leaf-green); color: #fff; border-color: var(--leaf-green); }
        .post-grid { display: grid; gap: 22px; grid-template-columns: 1fr; }
        :global(.post) { display: flex; flex-direction: column; gap: 8px; height: 100%; align-items: flex-start; }
        .post-meta { display: flex; align-items: center; gap: 10px; }
        .post-meta time { font-size: 0.76rem; color: var(--cocoa-faint); }
        :global(.post) h2 { font-size: 1.1rem; }
        :global(.post) p { color: var(--cocoa-soft); font-size: 0.88rem; flex: 1; margin: 0; }
        .post-go { color: var(--kiwi-orange); font-weight: 700; font-family: var(--font-round); }
        .empty-message {
          margin: 0;
          padding: 28px 20px;
          border-radius: 18px;
          background: #fff;
          color: var(--cocoa-soft);
          text-align: center;
          box-shadow: var(--shadow-soft);
        }
        @container (min-width: 760px) {
          .post-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </>
  );
}
