'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LINKS } from '@/lib/site';
import {
  CMD_LABEL,
  GRID,
  STAGES,
  simulate,
  type Cmd,
  type Frame,
  type Outcome
} from '@/lib/data/games/code-the-kiwi';
import { GameOutro } from '@/components/games/GameOutro';

type Phase = 'intro' | 'play' | 'done';
type Status = 'idle' | 'running' | Outcome;

const STEP_MS = 520;
const SAVE_KEY = 'code-the-kiwi:cleared';

const MESSAGE: Record<Status, string> = {
  idle: 'Make a program, then press Run.',
  running: 'Running…',
  goal: 'Yum! Stage clear!',
  bump: 'Oops! Bump!',
  short: 'Not there yet. Try again!'
};

// ブロックの絵。言葉の意味は、絵と実際の動きから分かるようにする。
function CmdIcon({ cmd }: { cmd: Cmd }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true
  };
  if (cmd === 'forward')
    return (
      <svg {...common}>
        <path d="M12 20V5M6 11l6-6 6 6" />
      </svg>
    );
  if (cmd === 'left')
    return (
      <svg {...common}>
        <path d="M18 20v-6a5 5 0 0 0-5-5H5M9 5 5 9l4 4" />
      </svg>
    );
  if (cmd === 'right')
    return (
      <svg {...common}>
        <path d="M6 20v-6a5 5 0 0 1 5-5h8M15 5l4 4-4 4" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M3 19c2-12 16-12 18 0M17 15l4 4 2-5" />
    </svg>
  );
}

// 上から見たキウイ。くちばしが向いている方が「前」。
function KiwiTop() {
  return (
    <svg viewBox="0 0 60 60" width="100%" height="100%" aria-hidden="true">
      <path d="M30 22V3" stroke="#f3c98b" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="30" cy="36" rx="17" ry="20" fill="#8a5a2b" />
      <ellipse cx="30" cy="38" rx="12" ry="15" fill="#a06a33" />
      <circle cx="23" cy="24" r="3.4" fill="#fff" />
      <circle cx="37" cy="24" r="3.4" fill="#fff" />
      <circle cx="23" cy="23.4" r="1.7" fill="#3a2a18" />
      <circle cx="37" cy="23.4" r="1.7" fill="#3a2a18" />
    </svg>
  );
}

function readCleared(): number {
  try {
    const n = Number(window.localStorage.getItem(SAVE_KEY));
    return Number.isInteger(n) && n > 0 ? Math.min(n, STAGES.length) : 0;
  } catch {
    return 0;
  }
}

