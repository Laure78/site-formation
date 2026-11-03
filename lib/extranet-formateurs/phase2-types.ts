export type ExtranetResourceType =
  | 'presentation'
  | 'guide'
  | 'exercise'
  | 'prompt'
  | 'metier_document'
  | 'case_study'
  | 'evaluation_grid'
  | 'correction'
  | 'other';

export const RESOURCE_TYPE_LABELS: Record<ExtranetResourceType, string> = {
  presentation: 'Présentation',
  guide: 'Guide',
  exercise: 'Exercice',
  prompt: 'Prompt',
  metier_document: 'Document métier BTP',
  case_study: 'Étude de cas',
  evaluation_grid: 'Grille d’évaluation',
  correction: 'Corrigé',
  other: 'Autre',
};

export type ExtranetMissionStatus =
  | 'draft'
  | 'assigned'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export const MISSION_STATUS_LABELS: Record<ExtranetMissionStatus, string> = {
  draft: 'Brouillon',
  assigned: 'Attribuée',
  confirmed: 'Confirmée',
  in_progress: 'En cours',
  completed: 'Terminée',
  cancelled: 'Annulée',
};

export type ExtranetProgramRow = {
  id: string;
  title: string;
  slug: string;
  catalogue_code: string | null;
  training_program_id: string | null;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
};

export type ExtranetProgramVersionRow = {
  id: string;
  program_id: string;
  version_label: string;
  objectives_md: string;
  audience: string;
  prerequisites: string;
  duration_hours: number | null;
  schedule_md: string;
  methods_md: string;
  evaluation_md: string;
  adaptations_md: string;
  is_current: boolean;
  published_at: string;
  published_by: string | null;
  created_at: string;
};

export type ExtranetTrainerResourceRow = {
  id: string;
  program_id: string | null;
  title: string;
  resource_type: ExtranetResourceType;
  description: string | null;
  storage_path: string;
  original_filename: string;
  mime_type: string | null;
  file_size_bytes: number | null;
  version_label: string;
  is_archived: boolean;
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
};

export type ExtranetMissionRow = {
  id: string;
  trainer_id: string;
  program_version_id: string;
  training_session_id: string | null;
  title: string;
  status: ExtranetMissionStatus;
  modality: string;
  starts_on: string;
  ends_on: string | null;
  schedule_text: string | null;
  duration_hours: number | null;
  location_name: string | null;
  location_address: string | null;
  location_city: string | null;
  client_company_name: string | null;
  pedagogical_brief: string | null;
  administrative_brief: string | null;
  preparation_confirmed_at: string | null;
  mission_order_storage_path: string | null;
  trainer_report: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type ExtranetMissionDocumentRow = {
  id: string;
  mission_id: string;
  trainer_id: string;
  doc_kind: string;
  storage_path: string;
  original_filename: string;
  mime_type: string | null;
  uploaded_at: string;
  uploaded_by: string | null;
};
