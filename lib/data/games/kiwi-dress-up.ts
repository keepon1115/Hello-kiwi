// 「Kiwi Dress-Up」の絵とアイテム。
// キウイ・服はすべて 800×800 の座標で描く（あとで網目にのせて引っ張るための「元の絵」）。
// 背景は引っ張らないので、別に size×size で描く。
// アイテムを足すときは ITEMS に1つ足すだけでよい（draw に描き方、box にサムネイルの切り抜き範囲）。

type Ctx = CanvasRenderingContext2D;

export const ART = 800; // 元の絵の一辺

const LINE = '#4a3018';
const BROWN = '#8a5a2b';
const BROWN_DARK = '#74491f';
const BELLY = '#ab7539';
const ORANGE = '#f0a030';

function bodyPath(c: Ctx) {
  c.beginPath();
  c.moveTo(400, 200);
  c.bezierCurveTo(520, 200, 590, 360, 590, 480);
  c.bezierCurveTo(590, 600, 510, 670, 400, 670);
  c.bezierCurveTo(290, 670, 210, 600, 210, 480);
  c.bezierCurveTo(210, 360, 280, 200, 400, 200);
  c.closePath();
}

function rr(c: Ctx, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath();
  c.roundRect(x, y, w, h, r);
}

function outline(c: Ctx, w = 7) {
  c.lineWidth = w;
  c.strokeStyle = LINE;
  c.lineJoin = 'round';
  c.lineCap = 'round';
  c.stroke();
}

// 体の形の内側だけに描く（マフラーや水着を体に沿わせる）。
function onBody(c: Ctx, paint: () => void) {
  c.save();
  bodyPath(c);
  c.clip();
  paint();
  c.restore();
  bodyPath(c);
  outline(c, 8);
}

function drawLegs(c: Ctx) {
  c.strokeStyle = ORANGE;
  c.lineWidth = 13;
  c.lineCap = 'round';
  c.lineJoin = 'round';
  for (const x of [350, 450]) {
    c.beginPath();
    c.moveTo(x + (x < 400 ? 5 : -5), 655);
    c.lineTo(x, 716);
    c.moveTo(x - 32, 736);
    c.lineTo(x, 716);
    c.lineTo(x + 32, 736);
    c.moveTo(x, 716);
    c.lineTo(x, 744);
    c.stroke();
  }
}

function drawBody(c: Ctx) {
  // 頭の毛
  c.beginPath();
  c.moveTo(392, 210);
  c.lineTo(380, 168);
  c.moveTo(400, 208);
  c.lineTo(402, 158);
  c.moveTo(408, 210);
  c.lineTo(424, 170);
  outline(c, 9);

  bodyPath(c);
  c.fillStyle = BROWN;
  c.fill();
  c.save();
  bodyPath(c);
  c.clip();
  c.fillStyle = BELLY;
  c.beginPath();
  c.ellipse(400, 530, 120, 130, 0, 0, Math.PI * 2);
  c.fill();
  c.strokeStyle = BROWN_DARK;
  c.lineWidth = 5;
  c.lineCap = 'round';
  for (const [x, y] of [
    [360, 500],
    [430, 520],
    [390, 570],
    [450, 590],
    [340, 580]
  ]) {
    c.beginPath();
    c.moveTo(x - 9, y);
    c.lineTo(x, y + 9);
    c.lineTo(x + 9, y);
    c.stroke();
  }
  c.restore();
  bodyPath(c);
  outline(c, 8);
}

function drawWings(c: Ctx) {
  for (const s of [-1, 1]) {
    c.beginPath();
    c.ellipse(400 + s * 182, 492, 30, 72, s * 0.22, 0, Math.PI * 2);
    c.fillStyle = BROWN_DARK;
    c.fill();
    outline(c, 7);
  }
}

