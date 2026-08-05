import type { DepartementPageData } from '@/lib/departement-pages/types';
import { DEPARTEMENT_PARIS_75 } from '@/lib/departement-pages/paris-75';
import { DEPARTEMENT_SEINE_ET_MARNE_77 } from '@/lib/departement-pages/seine-et-marne-77';
import { DEPARTEMENT_YVELINES_78 } from '@/lib/departement-pages/yvelines-78';
import { DEPARTEMENT_ESSONNE_91 } from '@/lib/departement-pages/essonne-91';
import { DEPARTEMENT_HAUTS_DE_SEINE_92 } from '@/lib/departement-pages/hauts-de-seine-92';
import { DEPARTEMENT_SEINE_SAINT_DENIS_93 } from '@/lib/departement-pages/seine-saint-denis-93';
import { DEPARTEMENT_VAL_DE_MARNE_94 } from '@/lib/departement-pages/val-de-marne-94';
import { DEPARTEMENT_VAL_DOISE_95 } from '@/lib/departement-pages/val-doise-95';

export type { DepartementPageData, DepartementTemoignage } from '@/lib/departement-pages/types';
export {
  DEPARTEMENT_CAS_USAGE_STANDARD,
  TEMOIGNAGES_REGION_IDF,
  DEPARTEMENT_TEMOIGNAGES_PARTAGES,
  DEPARTEMENT_FORMATRICE_GUYANCOURT,
} from '@/lib/departement-pages/shared';

export {
  DEPARTEMENT_PARIS_75,
  DEPARTEMENT_SEINE_ET_MARNE_77,
  DEPARTEMENT_YVELINES_78,
  DEPARTEMENT_ESSONNE_91,
  DEPARTEMENT_HAUTS_DE_SEINE_92,
  DEPARTEMENT_SEINE_SAINT_DENIS_93,
  DEPARTEMENT_VAL_DE_MARNE_94,
  DEPARTEMENT_VAL_DOISE_95,
};

/** Registre des 8 pages département (Paris + 77–78–91–95). */
export const DEPARTEMENT_PAGES: readonly DepartementPageData[] = [
  DEPARTEMENT_PARIS_75,
  DEPARTEMENT_SEINE_ET_MARNE_77,
  DEPARTEMENT_YVELINES_78,
  DEPARTEMENT_ESSONNE_91,
  DEPARTEMENT_HAUTS_DE_SEINE_92,
  DEPARTEMENT_SEINE_SAINT_DENIS_93,
  DEPARTEMENT_VAL_DE_MARNE_94,
  DEPARTEMENT_VAL_DOISE_95,
] as const;

export const DEPARTEMENT_PAGE_BY_CODE: Readonly<Record<string, DepartementPageData>> =
  Object.fromEntries(DEPARTEMENT_PAGES.map((d) => [d.code, d]));

export const DEPARTEMENT_PAGE_PATHS = DEPARTEMENT_PAGES.map((d) => d.path);

export function getDepartementPageData(code: string): DepartementPageData | undefined {
  return DEPARTEMENT_PAGE_BY_CODE[code];
}
