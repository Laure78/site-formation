import type { FAQItem } from '@/lib/faq';
import type { DeptArticle, DeptPrepositionLocative } from '@/lib/formation-ia-btp-dept-grammar';

export type DepartementTemoignage = {
  text: string;
  attribution: string;
};

export type DepartementPageData = {
  code: string;
  /** Nom nu — ex. « Seine-Saint-Denis » */
  nom: string;
  article: DeptArticle;
  prepositionLocative: DeptPrepositionLocative;
  /** Chemin canonique — ex. `/formation-ia-btp-seine-saint-denis-93` */
  path: string;
  /** Slug pour maillage sœurs — ex. `seine-saint-denis-93` */
  slug: string;
  /** Chapô : 2 phrases, dont une propre au bassin */
  accroche: string;
  villes: readonly string[];
  /** Phrase(s) sur les temps de trajet depuis Guyancourt */
  tempsTrajetGuyancourt: string;
  /** 3–4 phrases sur le tissu BTP local */
  tissuLocal: string;
  /** 2 cas d’usage prioritaires du département */
  casUsageLocaux: readonly [string, string];
  /** 3 questions FAQ propres */
  faqLocale: readonly [FAQItem, FAQItem, FAQItem];
  /** Page métier pertinente pour le cluster IDF */
  metierPertinent: { href: string; label: string; description: string };
  keywords?: string[];
  metaTitle?: string;
  metaDescription?: string;
};
