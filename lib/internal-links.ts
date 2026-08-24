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
  /** Hub métiers & zones IDF — pilier cluster « métiers » */
  formationIaHub: '/formation-ia',
  /** Hub — 2 formations LinkedIn Learning (à la demande) */
  formationsLinkedInLearning: '/formations-linkedin-learning',
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
  /** Article — financer une formation IA pour les pros du BTP via Constructys */
  blogFinancerFormationIaBtpConstructys: '/blog/financer-formation-ia-btp-constructys',
  /** Article — subrogation Constructys, trésorerie & eGestion J-15 (2026) */
  blogSubrogationConstructysFinancementIaBtp:
    '/blog/subrogation-constructys-financement-formation-ia-btp-2026',
  /** Article — méthode IA pour gagner 5 h/semaine (conducteurs de travaux BTP) */
  blogCommentIaGagne5hConducteursTravaux: '/blog/comment-ia-gagne-5h-conducteurs-travaux',
  /** Article — comment choisir une formation IA à Paris (BTP, présentiel) */
  blogFormationIaParisChoisir: '/blog/formation-ia-paris-choisir',
  /** Article — sécurité données ChatGPT en entreprise BTP (RGPD, Enterprise) */
  blogSecuriteDonneesChatgptBtp: '/blog/securite-donnees-chatgpt-btp',
  aPropos: '/a-propos',
  partenaires: '/partenaires',
  contact: '/contact',
  financement: '/financement-constructys-formation-ia-btp',
  prendreRdv: '/prendre-rendez-vous',
  /** Calendly inline — ancre unique page d'accueil */
  accueilRdv: '/#rdv',
  /** Alias historique — URL legacy ; redirection 301 vers `prendreRdv` (ne pas utiliser dans les liens internes). */
  prendreRdvLegacy: '/prendre-rdv',
  /**
   * Ancien pilier `/formation-ia-btp` (308 → catalogue).
   * Canonique : `/formations` — préférer `LINKS.formations` pour les nouveaux liens.
   */
  formationIaBtp: '/formations',
  /** Landing SEO cluster — formation IA entreprises de construction (ETI, EG, MOE, BET) */
  formationIaConstruction: '/formation-ia-construction',
  /** Cluster SEO — formation ChatGPT BTP (outil) */
  formationChatgptBtp: '/formation-chatgpt-btp',
  /** Cluster SEO — formation IA conducteur de travaux (métier) */
  formationIaConducteurDeTravaux: '/formation-ia-conducteur-de-travaux',
  /** Cluster SEO — formation IA appels d'offres BTP (processus AO/DCE) */
  formationIaAppelsOffresBtp: '/formation-ia-appels-offres-btp',
  /** Cluster SEO — formation Claude BTP (outil Claude AI) */
  formationClaudeBtp: '/formation-claude-btp',
  /** Cluster SEO local — formation IA intra entreprise bâtiment Paris / IDF */
  formationIaEntrepriseBatimentParis: '/formation-ia-entreprise-batiment-paris',
  /** Pilier SEO cluster — formation IA pour le BTP (page maîtresse) */
  formationIaBtpPillar: '/formation-ia-btp',
  /** Guide Claude AI — Anthropic, interfaces, prompts BTP */
  claudeAiBtp: '/claude-ai-btp',
  /**
   * @deprecated Anciennes landings SEO — 308 → pilier `/claude-ai-btp`.
   * Fiche produit : `formationMaitriserClaudeAiBtp`.
   */
  formationClaudeAiBtp: '/claude-ai-btp',
  /** @deprecated Alias → pilier `/claude-ai-btp` (section bâtiment). */
  formationClaudeAiBatiment: '/claude-ai-btp',
  /** @deprecated Alias → pilier `/claude-ai-btp` (section travaux publics). */
  formationClaudeAiTravauxPublics: '/claude-ai-btp',

  // Tier 2 — Formations (catalogue officiel — 5 parcours)
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
  /** Canonique geo Paris (75) — formation IA BTP Paris */
  formationParis: '/formation-ia-btp-paris',
  /** Pilier SEO — Formation IA à Paris (présentiel BTP) */
  formationIaParis: '/formation-ia-paris',
  /** Hub zones IDF — 8 départements (pilier Île-de-France) */
  formationIaBtpIdfZones: '/formation-ia-btp-ile-de-france',
  /** Canonique SEO — formation IA BTP Paris (75) */
  formationIaBtpParis: '/formation-ia-btp-paris',
  /** Essonne (91) — pages locales SEO */
  formationMorangis: '/formations/ia-btp-morangis',
  formationLongjumeau: '/formations/ia-btp-longjumeau',
  formationIleDeFrance: '/formation-ia-btp-ile-de-france',
  /** Landing SEO / E-E-A-T — formateur IA BTP (Laure Olivié) */
  formateurIaBtp: '/formateur-ia-btp',
  formationYvelines: '/formation-ia-btp-yvelines-78',
  /** Page SEO locale Saint-Quentin-en-Yvelines (CA SQY, 78) */
  formationSaintQuentinYvelines: '/formations/ia-btp-saint-quentin-en-yvelines',
  /** Landing SEO local Yvelines (78) — pilier (l'ancien `/formation-ia-btp-yvelines` redirige en 308) */
  formationIABTPYvelines: '/formation-ia-btp-yvelines-78',
  /** Alias historique — même URL que formationIaBtpParis */
  formationIaBtpParis75: '/formation-ia-btp-paris',
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
  /** Landing SEO — formation IA travaux publics */
  formationIaTravauxPublics: '/formation-ia-travaux-publics',
  iaDevis: '/ia-devis-batiment',
  /** Méthode transactionnelle — analyser un DCE (CCTP, CCAP, RC) avec l'IA */
  iaAnalyseDce: '/ia-analyse-dce-btp',
  /** Méthode transactionnelle — rédiger un mémoire technique BTP avec l'IA */
  iaMemoireTechnique: '/ia-memoire-technique-btp',
  /** Méthode transactionnelle — comptes rendus de chantier avec l'IA */
  iaCompteRenduChantier: '/ia-compte-rendu-chantier',
  /** Canonique SEO — formation IA conducteur de travaux (ancien `/formation-ia-conducteur-de-travaux-btp` → 301) */
  iaConducteurTravaux: '/formation-ia-conducteur-de-travaux',
  /** Alias canonique — même URL que `formationConducteurTravaux` */
  iaCDT: '/formation-ia-conducteur-de-travaux',
  /** Landing SEO — métreur & économiste de la construction (DPGF, DQE, métrés) */
  formationIaMetreurEconomisteConstruction: '/formation-ia-metreur-economiste-construction',
  /** Fiche SEO — formation IA conducteur de travaux BTP */
  formationConducteurTravaux: '/formation-ia-conducteur-de-travaux',
  /** Fiche SEO — formation IA chargé d'affaires BTP */
  formationChargeAffairesBtp: '/formation-ia-charge-affaires-btp',
  formationElectricienBtp: '/formation-ia-electricien-btp',
  formationPlombierBtp: '/formation-ia-plombier-btp',
  /** Landing SEO — charpente, ossature bois, agencement & menuiserie (partenariat UMB-FFB) */
  formationIaCharpentierMenuisierBtp: '/formation-ia-charpentier-menuisier-btp',
  /** Landing métier — charpentier (DTU 31) */
  formationIaCharpentierBtp: '/formation-ia-charpentier-btp',
  /** Landing métier — menuisier bâtiment (DTU 36) */
  formationIaMenuisierBtp: '/formation-ia-menuisier-btp',
  /** Landing métier — couvreur zingueur */
  formationIaCouvreurBtp: '/formation-ia-couvreur-btp',
  /** Landing métier — maçon / maçonnerie gros œuvre (DTU 20.1) */
  formationIaMaconBtp: '/formation-ia-macon-btp',
  /** Landing SEO — gros œuvre (devis, DCE, suivi chantier) */
  formationIaGrosOeuvreBtp: '/formation-ia-gros-oeuvre-btp',
  /** Décideurs — ROI, pilotage IA PME/ETI bâtiment */
  formationIaDirigeantBtp: '/formation-ia-dirigeant-btp',
  /** Chef TPE opérationnel — devis, admin quotidien */
  formationIaDirigeantPmeBtp: '/formation-ia-dirigeant-pme-btp',
  /** Landing SEO — assistante administrative BTP (courriers, mails, suivi chantier) */
  formationIaAssistanteBtp: '/formation-ia-assistante-administrative-btp',
  /** Landing SEO — assistante / assistant travaux BTP (marché, PPSPS, CR, DOE) */
  formationIaAssistanteTravaux: '/formation-ia-assistante-travaux',
  /** Landing SEO — assistante de gestion BTP (facturation, relances, DGD) */
  formationIaAssistanteGestionBtp: '/formation-ia-assistante-gestion-btp',
  /** Landing SEO — responsable administratif / RAF BTP (devis, factures, mails, dossiers) */
  formationIaResponsableAdministratifBtp: '/formation-ia-responsable-administratif-btp',
  /** Page pilier SEO — étancheurs (partenaire CSFE) */
  formationIaEtancheur: '/formation-ia-etancheur',
  /** Cluster commande publique — pilier marché public de travaux */
  formationIaMarchePublicTravaux: '/formation-ia-marche-public-travaux',
  /** Cluster commande publique — lot étanchéité (CSFE) */
  formationIaMarchePublicEtancheite: '/formation-ia-marche-public-etancheite',
  // Variants suffixées maintenues comme cibles canoniques après dédup mai 2026
  formationIaPlatriste: '/formation-ia-plaquiste-btp',
  formationIaPeintreBatiment: '/formation-ia-peintre-btp',
  formationIaSolierRevetements: '/formation-ia-solier-revetements',
  formationIaPaysagiste: '/formation-ia-paysagiste-btp',
  formationIaConducteurEnginsTp: '/formation-ia-conducteur-engins-tp',
  /** Landing SEO — chef de chantier travaux publics */
  formationIaChefChantierTp: '/formation-ia-chef-chantier-tp',
  formationIaCanalisateur: '/formation-ia-canalisateur-tp',
  formationIaFerrailleurBtp: '/formation-ia-ferrailleur-btp',
  formationIaVitrierBtp: '/formation-ia-vitrier-btp',
  formationIaPiscinisteBtp: '/formation-ia-pisciniste-btp',
  formationIaCloturisteBtp: '/formation-ia-cloturiste-btp',
  formationIaGeometreTp: '/formation-ia-geometre-tp',
  formationIaMaconPaysagisteBtp: '/formation-ia-macon-paysagiste-btp',
  /** Landing SEO distincte de `/formation-ia-conducteur-de-travaux-btp` */
  formationIaConducteurTravauxLanding: '/formation-ia-conducteur-travaux',
  /** Landing catalogue PME (hors les 5 sessions NIV-01 à NIV-05) */
  formationPmeBtp: '/formations/ia-pme-btp',

  /** Page présentation BeWork sur laureolivie.fr (site officiel : bework.fr) */
  bework: '/bework',
  /** Point d'entrée indexable vers la plateforme app.laureolivie.fr */
  beworkPlateforme: '/bework/plateforme',
  /** Point d'entrée indexable vers l'espace apprenant OFC (stagiaires) */
  formationPlateforme: '/formations/plateforme',
  /** Connexion espace apprenant LMS (indexable SEO/GEO) */
  authConnexion: '/auth/connexion',
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
  /** Lead magnet — Guide Maître d'Œuvre × IA (12 missions MOE) */
  guideMaitriseOeuvreIa: '/ressources/guide-maitrise-oeuvre-ia',
  /** PDF gratuit — Guide MOE × IA OFC */
  pdfGuideMoeIa: '/ressources/pdf/guide-moe-ia.pdf',
  /** Lead magnet — Guide des Assistants Travaux OFC (12 missions marché) */
  guideAssistantsTravauxOfc: '/ressources/guide-assistants-travaux-ofc',
  /** PDF gratuit — Guide Assistants Travaux OFC (~21 p.) */
  pdfGuideAssistantsTravauxOfc: '/ressources/pdf/guide-assistants-travaux-ofc.pdf',
  /** Bibliothèque Excel — prompts IA BTP par métier (dirigeant, CDT, assistante, BE…) */
  bibliothequePromptsBtpParMetier: '/ressources/bibliotheque-prompts-btp-par-metier',
  /** Fichier Excel gratuit — bibliothèque prompts BTP par métier */
  xlsxBibliothequePromptsBtpParMetier:
    '/ressources/xlsx/bibliotheque-prompts-btp-par-metier.xlsx',
  /** Lead magnet — Guide pratique Claude BTP OFC (Projets, Skills, MCP, Cowork) */
  guideClaudeBtpOfc: '/ressources/guide-claude-btp-ofc',
  /** PDF gratuit — Guide Claude BTP OFC (édition 2026) */
  pdfGuideClaudeBtpOfc: '/ressources/pdf/guide-claude-btp-ofc.pdf',
  /** Lead magnet — Guide du dirigeant BTP OFC (6 leviers + 24 prompts) */
  guideDirigeantBtpOfc: '/ressources/guide-dirigeant-btp-ofc',
  /** PDF gratuit — Guide du dirigeant BTP OFC (~20 p.) */
  pdfGuideDirigeantBtpOfc: '/ressources/pdf/guide-dirigeant-btp-ofc.pdf',
  /** Lead magnet — Guide du chef de chantier OFC (6 skills Claude mobile) */
  guideChefDeChantierOfc: '/ressources/guide-chef-de-chantier-ofc',
  /** PDF gratuit — Guide du chef de chantier OFC (~13 p.) */
  pdfGuideChefDeChantierOfc: '/ressources/pdf/guide-chef-de-chantier-ofc.pdf',
  /** Lead magnet — Guide RH du BTP × IA OFC (18 cas d’usage) */
  guideRhBtpIaOfc: '/ressources/guide-rh-btp-ia-ofc',
  /** PDF gratuit — Guide RH BTP × IA OFC (~36 p.) */
  pdfGuideRhBtpIaOfc: '/ressources/pdf/guide-rh-btp-ia-ofc.pdf',
  /** Lead magnet — Guide du chargé d’affaires BTP × IA OFC (12 cas d’usage) */
  guideChargeAffairesOfc: '/ressources/guide-charge-affaires-ofc',
  /** PDF gratuit — Guide chargé d’affaires OFC (~30 p.) */
  pdfGuideChargeAffairesOfc: '/ressources/pdf/guide-charge-affaires-ofc.pdf',
  /** Lead magnet — Répondre AO BTP méthode 5 étapes (éd. 2026) */
  guideRepondreAoBtpOfc2026: '/ressources/guide-repondre-ao-btp-ofc-2026',
  /** PDF gratuit — Guide répondre AO BTP OFC 2026 (~12 p.) */
  pdfGuideRepondreAoBtpOfc2026: '/ressources/pdf/guide-repondre-ao-btp-ofc-2026.pdf',
  pdfTutoSkillAnalyseCcap: '/ressources/pdf/tuto-skill-analyse-ccap-bework.pdf',
  /** Landing SEO du tutoriel Skill IA (canonical vers la ressource) */
  guideSkillIaConducteurTravaux: '/guide-skill-ia-conducteur-travaux',
  /** Hub Ressources — index général (tutos, guides…) */
  ressources: '/ressources',
  /** Index ressources IA BTP (guides & articles) */
  ressourcesIaBtp: '/ressources/ia-btp',
  /** Bibliothèque skills Claude BTP — téléchargements .skill et .md */
  bibliothequeSkills: '/ressources/bibliotheque-skills',
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
  /** Tuto — skill pièces DIUO pour le SPS (liasse lot) */
  tutoSkillDiuoOfc: '/ressources/tuto-skill-diuo-ofc',
  /** Fichier téléchargeable — tuto skill DIUO OFC (.docx) */
  pdfTutoSkillDiuoOfc: '/ressources/pdf/tuto-skill-diuo-ofc.docx',
  /** Tuto — skill livret d'intégration (accueil sécurité / RH BTP) */
  tutoSkillLivretIntegrationOfc: '/ressources/tuto-skill-livret-integration-ofc',
  /** PDF — tuto skill livret d'intégration OFC */
  pdfTutoSkillLivretIntegrationOfc: '/ressources/pdf/tuto-skill-livret-integration-ofc.pdf',
  /** Tuto — skill mémoire de réclamation (BeWork) */
  tutoSkillMemoireReclamationBework: '/ressources/tuto-skill-memoire-reclamation-bework',
  /** PDF — tuto skill mémoire de réclamation BeWork */
  pdfTutoSkillMemoireReclamationBework:
    '/ressources/pdf/tuto-skill-memoire-reclamation-bework.pdf',
  tutoPvLeveeReserves: '/ressources/tuto-pv-levee-reserves',

  /** AO BTP — landing SEO cluster (fiche catalogue : `formationAO`) */
  repondreAoLanding: '/formation-ia-appels-offres-btp',
  /**
   * Alias historique analyse CCTP/DCE → fiche catalogue NIV-02.
   * L’ancienne URL `/formations/formation-ia-cctp-analyse-dce-btp` redirige en 308.
   */
  formationIaAnalyseCctp: '/formations/ia-appels-offre-btp',
  /** Article — méthode analyse CCTP en 20 min (cluster AO/DCE) */
  blogAnalyserCctpMethode20Min: '/blog/analyser-cctp-ia-methode-complete-20-minutes',
  /** Article — analyser un CCAP avec l'IA (cluster AO/DCE) */
  blogAnalyserCcapIaBtp: '/blog/analyser-ccap-ia-btp',
  /** Alias — même article que blogAnalyserCcapIaBtp */
  blogIaAnalyseCcap: '/blog/analyser-ccap-ia-btp',
  /** Article — mémoire de réclamation BTP avec l'IA */
  blogMemoireReclamationBtpIa: '/blog/memoire-reclamation-btp-ia',
  /** Article pilier — répondre aux AO BTP avec l'IA (guide 5 étapes) */
  blogIaMemoireTechniqueAppelOffresGuide2026: '/blog/ia-memoire-technique-appel-offres-guide-2026',
  /** @deprecated Préférer blogAnalyserCctpMethode20Min */
  blogIaAnalyseCctpMethode: '/blog/analyser-cctp-ia-methode-complete-20-minutes',
  /** Article informationnel — comment analyser un DCE/CCTP avec l'IA (cluster AO/DCE) */
  blogFormationIaCctpAnalyseDceBtp: '/blog/formation-ia-cctp-analyse-dce-btp',
  /** Article — NotebookLM + Claude sur DCE (cluster AO/DCE) */
  blogAnalyseDceNotebooklm: '/blog/analyse-dce-notebooklm-claude-btp',
  /** Article — chiffrage CCTP/BPU (cluster AO/DCE) */
  blogChiffrageCctpBpu: '/blog/chiffrage-cctp-bpu-appels-offres-btp',
  /** Article MDX — ChatGPT peintre bâtiment (devis, métré, relances) */
  blogChatgptPeintreBatiment: '/blog/chatgpt-peintre-batiment',
  /** Article — IA devis bâtiment et chiffrage automatisé */
  blogIaDevisBatimentChiffrageAutomatise: '/blog/ia-devis-batiment-chiffrage-automatise',
  /** Article — devis ChatGPT BTP en ~20 minutes (méthode terrain) */
  blogDevisBtpChatgpt20Minutes: '/blog/devis-btp-chatgpt-20-minutes',
  /** Article — méthode ChatGPT devis BTP pas à pas 2026 */
  blogChatgptDevisBtpMethode2026: '/blog/chatgpt-devis-btp-methode-2026',
  /** Article MDX — 7 leviers ChatGPT productivité BTP */
  blogChatgptBtp7LeviersProductivite2026: '/blog/chatgpt-btp-7-leviers-productivite-2026',
  /** Article — comparatif ChatGPT / Claude / Gemini BTP */
  blogComparatifChatgptClaudeGeminiBtp: '/blog/comparatif-chatgpt-claude-gemini-btp',
  /** Article — 7 cas d'usage IA BTP (carrousel) */
  blog7CasUsageIaBtp: '/blog/7-cas-usage-ia-btp-chiffrage-chantier-appels-offres',
  /** Article — 5 assistants IA BTP */
  blog5AssistantsIaBtp: '/blog/5-assistants-ia-btp-chatgpt-productivite',
  /** Article — guide Claude Code / Projects / Skills / MCP */
  blogGuideClaudeIaBtpCodeProjectsSkillsMcp: '/blog/guide-claude-ia-btp-code-projects-skills-mcp',
  /** Article — exemple de mémoire technique BTP */
  blogMemoireTechniqueBtpExemple: '/blog/memoire-technique-btp-exemple',
  /** Article — compte rendu de chantier IA */
  blogCompteRenduChantierIa: '/blog/compte-rendu-chantier-ia-automatiser-gagner-temps',
  /** Article — 5 cas d'usage ChatGPT BTP (approfondissement CR / terrain) */
  blog5CasUsageChatgptBtp: '/blog/5-cas-usage-chatgpt-artisans-btp',
  /**
   * @deprecated Alias → formationAO (NIV-02). Ancienne fiche CCTP supprimée (301/308).
   * Conservé pour éviter de casser les imports ; préférer `formationAO`.
   */
  formationIaCctpAnalyseDceBtp: '/formations/ia-appels-offre-btp',

  // Pages légales & conformité
  cgv: '/cgv',
  mentionsLegales: '/mentions-legales',
  politiqueConfidentialite: '/politique-confidentialite',
  reglementInterieur: '/reglement-interieur',
  /** Règlement intérieur OFC (PDF) */
  reglementInterieurPdf: '/documents/reglement-interieur-ofc.pdf',
  annuaireHandicap: '/annuaire-handicap',
  /** Annuaire contacts RHF Agefiph (PDF — janvier 2026) */
  annuaireHandicapPdf: '/documents/annuaire-handicap-agefiph-rhf-2026-01.pdf',
  /** Accessibilité & handicap — référente, processus d'accueil PSH */
  accessibiliteHandicap: '/accessibilite-handicap',
  /** Indicateur 2 Qualiopi — résultats des actions de formation */
  indicateursResultats: '/indicateurs-resultats',
  /** Réclamations et amélioration continue */
  reclamations: '/reclamations',
  /** Page certification Qualiopi (certificat PDF, vérification) */
  qualiopi: '/qualiopi',
  /** Certificat Qualiopi OFC (PDF) */
  certificatQualiopi: '/documents/certificat-qualiopi-ofc.pdf',
  /** Procédure réclamations OFC (PDF) — version 8 */
  procedureReclamationsPdf: '/documents/procedure-reclamations-ofc-v3.pdf',
  /** Livret d'accueil du stagiaire (page publique) */
  livretAccueilStagiaire: '/livret-accueil-stagiaire',
  /** Livret d'accueil du stagiaire (PDF) */
  livretAccueilStagiairePdf: '/documents/livret-accueil-stagiaire-ofc.pdf',
  /** Hub informations réglementaires Qualiopi (indicateur 1) */
  informationsReglementaires: '/informations-reglementaires',
} as const;

export type InternalLinkPath = (typeof LINKS)[keyof typeof LINKS];
