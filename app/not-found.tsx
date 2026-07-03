import Link from 'next/link';
import { Mascot } from '@/components/Mascot';

export default function NotFound() {
  return (
    <section
      className="section"
      style={{ textAlign: 'center', minHeight: '50vh', display: 'grid', placeItems: 'center' }}
    >
      <div className="container" style={{ maxWidth: 480 }}>
        <Mascot pose="wave" size={120} />
        <h1 style={{ fontSize: '2rem', margin: '16px 0 10px' }}>Oops! ページが見つかりません</h1>
        <p style={{ color: 'var(--cocoa-soft)', marginBottom: 24 }}>
          お探しのページは、引っ越したか、無くなってしまったようです。
        </p>
        <Link href="/" className="btn btn-primary btn-lg">
          トップページへ戻る
        </Link>
      </div>
    </section>
  );
}
