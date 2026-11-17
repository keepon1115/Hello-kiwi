'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ART,
  EMPTY_OUTFIT,
  GRID,
  ITEMS,
  PLACES,
  POINTS,
  drawItemThumb,
  drawKiwi,
  drawWarped,
  findEmptyCells,
  type Item,
  type Outfit,
  type Place,
  type Tab
} from '@/lib/data/games/kiwi-dress-up';
import { GameOutro } from '@/components/games/GameOutro';

const TABS: { id: Tab; label: string }[] = [
  { id: 'head', label: 'Head' },
  { id: 'face', label: 'Face' },
  { id: 'body', label: 'Body' },
  { id: 'feet', label: 'Feet' },
  { id: 'place', label: 'Place' }
];

const REACH = 0.17; // つまんだ点から、どこまで一緒に動くか（絵の一辺に対する割合）
const MAX_PULL = 0.42; // 一度に引っ張れる長さの上限
const OUCH = ['Whoa!', 'Hey!', 'Stretchy!', 'Wheee!', 'Oi!'];
const THUMB = 96;

type Bubble = { text: string; gloss?: string };

function Thumb({ paint }: { paint: (c: CanvasRenderingContext2D, size: number) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current?.getContext('2d');
    if (c) paint(c, THUMB);
  }, [paint]);
  return <canvas ref={ref} width={THUMB} height={THUMB} aria-hidden="true" />;
}

// サムネイルの描き方は変わらないので、一度だけ作っておく。
const ITEM_PAINT = new Map(
  ITEMS.map((it) => [it.id, (c: CanvasRenderingContext2D, s: number) => drawItemThumb(c, it, s)])
);
const PLACE_PAINT = new Map(
  PLACES.map((p) => [p.id, (c: CanvasRenderingContext2D, s: number) => p.draw(c, s)])
);

