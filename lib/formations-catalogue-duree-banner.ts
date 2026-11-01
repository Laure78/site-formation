/**
 * Libellé bandeau durées catalogue — calculé depuis les formations publiques.
 */
import { getCataloguePageCoreFormations } from '@/lib/formations-catalogue-page-config';
import { catalogueEntryDuree } from '@/lib/catalogue-formation-disponibilite';

/** Ex. « 4 h à 14 h » — min/max des durées affichées sur le catalogue. */
export function getCatalogueDureeBannerLabel(at: Date = new Date()): string {
  const entries = getCataloguePageCoreFormations(at);
  const hours = entries
    .map((e) => {
      const d = catalogueEntryDuree(e);
      const m = d.match(/(\d+)\s*h/i);
      return m ? Number(m[1]) : null;
    })
    .filter((h): h is number => h != null && h > 0);
  if (hours.length === 0) return '4 h à 14 h';
  const min = Math.min(...hours);
  const max = Math.max(...hours);
  if (min === max) return `${min} h`;
  return `${min} h à ${max} h`;
}
