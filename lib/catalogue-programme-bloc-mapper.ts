import type { ProgrammeFormationBloc } from '@/components/formations/catalogue/ProgrammeFormationBlocs';
import type { CatalogueProgramModule } from '@/lib/catalogue-formation-page-content';

/** Convertit un bloc programme détaillé en module accordéon fiche catalogue. */
export function mapProgrammeBlocToCatalogueModule(
  bloc: ProgrammeFormationBloc,
): CatalogueProgramModule {
  const exerciceIndex = bloc.objectifs.findIndex((o) => /^Exercice\s*:/i.test(o));
  const objectifs =
    exerciceIndex >= 0
      ? bloc.objectifs.filter((_, index) => index !== exerciceIndex)
      : [...bloc.objectifs];
  const exerciceLine =
    exerciceIndex >= 0 ? bloc.objectifs[exerciceIndex]!.replace(/^Exercice\s*:\s*/i, '') : undefined;

  const points = [...objectifs];
  if (bloc.controlesHumains) {
    points.push(`Contrôle humain : ${bloc.controlesHumains}`);
  }
  if (bloc.critereEvaluation) {
    points.push(`Critère d’évaluation : ${bloc.critereEvaluation}`);
  }

  let practice = exerciceLine;
  if (!practice && bloc.livrable) {
    practice = `Production attendue — ${bloc.livrable}`;
  }

  const title = bloc.meta ? `${bloc.heading} — ${bloc.meta}` : bloc.heading;

  return {
    title,
    competence: bloc.objective,
    points,
    practice,
  };
}

export function mapProgrammeBlocsToCatalogueModules(
  blocs: readonly ProgrammeFormationBloc[],
): CatalogueProgramModule[] {
  return blocs.map(mapProgrammeBlocToCatalogueModule);
}
