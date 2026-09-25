import { Resend } from 'resend';
import { CONTACT } from '@/lib/constants';
import type { EmailTemplateKey, SatisfactionEmailKind } from '@/lib/training-ops/satisfaction/types';
import {
  applyTemplateVars,
  defaultOrganismeLabel,
  getEmailTemplate,
  getGoogleReviewUrl,
  getQuestionnairePublicUrl,
  getSatisfactionSettings,
  type TemplateVars,
} from '@/lib/training-ops/satisfaction/settings';

function templateKeyForKind(kind: SatisfactionEmailKind): EmailTemplateKey {
  switch (kind) {
    case 'questionnaire_initial':
      return 'questionnaire_initial';
    case 'questionnaire_reminder_1':
    case 'questionnaire_reminder_2':
      return 'questionnaire_reminder';
    case 'google_initial':
      return 'google_initial';
    case 'google_reminder_1':
      return 'google_reminder';
    default:
      return 'questionnaire_initial';
  }
}

function fromAddress(settings: Awaited<ReturnType<typeof getSatisfactionSettings>>): string {
  const name = settings.email_from_name?.trim() || 'Laure Olivié';
  const addr =
    settings.email_from_address?.trim() ||
    process.env.EMAIL_FROM?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    'noreply@laureolivie.fr';
  return `${name} <${addr}>`;
}

export type SendParticipantEmailParams = {
  kind: SatisfactionEmailKind;
  to: string;
  vars: Omit<TemplateVars, 'lien_questionnaire' | 'lien_google' | 'organisme' | 'email_contact'>;
  questionnaireLink?: string;
};

export async function sendParticipantSatisfactionEmail(
  params: SendParticipantEmailParams,
): Promise<{ ok: true; messageId?: string } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: 'RESEND_API_KEY requis.' };

  const settings = await getSatisfactionSettings();
  const template = await getEmailTemplate(templateKeyForKind(params.kind));
  if (!template.is_active) {
    return { ok: false, error: 'Modèle email désactivé.' };
  }

  const fullVars: TemplateVars = {
    ...params.vars,
    organisme: defaultOrganismeLabel(),
    email_contact: settings.email_reply_to || CONTACT.email,
    lien_questionnaire: params.questionnaireLink ?? getQuestionnairePublicUrl(settings),
    lien_google: getGoogleReviewUrl(settings),
  };

  const subject = applyTemplateVars(template.subject, fullVars);
  const html = applyTemplateVars(template.body_html, fullVars);
  const text = applyTemplateVars(template.body_text, fullVars);

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromAddress(settings),
      replyTo: settings.email_reply_to || CONTACT.email,
      to: params.to,
      subject,
      html,
      text,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true, messageId: data?.id };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erreur envoi';
    return { ok: false, error: msg };
  }
}
