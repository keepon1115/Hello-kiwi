'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV } from '@/lib/site';

// 左サイドバー・モバイルドロワーで共用するナビ本体。
export function Nav({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="l-nav" aria-label="メインナビゲーション">
      <ul>
        {NAV.map((n) => {
          const current = pathname === n.href;
          return (
            <li key={n.href}>
              <Link
                href={n.href}
                aria-current={current ? 'page' : undefined}
                onClick={onLinkClick}
              >
                {n.label}
                <span className="en">{n.en}</span>
              </Link>
            </li>
          );
        })}
        <li>
          <Link href="/en" className="lang" onClick={onLinkClick}>
            🌏 English
          </Link>
        </li>
      </ul>
    </nav>
  );
}
