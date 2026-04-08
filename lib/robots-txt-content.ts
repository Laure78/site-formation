/**
 * Génère robots.txt en texte brut (commentaires # + tous les bots IA GEO).
 * Utilisé par app/robots.txt/route.ts — remplace MetadataRoute.Robots pour les lignes #.
 */

import { SITE_CONFIG } from '@/lib/seo';

const DISALLOW_PRIVATE = [
  '/admin/',
  '/auth/',
  '/merci-rdv',
  '/questionnaire/',
  '/invitation/',
  '/?s=',
] as const;

const USER_AGENTS = [
  '*',
  'Googlebot',
  'GPTBot',
  'Claude-Web',
  'PerplexityBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'Applebot',
  'Bingbot',
  'Copilot',
  'OAI-SearchBot',
  'cohere-ai',
  'Bytespider',
] as const;

export function buildRobotsTxt(): string {
  const lines: string[] = [];
  for (const ua of USER_AGENTS) {
    lines.push(`User-agent: ${ua}`);
    lines.push('Allow: /');
    for (const d of DISALLOW_PRIVATE) {
      lines.push(`Disallow: ${d}`);
    }
    lines.push('');
  }
  lines.push(`Sitemap: ${SITE_CONFIG.url}/sitemap.xml`);
  lines.push(`Host: ${SITE_CONFIG.url}`);
  lines.push('');
  lines.push('# llms.txt — guide pour les moteurs IA');
  lines.push(`# ${SITE_CONFIG.url}/llms.txt`);
  return lines.join('\n');
}
