'use client';
import Link from 'next/link';
import { useReveal } from '@/lib/useReveal';
import { LINKS } from '@/lib/site';
import { Mascot } from '@/components/Mascot';
import { Reveal } from '@/components/Reveal';

const COURSES_EN = [
  { emoji: '🐤', name: 'Kids ABC', who: 'Preschool – Lower elementary', body: 'A gentle first step into English through songs, picture books and play.' },
  { emoji: '🗣️', name: 'Kids Conversation', who: 'Elementary – Junior high', body: 'For kids who want to speak. We grow the joy of saying things in your own words.' },
  { emoji: '🌏', name: 'Adult Conversation', who: 'Everyday & travel', body: 'Restart from middle-school English at your own pace. Weekday daytime available.' }
];

export function EnClient() {
  useReveal();

  return (
    <div lang="en">
      {/* Hero */}
      <section className="en-hero">
        <div className="container en-hero-inner reveal">
          <Mascot pose="cap" size={110} className="floaty" />
          <p className="eyebrow">Welcome to Hello Kiwi</p>
          <h1>Learn with joy, and your world opens up.</h1>
          <p className="lead">
            English conversation taught by a <strong>bilingual Japanese teacher who grew up in
            New Zealand</strong> — starting from zero English. Beginner-friendly and fully 1-on-1.
          </p>
          <div className="en-cta">
            <a href={LINKS.line} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Book a free trial
            </a>
            <Link href="/" className="btn btn-ghost btn-lg">
              日本語サイトへ →
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section en-about">
        <div className="container en-narrow reveal">
          <h2>About the teacher</h2>
          <p>
            Born in Tokyo, our teacher moved to New Zealand at age 6 — understanding not a single
            word of English. Through gestures, smiles and real friendships, they discovered that
            connection comes before perfection. That experience is the heart of every lesson here.
          </p>
          <p>
            “Because I started from zero, I understand exactly how a beginner feels.”
          </p>
        </div>
      </section>

      {/* Courses */}
      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="en-h2">Courses</h2>
          </Reveal>
          <div className="en-courses">
            {COURSES_EN.map((c, i) => (
              <Reveal key={c.name} delay={((i % 3) + 1) as 1 | 2 | 3} className="card card-hover en-course">
                <span className="emoji" aria-hidden>{c.emoji}</span>
                <strong>{c.name}</strong>
                <span className="who">{c.who}</span>
                <p>{c.body}</p>
              </Reveal>
            ))}
          </div>
          <p className="en-common">
            All courses are fully 1-on-1 and tailor-made · available online · in Yao &amp; Kashiwara.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="section en-contact">
        <div className="container en-narrow reveal">
          <h2>Get in touch</h2>
          <p>The quickest way is LINE. Feel free to message us even just to ask a question.</p>
          <div className="en-cta center">
            <a href={LINKS.line} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-lg">
              Contact us on LINE
            </a>
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
              Instagram {LINKS.instagramHandle}
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .en-hero {
          text-align: center;
          padding: clamp(48px, 8vw, 96px) 0;
          background: radial-gradient(80% 100% at 50% 0%, rgb(var(--yellow-rgb) / 0.34), transparent 60%);
        }
        .en-hero-inner { max-width: 680px; }
        .en-hero h1 { font-size: clamp(2rem, 6vw, 3.2rem); margin: 12px 0 16px; }
        .en-hero .lead { color: var(--cocoa-soft); }
        .en-cta { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 26px; }
        .en-cta.center { justify-content: center; }

        .en-narrow { max-width: 680px; }
        .en-about { background: color-mix(in srgb, var(--cream) 78%, var(--leaf-green) 7%); }
        .en-about h2, .en-contact h2 { font-size: clamp(1.5rem, 4.6vw, 2.1rem); margin-bottom: 14px; }
        .en-about p, .en-contact p { color: var(--cocoa-soft); margin: 0 0 14px; }

        .en-h2 { text-align: center; font-size: clamp(1.5rem, 4.6vw, 2.1rem); margin-bottom: 30px; }
        .en-courses { display: grid; gap: 20px; grid-template-columns: 1fr; }
        /* .en-course は <Reveal>（コンポーネント）に付くため :global() 必須 */
        :global(.en-course) { display: flex; flex-direction: column; gap: 6px; }
        :global(.en-course) .emoji { font-size: 2.4rem; }
        :global(.en-course) strong { font-family: var(--font-round); font-size: 1.15rem; }
        :global(.en-course) .who { color: var(--leaf-green); font-weight: 700; font-size: 0.82rem; }
        :global(.en-course) p { color: var(--cocoa-soft); font-size: 0.9rem; margin: 4px 0 0; }
        .en-common { text-align: center; color: var(--cocoa-soft); margin-top: 26px; font-size: 0.9rem; }

        .en-contact { text-align: center; }

        @container (min-width: 760px) {
          .en-courses { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </div>
  );
}
