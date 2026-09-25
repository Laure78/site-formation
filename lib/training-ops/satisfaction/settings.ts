import { createAdminClient } from '@/lib/supabase/admin';
import { QUESTIONNAIRE_SATISFACTION_URL } from '@/lib/questionnaire-satisfaction';
import { SCHEMA_GOOGLE_REVIEW_SUBMIT_URL } from '@/lib/schema-constants';
import type { EmailTemplateKey, SatisfactionSettings } from '@/lib/training-ops/satisfaction/types';
import { OFC_IDENTITE } from '@/lib/ofc-identite';

export async function getSatisfactionSettings(): Promise<SatisfactionSettings> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('training_satisfaction_settings')
    .select('*')
    .eq('id', 1)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error('Paramètres satisfaction introuvables');
  return data as SatisfactionSettings;
}

export function getQuestionnairePublicUrl(settings: SatisfactionSettings): string {
  return settings.questionnaire_public_url?.trim() || QUESTIONNAIRE_SATISFACTION_URL;
}

export function getGoogleReviewUrl(settings: SatisfactionSettings): string {
  return settings.google_review_url?.trim() || SCHEMA_GOOGLE_REVIEW_SUBMIT_URL;
}

export type EmailTemplateRow = {
  template_key: EmailTemplateKey;
  subject: string;
  body_html: string;
  body_text: string;
  is_active: boolean;
};

export async function getEmailTemplate(key: EmailTemplateKey): Promise<EmailTemplateRow> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('training_satisfaction_email_templates')
    .select('*')
    .eq('template_key', key)
    .single();
  if (error) throw new Error(error.message);
  return data as EmailTemplateRow;
}

export async function listEmailTemplates(): Promise<EmailTemplateRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('training_satisfaction_email_templates')
    .select('*')
    .order('template_key');
  if (error) throw new Error(error.message);
  return (data ?? []) as EmailTemplateRow[];
}

export type TemplateVars = {
  prenom: string;
  nom: string;
  formation: string;
  date_formation: string;
  formateur: string;
  organisme: string;
  lien_questionnaire: string;
  lien_google: string;
  email_contact: string;
};

export function applyTemplateVars(template: string, vars: TemplateVars): string {
  let out = template;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replaceAll(`{{${key}}}`, value);
  }
  return out;
}

export function defaultOrganismeLabel(): string {
  return OFC_IDENTITE.raisonSociale;
}
