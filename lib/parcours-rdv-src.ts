import type { ParcoursId } from '@/data/catalogue-2027';

/** `?src=` visio — parcours conducteur / MOE (suivi C1). */
export const PARCOURS_VISIO_SRC: Partial<Record<ParcoursId, string>> = {
  'conducteur-de-travaux': 'parcours-conducteur',
  'maitre-oeuvre': 'parcours-moe',
};