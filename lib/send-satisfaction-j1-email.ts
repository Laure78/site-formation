import { Resend } from 'resend';
import { render } from '@react-email/render';
import { CONTACT } from '@/lib/constants';
import {
  SatisfactionJ1Email,
  satisfactionJ1EmailSubject,
  satisfactionJ1EmailText,
} from '@/emails/SatisfactionJ1Email';
import { QUESTIONNAIRE_SATISFACTION_URL } from '@/lib/questionnaire-satisfaction';
import { SCHEMA_GOOGLE_REVIEW_SUBMIT_URL } from '@/lib/schema-constants';

function fromAddress(): string {
  return (
    process.env.EMAIL_FROM?.trim() ||
    process.env.INVITATION_FROM_EMAIL?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    'Laure Olivié <noreply@laureolivie.fr>'
  );
}

export type SendSatisfactionJ1Params = {
  to: string;
  prenom: string | null;
  nomFormation: string;
  dateFormation: string | null;
};

/** Envoi Resend — ne logue jamais l’email en clair dans les messages d’erreur appelant. */
export async function sendSatisfactionJ1Email(
  params: SendSatisfactionJ1Params
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = fromAddress();
  if (!apiKey) {
    return {
      ok: false,
      error: 'RESEND_API_KEY requis.',
    };
  }

  const payload = {
    prenom: params.prenom,
    nomFormation: params.nomFormation,
    dateFormation: params.dateFormation,
    questionnaireUrl: QUESTIONNAIRE_SATISFACTION_URL,
    googleReviewUrl: SCHEMA_GOOGLE_REVIEW_SUBMIT_URL,
  };

  try {
    const html = await render(SatisfactionJ1Email(payload));
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      replyTo: CONTACT.email,
      to: params.to,
      subject: satisfactionJ1EmailSubject(),
      html,
      text: satisfactionJ1EmailText(payload),
    });

    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erreur d’envoi email';
    console.error('[sendSatisfactionJ1Email]', msg);
    return { ok: false, error: msg };
  }
}