export function CodeTheKiwiClient() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [stageIndex, setStageIndex] = useState(0);
  const [cleared, setCleared] = useState(0); // クリア済みのステージ数
  const [program, setProgram] = useState<Cmd[]>([]);
  const [repeat, setRepeat] = useState(1);
  const [status, setStatus] = useState<Status>('idle');
  const [frame, setFrame] = useState<Frame | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const stage = STAGES[stageIndex];
  const startFrame: Frame = useMemo(
    () => ({
      x: stage.start.x,
      y: stage.start.y,
      rot: stage.start.dir * 90,
      step: -1,
      event: 'start'
    }),
    [stage]
  );
  const now = frame ?? startFrame;
  const running = status === 'running';
  const full = program.length >= stage.maxBlocks;
  const isLast = stageIndex === STAGES.length - 1;

  useEffect(() => {
    setCleared(readCleared());
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'intro') topRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [phase, stageIndex]);

  function stop() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }

  function openStage(i: number) {
    stop();
    setStageIndex(i);
    setProgram([]);
    setRepeat(1);
    setFrame(null);
    setStatus('idle');
    setPhase('play');
  }

  // キウイを開始位置に戻す（プログラムは残す）。
  function rewind() {
    stop();
    setFrame(null);
    setStatus('idle');
  }

  function add(cmd: Cmd) {
    if (running || full) return;
    if (status !== 'idle') rewind();
    setProgram((p) => [...p, cmd]);
  }

  function removeAt(i: number) {
    if (running) return;
    if (status !== 'idle') rewind();
    setProgram((p) => p.filter((_, n) => n !== i));
  }

  function changeRepeat(delta: number) {
    if (running) return;
    if (status !== 'idle') rewind();
    setRepeat((r) => Math.min(stage.repeatMax, Math.max(1, r + delta)));
  }

  function run() {
    if (running || program.length === 0) return;
    stop();
    const { frames, outcome } = simulate(stage, program, repeat);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setStatus('running');
    setFrame(frames[0]);

    const finish = () => {
      setStatus(outcome);
      if (outcome === 'goal') {
        const n = Math.max(cleared, stageIndex + 1);
        setCleared(n);
        try {
          window.localStorage.setItem(SAVE_KEY, String(n));
        } catch {
          // 保存できなくても、そのまま遊べる。
        }
      }
    };

    if (reduced) {
      setFrame(frames[frames.length - 1]);
      finish();
      return;
    }
    let i = 0;
    const tick = () => {
      i += 1;
      setFrame(frames[i]);
      if (i >= frames.length - 1) {
        timer.current = setTimeout(finish, STEP_MS * 0.7);
        return;
      }
      timer.current = setTimeout(tick, STEP_MS);
    };
    timer.current = setTimeout(tick, 250);
  }

  const cells = useMemo(() => {
    const kind = new Map<string, 'tree' | 'log'>();
    stage.trees.forEach(([x, y]) => kind.set(`${x},${y}`, 'tree'));
    stage.logs.forEach(([x, y]) => kind.set(`${x},${y}`, 'log'));
    return Array.from({ length: GRID * GRID }, (_, n) => {
      const x = n % GRID;
      const y = Math.floor(n / GRID);
      return { x, y, kind: kind.get(`${x},${y}`) };
    });
  }, [stage]);

  const eaten = status === 'goal' || now.event === 'goal';
  const sceneLabel = `5×5の森。キウイは左から${now.x + 1}番目・上から${now.y + 1}番目、ごはんは左から${
    stage.goal[0] + 1
  }番目・上から${stage.goal[1] + 1}番目。`;

  return (
    <div className={`ck ${phase === 'play' ? 'is-play' : ''}`} ref={topRef}>
      {phase === 'intro' && (
        <section className="ck-intro">
          <p className="ck-eyebrow">English × Coding</p>
          <h1>Code the Kiwi</h1>
          <p className="ck-sub">英語の命令で、キウイを動かそう</p>
          <div className="ck-demo" aria-hidden="true">
            <span className="ck-demo-kiwi">
              <KiwiTop />
            </span>
            <span className="ck-demo-dots">・・・</span>
            <span className="ck-demo-bug">🐛</span>
          </div>
          <p className="ck-lead">
            夜の森で、はらぺこのキウイがごはんをさがしています。
            <br />
            英語のブロックをならべて <strong>Run</strong> をおすと、キウイがそのとおりに動きます。
            日本語の説明はありません。動かしてみれば、意味が分かります。
          </p>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => openStage(cleared >= STAGES.length ? 0 : cleared)}
          >
            {cleared > 0 && cleared < STAGES.length ? `Stage ${cleared + 1} からつづける` : 'Start'}
          </button>
          {cleared > 0 && cleared < STAGES.length && (
            <button type="button" className="btn ck-clear" onClick={() => openStage(0)}>
              Stage 1 からやり直す
            </button>
          )}
          <p className="ck-meta">全{STAGES.length}ステージ・5分くらい</p>
        </section>
      )}

      {phase === 'play' && (
        <section className="ck-play">
          <header className="ck-head">
            <ol className="ck-stages" aria-label="ステージ">
              {STAGES.map((s, i) => {
                const open = i <= cleared;
                return (
                  <li key={s.name}>
                    <button
                      type="button"
                      className={i === stageIndex ? 'is-now' : i < cleared ? 'is-done' : ''}
                      onClick={() => openStage(i)}
                      disabled={!open || running}
                      aria-current={i === stageIndex ? 'step' : undefined}
                      aria-label={`Stage ${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  </li>
                );
              })}
            </ol>
            <h1 className="ck-title">
              <span>Stage {stageIndex + 1}</span> {stage.name}
            </h1>
          </header>

          <div className="ck-stagebox">
          <div className="ck-board" role="img" aria-label={sceneLabel}>
            {cells.map((c) => (
              <span key={`${c.x},${c.y}`} className="ck-cell">
                {c.kind === 'tree' && '🌲'}
                {c.kind === 'log' && '🪵'}
                {c.x === stage.goal[0] && c.y === stage.goal[1] && (
                  <span className={`ck-bug ${eaten ? 'is-eaten' : ''}`}>🐛</span>
                )}
              </span>
            ))}
            <span
              className={`ck-kiwi is-${now.event}`}
              style={{
                transform: `translate(${now.x * 100}%, ${now.y * 100}%)`
              }}
            >
              <span className="ck-kiwi-turn" style={{ transform: `rotate(${now.rot}deg)` }}>
                <span className="ck-kiwi-body" key={`${now.step}-${now.x}-${now.y}-${now.event}`}>
                  <KiwiTop />
                </span>
              </span>
            </span>
          </div>

          </div>

          <p className={`ck-status is-${status}`} role="status" lang="en">
            {MESSAGE[status]}
          </p>

          <div className="ck-panel">
            <div className="ck-program-head">
              <span lang="en">
                Program
                {program.length > 0 && !running && <small className="ck-tip"> · tap to remove</small>}
              </span>
              <span className="ck-count">
                {program.length} / {stage.maxBlocks}
              </span>
            </div>

            {stage.repeatMax > 1 && (
              <div className="ck-repeat" lang="en">
                <span>repeat</span>
                <button
                  type="button"
                  onClick={() => changeRepeat(-1)}
                  disabled={running || repeat <= 1}
                  aria-label="fewer times"
                >
                  −
                </button>
                <strong aria-live="polite">{repeat}</strong>
                <button
                  type="button"
                  onClick={() => changeRepeat(1)}
                  disabled={running || repeat >= stage.repeatMax}
                  aria-label="more times"
                >
                  ＋
                </button>
                <span>{repeat === 1 ? 'time' : 'times'}</span>
              </div>
            )}

            <ol
              className="ck-program"
              lang="en"
              style={{ minHeight: `calc(${Math.ceil(stage.maxBlocks / 4)} * 32px + ${Math.ceil(stage.maxBlocks / 4) - 1} * 5px + 12px)` }}
            >
              {program.map((cmd, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className={`ck-block is-${cmd} ${now.step === i && status !== 'idle' ? 'is-active' : ''}`}
                    onClick={() => removeAt(i)}
                    disabled={running}
                    aria-label={`${i + 1}: ${CMD_LABEL[cmd]} (remove)`}
                  >
                    <CmdIcon cmd={cmd} />
                    {CMD_LABEL[cmd]}
                  </button>
                </li>
              ))}
              {program.length === 0 && <li className="ck-empty">Tap a block below.</li>}
            </ol>

            <div
              className="ck-palette"
              lang="en"
              style={{ gridTemplateColumns: `repeat(${stage.blocks.length === 3 ? 3 : 2}, minmax(0, 1fr))` }}
            >
              {stage.blocks.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  className={`ck-block is-${cmd}`}
                  onClick={() => add(cmd)}
                  disabled={running || full}
                >
                  <CmdIcon cmd={cmd} />
                  {CMD_LABEL[cmd]}
                </button>
              ))}
            </div>

            <div className="ck-controls" lang="en">
              {status === 'goal' ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => (isLast ? setPhase('done') : openStage(stageIndex + 1))}
                >
                  {isLast ? 'Finish!' : 'Next stage →'}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={run}
                  disabled={running || program.length === 0}
                >
                  ▶ Run
                </button>
              )}
              <button
                type="button"
                className="btn ck-clear"
                onClick={() => {
                  rewind();
                  setProgram([]);
                }}
                disabled={running || program.length === 0}
              >
                Clear
              </button>
            </div>
          </div>
        </section>
      )}

      {phase === 'done' && (
        <section className="ck-done">
          <p className="ck-eyebrow">All Clear!</p>
          <h1>Well done!</h1>
          <div className="ck-demo" aria-hidden="true">
            <span className="ck-demo-kiwi">
              <KiwiTop />
            </span>
            <span className="ck-demo-bug">⭐</span>
          </div>
          <p className="ck-lead">
            おめでとう！ いま、日本語に訳さずに英語でプログラムを組みました。
            <br />
            <span lang="en">go forward / turn left / turn right / jump / repeat</span>
            ——この5つは、もうあなたの言葉です。
          </p>

          <div className="ck-outro">
            <GameOutro
              from="code-the-kiwi"
              lead="教室では、本物のロボットを英語で動かします。土曜日・アーテックの「英会話×STEAM」で、つづきをやってみませんか。"
            >
              <a
                href={LINKS.englishSteam}
                target="_blank"
                rel="noopener noreferrer"
                className="ck-outro-link"
              >
                英会話×STEAMコースを見る →
              </a>
              <Link href="/play/kiwi-quiz" className="ck-outro-link">
                もうひとつのゲーム「Kiwi度チェック」であそぶ →
              </Link>
            </GameOutro>
          </div>
          <button type="button" className="btn ck-clear" onClick={() => openStage(0)}>
            Play again
          </button>
        </section>
      )}

      <style jsx>{`
        .ck {
          --night: #14233b;
          --night-2: #1e3352;
          --ink: #eef3fb;
          --ink-soft: #b4c3da;
          padding: clamp(28px, 7cqi, 44px) 16px clamp(40px, 8cqi, 64px);
          scroll-margin-top: var(--header-h);
          color: var(--ink);
          background-color: var(--night);
          background-image:
            radial-gradient(1.2px 1.2px at 12% 8%, #fff 50%, transparent 51%),
            radial-gradient(1.4px 1.4px at 78% 5%, #fff 50%, transparent 51%),
            radial-gradient(1px 1px at 45% 14%, #fff 50%, transparent 51%),
            radial-gradient(1.2px 1.2px at 90% 22%, #fff 50%, transparent 51%),
            radial-gradient(1px 1px at 28% 26%, #fff 50%, transparent 51%),
            linear-gradient(180deg, #0f1c31, var(--night) 40%);
        }
        /* プレイ中は、ヘッダーの下の1画面にすべて収める */
        .ck.is-play { padding: 8px 12px 12px; overflow-anchor: none; }
        section {
          display: grid;
          gap: 14px;
          max-width: 480px;
          margin: 0 auto;
          justify-items: center;
          text-align: center;
        }
        h1 { color: var(--ink); font-family: var(--font-pop); font-weight: 800; }
        .ck-intro h1, .ck-done h1 { font-size: clamp(2.2rem, 11cqi, 2.9rem); line-height: 1.1; }
        .ck-eyebrow {
          margin: 0;
          font-family: var(--font-pop);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 0.8rem;
          color: var(--sunny-yellow);
        }
        .ck-sub { margin: -6px 0 0; font-family: var(--font-round); font-weight: 700; color: var(--ink-soft); }
        .ck-lead { margin: 0; text-align: left; color: var(--ink-soft); }
        .ck-lead strong, .ck-lead span { color: var(--ink); }
        .ck-meta { margin: 0; font-size: 0.82rem; color: var(--ink-soft); }
        .ck-demo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 22px;
          border-radius: 22px;
          background: var(--night-2);
          font-size: 2rem;
        }
        .ck-demo-kiwi { width: 64px; height: 64px; transform: rotate(90deg); }
        .ck-demo-dots { color: var(--ink-soft); letter-spacing: 0.2em; }

        .ck-play {
          display: flex;
          flex-direction: column;
          gap: 8px;
          /* 画面がとても小さいときは、はみ出さずに少しだけ縦にのびる */
          min-height: clamp(470px, calc(100svh - var(--header-h) - 20px), 860px);
        }
        .ck-play > * { flex: none; }
        .ck-head {
          display: flex;
          flex-wrap: wrap;
          gap: 4px 10px;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .ck-stages { list-style: none; margin: 0; padding: 0; display: flex; gap: 5px; }
        .ck-stages button {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: var(--night-2);
          color: var(--ink);
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
        }
        .ck-stages button:disabled { opacity: 0.4; cursor: default; }
        .ck-stages button.is-done { background: var(--leaf-green); color: #14233b; opacity: 1; }
        .ck-stages button.is-now { border-color: var(--sunny-yellow); opacity: 1; }
        .ck-title { font-size: 1.2rem; line-height: 1.2; text-align: left; }
        .ck-title span {
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--sunny-yellow);
        }

        .ck-play > .ck-stagebox {
          flex: 1 1 0;
          min-height: 160px;
          width: 100%;
          display: grid;
          place-items: center;
          container-type: size;
        }
        .ck-board {
          position: relative;
          width: min(100cqw, 100cqh, 380px);
          aspect-ratio: 1;
          display: grid;
          grid-template-columns: repeat(${GRID}, 1fr);
          grid-template-rows: repeat(${GRID}, 1fr);
          border-radius: 20px;
          overflow: hidden;
          background: #1f4a37;
          box-shadow: 0 0 0 3px #2c6349, 0 16px 34px rgba(0, 0, 0, 0.35);
        }
        .ck-cell {
          display: grid;
          place-items: center;
          font-size: clamp(1.1rem, 8cqmin, 2.2rem);
          line-height: 1;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.07);
        }
        .ck-cell:nth-child(odd) { background: rgba(255, 255, 255, 0.04); }
        .ck-bug { transition: transform 0.3s ease, opacity 0.3s ease; }
        .ck-bug.is-eaten { transform: scale(0); opacity: 0; }
        .ck-kiwi {
          position: absolute;
          top: 0;
          left: 0;
          width: ${100 / GRID}%;
          height: ${100 / GRID}%;
          padding: 1.6%;
          transition: transform 0.42s cubic-bezier(0.3, 0.7, 0.3, 1);
        }
        .ck-kiwi-turn { display: block; width: 100%; height: 100%; transition: transform 0.36s ease; }
        .ck-kiwi-body { display: block; width: 100%; height: 100%; }
        .ck-kiwi.is-jump .ck-kiwi-body { animation: ck-hop 0.42s ease; }
        .ck-kiwi.is-bump .ck-kiwi-body { animation: ck-bump 0.4s ease; }
        .ck-kiwi.is-goal .ck-kiwi-body { animation: ck-yum 0.6s ease 0.3s; }
        @keyframes ck-hop {
          50% { transform: scale(1.45); }
        }
        @keyframes ck-bump {
          30% { transform: translateY(-22%); }
          60% { transform: translateY(6%); }
        }
        @keyframes ck-yum {
          40% { transform: scale(1.3); }
        }

        .ck-status {
          margin: 0;
          min-height: 1.4em;
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 1rem;
          line-height: 1.4;
          color: var(--ink-soft);
        }
        .ck-status.is-goal { color: var(--sunny-yellow); }
        .ck-status.is-bump, .ck-status.is-short { color: #ffb08a; }

        .ck-panel {
          width: 100%;
          display: grid;
          gap: 8px;
          padding: 10px;
          border-radius: 18px;
          background: var(--night-2);
          text-align: left;
        }
        .ck-program-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-family: var(--font-pop);
          font-weight: 700;
        }
        .ck-tip { font-size: 0.75rem; font-weight: 500; color: var(--ink-soft); }
        .ck-count { font-size: 0.85rem; color: var(--ink-soft); font-variant-numeric: tabular-nums; }
        .ck-repeat {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 2px 10px;
          border-radius: 12px;
          background: #6b4fb3;
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 1.05rem;
        }
        .ck-repeat strong { min-width: 1.2em; text-align: center; font-size: 1.3rem; }
        .ck-repeat button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.22);
          color: #fff;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
        }
        .ck-repeat button:disabled { opacity: 0.35; cursor: default; }
        .ck-program {
          list-style: none;
          margin: 0;
          padding: 6px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          grid-auto-rows: 32px;
          gap: 5px;
          align-content: start;
          border-radius: 14px;
          border: 2px dashed rgba(255, 255, 255, 0.22);
        }
        .ck-empty { grid-column: 1 / -1; color: var(--ink-soft); font-family: var(--font-pop); align-self: center; }
        .ck-program .ck-block {
          width: 100%;
          height: 100%;
          min-height: 0;
          justify-content: center;
          gap: 3px;
          padding: 0 4px;
          border-radius: 8px;
          font-size: clamp(0.62rem, 2.9cqi, 0.8rem);
          letter-spacing: -0.01em;
        }
        .ck-program .ck-block :global(svg) { width: 13px; height: 13px; flex: none; }
        .ck-palette { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
        .ck-block {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 34px;
          padding: 4px 9px;
          border: none;
          border-radius: 10px;
          color: #fff;
          font-family: var(--font-pop);
          font-weight: 700;
          font-size: 0.9rem;
          line-height: 1.1;
          white-space: nowrap;
          cursor: pointer;
          box-shadow: 0 3px 0 rgba(0, 0, 0, 0.28);
          transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease;
        }
        .ck-palette .ck-block { justify-content: center; min-height: 44px; font-size: 1rem; padding: 4px 6px; }
        .ck-block:active:not(:disabled) { transform: translateY(2px); box-shadow: 0 1px 0 rgba(0, 0, 0, 0.28); }
        .ck-block:disabled { cursor: default; }
        .ck-palette .ck-block:disabled { opacity: 0.45; }
        .ck-block.is-forward { background: #2f7fd1; }
        .ck-block.is-left { background: #c2571c; }
        .ck-block.is-right { background: #b0407c; }
        .ck-block.is-jump { background: #3f8a2e; }
        .ck-block.is-active { outline: 3px solid var(--sunny-yellow); outline-offset: 2px; }
                .ck-controls { display: grid; grid-template-columns: 1fr auto; gap: 8px; }
        .ck-controls :global(.btn) { min-height: 46px; font-size: 1.05rem; }
        .ck-controls :global(.btn:disabled) { opacity: 0.45; cursor: default; transform: none; }
        .ck :global(.ck-clear) {
          background: transparent;
          color: var(--ink);
          box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.35);
        }
        .ck :global(:focus-visible) { outline-color: var(--sunny-yellow); }

        .ck-outro { width: 100%; color: var(--cocoa); }
        .ck-outro :global(.game-outro) { background: var(--cream); }
        .ck-outro :global(.ck-outro-link) {
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: underline;
          color: var(--cocoa);
        }
        @media (prefers-reduced-motion: reduce) {
          .ck-kiwi, .ck-kiwi-turn { transition: none; }
          .ck-kiwi-body { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
