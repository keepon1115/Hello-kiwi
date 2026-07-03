import Link from 'next/link';

// 役割固定のボタン。primary=オレンジ(行動) / line=LINE導線 / ghost=補助。
type Variant = 'primary' | 'line' | 'ghost';

export function Button({
  href,
  children,
  variant = 'primary',
  size,
  external,
  className = ''
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: 'lg';
  external?: boolean;
  className?: string;
}) {
  const cls = `btn btn-${variant} ${size === 'lg' ? 'btn-lg' : ''} ${className}`.trim();

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
