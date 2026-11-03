import { computeCompleteness } from './completeness';
import type { ExtranetCharterAcceptanceRow, ExtranetDocumentRow, ExtranetTrainerRow } from './types';

export type TrainerAdminSummary = {
  trainer: ExtranetTrainerRow;
  completenessPercent: number;
  cvOk: boolean;
  charteOk: boolean;
  docsPending: number;
};

export function summarizeTrainerForAdmin(
  trainer: ExtranetTrainerRow,
  docs: ExtranetDocumentRow[],
  charterAccepted: boolean
): TrainerAdminSummary {
  const completeness = computeCompleteness(trainer, docs, charterAccepted);
  const cv = docs.find((d) => d.doc_type === 'cv' && d.status !== 'superseded');
  return {
    trainer,
    completenessPercent: completeness.percent,
    cvOk: cv?.status === 'approved',
    charteOk: charterAccepted,
    docsPending: docs.filter((d) => d.status === 'pending').length,
  };
}
