# Hello Kiwi 英会話

ニュージーランド育ちのバイリンガル日本人講師による、初心者にやさしい英会話教室のサイト。
運営元 KEEPON / CLAFT の兄弟ブランドとして、独自のアイデンティティ（クリーム × キウィ × 丸み × 絵本感）を持つ。

## 技術スタック

- Next.js 14.2.5（App Router）
- TypeScript / React 18
- Tailwind CSS 3.4 + `app/globals.css` の CSS変数（カラーの単一ソース）
- フォント：next/font（Zen Maru Gothic / Noto Sans JP / Baloo 2）
- 各ページ＝ `page.tsx`（Server・metadata担当）＋ `XxxClient.tsx`（Client・アニメ担当）

## 開発

```bash
npm install
npm run dev      # http://localhost:3003
npm run build
```

## レイアウト（CLAFT流の3カラム構造）

- **モバイル基準（〜1279px）**：上部固定ヘッダー（ハンバーガー）＋左ドロワー＋右下FAB（LINE）。
- **PC（1280px〜）**：3カラム grid。**左＝メニュー（メモ風サイドバー）／中央＝コンテンツ／右＝リンクレール**。
- 中央 `.site-main` は**最大480px固定**。モバイルとPCで同じ並び＝「野原(field)に置いた絵本のページ(page)」として見せる。
- 外枠は `components/SiteShell.tsx`（reveal 監視もここで一括）。中央カラムは `container-type: inline-size` なので、各セクションの段組みは**コンテナクエリ**（`@container`）で制御する（ビューポート `@media` で段組みしないこと＝480pxで崩れる）。
- CLAFT の craft（テープ・傾き・ドゥードル）は**使わない**。まる角・やわ影・絵本感で独自世界に。

## ディレクトリ

```
app/                 各ページ（page.tsx + *Client.tsx）
  layout.tsx         フォント・metadata・LocalBusiness JSON-LD・<SiteShell>
  globals.css        デザインシステム＋シェル（カラートークン・3カラム・reveal/アニメ）
  sitemap.ts / robots.ts
components/
  SiteShell.tsx      3カラム外枠（モバイルヘッダー/ドロワー/FAB・reveal）
  Nav.tsx            左サイド＆ドロワー共用ナビ
  RightRail.tsx      PC右レール（ロゴ→体験/LINE→SNS→KEEPON/CLAFT）
  ImageSlot.tsx      画像差し込みスロット（未配置はファイル名つき枠／配置で自動表示）
  Footer / Mascot / Button / Reveal / SectionHeading /
  AgeSelector / FeatureCards / CTASection / Accordion
lib/
  site.ts            外部リンク・連絡先・ナビ（単一ソース）
  useReveal.ts       スクロール出現フック（SiteShell が主、保険として残置）
  data/              courses / pricing / posts / voices / faq / story（将来 microCMS/MDX へ差し替え前提）
public/assets/images/  画像一式（→ ASSETS.md に差し込みガイド）
```

## 画像の差し込み

`ASSETS.md` に全画像のファイル名・用途・推奨サイズを記載。`public/assets/images/...` に同名で置けば、
`ImageSlot` がプレースホルダ（🥝＋ファイル名入りの枠）から実画像へ自動で切り替わる。

## メッセージ設計（生徒主役）

主役は「**話せるようになる生徒の未来**」。NZ育ち講師は“初心者でも大丈夫”を信じられる**理由（伴走者）**として配置し、
「先生＝主役」にはしない。About は「**初心者でも大丈夫な理由**」として講師ストーリーを見せる。

## デザインシステム

カラーは `:root` を単一ソースとし、Tailwind は RGB トリプレットを参照（`bg-orange/10` 等が使える）。
役割固定：**オレンジ＝行動 / グリーン＝信頼 / イエロー＝楽しさ**。地＝`--field`（野原クリーム）/ 紙＝`--page`（絵本ページ）。

| 役割 | 名前 | HEX |
|---|---|---|
| 主役・CTA | Kiwi Orange | `#EE6C2B` |
| 信頼・見出し | Leaf Green | `#7CB342` |
| 楽しさ | Sunny Yellow | `#FFDE59` |
| 背景ベース | Cream | `#FAF5EA` |
| 文字・締め | Cocoa Brown | `#5A4329` |

大人/シニア向けページは、ルート要素に `data-tone="adult"` を付けると、同じ5色が自動でくすんだトーン
（テラコッタ／セージ／オークル）に切り替わり、丸みも抑えられる。

## TODO（将来）

- お知らせ・ブログを microCMS または MDX へ接続（`lib/data/posts.ts` の型を踏襲）
- 体験・問い合わせフォームの送信先接続（現状はデモ動作）
- ヒーロー画像・OG画像（`/assets/images/hero/og.png`）の差し替え
- 受講生の声・料金の実データ反映
