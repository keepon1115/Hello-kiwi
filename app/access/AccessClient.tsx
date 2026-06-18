'use client';
import { useReveal } from '@/lib/useReveal';
import { SITE } from '@/lib/site';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { ImageSlot } from '@/components/ImageSlot';

const MAP_QUERY = encodeURIComponent('大阪府八尾市光町1-2 マイシン光町ビル4階');

export function AccessClient() {
  useReveal();

  return (
    <>
      <section className="page-hero">
        <div className="container reveal">
          <p className="eyebrow">Access</p>
          <h1>アクセス</h1>
          <p className="lead">近鉄八尾駅から徒歩8分。オンラインでも全国から受講できます。</p>
        </div>
      </section>

      <section className="section">
        <div className="container school-photos">
          <Reveal>
            <ImageSlot
              src="/assets/images/school/school1.jpg"
              label="school1"
              alt="Hello Kiwi英会話の教室写真1"
              ratio="4/3"
              className="school-photo"
            />
          </Reveal>
          <Reveal delay={1}>
            <ImageSlot
              src="/assets/images/school/school2.jpg"
              label="school2"
              alt="Hello Kiwi英会話の教室写真2"
              ratio="4/3"
              className="school-photo"
            />
          </Reveal>
        </div>

        <div className="container access-grid">
          <Reveal className="map">
            <iframe
              title="Hello Kiwi英会話の地図"
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>

          <Reveal className="info" delay={1}>
            <dl>
              <div>
                <dt>
                  住所
                </dt>
                <dd>
                  〒{SITE.address.postalCode}
                  <br />
                  大阪府八尾市光町1-2 マイシン光町ビル4階
                  <br />
                  <span>
                    4階にあるロボット・プログラミング教室（
                    <a href="https://keeponlabo.com/" target="_blank" rel="noopener noreferrer">
                      キープオンラボ
                    </a>
                    ）と同じ場所です。
                  </span>
                </dd>
              </div>
              <div>
                <dt>
                  電車でお越しの方
                </dt>
                <dd>近鉄八尾駅より北へ徒歩約8分で行けます！</dd>
              </div>
              <div>
                <dt>
                  目印
                </dt>
                <dd>
                  アリオ北西出口の光町交差点から2軒目の白いビルの4階。おとなりが焼肉屋「和牛亭 仁」さん、お向かいがお寿司屋「福寿司」さんで、建物の右端に階段があります。
                </dd>
              </div>
              <div>
                <dt>
                  お車でお越しの方
                </dt>
                <dd>駐車場はございませんので、近くのコインパーキングをご利用ください。</dd>
              </div>
              <div>
                <dt>
                  自転車でお越しの方
                </dt>
                <dd>裏側の「魚べい」さん1階の駐輪場へ無料で止めることが出来ます。</dd>
              </div>
            </dl>
            <a
              className="btn btn-ghost"
              href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Googleマップで開く →
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
        .page-hero .lead { color: var(--cocoa-soft); }
        .school-photos {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 28px;
          max-width: 720px;
        }
        :global(.school-photo) { border-radius: 14px; box-shadow: var(--shadow-soft); }
        .access-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: 1fr;
          max-width: 900px;
        }
        :global(.map) :global(iframe) {
          width: 100%;
          height: 320px;
          border: 0;
          border-radius: 22px;
          box-shadow: var(--shadow-soft);
        }
        :global(.info) {
          background: #fff;
          border: 1px solid rgb(var(--cocoa-rgb) / 0.06);
          border-radius: 22px;
          box-shadow: var(--shadow-soft);
          padding: clamp(20px, 4vw, 30px);
        }
        :global(.info) dl { display: grid; gap: 12px; margin: 0 0 20px; }
        :global(.info) dl > div {
          display: grid;
          gap: 6px;
          padding: 0 0 12px;
          border-bottom: 0;
        }
        :global(.info) dl > div:last-child {
          border-bottom: 0;
        }
        :global(.info) dt {
          display: flex;
          align-items: center;
          gap: 0;
          font-family: var(--font-round);
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--leaf-green);
        }
        :global(.info) dd { margin: 2px 0 0; color: var(--cocoa-soft); }
        :global(.info) dd span { display: none; }
        :global(.info) dd a { color: var(--leaf-green); font-weight: 700; text-decoration: underline; }
        @container (min-width: 820px) {
          .school-photos { gap: 18px; }
          :global(.map) :global(iframe) { height: 380px; }
        }
      `}</style>
    </>
  );
}
