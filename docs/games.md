# ゲーム（/play）の覚え書き

体験を申し込む前に、英語とニュージーランドに少し触れてもらうためのブラウザゲーム。
登録なしで遊べて、結果画面から無料体験（`/trial?from=<ゲーム名>`）へ案内する。

## いまの状態：URL限定公開

メニューにもサイトマップにも載せておらず、検索にも出ない設定（noindex）にしている。
パスワードはないので、URLを知っている人は誰でも遊べる。

| ゲーム | URL | 中身のデータ |
| --- | --- | --- |
| 入口ページ | `/play` | `app/play/PlayClient.tsx` |
| Kiwi度チェック（NZ英語の3択クイズ・7問） | `/play/kiwi-quiz` | `lib/data/games/kiwi-quiz.ts` |
| Code the Kiwi（英語ブロックのパズル・6ステージ） | `/play/code-the-kiwi` | `lib/data/games/code-the-kiwi.ts` |
| Kiwi Café（カフェの注文をとる・8問） | `/play/kiwi-cafe` | `lib/data/games/kiwi-cafe.ts` |
| Kiwi Dress-Up（着せかえ・引っ張る・アイコン保存） | `/play/kiwi-dress-up` | `lib/data/games/kiwi-dress-up.ts` |

問題文・解説・称号・ステージは、上の「中身のデータ」のファイルを直せば変わる。

## 正式公開するときにやること

1. `app/play/layout.tsx` を消す（noindex が外れる）。
2. `lib/site.ts` の `NAV` に `{ href: '/play', label: 'ゲームであそぶ', en: 'Play' }` を足す。
3. `app/sitemap.ts` の一覧に `/play` `/play/kiwi-quiz` `/play/code-the-kiwi` `/play/kiwi-cafe` `/play/kiwi-dress-up` を足す。
4. （おすすめ）トップページに `/play` へのバナーを置く。

## Kiwi Café に音声を入れる方法

いまは文字だけで出題している。音声は1問ずつ入れられる（入れた問題だけ切り替わる）。

1. 録音したファイルを `public/assets/audio/cafe/` に置く（例：`order-1.mp3`）。
2. `lib/data/games/kiwi-cafe.ts` の該当する注文の `audio: null` を
   `audio: '/assets/audio/cafe/order-1.mp3'` のように書き換える。

音声が入った注文は「聞いて答える」表示になる。文字は隠れ、「▶ Listen」で聞き直し、
「Show text」で文字を出せる。録音の台本は、同じファイルの各注文の `text` をそのまま使う。

## Kiwi Dress-Up にアイテムを足す方法

`lib/data/games/kiwi-dress-up.ts` の `ITEMS`（服）か `PLACES`（背景）に1つ足す。
服は 800×800 の座標で `draw` に描き方を書き、`box` にサムネイルの切り抜き範囲を書く。
キウイの絵はこのゲーム用に描き起こしたもので、サイトのマスコット画像とは別物。

## 公開前に確認したいこと（未確認）

- NZ英語の説明、カフェの注文のセリフと解説が現地の感覚に合っているか（ノブ先生に見てもらう）。
- Kiwi度チェックの「キウイのひとこと」を、ノブ先生の言葉に差し替えるか。
- Kiwi Café の「合いそうなコース」は仮の対応
  （0〜3問：フォニックス／ベーシック、4〜6問：ベーシック／Travel英会話、7〜8問：Travel英会話／フリー）。
- 本番のフォントでの見た目（開発環境では代わりの書体で確認した）。

## 計測について

体験ボタンのリンクには `?from=kiwi-quiz` などの出どころを付けている。
ただしサイトにアクセス解析が入っていないので、いまは数を見られない。
解析を入れるか、体験申込の「どこで知ったか」に「ゲーム」を足すと追えるようになる。
