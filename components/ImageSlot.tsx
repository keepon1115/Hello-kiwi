'use client';
import { useEffect, useRef, useState } from 'react';

// 画像差し込み用スロット。
// ・指定パスに画像があれば、そのまま表示する。
// ・まだ無ければ、ファイル名・推奨サイズ入りの「やさしい枠」を表示する。
//   → 後から public 配下に同名で置けば自動で切り替わる（差し込み箇所が一目でわかる）。
// 全アセットの一覧は ASSETS.md を参照。
export function ImageSlot({
  src,
  label,
  alt = '',
  ratio,
  w,
  h,
  round = false,
  className = '',
  priority = false
}: {
  src: string;
  label: string;
  alt?: string;
  ratio?: string; // 例 "16/9" "4/3" "1/1"
  w?: number;
  h?: number;
  round?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // SSR で出力した <img> がハイドレーション前に 404 すると onError を取りこぼすため、
  // マウント時に「読み込み済みなのに naturalWidth が 0」＝失敗、を検知して切り替える。
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  const fileName = src.split('/').pop() ?? src;
  const style: React.CSSProperties = {
    aspectRatio: ratio,
    width: w ? `${w}px` : ratio ? '100%' : undefined,
    height: h ? `${h}px` : undefined,
    borderRadius: round ? '50%' : undefined
  };

  return (
    <span className={`imgslot ${failed ? 'is-empty' : 'is-filled'} ${className}`} style={style}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <span className="imgslot-ph" aria-label={alt || label} role="img">
          <span className="imgslot-kiwi" aria-hidden>
            🥝
          </span>
          <span className="imgslot-name">{fileName}</span>
          {(w || h || ratio) && (
            <span className="imgslot-size">
              {w && h ? `${w}×${h}` : ratio ? `ratio ${ratio}` : ''}
            </span>
          )}
        </span>
      )}

      <style jsx>{`
        .imgslot {
          display: block;
          position: relative;
          max-width: 100%;
          overflow: hidden;
          line-height: 0;
        }
        .imgslot :global(img) {
          width: 100%;
          height: 100%;
          min-width: 0;
          object-fit: cover;
          display: block;
          border-radius: inherit;
        }
        .imgslot.is-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          background: repeating-linear-gradient(
              135deg,
              rgb(var(--green-rgb) / 0.06) 0 12px,
              transparent 12px 24px
            ),
            rgb(var(--cream-rgb));
          border: 2px dashed rgb(var(--green-rgb) / 0.45);
          border-radius: ${round ? '50%' : '18px'};
          min-height: 80px;
        }
        .imgslot-ph {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 14px;
          text-align: center;
          line-height: 1.4;
        }
        .imgslot-kiwi {
          font-size: 1.8rem;
        }
        .imgslot-name {
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 0.74rem;
          color: var(--cocoa-soft);
          word-break: break-all;
        }
        .imgslot-size {
          font-size: 0.66rem;
          color: var(--cocoa-faint);
        }
      `}</style>
    </span>
  );
}
