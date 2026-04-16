import type { MetadataRoute } from 'next';

const SITE = 'https://www.laureolivie.fr';

/**
 * robots.txt — App Router (MetadataRoute.Robots).
 * Bots IA explicitement autorisés + règle générale avec exclusions techniques.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
