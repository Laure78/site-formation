/**
 * Redirections 301 — consolidation GSC (avril 2026).
 * @see prompt « 28 URLs à nettoyer »
 */

/** Slugs hub /formation-ia/[slug] fusionnés vers une landing métier ou catalogue (exclus du legacy hyphen→slash). */
export const GSC_HUB_MERGED_SLUGS = new Set([
  'electricite',
  'plomberie-sanitaire',
  'maconnerie-gros-oeuvre',
  'etancheite',
  'peinture-batiment',
  'carrelage-faience',
  'menuiserie',
  'charpente',
  'couverture-zinguerie',
]);

const HUB_MERGE_DEST: Record<string, string> = {
  electricite: '/formation-ia-electricien-btp',
  'plomberie-sanitaire': '/formation-ia-plombier-btp',
  'maconnerie-gros-oeuvre': '/formation-ia-macon-btp',
  etancheite: '/formation-ia-etancheur',
  'peinture-batiment': '/formation-ia-peintre-btp',
  'carrelage-faience': '/formation-ia-carreleur-btp',
  menuiserie: '/formation-ia-menuisier-btp',
  charpente: '/formation-ia-charpentier-btp',
  'couverture-zinguerie': '/formation-ia-couvreur-btp',
};

type RedirectEntry = {
  source: string;
  destination: string;
  permanent: true;
};

/** Slash + tiret → URL canonique métier / catalogue. */
export function gscHubMergeRedirects(): RedirectEntry[] {
  const out: RedirectEntry[] = [];
  for (const slug of GSC_HUB_MERGED_SLUGS) {
    const destination = HUB_MERGE_DEST[slug];
    if (!destination) continue;
    out.push({ source: `/formation-ia/${slug}`, destination, permanent: true });
    out.push({ source: `/formation-ia-${slug}`, destination, permanent: true });
  }
  return out;
}

/**
 * Redirections hors hub (blog parasites, géo hors IDF, doublons landing).
 */
export function gscRedirects2026April(): RedirectEntry[] {
  const idf = '/formation-ia-btp-ile-de-france';
  return [
    // --- Doublons techniques (suffixes) ---
    {
      source: '/blog/appels-d-offres-btp-l-ia-comme-assistant-741614-8',
      destination: '/blog/appels-d-offres-btp-l-ia-comme-assistant',
      permanent: true,
    },
    {
      source: '/blog/automatiser-vos-emails-clients-avec-l-ia-741613-9',
      destination: '/blog/automatiser-emails-clients-btp-ia',
      permanent: true,
    },
    {
      source: '/blog/chatgpt-pour-artisans-erreurs-a-eviter-741612-8',
      destination: '/blog/chatgpt-pour-artisans-erreurs-a-eviter',
      permanent: true,
    },
    {
      source: '/blog/chatgpt-pour-artisans-erreurs-a-eviter-741617-8',
      destination: '/blog/chatgpt-pour-artisans-erreurs-a-eviter',
      permanent: true,
    },
    {
      source: '/blog/financement-constructys-mode-d-emploi-741597-9',
      destination: '/blog/financement-constructys-mode-d-emploi',
      permanent: true,
    },
    {
      source: '/blog/formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741597-8',
      destination: '/blog/formation-ia-btp-guide-complet-2026',
      permanent: true,
    },
    {
      source: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741595-9',
      destination: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents',
      permanent: true,
    },
    {
      source: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741609-9',
      destination: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents',
      permanent: true,
    },
    {
      source: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741614-9',
      destination: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents',
      permanent: true,
    },
    // --- Blog géo hors zone → pilier IDF ---
    { source: '/blog/chatgpt-btp-bordeaux', destination: idf, permanent: true },
    { source: '/blog/ia-btp-lyon', destination: idf, permanent: true },
    // --- Formations géo hors IDF ---
    { source: '/formations/ia-btp-bordeaux', destination: idf, permanent: true },
    { source: '/formations/ia-btp-lille', destination: idf, permanent: true },
    { source: '/formations/ia-btp-lyon', destination: idf, permanent: true },
    // --- Doublons landing / transverses ---
    {
      source: '/formation-chatgpt-artisan-electricien',
      destination: '/formation-ia-electricien-btp',
      permanent: true,
    },
    {
      source: '/formation-ia-conducteur-travaux-btp',
      destination: '/formation-ia-conducteur-travaux',
      permanent: true,
    },
    {
      source: '/repondre-appels-offres-ia-btp',
      destination: '/formation-ia-appels-offres-btp',
      permanent: true,
    },
    {
      source: '/formations/ia-btp-yvelines-78',
      destination: '/formation-ia-btp-yvelines',
      permanent: true,
    },
    { source: '/auteur/laure-olivie', destination: '/a-propos', permanent: true },
    // --- Dédup métiers (doublons canonique/suffixée — mai 2026) ---
    // 5 paires auditées : on garde la version la plus mature (contenu, prompts, JSON-LD).
    {
      source: '/formation-ia-etancheur-btp',
      destination: '/formation-ia-etancheur',
      permanent: true,
    },
    {
      source: '/formation-ia-canalisateur',
      destination: '/formation-ia-canalisateur-tp',
      permanent: true,
    },
    {
      source: '/formation-ia-paysagiste',
      destination: '/formation-ia-paysagiste-btp',
      permanent: true,
    },
    {
      source: '/formation-ia-peintre-batiment',
      destination: '/formation-ia-peintre-btp',
      permanent: true,
    },
    {
      source: '/formation-ia-platriste',
      destination: '/formation-ia-plaquiste-btp',
      permanent: true,
    },
  ];
}

/** Chemins à exclure du sitemap (sources redirigées). */
export const GSC_EXCLUDED_SITEMAP_PATHS = new Set<string>([
  '/blog/appels-d-offres-btp-l-ia-comme-assistant-741614-8',
  '/blog/automatiser-vos-emails-clients-avec-l-ia-741613-9',
  '/blog/chatgpt-pour-artisans-erreurs-a-eviter-741612-8',
  '/blog/chatgpt-pour-artisans-erreurs-a-eviter-741617-8',
  '/blog/financement-constructys-mode-d-emploi-741597-9',
  '/blog/formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741597-8',
  '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741595-9',
  '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741609-9',
  '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741614-9',
  '/blog/chatgpt-btp-bordeaux',
  '/blog/ia-btp-lyon',
  '/formations/ia-btp-bordeaux',
  '/formations/ia-btp-lille',
  '/formations/ia-btp-lyon',
  '/formation-chatgpt-artisan-electricien',
  '/formation-ia-conducteur-travaux-btp',
  '/repondre-appels-offres-ia-btp',
  '/formations/ia-btp-yvelines-78',
  '/auteur/laure-olivie',
  // Dédup métiers mai 2026 (sources des 5 redirections ajoutées dans gscRedirects2026April)
  '/formation-ia-etancheur-btp',
  '/formation-ia-canalisateur',
  '/formation-ia-paysagiste',
  '/formation-ia-peintre-batiment',
  '/formation-ia-platriste',
  ...Array.from(GSC_HUB_MERGED_SLUGS).flatMap((slug) => [
    `/formation-ia/${slug}`,
    `/formation-ia-${slug}`,
  ]),
]);
