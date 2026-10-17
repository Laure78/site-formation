import type { CatalogueProgramModule } from '@/lib/catalogue-formation-page-content';
import type {
  DevWebIaModule,
  DevWebIaProgrammeModule,
} from '@/lib/formation-developpement-web-ia-content';

export function mapDevWebProgrammeModuleToCatalogue(
  mod: DevWebIaProgrammeModule,
): CatalogueProgramModule {
  const points = [...mod.activities];
  if (mod.examples?.length) {
    points.push(`Exemples : ${mod.examples.join(', ')}`);
  }
  if (mod.filRougeSteps?.length && mod.filRougeLabel) {
    points.push(mod.filRougeLabel);
  }
  if (mod.processExample?.length) {
    points.push(...mod.processExample);
  }
  return {
    title: `Étape ${mod.number} — ${mod.title}`,
    competence: mod.objective,
    points,
    practice: `Production attendue — ${mod.result}`,
  };
}

export function mapDevWebJour2ModuleToCatalogue(mod: DevWebIaModule): CatalogueProgramModule {
  const points = [...mod.points];
  if (mod.flow?.length) {
    points.push(`Enchaînement : ${mod.flow.join(' → ')}`);
  }
  if (mod.useCaseItems?.length) {
    if (mod.useCaseIntro) points.push(mod.useCaseIntro);
    points.push(...mod.useCaseItems.map((i) => `• ${i}`));
  }
  return {
    title: `Jour 2 — Étape ${mod.number} — ${mod.title}`,
    competence: mod.objective,
    points,
    practice: mod.result ? `Production attendue — ${mod.result}` : undefined,
  };
}
