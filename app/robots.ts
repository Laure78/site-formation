import type { MetadataRoute } from 'next';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

const SITE_BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

/** Zones privées / techniques — non indexables. */
const PRIVATE_DISALLOW = ['/admin/', '/espace-apprenant/', '/api/'] as const;

/**
 * Bots IA — Allow: / explicite (GEO / extraction).
 * Obligatoires : GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended.
 * Compléments Anthropic / Common Crawl : Claude-Web, anthropic-web, anthropic-ai, CCBot.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'ClaudeBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'Claude-Web',
  'anthropic-web',
  'anthropic-ai',
  'CCBot',
] as const;

/**
 * `/robots.txt` — règles crawl + bots IA + sitemaps.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...PRIVATE_DISALLOW],
        crawlDelay: 1,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/' as const,
        disallow: [...PRIVATE_DISALLOW],
      })),
    ],
    sitemap: [`${SITE_BASE}/sitemap.xml`, `${SITE_BASE}/video-sitemap.xml`],
  };
}
