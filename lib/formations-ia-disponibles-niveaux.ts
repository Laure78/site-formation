/**
 * Section « Formations IA disponibles » — progression pédagogique en 3 niveaux.
 * Classement : champ `niveau` de `data/formations.ts` (source de vérité).
 */
import type { FormationNiveau } from '@/data/formations';
import { getFormationByCode } from '@/data/formations';
import {
  getFormationsCatalogue,
  sortFormationsCatalogue,
  type FormationCatalogueEntry,
} from '@/lib/formations-catalogue-display';

export type FormationsIaNiveauSection = {
  niveau: FormationNiveau;
  anchorId: string;
  anchorNavLabel: string;
  heading: string;
  description: string;
  publicLabel: string;
  usages: readonly string[];
};

export const FORMATIONS_IA_NIVEAU_SECTIONS: readonly FormationsIaNiveauSection[] = [
  {
    niveau: 1,
    anchorId: 'catalogue-niveau-1',
    anchorNavLabel: 'Niveau 1 — Découvrir',
    heading: 'Niveau 1 — Découvrir et prendre en main l’IA',
    description:
      'Comprendre les bases et utiliser l’IA pour vos premières tâches professionnelles.',
    publicLabel: 'Pour les débutants et les utilisateurs occasionnels.',
    usages: [
      'Premières demandes à l’IA',
      'Rédaction de mails',
      'Synthèses simples',
    ],
  },
  {
    niveau: 2,
    anchorId: 'catalogue-niveau-2',
    anchorNavLabel: 'Niveau 2 — Appliquer',
    heading: 'Niveau 2 — Appliquer l’IA à son métier',
    description:
      'Utiliser l’IA sur vos documents et vos tâches quotidiennes dans le BTP.',
    publicLabel: 'Pour les utilisateurs qui maîtrisent les bases.',
    usages: [
      'Devis et appels d’offres',
      'CCTP et mémoires techniques',
      'Comptes rendus et organisation de chantier',
    ],
  },
  {
    niveau: 3,
    anchorId: 'catalogue-niveau-3',
    anchorNavLabel: 'Niveau 3 — Créer',
    heading: 'Niveau 3 — Créer ses assistants et ses outils',
    description:
      'Concevoir des assistants métier et des outils adaptés à votre entreprise.',
    publicLabel: 'Pour les utilisateurs autonomes qui souhaitent personnaliser leurs usages.',
    usages: [
      'Assistants personnalisés',
      'Workflows métier',
      'Outils de gestion sur mesure',
    ],
  },
] as const;

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
    const niveau = getFormationByCode(entry.ref)?.niveau;
    if (niveau === 1 || niveau === 2 || niveau === 3) {
      grouped[niveau].push(entry);
    }
  }

  for (const n of [1, 2, 3] as const) {
    grouped[n].sort((a, b) => refSortKey(a.ref) - refSortKey(b.ref));
  }

  return grouped;
}
