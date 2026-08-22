/**
 * Types partagés — landings SEO cluster « Formation IA BTP ».
 */
import type { FAQItem } from '@/lib/faq';
import type { CatalogueProgrammeRef } from '@/components/qualiopi/RenvoiFicheCatalogue';

export type SeoClusterUseCase = {
  title: string;
  body: string;
};

export type SeoClusterMethodStep = {
  title: string;
  body: string;
};

export type SeoClusterRelatedLink = {
  href: string;
  label: string;
  description?: string;
};

export type SeoClusterPageConfig = {
  path: string;
  seo: {
    title: string;
    titleAbsolute?: string;
    description: string;
    openGraphTitle?: string;
    openGraphDescription?: string;
    keywords?: string[];
    image: {
      url: string;
      width: number;
      height: number;
      alt: string;
    };
  };
  h1: string;
  subtitle: string;
  shortAnswer: string;
  introParagraphs: string[];
  useCasesTitle: string;
  useCases: readonly SeoClusterUseCase[];
  publicTitle?: string;
  publicTargets?: readonly string[];
  /** Section H2 optionnelle (ex. « Une formation IA conçue pour le terrain »). */
  specialSection?: {
    id: string;
    title: string;
    paragraphs: string[];
  };
  methodology?: {
    title: string;
    steps: readonly SeoClusterMethodStep[];
  };
  faq: readonly FAQItem[];
  courseName: string;
  courseTeaches: string[];
  primaryCtaLabel: string;
  midCtaTitle: string;
  midCtaSubtitle: string;
  finalCtaTitle: string;
  finalCtaSubtitle: string;
  campaignSlug: string;
  relatedLinks: readonly SeoClusterRelatedLink[];
  catalogueHref?: string;
  catalogueLabel?: string;
  /** Référence programme Qualiopi pour le renvoi fiche catalogue (optionnel). */
  programmeRef?: CatalogueProgrammeRef;
};