export function KiwiDressUpClient() {
  const [outfit, setOutfit] = useState<Outfit>(EMPTY_OUTFIT);
  const [placeId, setPlaceId] = useState(PLACES[0].id);
  const [tab, setTab] = useState<Tab>('head');
  const [bubble, setBubble] = useState<Bubble>({ text: 'Kia ora! Pull me!' });
  const [touched, setTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const texRef = useRef<HTMLCanvasElement | null>(null);
  const emptyRef = useRef<Uint8Array>(new Uint8Array(GRID * GRID));
  const off = useRef(new Float32Array(POINTS * 2)); // 各点のずれ
  const vel = useRef(new Float32Array(POINTS * 2)); // 戻るときの速さ
  const drag = useRef<{ id: number; gx: number; gy: number; start: Float32Array; w: Float32Array } | null>(null);
  const raf = useRef(0);
  const springing = useRef(false);
  const placeRef = useRef<Place>(PLACES[0]);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const tex = texRef.current;
    const c = canvas?.getContext('2d');
    if (!canvas || !tex || !c) return;
    const size = canvas.width;
    c.setTransform(1, 0, 0, 1, 0, 0);
    placeRef.current.draw(c, size);
    drawWarped(c, tex, off.current, emptyRef.current, size);
  }, []);

  // 何度呼ばれても、次の描画のタイミングで1回だけ描く。
  const requestPaint = useCallback(() => {
    if (raf.current || springing.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      paint();
    });
  }, [paint]);

  // 服が変わったら、元の絵を描き直す。
  useEffect(() => {
    if (!texRef.current) {
      const t = document.createElement('canvas');
      t.width = ART;
      t.height = ART;
      texRef.current = t;
    }
    const c = texRef.current.getContext('2d', { willReadFrequently: true });
    if (!c) return;
    drawKiwi(c, outfit);
    emptyRef.current = findEmptyCells(texRef.current);
    requestPaint();
  }, [outfit, requestPaint]);

  useEffect(() => {
    placeRef.current = PLACES.find((p) => p.id === placeId) ?? PLACES[0];
    requestPaint();
  }, [placeId, requestPaint]);

  // 表示サイズに合わせて、キャンバスの画素数を決める。
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fit = () => {
      const px = Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2));
      if (px > 0 && canvas.width !== px) {
        canvas.width = px;
        canvas.height = px;
      }
      paint();
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf.current);
      raf.current = 0;
      springing.current = false;
    };
  }, [paint]);

  function pointAt(e: React.PointerEvent<HTMLCanvasElement>): [number, number] {
    const r = e.currentTarget.getBoundingClientRect();
    return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
  }

  // つまんだ点に近い点ほど、強く一緒に動く。
  function weightsFor(gx: number, gy: number): Float32Array {
    const w = new Float32Array(POINTS);
    const o = off.current;
    for (let n = 0; n < POINTS; n++) {
      const x = (n % (GRID + 1)) / GRID + o[n * 2];
      const y = Math.floor(n / (GRID + 1)) / GRID + o[n * 2 + 1];
      const d2 = (x - gx) ** 2 + (y - gy) ** 2;
      w[n] = Math.exp(-d2 / (REACH * REACH));
    }
    return w;
  }

  function pull(start: Float32Array, w: Float32Array, dx: number, dy: number) {
    const len = Math.hypot(dx, dy);
    if (len > MAX_PULL) {
      dx *= MAX_PULL / len;
      dy *= MAX_PULL / len;
    }
    const o = off.current;
    for (let n = 0; n < POINTS; n++) {
      o[n * 2] = start[n * 2] + dx * w[n];
      o[n * 2 + 1] = start[n * 2 + 1] + dy * w[n];
    }
  }

  function onDown(e: React.PointerEvent<HTMLCanvasElement>) {
    if (drag.current) return;
    springing.current = false;
    vel.current.fill(0);
    const [gx, gy] = pointAt(e);
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id: e.pointerId, gx, gy, start: off.current.slice(), w: weightsFor(gx, gy) };
    setTouched(true);
  }

  function onMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const [x, y] = pointAt(e);
    pull(d.start, d.w, x - d.gx, y - d.gy);
    requestPaint();
  }

  function onUp(e: React.PointerEvent<HTMLCanvasElement>) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const [x, y] = pointAt(e);
    drag.current = null;
    if (Math.hypot(x - d.gx, y - d.gy) > 0.04) {
      setBubble({ text: OUCH[Math.floor(Math.random() * OUCH.length)] });
    }
  }

  // ぷるんと揺れながら、元の形に戻る。
  function boing() {
    drag.current = null;
    setBubble({ text: 'Boing!' });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      off.current.fill(0);
      vel.current.fill(0);
      paint();
      return;
    }
    if (springing.current) return;
    cancelAnimationFrame(raf.current);
    raf.current = 0;
    springing.current = true;
    let last = performance.now();
    const step = (now: number) => {
      if (!springing.current) return;
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const o = off.current;
      const v = vel.current;
      let energy = 0;
      for (let n = 0; n < o.length; n++) {
        v[n] += (-190 * o[n] - 7.5 * v[n]) * dt;
        o[n] += v[n] * dt;
        energy += Math.abs(o[n]) + Math.abs(v[n]) * 0.05;
      }
      if (energy < 0.004) {
        o.fill(0);
        v.fill(0);
        springing.current = false;
      }
      paint();
      if (springing.current) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // さわらなくても遊べるように、てきとうに何か所か引っ張る。
  function surprise() {
    springing.current = false;
    vel.current.fill(0);
    for (let k = 0; k < 3; k++) {
      const gx = 0.3 + Math.random() * 0.4;
      const gy = 0.25 + Math.random() * 0.55;
      const a = Math.random() * Math.PI * 2;
      const len = 0.06 + Math.random() * 0.1;
      pull(off.current.slice(), weightsFor(gx, gy), Math.cos(a) * len, Math.sin(a) * len);
    }
    setTouched(true);
    setBubble({ text: OUCH[Math.floor(Math.random() * OUCH.length)] });
    requestPaint();
  }

  function wear(it: Item) {
    const on = outfit[it.slot] !== it.id;
    setOutfit((o) => ({ ...o, [it.slot]: on ? it.id : null }));
    setBubble(on ? { text: it.say, gloss: it.gloss } : { text: 'OK!' });
    setTouched(true);
  }

  function go(p: Place) {
    setPlaceId(p.id);
    setBubble({ text: p.say, gloss: p.gloss });
    setTouched(true);
  }

  async function save() {
    const tex = texRef.current;
    if (!tex) return;
    setBusy(true);
    setNote('');
    try {
      const S = 1024;
      const out = document.createElement('canvas');
      out.width = S;
      out.height = S;
      const c = out.getContext('2d');
      if (!c) throw new Error('no canvas');
      placeRef.current.draw(c, S);
      drawWarped(c, tex, off.current, emptyRef.current, S);
      // 丸く切り抜かれても残るよう、名前は下の中央に小さく入れる。
      const pop = getComputedStyle(document.documentElement).getPropertyValue('--font-pop').trim() || 'sans-serif';
      c.font = `800 34px ${pop}`;
      c.textAlign = 'center';
      c.lineWidth = 8;
      c.lineJoin = 'round';
      c.strokeStyle = 'rgba(255,255,255,0.85)';
      c.strokeText('Hello Kiwi', S / 2, S - 44);
      c.fillStyle = '#5a4329';
      c.fillText('Hello Kiwi', S / 2, S - 44);

      const blob = await new Promise<Blob | null>((r) => out.toBlob(r, 'image/png'));
      if (!blob) throw new Error('no image');
      const file = new File([blob], 'my-kiwi.png', { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-kiwi.png';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        setNote('画像を保存しました。');
      }
      setSaved(true);
    } catch (e) {
      if (!(e instanceof DOMException && e.name === 'AbortError')) {
        setNote('画像を作れませんでした。画面を撮って保存してください。');
      }
    } finally {
      setBusy(false);
    }
  }

  const list = tab === 'place' ? [] : ITEMS.filter((i) => i.slot === tab);

  return (
    <div className="kd">
      <section>
        <header className="kd-head">
          <p className="eyebrow">Kiwi Dress-Up</p>
          <h1>Kiwi Dress-Up</h1>
          <p className="kd-sub">着せかえて、ひっぱって、アイコンにしよう</p>
        </header>

        <div className="kd-bubble" role="status">
          <strong lang="en">{bubble.text}</strong>
          {bubble.gloss && <span>{bubble.gloss}</span>}
        </div>

        <div className="kd-stage">
          <canvas
            ref={canvasRef}
            width={720}
            height={720}
            role="img"
            aria-label="着せかえ中のキウイ。指やマウスでつまんで引っ張れます。"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          />
          {!touched && <p className="kd-hint">👆 つまんで、ひっぱってみよう</p>}
        </div>

        <div className="kd-actions" lang="en">
          <button type="button" className="btn btn-ghost" onClick={boing}>
            Boing!
          </button>
          <button type="button" className="btn btn-ghost" onClick={surprise}>
            Surprise!
          </button>
          <button type="button" className="btn btn-primary kd-save" onClick={save} disabled={busy}>
            {busy ? 'Saving…' : 'Save as icon'}
          </button>
        </div>
        <p className="kd-note" aria-live="polite">
          {note}
        </p>

        <div className="kd-panel">
          <div className="kd-tabs" role="tablist" aria-label="着せかえの種類" lang="en">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="kd-items" role="tabpanel" lang="en">
            {list.map((it) => (
              <button key={it.id} type="button" aria-pressed={outfit[it.slot] === it.id} onClick={() => wear(it)}>
                <Thumb paint={ITEM_PAINT.get(it.id)!} />
                {it.name}
              </button>
            ))}
            {tab === 'place' &&
              PLACES.map((p) => (
                <button key={p.id} type="button" aria-pressed={placeId === p.id} onClick={() => go(p)}>
                  <Thumb paint={PLACE_PAINT.get(p.id)!} />
                  {p.name}
                </button>
              ))}
          </div>
        </div>

        {saved && (
          <GameOutro
            from="kiwi-dress-up"
            lead="できあがったキウイは、アイコンに使ってください。英語も、こんなふうに遊びながらはじめられます。"
          >
            <Link href="/play" className="kd-other">
              ほかのゲームであそぶ →
            </Link>
          </GameOutro>
        )}
      </section>

      <style jsx>{`
        .kd {
          padding: clamp(24px, 6cqi, 40px) 16px clamp(44px, 8cqi, 72px);
          background: radial-gradient(90% 420px at 50% 0%, rgb(var(--green-rgb) / 0.2), transparent 70%);
        }
        section {
          display: grid;
          gap: 12px;
          max-width: 480px;
          margin: 0 auto;
          justify-items: center;
          text-align: center;
        }
        .kd-head { display: grid; gap: 2px; justify-items: center; }
        .eyebrow { margin: 0; }
        h1 { font-family: var(--font-pop); font-weight: 800; font-size: clamp(1.9rem, 9cqi, 2.4rem); line-height: 1.1; }
        .kd-sub { margin: 4px 0 0; font-family: var(--font-round); font-weight: 700; font-size: 0.92rem; color: var(--cocoa-soft); }

        .kd-bubble {
          position: relative;
          display: grid;
          gap: 2px;
          min-height: 64px;
          align-content: center;
          padding: 8px 20px;
          border-radius: 22px;
          background: #fff;
          box-shadow: var(--shadow-soft);
        }
        .kd-bubble::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -9px;
          width: 18px;
          height: 18px;
          margin-left: -9px;
          background: #fff;
          transform: rotate(45deg);
          border-radius: 3px;
        }
        .kd-bubble strong { font-family: var(--font-pop); font-weight: 800; font-size: 1.3rem; line-height: 1.2; }
        .kd-bubble span { font-size: 0.8rem; color: var(--cocoa-soft); line-height: 1.4; }

        .kd-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: var(--shadow-lift);
          background: var(--cream);
        }
        .kd-stage canvas {
          display: block;
          width: 100%;
          height: 100%;
          touch-action: none;
          cursor: grab;
          -webkit-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
        }
        .kd-stage canvas:active { cursor: grabbing; }
        .kd-hint {
          position: absolute;
          left: 50%;
          bottom: 14px;
          transform: translateX(-50%);
          margin: 0;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.9);
          font-family: var(--font-round);
          font-weight: 700;
          font-size: 0.88rem;
          white-space: nowrap;
          pointer-events: none;
        }

        .kd-actions { width: 100%; display: grid; grid-template-columns: auto auto 1fr; gap: 8px; }
        .kd-actions :global(.btn) { padding-left: 1.1em; padding-right: 1.1em; }
        .kd-actions :global(.btn:disabled) { opacity: 0.5; cursor: default; transform: none; }
        .kd-note { margin: -4px 0 0; min-height: 1.3em; font-size: 0.85rem; color: var(--cocoa-soft); }

        .kd-panel {
          width: 100%;
          display: grid;
          gap: 10px;
          padding: 12px;
          border-radius: 22px;
          background: #fff;
          box-shadow: var(--shadow-soft);
        }
        .kd-tabs { display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; }
        .kd-tabs button {
          min-height: 44px;
          border: none;
          border-radius: 12px;
          background: rgb(var(--cocoa-rgb) / 0.06);
          color: var(--cocoa);
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
        }
        .kd-tabs button[aria-selected='true'] { background: var(--kiwi-orange); color: #fff; }
        .kd-items { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; min-height: 116px; }
        .kd-items button {
          display: grid;
          justify-items: center;
          align-content: start;
          gap: 2px;
          padding: 6px 2px 8px;
          border: 2px solid rgb(var(--cocoa-rgb) / 0.1);
          border-radius: 16px;
          background: var(--page);
          color: var(--cocoa);
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 0.85rem;
          line-height: 1.15;
          cursor: pointer;
        }
        .kd-items button :global(canvas) { width: 100%; max-width: 68px; height: auto; border-radius: 10px; }
        .kd-items button[aria-pressed='true'] {
          border-color: var(--kiwi-orange);
          background: rgb(var(--orange-rgb) / 0.12);
        }
        .kd :global(.kd-other) {
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: underline;
          color: var(--cocoa);
        }
      `}</style>
    </div>
  );
}
