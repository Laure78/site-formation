import type { MetadataRoute } from 'next';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

const SITE_BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

/** Bots IA — crawl autorisé pour le GEO (en plus des moteurs classiques). */
const AI_CRAWLERS = [
  'GPTBot',
  'ClaudeBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'Claude-Web',
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
        crawlDelay: 1,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: [`${SITE_BASE}/sitemap.xml`, `${SITE_BASE}/video-sitemap.xml`],
  };
}
