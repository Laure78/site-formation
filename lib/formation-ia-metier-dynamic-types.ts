import type { FAQItem } from '@/lib/faq';

export type FormationIaMetierDynamicMethodStep = {
  title: string;
  prompt: string;
  resultat: string;
};

export type FormationIaMetierDynamicGainsRow = {
  critere: string;
  avant: string;
  apres: string;
};

/**
 * Page pilier « formation IA [métier] BTP » — contenu long + SEO + schémas.
 */
export type FormationIaMetierDynamicConfig = {
  slug: string;
  path: `/formation-ia-${string}-btp`;
  /** Titre SEO ≤ 60 car. — format : Formation IA [Métier] BTP Île-de-France — Laure Olivié */
  seoTitle: string;
  /** Meta description ≤ 155 car. */
  seoDescription: string;
  keywords: string[];
  /** Segment breadcrumb : « Formation IA Électricien » */
  breadcrumbMetierLabel: string;
  /** H1 : « Formation IA pour [électriciens] — … » */
  h1MetierPluriel: string;
  /** Texte « pourquoi les [électriciens] » */
  metierPlurielLower: string;
  /** Complément sans chiffres (les noms sont injectés dans le template). */
  heroIntro: string;
  probleme: {
    titreH2: string;
    paragraphes: string[];
  };
  solution: {
    titreH2: string;
    intro: string;
    casUsage: string[];
  };
  methode: {
    titreH2: string;
    /** Paragraphe d’introduction sous le H2 */
    intro?: string;
    etapes: FormationIaMetierDynamicMethodStep[];
  };
  resultats: {
    titreH2: string;
    intro: string;
    tableau: FormationIaMetierDynamicGainsRow[];
    temoignages: { citation: string; attribution: string }[];
  };
  faq: FAQItem[];
  courseName: string;
  courseDescription: string;
  courseTeaches: string[];
  bio: {
    titreH2: string;
    paragraphes: string[];
  };
  /** Alt accessible — photo Laure (section bio) */
  bioPhotoAlt: string;
  ogImage?: { url: string; width: number; height: number; alt: string };
};
