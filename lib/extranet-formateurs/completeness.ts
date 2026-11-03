import {
  DOC_TYPE_LABELS,
  requiredDocTypesForTrainer,
  type ExtranetDocType,
  type TrainerDocRequirements,
} from './document-types';
import type { ExtranetDocumentRow, ExtranetTrainerRow } from './types';

export type CompletenessItem = {
  docType: ExtranetDocType;
  label: string;
  state: 'missing' | 'pending' | 'approved' | 'rejected' | 'expired';
  documentId?: string;
};

export type DashboardCompleteness = {
  percent: number;
  items: CompletenessItem[];
  missingCount: number;
  pendingCount: number;
};

function latestByType(docs: ExtranetDocumentRow[]): Map<ExtranetDocType, ExtranetDocumentRow> {
  const map = new Map<ExtranetDocType, ExtranetDocumentRow>();
  for (const d of docs) {
    if (d.status === 'superseded') continue;
    const prev = map.get(d.doc_type);
    if (!prev || d.version > prev.version) {
      map.set(d.doc_type, d);
    }
  }
  return map;
}

export function computeCompleteness(
  trainer: Pick<
    ExtranetTrainerRow,
    | 'requires_urssaf_vigilance'
    | 'requires_rc_pro'
    | 'requires_qualiopi_certificate'
    | 'requires_pedagogy_proof'
    | 'nda_status'
    | 'btp_experience_summary'
    | 'ia_tools_summary'
  >,
  docs: ExtranetDocumentRow[],
  charterAccepted: boolean
): DashboardCompleteness {
  const req: TrainerDocRequirements = {
    requires_urssaf_vigilance: trainer.requires_urssaf_vigilance,
    requires_rc_pro: trainer.requires_rc_pro,
    requires_qualiopi_certificate: trainer.requires_qualiopi_certificate,
    requires_pedagogy_proof: trainer.requires_pedagogy_proof,
    nda_status: trainer.nda_status,
  };

  const requiredTypes = requiredDocTypesForTrainer(req);
  const byType = latestByType(docs);

  const items: CompletenessItem[] = requiredTypes.map((docType) => {
    const doc = byType.get(docType);
    if (!doc) {
      return { docType, label: DOC_TYPE_LABELS[docType], state: 'missing' };
    }
    let state: CompletenessItem['state'] = 'pending';
    if (doc.status === 'approved') state = 'approved';
    else if (doc.status === 'rejected') state = 'rejected';
    else if (doc.status === 'expired') state = 'expired';
    else state = 'pending';
    return { docType, label: DOC_TYPE_LABELS[docType], state, documentId: doc.id };
  });

  const profileFields = [
    trainer.btp_experience_summary?.trim(),
    trainer.ia_tools_summary?.trim(),
  ].filter(Boolean).length;

  const profileSlots = 2;
  const profileScore = profileFields / profileSlots;

  const docApproved = items.filter((i) => i.state === 'approved').length;
  const docTotal = items.length || 1;
  const charterScore = charterAccepted ? 1 : 0;

  const percent = Math.round(
    ((docApproved / docTotal) * 0.7 + profileScore * 0.15 + charterScore * 0.15) * 100
  );

  return {
    percent: Math.min(100, Math.max(0, percent)),
    items,
    missingCount: items.filter((i) => i.state === 'missing').length,
    pendingCount: items.filter((i) => i.state === 'pending').length,
  };
}
