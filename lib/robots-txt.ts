import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

const SITE_BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

/**
 * Zones privées / techniques — non crawlables.
 * Chemins admin réels du repo : `/admin/*`, `/acces-admin` ;
 * APIs : `/api/*` ; LMS connecté : `/espace-apprenant/*`.
 *
 * Appliqué à chaque User-agent (y compris les bots nommés) : en robots.txt,
 * un crawler qui matche un UA spécifique ignore le bloc `*`.
 */
export const PRIVATE_DISALLOW = [
  '/api/',
  '/admin/',
  '/acces-admin',
  '/espace-apprenant/',
] as const;

/** Moteurs de recherche classiques. */
const SEARCH_BOTS = ['Googlebot', 'Bingbot'] as const;

/** OpenAI / ChatGPT. */
const OPENAI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User'] as const;

/** Anthropic / Claude. */
const ANTHROPIC_BOTS = ['ClaudeBot', 'Claude-User', 'anthropic-ai'] as const;

/** Perplexity. */
const PERPLEXITY_BOTS = ['PerplexityBot', 'Perplexity-User'] as const;

/** Google Gemini training / Apple / autres crawlers GEO. */
const OTHER_AI_BOTS = [
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'Bytespider',
  'Amazonbot',
  'meta-externalagent',
] as const;

/**
 * Contenu final de `/robots.txt`.
 *
 * Pourquoi pas `app/robots.ts` (MetadataRoute.Robots) ?
 * Next.js 16.1.6 (`resolveRobots`) n’émet que User-Agent / Allow /
 * Disallow / Crawl-delay / Host / Sitemap — les commentaires `#` sont
 * impossibles. On sert donc le fichier via `app/robots.txt/route.ts`
 * (même pattern que `app/video-sitemap.xml/route.ts`) pour injecter
 * la ligne llms.txt (GEO).
 *
 * Format aligné sur le serializer Next : `User-Agent:` (A majuscule),
 * ligne vide entre règles, Sitemap en fin.
 */
export function buildRobotsTxt(): string {
  const lines: string[] = [
    `# llms.txt — https://www.laureolivie.fr/llms.txt`,
    '',
  ];

  const namedBots = [
    ...SEARCH_BOTS,
    ...OPENAI_BOTS,
    ...ANTHROPIC_BOTS,
    ...PERPLEXITY_BOTS,
    ...OTHER_AI_BOTS,
  ];

  for (const agent of namedBots) {
    lines.push(`User-Agent: ${agent}`);
    lines.push('Allow: /');
    for (const path of PRIVATE_DISALLOW) {
      lines.push(`Disallow: ${path}`);
    }
    lines.push('');
  }

  lines.push('User-Agent: *');
  lines.push('Allow: /');
  for (const path of PRIVATE_DISALLOW) {
    lines.push(`Disallow: ${path}`);
  }
  lines.push('');

  lines.push(`Sitemap: ${SITE_BASE}/sitemap.xml`);
  lines.push(`Sitemap: ${SITE_BASE}/video-sitemap.xml`);
  lines.push('');

  return lines.join('\n');
}
