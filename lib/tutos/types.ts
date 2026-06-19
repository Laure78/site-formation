/**
 * Types pour les pages Ressources / Tutos OFC.
 *
 * Chaque tuto correspond à un PDF signé OFC / Laure Olivié.
 * Le contenu textuel doit être repris **mot pour mot** depuis le PDF source.
 */

/** Rubrique d’index (/ressources, /ressources/tutos) — ordre d’affichage fixe. */
export type TutoCategoryId =
  | 'marches-et-veille'
  | 'chantier-livrables'
  | 'qse-conformite'
  | 'productivite';

export const TUTO_CATEGORY_ORDER: readonly TutoCategoryId[] = [
  'marches-et-veille',
  'chantier-livrables',
  'qse-conformite',
  'productivite',
];

/** Titres et chapôs des blocs catégorie (UI uniquement). */
export const TUTO_CATEGORY_META: Record<
  TutoCategoryId,
  { title: string; description: string; sectionId: string; pillLabel: string }
> = {
  'marches-et-veille': {
    title: 'Appels d’offres & veille marchés',
    description:
      'Réponses aux marchés, structuration des offres et surveillance des dossiers (DCE, consultations).',
    sectionId: 'tutos-marches-et-veille',
    pillLabel: 'Marchés publics',
  },
  'chantier-livrables': {
    title: 'Chantier, réception & livrables',
    description:
      'Suivi de chantier, comptes rendus, constats, dossiers de réception et documents de clôture.',
    sectionId: 'tutos-chantier-livrables',
    pillLabel: 'Chantier & livrables',
  },
  'qse-conformite': {
    title: 'Prévention, santé au travail & conformité',
    description: 'Plans de prévention, DUERP et obligations documentaires liées à la sécurité.',
    sectionId: 'tutos-qse-conformite',
    pillLabel: 'Prévention & conformité',
  },
  productivite: {
    title: 'Productivité & outils terrain',
    description: 'Automatisation et interfaces pour gagner du temps au bureau depuis le chantier.',
    sectionId: 'tutos-productivite',
    pillLabel: 'Productivité',
  },
};

/** Bloc de contenu rendu dans une section ou une étape de tuto. */
export type TutoBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'numberedList'; items: string[] }
  | { kind: 'callout'; title: string; body: string }
  | { kind: 'highlight'; text: string }
  | { kind: 'prompt'; title: string; text: string };

/** Étape du tutoriel (5 étapes par PDF). */
export type TutoStep = {
  number: number;
  eyebrow: string;
  title: string;
  intro?: string;
  blocks: TutoBlock[];
};

/** Question/réponse FAQ — texte exact du PDF. */
export type TutoFaqItem = { q: string; a: string };

/** Données complètes d'un tuto Ressource. */
export type TutoData = {
  /** Slug d'URL : `/ressources/[slug]` */
  slug: string;
  /** Rubrique pour l’index ressources (grille groupée). */
  category: TutoCategoryId;
  /** Nom du fichier PDF dans `/public/ressources/pdf/` */
  pdfFile: string;

  /** Eyebrow hero (ex. « TUTO OFFERT PAR LAURE OLIVIÉ ») */
  eyebrow: string;
  /** H1 — titre exact du PDF */
  title: string;
  /** Titre court pour cartes / breadcrumb (≤ 50 car.) */
  shortTitle: string;
  /** Sous-titre italique sous le H1 — texte exact du PDF */
  subtitle: string;

  /** Title HTML (≤ 65 car.) — sans le suffixe « | Laure Olivié » (ajouté par layout) */
  metaTitle: string;
  /** Meta description 150-160 car. — débute par mot-clé principal */
  metaDescription: string;
  /** Mots-clés SEO/GEO */
  keywords: string[];
  /** Alt OG image (description factuelle, ≤ 125 car.) */
  ogImageAlt: string;

  /** ISO date publication (utilisé sitemap + Article schema) */
  publishedAt: string;
  /** ISO date dernière mise à jour */
  updatedAt: string;

  /** Items « CE QUE TU VAS APPRENDRE » du hero (4 puces) */
  heroLearnPoints: string[];
  /**
   * Fragments d’URL des ancres (sans #). Le mot-clé `intro` → `intro-{slug}` au rendu.
   * Si absent ou taille différente de `heroLearnPoints`, les cibles sont déduites (intro + étapes).
   */
  heroLearnPointTargets?: readonly string[];

  /** Section introductive : titre + blocs */
  introTitle: string;
  introBlocks: TutoBlock[];

  /** 5 étapes du tutoriel */
  steps: TutoStep[];

  /** Section FAQ : titre + items (texte exact du PDF) */
  faqTitle: string;
  faq: TutoFaqItem[];

  /** Bloc CTA final reproduisant la dernière page du PDF */
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    programTitle: string;
    programItems: string[];
  };

  /** Durée totale du tutoriel — utilisée par HowTo schema */
  totalTimeMinutes: number;

  /** Description courte (60-80 mots) pour la grille `/ressources` */
  cardSummary: string;

  /** Visuel promotionnel hero (optionnel — page tuto individuelle). */
  heroImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};
