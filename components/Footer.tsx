import Link from 'next/link';
import { NAV } from '@/lib/site';
import { ImageSlot } from './ImageSlot';

const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3282.8234017745867!2d135.59956009678956!3d34.6339028!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60012152f35bd669%3A0xd0841453474c4f89!2zSGVsbG8gS2l3aSDoi7HkvJroqbE!5e0!3m2!1sja!2sus!4v1781742576779!5m2!1sja!2sus';

export function Footer({ currentPath = '' }: { currentPath?: string }) {
  const isAccessPage = currentPath === '/access';

  return (
    <footer className="site-footer">
      <section className="footer-access">
        <div className="container access-inner">
          <h2>アクセス</h2>
          <p className="family-note">Hello Kiwi は、STEAM教室を運営するキープオンの連携校です。</p>
          <p className="addr">
            大阪府八尾市光町1-2 マイシン光町ビル4階
            <br />
            近鉄八尾から徒歩8分
          </p>
          <iframe
            className="footer-map"
            title="Hello Kiwi英会話の地図"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          {!isAccessPage && (
            <Link href="/access" className="btn btn-primary btn-lg footer-access-button">
              詳しく見る
            </Link>
          )}
        </div>
      </section>

      <div className="container foot-grid">
        <div className="foot-brand">
          <div className="foot-logo">
            <ImageSlot
              src="/assets/images/hero/kiwi2.png"
              label="kiwi2"
              alt="Hello Kiwiのキャラクター"
              w={112}
              h={112}
            />
            <strong>Hello Kiwi 英会話</strong>
          </div>
        </div>

        <nav className="foot-nav" aria-label="フッターナビ">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
          <Link href="/en">English</Link>
        </nav>
      </div>
      <div className="foot-bottom container">
        <span>© {new Date().getFullYear()} Hello Kiwi 英会話</span>
      </div>

      <style>{`
        .site-footer {
          background: color-mix(in srgb, var(--cream) 70%, var(--cocoa) 8%);
          border-top: 3px solid rgb(var(--yellow-rgb));
          margin-top: 40px;
          text-align: center;
        }
        .footer-access {
          background: #fff;
          border-bottom: 1px solid rgb(var(--cocoa-rgb) / 0.08);
          padding: 44px 0 36px;
        }
        .access-inner h2 {
          font-size: clamp(1.5rem, 4vw, 2rem);
          margin-bottom: 14px;
        }
        .addr {
          color: var(--cocoa);
          font-weight: 700;
          margin: 12px 0 0;
        }
        .footer-map {
          display: block;
          width: min(100%, 720px);
          height: 280px;
          border: 0;
          border-radius: 16px;
          margin: 22px auto 0;
          box-shadow: var(--shadow-soft);
        }
        .footer-access-button {
          margin-top: 20px;
        }
        .foot-grid {
          display: grid;
          gap: 26px;
          padding-top: 44px;
          padding-bottom: 34px;
          justify-items: center;
        }
        .foot-logo {
          display: grid;
          justify-items: center;
          gap: 10px;
        }
        .foot-logo strong {
          display: block;
          font-family: var(--font-pop);
          font-size: 1.1rem;
        }
        .foot-nav {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 10px 18px;
        }
        .foot-nav a {
          font-size: 0.88rem;
          color: var(--cocoa-soft);
        }
        .foot-nav a:hover { color: var(--kiwi-orange); }
        .family-note {
          font-size: 0.86rem;
          color: var(--cocoa-soft);
          line-height: 1.7;
          margin: 0 auto;
          max-width: 34em;
        }
        .foot-bottom {
          padding-top: 18px;
          padding-bottom: 28px;
          border-top: 1px solid rgb(var(--cocoa-rgb) / 0.1);
          font-size: 0.78rem;
          color: var(--cocoa-faint);
        }
      `}</style>
    </footer>
  );
}
