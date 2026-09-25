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
/** URL canonique — landing `/formation-ia-*-btp` ou hub réécrit `/formation-ia/[slug]`. */
export type FormationIaMetierDynamicPath =
  | `/formation-ia-${string}-btp`
  | `/formation-ia/${string}`;

export type FormationIaMetierDynamicMaillageLink = {
  href: string;
  label: string;
};

export type FormationIaMetierDynamicConfig = {
  slug: string;
  path: FormationIaMetierDynamicPath;
  /** Titre SEO ≤ 60 car. — format : Formation IA [Métier] BTP Île-de-France — Laure Olivié */
  seoTitle: string;
  /** Meta description ≤ 155 car. */
  seoDescription: string;
  keywords: string[];
  /** Segment breadcrumb : « Formation IA Électricien » */
  breadcrumbMetierLabel: string;
  /** H1 : « Formation IA pour [électriciens] — … » */
  h1MetierPluriel: string;
  /** Si renseigné, remplace le H1 généré par le template. */
  h1Override?: string;
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
  /** Exactement 3 liens : pilier + pages tâche (ancres descriptives). */
  maillageInterne?: readonly [FormationIaMetierDynamicMaillageLink, FormationIaMetierDynamicMaillageLink, FormationIaMetierDynamicMaillageLink];
  /** Libellé fil d’Ariane JSON-LD (segment final). */
  breadcrumbMetierShort?: string;
};
