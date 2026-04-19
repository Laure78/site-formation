import type { FormationIaMetierDynamicConfig } from '@/lib/formation-ia-metier-dynamic-types';

/**
 * Registre pour `app/formation-ia-[metier]-btp` — ajouter ici les métiers sans page statique dédiée.
 * L’électricien est servi par `app/formation-ia-electricien-btp/page.tsx`.
 */
export const FORMATION_IA_METIER_DYNAMIC_REGISTRY: Record<string, FormationIaMetierDynamicConfig> = {};

export function getFormationIaMetierDynamicConfig(slug: string) {
  return FORMATION_IA_METIER_DYNAMIC_REGISTRY[slug] ?? null;
}
