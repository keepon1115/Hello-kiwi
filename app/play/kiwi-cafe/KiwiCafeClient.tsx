'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  MENU,
  ORDERS,
  WHERE_LABEL,
  describe,
  isCorrect,
  resultFor,
  type ItemId,
  type Tray,
  type Where
} from '@/lib/data/games/kiwi-cafe';
import { GameOutro } from '@/components/games/GameOutro';

type Phase = 'intro' | 'play' | 'result';

const TOTAL = ORDERS.length;
const MAX_EACH = 4;

// 飲みものは色ちがいのカップで、食べものは絵文字で見分ける。
const DRINK_LOOK: Partial<Record<ItemId, { top: string; dot?: string; small?: boolean }>> = {
  flatWhite: { top: '#d9b98a', dot: '#fff7e8' },
  longBlack: { top: '#2e2018' },
  hotChocolate: { top: '#8a5632', dot: '#ffd9e0' },
  fluffy: { top: '#ffffff', small: true }
};
const FOOD_EMOJI: Partial<Record<ItemId, string>> = {
  mincePie: '🥧',
  cheeseScone: '🧀',
  lamington: '🍫',
  pavlova: '🍓',
  anzac: '🍪'
};

function ItemPicture({ id }: { id: ItemId }) {
  const look = DRINK_LOOK[id];
  if (!look) {
    return (
      <span className="kc-pic" aria-hidden="true">
        {FOOD_EMOJI[id]}
      </span>
    );
  }
  const s = look.small ? 0.78 : 1;
  return (
    <span className="kc-pic" aria-hidden="true">
      <svg viewBox="0 0 48 48" width="1.25em" height="1.25em">
        <g transform={`translate(24 26) scale(${s}) translate(-24 -26)`}>
          <path d="M36 20h4a5 5 0 0 1 0 10h-4" fill="none" stroke="#c9b8a4" strokeWidth="3" />
          <path d="M8 16h30v12a12 12 0 0 1-12 12h-6A12 12 0 0 1 8 28z" fill="#fff" stroke="#c9b8a4" strokeWidth="2" />
          <ellipse cx="23" cy="17" rx="13" ry="4.5" fill={look.top} stroke="#c9b8a4" strokeWidth="1.5" />
          {look.dot && <ellipse cx="23" cy="17" rx="5" ry="1.8" fill={look.dot} />}
        </g>
      </svg>
    </span>
  );
}

