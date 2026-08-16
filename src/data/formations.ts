/**
 * @deprecated Prefer `@/data/formations` — conservé pour compatibilité imports historiques.
 */
export {
  FORMATIONS as formationsList,
  FORMATIONS,
  getFormationByCode,
  getFormationBySlug,
  type Formation,
  type FormationSlug,
} from '@/data/formations';

import {
  FORMATIONS,
  type FormationSlug,
} from '@/data/formations';

/** Shape historique (map par slug) — dérivée de FORMATIONS. */
export const formationsData = Object.fromEntries(
  FORMATIONS.map((f) => [
    f.slug,
    {
      name: f.titre,
      ref: f.code,
      level: f.niveau === 1 ? 'Débutant' : 'Avancé',
      duration: 'PT4H',
      price: f.prixHT,
      description: f.accroche,
    },
  ])
) as Record<
  FormationSlug,
  {
    name: string;
    ref: string;
    level: string;
    duration: string;
    price: number;
    description: string;
  }
>;
