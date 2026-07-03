'use client';
import Link from 'next/link';
import { SectionHeading } from '@/components/SectionHeading';
import { FeatureCards } from '@/components/FeatureCards';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { ImageSlot } from '@/components/ImageSlot';
import { COURSES } from '@/lib/data/courses';
import type { NotePost } from '@/lib/note';

export function HomeClient({ posts }: { posts: NotePost[] }) {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <Reveal className="hero-art">
            <ImageSlot
              src="/assets/images/hero/hero-main.png"
              label="hero-main"
              alt="Hello Kiwi英会話のメインビジュアル"
              ratio="16/9"
              priority
              className="hero-img hero-img-desktop"
            />
            <ImageSlot
              src="/assets/images/hero/hero-main2.png"
              label="hero-main2"
              alt="Hello Kiwi英会話のメインビジュアル"
              priority
              className="hero-img hero-img-mobile"
            />
          </Reveal>
          <p className="hero-lead">
            ニュージーランド育ちの講師と、1対1のプライベートレッスン。
            <br />
            英語がはじめてでも大丈夫。
            <br />
            あなたのペースで「伝わる楽しさ」を見つけていきましょう。
          </p>
          <div className="hero-cta">
            <Link href="/trial" className="btn btn-primary btn-lg">
              無料体験に申し込む
            </Link>
            <Link href="/courses" className="btn btn-ghost">
              コースを見る →
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Why Hello Kiwi" title="Hello Kiwi英会話の特徴" />
          <FeatureCards />
        </div>
      </section>

      <section className="section teacher-band">
        <div className="container">
          <Reveal className="teacher-card card">
            <ImageSlot
              src="/assets/images/hero/kiwi5.png"
              label="kiwi5"
              alt="講師のイラスト"
              w={180}
              h={180}
              className="t-portrait"
            />
            <p className="eyebrow">Your teacher</p>
            <h2>講師紹介</h2>
            <p>
              英語ゼロからニュージーランドへ渡った経験があるからこそ、最初の一歩の不安がわかります。
              ことばに詰まっても、あなたのペースで一緒に進めていきます。
            </p>
            <Link href="/about" className="btn btn-primary">
              講師のストーリーはこちら →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section field-band">
        <div className="container">
          <SectionHeading
            eyebrow="Courses"
            title="コース・料金"
            lead="えらべる3つの基本コース。1対1の個人レッスンなので、ご希望に合わせて内容を柔軟にアレンジできます。教室もオンラインも選べます。"
          />
          <div className="course-list">
            {COURSES.map((c, i) => (
              <Reveal key={c.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <Link href={`/courses#${c.slug}`} className="card card-hover cmini">
                  <div className="cmini-body">
                    <span className="chip">{c.ageBadge}</span>
                    <strong>{c.name}</strong>
                    <p>{c.lead}</p>
                    <span className="cmini-go">詳しく見る →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Blog & News" title="お知らせ・NZコラム" />
          <div className="blog-list">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="card card-hover bmini">
                  <div>
                    <span className="chip">{p.category}</span>
                    <time>{p.date}</time>
                    <h3>{p.title}</h3>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          {posts.length === 0 && (
            <p className="blog-empty">最新記事を読み込めませんでした。少し時間をおいて再度ご確認ください。</p>
          )}
          <div className="center-link">
            <Link href="/blog" className="btn btn-ghost">
              すべての記事を見る →
            </Link>
          </div>
        </div>
      </section>

      <CTASection />

      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
          text-align: center;
          background:
            radial-gradient(90% 70% at 80% 0%, rgb(var(--yellow-rgb) / 0.4), transparent 60%),
            radial-gradient(80% 70% at 10% 100%, rgb(var(--green-rgb) / 0.16), transparent 65%);
          padding: clamp(28px, 6vw, 48px) 0 clamp(40px, 7vw, 60px);
        }
        :global(.hero-art) { margin: 0 auto 20px; max-width: min(960px, 100%); }
        :global(.hero-art) :global(.hero-img) {
          width: 100%;
        }
        :global(.hero-art) :global(.hero-img) :global(img) { object-fit: contain; background: transparent; }
        :global(.hero-art) :global(.hero-img-mobile) { display: none; }
        .hero-lead { color: var(--cocoa-soft); margin: 0 auto 22px; max-width: 34em; }
        .hero-cta { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
        .field-band { background: color-mix(in srgb, var(--page) 78%, var(--leaf-green) 7%); }
        .teacher-band { background: color-mix(in srgb, var(--page) 70%, var(--kiwi-orange) 6%); }
        :global(.teacher-card) { text-align: center; }
        :global(.teacher-card) :global(.t-portrait) {
          margin: 0 auto 12px;
          background: transparent;
          box-shadow: none;
        }
        :global(.teacher-card) :global(.t-portrait) :global(img) {
          object-fit: contain;
          background: transparent;
        }
        :global(.teacher-card) h2 { font-size: clamp(1.4rem, 7cqi, 1.9rem); margin: 6px 0 12px; }
        :global(.teacher-card) > p { color: var(--cocoa-soft); margin: 0 0 18px; }
        .course-list { display: grid; gap: 18px; }
        @container (min-width: 680px) {
          .course-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .course-list > :global(*:last-child:nth-child(odd)) { grid-column: 1 / -1; }
        }
        :global(.cmini) { display: block; padding: 0; overflow: hidden; }
        .cmini-body { padding: 22px; display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }
        .cmini-body strong { font-family: var(--font-round); font-size: 1.2rem; }
        .cmini-body p { color: var(--cocoa-soft); font-size: 0.9rem; margin: 4px 0; }
        .cmini-go { color: var(--kiwi-orange); font-weight: 700; font-family: var(--font-round); }
        .blog-list { display: grid; gap: 14px; }
        :global(.bmini) { display: block; }
        :global(.bmini) time { display: block; color: var(--cocoa-faint); font-size: 0.78rem; margin-top: 8px; }
        :global(.bmini) h3 { font-size: 1rem; margin: 6px 0 0; }
        .blog-empty { color: var(--cocoa-soft); margin: 0; text-align: center; }
        .center-link { text-align: center; margin-top: 28px; }
        @container (max-width: 679px) {
          .hero {
            padding-top: 0;
          }
          :global(.hero-art) {
            width: calc(100% + 40px);
            max-width: none;
            margin-left: -20px;
            margin-right: -20px;
          }
          :global(.hero-art) :global(.hero-img-desktop) { display: none; }
          :global(.hero-art) :global(.hero-img-mobile) { display: block; }
          :global(.hero-art) :global(.hero-img-mobile) :global(img) {
            width: 100%;
            height: auto;
            object-fit: contain;
          }
        }
      `}</style>
    </>
  );
}
