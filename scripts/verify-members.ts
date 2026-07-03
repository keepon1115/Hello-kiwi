import {
  getStudentByToken,
  getTicketStatus,
  getPassportStamps,
  getLessonHistory,
  getAllVoices,
  getAllNzCards
} from '../lib/members';

let failures = 0;

function assert(condition: unknown, message: string) {
  if (!condition) {
    failures++;
    console.error(`✗ ${message}`);
  } else {
    console.log(`✓ ${message}`);
  }
}

const taro = getStudentByToken('kw-a7x2m9qp');
assert(!!taro, 'kw-a7x2m9qp が見つかる');
if (taro) {
  const history = getLessonHistory(taro);
  assert(history[0].date === '2026-06-26', 'きろくは新しい順（先頭が最新日付）');
  assert(history.length === taro.lessons.length, 'きろくの件数は lessons と一致する');

  const ticket = getTicketStatus(taro);
  assert(!!ticket, 'たろうはチケットを持つ');
  if (ticket) {
    assert(ticket.total === 4, 'チケット総数は4');
    // countsForTicket:false の 06-05 は消化対象から除外される -> 消化3件、残り1
    assert(ticket.remaining === 1, `残り1回になる（実際: ${ticket.remaining}）`);
    assert(ticket.isLow === true, '残り1回は isLow フラグが立つ');
    assert(ticket.isEmpty === false, '残り1回は isEmpty ではない');
    assert(
      ticket.slots.filter((s) => s.date !== null).length === 3,
      '消化済みスロットは3つ'
    );
    assert(
      ticket.slots[0].date === '2026-06-12',
      `最初の消化スロットは古い順で 2026-06-12（実際: ${ticket.slots[0].date}）`
    );
  }

  const passport = getPassportStamps(taro);
  assert(
    passport.length === taro.lessons.length + (taro.bonusStamps?.length ?? 0),
    'パスポートは lessons + bonusStamps の合計件数'
  );
  assert(passport[0].date === '2026-06-26', 'パスポートも新しい順');
}

const hanako = getStudentByToken('kw-h3k9wtqz');
assert(!!hanako, 'kw-h3k9wtqz が見つかる');
if (hanako) {
  assert(hanako.ticket === null, 'はなこは月謝制（ticket: null）');
  assert(!hanako.quizletUrl, 'はなこは quizletUrl なし');
  assert(getTicketStatus(hanako) === null, 'ticket: null の生徒は getTicketStatus が null を返す');
}

const tanaka = getStudentByToken('kw-m5n8rzxy');
assert(!!tanaka, 'kw-m5n8rzxy が見つかる');
if (tanaka) {
  assert(tanaka.tone === 'adult', '田中さんは adult トーン');
  const ticket = getTicketStatus(tanaka);
  assert(!!ticket && ticket.remaining === 5, `田中さんの残りは5（実際: ${ticket?.remaining}）`);
}

assert(getStudentByToken('kw-does-not-exist') === null, '存在しないトークンは null');

// 超過消化の警告テスト（本番データを汚さないよう、その場限りの構造で検証）
{
  const original = console.warn;
  let warned = false;
  console.warn = (...args: unknown[]) => {
    warned = true;
    original(...args);
  };
  const overConsumed = {
    token: 'kw-test-over',
    displayName: 'test',
    tone: 'kids' as const,
    startedAt: '2026-01',
    lessons: [
      { date: '2026-01-01', message: 'a' },
      { date: '2026-01-02', message: 'b' },
      { date: '2026-01-03', message: 'c' }
    ],
    ticket: { label: '2かいチケット', total: 2, startDate: '2026-01-01' },
    bonusStamps: []
  };
  const status = getTicketStatus(overConsumed);
  console.warn = original;
  assert(status?.remaining === 0, '超過消化時、残数はマイナスにならず0になる');
  assert(warned, '超過消化時、console.warn が呼ばれる');
}

assert(getAllVoices().length >= 1, '声ポストが1件以上ある');
assert(getAllNzCards().length >= 1, 'NZカードが1件以上ある');

console.log('');
if (failures > 0) {
  console.error(`${failures} 件の検証に失敗しました。`);
  process.exit(1);
} else {
  console.log('すべての検証にパスしました。');
}
