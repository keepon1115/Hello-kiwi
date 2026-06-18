# 画像アセット一覧（差し込みガイド）

各画像は `public/assets/images/...` に**下記のファイル名**で置けば、サイト上の `ImageSlot` が自動でプレースホルダから実画像に切り替わります。
（置くまでは、サイト上に「🥝 ファイル名・推奨サイズ」入りの枠が表示されます。差し込み箇所が一目でわかります。）

推奨サイズは目安です。比率さえ合っていれば多少前後してOK。形式は写真=PNG/JPG/WebP、ロゴ/アイコン=SVG推奨。

## common/（ロゴ・マーク）
| ファイル | 用途 | 推奨サイズ |
|---|---|---|
| `common/logo.svg` | 横ロゴ（必要なら） | 幅240程度 |
| `common/logo-mark.svg` | キウィのシンボルマーク（右レール上部・favicon） | 96×96 |
| `common/logo-white.svg` | 濃い背景用ロゴ | 幅240程度 |

## hero/（トップのヒーロー）
| ファイル | 用途 | 推奨サイズ |
|---|---|---|
| `hero/hero-main.png` | トップ主役画像（キウィ＋地球） | 1200×900（4:3） |
| `hero/og.png` | SNSシェア用OGP | 1200×630 |

## mascot/（案内役キウィ。無い間はインラインSVGで代替表示）
| ファイル | 用途 | 推奨サイズ |
|---|---|---|
| `mascot/kiwi-wave.png` | 手を振る | 600×600（透過） |
| `mascot/kiwi-cap.png` | 卒業帽 | 600×600（透過） |
| `mascot/kiwi-book.png` | 本を持つ | 600×600（透過） |
| `mascot/kiwi-point.png` | 指さし（CTA誘導） | 600×600（透過） |

## feature/（3つの特長）
| ファイル | 用途 | 推奨サイズ |
|---|---|---|
| `feature/feature-online.png` | 教室＆オンライン | 480×480 |
| `feature/feature-nz.png` | NZ文化 | 480×480 |
| `feature/feature-oneonone.png` | マンツーマン | 480×480 |

## course/（コースサムネ）
| ファイル | 用途 | 推奨サイズ |
|---|---|---|
| `course/course-kids-abc.png` | キッズABC | 800×600（4:3） |
| `course/course-kids.png` | キッズ英会話 | 800×600 |
| `course/course-adult.png` | 大人の英会話 | 800×600 |

## teacher/（先生）
| ファイル | 用途 | 推奨サイズ |
|---|---|---|
| `teacher/teacher-portrait.png` | 先生の写真/イラスト | 800×1000（4:5） |
| `teacher/teacher-hello.png` | 「はじめまして」バスト | 600×600 |

## story/（講師ストーリー漫画。配置済み）
| ファイル | 用途 | サイズ |
|---|---|---|
| `story/story1.png` | 第1章 My Story Begins | 1536×1024 |
| `story/story2.png` | 第2章 My Story Continues | 1536×1024 |
| `story/story3.png` | 第3章 The journey keeps going | 1536×1024 |

## voice/（受講生の声・アバター）
| ファイル | 用途 | 推奨サイズ |
|---|---|---|
| `voice/voice-kid.png` | 子ども | 200×200 |
| `voice/voice-parent.png` | 保護者 | 200×200 |
| `voice/voice-adult.png` | 大人 | 200×200 |

## blog/（記事サムネ）
| ファイル | 用途 | 推奨サイズ |
|---|---|---|
| `blog/blog-manuka.png` | マヌカハニー | 1200×630 |
| `blog/blog-nz-english.png` | NZ英語と教科書英語 | 1200×630 |
| `blog/blog-summer.png` | 夏の無料体験 | 1200×630 |