export function KiwiCafeClient() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [index, setIndex] = useState(0);
  const [tray, setTray] = useState<Tray>({});
  const [where, setWhere] = useState<Where | null>(null);
  const [served, setServed] = useState<null | boolean>(null); // null=まだ / true=正解 / false=不正解
  const [score, setScore] = useState(0);
  const [showText, setShowText] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const order = ORDERS[index];
  const hasAudio = Boolean(order.audio);
  const textVisible = !hasAudio || showText || served !== null;
  const trayCount = MENU.reduce((n, m) => n + (tray[m.id] ?? 0), 0);
  const result = resultFor(score);

  useEffect(() => {
    if (phase !== 'intro') topRef.current?.scrollIntoView({ block: 'start' });
  }, [phase, index]);

  useEffect(() => {
    if (served !== null) nextRef.current?.focus({ preventScroll: true });
  }, [served]);

  // 音声がある注文は、出たときに一度流す（止められたら Listen ボタンで聞ける）。
  useEffect(() => {
    if (phase === 'play' && hasAudio) audioRef.current?.play().catch(() => {});
  }, [phase, index, hasAudio]);

  function resetRound() {
    setTray({});
    setWhere(null);
    setServed(null);
    setShowText(false);
  }

  function start() {
    setIndex(0);
    setScore(0);
    resetRound();
    setPhase('play');
  }

  function add(id: ItemId) {
    if (served !== null) return;
    setTray((t) => ({ ...t, [id]: Math.min(MAX_EACH, (t[id] ?? 0) + 1) }));
  }

  function remove(id: ItemId) {
    if (served !== null) return;
    setTray((t) => {
      const n = (t[id] ?? 0) - 1;
      const next = { ...t };
      if (n > 0) next[id] = n;
      else delete next[id];
      return next;
    });
  }

  function serve() {
    if (served !== null || trayCount === 0) return;
    const ok = isCorrect(order, tray, where);
    setServed(ok);
    if (ok) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= TOTAL) {
      setPhase('result');
      return;
    }
    setIndex((n) => n + 1);
    resetRound();
  }

  function listen() {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => setShowText(true));
  }

  return (
    <div className="kc" ref={topRef}>
      {phase === 'intro' && (
        <section className="kc-intro">
          <p className="eyebrow">Kiwi Café</p>
          <h1>Kiwi Café</h1>
          <p className="kc-sub">ニュージーランドのカフェで、注文をとろう</p>
          <div className="kc-counter" aria-hidden="true">
            <ItemPicture id="flatWhite" />
            <ItemPicture id="mincePie" />
            <ItemPicture id="anzac" />
          </div>
          <p className="kc-lead">
            今日はあなたがカフェの店員です。お客さんの英語の注文をよく読んで、同じものをトレイにのせてください。
            <br />
            注文は全部で{TOTAL}人。だんだん長くなり、数や言い直しも出てきます。
          </p>
          <button type="button" className="btn btn-primary btn-lg" onClick={start}>
            Open the café
          </button>
          <p className="kc-meta">約4分・メニューは英語のまま出ます</p>
        </section>
      )}

      {phase === 'play' && (
        <section className="kc-play">
          <ol className="kc-route" aria-label={`${TOTAL}人中 ${index + 1}人目`}>
            {ORDERS.map((o, i) => (
              <li key={o.text} className={i < index ? 'is-done' : i === index ? 'is-now' : ''} aria-hidden="true" />
            ))}
          </ol>

          <div className="kc-customer">
            <span className="kc-face" aria-hidden="true">
              {order.customer}
            </span>
            <div className="kc-bubble">
              <span className="kc-who">
                Customer {index + 1}/{TOTAL}
              </span>
              {hasAudio && (
                <>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <audio ref={audioRef} src={order.audio ?? undefined} preload="auto" />
                  <span className="kc-audio">
                    <button type="button" className="kc-mini" onClick={listen}>
                      ▶ Listen
                    </button>
                    {served === null && (
                      <button type="button" className="kc-mini is-quiet" onClick={() => setShowText((v) => !v)}>
                        {showText ? 'Hide text' : 'Show text'}
                      </button>
                    )}
                  </span>
                </>
              )}
              {textVisible && (
                <p className="kc-order" lang="en">
                  {order.text}
                </p>
              )}
            </div>
          </div>

          <div className="kc-tray">
            <div className="kc-tray-head" lang="en">
              <span>Tray</span>
              {trayCount === 0 && <span className="kc-tray-hint">Tap the menu below.</span>}
            </div>
            <ul className="kc-tray-items" lang="en">
              {MENU.filter((m) => tray[m.id]).map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => remove(m.id)}
                    aria-disabled={served !== null}
                    aria-label={`${tray[m.id]} ${m.name} (remove one)`}
                  >
                    <ItemPicture id={m.id} />
                    <span className="kc-qty">× {tray[m.id]}</span>
                    {m.name}
                    {served === null && (
                      <span className="kc-minus" aria-hidden="true">
                        −
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
            {order.where && (
              <div className="kc-where" role="group" aria-label="have here or takeaway" lang="en">
                {(Object.keys(WHERE_LABEL) as Where[]).map((w) => (
                  <button
                    key={w}
                    type="button"
                    aria-pressed={where === w}
                    aria-disabled={served !== null}
                    onClick={() => served === null && setWhere(w)}
                  >
                    {w === 'here' ? '🍽️' : '🛍️'} {WHERE_LABEL[w]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {served === null ? (
            <>
              <div className="kc-menu" lang="en">
                {MENU.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => add(m.id)}
                    disabled={(tray[m.id] ?? 0) >= MAX_EACH}
                  >
                    <ItemPicture id={m.id} />
                    {m.name}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-primary btn-lg kc-serve"
                onClick={serve}
                disabled={trayCount === 0 || (order.where !== undefined && where === null)}
              >
                Here you go!
              </button>
            </>
          ) : (
            <div className={`kc-feedback ${served ? 'ok' : 'ng'}`} aria-live="polite">
              <p className="kc-verdict" lang="en">
                {served ? `“${order.thanks}”` : '“Hmm, that’s not quite right.”'}
              </p>
              {!served && (
                <p className="kc-right" lang="en">
                  <span lang="ja">正しい注文：</span>
                  {describe(order.items, order.where)}
                </p>
              )}
              <p className="kc-tip">{order.tip}</p>
              <button type="button" className="btn btn-primary" onClick={next} ref={nextRef}>
                {index + 1 >= TOTAL ? '結果を見る' : 'Next customer →'}
              </button>
            </div>
          )}
        </section>
      )}

      {phase === 'result' && (
        <section className="kc-result">
          <p className="eyebrow">Closing Time</p>
          <h1>おつかれさまでした</h1>
          <div className="card kc-score">
            <p className="kc-big">
              {score}
              <span> / {TOTAL}</span>
            </p>
            <p className="kc-rank" lang="en">
              {result.title}
            </p>
            <p className="kc-message">{result.message}</p>
            <div className="kc-courses">
              <p>あなたに合いそうなコース</p>
              {result.courses.map((c) => (
                <Link key={c.slug} href={`/courses#${c.slug}`}>
                  {c.name} →
                </Link>
              ))}
            </div>
          </div>
          <button type="button" className="btn btn-ghost" onClick={start}>
            もう一度あそぶ
          </button>
          <GameOutro
            from="kiwi-cafe"
            lead="体験レッスンでは、こんな注文のやりとりを先生と実際に声に出してやってみられます。"
          >
            <Link href="/play" className="kc-other">
              ほかのゲームであそぶ →
            </Link>
          </GameOutro>
        </section>
      )}

      <style jsx>{`
        .kc {
          padding: clamp(28px, 7cqi, 48px) 16px clamp(44px, 8cqi, 72px);
          scroll-margin-top: var(--header-h);
          background: radial-gradient(90% 420px at 50% 0%, rgb(var(--orange-rgb) / 0.16), transparent 70%);
        }
        section {
          display: grid;
          gap: 14px;
          max-width: 480px;
          margin: 0 auto;
          justify-items: center;
          text-align: center;
        }
        .eyebrow { margin: 0; }
        h1 { font-size: clamp(1.8rem, 9cqi, 2.4rem); }
        .kc-intro h1 { font-family: var(--font-pop); font-weight: 800; font-size: clamp(2.2rem, 11cqi, 2.9rem); line-height: 1.1; }
        .kc-sub { margin: -6px 0 0; font-family: var(--font-round); font-weight: 700; color: var(--cocoa-soft); }
        .kc-counter {
          display: flex;
          gap: 18px;
          padding: 14px 26px;
          border-radius: 22px;
          background: #fff;
          box-shadow: var(--shadow-soft);
          font-size: 2.4rem;
        }
        .kc-lead { margin: 0; color: var(--cocoa-soft); text-align: left; }
        .kc-meta { margin: 0; font-size: 0.82rem; color: var(--cocoa-faint); }
        .kc :global(.kc-pic) { display: inline-grid; place-items: center; line-height: 1; }

        .kc-route {
          list-style: none;
          margin: 0;
          padding: 0;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(${TOTAL}, 1fr);
          gap: 6px;
        }
        .kc-route li { height: 8px; border-radius: 999px; background: rgb(var(--cocoa-rgb) / 0.12); }
        .kc-route li.is-done { background: var(--leaf-green); }
        .kc-route li.is-now { background: var(--kiwi-orange); }

        .kc-customer { width: 100%; display: grid; grid-template-columns: auto 1fr; gap: 10px; align-items: start; }
        .kc-face {
          width: 56px;
          height: 56px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #fff;
          box-shadow: var(--shadow-soft);
          font-size: 2rem;
          line-height: 1;
        }
        .kc-bubble {
          position: relative;
          display: grid;
          gap: 6px;
          padding: 12px 16px 14px;
          border-radius: 6px 22px 22px 22px;
          background: #fff;
          box-shadow: var(--shadow-soft);
          text-align: left;
          min-height: 92px;
          align-content: start;
        }
        .kc-who {
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          color: var(--kiwi-orange);
        }
        .kc-order {
          margin: 0;
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 1.3rem;
          line-height: 1.4;
          overflow-wrap: anywhere;
        }
        .kc-audio { display: flex; gap: 8px; flex-wrap: wrap; }
        .kc-mini {
          min-height: 44px;
          padding: 0 16px;
          border: none;
          border-radius: 999px;
          background: var(--kiwi-orange);
          color: #fff;
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
        }
        .kc-mini.is-quiet { background: rgb(var(--cocoa-rgb) / 0.08); color: var(--cocoa); }

        .kc-tray {
          width: 100%;
          display: grid;
          gap: 8px;
          padding: 12px;
          border-radius: 20px;
          background: color-mix(in srgb, var(--cocoa) 12%, #fff);
          border: 2px solid rgb(var(--cocoa-rgb) / 0.18);
          text-align: left;
        }
        .kc-tray-head {
          display: flex;
          gap: 10px;
          align-items: baseline;
          font-family: var(--font-pop);
          font-weight: 700;
        }
        .kc-tray-hint { font-weight: 500; font-size: 0.9rem; color: var(--cocoa-soft); }
        .kc-tray-items {
          list-style: none;
          margin: 0;
          padding: 0;
          min-height: 48px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .kc-tray-items button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 44px;
          padding: 4px 12px;
          border: none;
          border-radius: 999px;
          background: #fff;
          color: var(--cocoa);
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 2px 0 rgb(var(--cocoa-rgb) / 0.18);
        }
        .kc-tray-items button[aria-disabled='true'] { cursor: default; }
        .kc-qty { color: var(--kiwi-orange); font-variant-numeric: tabular-nums; }
        .kc-minus {
          width: 22px;
          height: 22px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgb(var(--cocoa-rgb) / 0.1);
          font-size: 0.9rem;
        }
        .kc-where { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .kc-where button {
          min-height: 46px;
          border: 2px solid rgb(var(--cocoa-rgb) / 0.2);
          border-radius: 14px;
          background: #fff;
          color: var(--cocoa);
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
        }
        .kc-where button[aria-pressed='true'] {
          border-color: var(--kiwi-orange);
          background: rgb(var(--orange-rgb) / 0.12);
        }
        .kc-where button[aria-disabled='true'] { cursor: default; }

        .kc-menu { width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .kc-menu button {
          display: grid;
          justify-items: center;
          align-content: center;
          gap: 4px;
          min-height: 84px;
          padding: 8px 4px;
          border: 2px solid rgb(var(--cocoa-rgb) / 0.1);
          border-radius: 16px;
          background: #fff;
          color: var(--cocoa);
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 0.92rem;
          line-height: 1.15;
          cursor: pointer;
          transition: transform 0.1s ease, border-color 0.15s ease;
        }
        .kc-menu button :global(.kc-pic) { font-size: 1.7rem; }
        .kc-menu button:hover:not(:disabled) { border-color: var(--kiwi-orange); }
        .kc-menu button:active:not(:disabled) { transform: scale(0.96); }
        .kc-menu button:disabled { opacity: 0.45; cursor: default; }
        .kc-play :global(.kc-serve) { width: 100%; }
        .kc-play :global(.btn:disabled) { opacity: 0.45; cursor: default; transform: none; }

        .kc-feedback {
          width: 100%;
          display: grid;
          gap: 10px;
          padding: 16px;
          border-radius: 20px;
          background: #fff;
          box-shadow: var(--shadow-soft);
          text-align: left;
        }
        .kc-verdict { margin: 0; font-family: var(--font-pop); font-weight: 800; font-size: 1.35rem; line-height: 1.3; }
        .kc-feedback.ok .kc-verdict { color: color-mix(in srgb, var(--leaf-green) 70%, var(--cocoa)); }
        .kc-feedback.ng .kc-verdict { color: color-mix(in srgb, var(--kiwi-orange) 80%, var(--cocoa)); }
        .kc-right { margin: 0; font-family: var(--font-pop); font-weight: 700; }
        .kc-right span { font-family: var(--font-body); font-size: 0.85rem; color: var(--cocoa-soft); }
        .kc-tip { margin: 0; font-size: 0.95rem; }

        .kc-score { width: 100%; display: grid; justify-items: center; gap: 4px; }
        .kc-big {
          margin: 0;
          font-family: var(--font-pop);
          font-weight: 800;
          font-size: 4.6rem;
          line-height: 1;
          color: var(--kiwi-orange);
        }
        .kc-big span { font-size: 1.8rem; color: var(--cocoa-soft); }
        .kc-rank { margin: 4px 0 0; font-family: var(--font-pop); font-weight: 800; font-size: 1.6rem; }
        .kc-message { margin: 8px 0 0; text-align: left; }
        .kc-courses {
          width: 100%;
          display: grid;
          gap: 8px;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px dashed rgb(var(--cocoa-rgb) / 0.2);
        }
        .kc-courses p { margin: 0; font-size: 0.85rem; font-weight: 700; color: var(--cocoa-soft); }
        .kc-courses :global(a) {
          display: block;
          padding: 12px 14px;
          border-radius: 14px;
          background: rgb(var(--green-rgb) / 0.14);
          font-family: var(--font-round);
          font-weight: 700;
        }
        .kc-result :global(.kc-other) {
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: underline;
          color: var(--cocoa);
        }
      `}</style>
    </div>
  );
}
