import type { PHOTOS } from '@/lib/photos';

/** Contenu éditorial d’une carte module — fiche formateur. */
export type FormateurProfileModuleCardContent = {
  photo?: (typeof PHOTOS)[keyof typeof PHOTOS];
  imageAlt?: string;
  accroche: string;
  themes?: readonly string[];
  showCode?: boolean;
  category?: string;
};