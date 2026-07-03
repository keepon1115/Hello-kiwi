'use client';
import { useReveal } from '@/lib/useReveal';
import { ImageSlot } from '@/components/ImageSlot';
import { Reveal } from '@/components/Reveal';

const TRIAL_URL = 'https://tidycal.com/nobutakasatons/30-minute';
const JAPANESE_SITE_URL = 'https://www.hellokiwieikaiwa.com/';
const ABOUT_URL = 'https://www.hiddenjapanworld.com/about-hidden-japan-world/';
const TRAVEL_COURSE_URL = 'https://www.hellokiwieikaiwa.com/Real-Japanese/';

const TRAVEL_TOPICS = [
  'Greetings and introductions',
  'Ordering food and drinks',
  'Shopping and payments',
  'Asking for directions',
  'Using trains and public transport',
  'Checking into hotels',
  'Useful phrases for everyday travel'
];

const OSAKA_TOPICS = [
  'Explore local neighbourhoods',
  'Visit popular sightseeing spots',
  "Learn how to use Osaka's trains and public transportation",
  'Experience everyday Japan beyond typical tourist destinations',
  'Understand Japanese customs and culture'
];

export function EnClient() {
  useReveal();

  return (
    <div lang="en">
      <section className="en-hero">
        <div className="container en-hero-inner reveal">
          <p className="eyebrow">Welcome to Hello Kiwi</p>
          <ImageSlot
            src="/assets/images/hero/hero-main.jpan.png"
            label="Hello Kiwi Japanese lesson hero"
            alt="Hello Kiwi Japanese lessons"
            ratio="16/11"
            className="en-hero-image"
            priority
          />
          <h1>Learn Japanese. Experience Japan. Connect Cultures.</h1>
          <div className="lead">
            <p>Kia Ora! I&apos;m Nobu, the founder of Hello Kiwi.</p>
            <p>
              I was born in Japan but grew up in New Zealand from a young age. After spending many
              years living, studying, and working in New Zealand, I have now returned to Japan and
              currently live in Osaka.
            </p>
            <p>
              Because I understand both Japanese and New Zealand culture, I created Hello Kiwi to
              help people enjoy language learning and cultural experiences in a relaxed and
              practical way.
            </p>
            <p>
              Whether you&apos;re looking to improve your English skills or explore Japan with a local
              guide, I&apos;m here to help.
            </p>
          </div>
          <div className="en-cta">
            <a href={ABOUT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Learn More About Me
            </a>
          </div>
        </div>
      </section>

      <section className="section en-about">
        <div className="container en-narrow reveal">
          <h2>Japanese Lessons Designed Around You</h2>
          <p>
            Everyone learns differently, and that&apos;s okay! At Hello Kiwi Japanese, I offer both
            online and in-class lessons that are completely tailored to you. Together, we&apos;ll focus
            on what matters most to you!
          </p>
          <p>
            Whether that&apos;s speaking confidently, understanding Japanese culture, preparing for
            exams, or getting ready for your next adventure in Japan.
          </p>
          <p>Let&apos;s make learning Japanese enjoyable, practical, and meaningful for you.</p>
          <div className="en-cta">
            <a href={TRIAL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Book a free trial
            </a>
            <a href={JAPANESE_SITE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
              日本語サイトへ →
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container en-course-stack">
          <Reveal className="card en-service">
            <h2>100-Minute Japanese Travel Course</h2>
            <div className="copy">
              <p>Visiting Japan soon?</p>
              <p>
                This practical 100-minute course is designed for travellers who want to learn useful
                Japanese before or during their trip.
              </p>
              <p>
                Instead of focusing on grammar rules and textbooks, you&apos;ll learn phrases that you
                can use immediately while exploring Japan.
              </p>
              <p>Topics may include:</p>
            </div>
            <ul className="highlight-list">
              {TRAVEL_TOPICS.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <div className="copy">
              <p>The lesson is fully customised to your travel plans, destination, and Japanese level.</p>
              <p>
                Whether you&apos;re visiting Osaka, Tokyo, Kyoto, or travelling around Japan, you&apos;ll
                leave with practical Japanese that you can use straight away.
              </p>
            </div>
            <a href={TRAVEL_COURSE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Learn More
            </a>
          </Reveal>

          <Reveal className="card en-service" delay={1}>
            <h2>Osaka Tour Guide</h2>
            <div className="copy">
              <p>Planning a trip to Osaka?</p>
              <p>
                I offer local guiding services around Osaka and nearby areas, helping visitors
                experience Japan beyond the typical tourist attractions.
              </p>
              <p>
                Instead of joining a large tour group, you&apos;ll explore with someone who understands
                both Japanese culture and the perspective of international visitors. Having lived in
                both New Zealand and Japan, I can help bridge the cultural gap and make your trip
                more comfortable and enjoyable.
              </p>
              <p>I can help you:</p>
            </div>
            <ul className="highlight-list">
              {OSAKA_TOPICS.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <div className="copy">
              <p>
                Whether it&apos;s your first visit to Japan or your fifth, I&apos;d love to help you discover
                Osaka with confidence and create lasting memories along the way.
              </p>
              <p>Not sure yet?</p>
              <p>
                Book a free 30-minute consultation and let&apos;s talk about your goals, travel plans,
                and how Hello Kiwi can help.
              </p>
            </div>
            <a href={TRIAL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Book a Free Consultation
            </a>
          </Reveal>
        </div>
      </section>

      <style jsx>{`
        .en-hero {
          text-align: center;
          padding: clamp(46px, 7vw, 82px) 0;
          background: radial-gradient(80% 100% at 50% 0%, rgb(var(--yellow-rgb) / 0.34), transparent 60%);
        }
        .en-hero-inner { max-width: 760px; }
        :global(.en-hero-image) {
          margin: 18px auto 26px;
          max-width: 620px;
          border-radius: 22px;
          box-shadow: var(--shadow-lift);
        }
        .en-hero h1 { font-size: clamp(2rem, 5vw, 3.15rem); margin: 0 0 18px; }
        .lead { color: var(--cocoa-soft); display: grid; gap: 12px; }
        .lead p { margin: 0; }
        .en-cta { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 26px; }

        .en-narrow { max-width: 760px; }
        .en-about { background: color-mix(in srgb, var(--cream) 78%, var(--leaf-green) 7%); }
        .en-about h2 { font-size: clamp(1.55rem, 4vw, 2.2rem); margin-bottom: 16px; }
        .en-about p { color: var(--cocoa-soft); margin: 0 0 14px; }

        .en-course-stack { display: grid; gap: 24px; }
        :global(.en-service) { display: grid; gap: 18px; }
        :global(.en-service) h2 { font-size: clamp(1.35rem, 3.4vw, 1.85rem); }
        .copy { color: var(--cocoa-soft); display: grid; gap: 10px; }
        .copy p { margin: 0; }
        .highlight-list {
          display: grid;
          gap: 10px;
          margin: 0;
          padding: 18px 20px;
          list-style: none;
          border-radius: 18px;
          background: rgb(var(--yellow-rgb) / 0.22);
          color: color-mix(in srgb, var(--cocoa) 82%, var(--kiwi-orange));
          font-weight: 700;
        }
        .highlight-list li {
          position: relative;
          padding-left: 1.3em;
        }
        .highlight-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.72em;
          width: 0.5em;
          height: 0.5em;
          border-radius: 50%;
          background: var(--leaf-green);
        }
      `}</style>
    </div>
  );
}
