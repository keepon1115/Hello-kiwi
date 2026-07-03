'use client';
import { useEffect, useState } from 'react';
import { ImageSlot } from './ImageSlot';

// スライド閲覧ボタン。ImageSlot と同じ「置けば自動切替」思想:
// ・ローカルPDF/その他 → 新しいタブで開く（HEADで存在確認。無ければファイル名つきプレースホルダ）
// ・ローカル画像 → タップで拡大（ImageSlot 自身が未配置を検知するのでそのまま利用）
// ・外部URL（Canva等）→ 新しいタブで開く（疎通確認はしない）
const IMAGE_EXTS = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

function getExt(src: string) {
  return src.split('?')[0].split('.').pop()?.toLowerCase() ?? '';
}

export function SlideSlot({ src, label }: { src: string; label: string }) {
  const isExternal = /^https?:\/\//i.test(src);
  const isImage = !isExternal && IMAGE_EXTS.includes(getExt(src));
  const [missing, setMissing] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isExternal || isImage) return;
    let cancelled = false;
    fetch(src, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled && !res.ok) setMissing(true);
      })
      .catch(() => {
        if (!cancelled) setMissing(true);
      });
    return () => {
      cancelled = true;
    };
  }, [src, isExternal, isImage]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (isExternal) {
    return (
      <a href={src} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
        {label}
      </a>
    );
  }

  if (isImage) {
    return (
      <>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setOpen(true)}>
          {label}
        </button>
        {open && (
          <div className="slideslot-lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
            <div className="slideslot-inner" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="slideslot-close"
                aria-label="とじる"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
              <ImageSlot src={src} label={src.split('/').pop() ?? src} alt="" />
            </div>
          </div>
        )}
        <style jsx>{`
          .slideslot-lightbox {
            position: fixed;
            inset: 0;
            z-index: 200;
            display: grid;
            place-items: center;
            background: rgba(90, 67, 41, 0.55);
            padding: 24px;
          }
          .slideslot-inner {
            position: relative;
            max-width: min(92vw, 640px);
            max-height: 86vh;
            overflow: auto;
            background: var(--page);
            border-radius: 20px;
            padding: 14px;
            box-shadow: var(--shadow-lift);
          }
          .slideslot-close {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 36px;
            height: 36px;
            border: none;
            border-radius: 50%;
            background: #fff;
            box-shadow: var(--shadow-soft);
            font-size: 1.3rem;
            line-height: 1;
            cursor: pointer;
            z-index: 1;
          }
        `}</style>
      </>
    );
  }

  if (missing) {
    const fileName = src.split('/').pop() ?? src;
    return (
      <span className="slideslot-missing">
        📄 {fileName}
        <style jsx>{`
          .slideslot-missing {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-family: var(--font-pop);
            font-size: 0.78rem;
            font-weight: 700;
            color: var(--cocoa-faint);
            padding: 0.6em 1.1em;
            border-radius: 999px;
            border: 2px dashed rgb(var(--green-rgb) / 0.45);
          }
        `}</style>
      </span>
    );
  }

  return (
    <a href={src} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
      {label}
    </a>
  );
}
