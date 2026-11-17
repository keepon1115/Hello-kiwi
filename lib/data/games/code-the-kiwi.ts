// 「Code the Kiwi」のステージと動きのルール。
// 画面（CodeTheKiwiClient）はここの simulate() が返すコマを順に再生するだけにして、
// ルールはこのファイルにまとめる。座標は左上が (0,0)、x は右、y は下。

export const GRID = 5;

export type Cmd = 'forward' | 'left' | 'right' | 'jump';

// ブロックに書く英語。日本語訳はあえて持たない（動きを見て意味をつかむ）。
export const CMD_LABEL: Record<Cmd, string> = {
  forward: 'go forward',
  left: 'turn left',
  right: 'turn right',
  jump: 'jump'
};

export type Cell = [x: number, y: number];

export type Stage = {
  name: string; // 英語のステージ名（そのステージで出会う言葉）
  start: { x: number; y: number; dir: 0 | 1 | 2 | 3 }; // 0=上 1=右 2=下 3=左
  goal: Cell;
  trees: Cell[]; // 通れない
  logs: Cell[]; // 歩いては通れないが、jump で飛びこえられる
  blocks: Cmd[]; // このステージで使えるブロック
  maxBlocks: number;
  repeatMax: number; // 1 なら repeat は出さない
  solution: { program: Cmd[]; repeat: number }; // 解ける証明（scripts で検証）
};

export const STAGES: Stage[] = [
  {
    name: 'go forward',
    start: { x: 0, y: 2, dir: 1 },
    goal: [3, 2],
    trees: [
      [1, 0],
      [4, 1],
      [2, 4]
    ],
    logs: [],
    blocks: ['forward'],
    maxBlocks: 4,
    repeatMax: 1,
    solution: { program: ['forward', 'forward', 'forward'], repeat: 1 }
  },
  {
    name: 'turn left',
    start: { x: 1, y: 3, dir: 1 },
    goal: [3, 1],
    trees: [
      [1, 2],
      [2, 2],
      [4, 3],
      [0, 0]
    ],
    logs: [],
    blocks: ['forward', 'left'],
    maxBlocks: 6,
    repeatMax: 1,
    solution: { program: ['forward', 'forward', 'left', 'forward', 'forward'], repeat: 1 }
  },
  {
    name: 'turn right',
    start: { x: 0, y: 1, dir: 1 },
    goal: [4, 3],
    trees: [
      [3, 1],
      [2, 4],
      [1, 2],
      [3, 2],
      [0, 4]
    ],
    logs: [],
    blocks: ['forward', 'left', 'right'],
    maxBlocks: 8,
    repeatMax: 1,
    solution: {
      program: ['forward', 'forward', 'right', 'forward', 'forward', 'left', 'forward', 'forward'],
      repeat: 1
    }
  },
  {
    name: 'jump',
    start: { x: 0, y: 3, dir: 1 },
    goal: [4, 0],
    trees: [
      [3, 3],
      [1, 1],
      [3, 1],
      [0, 0],
      [4, 4]
    ],
    logs: [
      [1, 3],
      [2, 1]
    ],
    blocks: ['forward', 'left', 'right', 'jump'],
    maxBlocks: 8,
    repeatMax: 1,
    solution: {
      program: ['jump', 'left', 'forward', 'jump', 'right', 'forward', 'forward'],
      repeat: 1
    }
  },
  {
    name: 'repeat',
    start: { x: 0, y: 2, dir: 1 },
    goal: [4, 2],
    trees: [
      [1, 0],
      [3, 4],
      [0, 4],
      [4, 0]
    ],
    logs: [],
    blocks: ['forward'],
    maxBlocks: 1,
    repeatMax: 4,
    solution: { program: ['forward'], repeat: 4 }
  },
  {
    name: 'repeat 4 times',
    start: { x: 0, y: 4, dir: 1 },
    goal: [4, 0],
    trees: [
      [0, 2],
      [3, 4],
      [2, 0],
      [4, 3],
      [0, 0]
    ],
    logs: [],
    blocks: ['forward', 'left', 'right'],
    maxBlocks: 4,
    repeatMax: 4,
    solution: { program: ['forward', 'left', 'forward', 'right'], repeat: 4 }
  }
];

export type Frame = {
  x: number;
  y: number;
  rot: number; // 向き（度）。回りすぎないよう累積で持つ
  step: number; // 実行中のブロックの添字。-1 は開始位置
  event: 'start' | 'move' | 'turn' | 'jump' | 'bump' | 'goal';
};

export type Outcome = 'goal' | 'bump' | 'short';

const DX = [0, 1, 0, -1];
const DY = [-1, 0, 1, 0];

const has = (cells: Cell[], x: number, y: number) => cells.some(([cx, cy]) => cx === x && cy === y);
const inside = (x: number, y: number) => x >= 0 && y >= 0 && x < GRID && y < GRID;

// プログラムを最後まで（またはぶつかる・ゴールするまで）動かし、コマの列を返す。
export function simulate(
  stage: Stage,
  program: Cmd[],
  repeat: number
): { frames: Frame[]; outcome: Outcome } {
  let { x, y } = stage.start;
  let dir: number = stage.start.dir;
  let rot = dir * 90;
  const frames: Frame[] = [{ x, y, rot, step: -1, event: 'start' }];
  const free = (cx: number, cy: number) =>
    inside(cx, cy) && !has(stage.trees, cx, cy) && !has(stage.logs, cx, cy);

  for (let r = 0; r < repeat; r++) {
    for (let step = 0; step < program.length; step++) {
      const cmd = program[step];
      if (cmd === 'left' || cmd === 'right') {
        const d = cmd === 'left' ? -1 : 1;
        dir = (dir + d + 4) % 4;
        rot += d * 90;
        frames.push({ x, y, rot, step, event: 'turn' });
        continue;
      }
      const dist = cmd === 'jump' ? 2 : 1;
      const tx = x + DX[dir] * dist;
      const ty = y + DY[dir] * dist;
      // jump は丸太か空きマスを1つ飛びこえる。木は飛びこえられない。
      const overTree = cmd === 'jump' && has(stage.trees, x + DX[dir], y + DY[dir]);
      if (!free(tx, ty) || overTree) {
        frames.push({ x, y, rot, step, event: 'bump' });
        return { frames, outcome: 'bump' };
      }
      x = tx;
      y = ty;
      const atGoal = x === stage.goal[0] && y === stage.goal[1];
      frames.push({ x, y, rot, step, event: atGoal ? 'goal' : cmd === 'jump' ? 'jump' : 'move' });
      if (atGoal) return { frames, outcome: 'goal' };
    }
  }
  return { frames, outcome: 'short' };
}
