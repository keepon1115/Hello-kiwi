import type { MetadataRoute } from 'next';
import { existsSync } from 'fs';
import { join } from 'path';

// icons/icon-*.png が public 配下に無ければ、既存マスコット画像をアイコン代わりに使う。
// ImageSlot と同じ「置けば自動で切り替わる」思想（ASSETS.md 参照）。
function iconSrc(size: 192 | 512) {
  const dedicated = `assets/icons/icon-${size}.png`;
  return existsSync(join(process.cwd(), 'public', dedicated))
    ? `/${dedicated}`
    : '/assets/images/hero/kiwi4.png';
}

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hello Kiwi 英会話',
    short_name: 'Hello Kiwi',
    description: '生徒さんのマイページ｜Hello Kiwi 英会話',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf5ea',
    theme_color: '#faf5ea',
    icons: [
      { src: iconSrc(192), sizes: '192x192', type: 'image/png' },
      { src: iconSrc(512), sizes: '512x512', type: 'image/png' }
    ]
  };
}
