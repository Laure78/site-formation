/**
 * Source unique de vérité pour les URLs internes laureolivie.fr (maillage SEO).
 * Préférer ces constantes aux chaînes en dur dans les composants.
 *
 * @see docs/seo/netlinking-audit-2026-04-10.md
 */

export const LINKS = {
  // Tier 1 — Pages principales
  home: '/',
  formations: '/formations',
  blog: '/blog',
  aPropos: '/a-propos',
  contact: '/contact',
  financement: '/financement-constructys-formation-ia-btp',
  prendreRdv: '/prendre-rdv',

  // Tier 2 — Formations (catalogue)
  formationBatiment: '/formations/ia-au-service-du-batiment',
  formationTP: '/formations/ia-travaux-publics',
  formationSensibilisation: '/formations/sensibilisation-ia-assistants-personnalises',
  formationAO: '/formations/ia-appels-offre-btp',
  formationRH: '/formations/ia-rh-btp',
  formationArchitecture: '/formations/ia-architecture-claude-dpgf',
  /** Page locale Paris (canonique SEO) */
  formationParis: '/formations/ia-btp-paris',
  formationIleDeFrance: '/formations/ia-btp-ile-de-france',
  formationYvelines: '/formations/ia-btp-yvelines-78',

  // Tier 2 — Cas d'usage
  chatgptArtisans: '/formation-ia-artisans-btp',
  iaDevis: '/ia-devis-batiment',
  iaCDT: '/ia-conducteur-travaux',

  // Utilitaires
  diagnostic: '/diagnostic-ia-btp',
  checklist: '/checklist-ia-btp',
  /** Page complémentaire « 100 % » — ne pas confondre avec le guide principal */
  financement100: '/financement-constructys-100-ia-btp',
  etudesCas: '/etudes-de-cas/ffb-csfe',
  casUsage: '/ressources/ia-btp/10-cas-usage-concrets',

  repondreAoLanding: '/repondre-appels-offres-ia-btp',
} as const;

export type InternalLinkPath = (typeof LINKS)[keyof typeof LINKS];
