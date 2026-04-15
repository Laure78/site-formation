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
  /** Article pilier GEO — guide formation IA BTP 2026 */
  blogFormationIaBtpGuide2026: '/blog/formation-ia-btp-guide-complet-2026',
  aPropos: '/a-propos',
  contact: '/contact',
  financement: '/financement-constructys-formation-ia-btp',
  prendreRdv: '/prendre-rdv',
  /** Page pilier SEO — mot-clé « formation IA BTP » */
  formationIaBtp: '/formation-ia-btp',

  // Tier 2 — Formations (catalogue)
  formationBatiment: '/formations/ia-au-service-du-batiment',
  formationTP: '/formations/ia-travaux-publics',
  formationSensibilisation: '/formations/sensibilisation-ia-assistants-personnalises',
  formationAO: '/formations/ia-appels-offre-btp',
  formationRH: '/formations/ia-rh-btp',
  formationArchitecture: '/formations/ia-architecture-claude-dpgf',
  /** Page locale Paris (canonique SEO) */
  formationParis: '/formations/ia-btp-paris',
  formationIleDeFrance: '/formation-ia-btp-ile-de-france',
  formationYvelines: '/formations/ia-btp-yvelines-78',
  /** Page SEO locale Saint-Quentin-en-Yvelines (CA SQY, 78) */
  formationSaintQuentinYvelines: '/formations/ia-btp-saint-quentin-en-yvelines',
  /** Landing SEO local Yvelines (78) — pilier */
  formationIABTPYvelines: '/formation-ia-btp-yvelines',

  // Tier 2 — Cas d'usage
  chatgptArtisans: '/formation-ia-artisans-btp',
  iaDevis: '/ia-devis-batiment',
  iaCDT: '/ia-conducteur-travaux',
  /** Fiche SEO — formation IA conducteur de travaux BTP */
  formationConducteurTravaux: '/formation-ia-conducteur-travaux-btp',
  formationElectricienBtp: '/formation-ia-electricien-btp',
  formationPlombierBtp: '/formation-ia-plombier-btp',

  // Utilitaires
  diagnostic: '/diagnostic-ia-btp',
  checklist: '/checklist-ia-btp',
  /** Alias canonique financement (aligné sur le guide OPCO principal) */
  financement100: '/financement-constructys-formation-ia-btp',
  etudesCas: '/etudes-de-cas/ffb-csfe',
  casUsage: '/ressources/ia-btp/10-cas-usage-concrets',

  repondreAoLanding: '/repondre-appels-offres-ia-btp',

  // Pages légales & conformité
  cgv: '/cgv',
  mentionsLegales: '/mentions-legales',
  politiqueConfidentialite: '/politique-confidentialite',
  reglementInterieur: '/reglement-interieur',
  annuaireHandicap: '/annuaire-handicap',
} as const;

export type InternalLinkPath = (typeof LINKS)[keyof typeof LINKS];
