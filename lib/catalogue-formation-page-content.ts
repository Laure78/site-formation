/**
 * Contenu éditorial des fiches catalogue Qualiopi — séparé de la présentation (`CatalogueFormationPageTemplate`).
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import type { TrainingParcoursKind } from '@/lib/training-page-helpers';
import { LINKS } from '@/lib/internal-links';
import { getFormationByCode } from '@/data/formations';
import {
  TARIF_INTER_DEV_WEB_IA_14H_HT,
  TARIF_INTER_DEV_WEB_IA_HT,
} from '@/lib/formation-developpement-web-ia-content';
import { formatTarifHt } from '@/lib/tarifs-sessions';

export type CataloguePainPoint = { title: string; texte: string };

export type CatalogueProgramLink = {
  /** Texte avant le lien (ex. « Pour les bases IA ») */
  prefix: string;
  href: string;
  label: string;
};

export type CataloguePrerequisiteBlock = {
  title: string;
  items: readonly string[];
};

export type CatalogueFormationPageContent = {
  programmeRef: FormationCatalogueCode;
  parcoursKind: TrainingParcoursKind;
  levelBadgeLabel: string;
  /** Sous-titre hero (public ou prérequis courts). */
  heroPublicLine?: string;
  heroFacts: readonly string[];
  quickFactsLevel: string;
  painPointsTitle: string;
  painPoints: readonly CataloguePainPoint[];
  outcomes: readonly string[];
  outcomesDescription: string;
  practicalCase?: {
    title: string;
    paragraphs: readonly string[];
    steps: readonly string[];
    note?: string;
  };
  workflow?: readonly string[];
  iaLimits?: readonly { iaAide: string; validation: string }[];
  deliverablesIntro?: string;
  deliverables: readonly string[];
  publicPrerequisites?: readonly CataloguePrerequisiteBlock[];
  intraExtraBullets?: readonly string[];
  interExtraBullets?: readonly string[];
  programIntro: string;
  programLinks?: readonly CatalogueProgramLink[];
  instructorTitle?: string;
  instructorBody?: string;
  instructorExtraLinks?: readonly { href: string; label: string }[];
  finalCta: {
    title: string;
    description: string;
    secondaryLabel?: string;
    primaryLabel?: string;
    devisHref?: string;
    secondaryHref?: string;
  };
  pdfHref?: string;
  /** Titre bloc objectifs (défaut : « Après cette formation, vous saurez… »). */
  objectivesTitle?: string;
  /** Titre section programme (défaut : « Programme — {durée session} »). */
  programmeHeading?: string;
  /** Remplace la bandeau TrainingQuickFacts par défaut (tarifs 7 h / 14 h, etc.). */
  quickFactsOverride?: readonly { label: string; value: string }[];
  /** Passerelle vers NIV-10 — masquer sur la fiche BeWork elle-même. */
  showBeworkPasserelle?: boolean;
};

const DEFAULT_FINAL_CTA = {
  title: 'Étudions les besoins de votre équipe',
  description:
    'Un échange permet de définir vos cas d’usage, le nombre de participants, le niveau, le format et les possibilités de financement.',
  secondaryLabel: 'Échanger sur votre projet de formation',
} as const;

