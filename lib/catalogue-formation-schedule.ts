/**
 * Publication programmée et section « Formations à venir » — catalogue `/formations`.
 */
import { FORMATIONS, type Formation } from '@/data/formations';
import {
  FORMATION_CATALOGUE_PUBLISH_FROM,
  isFormationCatalogueRetired,
  type FormationCatalogueCode,
} from '@/lib/formation-catalogue-visibility';
import {
  getFormationCatalogueByRef,
  type FormationCatalogueEntry,
} from '@/lib/formations-catalogue-display';

function calendarDateParis(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(date);
}

export function getFormationPublishFromIso(code: string): string | undefined {
  return FORMATION_CATALOGUE_PUBLISH_FROM[code as FormationCatalogueCode];
}

export function isFormationScheduledAfter(at: Date, code: string): boolean {
  const from = getFormationPublishFromIso(code);
  if (!from) return false;
  return calendarDateParis(at) < from;
}

function toUpcomingEntry(f: Formation): FormationCatalogueEntry | undefined {
  const entry = getFormationCatalogueByRef(f.code);
  return entry ?? undefined;
}

/** Fiches catalogue dont la date de publication est postérieure à `at` (non retirées). */
export function getUpcomingCatalogueFormationEntries(
  at: Date = new Date(),
): FormationCatalogueEntry[] {
  return FORMATIONS.filter(
    (f) =>
      !isFormationCatalogueRetired(f.code) && isFormationScheduledAfter(at, f.code),
  )
    .map(toUpcomingEntry)
    .filter((e): e is FormationCatalogueEntry => Boolean(e));
}

/** Libellé date de publication — année seule si 1er janvier, sinon date complète. */
export function formatCataloguePublishFromLabel(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return isoDate;
  if (m === 1 && d === 1) return String(y);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(y, m - 1, d));
}
