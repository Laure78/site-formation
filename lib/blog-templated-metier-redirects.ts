/**
 * Redirections 301 — articles gabarits blog → pages métier `/formation-ia-*-btp`.
 * Chargé par `next.config.ts` et `lib/gsc-redirects-2026.ts` (sans alias `@/`).
 */

export type BlogRedirectEntry = {
  source: string;
  destination: string;
  permanent: true;
};

/** Métier (singulier URL) → landing formation. */
export const TEMPLATED_METIER_FORMATION_PATH: Record<string, string> = {
  carreleur: '/formation-ia-carreleur-btp',
  charpentier: '/formation-ia-charpentier-btp',
  /** Pas de page dédiée — rapprochement génie climatique / CVC. */
  chauffagiste: '/formation-ia-genie-climatique-btp',
  couvreur: '/formation-ia-couvreur-btp',
  electricien: '/formation-ia-electricien-btp',
  macon: '/formation-ia-macon-btp',
  menuisier: '/formation-ia-menuisier-btp',
  peintre: '/formation-ia-peintre-btp',
  plombier: '/formation-ia-plombier-btp',
  /** Pas de page dédiée — rapprochement métallerie / serrurerie. */
  serrurier: '/formation-ia-metallerie-serrurerie-btp',
};

const METIER_PLURAL: Record<string, string> = {
  carreleur: 'carreleurs',
  charpentier: 'charpentiers',
  chauffagiste: 'chauffagistes',
  couvreur: 'couvreurs',
  electricien: 'electriciens',
  macon: 'macons',
  menuisier: 'menuisiers',
  peintre: 'peintres',
  plombier: 'plombiers',
  serrurier: 'serruriers',
};

function blogRedirect(slug: string, destination: string): BlogRedirectEntry[] {
  return [
    { source: `/blog/${slug}`, destination, permanent: true },
    { source: `/blog/${slug}/`, destination, permanent: true },
  ];
}

/** Slugs blog absorbés par les pages métier (exclusion sitemap / catalogue). */
export const BLOG_TEMPLATED_METIER_REDIRECTED_SLUGS: readonly string[] = (() => {
  const slugs: string[] = ['chatgpt-pour-artisans-erreurs-a-eviter'];
  for (const metier of Object.keys(TEMPLATED_METIER_FORMATION_PATH)) {
    const plural = METIER_PLURAL[metier] ?? `${metier}s`;
    slugs.push(`l-ia-va-t-elle-remplacer-les-${plural}`);
    slugs.push(`ia-et-${metier}-5-gains-de-temps-concrets`);
    slugs.push(`comment-utiliser-chatgpt-pour-vos-devis-${metier}`);
  }
  return slugs;
})();

/** 301 articles gabarits → pages métier (octobre 2026 — GEO). */
export function blogTemplatedMetierRedirectsOctober2026(): BlogRedirectEntry[] {
  const out: BlogRedirectEntry[] = [];

  for (const slug of BLOG_TEMPLATED_METIER_REDIRECTED_SLUGS) {
    if (slug === 'chatgpt-pour-artisans-erreurs-a-eviter') {
      out.push(...blogRedirect(slug, '/formation-chatgpt-btp'));
      continue;
    }
    for (const [metier, dest] of Object.entries(TEMPLATED_METIER_FORMATION_PATH)) {
      const plural = METIER_PLURAL[metier] ?? `${metier}s`;
      if (
        slug === `l-ia-va-t-elle-remplacer-les-${plural}` ||
        slug === `ia-et-${metier}-5-gains-de-temps-concrets` ||
        slug === `comment-utiliser-chatgpt-pour-vos-devis-${metier}`
      ) {
        out.push(...blogRedirect(slug, dest));
        break;
      }
    }
  }

  return out;
}

/** Remplace les cibles « devis en 15 min » qui pointaient vers les gabarits blog. */
export function devisEn15MinToFormationRedirects(): BlogRedirectEntry[] {
  const out: BlogRedirectEntry[] = [];
  for (const [metier, dest] of Object.entries(TEMPLATED_METIER_FORMATION_PATH)) {
    if (metier === 'serrurier') continue;
    out.push({
      source: `/blog/devis-en-15-min-le-guide-${metier}`,
      destination: dest,
      permanent: true,
    });
    out.push({
      source: `/blog/devis-en-15-min-le-guide-${metier}/`,
      destination: dest,
      permanent: true,
    });
  }
  out.push({
    source: '/blog/devis-en-15-min-le-guide-electricien',
    destination: TEMPLATED_METIER_FORMATION_PATH.electricien,
    permanent: true,
  });
  out.push({
    source: '/blog/devis-en-15-min-le-guide-electricien/',
    destination: TEMPLATED_METIER_FORMATION_PATH.electricien,
    permanent: true,
  });
  return out;
}