const NIV_01: CatalogueFormationPageContent = {
  programmeRef: 'NIV-01',
  parcoursKind: 'usages-ia-btp',
  levelBadgeLabel: 'Niveau 1 · Débutant',
  heroPublicLine:
    'Dirigeants, conducteurs de travaux, chargés d’affaires, bureaux d’études et fonctions support du BTP.',
  heroFacts: [
    '4 heures',
    '70 % de pratique',
    `${getFormationByCode('NIV-01')!.effectifMin} à ${getFormationByCode('NIV-01')!.effectifMax} participants en intra`,
    'Présentiel en Île-de-France',
  ],
  quickFactsLevel: 'Débutant',
  painPointsTitle: 'Vous perdez du temps sur ces tâches ?',
  painPoints: [
    { title: 'Devis', texte: 'Repartir d’une page blanche pour chaque devis ou désignation d’ouvrage.' },
    { title: 'Comptes rendus', texte: 'Rédiger les comptes rendus après les réunions de chantier.' },
    { title: 'DOE et PV', texte: 'Préparer les DOE, PV de réception et suivis de réserves.' },
    { title: 'Emails clients', texte: 'Reformuler les emails et documents destinés aux clients ou fournisseurs.' },
  ],
  outcomes: [
    'Formuler une demande précise à une IA',
    'Transformer des notes en compte rendu structuré',
    'Préparer une trame de devis ou une désignation d’ouvrage',
    'Créer une première structure de DOE ou de PV',
    'Contrôler et corriger une réponse générée par l’IA',
  ],
  outcomesDescription:
    'Vous apprenez à préparer et structurer une première version de devis, soumise au contrôle du professionnel. L’IA n’établit ni les prix, ni les métrés, ni la conformité aux DTU.',
  practicalCase: {
    title: 'Travaillez sur vos propres documents',
    paragraphs: [
      'Les exercices peuvent être réalisés à partir de vos devis, comptes rendus, DOE, PV ou emails. Les documents doivent être anonymisés avant leur utilisation dans un outil d’intelligence artificielle.',
    ],
    steps: [
      'Vous sélectionnez un document récurrent.',
      'Vous construisez une méthode et un prompt.',
      'Vous repartez avec une trame réutilisable.',
    ],
  },
  deliverables: [
    'Bibliothèque de prompts BTP',
    'Trames de devis, comptes rendus, DOE et PV',
    'Checklist de validation humaine',
    'Certificat de réalisation',
  ],
  programIntro:
    'Quatre modules d’une heure. 70 % de pratique. ChatGPT et Claude comme outils d’assistance — jamais comme substitut à votre expertise.',
  programLinks: [
    {
      prefix: 'Pour analyser un DCE et structurer un mémoire technique, voir la',
      href: LINKS.formationAO,
      label: 'formation IA appels d’offres BTP',
    },
    {
      prefix: 'Pour configurer des assistants réutilisables après les bases, voir la',
      href: LINKS.formationAssistantsIaPersonnalisesBtp,
      label: 'formation assistants IA personnalisés pour le BTP',
    },
  ],
  finalCta: {
    title: 'Parlons de votre projet de formation',
    description:
      'Un échange de 30 minutes pour définir vos cas d’usage, le nombre de participants et les possibilités de financement.',
    secondaryLabel: 'Échanger sur votre projet',
  },
  pdfHref: LINKS.pdfProgrammeIaBtpNiveau1BatimentTp,
};

