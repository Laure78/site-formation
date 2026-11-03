import type { ExtranetDocStatus, ExtranetDocType, ExtranetNdaStatus } from './document-types';

export type ExtranetTrainerStatus = 'invited' | 'onboarding' | 'active' | 'suspended' | 'archived';

export type ExtranetAdminValidationStatus = 'pending' | 'in_review' | 'approved' | 'blocked';

export type ExtranetTrainerRow = {
  id: string;
  user_id: string | null;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  specialty: string | null;
  siret: string | null;
  siren: string | null;
  company_name: string | null;
  nda_number: string | null;
  nda_status: ExtranetNdaStatus;
  first_contract_at: string | null;
  nda_declaration_deadline: string | null;
  status: ExtranetTrainerStatus;
  requires_urssaf_vigilance: boolean;
  requires_rc_pro: boolean;
  requires_qualiopi_certificate: boolean;
  requires_pedagogy_proof: boolean;
  btp_experience_years: number | null;
  btp_experience_summary: string | null;
  ia_tools_summary: string | null;
  pedagogy_summary: string | null;
  admin_validation_status: ExtranetAdminValidationStatus;
  admin_notes: string | null;
  invited_at: string;
  activated_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ExtranetDocumentRow = {
  id: string;
  trainer_id: string;
  doc_type: ExtranetDocType;
  storage_path: string;
  original_filename: string;
  mime_type: string | null;
  file_size_bytes: number | null;
  version: number;
  expires_at: string | null;
  status: ExtranetDocStatus;
  admin_comment: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  uploaded_at: string;
  superseded_by: string | null;
  created_at: string;
};

export type ExtranetCharterVersionRow = {
  id: string;
  version_label: string;
  title: string;
  content_md: string;
  pdf_storage_path: string | null;
  published_at: string;
  is_current: boolean;
  created_at: string;
};

export type ExtranetCharterAcceptanceRow = {
  id: string;
  trainer_id: string;
  charter_version_id: string;
  accepted_at: string;
};
