/**
 * PDF programmes — ne pas proposer un PDF dont la durée ne correspond plus à la fiche.
 */
import { getModuleByCode, type ModuleCode } from '@/data/catalogue-2027';

const LEGACY_CODES_PDF_OBSOLETE = new Set(['NIV-02', 'NIV-03', 'NIV-04', 'NIV-05']);

export function isProgrammePdfObsoleteForLegacyCode(code: string): boolean {
  return LEGACY_CODES_PDF_OBSOLETE.has(code);
}

export function resolveProgrammePdfHref(opts: {
  legacyCode?: string;
  moduleCode?: ModuleCode | string;
  fallbackHref?: string | null;
}): string | null {
  if (opts.legacyCode && isProgrammePdfObsoleteForLegacyCode(opts.legacyCode)) {
    return null;
  }
  if (opts.moduleCode) {
    const mod = getModuleByCode(opts.moduleCode);
    if (mod?.pdfARegenerer || !mod?.pdfProgramme) return null;
    return mod.pdfProgramme;
  }
  return opts.fallbackHref?.trim() ? opts.fallbackHref : null;
}
