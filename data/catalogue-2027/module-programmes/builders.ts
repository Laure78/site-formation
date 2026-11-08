/**
 * Construction et validation des programmes modules parcours métiers.
 */
import type { ModuleCode, ModuleProgrammePedagogique, ProgrammeSequence } from '../types';

const CONFIDENTIALITE_STANDARD =
  'Documents BTP réalistes et anonymisés uniquement. Validation humaine obligatoire pour calculs, prix, engagements contractuels et interprétations réglementaires. L’IA ne vérifie pas automatiquement la conformité juridique, Qualiopi ou AI Act.';

export { CONFIDENTIALITE_STANDARD };

export function sumSequencesMinutes(sequences: readonly ProgrammeSequence[]): number {
  return sequences.reduce((s, seq) => s + seq.minutes, 0);
}

type Programme4hInput = Omit<
  ModuleProgrammePedagogique,
  'code' | 'dureeMinutes' | 'niveau' | 'prixInterHt' | 'verificationHumaineEtConfidentialite'
> & {
  code: ModuleCode;
  niveau: 1 | 2;
  prixInterHt: number;
  verificationHumaineEtConfidentialite?: string;
};

export function buildProgramme4h(input: Programme4hInput): ModuleProgrammePedagogique {
  const total = sumSequencesMinutes(input.sequences);
  if (total !== 240) {
    throw new Error(`${input.code} : séquences = ${total} min (attendu 240)`);
  }
  return {
    ...input,
    dureeMinutes: 240,
    verificationHumaineEtConfidentialite:
      input.verificationHumaineEtConfidentialite ?? CONFIDENTIALITE_STANDARD,
  };
}

type Programme14hInput = Omit<
  ModuleProgrammePedagogique,
  'code' | 'dureeMinutes' | 'niveau' | 'prixInterHt' | 'verificationHumaineEtConfidentialite'
> & {
  code: ModuleCode;
  prixInterHt: number;
  verificationHumaineEtConfidentialite?: string;
};

export function buildProgramme14h(input: Programme14hInput): ModuleProgrammePedagogique {
  const total = sumSequencesMinutes(input.sequences);
  if (total !== 840) {
    throw new Error(`${input.code} : séquences = ${total} min (attendu 840)`);
  }
  return {
    ...input,
    niveau: 3,
    dureeMinutes: 840,
    verificationHumaineEtConfidentialite:
      input.verificationHumaineEtConfidentialite ?? CONFIDENTIALITE_STANDARD,
  };
}

/** Accueil type (15 min) — rappel positionnement et confidentialité. */
export function seqAccueil(minutes = 15): ProgrammeSequence {
  return {
    ordre: 1,
    titre: 'Accueil et cadrage',
    minutes,
    contenu:
      'Tour de table, rappel des objectifs, positionnement amont et règles de confidentialité (données anonymisées).',
  };
}

export function programmeVersChampsCatalogue(
  prog: ModuleProgrammePedagogique,
): Pick<
  import('../types').CatalogueModule,
  'programme' | 'programmeSequences' | 'objectifsMesurables' | 'exercices' | 'livrables' | 'evaluation' | 'objectifPrincipal'
> {
  return {
    objectifPrincipal: prog.objectifsMesurables[0] ?? prog.intitule,
    objectifsMesurables: prog.objectifsMesurables,
    programmeSequences: prog.sequences,
    programme: prog.sequences.map(
      (s) => `${String(s.ordre).padStart(2, '0')}. ${s.titre} (${s.minutes} min) — ${s.contenu}`,
    ),
    exercices: [prog.exercicePratique],
    livrables: [...prog.livrables],
    evaluation: `${prog.evaluation.modalites} Critères : ${prog.evaluation.criteres.join(' · ')}`,
  };
}
