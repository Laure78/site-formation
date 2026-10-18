/**
 * Section « Formations IA disponibles » — progression pédagogique en 2 niveaux.
 * Classement : champ `niveau` de `data/formations.ts` (source de vérité).
 */
import type { FormationNiveau } from '@/data/formations';
import { getFormationByCode } from '@/data/formations';
import {
  getFormationsCatalogue,
  sortFormationsCatalogue,
  type FormationCatalogueEntry,
} from '@/lib/formations-catalogue-display';
import { FORMATIONS_NIVEAUX_IA } from '@/lib/formations-niveaux-ia';

export type FormationsIaNiveauSection = {
  niveau: FormationNiveau;
  anchorId: string;
  anchorNavLabel: string;
  heading: string;
  description: string;
  publicLabel: string;
  usages: readonly string[];
};

export const FORMATIONS_IA_NIVEAU_SECTIONS: readonly FormationsIaNiveauSection[] =
  FORMATIONS_NIVEAUX_IA.map((n) => ({
    niveau: n.niveau,
    anchorId: n.anchorId,
    anchorNavLabel: n.labelComplet,
    heading: n.sectionHeading,
    description: n.objectif,
    publicLabel: n.publicCible,
    usages: [] as readonly string[],
  }));

function refSortKey(ref: string): number {
  return parseInt(ref.replace(/\D/g, ''), 10) || 0;
}

export function getFormationsIaDisponiblesByNiveau(
  at: Date = new Date(),
): Record<FormationNiveau, FormationCatalogueEntry[]> {
  const sorted = sortFormationsCatalogue(getFormationsCatalogue(at));
  const grouped: Record<FormationNiveau, FormationCatalogueEntry[]> = {
    1: [],
    2: [],
    3: [],
  };

  for (const entry of sorted) {
    const raw = getFormationByCode(entry.ref)?.niveau;
    const niveau = raw === 1 ? 1 : raw === 2 || raw === 3 ? 2 : undefined;
    if (niveau === 1 || niveau === 2) {
      grouped[niveau].push(entry);
    }
  }

  for (const n of [1, 2] as const) {
    grouped[n].sort((a, b) => refSortKey(a.ref) - refSortKey(b.ref));
  }

  return grouped;
}
