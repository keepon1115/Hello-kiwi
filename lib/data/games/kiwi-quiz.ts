// 「Kiwi度チェック」の問題データ。
// 北から南へ7つの町をめぐる順番で並べる。問題・解説はInstagramの
// 「NZコラム」「今日の一言英語」にもそのまま使える粒度で書く。
// 正解の位置は answer（choices の添字）で持つ。

export type QuizQuestion = {
  place: string; // 町の名前（英語）
  placeJa: string;
  scene: string; // その町での場面
  phrase: string; // 主役のNZ英語
  question: string;
  choices: [string, string, string];
  answer: 0 | 1 | 2;
  explain: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    place: 'Auckland',
    placeJa: 'オークランド',
    scene: '空港を出たら、もう夏の空。となりの人が言いました。',
    phrase: 'Don’t forget your jandals!',
    question: '“jandals” って、なんのこと？',
    choices: ['ビーチサンダル', 'サングラス', 'ジャム入りのパン'],
    answer: 0,
    explain:
      'NZではビーチサンダルを “jandals” と呼びます。アメリカなら flip-flops、オーストラリアなら thongs。同じ英語でも国で変わります。'
  },
  {
    place: 'Rotorua',
    placeJa: 'ロトルア',
    scene: '温泉の町に着くと、お店の人が笑顔でひとこと。',
    phrase: 'Kia ora!',
    question: '“Kia ora” は、どんなときの言葉？',
    choices: ['おやすみなさい', 'こんにちは・ありがとう', 'ごめんなさい'],
    answer: 1,
    explain:
      '“Kia ora” はマオリ語のあいさつ。「こんにちは」にも「ありがとう」にも使えて、NZでは英語の会話にもふつうに出てきます。'
  },
  {
    place: 'Wellington',
    placeJa: 'ウェリントン',
    scene: 'カフェの町で、ひと休み。前の人が注文しています。',
    phrase: 'Can I get a flat white, please?',
    question: '“flat white” を頼むと、出てくるのは？',
    choices: ['白ワイン', 'エスプレッソにきめ細かいミルクを注いだコーヒー', '平たい白パン'],
    answer: 1,
    explain:
      '“flat white” はNZとオーストラリアで親しまれているコーヒー。ラテよりミルクの泡がうすく、コーヒーの味がしっかりします。'
  },
  {
    place: 'Nelson',
    placeJa: 'ネルソン',
    scene: 'フェリーで南島へ。今日はビーチでピクニックです。',
    phrase: 'Put the drinks in the chilly bin.',
    question: '“chilly bin” は、どれ？',
    choices: ['ゴミ箱', '冷蔵庫', 'クーラーボックス'],
    answer: 2,
    explain:
      'クーラーボックスはNZでは “chilly bin”。chilly（ひんやり）＋ bin（入れ物）で、見たままの名前です。'
  },
  {
    place: 'Christchurch',
    placeJa: 'クライストチャーチ',
    scene: '「3時に公園でね」と言ったら、友だちの返事は。',
    phrase: 'Sweet as!',
    question: '“Sweet as” は、どういう意味？',
    choices: ['いいね！了解！', '甘すぎるよ', 'あとでね'],
    answer: 0,
    explain:
      '“Sweet as” は「いいね」「了解」。as のあとに何も続かないのがNZ流で、“cold as”（すごく寒い）のようにも使います。'
  },
  {
    place: 'Queenstown',
    placeJa: 'クイーンズタウン',
    scene: '山と湖の町。宿の人に週末の予定を聞かれました。',
    phrase: 'Are you going tramping?',
    question: '“tramping” って、なにをすること？',
    choices: ['山歩き（ハイキング）', 'トランプで遊ぶこと', '買い物'],
    answer: 0,
    explain:
      'NZでは山歩きやハイキングを “tramping” と言います。自然の中を何日もかけて歩く人も多く、NZらしい楽しみ方です。'
  },
  {
    place: 'Stewart Island',
    placeJa: 'スチュアート島',
    scene: '旅の終点は、野生のキウイに会える島。',
    phrase: 'I’m a Kiwi.',
    question: 'NZで “Kiwi” と言うと、なにを指す？',
    choices: ['くだもののキウイだけ', '鳥のキウイと、NZの人', 'ラグビーのボール'],
    answer: 1,
    explain:
      '“Kiwi” は飛べない鳥のキウイのことで、NZの人たちの愛称でもあります。くだものは “kiwifruit” と呼び分けます。'
  }
];

export type QuizRank = { min: number; title: string; message: string };

// 正解数（min 以上）で決まる称号とキウイのひとこと。上から順に判定する。
export const QUIZ_RANKS: QuizRank[] = [
  {
    min: 7,
    title: 'ほぼ Kiwi',
    message: 'Sweet as! 全問正解です。もうNZの空港に降りても大丈夫。次は声に出して使ってみませんか。'
  },
  {
    min: 5,
    title: 'NZの旅じょうず',
    message: 'Good on ya!（やるね！）旅先でも困らなさそうです。知っている言葉を、話せる言葉にしていきましょう。'
  },
  {
    min: 3,
    title: 'NZに着いたばかり',
    message: 'いいスタートです。まちがえた言葉ほど、よく覚えられます。レッスンではこういう言葉を会話の中で使います。'
  },
  {
    min: 0,
    title: 'これから出発',
    message: 'No worries!（だいじょうぶ！）今日だけで7つのNZ英語に出会えました。ここから一緒にはじめましょう。'
  }
];

export function rankFor(score: number): QuizRank {
  return QUIZ_RANKS.find((r) => score >= r.min) ?? QUIZ_RANKS[QUIZ_RANKS.length - 1];
}
