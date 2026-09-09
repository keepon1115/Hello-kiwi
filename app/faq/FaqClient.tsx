'use client';
import type { ReactNode } from 'react';
import { useReveal } from '@/lib/useReveal';
import { FAQS } from '@/lib/data/faq';
import { Accordion } from '@/components/Accordion';
import { CTASection } from '@/components/CTASection';
function renderFaqAnswer(faq: (typeof FAQS)[number]): ReactNode {
  if (faq.id === 'student-price') {
    return (
      <p>
        併設しているプログラミング教室「
        <a
          href="https://keeponlabo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="faq-link"
        >
          キープオンラボ
        </a>
        」または「
        <a
          href="https://www.keeponlearning.fun/"
          target="_blank"
          rel="noopener noreferrer"
          className="faq-link"
        >
          エジソンアカデミー本校
        </a>
        」に在籍中のお子さま・ご家族が対象となります。プログラミングとあわせて英会話もお得に学んでいただけます。
      </p>
    );
  }

  if (faq.image) {
    return (
      <>
        <p>{faq.a}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={faq.image} alt="Hello Kiwi英会話の教室" className="faq-img" />
      </>
    );
  }

  return faq.a;
}

const faqItems = FAQS.map((faq) => ({
  q: faq.q,
  a: renderFaqAnswer(faq)
}));

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
          <Accordion items={faqItems} />
        </div>
      </section>

      <CTASection />

      <style jsx global>{`
        .faq-link {
          color: var(--leaf-green);
          font-weight: 700;
          text-decoration: underline;
        }
        .faq-img {
          display: block;
          width: 100%;
          height: auto;
          margin-top: 16px;
          border-radius: 12px;
        }
      `}</style>

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
