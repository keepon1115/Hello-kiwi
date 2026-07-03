'use client';
import Link from 'next/link';
import { useReveal } from '@/lib/useReveal';
import { Mascot } from '@/components/Mascot';
import { CTASection } from '@/components/CTASection';

export function MyGuideClient() {
  useReveal();

  return (
    <>
      <section className="section guide-hero">
        <div className="container reveal">
          <Mascot pose="wave" size={110} className="floaty" />
          <h1>このページは 生徒さん専用です</h1>
          <p>LINEで とどいた じぶんだけの リンクから 入ってね。</p>
          <Link href="/" className="btn btn-ghost">
            公開サイトのトップへ
          </Link>
        </div>
      </section>

      <CTASection title="まだ生徒さんじゃない方へ" lead="まずは無料体験からどうぞ。" />

      <style jsx>{`
        .guide-hero {
          text-align: center;
          padding-top: clamp(48px, 8vw, 80px);
        }
        .guide-hero h1 {
          font-size: clamp(1.5rem, 6vw, 2.1rem);
          margin: 16px 0 10px;
        }
        .guide-hero p {
          color: var(--cocoa-soft);
          margin: 0 0 24px;
        }
      `}</style>
    </>
  );
}
