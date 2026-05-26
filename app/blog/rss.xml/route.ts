import { getAllArticles } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/seo';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc822Date(dateIso: string): string {
  const d = new Date(`${dateIso}T12:00:00+01:00`);
  return d.toUTCString();
}

export async function GET() {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const articles = getAllArticles();

  const items = articles
    .map((a) => {
      const url = `${base}/blog/${a.slug}`;
      const title = escapeXml(a.title);
      const description = escapeXml(a.description);
      const pubDate = toRfc822Date(a.date);
      return [
        '<item>',
        `<title>${title}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `<pubDate>${pubDate}</pubDate>`,
        `<description>${description}</description>`,
        `<author>${escapeXml(SITE_CONFIG.email)} (${escapeXml(SITE_CONFIG.name)})</author>`,
        '</item>',
      ].join('');
    })
    .join('');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    `<title>${escapeXml('Blog Formation IA pour le BTP')}</title>`,
    `<link>${escapeXml(`${base}/blog`)}</link>`,
    `<description>${escapeXml(
      'Articles et guides IA pour le BTP : devis, appels d\'offres, ChatGPT, financement Constructys.'
    )}</description>`,
    `<language>fr-FR</language>`,
    `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    items,
    '</channel>',
    '</rss>',
  ].join('');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

