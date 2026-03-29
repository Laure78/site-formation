import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Règle générale
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/auth/', '/merci-rdv', '/questionnaire/', '/invitation/'],
      },
      // Googlebot (indexation Google)
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/auth/', '/merci-rdv', '/questionnaire/', '/invitation/'],
      },
      // GPTBot (OpenAI / ChatGPT) — GEO
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/auth/', '/merci-rdv', '/questionnaire/', '/invitation/'],
      },
      // PerplexityBot (Perplexity AI) — GEO
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/', '/auth/', '/merci-rdv', '/questionnaire/', '/invitation/'],
      },
      // ClaudeBot (Anthropic / Claude) — GEO
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/admin/', '/auth/', '/merci-rdv', '/questionnaire/', '/invitation/'],
      },
      // Google-Extended (Gemini / Bard) — GEO
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin/', '/auth/', '/merci-rdv', '/questionnaire/', '/invitation/'],
      },
      // Bingbot (Microsoft / Copilot) — GEO
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/auth/', '/merci-rdv', '/questionnaire/', '/invitation/'],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
