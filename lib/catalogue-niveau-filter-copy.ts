/**
 * Libellés et descriptions — filtre principal par niveau sur `/formations`.
 */
import type { FormationNiveau } from '@/data/formations';
import { FORMATION_NIVEAU_OFFICIEL } from '@/lib/formation-niveaux-officiels';

export const CATALOGUE_FILTRE_TOUS_NIVEAUX_LABEL = 'Tous les niveaux' as const;

export const CATALOGUE_NIVEAU_PEDAGOGIE_DESCRIPTION: Readonly<
  Record<'all' | FormationNiveau, string>
> = {
  all: 'Parcourir l’ensemble des programmes IA du catalogue.',
  1: 'Découvrir les fondamentaux de l’IA.',
  2: 'Maîtriser les usages métier de l’IA.',
  3: 'Créer, automatiser et déployer des solutions IA.',
};

export function catalogueNiveauFiltreTitre(niveau: FormationNiveau): string {
  return FORMATION_NIVEAU_OFFICIEL[niveau];
}