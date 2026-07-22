import type { FAQItem } from '@/lib/faq';

/** Lot catalogue (pilier) — lien réel ou stub futur. */
export type MarchePublicLotCard = {
  href?: string;
  title: string;
  description: string;
  /** Stub : lot annoncé, pas encore de page. */
  comingSoon?: boolean;
};

export type FormationIaMarchePublicConfig = {
  /** Identifiant court — IDs JSON-LD / UTM Calendly */
  id: string;
  path: `/formation-ia-marche-public-${string}`;
  /** 'pillar' = hub cluster ; 'lot' = page métier/lot */
  variant: 'pillar' | 'lot';
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Libellé court pour schema / breadcrumb */
  pageLabel: string;
  courseName: string;
  courseDescription: string;
  courseTeaches: string[];
  /** Réponse GEO « En bref » */
  shortAnswer: string;
  /** Chapô sous le H1 (optionnel — sinon phrase générique cluster) */
  introParagraph?: string;
  essentielItems: readonly string[];
  problemTitle: string;
  problemParagraphs: string[];
  solutionIntro: string;
  solutionGuards: string[];
  /** Méthode en 5 étapes (pilier) ou étapes lot */
  methodSteps: { title: string; body: string }[];
  prompts: { title: string; body: string }[];
  /** Section CCAG-Travaux 2021 — pilier uniquement */
  ccagSection?: {
    intro: string;
    bullets: string[];
    disclaimer: string;
  };
  /** Cartes « Choisissez votre lot » — pilier */
  lots?: MarchePublicLotCard[];
  /** Contenu ≥ 60 % spécifique lot */
  lotSpecificSections?: {
    title: string;
    paragraphs: string[];
  }[];
  /** Bloc E-E-A-T (chiffres + partenaires) */
  eeatParagraph: string;
  faq: FAQItem[];
  /** Liens déjà rendus hors RelatedLinks (éviter doublons) */
  inlineLinkHrefs?: string[];
  /** Liens de maillage affichés une fois (lot → pilier / métier / etc.) */
  maillageLinks?: { href: string; label: string; description: string }[];
};
