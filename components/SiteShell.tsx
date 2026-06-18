'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LINKS } from '@/lib/site';
import { Nav } from './Nav';
import { RightRail } from './RightRail';
import { Footer } from './Footer';
import { ImageSlot } from './ImageSlot';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in)');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            ob.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => ob.observe(el));
    return () => ob.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 220);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="site-header">
        <button
          className={`hamburger ${open ? 'is-open' : ''}`}
          aria-label="メニューを開く"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <Link href="/" className="sh-logo" aria-label="Hello Kiwiトップへ">
          <ImageSlot
            src="/assets/images/hero/Hello-Kiwilogo4.png"
            label="Hello Kiwi logo"
            alt="Hello Kiwi 英会話"
            w={196}
            h={35}
            className="brand-logo"
          />
        </Link>
        <Link href="/trial" className="btn btn-primary btn-sm sh-cta">
          無料体験
        </Link>
      </header>

      <div className={`drawer ${open ? 'is-open' : ''}`}>
        <Nav onLinkClick={() => setOpen(false)} />
        <div className="drawer-cta">
          <Link href="/trial" className="btn btn-primary" onClick={() => setOpen(false)}>
            無料体験に申し込む
          </Link>
          <a href={LINKS.line} target="_blank" rel="noopener noreferrer" className="btn btn-line">
            LINEで相談
          </a>
        </div>
      </div>
      <button
        className={`drawer-overlay ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />

      <div className="site-grid">
        <aside className="site-left">
          <Link href="/" className="left-brand" aria-label="Hello Kiwiトップへ">
            <ImageSlot
              src="/assets/images/hero/Hello-Kiwilogo4.png"
              label="Hello Kiwi logo"
              alt="Hello Kiwi 英会話"
              w={254}
              h={45}
              className="brand-logo"
            />
          </Link>
          <Nav />
          <div className="left-foot">
            <Link href="/trial" className="btn btn-primary btn-sm">
              無料体験に申し込む
            </Link>
          </div>
        </aside>

        <div className="site-main">{children}</div>

        <aside className="site-right">
          <RightRail />
        </aside>
      </div>

      <Footer currentPath={pathname ?? ''} />

      {!pathname?.startsWith('/trial') && (
        <a href={LINKS.line} target="_blank" rel="noopener noreferrer" className="fab" aria-label="LINEで相談">
          LINEで相談
        </a>
      )}

      <button
        type="button"
        className={`page-top ${showTop ? 'is-visible' : ''}`}
        aria-label="ページトップへ"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="page-top-label">TOPへ！</span>
        <ImageSlot
          src="/assets/images/hero/kiwi4.png"
          label="kiwi4"
          alt=""
          w={54}
          h={54}
          className="page-top-img"
        />
      </button>
    </>
  );
}