const NIV_02: CatalogueFormationPageContent = {
  programmeRef: 'NIV-02',
  parcoursKind: 'usages-ia-btp',
  levelBadgeLabel: 'Niveau 2 · Appels d’offres · 4 heures',
  heroPublicLine:
    'Bases de l’IA générative requises. Abonnement professionnel à l’outil utilisé pendant la session (non inclus dans le tarif).',
  heroFacts: [
    '4 heures',
    '75 % de pratique',
    'Présentiel en Île-de-France',
    'Niveau intermédiaire',
    'Dossier fil rouge BTP',
  ],
  quickFactsLevel: 'Intermédiaire',
  painPointsTitle: 'Vos réponses aux appels d’offres mobilisent trop de temps ?',
  painPoints: [
    {
      title: 'Pièces dispersées',
      texte: 'Les informations utiles sont réparties entre RC, CCTP, CCAP, DPGF et annexes.',
    },
    {
      title: 'Écarts CCTP / DPGF',
      texte: 'Des incohérences entre pièces créent un risque d’oubli ou de mauvaise interprétation.',
    },
    {
      title: 'Contrôle du chiffrage',
      texte: 'Sans checklist, une prestation ou une exigence peut passer à côté.',
    },
    {
      title: 'Mémoire technique',
      texte: 'Le plan est difficile à aligner sur les critères et pondérations du RC.',
    },
  ],
  outcomes: [
    'Organiser les pièces d’un DCE avant analyse',
    'Extraire les exigences importantes avec leurs sources',
    'Comparer le RC, le CCTP, le CCAP et la DPGF',
    'Créer une checklist des points à vérifier avant le chiffrage',
    'Structurer un mémoire technique selon les critères du RC',
    'Réutiliser une méthode de travail sur les prochains dossiers',
  ],
  outcomesDescription:
    'En quatre heures, l’entreprise construit une méthode guidée pour analyser un DCE, sécuriser la préparation de son chiffrage et structurer un mémoire technique avec l’aide de l’IA — pas une offre prête à déposer sans contrôle humain.',
  practicalCase: {
    title: 'Travaillez sur un véritable dossier de l’entreprise',
    paragraphs: [
      'Avant la session, l’entreprise sélectionne un DCE représentatif, un ancien devis et, si elle en dispose, une trame de mémoire technique. Ces documents servent de fil rouge pendant les exercices.',
      'La formation s’appuie sur un dossier fil rouge sélectionné avec l’entreprise avant la session. En interentreprises, des dossiers pédagogiques anonymisés peuvent être utilisés.',
    ],
    steps: [
      'Sélection et anonymisation des documents.',
      'Analyse guidée du dossier fil rouge.',
      'Création d’une méthode réutilisable.',
    ],
    note: 'Les documents doivent être anonymisés. Les informations sensibles, personnelles ou couvertes par une obligation de confidentialité ne doivent pas être déposées dans un outil IA sans cadre adapté.',
  },
  workflow: [
    'Organiser les pièces.',
    'Extraire les exigences.',
    'Croiser les documents.',
    'Préparer les points de chiffrage.',
    'Structurer le mémoire technique.',
    'Contrôler l’offre avant dépôt.',
  ],
  iaLimits: [
    { iaAide: 'Synthétiser une pièce', validation: 'L’interprétation contractuelle' },
    { iaAide: 'Extraire des exigences', validation: 'Les prestations du lot' },
    { iaAide: 'Comparer deux documents', validation: 'Les quantités et métrés' },
    { iaAide: 'Préparer une checklist', validation: 'Les prix et marges' },
    { iaAide: 'Structurer un mémoire technique', validation: 'Les moyens et engagements remis' },
  ],
  deliverablesIntro: 'Une bibliothèque de trames et d’assistants à personnaliser — selon l’avancement du groupe.',
  deliverables: [
    'Grille de lecture du DCE',
    'Tableau de comparaison CCTP–DPGF',
    'Checklist des points de chiffrage',
    'Trame de questions à adresser à la MOE',
    'Structure de mémoire technique',
    'Checklist avant dépôt',
    'Bibliothèque de prompts',
    'Méthode de validation humaine',
  ],
  publicPrerequisites: [
    {
      title: 'Prérequis pédagogiques',
      items: [
        'Connaître le fonctionnement général d’un appel d’offres',
        'Avoir les bases d’une IA générative (ou le niveau 1)',
      ],
    },
    {
      title: 'Prérequis techniques',
      items: [
        'Ordinateur et accès aux outils utilisés',
        'Abonnement professionnel à l’outil de session',
        'Documents du fil rouge, anonymisés',
      ],
    },
  ],
  intraExtraBullets: ['Dossier fil rouge de l’entreprise'],
  interExtraBullets: ['Dossier pédagogique commun'],
  programIntro: 'Atelier collectif, 75 % de pratique. Accueil, quatre modules et bilan — total 4 heures.',
  programLinks: [
    {
      prefix: 'Pour les bases IA avant ce niveau, voir la',
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      label: 'formation IA BTP niveau 1',
    },
    {
      prefix: 'Pour créer des assistants réutilisables sur DCE et mémoire :',
      href: LINKS.formationAssistantsIaPersonnalisesBtp,
      label: 'formation assistants IA personnalisés BTP',
    },
    {
      prefix: 'Pour le cadre marchés publics :',
      href: LINKS.formationIaMarchePublicTravaux,
      label: 'formation IA marché public de travaux',
    },
  ],
  instructorTitle: 'Une formation conçue par une spécialiste de l’IA appliquée au BTP',
  instructorBody:
    'Laure Olivié, OFC Création d’Entreprise (Qualiopi). Expérience du bâtiment et des travaux publics, spécialisation IA appliquée aux métiers du BTP. Références : FFB Grand Paris, CSFE, CNAM Entreprise, Le Moniteur Formations.',
  instructorExtraLinks: [{ href: LINKS.qualiopi, label: 'Certification Qualiopi' }],
  finalCta: DEFAULT_FINAL_CTA,
  pdfHref: LINKS.pdfProgrammeFormationAoBtpDetail2026,
};

