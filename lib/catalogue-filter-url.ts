/**
 * Filtres catalogue `/formations#catalogue-modules` — sérialisation URL (SEO : pas d’index des variantes).
 */
import type { DomaineId, MetierId } from '@/data/catalogue-2027';

export type CatalogueModulesFilterParams = {
  domaine?: DomaineId;
  metier?: MetierId;
  q?: string;
};

const DOMAINE_IDS = new Set<string>([
  'direction',
  'commercial',
  'travaux',
  'management',
  'administration',
  'technique-qualite-prevention',
  'numerique-ia',
]);

export function parseCatalogueModulesFilters(
  searchParams: URLSearchParams | Readonly<Record<string, string | string[] | undefined>>,
): CatalogueModulesFilterParams {
  const get = (key: string): string | undefined => {
    if (searchParams instanceof URLSearchParams) {
      const v = searchParams.get(key);
      return v && v.trim() ? v.trim() : undefined;
    }
    const raw = searchParams[key];
    if (Array.isArray(raw)) return raw[0]?.trim() || undefined;
    return raw?.trim() || undefined;
  };

  const domaineRaw = get('domaine');
  const metierRaw = get('metier');
  const q = get('q');

  return {
    domaine:
      domaineRaw && DOMAINE_IDS.has(domaineRaw) ? (domaineRaw as DomaineId) : undefined,
    metier: metierRaw ? (metierRaw as MetierId) : undefined,
    q,
  };
}

export function buildCatalogueModulesHref(filters: CatalogueModulesFilterParams): string {
  const params = new URLSearchParams();
  if (filters.domaine) params.set('domaine', filters.domaine);
  if (filters.metier) params.set('metier', filters.metier);
  if (filters.q) params.set('q', filters.q);
  const qs = params.toString();
  return qs ? `/formations?${qs}#catalogue-modules` : '/formations#catalogue-modules';
}
