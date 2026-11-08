import type { CatalogueModule } from '@/data/catalogue-2027';
import { ParcoursModuleProgrammeDetail } from './ParcoursModuleProgrammeDetail';

type Props = {
  mod: CatalogueModule;
};

/**
 * @deprecated Préférer `ParcoursModuleProgrammeDetail` avec l’étape parcours (exercice / livrable métier).
 */
export function ParcoursModuleProgrammeBlock({ mod }: Props) {
  return (
    <ParcoursModuleProgrammeDetail
      mod={mod}
      etape={{
        moduleCode: mod.code,
        competence: '',
        exercice: mod.exercices[0] ?? 'Exercice professionnel en session (détail sur demande).',
        livrable: mod.livrables[0] ?? 'Livrable défini en fin de module.',
      }}
    />
  );
}
