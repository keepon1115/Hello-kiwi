'use client';
import { useEffect, useRef, useState } from 'react';

// 音声差し込み用スロット。ImageSlot と同じ思想:
// ・指定パスの音声があれば <audio> で再生できる。
// ・まだ無ければ、ファイル名入りの「やさしい枠」を表示する。
export function AudioSlot({ src, label, className = '' }: { src: string; label: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.error) setFailed(true);
  }, []);

  const fileName = src.split('/').pop() ?? src;

  return (
    <span className={`audioslot ${className}`}>
      {!failed && (
        <audio ref={ref} controls preload="none" src={src} onError={() => setFailed(true)} />
      )}
      {failed && (
        <span className="audioslot-ph" aria-label={label} role="img">
          <span className="audioslot-icon" aria-hidden>
            🔊
          </span>
          <span className="audioslot-name">{fileName}</span>
        </span>
      )}

      <style jsx>{`
        .audioslot {
          display: block;
        }
        .audioslot :global(audio) {
          width: 100%;
          display: block;
        }
        .audioslot-ph {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: repeating-linear-gradient(
              135deg,
              rgb(var(--green-rgb) / 0.06) 0 12px,
              transparent 12px 24px
            ),
            rgb(var(--cream-rgb));
          border: 2px dashed rgb(var(--green-rgb) / 0.45);
          border-radius: 16px;
        }
        .audioslot-icon {
          font-size: 1.4rem;
        }
        .audioslot-name {
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 0.78rem;
          color: var(--cocoa-soft);
          word-break: break-all;
        }
      `}</style>
    </span>
  );
}