const NIV_03: CatalogueFormationPageContent = {
  programmeRef: 'NIV-03',
  parcoursKind: 'usages-ia-btp',
  levelBadgeLabel: 'Niveau 2 · Perfectionnement',
  heroPublicLine:
    'Conducteurs de travaux, chefs de chantier, responsables travaux et assistant(e)s travaux.',
  heroFacts: [
    '4 heures',
    '70 % de pratique',
    `${getFormationByCode('NIV-03')!.effectifMin} à ${getFormationByCode('NIV-03')!.effectifMax} participants en intra`,
    'Présentiel en Île-de-France',
    'Bibliothèque 20+ skills Claude BTP',
  ],
  quickFactsLevel: 'Niveau 2',
  painPointsTitle: 'Vous perdez du temps sur le pilotage chantier ?',
  painPoints: [
    {
      title: 'CCTP & DPGF',
      texte: 'Analyser les pièces techniques et préparer le démarrage sans repartir de zéro à chaque affaire.',
    },
    {
      title: 'Sécurité',
      texte: 'PPSPS, DUERP et SOGED : structurer les documents réglementaires sans y passer des heures.',
    },
    {
      title: 'Suivi quotidien',
      texte: 'Comptes rendus, relances entreprises, approvisionnements et sous-traitants (DC4).',
    },
    {
      title: 'Réception & DOE',
      texte: 'Situations, PV de réserves, DOE et courriers de clôture — avec relecture humaine.',
    },
  ],
  outcomes: [
    'Comprendre le fonctionnement des skills Claude et accéder à la bibliothèque BTP OFC',
    'Préparer et démarrer un chantier avec l’IA : CCTP, DPGF, DICT, OS, planning',
    'Sécuriser le chantier (PPSPS, DUERP, SOGED) et piloter le quotidien (CR, suivi, ST, métré, budget)',
    'Gérer l’administratif jusqu’à la réception : situations, réserves, DOE, litiges',
  ],
  outcomesDescription:
    'Formation IA appliquée à la conduite de travaux : industrialiser l’analyse CCTP/DPGF, la sécurité chantier, les comptes rendus et le DOE avec des skills Claude — validation humaine avant tout envoi.',
  practicalCase: {
    title: 'Travaillez sur vos documents de chantier',
    paragraphs: [
      'Les exercices s’appuient sur vos CCTP, DPGF, modèles de CR, courriers ST ou dossiers de réception — anonymisés avant utilisation dans Claude.',
      'Un fil rouge chronologique : du démarrage à la réception sur un chantier type bâtiment.',
    ],
    steps: [
      'Sélection et anonymisation de vos pièces.',
      'Activation de la bibliothèque et test des skills sur le fil rouge.',
      'Personnalisation des skills à votre charte et à vos lots.',
    ],
    note: 'Un compte Claude Pro est recommandé par participant (environ 18 € HT/mois, à souscrire par l’entreprise) — non inclus dans le forfait.',
  },
  deliverables: [
    'Accès à la bibliothèque 20+ skills Claude BTP (par phase de chantier)',
    'Skills opérationnels testés sur le fil rouge (CCTP, PPSPS, CR, DOE…)',
    'Fiches méthode et supports de prompts par module',
    'Certificat de réalisation',
    'Échange visio J+30 pour ancrer les usages',
  ],
  publicPrerequisites: [
    {
      title: 'Prérequis pédagogiques',
      items: [
        'Savoir utiliser un ordinateur et rédiger en français',
        'Niveau 1 ou pratique déjà d’une IA générative',
      ],
    },
    {
      title: 'Prérequis techniques',
      items: [
        'Ordinateur portable, connexion internet, compte Claude Pro recommandé',
        'Documents de chantier anonymisés (CCTP, CR, modèles ST…)',
      ],
    },
  ],
  intraExtraBullets: ['Suivi visio J+30 inclus'],
  programIntro:
    'Quatre modules sur 4 h : installation chantier, sécurité, gestion quotidienne et administratif jusqu’à la réception. 70 % de pratique sur vos documents.',
  programLinks: [
    {
      prefix: 'Pour les bases IA, voir la',
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      label: 'formation IA BTP niveau 1',
    },
    {
      prefix: 'Pour des assistants réutilisables, voir la',
      href: LINKS.formationAssistantsIaPersonnalisesBtp,
      label: 'formation assistants IA personnalisés BTP',
    },
  ],
  finalCta: {
    title: 'Parlons de votre projet de formation',
    description:
      'Organisez une session pour vos conducteurs de travaux : devis, effectif et financement OPCO possible selon éligibilité.',
    secondaryLabel: 'Échanger sur votre projet',
  },
  pdfHref: LINKS.pdfProgrammeConduiteTravauxNiv03,
};

