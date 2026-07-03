export type NotePost = {
  id: string;
  title: string;
  category: 'お知らせ' | 'NZコラム';
  date: string;
  excerpt: string;
  sourceUrl: string;
  thumbnail?: string;
};

const NOTE_RSS_URL = 'https://note.com/nobu1996nz/rss';
const RSS_REVALIDATE_SECONDS = 600;

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function getTag(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  if (!match) return '';
  return decodeEntities(match[1].replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/i, '$1').trim());
}

function getSelfClosingAttr(xml: string, tag: string, attr: string) {
  const tagMatch = xml.match(new RegExp(`<${tag}\\b([^>]*)>`, 'i'));
  if (!tagMatch) return '';
  const attrMatch = tagMatch[1].match(new RegExp(`${attr}=["']([^"']+)["']`, 'i'));
  return attrMatch ? decodeEntities(attrMatch[1]) : '';
}

function toExcerpt(html: string) {
  const text = html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/(p|h[1-6]|div)>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/続きをみる/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return text.length > 96 ? `${text.slice(0, 96)}...` : text;
}

function toDate(pubDate: string) {
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' });
}

function toCategory(title: string): NotePost['category'] {
  return /イベント|参加募集|募集|お知らせ/.test(title) ? 'お知らせ' : 'NZコラム';
}

function parseNoteRss(xml: string): NotePost[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];

  return items
    .map((item) => {
      const title = getTag(item, 'title');
      const sourceUrl = getTag(item, 'link') || getTag(item, 'guid');
      const pubDate = getTag(item, 'pubDate');
      const description = getTag(item, 'description');
      const id = sourceUrl.split('/').filter(Boolean).pop() || title;

      return {
        id,
        title,
        category: toCategory(title),
        date: toDate(pubDate),
        excerpt: toExcerpt(description),
        sourceUrl,
        thumbnail: getSelfClosingAttr(item, 'media:thumbnail', 'url')
      };
    })
    .filter((post) => post.title && post.sourceUrl);
}

export async function getNotePosts(limit?: number): Promise<NotePost[]> {
  try {
    const response = await fetch(NOTE_RSS_URL, {
      next: { revalidate: RSS_REVALIDATE_SECONDS },
      headers: { Accept: 'application/rss+xml, application/xml, text/xml' }
    });

    if (!response.ok) return [];

    const xml = await response.text();
    const posts = parseNoteRss(xml);
    return typeof limit === 'number' ? posts.slice(0, limit) : posts;
  } catch {
    return [];
  }
}
