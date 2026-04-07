import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

/** Chemins privés / hors indexation — répétés pour les bots GEO (même politique qu’User-agent: *) */
const DISALLOW_PRIVATE = [
  '/admin/',
  '/auth/',
  '/merci-rdv',
  '/questionnaire/',
  '/invitation/',
  // Recherche interne (évite indexation de pages de résultats vides / doublons)
  '/?s=',
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Règle générale
      {
        userAgent: '*',
        allow: '/',
        disallow: [...DISALLOW_PRIVATE],
      },
      // Googlebot (indexation Google)
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [...DISALLOW_PRIVATE],
      },
      // GPTBot (OpenAI / ChatGPT) — GEO
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: [...DISALLOW_PRIVATE],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: [...DISALLOW_PRIVATE],
      },
      // PerplexityBot (Perplexity AI) — GEO
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: [...DISALLOW_PRIVATE],
      },
      // ClaudeBot (Anthropic / Claude) — GEO
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: [...DISALLOW_PRIVATE],
      },
      // Google-Extended (Gemini / Bard) — GEO
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: [...DISALLOW_PRIVATE],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: [...DISALLOW_PRIVATE],
      },
      // Bingbot (Microsoft / Copilot) — GEO
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [...DISALLOW_PRIVATE],
      },
      {
        userAgent: 'Copilot',
        allow: '/',
        disallow: [...DISALLOW_PRIVATE],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
