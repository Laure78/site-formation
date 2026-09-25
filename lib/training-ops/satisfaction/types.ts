export const QUESTIONNAIRE_STATUSES = [
  'a_envoyer',
  'programme',
  'envoye',
  'a_relancer',
  'relance_1_envoyee',
  'relance_2_envoyee',
  'complete',
  'sans_reponse',
  'desactive',
  'echec_envoi',
] as const;

export type QuestionnaireStatus = (typeof QUESTIONNAIRE_STATUSES)[number];

export const GOOGLE_STATUSES = [
  'non_eligible',
  'a_programmer',
  'programme',
  'envoye',
  'relance_envoyee',
  'termine',
  'desactive',
  'echec_envoi',
] as const;

export type GoogleStatus = (typeof GOOGLE_STATUSES)[number];

export const EMAIL_KINDS = [
  'questionnaire_initial',
  'questionnaire_reminder_1',
  'questionnaire_reminder_2',
  'google_initial',
  'google_reminder_1',
] as const;

export type SatisfactionEmailKind = (typeof EMAIL_KINDS)[number];

export type SatisfactionSettings = {
  id: number;
  questionnaire_auto_enabled: boolean;
  questionnaire_first_send_days: number;
  questionnaire_reminder_1_days: number;
  questionnaire_reminder_2_days: number;
  questionnaire_max_reminders: number;
  google_auto_enabled: boolean;
  google_delay_after_complete_days: number;
  google_reminder_days: number;
  google_max_reminders: number;
  google_review_url: string;
  questionnaire_public_url: string | null;
  email_from_name: string;
  email_from_address: string | null;
  email_reply_to: string;
  updated_at: string;
};

export type EmailTemplateKey =
  | 'questionnaire_initial'
  | 'questionnaire_reminder'
  | 'google_initial'
  | 'google_reminder';

export type ParticipantSatisfactionRow = {
  id: string;
  session_participant_id: string;
  session_id: string;
  session_ended_on: string | null;
  questionnaire_status: QuestionnaireStatus;
  questionnaire_reminder_count: number;
  questionnaire_first_sent_at: string | null;
  questionnaire_last_sent_at: string | null;
  questionnaire_completed_at: string | null;
  questionnaire_score: number | null;
  questionnaire_next_action_at: string | null;
  questionnaire_disabled: boolean;
  google_status: GoogleStatus;
  google_reminder_count: number;
  google_first_sent_at: string | null;
  google_last_sent_at: string | null;
  google_completed_at: string | null;
  google_next_action_at: string | null;
  google_disabled: boolean;
  access_token: string;
  created_at: string;
  updated_at: string;
};
