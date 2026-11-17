'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SITE } from '@/lib/site';
import { QUIZ_QUESTIONS, rankFor } from '@/lib/data/games/kiwi-quiz';
import { GameOutro } from '@/components/games/GameOutro';

type Phase = 'intro' | 'play' | 'result';

const TOTAL = QUIZ_QUESTIONS.length;
const KIWI_SRC = '/assets/images/hero/kiwi.png';

// 結果を1枚の画像（Instagramストーリーズの縦長比率）にする。
async function makeResultImage(score: number): Promise<Blob | null> {
  const W = 1080;
  const H = 1920;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const css = getComputedStyle(document.documentElement);
  const round = css.getPropertyValue('--font-round').trim() || 'sans-serif';
  const pop = css.getPropertyValue('--font-pop').trim() || 'sans-serif';
  const rank = rankFor(score);
  const percent = Math.round((score / TOTAL) * 100);

  // 日本語フォントは使う文字ぶんだけ遅れて読み込まれるので、描く前に待つ。
  try {
    await Promise.all([
      document.fonts.load(`700 60px ${round}`, `Kiwi度チェック${rank.title}近鉄八尾から徒歩分対問中正解`),
      document.fonts.load(`800 60px ${pop}`, '0123456789% Hello Kiwi')
    ]);
  } catch {
    // フォントが読めなくても、代わりの書体で描く。
  }

  ctx.fillStyle = '#faf5ea';
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, 1100);
  glow.addColorStop(0, 'rgba(255, 222, 89, 0.55)');
  glow.addColorStop(1, 'rgba(255, 222, 89, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ee6c2b';
  ctx.font = `800 54px ${pop}`;
  ctx.fillText('HELLO KIWI', W / 2, 250);
  ctx.fillStyle = '#5a4329';
  ctx.font = `700 84px ${round}`;
  ctx.fillText('Kiwi度チェック', W / 2, 370);

  // 白いカード
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(90, 470, W - 180, 960, 60);
  ctx.fill();

  try {
    const img = new Image();
    img.src = KIWI_SRC;
    await img.decode();
    const iw = 420;
    const ih = (iw * img.naturalHeight) / img.naturalWidth;
    ctx.drawImage(img, (W - iw) / 2, 510, iw, ih);
  } catch {
    // 画像が無くても結果は出す。
  }

  ctx.fillStyle = '#ee6c2b';
  ctx.font = `800 260px ${pop}`;
  ctx.fillText(`${percent}%`, W / 2, 1120);
  ctx.fillStyle = '#5a4329';
  ctx.font = `700 76px ${round}`;
  ctx.fillText(rank.title, W / 2, 1250);
  ctx.fillStyle = '#7a6650';
  ctx.font = `700 44px ${round}`;
  ctx.fillText(`${TOTAL}問中 ${score}問 正解`, W / 2, 1340);

  ctx.fillStyle = '#5a4329';
  ctx.font = `700 46px ${round}`;
  ctx.fillText('Hello Kiwi 英会話', W / 2, 1580);
  ctx.fillStyle = '#7a6650';
  ctx.font = `700 38px ${round}`;
  ctx.fillText(`${SITE.address.access}・1対1の英会話`, W / 2, 1650);
  ctx.font = `700 36px ${pop}`;
  ctx.fillText(SITE.url.replace('https://', '') + '/play', W / 2, 1720);

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}

