/**
 * Programme catalogue NIV-10 — parcours 14 h (2 × 7 h hors pauses).
 * Jour 1 : séquences horaires validées (`DEV_WEB_IA_PROGRAM_MODULES`, source programmes-ofc-2026-10-17).
 * Jour 2 : contenu validé (`DEV_WEB_IA_MODULES_JOUR2`) — durées par séquence non publiées à ce jour.
 */
import type { CatalogueProgramModule } from '@/lib/catalogue-formation-page-content';
import {
  DEV_WEB_IA_MODULES_JOUR2,
  DEV_WEB_IA_PROGRAM_MODULES,
} from '@/lib/formation-developpement-web-ia-content';
import { mapDevWebJour2ModuleToCatalogue } from '@/lib/dev-web-catalogue-programme-modules';

/** Somme Jour 1 — accueil 15 + M1 1h15 + M2 1h30 + M3 2h15 + M4 1h30 + clôture 15 = 7 h. */
export const DEV_WEB_IA_JOUR1_DUREE_MINUTES = 15 + 75 + 90 + 135 + 90 + 15;

export function getDevWebIaCatalogueProgramModules14h(): readonly CatalogueProgramModule[] {
  const jour1: CatalogueProgramModule[] = DEV_WEB_IA_PROGRAM_MODULES.map((mod) => ({
    title: `Jour 1 — ${mod.title}`,
    points: [...mod.points],
  }));
  const jour2 = DEV_WEB_IA_MODULES_JOUR2.map(mapDevWebJour2ModuleToCatalogue);
  return [...jour1, ...jour2];
}
