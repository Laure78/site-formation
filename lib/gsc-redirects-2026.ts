/**
 * Redirections 301 — consolidation GSC (avril 2026).
 * @see prompt « 28 URLs à nettoyer »
 */
import { LINKS } from '@/lib/internal-links';

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

/**
 * Articles blog ciblant des villes hors Île-de-France — 301 vers pilier IDF.
 * Présentiel IDF uniquement (pas de déplacement hors zone).
 */
export const BLOG_GEO_HORS_IDF_REDIRECTED_SLUGS = [
  'appels-offres-btp-ia-lille',
  'chatgpt-btp-bordeaux',
  'ia-btp-lyon',
] as const;

export const BLOG_GEO_HORS_IDF_REDIRECT_DESTINATION =
  '/formation-ia-btp-ile-de-france' as const;

export function blogGeoHorsIdfRedirects(): RedirectEntry[] {
  return BLOG_GEO_HORS_IDF_REDIRECTED_SLUGS.map((slug) => ({
    source: `/blog/${slug}`,
    destination: BLOG_GEO_HORS_IDF_REDIRECT_DESTINATION,
    permanent: true,
  }));
}

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
    // --- Blog géo hors zone → pilier IDF ---
    ...blogGeoHorsIdfRedirects(),
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
      destination: LINKS.formationConducteurTravaux,
      permanent: true,
    },
    {
      source: '/formation-ia-conducteur-travaux',
      destination: LINKS.formationConducteurTravaux,
      permanent: true,
    },
    {
      source: '/repondre-appels-offres-ia-btp',
      destination: '/formations/ia-appels-offre-btp',
      permanent: true,
    },
    {
      source: '/formations/ia-btp-yvelines-78',
      destination: '/formation-ia-btp-yvelines-78',
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
  ...BLOG_GEO_HORS_IDF_REDIRECTED_SLUGS.map((slug) => `/blog/${slug}`),
  '/formations/ia-btp-bordeaux',
  '/formations/ia-btp-lille',
  '/formations/ia-btp-lyon',
  '/formation-chatgpt-artisan-electricien',
  '/formation-ia-conducteur-travaux-btp',
  '/repondre-appels-offres-ia-btp',
  '/formations/ia-btp-yvelines-78',
  '/auteur/laure-olivie',
  // Anciennes URLs villes hub redirigées 308 vers /formations/ia-btp-[ville] (cf. next.config.ts)
  '/formation-ia/btp-paris',
  '/formation-ia-btp-paris-2026',
  // 308 → /formations (next.config.ts) — ne pas indexer dans le sitemap
  '/formation-ia-btp',
  // Fichier texte public, pas une page HTML
  '/llms.txt',
  '/ia-conducteur-travaux',
  '/formation-ia/btp-saint-quentin-en-yvelines',
  // Préfectures hub → départements (juil. 2026)
  '/formation-ia/btp-versailles',
  '/formation-ia/btp-creteil',
  '/formation-ia/btp-nanterre',
  '/formation-ia/btp-cergy-pontoise',
  '/formation-ia/btp-melun',
  '/formation-ia-btp-versailles',
  '/formation-ia-btp-creteil',
  '/formation-ia-btp-nanterre',
  '/formation-ia-btp-cergy-pontoise',
  '/formation-ia-btp-melun',
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

/** Slugs blog absorbés (juillet 2026 — consolidation doublons cron B2). */
export const BLOG_CONSOLIDATION_REDIRECTED_SLUGS = [
  'appels-d-offres-btp-l-ia-comme-assistant-741595-8',
  'appels-d-offres-btp-l-ia-comme-assistant-741614-8',
  'appels-d-offres-btp-l-ia-comme-assistant-741628-8',
  'appels-d-offres-btp-l-ia-comme-assistant-741633-8',
  'appels-d-offres-btp-l-ia-comme-assistant-741647-8',
  'appels-d-offres-btp-l-ia-comme-assistant-741652-8',
  'appels-d-offres-btp-l-ia-comme-assistant-741666-8',
  'appels-d-offres-btp-l-ia-comme-assistant-741671-8',
  'appels-d-offres-btp-l-ia-comme-assistant-741685-8',
  'appels-d-offres-btp-l-ia-comme-assistant-741704-8',
  'automatiser-vos-emails-clients-avec-l-ia',
  'automatiser-vos-emails-clients-avec-l-ia-741594-9',
  'automatiser-vos-emails-clients-avec-l-ia-741613-9',
  'automatiser-vos-emails-clients-avec-l-ia-741627-9',
  'automatiser-vos-emails-clients-avec-l-ia-741632-9',
  'automatiser-vos-emails-clients-avec-l-ia-741646-9',
  'automatiser-vos-emails-clients-avec-l-ia-741651-9',
  'automatiser-vos-emails-clients-avec-l-ia-741665-9',
  'automatiser-vos-emails-clients-avec-l-ia-741670-9',
  'automatiser-vos-emails-clients-avec-l-ia-741684-9',
  'automatiser-vos-emails-clients-avec-l-ia-741703-9',
  'chatgpt-conducteur-travaux-5-prompts-gagner-temps',
  'chatgpt-garage-automobile-btp',
  'chatgpt-pour-artisans-erreurs-a-eviter-741598-8',
  'chatgpt-pour-artisans-erreurs-a-eviter-741612-8',
  'chatgpt-pour-artisans-erreurs-a-eviter-741617-8',
  'chatgpt-pour-pme-btp-erreurs-a-eviter-741631-8',
  'chatgpt-pour-pme-btp-erreurs-a-eviter-741650-8',
  'chatgpt-pour-pme-btp-erreurs-a-eviter-741664-8',
  'chatgpt-pour-pme-btp-erreurs-a-eviter-741669-8',
  'chatgpt-pour-pme-btp-erreurs-a-eviter-741683-8',
  'chatgpt-pour-pme-btp-erreurs-a-eviter-741688-8',
  'chatgpt-pour-pme-btp-erreurs-a-eviter-741707-8',
  'confidentialite-donnees-ia-btp',
  'devis-en-15-min-le-guide-carreleur',
  'devis-en-15-min-le-guide-charpentier',
  'devis-en-15-min-le-guide-chauffagiste',
  'devis-en-15-min-le-guide-couvreur',
  'devis-en-15-min-le-guide-electricien',
  'devis-en-15-min-le-guide-macon',
  'devis-en-15-min-le-guide-menuisier',
  'devis-en-15-min-le-guide-peintre',
  'devis-en-15-min-le-guide-plombier',
  'financement-constructys-formation-ia-btp-2026',
  'financement-constructys-mode-d-emploi',
  'financement-constructys-mode-d-emploi-741597-9',
  'financement-constructys-mode-d-emploi-741611-9',
  'financement-constructys-mode-d-emploi-741616-9',
  'financement-constructys-mode-d-emploi-741630-9',
  'financement-constructys-mode-d-emploi-741649-9',
  'financement-constructys-mode-d-emploi-741663-9',
  'financement-constructys-mode-d-emploi-741668-9',
  'financement-constructys-mode-d-emploi-741682-9',
  'financement-constructys-mode-d-emploi-741687-9',
  'financement-constructys-mode-d-emploi-741701-9',
  'financement-constructys-mode-d-emploi-741706-9',
  'formation-ia-appliquee-au-batiment-ce-qu-il-faut-savoir-en-2026',
  'formation-ia-appliquee-au-batiment-ce-qu-il-faut-savoir-en-2026-741668-8',
  'formation-ia-appliquee-au-batiment-ce-qu-il-faut-savoir-en-2026-741682-8',
  'formation-ia-appliquee-au-batiment-ce-qu-il-faut-savoir-en-2026-741687-8',
  'formation-ia-appliquee-au-batiment-ce-qu-il-faut-savoir-en-2026-741701-8',
  'formation-ia-appliquee-au-batiment-ce-qu-il-faut-savoir-en-2026-741706-8',
  'formation-ia-btp-ce-qu-il-faut-savoir-en-2026',
  'formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741597-8',
  'formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741611-8',
  'formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741616-8',
  'formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741630-8',
  'formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741635-8',
  'formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741649-8',
  'ia-analyse-cctp-methode',
  'ia-conducteur-travaux-chatgpt',
  'ia-conducteur-travaux-usages',
  'ia-devis-gain-temps-pme-btp',
  'outils-ia-btp-chatgpt-claude-gemini',
  'recrutement-btp-l-ia-pour-attirer-les-talents-741595-9',
  'recrutement-btp-l-ia-pour-attirer-les-talents-741609-9',
  'recrutement-btp-l-ia-pour-attirer-les-talents-741614-9',
  'recrutement-btp-l-ia-pour-attirer-les-talents-741628-9',
  'recrutement-btp-l-ia-pour-attirer-les-talents-741633-9',
  'recrutement-btp-l-ia-pour-attirer-les-talents-741647-9',
  'recrutement-btp-l-ia-pour-attirer-les-talents-741652-9',
  'recrutement-btp-l-ia-pour-attirer-les-talents-741666-9',
  'recrutement-btp-l-ia-pour-attirer-les-talents-741685-9',
  'recrutement-btp-l-ia-pour-attirer-les-talents-741699-9',
  'recrutement-btp-l-ia-pour-attirer-les-talents-741704-9',
] as const;

/** Redirections 301 blog — consolidation doublons suffixes + sémantiques (juillet 2026). */
export function blogConsolidationRedirectsJuly2026(): RedirectEntry[] {
  return [
    { source: '/blog/appels-d-offres-btp-l-ia-comme-assistant-741595-8', destination: '/blog/appels-d-offres-btp-l-ia-comme-assistant', permanent: true },
    { source: '/blog/appels-d-offres-btp-l-ia-comme-assistant-741614-8', destination: '/blog/appels-d-offres-btp-l-ia-comme-assistant', permanent: true },
    { source: '/blog/appels-d-offres-btp-l-ia-comme-assistant-741628-8', destination: '/blog/appels-d-offres-btp-l-ia-comme-assistant', permanent: true },
    { source: '/blog/appels-d-offres-btp-l-ia-comme-assistant-741633-8', destination: '/blog/appels-d-offres-btp-l-ia-comme-assistant', permanent: true },
    { source: '/blog/appels-d-offres-btp-l-ia-comme-assistant-741647-8', destination: '/blog/appels-d-offres-btp-l-ia-comme-assistant', permanent: true },
    { source: '/blog/appels-d-offres-btp-l-ia-comme-assistant-741652-8', destination: '/blog/appels-d-offres-btp-l-ia-comme-assistant', permanent: true },
    { source: '/blog/appels-d-offres-btp-l-ia-comme-assistant-741666-8', destination: '/blog/appels-d-offres-btp-l-ia-comme-assistant', permanent: true },
    { source: '/blog/appels-d-offres-btp-l-ia-comme-assistant-741671-8', destination: '/blog/appels-d-offres-btp-l-ia-comme-assistant', permanent: true },
    { source: '/blog/appels-d-offres-btp-l-ia-comme-assistant-741685-8', destination: '/blog/appels-d-offres-btp-l-ia-comme-assistant', permanent: true },
    { source: '/blog/appels-d-offres-btp-l-ia-comme-assistant-741704-8', destination: '/blog/appels-d-offres-btp-l-ia-comme-assistant', permanent: true },
    { source: '/blog/automatiser-vos-emails-clients-avec-l-ia', destination: '/blog/automatiser-emails-clients-btp-ia', permanent: true },
    { source: '/blog/automatiser-vos-emails-clients-avec-l-ia-741594-9', destination: '/blog/automatiser-emails-clients-btp-ia', permanent: true },
    { source: '/blog/automatiser-vos-emails-clients-avec-l-ia-741613-9', destination: '/blog/automatiser-emails-clients-btp-ia', permanent: true },
    { source: '/blog/automatiser-vos-emails-clients-avec-l-ia-741627-9', destination: '/blog/automatiser-emails-clients-btp-ia', permanent: true },
    { source: '/blog/automatiser-vos-emails-clients-avec-l-ia-741632-9', destination: '/blog/automatiser-emails-clients-btp-ia', permanent: true },
    { source: '/blog/automatiser-vos-emails-clients-avec-l-ia-741646-9', destination: '/blog/automatiser-emails-clients-btp-ia', permanent: true },
    { source: '/blog/automatiser-vos-emails-clients-avec-l-ia-741651-9', destination: '/blog/automatiser-emails-clients-btp-ia', permanent: true },
    { source: '/blog/automatiser-vos-emails-clients-avec-l-ia-741665-9', destination: '/blog/automatiser-emails-clients-btp-ia', permanent: true },
    { source: '/blog/automatiser-vos-emails-clients-avec-l-ia-741670-9', destination: '/blog/automatiser-emails-clients-btp-ia', permanent: true },
    { source: '/blog/automatiser-vos-emails-clients-avec-l-ia-741684-9', destination: '/blog/automatiser-emails-clients-btp-ia', permanent: true },
    { source: '/blog/automatiser-vos-emails-clients-avec-l-ia-741703-9', destination: '/blog/automatiser-emails-clients-btp-ia', permanent: true },
    { source: '/blog/chatgpt-conducteur-travaux-5-prompts-gagner-temps', destination: '/blog/comment-ia-gagne-5h-conducteurs-travaux', permanent: true },
    { source: '/blog/chatgpt-garage-automobile-btp', destination: '/blog/chatgpt-pour-pme-btp-erreurs-a-eviter', permanent: true },
    { source: '/blog/chatgpt-pour-artisans-erreurs-a-eviter-741598-8', destination: '/blog/chatgpt-pour-artisans-erreurs-a-eviter', permanent: true },
    { source: '/blog/chatgpt-pour-artisans-erreurs-a-eviter-741612-8', destination: '/blog/chatgpt-pour-artisans-erreurs-a-eviter', permanent: true },
    { source: '/blog/chatgpt-pour-artisans-erreurs-a-eviter-741617-8', destination: '/blog/chatgpt-pour-artisans-erreurs-a-eviter', permanent: true },
    { source: '/blog/chatgpt-pour-pme-btp-erreurs-a-eviter-741631-8', destination: '/blog/chatgpt-pour-pme-btp-erreurs-a-eviter', permanent: true },
    { source: '/blog/chatgpt-pour-pme-btp-erreurs-a-eviter-741650-8', destination: '/blog/chatgpt-pour-pme-btp-erreurs-a-eviter', permanent: true },
    { source: '/blog/chatgpt-pour-pme-btp-erreurs-a-eviter-741664-8', destination: '/blog/chatgpt-pour-pme-btp-erreurs-a-eviter', permanent: true },
    { source: '/blog/chatgpt-pour-pme-btp-erreurs-a-eviter-741669-8', destination: '/blog/chatgpt-pour-pme-btp-erreurs-a-eviter', permanent: true },
    { source: '/blog/chatgpt-pour-pme-btp-erreurs-a-eviter-741683-8', destination: '/blog/chatgpt-pour-pme-btp-erreurs-a-eviter', permanent: true },
    { source: '/blog/chatgpt-pour-pme-btp-erreurs-a-eviter-741688-8', destination: '/blog/chatgpt-pour-pme-btp-erreurs-a-eviter', permanent: true },
    { source: '/blog/chatgpt-pour-pme-btp-erreurs-a-eviter-741707-8', destination: '/blog/chatgpt-pour-pme-btp-erreurs-a-eviter', permanent: true },
    { source: '/blog/confidentialite-donnees-ia-btp', destination: '/blog/securite-donnees-chatgpt-btp', permanent: true },
    { source: '/blog/devis-en-15-min-le-guide-carreleur', destination: '/blog/comment-utiliser-chatgpt-pour-vos-devis-carreleur', permanent: true },
    { source: '/blog/devis-en-15-min-le-guide-charpentier', destination: '/blog/comment-utiliser-chatgpt-pour-vos-devis-charpentier', permanent: true },
    { source: '/blog/devis-en-15-min-le-guide-chauffagiste', destination: '/blog/comment-utiliser-chatgpt-pour-vos-devis-chauffagiste', permanent: true },
    { source: '/blog/devis-en-15-min-le-guide-couvreur', destination: '/blog/comment-utiliser-chatgpt-pour-vos-devis-couvreur', permanent: true },
    { source: '/blog/devis-en-15-min-le-guide-electricien', destination: '/blog/comment-utiliser-chatgpt-pour-vos-devis-electricien', permanent: true },
    { source: '/blog/devis-en-15-min-le-guide-macon', destination: '/blog/comment-utiliser-chatgpt-pour-vos-devis-macon', permanent: true },
    { source: '/blog/devis-en-15-min-le-guide-menuisier', destination: '/blog/comment-utiliser-chatgpt-pour-vos-devis-menuisier', permanent: true },
    { source: '/blog/devis-en-15-min-le-guide-peintre', destination: '/blog/comment-utiliser-chatgpt-pour-vos-devis-peintre', permanent: true },
    { source: '/blog/devis-en-15-min-le-guide-plombier', destination: '/blog/comment-utiliser-chatgpt-pour-vos-devis-plombier', permanent: true },
    { source: '/blog/financement-constructys-formation-ia-btp-2026', destination: '/blog/financer-formation-ia-btp-constructys', permanent: true },
    { source: '/blog/financement-constructys-mode-d-emploi', destination: '/blog/financer-formation-ia-btp-constructys', permanent: true },
    { source: '/blog/financement-constructys-mode-d-emploi-741597-9', destination: '/blog/financer-formation-ia-btp-constructys', permanent: true },
    { source: '/blog/financement-constructys-mode-d-emploi-741611-9', destination: '/blog/financer-formation-ia-btp-constructys', permanent: true },
    { source: '/blog/financement-constructys-mode-d-emploi-741616-9', destination: '/blog/financer-formation-ia-btp-constructys', permanent: true },
    { source: '/blog/financement-constructys-mode-d-emploi-741630-9', destination: '/blog/financer-formation-ia-btp-constructys', permanent: true },
    { source: '/blog/financement-constructys-mode-d-emploi-741649-9', destination: '/blog/financer-formation-ia-btp-constructys', permanent: true },
    { source: '/blog/financement-constructys-mode-d-emploi-741663-9', destination: '/blog/financer-formation-ia-btp-constructys', permanent: true },
    { source: '/blog/financement-constructys-mode-d-emploi-741668-9', destination: '/blog/financer-formation-ia-btp-constructys', permanent: true },
    { source: '/blog/financement-constructys-mode-d-emploi-741682-9', destination: '/blog/financer-formation-ia-btp-constructys', permanent: true },
    { source: '/blog/financement-constructys-mode-d-emploi-741687-9', destination: '/blog/financer-formation-ia-btp-constructys', permanent: true },
    { source: '/blog/financement-constructys-mode-d-emploi-741701-9', destination: '/blog/financer-formation-ia-btp-constructys', permanent: true },
    { source: '/blog/financement-constructys-mode-d-emploi-741706-9', destination: '/blog/financer-formation-ia-btp-constructys', permanent: true },
    { source: '/blog/formation-ia-appliquee-au-batiment-ce-qu-il-faut-savoir-en-2026', destination: '/blog/formation-ia-btp-guide-complet-2026', permanent: true },
    { source: '/blog/formation-ia-appliquee-au-batiment-ce-qu-il-faut-savoir-en-2026-741668-8', destination: '/blog/formation-ia-btp-guide-complet-2026', permanent: true },
    { source: '/blog/formation-ia-appliquee-au-batiment-ce-qu-il-faut-savoir-en-2026-741682-8', destination: '/blog/formation-ia-btp-guide-complet-2026', permanent: true },
    { source: '/blog/formation-ia-appliquee-au-batiment-ce-qu-il-faut-savoir-en-2026-741687-8', destination: '/blog/formation-ia-btp-guide-complet-2026', permanent: true },
    { source: '/blog/formation-ia-appliquee-au-batiment-ce-qu-il-faut-savoir-en-2026-741701-8', destination: '/blog/formation-ia-btp-guide-complet-2026', permanent: true },
    { source: '/blog/formation-ia-appliquee-au-batiment-ce-qu-il-faut-savoir-en-2026-741706-8', destination: '/blog/formation-ia-btp-guide-complet-2026', permanent: true },
    { source: '/blog/formation-ia-btp-ce-qu-il-faut-savoir-en-2026', destination: '/blog/formation-ia-btp-guide-complet-2026', permanent: true },
    { source: '/blog/formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741597-8', destination: '/blog/formation-ia-btp-guide-complet-2026', permanent: true },
    { source: '/blog/formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741611-8', destination: '/blog/formation-ia-btp-guide-complet-2026', permanent: true },
    { source: '/blog/formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741616-8', destination: '/blog/formation-ia-btp-guide-complet-2026', permanent: true },
    { source: '/blog/formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741630-8', destination: '/blog/formation-ia-btp-guide-complet-2026', permanent: true },
    { source: '/blog/formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741635-8', destination: '/blog/formation-ia-btp-guide-complet-2026', permanent: true },
    { source: '/blog/formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741649-8', destination: '/blog/formation-ia-btp-guide-complet-2026', permanent: true },
    { source: '/blog/ia-analyse-cctp-methode', destination: '/blog/analyser-cctp-ia-methode-complete-20-minutes', permanent: true },
    { source: '/blog/ia-conducteur-travaux-chatgpt', destination: '/blog/comment-ia-gagne-5h-conducteurs-travaux', permanent: true },
    { source: '/blog/ia-conducteur-travaux-usages', destination: '/blog/comment-ia-gagne-5h-conducteurs-travaux', permanent: true },
    { source: '/blog/ia-devis-gain-temps-pme-btp', destination: '/blog/ia-devis-batiment-chiffrage-automatise', permanent: true },
    { source: '/blog/outils-ia-btp-chatgpt-claude-gemini', destination: '/blog/comparatif-chatgpt-claude-gemini-btp', permanent: true },
    { source: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741595-9', destination: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents', permanent: true },
    { source: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741609-9', destination: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents', permanent: true },
    { source: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741614-9', destination: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents', permanent: true },
    { source: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741628-9', destination: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents', permanent: true },
    { source: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741633-9', destination: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents', permanent: true },
    { source: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741647-9', destination: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents', permanent: true },
    { source: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741652-9', destination: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents', permanent: true },
    { source: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741666-9', destination: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents', permanent: true },
    { source: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741685-9', destination: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents', permanent: true },
    { source: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741699-9', destination: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents', permanent: true },
    { source: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents-741704-9', destination: '/blog/recrutement-btp-l-ia-pour-attirer-les-talents', permanent: true },
  ];
}

/** Chemins blog redirigés — exclusion sitemap. */
export const BLOG_CONSOLIDATION_EXCLUDED_SITEMAP_PATHS = BLOG_CONSOLIDATION_REDIRECTED_SLUGS.map(
  (slug) => `/blog/${slug}`
);

/** Enrichit l'exclusion sitemap avec toutes les sources B2 (1 hop). */
for (const path of BLOG_CONSOLIDATION_EXCLUDED_SITEMAP_PATHS) {
  GSC_EXCLUDED_SITEMAP_PATHS.add(path);
}
