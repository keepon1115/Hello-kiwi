import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/courses',
    '/trial',
    '/play',
    '/play/kiwi-quiz',
    '/play/code-the-kiwi',
    '/blog',
    '/access',
    '/faq',
    '/contact',
    '/en'
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7
  }));

  return routes;
}
