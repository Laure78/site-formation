import { Resend } from 'resend';
import {
  InvitationApprenantEmail,
  invitationEmailSubject,
  invitationEmailSubjectNewFormation,
  invitationEmailText,
} from '@/emails/InvitationApprenantEmail';
import { LINKS } from '@/lib/internal-links';
import { CONTACT } from '@/lib/constants';

function siteBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    'https://www.laureolivie.fr'
  ).replace(/\/$/, '');
}

export function buildInviteUrl(token: string): string {
  return `${siteBaseUrl()}/invitation/${token}`;
}

export function buildLoginUrl(): string {
  return `${siteBaseUrl()}${LINKS.authConnexion}`;
}

export async function sendInvitationEmail(params: {
  to: string;
  formationTitle: string;
  token: string;
  firstName?: string | null;
  /** Compte déjà actif : email « nouvelle formation », sans lien de création MDP. */
  accountAlreadyActive?: boolean;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || process.env.INVITATION_FROM_EMAIL;
  if (!apiKey || !from) {
    return {
      ok: false,
      error: 'RESEND_API_KEY et EMAIL_FROM (ou INVITATION_FROM_EMAIL) doivent être configurés.',
    };
  }

  const inviteUrl = buildInviteUrl(params.token);
  const loginUrl = buildLoginUrl();
  const payload = {
    formationTitle: params.formationTitle,
    inviteUrl,
    loginUrl,
    email: params.to,
    accountAlreadyActive: Boolean(params.accountAlreadyActive),
    firstName: params.firstName,
  };

  const subject = params.accountAlreadyActive
    ? invitationEmailSubjectNewFormation(params.formationTitle)
    : invitationEmailSubject(params.formationTitle);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    replyTo: CONTACT.email,
    to: params.to,
    subject,
    react: InvitationApprenantEmail(payload),
    text: invitationEmailText(payload),
  });

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
