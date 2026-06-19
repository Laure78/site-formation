import { formatProfessionalsTrainedCount } from '@/lib/constants';

export const PHOTOS = {
  // Photo profil rond fond bleu (LinkedIn / Graz)
  profileBlue: {
    src: '/images/laure-olivie-circle.png',
    alt: 'Laure Olivié formatrice en intelligence artificielle pour les entreprises du bâtiment et des travaux publics',
    width: 364,
    height: 404,
  },

  /** Avatar site — même fichier que le portrait rond du header (fond clair, cohérence NAP / marque) */
  siteAvatar: {
    src: '/images/laure-portrait-header-2026.png',
    alt: "Laure Olivié, formatrice IA pour le BTP certifiée Qualiopi — OFC Création d'Entreprise",
    width: 682,
    height: 1024,
  },

  /** Logo officiel Qualiopi — processus certifié, République française, actions de formation */
  qualiopiLogoOfficiel: {
    src: '/images/logo-qualiopi-actions-de-formation.png',
    alt:
      'Logo Qualiopi — processus certifié par la République française pour les actions de formation',
    width: 842,
    height: 509,
  },

  // Photo legacy — bloc auteur précédent ; le composant `@/components/AuthorBio` utilise `siteAvatar`.
  linkedinGraz: {
    src: '/images/laure-olivie-linkedin-graz.png',
    alt: 'Laure Olivié, formatrice IA pour les pro du BTP — auteure articles intelligence artificielle bâtiment',
    width: 682,
    height: 1024,
  },
  
  // Photo avec panneau LinkedIn (portrait)
  linkedinPanel: {
    src: '/images/laure-linkedin-panel.png',
    alt: 'Laure Olivié instructrice LinkedIn Learning pour les formations IA appliquées au BTP',
    width: 770,
    height: 1024,
  },
  
  // Photo LinkedIn Learning portrait
  linkedinPortrait: {
    src: '/images/laure-linkedin-portrait.png',
    alt: 'Laure Olivié formatrice spécialisée en intelligence artificielle pour entreprises du bâtiment',
    width: 770,
    height: 1024,
  },
  
  // Photo studio fond clair (portrait)
  studioLight: {
    src: '/images/laure-studio-light.png',
    alt: 'Formation IA pour le BTP animée par Laure Olivié pour automatiser les tâches administratives du bâtiment',
    width: 912,
    height: 1024,
  },
  
  // Photo studio fond sombre
  studioDark: {
    src: '/images/laure-studio-dark.png',
    alt: 'Laure Olivié instructrice LinkedIn Learning pour formations ChatGPT et IA appliquées aux entreprises',
    width: 1024,
    height: 682,
  },
  
  // Photo formation en entreprise
  formationEntreprise: {
    src: '/images/formation-ia-btp-entreprise.png',
    alt: 'Atelier formation IA appliquée au bâtiment en entreprise — session pratique sur documents réels avec Laure Olivié',
    width: 1024,
    height: 571,
  },

  /** Page à propos — parcours terrain BTP (dirigeante / conduite de travaux) */
  parcoursChantierFondations: {
    src: '/images/laure-parcours-btp-chantier-fondations.png',
    alt:
      'Laure Olivié en inspection chantier BTP, gilet haute visibilité — contrôle maçonnerie et fondations, expérience conductrice de travaux TP',
    width: 682,
    height: 1024,
  },
  parcoursChantierPlans: {
    src: '/images/laure-parcours-btp-chantier-plans.png',
    alt:
      'Laure Olivié sur chantier avec plans techniques — coordination équipes BTP, conduite de travaux, bâtiment en construction',
    width: 1024,
    height: 682,
  },

  /** À propos — Les Rencontres des Artisans FFB (atelier IA bâtiment) */
  rencontresArtisansIaFfbBtp: {
    src: '/images/rencontres-artisans-ia-ffb-btp.jpg',
    alt:
      'Atelier FFB Les Rencontres des Artisans — intelligence artificielle au service des équipes du bâtiment, formation animée par Laure Olivié',
    width: 1024,
    height: 682,
  },

  /** Accueil — bloc étude de cas FFB & étanchéité */
  accueilEtudeCasFfbLaureIntervention: {
    src: '/images/accueil-etude-cas-ffb-laure-intervention.jpg',
    alt:
      "Laure Olivié formant des pros du bâtiment à l'IA — salle de formation ; étude de cas FFB, filière étanchéité et CSFE",
    width: 1024,
    height: 682,
  },

  // Bannière LinkedIn Learning - Recrutement
  bannerRecrutement: {
    src: '/images/linkedin-learning-recrutement-btp.png',
    alt: 'Formation IA RH pour PME du BTP avec Laure Olivié sur LinkedIn Learning',
    width: 1024,
    height: 747,
  },
  
  // Bannière LinkedIn Learning - Difficulté recrutement
  bannerRecrutementDifficile: {
    src: '/images/linkedin-learning-recrutement-difficile.png',
    alt: 'Formation IA pour les pro du BTP : recruter efficacement avec l\'intelligence artificielle par Laure Olivié',
    width: 1024,
    height: 682,
  },
  
  // Bannière LinkedIn Learning - Solutions concrètes
  bannerSolutionsConcretres: {
    src: '/images/linkedin-learning-solutions-concretes.png',
    alt: 'Formation intelligence artificielle pour le BTP avec cas pratiques et solutions concrètes pour chantiers',
    width: 1024,
    height: 682,
  },
  
  // Ouvrier avec plan
  ouvrierPlan: {
    src: '/images/ouvrier-plan-chantier.png',
    alt: 'Professionnel BTP consultant des plans de chantier — formation IA pour la gestion documentaire',
    width: 1024,
    height: 682,
  },
  
  // Architecte concentration (portrait)
  architecteConcentration: {
    src: '/images/architecte-concentration.png',
    alt: 'Architecte BTP analysant des plans techniques — usages IA pour l\'analyse DCE et CCTP',
    width: 764,
    height: 1024,
  },
  
  // Ouvrier chantier confiant (carré)
  ouvrierConfiant: {
    src: '/images/ouvrier-chantier-confiant.png',
    alt: 'Professionnel du bâtiment ou ouvrier qualifié — formation IA appliquée au bâtiment pour gagner du temps sur les tâches administratives',
    width: 1024,
    height: 1024,
  },

  /** Intervention — carte experte IA & BTP (studio) */
  interventionClaude: {
    src: '/images/laure-intervention-claude-experte-ia-btp.png',
    alt: 'Laure Olivié, formatrice experte en intelligence artificielle appliquée au BTP et aux travaux publics',
    width: 552,
    height: 614,
  },

  /** Page pilier /claude-ai-btp — affiche promotionnelle circulaire */
  claudeBtpGuideHero2026: {
    src: '/images/claude-ai-btp-hero-2026.png',
    alt:
      'Maîtriser Claude AI dans le BTP — gagner du temps, réduire les erreurs et booster vos projets de construction, Laure Olivié',
    width: 1024,
    height: 1024,
  },

  /** Portrait pro avec bandeau « Formatrice IA spécialisée BTP » */
  formatriceLowerThird: {
    src: '/images/laure-formatrice-ia-btp-lower-third.png',
    alt: 'Laure Olivié, formatrice IA spécialisée BTP, en intervention pédagogique',
    width: 1024,
    height: 790,
  },

  /** Cours LinkedIn Learning — extrait vidéo (recrutement PME & TPE) */
  coursRecrutementVideo1: {
    src: '/images/laure-cours-ia-artisans-tpe-video-1.png',
    alt: 'Extrait du cours LinkedIn Learning sur le recrutement (PME et TPE du BTP), animé par Laure Olivié',
    width: 1024,
    height: 670,
  },

  coursRecrutementVideo2: {
    src: '/images/laure-cours-ia-artisans-tpe-video-2.png',
    alt: 'Laure Olivié présente des cas d’usage IA pour le recrutement dans le BTP — cours en ligne LinkedIn Learning',
    width: 1024,
    height: 593,
  },

  /** Lecteur vidéo — cours recrutement BTP */
  linkedinPlayerRecrutement: {
    src: '/images/laure-linkedin-learning-recrutement-player.png',
    alt: 'Cours LinkedIn Learning IA et recrutement BTP — lecteur vidéo avec Laure Olivié formatrice',
    width: 1024,
    height: 714,
  },

  /** Interface cours — sommaire des leçons */
  linkedinSommaireCours: {
    src: '/images/laure-linkedin-learning-sommaire-cours.png',
    alt: 'Sommaire du cours LinkedIn Learning IA pour PME et TPE du BTP — leçons vidéo par Laure Olivié',
    width: 1024,
    height: 621,
  },

  /** Leçon « Fidéliser dès le premier jour » */
  linkedinLeconFideliser: {
    src: '/images/laure-linkedin-learning-lecon-fideliser.png',
    alt: 'Leçon « Fidéliser dès le premier jour » — formation IA RH BTP sur LinkedIn Learning',
    width: 1024,
    height: 718,
  },

  /** Portrait principal 2026 — accueil, contact, À propos (carte laureolivie.fr) */
  portraitPro2026: {
    src: '/images/laure-portrait-laureolivie-fr-2026.jpg',
    alt: "Laure Olivié, formatrice IA pour le BTP certifiée Qualiopi, OFC Création d'Entreprise",
    width: 682,
    height: 1024,
  },

  /** Visuels formations 2026 */
  formationIATP2026: {
    src: '/images/formation-ia-tp-2026.png',
    alt: "Session « L'IA au service des Travaux Publics » animée par Laure Olivié",
    width: 1024,
    height: 768,
  },
  formationIAArtisans2026: {
    src: '/images/formation-ia-artisans-batiment-laure-olivie-2026.png',
    alt: 'Laure Olivié animant une formation « L’IA au service du bâtiment » — présentation projetée, public BTP',
    width: 1024,
    height: 682,
  },
  formationIAAppelsOffres2026: {
    src: '/images/formation-ia-appels-offres-2026.png',
    alt: "Session « Répondre aux appels d'offres avec l'IA » animée par Laure Olivié",
    width: 1024,
    height: 768,
  },
  formationIASensibilisation2026: {
    src: '/images/formation-ia-sensibilisation-2026.png',
    alt: 'Illustration formation IA — sensibilisation et usages pratiques pour équipes du BTP',
    width: 866,
    height: 856,
  },
  formationIAClaude2026: {
    src: '/images/formation-ia-claude-2026.png',
    alt: 'Illustration formation — IA générative et Claude AI pour entreprises du bâtiment et des travaux publics',
    width: 1024,
    height: 768,
  },
  formationIARH2026: {
    src: '/images/formation-ia-rh-2026.png',
    alt: 'Illustration formation — enjeux RH, recrutement et organisation en entreprise du BTP',
    width: 1024,
    height: 768,
  },

  /** Photos terrain / pédagogie 2026 (sessions réelles BTP) */
  btpFormationSalleIntervention2026: {
    src: '/images/btp-formation-salle-intervention-2026.png',
    alt: 'Formation IA pour les pro du BTP en salle : intervenante devant un groupe de professionnels du bâtiment et des travaux publics',
    width: 1024,
    height: 682,
  },
  btpFormationBureauConseil2026: {
    src: '/images/btp-formation-bureau-conseil-2026.png',
    alt: 'Accompagnement et conseil en entreprise du bâtiment — échange professionnel autour de la formation IA',
    width: 1024,
    height: 682,
  },

  /** Fiche formation IA architecture / Claude — présentation en petit groupe, salle */
  formationIABtpArchiClaudePresentielGroupe2026: {
    src: '/images/formation-ia-architecture-claude-presentiel-groupe-2026.jpg',
    alt:
      'Formatrice en tenue professionnelle animant une session en salle moderne : grand écran avec schémas et plans techniques, participants du bâtiment au premier plan, lumière naturelle par les baies vitrées',
    width: 1024,
    height: 682,
  },
  btpFormationChantierPlans2026: {
    src: '/images/btp-formation-chantier-plans-2026.png',
    alt: "Formation IA en salle : Laure Olivié accompagne un participant au clavier ; écran « Travail de l'IA » (idées, synthèse de documents, automatisation) ; public BTP en arrière-plan",
    width: 1024,
    height: 682,
  },
  btpFormationChantierEquipe2026: {
    src: '/images/btp-formation-chantier-equipe-2026.png',
    alt: 'Entreprise du bâtiment : réunion de chantier avec professionnels et plans sur le terrain',
    width: 1024,
    height: 682,
  },
  btpFormationEcranIABTP2026: {
    src: '/images/btp-formation-ecran-ia-btp-2026.png',
    alt: 'Formation en salle — présentation « L\'IA dans le BTP » : optimisation des devis, gestion de chantier et organisation, Laure Olivié face aux professionnels du bâtiment',
    width: 1024,
    height: 682,
  },

  /**
   * Visuel formation IA — assistants et prompts métier BTP (écran type « assistants personnalisés »).
   */
  formationSensibilisationAssistantsIaBtp2026: {
    src: '/images/formation-sensibilisation-assistants-ia-btp-2026.png',
    alt:
      'Formation en salle — présentation « Création d\'Assistants IA BTP » : optimisation des devis, gestion de chantier et organisation, public du bâtiment',
    width: 1024,
    height: 682,
  },

  /** Catalogue formations — sessions réelles « Formation IA pour le BTP », salle et participants */
  formationIaBtpSalleInteractive2026: {
    src: '/images/formation-ia-btp-salle-interactive-2026.jpg',
    alt: 'Session de formation IA pour le BTP : formatrice devant un écran « Formation IA pour le BTP », participants avec ordinateurs portables',
    width: 1024,
    height: 682,
  },
  formationIaBtpSalleModerne2026: {
    src: '/images/formation-ia-btp-salle-moderne-2026.jpg',
    alt: 'Formation IA pour le BTP en salle lumineuse : intervenante et groupe de professionnels du bâtiment, travail sur ordinateurs',
    width: 1024,
    height: 682,
  },

  btpFormationVisioChantier2026: {
    src: '/images/btp-formation-visio-chantier-2026.png',
    alt: 'Formation IA appliquée au bâtiment en présentiel : échange entre bureau et terrain, cas concrets entreprise du bâtiment',
    width: 1024,
    height: 682,
  },

  /**
   * Carte catalogue « IA au service du bâtiment » (BTP-01) — présentation en salle, écran « L’IA au service du bâtiment ».
   */
  formationIABtpVisioBureau2026: {
    src: '/images/formation-btp-01-ia-artisans-batiment-2026.png',
    alt:
      'Formation catalogue BTP-01 — L\'IA au service du bâtiment, niveau débutant ; Laure Olivié en présentation, écran « L’IA au service du bâtiment », public du BTP',
    width: 1024,
    height: 682,
  },

  /** Page pilier /formation-ia-btp — visuel carte catalogue BTP-01 (réf., badge débutant, titre). */
  formationIaBtpPillarCarteCatalogue2026: {
    src: '/images/formation-ia-btp-carte-catalogue-btp-01-2026.png',
    alt:
      'Carte catalogue formation IA pour le BTP-01 débutant — L\'IA au service du bâtiment ; salle avec professionnels aux ordinateurs et formatrice',
    width: 776,
    height: 602,
  },

  /** Open Graph / partages — page pilier formation IA pour les pro du BTP (portrait formatrice). */
  formationIaBtpOgPortrait2026: {
    src: '/images/formation-ia-btp-laure-olivie.jpg',
    alt: 'Laure Olivié, formatrice IA pour le BTP Qualiopi, portrait professionnel formation ChatGPT bâtiment',
    width: 682,
    height: 1024,
  },

  /** Landing formation IA appels d’offres BTP — présentiel, écran « L’IA dans le BTP », public BTP (casque, gilet). */
  formationIaAppelsOffresBtpHero2026: {
    src: '/images/formation-ia-appels-offres-btp-hero-2026.jpg',
    alt: 'Laure Olivié anime une formation IA appliquée au bâtiment en salle : écran « L’IA dans le BTP », optimisation des devis, gestion de chantier et organisation — professionnels du bâtiment au premier plan',
    width: 1024,
    height: 682,
  },

  /** Page /ressources — visuel promotionnel tutos PDF et guides IA BTP gratuits */
  ressourcesIaBtpHero2026: {
    src: '/images/ressources-ia-btp-hero-2026.png',
    alt: 'Ressources IA BTP — guides, outils et tutos PDF gratuits, Laure Olivié formatrice Qualiopi OFC',
    width: 1024,
    height: 1024,
  },

  /** Tuto skill Mémoire Technique BTP — visuel promotionnel page /ressources/tuto-memoire-technique */
  tutoMemoireTechniqueHero2026: {
    src: '/images/tuto-memoire-technique-hero-2026.png',
    alt: 'Tuto skill Mémoire Technique BTP — assistant Claude pour mémoires techniques, Laure Olivié formatrice IA',
    width: 1024,
    height: 1024,
  },

  tutoDuerpHero2026: {
    src: '/images/tuto-duerp-hero-2026.png',
    alt: 'Tuto skill DUERP BTP — Document Unique en 30 min, Laure Olivié formatrice IA Qualiopi',
    width: 1024,
    height: 1024,
  },

  tutoPpspsHero2026: {
    src: '/images/tuto-ppsps-hero-2026.png',
    alt: 'Tuto skill PPSPS BTP — plan de prévention en 30 min, Laure Olivié formatrice IA',
    width: 1024,
    height: 1024,
  },

  tutoPvLeveeReservesHero2026: {
    src: '/images/tuto-pv-levee-reserves-hero-2026.png',
    alt: 'Tuto skill PV de levée de réserves BTP — rédaction juridique en 3 min, Laure Olivié',
    width: 1024,
    height: 1024,
  },

  tutoConstatRetardHero2026: {
    src: '/images/tuto-constat-retard-hero-2026.png',
    alt: 'Tuto skill Constat de retard BTP — courrier de réserves en 8 min, Laure Olivié',
    width: 1024,
    height: 1024,
  },

  tutoDispatchBtpHero2026: {
    src: '/images/tuto-dispatch-btp-hero-2026.png',
    alt: 'Tuto Dispatch BTP — piloter son PC depuis le chantier, Laure Olivié formatrice IA',
    width: 1024,
    height: 1024,
  },

  tutoAnalyseDceHero2026: {
    src: '/images/tuto-analyse-dce-hero-2026.png',
    alt: 'Tuto skill Analyse de DCE BTP — 220 pages en 3 min avec Claude, Laure Olivié formatrice IA',
    width: 1024,
    height: 1024,
  },

  tutoTriDceClaudeChromeHero2026: {
    src: '/images/tuto-tri-dce-claude-chrome-hero-2026.png',
    alt: 'Tuto Trie tes DCE avec Claude in Chrome — veille BOAMP automatique, Laure Olivié',
    width: 1024,
    height: 1024,
  },

  tutoCrChantierHero2026: {
    src: '/images/tuto-cr-chantier-hero-2026.png',
    alt: 'Tuto skill Compte rendu de chantier BTP — dictée vocale vers CR Word, Laure Olivié',
    width: 1024,
    height: 1024,
  },

  tutoDoeHero2026: {
    src: '/images/tuto-doe-hero-2026.png',
    alt: 'Tuto skill DOE BTP — dossier des ouvrages exécutés en 30 min, Laure Olivié formatrice IA',
    width: 1024,
    height: 1024,
  },

  /** Guide PDF conducteur de travaux — 6 tutos Claude (lead magnet /ressources) */
  guideConducteurTravauxHero2026: {
    src: '/images/guide-conducteur-travaux-hero-2026.png',
    alt: 'Guide du conducteur de travaux BTP — 6 skills Claude pour piloter le chantier, PDF gratuit Laure Olivié',
    width: 1024,
    height: 1024,
  },

  /** Page d'accueil — présentation en salle, écran « L'IA au service du bâtiment » */
  heroAccueilFormationIABtpEchange2026: {
    src: '/images/hero-accueil-formation-ia-btp-echange-2026.png',
    alt: 'Laure Olivié, formatrice IA appliquée au bâtiment, présentation « L’IA au service du bâtiment » — session en salle avec professionnels du BTP',
    width: 1024,
    height: 682,
  },

  /** Accueil — bloc « Référence & partenaires » (visuel formatrice OFC) */
  accueilReferencePartenairesLaureOFC2026: {
    src: '/images/accueil-reference-partenaires-laure-ofc-2026.png',
    alt:
      'Laure Olivié, formatrice IA pour le BTP OFC — échange avec un dirigeant d\'entreprise ; formation entreprise Qualiopi, réseau FFB',
    width: 1024,
    height: 682,
  },

  /**
   * Illustrations blog — shootings cohérents (chantier, salle, convention).
   * Référencées par lib/blog-article-illustrations.ts selon la catégorie SEO.
   */
  blogBtpChantierPlansEchange2026: {
    src: '/images/blog-btp-chantier-plans-echange-2026.png',
    alt:
      'Laure Olivié sur un chantier BTP, plans à la main, en discussion avec des professionnels du bâtiment — contexte terrain et conduite de travaux',
    width: 1024,
    height: 682,
  },
  blogBtpChantierEncadrement2026: {
    src: '/images/blog-btp-chantier-encadrement-2026.png',
    alt:
      'Échange sur chantier entre la formatrice et des ouvriers du bâtiment — coordination terrain et sécurité',
    width: 1024,
    height: 762,
  },
  blogFormationIaDansLeBtpSalle2026: {
    src: '/images/blog-formation-ia-dans-btp-salle-2026.png',
    alt:
      'Formation IA en salle : présentation « L\'IA dans le BTP » à un public de professionnels du bâtiment',
    width: 1024,
    height: 682,
  },
  blogFormationIaBtpHandshakeFlipchart2026: {
    src: '/images/blog-formation-ia-btp-handshake-convention-2026.png',
    alt:
      'Poignée de main en bureau — flipchart « Formation IA pour le BTP » avec les thèmes Devis, Chantier et Organisation',
    width: 1024,
    height: 682,
  },
  blogIaAuServiceArtisansBatiment2026: {
    src: '/images/blog-ia-au-service-artisans-batiment-2026.png',
    alt:
      'Formation « L\'IA au service du bâtiment » — intervenante face à un public BTP en gilet de chantier',
    width: 1024,
    height: 682,
  },

  /** BeWork — relais administratif marchés travaux (support casque, site bework.fr) */
  beworkHeroRelaisAdministratif: {
    src: '/images/bework-hero-relais-administratif-support.png',
    alt:
      'BeWork — assistante travaux au casque devant un ordinateur, relais administratif BTP supervisé depuis la France',
    width: 1024,
    height: 629,
  },

  /** BeWork — bureau-chantier : plans, casque et poste de travail (site bework.fr) */
  beworkHeroBureauChantier: {
    src: '/images/bework-hero-bureau-chantier-plans.png',
    alt:
      'BeWork — assistante travaux au bureau avec plans de chantier et casque BTP, relais documents marchés travaux',
    width: 1024,
    height: 576,
  },

  /** BeWork — visuel produit : relais admin marchés travaux, DOE, situations, tableau de bord */
  beworkRelaisMarchesTravaux: {
    src: '/images/bework-relais-marches-travaux-bureau-chantier.png',
    alt:
      'BeWork — relais administratif marchés travaux BTP, dossiers intervention, comptes rendus, DOE et situations',
    width: 1024,
    height: 1024,
  },

  /** Cartes catalogue niveau 1 et niveau 2 — affiches promotionnelles par formation (juin 2026). */
  formationNiv01IaBatimentTravauxPublics2026: {
    src: '/images/formation-niv-01-ia-batiment-travaux-publics-2026.png',
    alt:
      "Affiche formation niveau 1 — L'IA au service des pros du bâtiment et des travaux publics, Laure Olivié OFC Qualiopi",
    description:
      "Affiche promotionnelle niveau 1 « L'IA au service des pros du bâtiment et des travaux publics » : débutant, 4 h, devis et administratif BTP. Laure Olivié, OFC Création d'Entreprise.",
    title: "Niveau 1 · L'IA au service des pros du bâtiment et des travaux publics",
    width: 1024,
    height: 1024,
  },
  formationNiv02IaAppelsOffreBtp2026: {
    src: '/images/formation-niv-02-ia-appels-offre-btp-2026.png',
    alt:
      "Affiche formation niveau 2 appels d'offres — L'IA appliquée aux appels d'offres BTP, DCE et mémoire technique, Laure Olivié Qualiopi",
    description:
      "Affiche « L'IA appliquée aux appels d'offres BTP » : analyse DCE, mémoire technique, Claude AI Pro et Cowork — 4 h, niveau avancé. Laure Olivié Qualiopi.",
    title: "Niveau 2 · L'IA appliquée aux appels d'offres BTP",
    width: 1024,
    height: 1024,
  },
  formationNiv03IaConduiteTravaux2026: {
    src: '/images/formation-niv-03-ia-conduite-travaux-2026.png',
    alt:
      "Affiche formation niveau 2 conduite de travaux — L'IA appliquée à la conduite de travaux, skills Claude, Laure Olivié",
    description:
      "Affiche « L'IA appliquée à la conduite de travaux » : CCTP, CR, PPSPS, DOE et skills Claude BTP — 4 h, 8 participants max. Laure Olivié Qualiopi.",
    title: "Niveau 2 · L'IA appliquée à la conduite de travaux",
    width: 1024,
    height: 1024,
  },
  formationNiv04MaitriserClaudeAiBtp2026: {
    src: '/images/formation-niv-04-maitriser-claude-ai-btp-2026.png',
    alt:
      'Affiche formation niveau 2 Maîtriser Claude AI pour le BTP, Projets Skills Cowork, Laure Olivié Qualiopi',
    description:
      'Affiche « Maîtriser Claude AI pour le BTP » : Projets, Skills, Cowork, connecteurs et Claude Code — 4 h, niveau avancé. Laure Olivié, OFC Qualiopi.',
    title: 'Niveau 2 · Maîtriser Claude AI pour le BTP',
    width: 1024,
    height: 1024,
  },

};

export type PhotoKey = keyof typeof PHOTOS;

/** Galerie cohérente (parcours visuel formation en ligne + formatrice) */
export const GALERIE_LINKEDIN_FORMATION: PhotoKey[] = [
  'interventionClaude',
  'formatriceLowerThird',
  'coursRecrutementVideo1',
  'linkedinPlayerRecrutement',
  'linkedinSommaireCours',
  'linkedinLeconFideliser',
  'coursRecrutementVideo2',
];