const NIV_04: CatalogueFormationPageContent = {
  programmeRef: 'NIV-04',
  parcoursKind: 'usages-ia-btp',
  levelBadgeLabel: 'Niveau 2 · Perfectionnement',
  heroPublicLine:
    'Référents IA, dirigeants, responsables digitaux, chargés d’affaires et conducteurs de travaux.',
  heroFacts: [
    '4 heures',
    '70 % de pratique',
    'Projets, Cowork, connecteurs, Claude Code',
    'Présentiel en Île-de-France',
  ],
  quickFactsLevel: 'Niveau 2',
  painPointsTitle: 'Vous voulez structurer Claude dans l’entreprise ?',
  painPoints: [
    {
      title: 'Projets éparpillés',
      texte: 'Chaque affaire repart sans instructions ni base documentaire partagée.',
    },
    {
      title: 'Production documentaire',
      texte: 'CR, mémoires et dossiers chronophages sans méthode industrialisée.',
    },
    {
      title: 'Outils déconnectés',
      texte: 'Messagerie, drive et agenda non reliés à vos workflows Claude.',
    },
    {
      title: 'Automatisations fragiles',
      texte: 'Scripts et lots documentaires difficiles à fiabiliser et réutiliser.',
    },
  ],
  outcomes: [
    'Structurer l’usage de Claude avec Projets et une bibliothèque de skills BTP',
    'Déléguer la production documentaire à Cowork en autonomie supervisée',
    'Connecter Claude à la messagerie, au drive et à l’agenda en sécurisant les données',
    'Automatiser des tâches répétitives avec Claude Code',
    'Fiabiliser skills, connecteurs et automatisations avec validation humaine',
  ],
  outcomesDescription:
    'Formation avancée Claude AI pour le BTP : industrialiser Projets, skills, Cowork, connecteurs et Claude Code sur vos cas réels — jamais sans relecture humaine.',
  deliverables: [
    'Projet « chantier type » structuré',
    'Dossier produit avec Cowork',
    'Connecteur configuré avec workflow sécurisé',
    'Automatisation Claude Code testée',
    'Plan d’action individuel à 30 jours',
    'Certificat de réalisation',
  ],
  publicPrerequisites: [
    {
      title: 'Prérequis pédagogiques',
      items: [
        'Utilisation régulière de Claude déjà acquise',
        'Niveau 1 ou équivalent sur les bases IA BTP',
      ],
    },
    {
      title: 'Prérequis techniques',
      items: [
        'Abonnement Claude Pro actif avec « Exécution de code »',
        'Pièces de chantier anonymisées (CCTP, modèles, dossiers)',
      ],
    },
  ],
  programIntro:
    'Accueil, 4 modules techniques et clôture le matin : Projets & skills, Cowork, connecteurs et Claude Code — fil rouge PME BTP. 70 % pratique.',
  programLinks: [
    {
      prefix: 'Pour les appels d’offres, voir la',
      href: LINKS.formationAO,
      label: 'formation IA appels d’offres BTP',
    },
    {
      prefix: 'Pour le pilotage chantier, voir la',
      href: LINKS.formationConduiteTravauxSuiviChantier,
      label: 'formation conduite de travaux',
    },
  ],
  finalCta: DEFAULT_FINAL_CTA,
};