function drawFace(c: Ctx) {
  c.fillStyle = 'rgba(240, 110, 90, 0.42)';
  for (const x of [296, 504]) {
    c.beginPath();
    c.arc(x, 394, 23, 0, Math.PI * 2);
    c.fill();
  }
  for (const x of [345, 455]) {
    c.fillStyle = '#2e1e10';
    c.beginPath();
    c.arc(x, 328, 20, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#fff';
    c.beginPath();
    c.arc(x - 6, 321, 6.5, 0, Math.PI * 2);
    c.fill();
  }
}

function drawBeak(c: Ctx) {
  c.beginPath();
  c.moveTo(370, 362);
  c.quadraticCurveTo(300, 400, 258, 482);
  c.quadraticCurveTo(350, 452, 414, 394);
  c.closePath();
  c.fillStyle = '#f2c46d';
  c.fill();
  outline(c, 7);
  c.fillStyle = LINE;
  c.beginPath();
  c.arc(372, 386, 4, 0, Math.PI * 2);
  c.fill();
}

export type Slot = 'head' | 'face' | 'body' | 'feet';
export type Tab = Slot | 'place';

export type Item = {
  id: string;
  slot: Slot;
  name: string; // 英語のままの名前
  say: string; // 着せたときのキウイのひとこと
  gloss?: string; // NZらしい言葉にだけ付ける、ひとこと説明
  box: [x: number, y: number, size: number]; // サムネイル用の切り抜き（正方形）
  draw: (c: Ctx) => void;
};

function stripes(c: Ctx, y0: number, y1: number, step: number, colors: string[]) {
  for (let y = y0, i = 0; y < y1; y += step, i++) {
    c.fillStyle = colors[i % colors.length];
    c.fillRect(180, y, 440, step + 1);
  }
}

export const ITEMS: Item[] = [
  {
    id: 'beanie',
    slot: 'head',
    name: 'beanie',
    say: 'Nice beanie!',
    gloss: 'beanie＝ニット帽',
    box: [250, 110, 300],
    draw(c) {
      c.beginPath();
      c.moveTo(276, 262);
      c.bezierCurveTo(272, 140, 528, 140, 524, 262);
      c.closePath();
      c.fillStyle = '#d9412b';
      c.fill();
      outline(c);
      rr(c, 264, 244, 272, 46, 20);
      c.fillStyle = '#f6eedd';
      c.fill();
      outline(c);
      c.beginPath();
      c.arc(400, 150, 27, 0, Math.PI * 2);
      c.fillStyle = '#f6eedd';
      c.fill();
      outline(c);
    }
  },
  {
    id: 'sunhat',
    slot: 'head',
    name: 'sun hat',
    say: 'Sun hat on!',
    box: [200, 80, 400],
    draw(c) {
      c.beginPath();
      c.ellipse(400, 262, 200, 36, 0, 0, Math.PI * 2);
      c.fillStyle = '#f1d27a';
      c.fill();
      outline(c);
      c.beginPath();
      c.moveTo(300, 258);
      c.bezierCurveTo(296, 140, 504, 140, 500, 258);
      c.quadraticCurveTo(400, 282, 300, 258);
      c.closePath();
      c.fillStyle = '#f1d27a';
      c.fill();
      outline(c);
      c.save();
      c.clip();
      c.fillStyle = '#ee6c2b';
      c.fillRect(280, 226, 240, 26);
      c.restore();
    }
  },
  {
    id: 'gradcap',
    slot: 'head',
    name: 'grad cap',
    say: 'So smart!',
    box: [230, 110, 340],
    draw(c) {
      c.beginPath();
      c.moveTo(318, 214);
      c.lineTo(318, 262);
      c.quadraticCurveTo(400, 290, 482, 262);
      c.lineTo(482, 214);
      c.closePath();
      c.fillStyle = '#33263f';
      c.fill();
      outline(c);
      c.beginPath();
      c.moveTo(400, 146);
      c.lineTo(548, 204);
      c.lineTo(400, 262);
      c.lineTo(252, 204);
      c.closePath();
      c.fillStyle = '#463657';
      c.fill();
      outline(c);
      c.beginPath();
      c.moveTo(400, 204);
      c.lineTo(520, 214);
      c.lineTo(524, 276);
      c.lineWidth = 6;
      c.strokeStyle = '#ffde59';
      c.stroke();
      c.beginPath();
      c.arc(524, 284, 11, 0, Math.PI * 2);
      c.fillStyle = '#ffde59';
      c.fill();
    }
  },
  {
    id: 'partyhat',
    slot: 'head',
    name: 'party hat',
    say: 'Party time!',
    box: [250, 70, 300],
    draw(c) {
      c.beginPath();
      c.moveTo(322, 266);
      c.lineTo(404, 112);
      c.lineTo(478, 266);
      c.quadraticCurveTo(400, 286, 322, 266);
      c.closePath();
      c.fillStyle = '#1aa39a';
      c.fill();
      outline(c);
      c.fillStyle = '#ffde59';
      for (const [x, y] of [
        [380, 230],
        [430, 240],
        [404, 186],
        [356, 250]
      ]) {
        c.beginPath();
        c.arc(x, y, 9, 0, Math.PI * 2);
        c.fill();
      }
      c.beginPath();
      c.arc(404, 108, 20, 0, Math.PI * 2);
      c.fillStyle = '#ee6c2b';
      c.fill();
      outline(c);
    }
  },
  {
    id: 'sunnies',
    slot: 'face',
    name: 'sunnies',
    say: 'Love the sunnies!',
    gloss: 'sunnies＝サングラス（NZやオーストラリアの言い方）',
    box: [240, 240, 320],
    draw(c) {
      c.beginPath();
      c.moveTo(300, 318);
      c.lineTo(250, 310);
      c.moveTo(500, 318);
      c.lineTo(550, 310);
      c.moveTo(388, 318);
      c.lineTo(412, 318);
      outline(c, 8);
      for (const x of [296, 410]) {
        rr(c, x, 296, 94, 62, 22);
        c.fillStyle = '#1d1d28';
        c.fill();
        outline(c, 6);
        c.beginPath();
        c.moveTo(x + 18, 312);
        c.lineTo(x + 40, 312);
        c.lineWidth = 6;
        c.strokeStyle = 'rgba(255,255,255,0.55)';
        c.stroke();
      }
    }
  },
  {
    id: 'glasses',
    slot: 'face',
    name: 'glasses',
    say: 'Looking sharp!',
    box: [240, 240, 320],
    draw(c) {
      c.lineWidth = 9;
      c.strokeStyle = '#c0392b';
      c.lineCap = 'round';
      c.beginPath();
      c.moveTo(384, 326);
      c.quadraticCurveTo(400, 314, 416, 326);
      c.moveTo(306, 322);
      c.lineTo(254, 312);
      c.moveTo(494, 322);
      c.lineTo(546, 312);
      c.stroke();
      for (const x of [345, 455]) {
        c.beginPath();
        c.arc(x, 328, 40, 0, Math.PI * 2);
        c.fillStyle = 'rgba(255,255,255,0.1)';
        c.fill();
        c.stroke();
      }
    }
  },
  {
    id: 'goggles',
    slot: 'face',
    name: 'goggles',
    say: 'Ready to swim!',
    box: [240, 240, 320],
    draw(c) {
      onBody(c, () => {
        c.fillStyle = '#2a6fb5';
        c.fillRect(180, 308, 440, 38);
      });
      for (const x of [345, 455]) {
        c.beginPath();
        c.ellipse(x, 328, 46, 36, 0, 0, Math.PI * 2);
        c.fillStyle = 'rgba(160, 220, 245, 0.6)';
        c.fill();
        c.lineWidth = 9;
        c.strokeStyle = '#1d4f86';
        c.stroke();
      }
    }
  },
  {
    id: 'scarf',
    slot: 'body',
    name: 'scarf',
    say: 'Nice and warm!',
    box: [230, 320, 340],
    draw(c) {
      rr(c, 476, 430, 62, 132, 14);
      c.fillStyle = '#d9412b';
      c.fill();
      outline(c);
      c.fillStyle = '#f6eedd';
      c.fillRect(480, 520, 54, 14);
      onBody(c, () => {
        c.fillStyle = '#d9412b';
        c.fillRect(180, 404, 440, 56);
        c.fillStyle = '#f6eedd';
        for (let x = 200; x < 620; x += 64) c.fillRect(x, 404, 22, 56);
        c.strokeStyle = LINE;
        c.lineWidth = 6;
        c.strokeRect(170, 404, 460, 56);
      });
    }
  },
  {
    id: 'togs',
    slot: 'body',
    name: 'togs',
    say: 'Togs on! Let’s swim!',
    gloss: 'togs＝水着（NZ英語）',
    box: [220, 440, 360],
    draw(c) {
      onBody(c, () => {
        c.fillStyle = '#1f8fb8';
        c.fillRect(180, 556, 440, 140);
        c.fillStyle = '#ffde59';
        for (const [x, y] of [
          [280, 610],
          [350, 640],
          [430, 606],
          [500, 636],
          [400, 590]
        ]) {
          c.beginPath();
          c.arc(x, y, 11, 0, Math.PI * 2);
          c.fill();
        }
        c.fillStyle = '#fff';
        c.fillRect(180, 556, 440, 16);
        c.strokeStyle = LINE;
        c.lineWidth = 6;
        c.strokeRect(170, 556, 460, 160);
      });
    }
  },
  {
    id: 'raincoat',
    slot: 'body',
    name: 'raincoat',
    say: 'Rain? No worries!',
    gloss: 'No worries＝だいじょうぶ（NZでよく使う）',
    box: [200, 350, 400],
    draw(c) {
      onBody(c, () => {
        c.fillStyle = '#f4c21f';
        c.fillRect(180, 408, 440, 300);
        c.strokeStyle = LINE;
        c.lineWidth = 6;
        c.beginPath();
        c.moveTo(170, 408);
        c.lineTo(630, 408);
        c.moveTo(400, 408);
        c.lineTo(400, 700);
        c.stroke();
        c.fillStyle = LINE;
        for (const y of [470, 540, 610]) {
          c.beginPath();
          c.arc(424, y, 9, 0, Math.PI * 2);
          c.fill();
        }
      });
    }
  },
  {
    id: 'jersey',
    slot: 'body',
    name: 'footy jersey',
    say: 'Go, Kiwi, go!',
    gloss: 'footy＝ラグビーなどのフットボール',
    box: [200, 350, 400],
    draw(c) {
      onBody(c, () => {
        stripes(c, 408, 610, 34, ['#2e8b57', '#f6eedd']);
        c.fillStyle = '#f6eedd';
        c.beginPath();
        c.moveTo(352, 404);
        c.lineTo(400, 462);
        c.lineTo(448, 404);
        c.closePath();
        c.fill();
        c.strokeStyle = LINE;
        c.lineWidth = 6;
        c.stroke();
        c.strokeRect(170, 408, 460, 204);
      });
    }
  },
  {
    id: 'jandals',
    slot: 'feet',
    name: 'jandals',
    say: 'Cool jandals!',
    gloss: 'jandals＝ビーチサンダル（NZ英語）',
    box: [260, 600, 280],
    draw(c) {
      for (const x of [350, 450]) {
        c.beginPath();
        c.ellipse(x, 744, 52, 15, 0, 0, Math.PI * 2);
        c.fillStyle = '#18a999';
        c.fill();
        outline(c, 6);
        c.beginPath();
        c.moveTo(x - 30, 742);
        c.lineTo(x, 722);
        c.lineTo(x + 30, 742);
        c.lineWidth = 9;
        c.strokeStyle = '#0c6b61';
        c.lineCap = 'round';
        c.lineJoin = 'round';
        c.stroke();
      }
    }
  },
  {
    id: 'gumboots',
    slot: 'feet',
    name: 'gumboots',
    say: 'Gumboots on!',
    gloss: 'gumboots＝長ぐつ（NZ英語）',
    box: [260, 600, 280],
    draw(c) {
      for (const x of [350, 450]) {
        c.beginPath();
        c.moveTo(x - 24, 676);
        c.lineTo(x + 24, 676);
        c.lineTo(x + 24, 716);
        c.quadraticCurveTo(x + 46, 720, 46 + x, 742);
        c.quadraticCurveTo(x + 46, 756, x + 30, 756);
        c.lineTo(x - 30, 756);
        c.quadraticCurveTo(x - 46, 756, x - 46, 742);
        c.quadraticCurveTo(x - 46, 720, x - 24, 716);
        c.closePath();
        c.fillStyle = '#d9412b';
        c.fill();
        outline(c, 6);
        c.fillStyle = '#f6eedd';
        c.fillRect(x - 21, 680, 42, 10);
      }
    }
  },
  {
    id: 'socks',
    slot: 'feet',
    name: 'socks',
    say: 'Cosy socks!',
    box: [260, 600, 280],
    draw(c) {
      for (const x of [350, 450]) {
        rr(c, x - 17, 672, 34, 50, 8);
        c.fillStyle = '#f6eedd';
        c.fill();
        c.save();
        c.clip();
        c.fillStyle = '#6b4fb3';
        c.fillRect(x - 20, 684, 40, 9);
        c.fillRect(x - 20, 702, 40, 9);
        c.restore();
        rr(c, x - 17, 672, 34, 50, 8);
        outline(c, 6);
      }
    }
  }
];

export type Outfit = Record<Slot, string | null>;
export const EMPTY_OUTFIT: Outfit = { head: null, face: null, body: null, feet: null };

const item = (id: string | null) => ITEMS.find((i) => i.id === id);

// キウイと、着ているもの全部を 800×800 に描く（背景は透明）。
export function drawKiwi(c: Ctx, outfit: Outfit) {
  c.clearRect(0, 0, ART, ART);
  drawLegs(c);
  item(outfit.feet)?.draw(c);
  drawBody(c);
  item(outfit.body)?.draw(c);
  drawWings(c);
  drawFace(c);
  item(outfit.face)?.draw(c);
  drawBeak(c);
  item(outfit.head)?.draw(c);
}

// アイテム1つだけを、サムネイル用に描く。
export function drawItemThumb(c: Ctx, it: Item, size: number) {
  const [x, y, s] = it.box;
  c.clearRect(0, 0, size, size);
  c.save();
  c.scale(size / s, size / s);
  c.translate(-x, -y);
  c.globalAlpha = 0.28;
  drawLegs(c);
  drawBody(c);
  c.globalAlpha = 1;
  it.draw(c);
  c.restore();
}

export type Place = {
  id: string;
  name: string;
  say: string;
  gloss?: string;
  draw: (c: Ctx, s: number) => void; // s×s に描く
};

export const PLACES: Place[] = [
  {
    id: 'plain',
    name: 'home',
    say: 'Hello!',
    draw(c, s) {
      c.fillStyle = '#faf5ea';
      c.fillRect(0, 0, s, s);
      const g = c.createRadialGradient(s / 2, s * 0.45, 0, s / 2, s * 0.45, s * 0.7);
      g.addColorStop(0, 'rgba(255, 222, 89, 0.6)');
      g.addColorStop(1, 'rgba(255, 222, 89, 0)');
      c.fillStyle = g;
      c.fillRect(0, 0, s, s);
    }
  },
  {
    id: 'beach',
    name: 'beach',
    say: 'Beach day!',
    draw(c, s) {
      const g = c.createLinearGradient(0, 0, 0, s * 0.55);
      g.addColorStop(0, '#6ec3ee');
      g.addColorStop(1, '#d6f0fb');
      c.fillStyle = g;
      c.fillRect(0, 0, s, s);
      c.fillStyle = '#ffe27a';
      c.beginPath();
      c.arc(s * 0.82, s * 0.16, s * 0.08, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = '#1e9bb3';
      c.fillRect(0, s * 0.52, s, s * 0.2);
      c.fillStyle = 'rgba(255,255,255,0.7)';
      c.fillRect(0, s * 0.685, s, s * 0.02);
      c.fillStyle = '#f3dfae';
      c.fillRect(0, s * 0.7, s, s * 0.3);
    }
  },
  {
    id: 'bush',
    name: 'bush',
    say: 'Into the bush!',
    gloss: 'bush＝森や自然の中（NZ英語）',
    draw(c, s) {
      const g = c.createLinearGradient(0, 0, 0, s);
      g.addColorStop(0, '#cfe8c2');
      g.addColorStop(1, '#5f9a56');
      c.fillStyle = g;
      c.fillRect(0, 0, s, s);
      for (const [x, y, r, col] of [
        [0.12, 0.42, 0.2, '#3f7d46'],
        [0.9, 0.38, 0.24, '#3f7d46'],
        [0.3, 0.3, 0.16, '#4f9153'],
        [0.68, 0.28, 0.17, '#4f9153']
      ] as const) {
        c.fillStyle = col;
        c.beginPath();
        c.arc(x * s, y * s, r * s, 0, Math.PI * 2);
        c.fill();
      }
      c.fillStyle = '#3b6b3a';
      c.fillRect(0, s * 0.84, s, s * 0.16);
    }
  },
  {
    id: 'snow',
    name: 'snow',
    say: 'Brrr! Cold as!',
    gloss: 'cold as＝すごく寒い（NZの言い方）',
    draw(c, s) {
      const g = c.createLinearGradient(0, 0, 0, s);
      g.addColorStop(0, '#9fc9ea');
      g.addColorStop(1, '#eaf5fc');
      c.fillStyle = g;
      c.fillRect(0, 0, s, s);
      const peak = (x: number, y: number, w: number) => {
        c.fillStyle = '#7f95b3';
        c.beginPath();
        c.moveTo((x - w) * s, 0.84 * s);
        c.lineTo(x * s, y * s);
        c.lineTo((x + w) * s, 0.84 * s);
        c.closePath();
        c.fill();
        c.fillStyle = '#fff';
        c.beginPath();
        c.moveTo((x - w * 0.3) * s, (y + (0.84 - y) * 0.3) * s);
        c.lineTo(x * s, y * s);
        c.lineTo((x + w * 0.3) * s, (y + (0.84 - y) * 0.3) * s);
        c.closePath();
        c.fill();
      };
      peak(0.2, 0.22, 0.34);
      peak(0.8, 0.3, 0.32);
      c.fillStyle = '#fff';
      c.fillRect(0, s * 0.82, s, s * 0.18);
    }
  },
  {
    id: 'cafe',
    name: 'café',
    say: 'Flat white, please!',
    draw(c, s) {
      c.fillStyle = '#f3dcb8';
      c.fillRect(0, 0, s, s);
      c.fillStyle = '#3c4a3e';
      c.beginPath();
      c.roundRect(s * 0.06, s * 0.08, s * 0.3, s * 0.2, s * 0.02);
      c.fill();
      c.fillStyle = 'rgba(255,255,255,0.75)';
      for (let i = 0; i < 3; i++) c.fillRect(s * 0.1, s * (0.12 + i * 0.045), s * (0.2 - i * 0.04), s * 0.012);
      c.strokeStyle = '#7a5a3a';
      c.lineWidth = s * 0.008;
      c.beginPath();
      c.moveTo(s * 0.8, 0);
      c.lineTo(s * 0.8, s * 0.1);
      c.stroke();
      c.fillStyle = '#ee6c2b';
      c.beginPath();
      c.arc(s * 0.8, s * 0.13, s * 0.06, Math.PI, 0);
      c.fill();
      c.fillStyle = '#9a6a3c';
      c.fillRect(0, s * 0.8, s, s * 0.2);
      c.fillStyle = '#7d5129';
      c.fillRect(0, s * 0.8, s, s * 0.03);
    }
  }
];

// ---- 引っ張るための網目 ----

export const GRID = 24; // 網目の分割数
export const POINTS = (GRID + 1) * (GRID + 1);

// 絵が何も無いマスは描かなくてよいので、先に調べておく。
export function findEmptyCells(tex: HTMLCanvasElement): Uint8Array {
  const empty = new Uint8Array(GRID * GRID);
  const c = tex.getContext('2d');
  if (!c) return empty;
  const data = c.getImageData(0, 0, ART, ART).data;
  const cell = ART / GRID;
  for (let j = 0; j < GRID; j++) {
    for (let i = 0; i < GRID; i++) {
      let found = false;
      const x0 = Math.floor(i * cell);
      const y0 = Math.floor(j * cell);
      const x1 = Math.ceil((i + 1) * cell);
      const y1 = Math.ceil((j + 1) * cell);
      for (let y = y0; y < y1 && !found; y += 3) {
        for (let x = x0; x < x1; x += 3) {
          if (data[(y * ART + x) * 4 + 3] > 0) {
            found = true;
            break;
          }
        }
      }
      empty[j * GRID + i] = found ? 0 : 1;
    }
  }
  return empty;
}

// 網目の各点のずれ（off：0〜1の割合で x,y を交互に持つ）に合わせて、
// 元の絵を size×size にゆがめて描く。三角形ごとに切り抜いて貼る。
export function drawWarped(
  c: Ctx,
  tex: HTMLCanvasElement,
  off: Float32Array,
  empty: Uint8Array,
  size: number
) {
  const cell = ART / GRID;
  const px = (i: number, j: number) => (i / GRID + off[(j * (GRID + 1) + i) * 2]) * size;
  const py = (i: number, j: number) => (j / GRID + off[(j * (GRID + 1) + i) * 2 + 1]) * size;

  const tri = (
    ax: number, ay: number, bx: number, by: number, cx: number, cy: number,
    m11: number, m12: number, m21: number, m22: number, dx: number, dy: number
  ) => {
    // すき間が見えないよう、三角形をほんの少し外へ広げてから切り抜く。
    const gx = (ax + bx + cx) / 3;
    const gy = (ay + by + cy) / 3;
    const grow = (x: number, y: number): [number, number] => {
      const vx = x - gx;
      const vy = y - gy;
      const len = Math.hypot(vx, vy) || 1;
      return [x + (vx / len) * 0.8, y + (vy / len) * 0.8];
    };
    const [a0, a1] = grow(ax, ay);
    const [b0, b1] = grow(bx, by);
    const [c0, c1] = grow(cx, cy);
    c.save();
    c.beginPath();
    c.moveTo(a0, a1);
    c.lineTo(b0, b1);
    c.lineTo(c0, c1);
    c.closePath();
    c.clip();
    c.transform(m11, m12, m21, m22, dx, dy);
    c.drawImage(tex, 0, 0);
    c.restore();
  };

  for (let j = 0; j < GRID; j++) {
    for (let i = 0; i < GRID; i++) {
      if (empty[j * GRID + i]) continue;
      const u = i * cell;
      const v = j * cell;
      const ax = px(i, j), ay = py(i, j);
      const bx = px(i + 1, j), by = py(i + 1, j);
      const cx = px(i, j + 1), cy = py(i, j + 1);
      const ex = px(i + 1, j + 1), ey = py(i + 1, j + 1);
      // 左上の三角形（A を基準）
      let m11 = (bx - ax) / cell, m12 = (by - ay) / cell;
      let m21 = (cx - ax) / cell, m22 = (cy - ay) / cell;
      tri(ax, ay, bx, by, cx, cy, m11, m12, m21, m22, ax - m11 * u - m21 * v, ay - m12 * u - m22 * v);
      // 右下の三角形（E を基準）
      m11 = (ex - cx) / cell; m12 = (ey - cy) / cell;
      m21 = (ex - bx) / cell; m22 = (ey - by) / cell;
      tri(
        bx, by, ex, ey, cx, cy, m11, m12, m21, m22,
        ex - m11 * (u + cell) - m21 * (v + cell),
        ey - m12 * (u + cell) - m22 * (v + cell)
      );
    }
  }
}
