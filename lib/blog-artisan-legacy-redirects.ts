/**
 * Slugs blog historiques « artisans » — non publiables (.cursorrules).
 * Redirections 301 vers contenus reformés (une URL canonique par intention).
 */
type RedirectEntry = {
  source: string;
  destination: string;
  permanent: boolean;
};

/** Ancien slug → slug canonique (sans « artisan »). */
export const BLOG_ARTISAN_LEGACY_SLUG_MAP: ReadonlyArray<{
  from: string;
  to: string;
}> = [
  { from: 'chatgpt-pour-artisans-erreurs-a-eviter', to: 'chatgpt-pour-pme-btp-erreurs-a-eviter' },
  { from: 'chatgpt-artisans-btp-usages', to: 'chatgpt-usages-concrets-btp' },
  { from: 'chatgpt-prompts-artisans-btp', to: 'chatgpt-prompts-btp-metiers' },
  { from: 'ia-artisans-par-ou-commencer', to: 'ia-btp-par-ou-commencer' },
] as const;

export const BLOG_ARTISAN_LEGACY_REDIRECTED_SLUGS = new Set(
  BLOG_ARTISAN_LEGACY_SLUG_MAP.map((r) => r.from),
);

/** `/blog/{ancien}` → `/blog/{nouveau}` */
export function blogArtisanLegacyRedirects(): RedirectEntry[] {
  const out: RedirectEntry[] = [];
  for (const { from, to } of BLOG_ARTISAN_LEGACY_SLUG_MAP) {
    out.push(
      { source: `/blog/${from}`, destination: `/blog/${to}`, permanent: true },
      { source: `/blog/${from}/`, destination: `/blog/${to}`, permanent: true },
    );
  }
  return out;
}