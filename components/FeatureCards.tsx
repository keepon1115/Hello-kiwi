import { Reveal } from './Reveal';

const FEATURES = [
  {
    title: '一人ひとりに合わせたレッスンメニュー',
    body:
      '基本のカリキュラムをベースにしながら、一人ひとりの目標やペースに合わせて内容をカスタマイズ。「旅行直前だから旅行英語がいい」「苦手なところをじっくりやりたい」など、1対1だからこそ、その時の生徒さんに一番必要なレッスンを柔軟に組み立てられます。'
  },
  {
    title: 'ニュージーランド文化に触れられる',
    body:
      '現地の暮らしやちょっとした習慣、日本との違いもレッスンの中にたくさん。まるで現地で過ごしているようなワクワク感と一緒に、生きた英語を楽しく学べます。'
  },
  {
    title: '教室でもオンラインでも',
    body:
      '八尾市の教室に加え、全国どこからでもオンライン受講OK。ご都合に合わせて続けやすい形を選べます。'
  }
];

export function FeatureCards() {
  return (
    <div className="feature-list">
      {FEATURES.map((f, i) => (
        <Reveal key={f.title} delay={((i % 3) + 1) as 1 | 2 | 3} className="card card-hover feature">
          <span className={`feature-no no-${i + 1}`}>{i + 1}</span>
          <div>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        </Reveal>
      ))}

      <style>{`
        .feature-list { display: grid; gap: 16px; }
        .feature { text-align: left; display: grid; grid-template-columns: auto 1fr; gap: 14px; align-items: start; }
        .feature-no {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          color: #fff;
          font-family: var(--font-pop);
          font-weight: 800;
          font-size: 1.1rem;
        }
        .no-1 { background: var(--leaf-green); }
        .no-2 { background: var(--kiwi-orange); }
        .no-3 { background: var(--cocoa); }
        .feature h3 { font-size: 1.08rem; margin: 0 0 8px; }
        .feature p { color: var(--cocoa-soft); font-size: 0.9rem; margin: 0; }
      `}</style>
    </div>
  );
}