const NIV_05: CatalogueFormationPageContent = {
  programmeRef: 'NIV-05',
  parcoursKind: 'usages-ia-btp',
  levelBadgeLabel: 'Niveau 2 · Perfectionnement',
  heroPublicLine:
    'Maîtres d’œuvre d’exécution (MOEX), conducteurs de travaux, OPC, BET et assistants gestion travaux.',
  heroFacts: [
    '4 heures effectives',
    '70 % de pratique',
    '5 modules MOE opérationnels',
    'Présentiel en Île-de-France',
  ],
  quickFactsLevel: 'Niveau 2',
  painPointsTitle: 'La MOE d’exécution produit trop de documents ?',
  painPoints: [
    {
      title: 'Analyse DCE',
      texte: 'CCTP, CCAP, CCAG — synthèse et points de vigilance entre pièces.',
    },
    {
      title: 'Comptes rendus',
      texte: 'CR de chantier chronophages sans trame ni dictée structurée.',
    },
    {
      title: 'Actes administratifs',
      texte: 'OS, courriers types, PV et avenants à produire rapidement.',
    },
    {
      title: 'Réserves & GPA',
      texte: 'Suivi des réserves, pré-PV de réception et réponses acquéreurs.',
    },
  ],
  outcomes: [
    'Choisir Claude ou ChatGPT selon l’usage MOE et cadrer l’écosystème Anthropic',
    'Analyser un DCE et produire une fiche de synthèse avec sources',
    'Rédiger un CR de chantier structuré à partir de notes ou dictée',
    'Produire OS, courriers et actes administratifs MOE avec modèles réutilisables',
    'Structurer le suivi des réserves et la préparation à la réception',
  ],
  outcomesDescription:
    'Formation IA pour la maîtrise d’œuvre d’exécution : DCE, CR, OS, réserves et GPA — avec Claude et ChatGPT, confidentialité des données chantier et validation humaine systématique.',
  practicalCase: {
    title: 'Travaillez sur vos dossiers MOE',
    paragraphs: [
      'Ateliers sur vos DCE, CR, OS, listes de réserves ou courriers — anonymisés si besoin. Chaque module produit un livrable réutilisable dès le lendemain.',
    ],
    steps: [
      'Import ou sélection d’un dossier fil rouge MOE.',
      'Exercices guidés module par module.',
      'Plan d’action individuel à 30 jours en clôture.',
    ],
  },
  deliverables: [
    'Mémo « Claude pour la maîtrise d’œuvre »',
    'Fiche-type d’analyse DCE (30 points)',
    'Gabarit CR MOE + prompt transcription vocale',
    'Pack de modèles d’actes administratifs MOE',
    'Modèle de suivi des réserves + tableau GPA',
    'Certificat de réalisation',
  ],
  publicPrerequisites: [
    {
      title: 'Prérequis pédagogiques',
      items: ['Aisance avec les outils numériques — aucun prérequis IA'],
    },
    {
      title: 'Prérequis techniques',
      items: [
        'Abonnements Claude Pro et ChatGPT Plus actifs sur chaque poste',
        'Dossiers techniques, OS, CR et DCE réels (anonymisés)',
      ],
    },
  ],
  programmeHeading: 'Programme — 5 modules MOE (4 h)',
  programIntro:
    '4 heures effectives — 70 % pratique / 30 % théorie — alternance théorie courte et ateliers sur cas réels MOE apportés par les participants.',
  programLinks: [
    {
      prefix: 'Pour le pilotage chantier côté entreprise, voir la',
      href: LINKS.formationConduiteTravauxSuiviChantier,
      label: 'formation conduite de travaux',
    },
  ],
  finalCta: {
    title: 'Parlons de votre projet de formation',
    description:
      'Demandez un devis ou planifiez votre session intra ou inter — réponse sous 48 h ouvrées.',
    secondaryLabel: 'Échanger sur votre projet',
  },
};

