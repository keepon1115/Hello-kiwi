'use client';
import Link from 'next/link';
import { useReveal } from '@/lib/useReveal';
import { COURSES, COURSE_COMMON } from '@/lib/data/courses';
import { LINKS } from '@/lib/site';
import { PLANS, PRICING_NOTES } from '@/lib/data/pricing';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { ImageSlot } from '@/components/ImageSlot';

export function CoursesClient() {
  useReveal();

  return (
    <>
      <section className="page-hero">
        <div className="container reveal">
          <p className="eyebrow">Courses & Pricing</p>
          <h1>コース・料金</h1>
          <p className="lead">
            えらべる3つの基本コース。
            <br />
            1対1の個人レッスンなので、ご希望に合わせて内容を柔軟にアレンジできます。
          </p>
        </div>
      </section>

      <section className="section common-band">
        <div className="container">
          <Reveal className="common-card card">
            <h2>コース共通の特徴</h2>
            <ul>
              {COURSE_COMMON.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container course-list">
          {COURSES.map((c) => (
            <Reveal key={c.slug} delay={1}>
              <article id={c.slug} className="course card">
                <div className="course-head">
                  <div>
                    <span className="chip">{c.ageBadge}</span>
                    <h2>{c.name}</h2>
                    <p className="course-en">{c.enName}</p>
                  </div>
                </div>
                <p className="course-lead">{c.lead}</p>
                {c.points.length > 0 && (
                  <ul className="course-points">
                    {c.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
                <div className="topics">
                  {c.topics.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="course-cta">
                  <Link href="/trial" className="btn btn-primary">
                    このコースを体験する
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal className="pricing card" delay={2}>
            <h2>料金</h2>
            <p className="pricing-lead">料金は全コース同じです。1回50分、お好きな回数からお選びいただけます。</p>
            <div className="price-wrap">
              <table className="price-table">
                <thead>
                  <tr>
                    <th>コース</th>
                    <th>時間</th>
                    <th>通常価格</th>
                    <th className="hl">スクール生特別価格</th>
                  </tr>
                </thead>
                <tbody>
                  {PLANS.map((p) => (
                    <tr key={p.course}>
                      <td data-label="コース">
                        <strong>{p.course}</strong>
                      </td>
                      <td data-label="時間">{p.format}</td>
                      <td data-label="通常価格">{p.regular}</td>
                      <td data-label="スクール生特別価格" className="hl">
                        {p.student}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="pricing-notes">
              {PRICING_NOTES.map((note) => (
                <li key={note} className={note.includes('7月末まで無料キャンペーン中') ? 'campaign' : undefined}>
                  {note.includes('キープオンラボ') ? (
                    <>
                      特別価格の対象：
                      <a href="https://keeponlabo.com/" target="_blank" rel="noopener noreferrer">
                        キープオンラボ
                      </a>
                      、または
                      <a href="https://www.keeponlearning.fun/" target="_blank" rel="noopener noreferrer">
                        エジソンアカデミー本校
                      </a>
                      の受講生
                    </>
                  ) : (
                    note
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="schedule card" delay={3}>
            <h2>予定表</h2>
            <p>通いたいときに、学べる分だけ。</p>
            <ImageSlot
              src="/assets/images/school/schedule5-7.jpg"
              label="schedule5-7"
              alt="Hello Kiwi英会話の予定表"
              ratio="4/3"
              className="schedule-img"
            />
            <div className="schedule-copy">
              <p>スケジュールに縛られず、行きたいときに予約して学べます。</p>
              <p>
                固定の曜日はありません。「いま学びたい」「時間ができた」というタイミングでその都度予約して、自分のペースで自由に続けられます。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section steam">
        <div className="container">
          <Reveal className="steam-card">
            <span className="chip steam-chip">その先の学びへ</span>
            <h2>英語を使って、もっと広がる子供たちの可能性へ</h2>
            <p>
              英語で話せるようになってきたら、次はステップアップ。その英語を使いながら、ロボット・プログラミングやものづくりに挑戦するクラスも選べます。
              こちらは提携教室「CLAFT（クラフト）」が担当します。
            </p>
            <a href={LINKS.englishSteam} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              英会話×STEAM（CLAFT）を見る
            </a>
          </Reveal>
        </div>
      </section>

      <CTASection />

      <style jsx>{`
        .page-hero {
          text-align: center;
          padding: clamp(44px, 7vw, 80px) 0;
          background: radial-gradient(80% 100% at 50% 0%, rgb(var(--yellow-rgb) / 0.3), transparent 60%);
        }
        .page-hero h1 { font-size: clamp(2rem, 6vw, 3rem); margin: 8px 0 14px; }
        .page-hero .lead { color: var(--cocoa-soft); max-width: 36em; margin: 0 auto; }
        .common-band { padding-top: 0; }
        :global(.common-card) { max-width: 760px; margin: 0 auto; }
        :global(.common-card) h2 { font-size: 1.3rem; margin-bottom: 14px; text-align: center; }
        :global(.common-card) ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
        :global(.common-card) li { color: var(--cocoa-soft); font-weight: 500; }
        .course-list { display: grid; gap: 28px; max-width: 820px; }
        .course { scroll-margin-top: 90px; }
        .course-head { display: flex; gap: 16px; align-items: center; margin-bottom: 14px; }
        .course-head h2 { font-size: clamp(1.4rem, 4vw, 1.9rem); margin: 4px 0 2px; }
        .course-en { color: var(--leaf-green); font-weight: 700; font-size: 0.85rem; margin: 0; }
        .course-lead { color: var(--cocoa-soft); margin: 0 0 16px; }
        .course-points { list-style: none; padding: 0; margin: 0 0 18px; display: grid; gap: 10px; }
        .course-points li { font-size: 0.92rem; }
        .topics { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
        .topics span {
          background: rgb(var(--green-rgb) / 0.12);
          color: var(--leaf-green);
          border-radius: 999px;
          padding: 6px 12px;
          font-size: 0.82rem;
          font-weight: 700;
        }
        .course-cta { display: flex; flex-wrap: wrap; gap: 12px; }
        :global(.pricing) { scroll-margin-top: 90px; }
        :global(.pricing) h2 { font-size: clamp(1.9rem, 5vw, 2.7rem); margin-bottom: 8px; text-align: center; }
        .pricing-lead { color: var(--cocoa-soft); text-align: center; margin: 0 0 20px; }
        .price-wrap { overflow-x: auto; }
        .price-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          min-width: 640px;
          border: 1px solid rgb(var(--cocoa-rgb) / 0.08);
        }
        .price-table th,
        .price-table td {
          padding: 14px 16px;
          text-align: left;
          border-bottom: 1px solid rgb(var(--cocoa-rgb) / 0.08);
        }
        .price-table thead th {
          background: color-mix(in srgb, var(--leaf-green) 18%, #fff);
          font-family: var(--font-round);
          font-size: 0.86rem;
        }
        .price-table th.hl,
        .price-table td.hl {
          background: rgb(var(--yellow-rgb) / 0.22);
          font-weight: 700;
          color: color-mix(in srgb, var(--kiwi-orange) 88%, var(--cocoa));
        }
        .price-table tbody tr:last-child td { border-bottom: none; }
        .pricing-notes { margin: 20px 0 0; padding-left: 1.2em; display: grid; gap: 8px; }
        .pricing-notes li { color: var(--cocoa-soft); font-size: 0.88rem; }
        .pricing-notes a { color: var(--leaf-green); font-weight: 700; text-decoration: underline; }
        .pricing-notes .campaign { color: #d92828; font-weight: 800; }
        :global(.schedule) { text-align: center; }
        :global(.schedule) h2 { font-size: clamp(1.9rem, 5vw, 2.7rem); margin-bottom: 8px; }
        :global(.schedule) > p { color: var(--cocoa); font-weight: 800; margin: 0 0 20px; }
        :global(.schedule-img) { border-radius: 16px; box-shadow: var(--shadow-soft); }
        .schedule-copy { margin-top: 20px; color: var(--cocoa-soft); }
        .schedule-copy p { margin: 0 auto 10px; max-width: 38em; }
        :global(.steam-card) {
          max-width: 760px;
          margin: 0 auto;
          background: linear-gradient(135deg, #fff, color-mix(in srgb, var(--cream) 60%, var(--leaf-green) 14%));
          border-radius: 28px;
          padding: clamp(28px, 5vw, 48px);
          box-shadow: var(--shadow-lift);
          text-align: center;
        }
        .steam-chip { background: rgb(var(--orange-rgb) / 0.16); color: var(--kiwi-orange); }
        :global(.steam-card) h2 { font-size: clamp(1.4rem, 4.4vw, 2rem); margin: 12px 0 14px; }
        :global(.steam-card) p { color: var(--cocoa-soft); max-width: 34em; margin: 0 auto 22px; }
      `}</style>
    </>
  );
}
