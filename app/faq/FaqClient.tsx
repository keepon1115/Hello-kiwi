'use client';
import { useReveal } from '@/lib/useReveal';
import { FAQS } from '@/lib/data/faq';
import { Accordion } from '@/components/Accordion';
import { CTASection } from '@/components/CTASection';

export function FaqClient() {
  useReveal();

  return (
    <>
      <section className="page-hero">
        <div className="container reveal">
          <p className="eyebrow">FAQ</p>
          <h1>よくある質問</h1>
        </div>
      </section>

      <section className="section">
        <div className="container reveal">
          <Accordion items={FAQS} />
        </div>
      </section>

      <CTASection />

      <style jsx>{`
        .page-hero {
          text-align: center;
          padding: clamp(44px, 7vw, 80px) 0;
          background: radial-gradient(80% 100% at 50% 0%, rgb(var(--yellow-rgb) / 0.3), transparent 60%);
        }
        .page-hero h1 { font-size: clamp(2rem, 6vw, 3rem); margin: 8px 0 14px; }
      `}</style>
    </>
  );
}
