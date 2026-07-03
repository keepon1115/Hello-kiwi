'use client';
import { useState } from 'react';
import type { Faq } from '@/lib/data/faq';

// FAQ用アコーディオン。キーボード操作・aria 対応。
export function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`acc-item ${isOpen ? 'open' : ''}`}>
            <button
              className="acc-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span className="acc-mark" aria-hidden>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div className="acc-a" role="region" hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .acc {
          display: grid;
          gap: 14px;
          max-width: 760px;
          margin: 0 auto;
        }
        .acc-item {
          background: #fff;
          border-radius: 20px;
          box-shadow: var(--shadow-soft);
          border: 1px solid rgb(var(--cocoa-rgb) / 0.06);
          overflow: hidden;
        }
        .acc-item.open {
          border-color: rgb(var(--green-rgb) / 0.4);
        }
        .acc-q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 18px 22px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-round);
          font-weight: 700;
          font-size: 1rem;
          color: var(--cocoa);
        }
        .acc-mark {
          flex: none;
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgb(var(--green-rgb) / 0.16);
          color: var(--leaf-green);
          font-size: 1.2rem;
        }
        .acc-a {
          padding: 0 22px 20px;
        }
        .acc-a p {
          margin: 0;
          color: var(--cocoa-soft);
          font-size: 0.92rem;
        }
      `}</style>
    </div>
  );
}
