import type {
  RecruitmentLegalStatus,
  RecruitmentModality,
  RecruitmentSource,
  RecruitmentStatus,
} from '@/lib/recruitment/constants';

export type RecruitmentCandidatRow = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  legal_status: RecruitmentLegalStatus | null;
  siret: string | null;
  nda: string | null;
  btp_background: string | null;
  ai_usage: string | null;
  availability_notes: string | null;
  source: RecruitmentSource | null;
  formations: string[];
  stage: 1 | 2;
  interview_at: string | null;
  interview_modality: RecruitmentModality | null;
  zoom_link: string | null;
  zoom_id: string | null;
  zoom_passcode: string | null;
  status: RecruitmentStatus;
  last_contact_at: string | null;
  career_application_id: string | null;
  is_example: boolean;
  created_at: string;
  updated_at: string;
};

export type RecruitmentNoteRow = {
  id: string;
  candidat_id: string;
  body: string;
  created_at: string;
  created_by: string | null;
};

export type RecruitmentEvaluationRow = {
  id: string;
  candidat_id: string;
  stage: 1 | 2;
  scores: Record<string, number>;
  strengths: string | null;
  vigilance: string | null;
  decision: string | null;
  cas_pratique_subject: string | null;
  evaluator_id: string | null;
  created_at: string;
  updated_at: string;
};
