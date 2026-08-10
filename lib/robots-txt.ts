import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

const SITE_BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const SITE_HOST = new URL(SITE_BASE).host;

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

/**
 * Bots IA / GEO à autoriser explicitement (Allow: /).
 * Liste demandée : GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-User,
 * PerplexityBot, Google-Extended, Applebot-Extended, CCBot.
 */
const REQUIRED_AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
] as const;

/** Compléments crawlers IA / assistants (conservés). */
const EXTRA_AI_BOTS = [
  'anthropic-ai',
  'Perplexity-User',
  'Applebot',
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
 * ligne vide entre règles, Host + Sitemap en fin.
 */
export function buildRobotsTxt(): string {
  const lines: string[] = [
    `# llms.txt — ${SITE_BASE}/llms.txt`,
    '',
  ];

  const namedBots = [
    ...SEARCH_BOTS,
    ...REQUIRED_AI_BOTS,
    ...EXTRA_AI_BOTS,
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

  lines.push(`Host: ${SITE_HOST}`);
  lines.push(`Sitemap: ${SITE_BASE}/sitemap.xml`);
  lines.push(`Sitemap: ${SITE_BASE}/video-sitemap.xml`);
  lines.push('');

  return lines.join('\n');
}
