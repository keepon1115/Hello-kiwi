import Link from 'next/link';
import { SITE } from '@/lib/site';

// ゲームの結果画面の最後に置く、体験レッスンへの案内。
// 打ち出しの順番（近い・1対1・手頃）をここでも守る。
// from は「どのゲームから来たか」を /trial に渡す目印。
export function GameOutro({
  from,
  lead,
  children
}: {
  from: string;
  lead: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="game-outro">
      <p className="game-outro-lead">{lead}</p>
      <ul className="game-outro-points">
        <li>{SITE.address.access}</li>
        <li>先生と1対1</li>
        <li>1回50分</li>
      </ul>
      <Link href={`/trial?from=${from}`} className="btn btn-primary btn-lg">
        無料体験に申し込む
      </Link>
      {children}

      <style>{`
        .game-outro {
          display: grid;
          justify-items: center;
          gap: 14px;
          text-align: center;
          padding: 22px 18px;
          border-radius: 24px;
          background: rgb(var(--yellow-rgb) / 0.22);
        }
        .game-outro-lead {
          margin: 0;
          font-family: var(--font-round);
          font-weight: 700;
          line-height: 1.6;
        }
        .game-outro-points {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }
        .game-outro-points li {
          background: #fff;
          border-radius: 999px;
          padding: 0.3em 0.9em;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--cocoa);
        }
      `}</style>
    </div>
  );
}
