/**
 * Index module → parcours (dérivé de PARCOURS_CATALOGUE_2027, sans duplication des listes).
 */
import { PARCOURS_CATALOGUE_2027 } from './parcours-data';
import type { ModuleCode, ParcoursId } from './types';

let parcoursIdsByModule: Map<ModuleCode, ParcoursId[]> | null = null;

export function getParcoursIdsPourModule(code: ModuleCode): readonly ParcoursId[] {
  if (!parcoursIdsByModule) {
    parcoursIdsByModule = new Map();
    for (const p of PARCOURS_CATALOGUE_2027) {
      for (const e of p.etapes) {
        const list = parcoursIdsByModule.get(e.moduleCode) ?? [];
        if (!list.includes(p.id)) list.push(p.id);
        parcoursIdsByModule.set(e.moduleCode, list);
      }
    }
  }
  return parcoursIdsByModule.get(code) ?? [];
}
