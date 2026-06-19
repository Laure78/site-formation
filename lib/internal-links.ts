/**
 * Source unique de vérité pour les URLs internes laureolivie.fr (maillage SEO).
 * Préférer ces constantes aux chaînes en dur dans les composants.
 *
 * @see docs/seo/netlinking-audit-2026-04-10.md
 */

/** Programme PDF NIV-02 — fichier unique (alias catalogue + fiche détaillée AO). */
export const PDF_PROGRAMME_NIV02_AO_BTP =
  '/formations/ia-appels-offre-btp/Programme_IA_AO_DCE_MT_ClaudePro_OFC.pdf' as const;

export const LINKS = {
  // Tier 1 — Pages principales
  home: '/',
  formations: '/formations',
  blog: '/blog',
  /** Article pilier GEO — guide formation IA appliquée au bâtiment 2026 */
  blogFormationIaBtpGuide2026: '/blog/formation-ia-btp-guide-complet-2026',
  /** Article MDX — guide pratique formation IA pour le BTP 2026 (calendrier éditorial) */
  blogFormationIaBtpGuide2026Mdx: '/blog/formation-ia-btp-guide-complet-2026',
  /** Article SEO/GEO — tutoriel skill IA conducteur de travaux */
  blogGuideSkillIaConducteurTravaux: '/blog/guide-skill-ia-conducteur-travaux-btp',
  /** Article — cours gratuits Anthropic Academy (Claude AI) pour CDT & PME BTP */
  blogCoursGratuitsClaudeAiPmeBtp: '/blog/cours-gratuits-claude-ai-conducteur-travaux-pme-btp',
  /** Article — 8 usages IA terrain pour conducteur de travaux BTP */
  blogIaConducteurTravauxUsages: '/blog/ia-conducteur-travaux-usages',
  /** Article — financer une formation IA pour les pro du BTP via Constructys */
  blogFinancerFormationIaBtpConstructys: '/blog/financer-formation-ia-btp-constructys',
  /** Article — méthode IA pour gagner 5 h/semaine (conducteurs de travaux BTP) */
  blogCommentIaGagne5hConducteursTravaux: '/blog/comment-ia-gagne-5h-conducteurs-travaux',
  /** Article — sécurité données ChatGPT en entreprise BTP (RGPD, Enterprise) */
  blogSecuriteDonneesChatgptBtp: '/blog/securite-donnees-chatgpt-btp',
  aPropos: '/a-propos',
  contact: '/contact',
  financement: '/financement-constructys-formation-ia-btp',
  prendreRdv: '/prendre-rdv',
  /** Page pilier SEO — mot-clé « formation IA appliquée au bâtiment » */
  formationIaBtp: '/formation-ia-btp',
  /** Guide Claude AI — Anthropic, interfaces, prompts BTP */
  claudeAiBtp: '/claude-ai-btp',
  /** Landing SEO cluster Claude AI */
  formationClaudeAiBtp: '/formation-claude-ai-btp',
  formationClaudeAiBatiment: '/formation-claude-ai-batiment',
  formationClaudeAiTravauxPublics: '/formation-claude-ai-travaux-publics',

  // Tier 2 — Formations (catalogue officiel — 2 niveaux)
  /** Niveau 1 — bâtiment & travaux publics (programme PDF) */
  formationIaBtpNiveau1BatimentTp: '/formations/ia-batiment-travaux-publics',
  /** Niveau 2 — appels d'offre BTP (programme PDF) — alias historique « AO » */
  formationAO: '/formations/ia-appels-offre-btp',
  /** NIV-03 — conduite de travaux & suivi chantier (catalogue) */
  formationConduiteTravauxSuiviChantier: '/formations/ia-conduite-travaux-suivi-chantier',
  pdfProgrammeConduiteTravauxNiv03:
    '/formations/ia-conduite-travaux-suivi-chantier/Programme_IA_Conduite_Travaux_OFC.pdf',
  /** NIV-04 — Maîtriser Claude AI pour le BTP (catalogue) */
  formationMaitriserClaudeAiBtp: '/formations/maitriser-claude-ai-btp',
  pdfProgrammeMaitriserClaudeBtpNiv04:
    '/formations/maitriser-claude-ai-btp/Programme_Maitriser_Claude_BTP_OFC.pdf',
  /** NIV-05 — L'IA au service des maîtres d'œuvre (catalogue) */
  formationIaMaitriseOeuvre: '/formations/ia-maitrise-oeuvre',
  pdfProgrammeIaMaitriseOeuvre:
    '/formations/ia-maitrise-oeuvre/programme_OFC_IA_MOE_4h.pdf',
  pdfProgrammeIaBtpNiveau1BatimentTp: '/formations/pdf/programme-niveau-1-ia-batiment-travaux-publics.pdf',
  pdfProgrammeIaBtpNiveau2AppelsOffre: PDF_PROGRAMME_NIV02_AO_BTP,
  /** Alias explicite — même fichier que `pdfProgrammeIaBtpNiveau2AppelsOffre` */
  pdfProgrammeFormationAoBtpDetail2026: PDF_PROGRAMME_NIV02_AO_BTP,
  /** Page locale Paris (canonique SEO) */
  formationParis: '/formations/ia-btp-paris',
  /** Alias court (301 → formationParis) — maillage explicite possible */
  formationIaBtpParis: '/formation-ia-btp-paris',
  /** Essonne (91) — pages locales SEO */
  formationMorangis: '/formations/ia-btp-morangis',
  formationLongjumeau: '/formations/ia-btp-longjumeau',
  formationIleDeFrance: '/formation-ia-btp-ile-de-france',
  formationYvelines: '/formation-ia-btp-yvelines-78',
  /** Page SEO locale Saint-Quentin-en-Yvelines (CA SQY, 78) */
  formationSaintQuentinYvelines: '/formations/ia-btp-saint-quentin-en-yvelines',
  /** Landing SEO local Yvelines (78) — pilier (l'ancien `/formation-ia-btp-yvelines` redirige en 308) */
  formationIABTPYvelines: '/formation-ia-btp-yvelines-78',
  formationIaBtpParis75: '/formation-ia-btp-paris-75',
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
  /** Fiche SEO informationnelle — IA conducteur de travaux (CR, coordination) */
  iaConducteurTravaux: '/ia-conducteur-travaux',
  /** Canonique SEO — ancien `/ia-conducteur-travaux` redirige en 301 */
  iaCDT: '/formation-ia-conducteur-de-travaux-btp',
  /** Fiche SEO — formation IA conducteur de travaux BTP */
  formationConducteurTravaux: '/formation-ia-conducteur-de-travaux-btp',
  /** Fiche SEO — formation IA chargé d'affaires BTP */
  formationChargeAffairesBtp: '/formation-ia-charge-affaires-btp',
  formationElectricienBtp: '/formation-ia-electricien-btp',
  formationPlombierBtp: '/formation-ia-plombier-btp',
  /** Décideurs — ROI, pilotage IA PME/ETI bâtiment */
  formationIaDirigeantBtp: '/formation-ia-dirigeant-btp',
  /** Chef TPE opérationnel — devis, admin quotidien */
  formationIaDirigeantPmeBtp: '/formation-ia-dirigeant-pme-btp',
  /** Landing SEO — assistante administrative BTP (courriers, mails, suivi chantier) */
  formationIaAssistanteBtp: '/formation-ia-assistante-administrative-btp',
  /** Landing SEO — assistante de gestion BTP (facturation, relances, DGD) */
  formationIaAssistanteGestionBtp: '/formation-ia-assistante-gestion-btp',
  /** Page pilier SEO — étancheurs (partenaire CSFE) */
  formationIaEtancheur: '/formation-ia-etancheur',
  // Variants suffixées maintenues comme cibles canoniques après dédup mai 2026
  formationIaPlatriste: '/formation-ia-plaquiste-btp',
  formationIaPeintreBatiment: '/formation-ia-peintre-btp',
  formationIaSolierRevetements: '/formation-ia-solier-revetements',
  formationIaPaysagiste: '/formation-ia-paysagiste-btp',
  formationIaConducteurEnginsTp: '/formation-ia-conducteur-engins-tp',
  formationIaCanalisateur: '/formation-ia-canalisateur-tp',

  /** Page présentation BeWork sur laureolivie.fr (site officiel : bework.fr) */
  bework: '/bework',
  diagnostic: '/diagnostic-ia-btp',
  outilsIaBtp: '/outils-ia-btp',
  /** Sélecteur interactif — cas d'usage IA par métier BTP */
  casUsageIaMetierBtp: '/outils/cas-usage-ia-btp',
  /** Prototype noindex — test rapprochement devis / DTU (charte rapport BeWork) */
  verificationDtuBeworkTest: '/outils/verification-dtu-bework',
  checklist: '/checklist-ia-btp',
  /** Lead magnet — 3 skills Claude AI BTP (fichier texte) */
  downloadClaudeSkillsBtp: '/downloads/3-skills-claude-ai-btp.txt',
  /** Alias canonique financement (aligné sur le guide OPCO principal) */
  financement100: '/financement-constructys-formation-ia-btp',
  etudesCas: '/etudes-de-cas/ffb-csfe',
  casUsage: '/ressources/ia-btp/10-cas-usage-concrets',
  /** Lead magnet — Guide PDF Skill IA conducteur de travaux */
  skillIaConducteurTravaux: '/ressources/guide-conducteur-de-travaux',
  /** Guide conducteur de travaux — maître (l'ancien `/ressources/guide-conducteur-travaux-ia-btp` redirige en 308) */
  guideConducteurTravauxIaBtp: '/ressources/guide-conducteur-de-travaux',
  /** PDF gratuit — Guide conducteur de travaux OFC (6 tutos Claude, ~52 p.) */
  pdfPackConducteurTravauxOfc: '/ressources/pdf/pack-conducteur-de-travaux-ofc.pdf',
  /** Landing SEO du tutoriel Skill IA (canonical vers la ressource) */
  guideSkillIaConducteurTravaux: '/guide-skill-ia-conducteur-travaux',
  /** Hub Ressources — index général (tutos, guides…) */
  ressources: '/ressources',
  /** Index listing — tous les tutos PDF Claude & IA BTP */
  ressourcesTutos: '/ressources/tutos',
  /** Tutos Ressources OFC — pages individuelles */
  tutoMemoireTechnique: '/ressources/tuto-memoire-technique',
  tutoAnalyseDce: '/ressources/tuto-analyse-dce',
  tutoTriDceClaudeChrome: '/ressources/tuto-tri-dce-claude-chrome',
  tutoCrChantier: '/ressources/tuto-cr-chantier',
  tutoPpsps: '/ressources/tuto-ppsps',
  tutoDuerp: '/ressources/tuto-duerp',
  tutoConstatRetard: '/ressources/tuto-constat-retard',
  tutoDispatchBtp: '/ressources/tuto-dispatch-btp',
  tutoDoeDossierOuvragesExecutes: '/ressources/tuto-doe-dossier-ouvrages-executes',
  tutoPvLeveeReserves: '/ressources/tuto-pv-levee-reserves',

  /** AO BTP — maître (l'ancien `/formation-ia-appels-offres-btp` redirige en 308) */
  repondreAoLanding: '/formations/ia-appels-offre-btp',
  /** Analyse CCTP/DCE — maître (l'ancien `/formation-ia-analyse-cctp` redirige en 308) */
  formationIaAnalyseCctp: '/formations/formation-ia-cctp-analyse-dce-btp',
  /** Article — méthode analyse CCTP en 20 min (cluster AO/DCE) */
  blogAnalyserCctpMethode20Min: '/blog/analyser-cctp-ia-methode-complete-20-minutes',
  /** @deprecated Préférer blogAnalyserCctpMethode20Min */
  blogIaAnalyseCctpMethode: '/blog/analyser-cctp-ia-methode-complete-20-minutes',
  /** Article informationnel — comment analyser un DCE/CCTP avec l'IA (cluster AO/DCE) */
  blogFormationIaCctpAnalyseDceBtp: '/blog/formation-ia-cctp-analyse-dce-btp',
  /** Article — NotebookLM + Claude sur DCE (cluster AO/DCE) */
  blogAnalyseDceNotebooklm: '/blog/analyse-dce-notebooklm-claude-btp',
  /** Article — chiffrage CCTP/BPU (cluster AO/DCE) */
  blogChiffrageCctpBpu: '/blog/chiffrage-cctp-bpu-appels-offres-btp',
  /** Article — IA devis bâtiment et chiffrage automatisé */
  blogIaDevisBatimentChiffrageAutomatise: '/blog/ia-devis-batiment-chiffrage-automatise',
  /** Article — compte rendu de chantier IA */
  blogCompteRenduChantierIa: '/blog/compte-rendu-chantier-ia-automatiser-gagner-temps',
  /** Fiche formation historique — canonical → formationAO (pilier NIV-02) */
  formationIaCctpAnalyseDceBtp: '/formations/formation-ia-cctp-analyse-dce-btp',

  // Pages légales & conformité
  cgv: '/cgv',
  mentionsLegales: '/mentions-legales',
  politiqueConfidentialite: '/politique-confidentialite',
  reglementInterieur: '/reglement-interieur',
  annuaireHandicap: '/annuaire-handicap',
} as const;

export type InternalLinkPath = (typeof LINKS)[keyof typeof LINKS];