export function KiwiQuizClient() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');
  const topRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const q = QUIZ_QUESTIONS[index];
  const answered = picked !== null;
  const rank = rankFor(score);
  const percent = Math.round((score / TOTAL) * 100);

  // 画面が切り替わったら、ゲームの先頭が見える位置に戻す。
  useEffect(() => {
    if (phase === 'intro') return;
    topRef.current?.scrollIntoView({ block: 'start' });
  }, [phase, index]);

  useEffect(() => {
    if (answered) nextRef.current?.focus({ preventScroll: true });
  }, [answered]);

  function start() {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setNote('');
    setPhase('play');
  }

  function pick(i: number) {
    if (answered) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= TOTAL) {
      setPhase('result');
      return;
    }
    setIndex((n) => n + 1);
    setPicked(null);
  }

  async function shareResult() {
    setBusy(true);
    setNote('');
    try {
      const blob = await makeResultImage(score);
      if (!blob) throw new Error('no image');
      const file = new File([blob], 'kiwi-check.png', { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          text: `Kiwi度は${percent}%（${rank.title}）でした。 #HelloKiwi英会話`
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'kiwi-check.png';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        setNote('画像を保存しました。');
      }
    } catch (e) {
      // 共有シートを閉じただけなら何も言わない。
      if (!(e instanceof DOMException && e.name === 'AbortError')) {
        setNote('画像を作れませんでした。画面を撮って保存してください。');
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="kq" ref={topRef}>
      {phase === 'intro' && (
        <section className="kq-intro">
          <p className="eyebrow">Kiwi Check</p>
          <h1>Kiwi度チェック</h1>
          <p className="kq-sub">3分でめぐる、ニュージーランド英語の旅</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={KIWI_SRC} alt="" width={185} height={160} className="kq-hero floaty" />
          <p className="kq-lead">
            北のオークランドから南のスチュアート島まで、7つの町をめぐります。
            <br />
            出てくるのは、教科書にはあまり載っていないNZの英語。3つの中からえらんでください。
          </p>
          <button type="button" className="btn btn-primary btn-lg" onClick={start}>
            旅をはじめる
          </button>
          <p className="kq-meta">全7問・むずかしい単語は出ません</p>
        </section>
      )}

      {phase === 'play' && (
        <section className="kq-play">
          <ol className="kq-route" aria-label={`${TOTAL}問中 ${index + 1}問目`}>
            {QUIZ_QUESTIONS.map((item, i) => (
              <li
                key={item.place}
                className={i < index ? 'is-done' : i === index ? 'is-now' : ''}
                aria-hidden="true"
              />
            ))}
          </ol>
          <p className="kq-place">
            <span className="kq-stop">
              Stop {index + 1}/{TOTAL}
            </span>
            <strong>{q.place}</strong>
            <span className="kq-place-ja">{q.placeJa}</span>
          </p>

          <div className="card kq-card">
            <p className="kq-scene">{q.scene}</p>
            <p className="kq-phrase" lang="en">
              “{q.phrase}”
            </p>
            <h2 className="kq-question">{q.question}</h2>
            <div className="kq-choices">
              {q.choices.map((c, i) => {
                const state = !answered
                  ? ''
                  : i === q.answer
                    ? 'is-correct'
                    : i === picked
                      ? 'is-wrong'
                      : 'is-dim';
                return (
                  <button
                    key={c}
                    type="button"
                    className={`kq-choice ${state}`}
                    onClick={() => pick(i)}
                    aria-disabled={answered}
                  >
                    <span className="kq-mark" aria-hidden="true">
                      {state === 'is-correct' ? '○' : state === 'is-wrong' ? '×' : 'ABC'[i]}
                    </span>
                    {c}
                  </button>
                );
              })}
            </div>

            <div className="kq-feedback" aria-live="polite">
              {answered && (
                <>
                  <p className={`kq-verdict ${picked === q.answer ? 'ok' : 'ng'}`}>
                    {picked === q.answer ? 'Sweet as! 正解' : `おしい！ 正解は「${q.choices[q.answer]}」`}
                  </p>
                  <p className="kq-explain">{q.explain}</p>
                  <button type="button" className="btn btn-primary" onClick={next} ref={nextRef}>
                    {index + 1 >= TOTAL ? '結果を見る' : '次の町へ →'}
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {phase === 'result' && (
        <section className="kq-result">
          <p className="eyebrow">Your Result</p>
          <h1>あなたのKiwi度は</h1>
          <div className="card kq-score">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={KIWI_SRC} alt="" width={148} height={128} />
            <p className="kq-percent">
              {percent}
              <span>%</span>
            </p>
            <p className="kq-rank">{rank.title}</p>
            <p className="kq-count">
              {TOTAL}問中 {score}問 正解
            </p>
            <p className="kq-message">{rank.message}</p>
          </div>

          <div className="kq-actions">
            <button type="button" className="btn btn-ghost" onClick={shareResult} disabled={busy}>
              {busy ? '画像を作っています…' : '結果を画像でシェア・保存'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={start}>
              もう一度あそぶ
            </button>
          </div>
          <p className="kq-note" aria-live="polite">
            {note}
          </p>

          <GameOutro
            from="kiwi-quiz"
            lead="今日の7つの言葉を、次はニュージーランド育ちの先生と声に出して使ってみませんか。"
          >
            <Link href="/play/code-the-kiwi" className="kq-other">
              もうひとつのゲーム「Code the Kiwi」であそぶ →
            </Link>
          </GameOutro>
        </section>
      )}

      <style jsx>{`
        .kq {
          padding: clamp(28px, 7cqi, 48px) 20px clamp(44px, 8cqi, 72px);
          scroll-margin-top: var(--header-h);
          background: radial-gradient(90% 420px at 50% 0%, rgb(var(--yellow-rgb) / 0.3), transparent 70%);
        }
        section {
          display: grid;
          gap: 16px;
          max-width: 480px;
          margin: 0 auto;
          justify-items: center;
          text-align: center;
        }
        .eyebrow { margin: 0; }
        h1 { font-size: clamp(1.8rem, 9cqi, 2.4rem); }
        .kq-sub { margin: -8px 0 0; font-family: var(--font-round); font-weight: 700; color: var(--cocoa-soft); }
        .kq-hero { height: auto; }
        .kq-lead { margin: 0; color: var(--cocoa-soft); text-align: left; }
        .kq-meta { margin: 0; font-size: 0.82rem; color: var(--cocoa-faint); }

        .kq-route {
          list-style: none;
          margin: 0;
          padding: 0;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(${TOTAL}, 1fr);
          gap: 6px;
        }
        .kq-route li {
          height: 8px;
          border-radius: 999px;
          background: rgb(var(--cocoa-rgb) / 0.12);
          transition: background 0.3s ease;
        }
        .kq-route li.is-done { background: var(--leaf-green); }
        .kq-route li.is-now { background: var(--kiwi-orange); }
        .kq-place {
          margin: 0;
          display: grid;
          justify-items: center;
          line-height: 1.3;
        }
        .kq-stop {
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: var(--kiwi-orange);
        }
        .kq-place strong { font-family: var(--font-pop); font-size: 1.9rem; font-weight: 800; }
        .kq-place-ja { font-size: 0.82rem; color: var(--cocoa-soft); }

        .kq-card { width: 100%; text-align: left; display: grid; gap: 12px; }
        .kq-scene { margin: 0; font-size: 0.92rem; color: var(--cocoa-soft); }
        .kq-phrase {
          margin: 0;
          padding: 14px 16px;
          border-radius: 18px;
          background: rgb(var(--green-rgb) / 0.14);
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 1.35rem;
          line-height: 1.35;
          text-align: center;
          overflow-wrap: anywhere;
        }
        .kq-question { font-size: 1.1rem; margin-top: 4px; }
        .kq-choices { display: grid; gap: 10px; }
        .kq-choice {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          min-height: 56px;
          padding: 10px 14px;
          border: 2px solid rgb(var(--cocoa-rgb) / 0.14);
          border-radius: 18px;
          background: #fff;
          color: var(--cocoa);
          font: inherit;
          font-weight: 700;
          line-height: 1.5;
          text-align: left;
          cursor: pointer;
          transition: border-color 0.15s ease, background 0.15s ease, opacity 0.15s ease;
        }
        .kq-choice:not([aria-disabled='true']):hover { border-color: var(--kiwi-orange); }
        .kq-choice[aria-disabled='true'] { cursor: default; }
        .kq-mark {
          flex: none;
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgb(var(--cocoa-rgb) / 0.08);
          font-family: var(--font-pop);
          font-size: 0.95rem;
        }
        .kq-choice.is-correct { border-color: var(--leaf-green); background: rgb(var(--green-rgb) / 0.14); }
        .kq-choice.is-correct .kq-mark { background: var(--leaf-green); color: #fff; }
        .kq-choice.is-wrong { border-color: var(--kiwi-orange); background: rgb(var(--orange-rgb) / 0.1); }
        .kq-choice.is-wrong .kq-mark { background: var(--kiwi-orange); color: #fff; }
        .kq-choice.is-dim { opacity: 0.5; }

        .kq-feedback { display: grid; gap: 10px; justify-items: start; }
        .kq-feedback:empty { display: none; }
        .kq-verdict { margin: 4px 0 0; font-family: var(--font-round); font-weight: 900; font-size: 1.05rem; }
        .kq-verdict.ok { color: color-mix(in srgb, var(--leaf-green) 70%, var(--cocoa)); }
        .kq-verdict.ng { color: color-mix(in srgb, var(--kiwi-orange) 80%, var(--cocoa)); }
        .kq-explain { margin: 0; font-size: 0.95rem; }
        .kq-feedback :global(.btn) { justify-self: stretch; }

        .kq-score { width: 100%; display: grid; justify-items: center; gap: 2px; }
        .kq-percent {
          margin: 0;
          font-family: var(--font-pop);
          font-weight: 800;
          font-size: 5.2rem;
          line-height: 1;
          color: var(--kiwi-orange);
        }
        .kq-percent span { font-size: 2.2rem; }
        .kq-rank { margin: 6px 0 0; font-family: var(--font-round); font-weight: 900; font-size: 1.5rem; }
        .kq-count { margin: 0; font-size: 0.9rem; color: var(--cocoa-soft); }
        .kq-message { margin: 12px 0 0; text-align: left; }
        .kq-actions { display: grid; gap: 10px; width: 100%; }
        .kq-note { margin: -6px 0 0; min-height: 1.4em; font-size: 0.85rem; color: var(--cocoa-soft); }
        .kq-result :global(.kq-other) {
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: underline;
          color: var(--cocoa);
        }
      `}</style>
    </div>
  );
}
