import { buildRobotsTxt } from '@/lib/robots-txt';

export const revalidate = 86400;

/**
 * `/robots.txt` — réponse texte complète (commentaire llms.txt inclus).
 * @see lib/robots-txt.ts
 */
export function GET() {
  return new Response(buildRobotsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
