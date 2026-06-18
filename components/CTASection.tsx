import Link from 'next/link';
import { LINKS } from '@/lib/site';
import { ImageSlot } from './ImageSlot';

export function CTASection({
  title = 'まずは、無料体験から。',
  lead = '',
  tone
}: {
  title?: string;
  lead?: string;
  tone?: 'adult';
}) {
  return (
    <section className="cta-band section" data-tone={tone}>
      <div className="container cta-inner reveal">
        <ImageSlot
          src="/assets/images/hero/kiwi.png"
          label="kiwi"
          alt="Hello Kiwiのキャラクター"
          w={132}
          h={132}
          className="floaty cta-character"
        />
        <h2>{title}</h2>
        {lead && <p>{lead}</p>}
        <div className="cta-btns">
          <Link href="/trial" className="btn btn-primary btn-lg">
            無料体験に申し込む
          </Link>
          <a href={LINKS.line} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-lg">
            LINEで相談
          </a>
        </div>
      </div>

      <style>{`
        .cta-band {
          background:
            radial-gradient(120% 120% at 50% -20%, rgb(var(--yellow-rgb) / 0.35), transparent 60%),
            color-mix(in srgb, var(--cream) 60%, var(--leaf-green) 12%);
          text-align: center;
        }
        .cta-inner {
          max-width: 720px;
          display: grid;
          justify-items: center;
          gap: 0;
        }
        .cta-character { margin: 0 auto; overflow: visible; }
        .cta-character img { object-fit: contain; }
        .cta-band h2 {
          font-size: clamp(1.6rem, 5vw, 2.4rem);
          margin: 12px 0 10px;
        }
        .cta-band p { color: var(--cocoa-soft); margin: 0 auto; max-width: 30em; }
        .cta-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          margin: 26px 0 0;
        }
        @container (min-width: 680px) {
          .cta-inner {
            grid-template-columns: 150px 1fr;
            text-align: left;
            align-items: center;
          }
          .cta-character { grid-row: 1 / span 3; }
          .cta-btns { justify-content: flex-start; }
        }
      `}</style>
    </section>
  );
}
