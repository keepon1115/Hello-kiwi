'use client';
import Link from 'next/link';
import { useReveal } from '@/lib/useReveal';
import type { Post } from '@/lib/data/posts';
import { CTASection } from '@/components/CTASection';

export function ArticleClient({ post }: { post: Post }) {
  useReveal();

  return (
    <>
      <article className="article">
        <div className="container article-inner reveal">
          <Link href="/blog" className="back">
            ← お知らせ・ブログ一覧へ
          </Link>
          <div className="art-head">
            <div className="art-meta">
              <span className="chip">{post.category}</span>
              <time>{post.date}</time>
            </div>
            <h1>{post.title}</h1>
          </div>
          <div className="art-body">
            {post.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </article>

      <CTASection />

      <style jsx>{`
        .article { padding: clamp(36px, 6vw, 64px) 0; }
        .article-inner { max-width: 720px; }
        :global(.back) { font-weight: 700; font-size: 0.85rem; color: var(--leaf-green); }
        .art-head { margin: 22px 0 28px; text-align: center; }
        .art-meta { display: flex; gap: 10px; justify-content: center; align-items: center; margin: 12px 0; }
        .art-meta time { font-size: 0.78rem; color: var(--cocoa-faint); }
        .art-head h1 { font-size: clamp(1.5rem, 5vw, 2.2rem); }
        .art-body p { color: var(--cocoa-soft); margin: 0 0 18px; line-height: 1.95; }
      `}</style>
    </>
  );
}
