/**
 * Contrôles qualité — programmes des 23 modules intégrés aux 5 parcours métiers.
 */
import {
  NIVEAU_PAR_MODULE,
  NIVEAU_LIBELLE,
  prixInterHtPourNiveau,
} from '../module-niveaux';
import type { ModuleCode, ModuleProgrammePedagogique, ProgrammeSequence } from '../types';
import { minutesPratiqueEstimees, partPratiquePourcent, sumSequencesMinutes } from './builders';
import {
  MODULE_PROGRAMMES_PARCOURS,
  PARCOURS_METIERS_PROGRAMME_CODES,
} from './programmes-parcours';

export { minutesPratiqueEstimees, partPratiquePourcent } from './builders';

export function assertProgrammesParcoursIntegrity(): {
  ok: boolean;
  errors: string[];
  modules: number;
} {
  const errors: string[] = [];
  const codes = [...PARCOURS_METIERS_PROGRAMME_CODES];

  if (codes.length !== 23) {
    errors.push(`Attendu 23 programmes parcours, trouvé ${codes.length}`);
  }

  for (const code of codes) {
    const prog = MODULE_PROGRAMMES_PARCOURS[code];
    if (!prog) {
      errors.push(`${code} : programme manquant`);
      continue;
    }
    assertProgrammeStructure(code, prog, errors);
  }

  return { ok: errors.length === 0, errors, modules: codes.length };
}

function assertProgrammeStructure(
  code: ModuleCode,
  prog: ModuleProgrammePedagogique,
  errors: string[],
): void {
  const refNiveau = NIVEAU_PAR_MODULE[code];
  if (prog.niveau !== refNiveau) {
    errors.push(`${code} : niveau programme ${prog.niveau} ≠ référentiel ${refNiveau}`);
  }

  const attenduPrix = prixInterHtPourNiveau(prog.niveau);
  if (prog.prixInterHt !== attenduPrix) {
    errors.push(`${code} : prix ${prog.prixInterHt} ≠ grille ${attenduPrix}`);
  }

  const attenduMinutes = prog.niveau === 3 ? 840 : 240;
  if (prog.dureeMinutes !== attenduMinutes) {
    errors.push(`${code} : dureeMinutes ${prog.dureeMinutes} ≠ ${attenduMinutes}`);
  }

  const sum = sumSequencesMinutes(prog.sequences);
  if (sum !== prog.dureeMinutes) {
    errors.push(`${code} : séquences = ${sum} min (attendu ${prog.dureeMinutes})`);
  }

  if (!prog.intitule?.trim()) errors.push(`${code} : intitulé manquant`);
  if (!prog.publicCible?.trim()) errors.push(`${code} : public cible manquant`);
  if (!prog.prerequis?.trim()) errors.push(`${code} : prérequis manquant`);
  if (!prog.exercicePratique?.trim()) errors.push(`${code} : exercice pratique manquant`);
  if (prog.objectifsMesurables.length < 3) {
    errors.push(`${code} : moins de 3 objectifs mesurables`);
  }
  if (prog.livrables.length < 1) errors.push(`${code} : aucun livrable`);
  if (!prog.evaluation.criteres.length) errors.push(`${code} : critères d’évaluation manquants`);
  if (!prog.verificationHumaineEtConfidentialite?.trim()) {
    errors.push(`${code} : confidentialité manquante`);
  }

  const ia = prog.usageIa;
  if (!ia?.outil || !ia.description || !ia.documents || !ia.controleHumain) {
    errors.push(`${code} : bloc usage IA incomplet`);
  }

  const pct = partPratiquePourcent(prog.sequences, prog.dureeMinutes);
  const seuil = prog.niveau === 3 ? 60 : 65;
  if (pct < seuil) {
    errors.push(`${code} : part pratique estimée ${pct} % (seuil ${seuil} %)`);
  }

  const ordres = prog.sequences.map((s) => s.ordre);
  if (new Set(ordres).size !== ordres.length) {
    errors.push(`${code} : numéros de séquence en double`);
  }
}

export function libelleStructureProgramme(): readonly string[] {
  return [
    'A. Intitulé et code',
    'B. Niveau, durée et tarif',
    'C. Public concerné et prérequis',
    'D. Objectifs pédagogiques mesurables',
    'E. Programme chronologique',
    'F. Exercice pratique',
    'G. Utilisation de l’IA',
    'H. Livrables professionnels',
    'I. Modalités et critères d’évaluation',
    'J. Validation humaine et confidentialité',
  ];
}

export function rapportProgrammeLigne(code: ModuleCode): {
  code: ModuleCode;
  niveau: string;
  minutes: number;
  pctPratique: number;
  ia: string;
  objectifs: number;
} {
  const p = MODULE_PROGRAMMES_PARCOURS[code]!;
  return {
    code,
    niveau: NIVEAU_LIBELLE[p.niveau],
    minutes: p.dureeMinutes,
    pctPratique: partPratiquePourcent(p.sequences, p.dureeMinutes),
    ia: p.usageIa.outil,
    objectifs: p.objectifsMesurables.length,
  };
}
