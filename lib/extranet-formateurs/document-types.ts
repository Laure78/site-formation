/** Types de pièces — alignés sur la migration `extranet_trainer_documents.doc_type`. */

export type ExtranetDocType =
  | 'cv'
  | 'siret_proof'
  | 'btp_experience'
  | 'diploma_or_cert'
  | 'ia_competencies'
  | 'pedagogy_proof'
  | 'nda_proof'
  | 'subcontract_contract'
  | 'urssaf_vigilance'
  | 'rc_pro'
  | 'qualiopi_certificate'
  | 'other';

export type ExtranetDocStatus = 'pending' | 'approved' | 'rejected' | 'expired' | 'superseded';

export type ExtranetNdaStatus =
  | 'verified'
  | 'submitted_pending'
  | 'first_activity_pending'
  | 'to_review';

export const NDA_STATUS_LABELS: Record<ExtranetNdaStatus, string> = {
  verified: 'NDA obtenu et vérifié',
  submitted_pending: 'Déclaration déposée, en instruction',
  first_activity_pending: 'Première activité — déclaration à effectuer',
  to_review: 'Situation à examiner',
};

export const DOC_TYPE_LABELS: Record<ExtranetDocType, string> = {
  cv: 'CV actualisé',
  siret_proof: 'SIREN / SIRET et justificatif d’immatriculation',
  btp_experience: 'Justificatifs d’expérience professionnelle BTP',
  diploma_or_cert: 'Diplômes, attestations ou références',
  ia_competencies: 'Présentation des compétences IA',
  pedagogy_proof: 'Justificatifs de compétences pédagogiques',
  nda_proof: 'Justificatif de déclaration d’activité (NDA)',
  subcontract_contract: 'Contrat de sous-traitance',
  urssaf_vigilance: 'Attestation de vigilance URSSAF',
  rc_pro: 'Attestation RC professionnelle',
  qualiopi_certificate: 'Certificat Qualiopi (si requis)',
  other: 'Autre document',
};

export type TrainerDocRequirements = {
  requires_urssaf_vigilance: boolean;
  requires_rc_pro: boolean;
  requires_qualiopi_certificate: boolean;
  requires_pedagogy_proof: boolean;
  nda_status: ExtranetNdaStatus;
};

/** Pièces à collecter selon le profil (sans bloquer l’absence de NDA). */
export function requiredDocTypesForTrainer(t: TrainerDocRequirements): ExtranetDocType[] {
  const base: ExtranetDocType[] = [
    'cv',
    'siret_proof',
    'btp_experience',
    'ia_competencies',
    'subcontract_contract',
  ];

  if (t.nda_status === 'verified' || t.nda_status === 'submitted_pending') {
    base.push('nda_proof');
  }

  if (t.requires_pedagogy_proof) {
    base.push('pedagogy_proof');
  } else {
    // Optionnel mais recommandé — non compté comme manquant par défaut
  }

  if (t.requires_urssaf_vigilance) {
    base.push('urssaf_vigilance');
  }
  if (t.requires_rc_pro) {
    base.push('rc_pro');
  }
  if (t.requires_qualiopi_certificate) {
    base.push('qualiopi_certificate');
  }

  return base;
}

export const DOC_STATUS_LABELS: Record<ExtranetDocStatus, string> = {
  pending: 'En attente de validation',
  approved: 'Validé',
  rejected: 'Refusé',
  expired: 'Expiré',
  superseded: 'Remplacé',
};
