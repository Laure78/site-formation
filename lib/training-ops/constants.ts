import type {
  ChecklistItemStatus,
  DocumentCategory,
  TrainingModality,
  TrainingSessionStatus,
} from '@/lib/training-ops/types';

export const SESSION_STATUS_LABELS: Record<TrainingSessionStatus, string> = {
  brouillon: 'Brouillon',
  a_preparer: 'À préparer',
  planifiee: 'Planifiée',
  en_cours: 'En cours',
  terminee: 'Terminée',
  cloturee: 'Clôturée',
  annulee: 'Annulée',
};

export const SESSION_STATUS_TONES: Record<
  TrainingSessionStatus,
  'slate' | 'amber' | 'blue' | 'emerald' | 'violet' | 'red'
> = {
  brouillon: 'slate',
  a_preparer: 'amber',
  planifiee: 'blue',
  en_cours: 'violet',
  terminee: 'emerald',
  cloturee: 'slate',
  annulee: 'red',
};

export const MODALITY_LABELS: Record<TrainingModality, string> = {
  presentiel: 'Présentiel',
  distanciel: 'Distanciel',
  hybride: 'Hybride',
};

export const CHECKLIST_STATUS_LABELS: Record<ChecklistItemStatus, string> = {
  a_faire: 'À faire',
  en_attente: 'En attente',
  incomplet: 'Incomplet',
  complet: 'Complet',
  non_applicable: 'Non applicable',
};

export const DOCUMENT_CATEGORY_LABELS: Record<DocumentCategory, string> = {
  convention: 'Convention',
  programme: 'Programme',
  convocation: 'Convocation',
  emargement: 'Feuille d’émargement',
  evaluation: 'Évaluation',
  bilan_formateur: 'Bilan formateur',
  attestation: 'Attestation',
  certificat: 'Certificat',
  facture: 'Facture',
  document_client: 'Document client',
  autre: 'Autre document',
};

export const SESSION_TABS = [
  { id: 'overview', label: 'Vue d’ensemble' },
  { id: 'participants', label: 'Participants' },
  { id: 'planning', label: 'Planning' },
  { id: 'supports', label: 'Supports' },
  { id: 'documents', label: 'Documents' },
  { id: 'emargements', label: 'Émargements' },
  { id: 'evaluations', label: 'Évaluations' },
  { id: 'bilan', label: 'Bilan formateur' },
  { id: 'attestations', label: 'Attestations' },
  { id: 'suivi', label: 'Suivi administratif' },
  { id: 'historique', label: 'Historique' },
] as const;
