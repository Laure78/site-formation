/**
 * Contenu éditorial des fiches catalogue Qualiopi — séparé de la présentation (`CatalogueFormationPageTemplate`).
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import type { TrainingParcoursKind } from '@/lib/training-page-helpers';
import { LINKS } from '@/lib/internal-links';
import { getFormationByCode } from '@/data/formations';

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
  };
  pdfHref?: string;
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

const BY_REF: Partial<Record<FormationCatalogueCode, CatalogueFormationPageContent>> = {
  'NIV-01': NIV_01,
  'NIV-02': NIV_02,
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
