// 「Kiwi Café」のメニュー・注文データと、答え合わせのルール。
//
// ■ 音声をあとから入れる方法
//   1. 録音した音声を public/assets/audio/cafe/ に置く（例: order-1.mp3）
//   2. 下の ORDERS の該当する注文の audio に、そのパスを書く
//        audio: '/assets/audio/cafe/order-1.mp3'
//   audio が入っている注文は「聞いて答える」表示に自動で切り替わる
//   （文字は「Show text」を押すまで隠れる）。null のあいだは文字だけで出題する。

export type ItemId =
  | 'flatWhite'
  | 'longBlack'
  | 'hotChocolate'
  | 'fluffy'
  | 'mincePie'
  | 'cheeseScone'
  | 'lamington'
  | 'pavlova'
  | 'anzac';

export type MenuItem = { id: ItemId; name: string; kind: 'drink' | 'food' };

export const MENU: MenuItem[] = [
  { id: 'flatWhite', name: 'flat white', kind: 'drink' },
  { id: 'longBlack', name: 'long black', kind: 'drink' },
  { id: 'hotChocolate', name: 'hot chocolate', kind: 'drink' },
  { id: 'fluffy', name: 'fluffy', kind: 'drink' },
  { id: 'mincePie', name: 'mince pie', kind: 'food' },
  { id: 'cheeseScone', name: 'cheese scone', kind: 'food' },
  { id: 'lamington', name: 'lamington', kind: 'food' },
  { id: 'pavlova', name: 'pavlova', kind: 'food' },
  { id: 'anzac', name: 'Anzac biscuit', kind: 'food' }
];

export type Where = 'here' | 'takeaway';
export const WHERE_LABEL: Record<Where, string> = { here: 'have here', takeaway: 'takeaway' };

export type Tray = Partial<Record<ItemId, number>>;

export type Order = {
  customer: string; // お客さんの顔（絵文字）
  text: string; // 注文のセリフ（録音するときの台本にもなる）
  audio: string | null; // 音声ファイルのパス。まだ無ければ null
  items: Tray; // 正しい注文
  where?: Where; // 店内か持ち帰りかを言う注文だけ指定する
  thanks: string; // 正解したときのお客さんのひとこと
  tip: string; // 答え合わせのあとに出す、ひとこと解説
};

export const ORDERS: Order[] = [
  {
    customer: '👩',
    text: 'Hi! Can I get a flat white, please?',
    audio: null,
    items: { flatWhite: 1 },
    thanks: 'Cheers!',
    tip: '“Can I get ～, please?” は注文の定番。“Cheers” はNZでは「ありがとう」の意味でもよく使います。'
  },
  {
    customer: '👨‍🦳',
    text: 'A hot chocolate and a cheese scone, please.',
    audio: null,
    items: { hotChocolate: 1, cheeseScone: 1 },
    thanks: 'Lovely, thanks.',
    tip: 'チーズスコーンはNZのカフェの定番。甘くないスコーンで、温めてバターをぬって食べます。'
  },
  {
    customer: '🧑',
    text: 'Two flat whites, please.',
    audio: null,
    items: { flatWhite: 2 },
    thanks: 'Sweet as!',
    tip: '2つ以上のときは “flat whites” と s がつきます。数を聞きのがさないのがコツ。'
  },
  {
    customer: '👩‍🦰',
    text: 'Could I have a long black and a mince pie?',
    audio: null,
    items: { longBlack: 1, mincePie: 1 },
    thanks: 'Ta!',
    tip: '“long black” はお湯にエスプレッソを注いだブラックコーヒー。“mince pie” はひき肉入りのパイで、NZの国民食です。'
  },
  {
    customer: '👨',
    text: 'One fluffy for my son and a flat white for me, please. To have here.',
    audio: null,
    items: { fluffy: 1, flatWhite: 1 },
    where: 'here',
    thanks: 'Thanks heaps!',
    tip: '“fluffy” は子ども用の、泡立てたミルクの小さな一杯。“to have here” は「店内で」。'
  },
  {
    customer: '👵',
    text: 'Two mince pies and a lamington to take away, please.',
    audio: null,
    items: { mincePie: 2, lamington: 1 },
    where: 'takeaway',
    thanks: 'Lovely. Have a good one!',
    tip: '持ち帰りはNZでは “takeaway”（アメリカでは “to go”）。“lamington” はチョコとココナッツをまぶした四角いケーキです。'
  },
  {
    customer: '🧔',
    text: 'A long black, please. Oh, sorry — make that a flat white. And an Anzac biscuit.',
    audio: null,
    items: { flatWhite: 1, anzac: 1 },
    thanks: 'Cheers, mate!',
    tip: '“make that ～” は「やっぱり～にして」。言い直しは、あとに言ったほうが正解です。'
  },
  {
    customer: '👩‍🦱',
    text: 'Can I get three hot chocolates, two cheese scones and a slice of pavlova? Takeaway, thanks.',
    audio: null,
    items: { hotChocolate: 3, cheeseScone: 2, pavlova: 1 },
    where: 'takeaway',
    thanks: 'You’re a legend!',
    tip: '“pavlova” はメレンゲにクリームとくだものをのせたNZのお祝いケーキ。“You’re a legend!” は「最高！」というほめ言葉。'
  }
];

// トレイと注文がぴったり同じか。
export function isCorrect(order: Order, tray: Tray, where: Where | null): boolean {
  const same = MENU.every((m) => (tray[m.id] ?? 0) === (order.items[m.id] ?? 0));
  return same && (order.where === undefined || order.where === where);
}

// 注文を「2 × flat white, 1 × mince pie」のような一行にする。
export function describe(items: Tray, where?: Where): string {
  const parts = MENU.filter((m) => items[m.id]).map((m) => `${items[m.id]} × ${m.name}`);
  if (where) parts.push(WHERE_LABEL[where]);
  return parts.join(', ');
}

export type CafeResult = {
  min: number;
  title: string;
  message: string;
  courses: { slug: string; name: string }[];
};

// 正解数（min 以上）で決まる結果と、合いそうなコース。上から順に判定する。
export const CAFE_RESULTS: CafeResult[] = [
  {
    min: 7,
    title: 'Star Barista',
    message:
      '言い直しも数も、しっかり受け取れました。次は注文する側になって、自分の言葉で話す番です。',
    courses: [
      { slug: 'travel', name: 'Travel英会話コース' },
      { slug: 'free', name: 'フリーコース' }
    ]
  },
  {
    min: 4,
    title: 'Good Barista',
    message:
      'だいたい分かる、まで来ています。数や言い直しのような細かいところを、会話の中で確かにしていきましょう。',
    courses: [
      { slug: 'basic', name: 'ベーシックコース' },
      { slug: 'travel', name: 'Travel英会話コース' }
    ]
  },
  {
    min: 0,
    title: 'First Day',
    message:
      'はじめての日は、だれでもこうです。短い注文から、ひとつずつ聞き取れる言葉を増やしていきましょう。',
    courses: [
      { slug: 'phonics', name: 'フォニックスコース（小学生）' },
      { slug: 'basic', name: 'ベーシックコース（中学生〜大人）' }
    ]
  }
];

export function resultFor(score: number): CafeResult {
  return CAFE_RESULTS.find((r) => score >= r.min) ?? CAFE_RESULTS[CAFE_RESULTS.length - 1];
}
