import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { POSTS } from '@/lib/data/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/courses',
    '/trial',
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

  const posts = POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5
  }));

  return [...routes, ...posts];
}
