import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { POSTS } from '@/lib/data/posts';
import { ArticleClient } from './ArticleClient';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: 'article' }
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();
  return <ArticleClient post={post} />;
}