const NIV_10: CatalogueFormationPageContent = {
  programmeRef: 'NIV-10',
  parcoursKind: 'creation-ia',
  levelBadgeLabel: 'BeWork · Niveau 2',
  heroPublicLine:
    'Entrepreneurs, indépendants, TPE et PME du bâtiment, porteurs de projet — sans prérequis en programmation.',
  heroFacts: [
    '7 h (1 journée) ou 14 h (2 journées)',
    '9h00 – 12h30 · 13h30 – 17h00',
    '6 à 8 participants',
    '70 % pratique · 30 % méthodologie',
  ],
  quickFactsLevel: 'Débutant',
  quickFactsOverride: [
    { label: 'Durée', value: '7 h ou 14 h' },
    { label: 'Format', value: 'Présentiel' },
    { label: 'Lieu', value: 'Île-de-France' },
    { label: 'Effectif', value: '6 à 8 participants' },
    { label: 'Niveau', value: 'Débutant' },
    {
      label: 'Public',
      value:
        'Entrepreneurs, indépendants, TPE et PME du bâtiment, porteurs de projet, reconversion',
    },
    {
      label: 'Tarif inter',
      value: `${formatTarifHt(TARIF_INTER_DEV_WEB_IA_HT)} € HT (7 h) · ${formatTarifHt(TARIF_INTER_DEV_WEB_IA_14H_HT)} € HT (14 h) / participant`,
    },
  ],
  painPointsTitle: 'Vous avez une idée, mais elle reste au stade de projet ?',
  painPoints: [
    {
      title: 'Idée floue',
      texte: 'Difficile de passer du besoin métier à un périmètre clair pour une première version.',
    },
    {
      title: 'Peur de coder',
      texte: 'Pas le temps d’apprendre le développement web classique ni de déléguer à un prestataire.',
    },
    {
      title: 'Outils IA',
      texte: 'ChatGPT ou Claude sans méthode : des brouillons, peu de structure ni de livrable testable.',
    },
    {
      title: 'Projet qui stagne',
      texte: 'Slides, notes ou maquettes — sans version fonctionnelle ni feuille de route pour la suite.',
    },
  ],
  outcomes: [
    'Cadrer un projet numérique à partir d’une idée ou d’un besoin',
    'Identifier les utilisateurs et les fonctionnalités principales',
    'Structurer le périmètre fonctionnel d’une première version',
    'Utiliser une méthode de prompting structurée',
    'Créer une première version fonctionnelle sans écrire directement de code',
    'Tester, corriger et sauvegarder son projet',
    'Définir une feuille de route pour poursuivre après la formation',
  ],
  outcomesDescription:
    'Formation pratique BeWork : apprendre à construire une première version de site, application ou outil métier avec l’IA — validation et tests à chaque étape, sans promesse de produit « clé en main » en production.',
  practicalCase: {
    title: 'Jour 1 — de l’idée à la première version',
    paragraphs: [
      'Parcours 7 h ou première journée du parcours 14 h : vous travaillez sur votre propre projet, pas sur un cas fictif.',
      'Quatre temps pédagogiques : cadrer, structurer, construire avec l’IA, tester et corriger.',
    ],
    steps: [
      '09h00 — Cadrer : idée, utilisateurs, besoin',
      'Matin — Structurer : écrans, parcours, prompts',
      'Après-midi — Construire : première version avec l’IA',
      '17h00 — Tester : corrections et feuille de route',
    ],
    note: 'L’abonnement ChatGPT ou Claude n’est pas compris dans le prix de la formation — vérifiez vos accès avant la session.',
  },
  deliverablesIntro: 'Livrables Jour 1 (7 h) ; le parcours 14 h ajoute publication en ligne et consolidation.',
  deliverables: [
    'Projet cadré et périmètre fonctionnel défini',
    'Première architecture et version construite',
    'Méthode de travail avec l’IA, tests et corrections',
    'Projet sauvegardé et feuille de route pour la suite',
    'Parcours 14 h : projet enrichi, bases de mise en ligne et visibilité',
    'Certificat de réalisation',
  ],
  iaLimits: [
    { iaAide: 'Générer une première version à partir d’un besoin cadré', validation: 'Valider le périmètre et les fonctionnalités' },
    { iaAide: 'Proposer des corrections et améliorations', validation: 'Tester et décider des changements' },
    { iaAide: 'Structurer des instructions (prompts)', validation: 'Contrôler le résultat à chaque étape' },
    { iaAide: 'Aider à sauvegarder et documenter', validation: 'Garder la responsabilité du projet' },
  ],
  publicPrerequisites: [
    {
      title: 'Prérequis pédagogiques',
      items: [
        'Savoir utiliser un ordinateur et naviguer sur Internet',
        'Aucun prérequis en programmation ou création de site',
      ],
    },
    {
      title: 'Prérequis techniques',
      items: [
        'Ordinateur, connexion, adresse email',
        'Abonnement actif ChatGPT ou Claude AI (non inclus)',
        'Applications installables sur l’ordinateur du participant',
      ],
    },
  ],
  interExtraBullets: ['Parcours 7 h ou 14 h selon calendrier'],
  intraExtraBullets: ['Parcours 7 h ou 14 h · programme adaptable'],
  programIntro:
    'Un fil rouge : votre projet. Démonstrations, ateliers guidés, travail individuel, tests et corrections — quatre modules sur la journée.',
  programmeHeading: 'Programme Jour 1 — 4 modules',
  objectivesTitle: 'Objectifs pédagogiques',
  instructorTitle: 'Apprendre à créer avec l’IA — encadré par Laure Olivié',
  instructorBody:
    'Laure Olivié, formatrice IA et fondatrice d’OFC Création d’Entreprise (certifié Qualiopi). Parcours BeWork « Construisez votre projet avec l’IA » : méthode progressive, petits groupes, 70 % de pratique sur votre projet.',
  instructorExtraLinks: [{ href: LINKS.bework, label: 'Découvrir BeWork' }],
  showBeworkPasserelle: false,
  finalCta: {
    title: 'Vous avez une idée de site, d’application ou d’outil métier ?',
    description:
      'Apprenez à construire votre première version avec l’IA, sans savoir coder. Parcours 7 h ou 14 h — interentreprises ou session intra-entreprise.',
    primaryLabel: 'Demander un devis',
    secondaryLabel: 'S’inscrire à la formation',
  },
};

const BY_REF: Partial<Record<FormationCatalogueCode, CatalogueFormationPageContent>> = {
  'NIV-01': NIV_01,
  'NIV-02': NIV_02,
  'NIV-03': NIV_03,
  'NIV-04': NIV_04,
  'NIV-05': NIV_05,
  'NIV-10': NIV_10,
};

export function getCatalogueFormationPageContent(
  ref: FormationCatalogueCode,
): CatalogueFormationPageContent {
  const content = BY_REF[ref];
  if (!content) {
    throw new Error(`Contenu fiche catalogue manquant pour ${ref} — étendre catalogue-formation-page-content.ts`);
  }
  return content;
}

export function hasCatalogueFormationPageTemplate(ref: FormationCatalogueCode): boolean {
  return ref in BY_REF;
}
