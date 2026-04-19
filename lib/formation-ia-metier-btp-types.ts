import type { FAQItem } from '@/lib/faq';

export type FormationIaMetierBtpConfig = {
  /** ex. etancheur — pour IDs JSON-LD */
  id: string;
  path: `/formation-ia-${string}-btp`;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  metierNom: string;
  metierNomTitre: string;
  /** Référence normative affichée (DTU, NF C, etc.) */
  normeRef: string;
  problemParagraphs: string[];
  solutionIntro: string;
  /** Cinq cas d’usage concrets (section dédiée si renseigné) */
  casUsageConcrets?: string[];
  prompts: { title: string; body: string }[];
  /** Bloc partenariat CSFE (uniquement étancheur) */
  csfePartnership: boolean;
  testimonialQuote: string;
  testimonialAttribution: string;
  faq: FAQItem[];
  courseName: string;
  courseDescription: string;
  courseTeaches: string[];
  /** Image OG optionnelle */
  ogImage?: { url: string; width: number; height: number; alt: string };
  /** Visuel sous le titre (page métier riche SEO) */
  coverImage?: { url: string; width: number; height: number; alt: string };
  /** Bloc biographie Laure Olivié en fin de page */
  showAuthorBio?: boolean;
  /** Fin du paragraphe auteur (après la phrase sur Qualiopi / LinkedIn Learning) */
  authorBioClosingLine?: string;
  /** Cartes « métiers proches » en tête de la section Liens utiles */
  relatedMetierLinks?: { href: string; title: string; description: string }[];
  /** Intro surchargée pour la section Liens utiles */
  liensUtilesIntro?: string;
};
