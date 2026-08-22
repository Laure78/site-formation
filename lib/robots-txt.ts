import type { MetadataRoute } from 'next';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

const SITE_BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

/** Host canonique — directive `Host:` en fin de robots.txt. */
export const ROBOTS_HOST = new URL(SITE_BASE).host;

/** Sitemap principal déclaré dans robots.txt. */
export const ROBOTS_SITEMAP = `${SITE_BASE}/sitemap.xml`;

/**
 * Zones privées / techniques — non crawlables.
 * Chemins admin : `/admin/*`, `/acces-admin` ; APIs : `/api/*` ; LMS : `/espace-apprenant/*`.
 */
export const PRIVATE_DISALLOW = [
  '/api/',
  '/admin/',
  '/acces-admin',
  '/espace-apprenant/',
] as const;

/** Moteurs de recherche classiques. */
export const SEARCH_BOTS = ['Googlebot', 'Bingbot'] as const;

/**
 * Bots IA / GEO — Allow explicite sur `/` (liste projet laureolivie.fr).
 */
export const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
] as const;

const DISALLOW_PATHS: string[] = [...PRIVATE_DISALLOW];

function robotsRule(userAgent: string) {
  return {
    userAgent,
    allow: '/',
    disallow: DISALLOW_PATHS,
  };
}

/** Métadonnées `/robots.txt` — consommées par `app/robots.ts`. */
export function buildRobotsMetadata(): MetadataRoute.Robots {
  const namedAgents = [...SEARCH_BOTS, ...AI_BOTS];
  return {
    rules: [
      ...namedAgents.map((ua) => robotsRule(ua)),
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW_PATHS,
      },
    ],
    host: ROBOTS_HOST,
    sitemap: ROBOTS_SITEMAP,
  };
}

/**
 * Sérialisation texte de `buildRobotsMetadata()` — prévisualisation / audits.
 * Alignée sur le format émis par Next.js (`User-Agent:` avec A majuscule).
 */
export function buildRobotsTxt(): string {
  const { rules, host, sitemap } = buildRobotsMetadata();
  const lines: string[] = [];
  const ruleList = rules ? (Array.isArray(rules) ? rules : [rules]) : [];

  for (const rule of ruleList) {
    const agents = Array.isArray(rule.userAgent)
      ? rule.userAgent
      : rule.userAgent
        ? [rule.userAgent]
        : [];
    for (const ua of agents) {
      lines.push(`User-Agent: ${ua}`);
      const allows = Array.isArray(rule.allow)
        ? rule.allow
        : rule.allow
          ? [rule.allow]
          : [];
      for (const path of allows) {
        lines.push(`Allow: ${path}`);
      }
      const disallows = Array.isArray(rule.disallow)
        ? rule.disallow
        : rule.disallow
          ? [rule.disallow]
          : [];
      for (const path of disallows) {
        lines.push(`Disallow: ${path}`);
      }
      lines.push('');
    }
  }

  if (host) {
    lines.push(`Host: ${host}`);
  }
  if (sitemap) {
    const sitemaps = Array.isArray(sitemap) ? sitemap : [sitemap];
    for (const url of sitemaps) {
      lines.push(`Sitemap: ${url}`);
    }
  }
  lines.push('');

  return lines.join('\n');
}
