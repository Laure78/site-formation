/**
 * Parsing durées et livrables — modules programme catalogue (affichage + audit).
 */
import type { CatalogueProgramModule } from '@/lib/catalogue-formation-page-content';

const LIVRABLE_POINT = /^Livrable\s*:\s*(.+)$/iu;

export function parseDurationFromModuleTitle(title: string): string | null {
  const paren = title.match(/\(([^)]+)\)\s*$/);
  if (paren) return paren[1].trim();
  const emDash = title.match(/[—–-]\s*([^—–-]+)$/);
  return emDash ? emDash[1].trim() : null;
}

/** Convertit « 45 min », « 1 h 10 », « 60 min » en minutes (null si non parseable). */
export function parseDurationToMinutes(raw: string): number | null {
  const s = raw.trim().toLowerCase();
  const hMin = s.match(/^(\d+)\s*h(?:\s*(\d+))?/);
  if (hMin) {
    const h = Number(hMin[1]);
    const m = hMin[2] ? Number(hMin[2]) : 0;
    return h * 60 + m;
  }
  const minOnly = s.match(/^(\d+)\s*min/);
  if (minOnly) return Number(minOnly[1]);
  return null;
}

export function formatDurationMinutesLabel(raw: string): string {
  const minutes = parseDurationToMinutes(raw);
  if (minutes != null) return `Durée : ${minutes} minutes`;
  if (raw.trim()) return `Durée : ${raw.trim()}`;
  return '';
}

export function stripModuleHeading(title: string): string {
  const withoutParen = title.replace(/\s*\([^)]+\)\s*$/, '').trim();
  const withoutMeta = withoutParen.replace(/[—–-]\s*[^—–-]+$/, '').trim();
  return (
    withoutMeta
      .replace(/^MODULE\s+\d+\s*[—–-]\s*/i, '')
      .replace(/^Module\s+\d+\s*[—–-]\s*/i, '')
      .trim() || withoutParen
  );
}

export function splitModulePoints(points: readonly string[]): {
  body: string[];
  livrable?: string;
} {
  const body: string[] = [];
  let livrable: string | undefined;
  for (const p of points) {
    const m = p.match(LIVRABLE_POINT);
    if (m) livrable = m[1].trim();
    else body.push(p);
  }
  return { body, livrable };
}

export type ProgrammeModuleCard = {
  numero: string;
  titre: string;
  dureeRaw: string;
  dureeLabel: string;
  points: string[];
  competence?: string;
  practice?: string;
  livrable?: string;
};

export function isTeachingModuleTitle(title: string): boolean {
  return /^MODULE\s+\d/i.test(title) || /^Module\s+\d/i.test(title);
}

export function getTeachingModules(modules: readonly CatalogueProgramModule[]): CatalogueProgramModule[] {
  const teaching = modules.filter((m) => isTeachingModuleTitle(m.title));
  return teaching.length > 0 ? teaching : [...modules];
}

export function buildProgrammeModuleCards(
  modules: readonly CatalogueProgramModule[],
  fixedLabels?: readonly string[],
  maxPointsPerModule?: number,
): ProgrammeModuleCard[] {
  const teaching = getTeachingModules(modules);
  const count = fixedLabels?.length ?? teaching.length;

  return Array.from({ length: count }, (_, index) => {
    const mod = teaching[index];
    const dureeRaw = mod ? (parseDurationFromModuleTitle(mod.title) ?? '') : '';
    const { body, livrable: livrableFromPoints } = mod
      ? splitModulePoints(mod.points)
      : { body: [] as string[] };
    const titre =
      fixedLabels?.[index] ?? (mod ? stripModuleHeading(mod.title) : `Module ${index + 1}`);
    const points =
      mod && maxPointsPerModule != null && maxPointsPerModule > 0
        ? body.slice(0, maxPointsPerModule)
        : mod
          ? body
          : [];
    return {
      numero: String(index + 1).padStart(2, '0'),
      titre,
      dureeRaw,
      dureeLabel: formatDurationMinutesLabel(dureeRaw),
      points,
      competence: mod?.competence,
      practice: mod?.practice,
      livrable: mod?.deliverable ?? livrableFromPoints,
    };
  });
}

/** Somme des durées déclarées dans les titres de modules (minutes). */
export function sumProgrammeModulesMinutes(modules: readonly CatalogueProgramModule[]): number {
  let total = 0;
  for (const mod of modules) {
    const raw = parseDurationFromModuleTitle(mod.title);
    if (!raw) continue;
    const min = parseDurationToMinutes(raw);
    if (min != null) total += min;
  }
  return total;
}
