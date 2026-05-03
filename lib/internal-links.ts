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
  /** Article MDX — guide pratique formation IA BTP 2026 (calendrier éditorial) */
  blogFormationIaBtpGuide2026Mdx: '/blog/formation-ia-btp-guide-complet-2026',
  /** Article SEO/GEO — tutoriel skill IA conducteur de travaux */
  blogGuideSkillIaConducteurTravaux: '/blog/guide-skill-ia-conducteur-travaux-btp',
  aPropos: '/a-propos',
  contact: '/contact',
  financement: '/financement-constructys-formation-ia-btp',
  prendreRdv: '/prendre-rdv',
  /** Page pilier SEO — mot-clé « formation IA BTP » */
  formationIaBtp: '/formation-ia-btp',
  /** Guide Claude AI — Anthropic, interfaces, prompts BTP */
  claudeAiBtp: '/claude-ai-btp',
  /** Landing SEO cluster Claude AI */
  formationClaudeAiBtp: '/formation-claude-ai-btp',
  formationClaudeAiBatiment: '/formation-claude-ai-batiment',
  formationClaudeAiTravauxPublics: '/formation-claude-ai-travaux-publics',

  // Tier 2 — Formations (catalogue)
  formationBatiment: '/formations/ia-au-service-du-batiment',
  formationTP: '/formations/ia-travaux-publics',
  formationSensibilisation: '/formations/sensibilisation-ia-assistants-personnalises',
  formationAO: '/formations/ia-appels-offre-btp',
  formationRH: '/formations/ia-rh-btp',
  formationArchitecture: '/formations/ia-architecture-claude-dpgf',
  /** Page locale Paris (canonique SEO) */
  formationParis: '/formations/ia-btp-paris',
  /** Alias court (301 → formationParis) — maillage explicite possible */
  formationIaBtpParis: '/formation-ia-btp-paris',
  /** Essonne (91) — pages locales SEO */
  formationMorangis: '/formations/ia-btp-morangis',
  formationLongjumeau: '/formations/ia-btp-longjumeau',
  formationIleDeFrance: '/formation-ia-btp-ile-de-france',
  formationYvelines: '/formation-ia-btp-yvelines',
  /** Page SEO locale Saint-Quentin-en-Yvelines (CA SQY, 78) */
  formationSaintQuentinYvelines: '/formations/ia-btp-saint-quentin-en-yvelines',
  /** Landing SEO local Yvelines (78) — pilier */
  formationIABTPYvelines: '/formation-ia-btp-yvelines',
  /** Pages pilier SEO par département Île-de-France (+77) */
  formationIaBtpYvelines78: '/formation-ia-btp-yvelines-78',
  formationIaBtpSeineEtMarne77: '/formation-ia-btp-seine-et-marne-77',
  formationIaBtpEssonne91: '/formation-ia-btp-essonne-91',
  formationIaBtpHautsDeSeine92: '/formation-ia-btp-hauts-de-seine-92',
  formationIaBtpSeineSaintDenis93: '/formation-ia-btp-seine-saint-denis-93',
  formationIaBtpValDeMarne94: '/formation-ia-btp-val-de-marne-94',
  formationIaBtpValDoise95: '/formation-ia-btp-val-doise-95',

  // Tier 2 — Cas d'usage
  chatgptArtisans: '/formation-ia-artisans-btp',
  iaDevis: '/ia-devis-batiment',
  /** Canonique SEO — ancien `/ia-conducteur-travaux` redirige en 301 */
  iaCDT: '/formation-ia-conducteur-travaux',
  /** Fiche SEO — formation IA conducteur de travaux BTP */
  formationConducteurTravaux: '/formation-ia-conducteur-travaux',
  formationElectricienBtp: '/formation-ia-electricien-btp',
  formationPlombierBtp: '/formation-ia-plombier-btp',
  /** Décideurs — ROI, pilotage IA PME bâtiment */
  formationIaDirigeantBtp: '/formation-ia-dirigeant-btp',
  /** Landing SEO — assistante administrative BTP (URL courte) */
  formationIaAssistanteBtp: '/formation-ia-assistante-btp',
  /** Page pilier SEO — étancheurs (partenaire CSFE) */
  formationIaEtancheur: '/formation-ia-etancheur',
  // Variants suffixées maintenues comme cibles canoniques après dédup mai 2026
  formationIaPlatriste: '/formation-ia-plaquiste-btp',
  formationIaPeintreBatiment: '/formation-ia-peintre-btp',
  formationIaSolierRevetements: '/formation-ia-solier-revetements',
  formationIaPaysagiste: '/formation-ia-paysagiste-btp',
  formationIaConducteurEnginsTp: '/formation-ia-conducteur-engins-tp',
  formationIaCanalisateur: '/formation-ia-canalisateur-tp',

  // Utilitaires
  diagnostic: '/diagnostic-ia-btp',
  outilsIaBtp: '/outils-ia-btp',
  checklist: '/checklist-ia-btp',
  /** Lead magnet — 3 skills Claude AI BTP (fichier texte) */
  downloadClaudeSkillsBtp: '/downloads/3-skills-claude-ai-btp.txt',
  /** Alias canonique financement (aligné sur le guide OPCO principal) */
  financement100: '/financement-constructys-formation-ia-btp',
  etudesCas: '/etudes-de-cas/ffb-csfe',
  casUsage: '/ressources/ia-btp/10-cas-usage-concrets',
  /** Lead magnet — Guide PDF Skill IA conducteur de travaux */
  skillIaConducteurTravaux: '/ressources/skill-ia-conducteur-travaux',
  /** Landing SEO du tutoriel Skill IA (canonical vers la ressource) */
  guideSkillIaConducteurTravaux: '/guide-skill-ia-conducteur-travaux',

  repondreAoLanding: '/formation-ia-appels-offres-btp',
  /** Landing SEO — analyse CCTP / DCE avec ChatGPT (appels d'offres BTP) */
  formationIaAnalyseCctp: '/formation-ia-analyse-cctp',
  /** Article — prompts et méthode analyse CCTP avec l'IA */
  blogIaAnalyseCctpMethode: '/blog/ia-analyse-cctp-methode',
  /** Article pilier SEO — formation IA CCTP, analyse DCE BTP */
  blogFormationIaCctpAnalyseDceBtp: '/blog/formation-ia-cctp-analyse-dce-btp',
  /** Fiche formation conversion — IA analyse CCTP & DCE */
  formationIaCctpAnalyseDceBtp: '/formations/formation-ia-cctp-analyse-dce-btp',

  // Pages légales & conformité
  cgv: '/cgv',
  mentionsLegales: '/mentions-legales',
  politiqueConfidentialite: '/politique-confidentialite',
  reglementInterieur: '/reglement-interieur',
  annuaireHandicap: '/annuaire-handicap',
} as const;

export type InternalLinkPath = (typeof LINKS)[keyof typeof LINKS];
