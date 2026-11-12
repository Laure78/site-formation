import type { FormationNiveau } from '@/data/formations';

export function datesLieuxNiveauFilterLabel(niveau: FormationNiveau): string {
  if (niveau === 1) return 'Débutant';
  if (niveau === 2) return 'Avancé';
  return 'Approfondi';
}

export const DATES_LIEUX_NIVEAU_FILTER_OPTIONS = [
  { value: '1', label: 'Débutant' },
  { value: '2', label: 'Avancé' },
  { value: '3', label: 'Approfondi' },
] as const;
