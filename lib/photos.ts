import { formatProfessionalsTrainedCount } from '@/lib/constants';

/** Logo header (portrait circulaire bleu) — source unique, format WebP uniquement. */
export const SITE_HEADER_LOGO_SRC = '/images/laure-avatar-bleu-2026.webp' as const;

/** Alt unique du logo header — identique sur tout le site. */
export const SITE_LOGO_ALT =
  'Laure Olivié — formation IA pour le BTP, organisme certifié Qualiopi';

export const SITE_LOGO_TITLE = "Retour à l'accueil — laureolivie.fr" as const;

export const PHOTOS = {
  // Photo profil rond fond bleu (LinkedIn / Graz)
  profileBlue: {
    src: '/images/laure-olivie-portrait-rond-fond-bleu-formation-ia-btp.webp',
    alt: "Laure Olivié, portrait rond sur fond bleu — formatrice en intelligence artificielle pour le BTP",
    width: 364,
    height: 404,
  },

  /** Avatar site — portrait circulaire IA & BTP (header + auteur articles) */
  siteAvatar: {
    src: SITE_HEADER_LOGO_SRC,
    alt: SITE_LOGO_ALT,
    width: 1024,
    height: 1024,
  },

  /** Logo Qualiopi Certifopac — bloc officiel AFC (mention + République française intégrées) */
  qualiopiLogoOfficiel: {
    src: '/images/logo-qualiopi-certifopac-actions-formation.png',
    alt: 'Logo Qualiopi processus certifié — Certifopac, actions de formation',
    width: 1536,
    height: 802,
  },

  // Photo legacy — bloc auteur précédent ; le composant `@/components/AuthorBio` utilise `siteAvatar`.
  linkedinGraz: {
    src: '/images/laure-olivie-linkedin-graz.png',
    alt: "Laure Olivié, portrait professionnel — autrice d'articles sur l'IA appliquée au bâtiment",
    width: 682,
    height: 1024,
  },
  
  // Photo avec panneau LinkedIn (portrait)
  linkedinPanel: {
    src: '/images/laure-linkedin-panel.png',
    alt: "Laure Olivié devant un panneau LinkedIn Learning — instructrice formations IA pour le BTP",
    width: 770,
    height: 1024,
  },
  
  // Photo LinkedIn Learning portrait
  linkedinPortrait: {
    src: '/images/laure-linkedin-portrait.png',
    alt: "Portrait Laure Olivié, formatrice en intelligence artificielle pour entreprises du bâtiment",
    width: 770,
    height: 1024,
  },
  
  // Photo studio fond clair (portrait)
  studioLight: {
    src: '/images/laure-studio-light.png',
    alt: "Laure Olivié en studio fond clair — session sur l'automatisation administrative en BTP",
    width: 912,
    height: 1024,
  },
  
  // Photo studio fond sombre
  studioDark: {
    src: '/images/laure-studio-dark.png',
    alt: "Laure Olivié en studio fond sombre — instructrice LinkedIn Learning IA et ChatGPT",
    width: 1024,
    height: 682,
  },
  
  // Photo formation en entreprise
  formationEntreprise: {
    src: '/images/formation-ia-intra-entreprise-batiment.webp',
    alt: 'Atelier en entreprise du bâtiment — participants autour de table avec plans, casque et support Laure Olivié',
    width: 1024,
    height: 571,
  },

  /** Page à propos — parcours terrain BTP (dirigeante / conduite de travaux) */
  parcoursChantierFondations: {
    src: '/images/laure-parcours-btp-chantier-fondations.png',
    alt: "Laure Olivié en gilet sur chantier, contrôle maçonnerie et fondations",
    width: 682,
    height: 1024,
  },
  parcoursChantierPlans: {
    src: '/images/laure-parcours-btp-chantier-plans.png',
    alt: "Laure Olivié sur chantier avec plans techniques, coordination d'équipes BTP",
    width: 1024,
    height: 682,
  },

  /** À propos — Les Rencontres des Artisans FFB (atelier IA bâtiment) */
  rencontresArtisansIaFfbBtp: {
    src: '/images/rencontres-artisans-ia-ffb-btp.jpg',
    alt: "Atelier FFB en salle : participants aux ordinateurs, formatrice auprès d'un stagiaire",
    width: 1024,
    height: 682,
  },

  /** Accueil — bloc étude de cas FFB & étanchéité */
  accueilEtudeCasFfbLaureIntervention: {
    src: '/images/formation-ia-btp-ffb-salle.webp',
    alt: "Laure Olivié forme des pros du bâtiment à l'IA, écran de projection en salle",
    title: 'Étude de cas FFB et filière étanchéité — retour d\'expérience formation IA BTP',
    width: 1024,
    height: 682,
  },

  // Bannière LinkedIn Learning - Recrutement
  bannerRecrutement: {
    src: '/images/linkedin-learning-recrutement-btp.png',
    alt: "Bannière LinkedIn Learning — IA et recrutement pour PME du BTP avec Laure Olivié",
    width: 1024,
    height: 747,
  },
  
  // Bannière LinkedIn Learning - Difficulté recrutement
  bannerRecrutementDifficile: {
    src: '/images/linkedin-learning-recrutement-difficile.png',
    alt: "Bannière LinkedIn Learning — recrutement difficile et IA pour entreprises du bâtiment",
    width: 1024,
    height: 682,
  },
  
  // Bannière LinkedIn Learning - Solutions concrètes
  bannerSolutionsConcretres: {
    src: '/images/linkedin-learning-solutions-concretes.png',
    alt: "Bannière LinkedIn Learning — solutions concrètes IA pour cas pratiques chantier BTP",
    width: 1024,
    height: 682,
  },
  
  // Ouvrier avec plan
  ouvrierPlan: {
    src: '/images/formation-ia-conducteur-travaux-plans.webp',
    alt: "Professionnel BTP consulte des plans de chantier sur table — gestion documentaire chantier",
    width: 1024,
    height: 682,
  },
  
  // Architecte concentration (portrait)
  architecteConcentration: {
    src: '/images/formation-ia-analyse-plans-btp.webp',
    alt: "Professionnel du bâtiment concentré sur des plans techniques — analyse DCE et chiffrage assistés par IA",
    width: 764,
    height: 1024,
  },
  
  // Ouvrier chantier confiant (carré)
  ouvrierConfiant: {
    src: '/images/ouvrier-chantier-confiant.png',
    alt: "Ouvrier qualifié sur chantier — illustration productivité administrative bâtiment",
    width: 1024,
    height: 1024,
  },

  /** Intervention — carte experte IA & BTP (studio) */
  interventionClaude: {
    src: '/images/laure-intervention-claude-experte-ia-btp.png',
    alt: "Laure Olivié, formatrice experte IA appliquée au BTP et travaux publics, portrait studio",
    width: 552,
    height: 614,
  },

  /** Page pilier /claude-ai-btp — affiche promotionnelle circulaire */
  claudeBtpGuideHero2026: {
    src: '/images/claude-ai-btp-hero-2026.png',
    alt: "Affiche circulaire « Maîtriser Claude AI dans le BTP » — présentation par Laure Olivié",
    width: 1024,
    height: 1024,
  },

  /** Portrait pro avec bandeau « Formatrice IA spécialisée BTP » */
  formatriceLowerThird: {
    src: '/images/laure-formatrice-ia-btp-lower-third.png',
    alt: "Laure Olivié en intervention pédagogique, bandeau « formatrice IA spécialisée BTP »",
    width: 1024,
    height: 790,
  },

  /** Cours LinkedIn Learning — extrait vidéo (recrutement PME & TPE) */
  coursRecrutementVideo1: {
    src: '/images/laure-cours-ia-artisans-tpe-video-1.png',
    alt: "Extrait LinkedIn Learning recrutement PME et TPE du BTP, animé par Laure Olivié",
    width: 1024,
    height: 670,
  },

  coursRecrutementVideo2: {
    src: '/images/laure-cours-ia-artisans-tpe-video-2.png',
    alt: "Laure Olivié présente des cas d'usage IA pour le recrutement BTP sur LinkedIn Learning",
    width: 1024,
    height: 593,
  },

  /** Lecteur vidéo — cours recrutement BTP */
  linkedinPlayerRecrutement: {
    src: '/images/laure-linkedin-learning-recrutement-player.png',
    alt: "Lecteur vidéo LinkedIn Learning — cours IA et recrutement BTP avec Laure Olivié",
    width: 1024,
    height: 714,
  },

  /** Interface cours — sommaire des leçons */
  linkedinSommaireCours: {
    src: '/images/laure-linkedin-learning-sommaire-cours.png',
    alt: "Sommaire LinkedIn Learning — leçons IA pour PME et TPE du BTP par Laure Olivié",
    width: 1024,
    height: 621,
  },

  /** Leçon « Fidéliser dès le premier jour » */
  linkedinLeconFideliser: {
    src: '/images/laure-linkedin-learning-lecon-fideliser.png',
    alt: "Leçon LinkedIn Learning « Fidéliser dès le premier jour » — IA et RH BTP",
    width: 1024,
    height: 718,
  },

  /** Portrait principal 2026 — contact, ProfilePhoto, blog (carte laureolivie.fr) */
  portraitPro2026: {
    src: '/images/laure-olivie-portrait-bleu-circulaire-2026.webp',
    alt: "Portrait circulaire Laure Olivié sur fond bleu, avec icônes grue et bâtiment",
    title: 'Laure Olivié — formatrice IA spécialisée BTP, Qualiopi, Île-de-France',
    width: 1024,
    height: 1024,
  },

  /** Hero page À propos — portrait circulaire IA & BTP (crane, ampoule, bâtiment) */
  aProposHero2026: {
    src: '/images/laure-olivie-a-propos-hero-2026.jpg',
    alt: "Portrait circulaire Laure Olivié sur fond bleu, avec icônes grue et bâtiment",
    title: 'Laure Olivié — formatrice IA spécialisée BTP, Qualiopi, Île-de-France',
    description:
      "Portrait Laure Olivié sur fond bleu OFC : formatrice intelligence artificielle et ChatGPT pour TPE, PME et professionnels du BTP — symboles chantier et innovation.",
    width: 1024,
    height: 1024,
  },

  /** Visuels formations 2026 */
  formationIATP2026: {
    src: '/images/formation-ia-tp-2026.png',
    alt: "Session « L'IA au service des Travaux Publics » animée par Laure Olivié en salle",
    width: 1024,
    height: 768,
  },
  formationIAArtisans2026: {
    src: '/images/formation-ia-artisans-batiment-laure-olivie-2026.png',
    alt: "Laure Olivié animant « L'IA au service du bâtiment » — écran projeté, public BTP",
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
    alt: "Affiche sensibilisation IA — usages pratiques pour équipes du BTP",
    width: 866,
    height: 856,
  },
  formationIAClaude2026: {
    src: '/images/formation-ia-claude-2026.png',
    alt: "Affiche formation — IA générative et Claude AI pour entreprises du bâtiment",
    width: 1024,
    height: 768,
  },
  formationIARH2026: {
    src: '/images/formation-ia-rh-2026.png',
    alt: "Affiche formation — enjeux RH, recrutement et organisation en entreprise du BTP",
    width: 1024,
    height: 768,
  },

  /** Photos terrain / pédagogie 2026 (sessions réelles BTP) */
  btpFormationSalleIntervention2026: {
    src: '/images/btp-formation-salle-intervention-2026.png',
    alt: "Intervenante devant un groupe de professionnels du bâtiment en salle de formation",
    width: 1024,
    height: 682,
  },
  btpFormationBureauConseil2026: {
    src: '/images/btp-formation-bureau-conseil-2026.png',
    alt: "Échange professionnel en entreprise du bâtiment autour d'un conseil IA",
    width: 1024,
    height: 682,
  },

  /** Fiche formation IA architecture / Claude — présentation en petit groupe, salle */
  formationIABtpArchiClaudePresentielGroupe2026: {
    src: '/images/formation-ia-architecture-claude-presentiel-groupe-2026.jpg',
    alt: "Formatrice animant une session en salle : écran avec schémas et plans techniques",
    width: 1024,
    height: 682,
  },
  btpFormationChantierPlans2026: {
    src: '/images/btp-formation-chantier-plans-2026.png',
    alt: "Laure Olivié accompagne un participant au clavier, écran « Travail de l'IA »",
    width: 1024,
    height: 682,
  },
  btpFormationChantierEquipe2026: {
    src: '/images/btp-formation-chantier-equipe-2026.png',
    alt: "Réunion de chantier avec professionnels et plans sur le terrain",
    width: 1024,
    height: 682,
  },
  btpFormationEcranIABTP2026: {
    src: '/images/btp-formation-ecran-ia-btp-2026.png',
    alt: "Présentation « L'IA dans le BTP » en salle : devis, chantier et organisation",
    width: 1024,
    height: 682,
  },

  /**
   * Visuel formation IA — assistants et prompts métier BTP (écran type « assistants personnalisés »).
   */
  formationSensibilisationAssistantsIaBtp2026: {
    src: '/images/formation-sensibilisation-assistants-ia-btp-2026.png',
    alt: "Présentation « Création d'Assistants IA BTP » en salle devant un groupe",
    width: 1024,
    height: 682,
  },

  /** Catalogue formations — sessions réelles « Formation IA pour le BTP », salle et participants */
  formationIaBtpSalleInteractive2026: {
    src: '/images/formation-ia-btp-salle-interactive-2026.jpg',
    alt: "Laure Olivié devant l'écran « Formation IA pour le BTP », participants aux ordinateurs",
    width: 1024,
    height: 682,
  },
  formationIaBtpSalleModerne2026: {
    src: '/images/formation-ia-btp-salle-moderne-2026.jpg',
    alt: 'Session en salle lumineuse : intervenante et groupe de professionnels du bâtiment',
    width: 1024,
    height: 682,
  },

  btpFormationVisioChantier2026: {
    src: '/images/btp-formation-visio-chantier-2026.png',
    alt: 'Échange entre bureau et terrain sur des cas concrets d\'entreprise du bâtiment',
    width: 1024,
    height: 682,
  },

  /**
   * Carte catalogue « IA au service du bâtiment » (BTP-01) — présentation en salle, écran « L'IA au service du bâtiment ».
   */
  formationIABtpVisioBureau2026: {
    src: '/images/formation-btp-01-ia-artisans-batiment-2026.png',
    alt: "Carte catalogue BTP-01 — IA au service du bâtiment, Laure Olivié en présentation",
    width: 1024,
    height: 682,
  },

  /** Page pilier /formation-ia-btp — visuel carte catalogue BTP-01 (réf., badge débutant, titre). */
  formationIaBtpPillarCarteCatalogue2026: {
    src: '/images/formation-ia-btp-carte-catalogue-btp-01-2026.png',
    alt: "Carte catalogue BTP-01 débutant — salle avec professionnels aux ordinateurs",
    width: 776,
    height: 602,
  },

  /** Open Graph / partages — page pilier formation IA pour les pros du BTP (portrait formatrice). */
  formationIaBtpOgPortrait2026: {
    src: '/images/formation-ia-btp-laure-olivie.jpg',
    alt: "Portrait professionnel Laure Olivié, formatrice IA pour le BTP certifiée Qualiopi",
    width: 682,
    height: 1024,
  },

  /** Landing formation IA appels d'offres BTP — présentiel, écran « L'IA dans le BTP », public BTP (casque, gilet). */
  formationIaAppelsOffresBtpHero2026: {
    src: '/images/formation-ia-appels-offres-btp-hero-2026.jpg',
    alt: "Laure Olivié anime une session en salle : écran IA dans le BTP, public en gilet",
    width: 1024,
    height: 682,
  },

  /** Page /ressources — affiche hero tutos PDF, guides et fiches pratiques IA BTP gratuits */
  ressourcesIaBtpHero2026: {
    src: '/images/ressources-gratuites-ia-btp-hero-2026.png',
    alt: 'Ressources IA BTP : appels d’offres, DCE et tutos pour PME bâtiment en Île-de-France',
    title: 'Ressources IA BTP — appels d’offres, marchés et tutos gratuits, Laure Olivié',
    width: 1024,
    height: 1024,
  },

  /** Tuto skill Mémoire Technique BTP — visuel promotionnel page /ressources/tuto-memoire-technique */
  tutoMemoireTechniqueHero2026: {
    src: '/images/tuto-memoire-technique-hero-2026.png',
    alt: 'Tuto : créer un skill Claude qui rédige les mémoires techniques BTP',
    width: 1024,
    height: 1024,
  },

  tutoDuerpHero2026: {
    src: '/images/tuto-duerp-hero-2026.png',
    alt: 'Tuto : créer un skill Claude « DUERP » pour le BTP',
    width: 1024,
    height: 1024,
  },

  tutoPpspsHero2026: {
    src: '/images/tuto-ppsps-hero-2026.png',
    alt: 'Tuto : créer un skill Claude « PPSPS » pour le BTP',
    width: 1024,
    height: 1024,
  },

  tutoPvLeveeReservesHero2026: {
    src: '/images/tuto-pv-levee-reserves-hero-2026.png',
    alt: 'Tuto : créer un skill Claude « PV de levée de réserves » pour le BTP',
    width: 1024,
    height: 1024,
  },

  tutoConstatRetardHero2026: {
    src: '/images/tuto-constat-retard-hero-2026.png',
    alt: 'Tuto : créer un skill Claude « constat de retard » pour le BTP',
    width: 1024,
    height: 1024,
  },

  tutoDispatchBtpHero2026: {
    src: '/images/tuto-dispatch-btp-hero-2026.png',
    alt: 'Tuto : piloter son PC depuis le chantier avec Claude (Dispatch BTP)',
    width: 1024,
    height: 1024,
  },

  tutoAnalyseDceHero2026: {
    src: '/images/tuto-analyse-dce-hero-2026.png',
    alt: 'Tuto : créer un skill Claude qui analyse un DCE de 220 pages en 3 minutes',
    width: 1024,
    height: 1024,
  },

  tutoTriDceClaudeChromeHero2026: {
    src: '/images/tuto-tri-dce-claude-chrome-hero-2026.png',
    alt: 'Tuto : trier ses DCE avec Claude in Chrome et veille BOAMP automatique',
    width: 1024,
    height: 1024,
  },

  tutoCrChantierHero2026: {
    src: '/images/tuto-cr-chantier-hero-2026.png',
    alt: 'Tuto : créer un skill Claude « compte rendu de chantier » pour le BTP',
    width: 1024,
    height: 1024,
  },

  tutoDoeHero2026: {
    src: '/images/tuto-doe-hero-2026.png',
    alt: 'Tuto : créer un skill Claude « DOE » (dossier des ouvrages exécutés) pour le BTP',
    width: 1024,
    height: 1024,
  },

  /** Guide PDF conducteur de travaux — 6 tutos Claude (lead magnet /ressources) */
  guideConducteurTravauxHero2026: {
    src: '/images/guide-conducteur-travaux-hero-2026.png',
    alt: "Guide conducteur de travaux BTP — 6 skills Claude pour piloter le chantier, PDF gratuit",
    width: 1024,
    height: 1024,
  },

  /** Page catalogue /formations — hero bannière (Laure Olivié, affiche formation IA BTP) */
  formationsCatalogueHero2026: {
    src: '/images/formation-ia-btp-catalogue-hero-laure-olivie-2026.webp',
    alt: 'Affiche catalogue Formation IA pour le BTP : portrait Laure Olivié, 4 h présentiel',
    title: 'Catalogue formations IA pour le BTP — Laure Olivié, OFC Création d\'Entreprise Qualiopi',
    width: 1024,
    height: 1024,
  },

  /** Page financement Constructys — bannière hero plafonds OPCO 2026 */
  financementConstructysHero2026: {
    src: '/images/financement-constructys-formation-ia-btp-hero-2026.webp',
    alt: "Affiche Constructys finance votre formation IA BTP — plafonds 2026 et portrait Laure",
    title: 'Financement Constructys 2026 — formation IA pour le BTP, plafonds et OFC Qualiopi',
    width: 1024,
    height: 1024,
  },

  /** Page d'accueil — hero header (portrait Laure, dashboard IA BTP, manuel formation) */
  heroAccueilFormationIABtpEchange2026: {
    src: '/images/formation-ia-btp-laure-olivie-ile-de-france.webp',
    alt: 'Affiche formation IA pour le BTP : portrait Laure Olivié, devis et appels d\'offres',
    title: 'Formation IA pour le BTP — présentiel Île-de-France, financement OPCO selon éligibilité',
    width: 1024,
    height: 1024,
  },

  /** Accueil — session formation présentiel « Mes formations IA pour le BTP » */
  accueilFormationIaBtpSallePresentiel2026: {
    src: '/images/formation-ia-btp-salle-laure-olivie.webp',
    alt: "Laure Olivié présente en salle devant un public BTP, écran et casque sur la table",
    title: 'Programme Mes formations IA pour le BTP — Comprendre, appliquer, performer en présentiel',
    width: 1024,
    height: 1024,
  },

  /** Accueil — cas d'usage IA appliquée au chantier (planification, rapports, documents) */
  accueilIaAppliqueeChantierBtp2026: {
    src: '/images/formation-ia-chantier-conducteur-travaux.webp',
    alt: "Professionnel casqué consulte une tablette sur un chantier avec grue",
    width: 1024,
    height: 1024,
  },

  /** Accueil — cas d'usage devis et chiffrage IA (notes terrain vers devis structuré) */
  accueilIaDevisChiffrageBtp2026: {
    src: '/images/formation-ia-devis-chiffrage-btp.webp',
    alt: 'Notes de terrain, photos et plans transformés en devis bâtiment structuré',
    width: 1024,
    height: 1024,
  },

  /** Accueil — cas d'usage analyse DCE et appels d'offres (synthèse Go/No Go) */
  accueilAnalyseDceAppelsOffresBtp2026: {
    src: '/images/formation-ia-analyse-dce-btp.webp',
    alt: "Classeur DCE et plans menant à une synthèse Go/No Go d'appel d'offres",
    width: 1024,
    height: 1024,
  },

  /** Accueil — cas d'usage compte rendu chantier, DOE et PV (notes vocales vers document) */
  accueilCompteRenduDoePvChantier2026: {
    src: '/images/formation-ia-compte-rendu-chantier.webp',
    alt: "Note vocale sur téléphone transformée en compte rendu de chantier structuré",
    width: 1024,
    height: 1024,
  },

  /** Accueil — bloc « Référence & partenaires » (visuel formatrice OFC) */
  accueilReferencePartenairesLaureOFC2026: {
    src: '/images/formation-ia-dirigeant-pme-btp.webp',
    alt: "Laure Olivié échange autour d'un café avec un professionnel en gilet BTP",
    title: 'Formation entreprise sur mesure — réseau FFB, financement OPCO selon éligibilité',
    width: 1024,
    height: 682,
  },

  /**
   * Illustrations blog — shootings cohérents (chantier, salle, convention).
   * Référencées par lib/blog-article-illustrations.ts selon la catégorie SEO.
   */
  blogBtpChantierPlansEchange2026: {
    src: '/images/blog-btp-chantier-plans-echange-2026.png',
    alt: "Laure Olivié sur chantier, plans à la main, en discussion avec des professionnels",
    width: 1024,
    height: 682,
  },
  blogBtpChantierEncadrement2026: {
    src: '/images/blog-btp-chantier-encadrement-2026.png',
    alt: "Échange sur chantier entre la formatrice et des ouvriers du bâtiment",
    width: 1024,
    height: 762,
  },
  blogFormationIaDansLeBtpSalle2026: {
    src: '/images/blog-formation-ia-dans-btp-salle-2026.png',
    alt: "Présentation « L'IA dans le BTP » à un public de professionnels du bâtiment en salle",
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
    alt: "Intervenante face à un public BTP en gilet de chantier — « L'IA au service du bâtiment »",
    width: 1024,
    height: 682,
  },

  /** BeWork — relais administratif marchés travaux (support casque, site bework.fr) */
  beworkHeroRelaisAdministratif: {
    src: '/images/bework-relais-administratif-chantier-support.webp',
    alt: "Assistante BeWork au casque — relais administratif chantier BTP, poste avec plans et écran",
    title: 'BeWork — relais administratif chantier (CR, DCE, DOE), service complémentaire aux formations OFC',
    width: 1024,
    height: 629,
  },

  /** BeWork — bureau-chantier : plans, casque et poste de travail (site bework.fr) */
  beworkHeroBureauChantier: {
    src: '/images/bework-hero-bureau-chantier-plans.png',
    alt: "Assistante BeWork au bureau avec plans de chantier et casque BTP",
    width: 1024,
    height: 576,
  },

  /** BeWork — visuel produit : relais admin marchés travaux, DOE, situations, tableau de bord */
  beworkRelaisMarchesTravaux: {
    src: '/images/bework-relais-marches-travaux-bureau-chantier.png',
    alt: "BeWork — relais administratif marchés travaux, dossiers intervention et comptes rendus",
    width: 1024,
    height: 1024,
  },

  /** Cartes catalogue niveau 1 et niveau 2 — affiches promotionnelles par formation (juin 2026). */
  formationNiv01IaBatimentTravauxPublics2026: {
    src: '/images/formation-ia-batiment-travaux-publics.webp',
    alt: "Affiche L'IA au service des pros du bâtiment et TP — niveau débutant, Laure Olivié",
    description:
      "Affiche promotionnelle niveau 1 « L'IA au service des pros du bâtiment et des travaux publics » : débutant, 4 h, devis et administratif BTP. Laure Olivié, OFC Création d'Entreprise.",
    title: "Niveau 1 · L'IA au service des pros du bâtiment et des travaux publics",
    width: 1024,
    height: 1024,
  },
  formationNiv02IaAppelsOffreBtp2026: {
    src: '/images/formation-ia-appels-offres-btp.webp',
    alt: "Affiche L'IA appliquée aux appels d'offres BTP — niveau avancé, Laure Olivié",
    description:
      "Affiche « L'IA appliquée aux appels d'offres BTP » : analyse DCE, mémoire technique, Claude AI Pro et Cowork — 4 h, niveau avancé. Laure Olivié Qualiopi.",
    title: "Niveau 2 · L'IA appliquée aux appels d'offres BTP",
    width: 1024,
    height: 1024,
  },
  formationNiv03IaConduiteTravaux2026: {
    src: '/images/formation-ia-conduite-travaux-btp.webp',
    alt: "Affiche L'IA appliquée à la conduite de travaux — niveau avancé, Laure Olivié",
    description:
      "Affiche « L'IA appliquée à la conduite de travaux » : CCTP, CR, PPSPS, DOE et skills Claude BTP — 4 h, 8 participants max. Laure Olivié Qualiopi.",
    title: "Niveau 2 · L'IA appliquée à la conduite de travaux",
    width: 1024,
    height: 1024,
  },
  formationNiv04MaitriserClaudeAiBtp2026: {
    src: '/images/formation-claude-ai-btp-catalogue.webp',
    alt: "Affiche Maîtriser Claude AI pour le BTP — projets, skills et Cowork",
    description:
      'Affiche « Maîtriser Claude AI pour le BTP » : Projets, Skills, Cowork, connecteurs et Claude Code — 4 h, niveau avancé. Laure Olivié, OFC Qualiopi.',
    title: 'Niveau 2 · Maîtriser Claude AI pour le BTP',
    width: 1024,
    height: 1024,
  },
  formationClaudeIaChatCoworkCodeSkillsBtp2026: {
    src: '/images/formation-claude-ai-btp-catalogue.webp',
    alt: 'Affiche Maîtriser Claude AI pour le BTP — projets, skills et Cowork',
    description:
      'Formation « Claude IA pour le BTP : Chat, Cowork & Code » — skills sur-mesure administratif, AO, chantier et juridique. 4 h intra IDF, 8 participants max. Laure Olivié, OFC Qualiopi.',
    title: 'Claude IA pour le BTP : Chat, Cowork & Code',
    width: 1024,
    height: 1024,
  },
  formationNiv05IaMaitriseOeuvre2026: {
    src: '/images/formation-ia-maitrise-oeuvre-btp.webp',
    alt: "Affiche L'IA au service des maîtres d'œuvre — modules MOE, Laure Olivié",
    description:
      "Affiche « L'IA au service des maîtres d'œuvre » : analyse DCE, comptes rendus, OS et réserves — 4 h, maîtrise d'œuvre d'exécution. Laure Olivié, OFC Qualiopi.",
    title: "Niveau 2 · L'IA au service des maîtres d'œuvre",
    width: 1024,
    height: 1024,
  },

};

export type PhotoKey = keyof typeof PHOTOS;

/** Galerie cohérente (parcours visuel formation présentiel + formatrice) */
export const GALERIE_LINKEDIN_FORMATION: PhotoKey[] = [
  'interventionClaude',
  'formatriceLowerThird',
  'coursRecrutementVideo1',
  'linkedinPlayerRecrutement',
  'linkedinSommaireCours',
  'linkedinLeconFideliser',
  'coursRecrutementVideo2',
];
