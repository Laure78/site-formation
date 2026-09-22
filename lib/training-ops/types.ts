/** Types du cockpit opérationnel des formations. */

export type TrainingModality = 'presentiel' | 'distanciel' | 'hybride';

export type TrainingSessionStatus =
  | 'brouillon'
  | 'a_preparer'
  | 'planifiee'
  | 'en_cours'
  | 'terminee'
  | 'cloturee'
  | 'annulee';

export type ChecklistItemStatus =
  | 'a_faire'
  | 'en_attente'
  | 'incomplet'
  | 'complet'
  | 'non_applicable';

export type DocumentCategory =
  | 'convention'
  | 'programme'
  | 'convocation'
  | 'emargement'
  | 'evaluation'
  | 'bilan_formateur'
  | 'attestation'
  | 'certificat'
  | 'facture'
  | 'document_client'
  | 'autre';

export type DocumentStatus =
  | 'brouillon'
  | 'a_generer'
  | 'genere'
  | 'a_envoyer'
  | 'envoye'
  | 'telecharge'
  | 'archive'
  | 'non_applicable';

export type AttendanceStatus = 'present' | 'absent' | 'partiel';

export type CertificateStatus = 'a_generer' | 'generee' | 'telechargee' | 'envoyee';

export type ResourceType =
  | 'support_principal'
  | 'presentation'
  | 'exercices'
  | 'prompts'
  | 'cas_pratiques'
  | 'pdf'
  | 'excel'
  | 'lien'
  | 'video'
  | 'autre';

export type TrainingProgram = {
  id: string;
  catalogue_code: string | null;
  course_id: string | null;
  title: string;
  slug: string | null;
  default_duration_hours: number | null;
  default_modality: TrainingModality;
  reference_prefix: string;
  description: string | null;
  is_active: boolean;
};

export type TrainingCompany = {
  id: string;
  name: string;
  siret: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  notes: string | null;
};

export type TrainingPerson = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  job_title: string | null;
  department: string | null;
  company_id: string | null;
  profile_id: string | null;
};

export type TrainingSession = {
  id: string;
  reference: string;
  program_id: string;
  company_id: string | null;
  name: string;
  status: TrainingSessionStatus;
  modality: TrainingModality;
  starts_on: string | null;
  ends_on: string | null;
  schedule_text: string | null;
  duration_hours: number | null;
  days_count: number | null;
  location_address: string | null;
  location_city: string | null;
  meeting_url: string | null;
  max_participants: number | null;
  company_contact_name: string | null;
  company_contact_email: string | null;
  company_contact_phone: string | null;
  internal_notes: string | null;
  primary_trainer_id: string | null;
  archived_at: string | null;
  closed_at: string | null;
  force_close_reason: string | null;
  created_at: string;
  updated_at: string;
};

export type SessionListRow = TrainingSession & {
  program_title: string | null;
  catalogue_code: string | null;
  company_name: string | null;
  trainer_name: string | null;
  participants_count: number;
  documents_count: number;
};

export type SessionTabId =
  | 'overview'
  | 'participants'
  | 'planning'
  | 'supports'
  | 'documents'
  | 'emargements'
  | 'evaluations'
  | 'bilan'
  | 'attestations'
  | 'suivi'
  | 'historique';
