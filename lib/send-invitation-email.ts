import { Resend } from 'resend';
import { render } from '@react-email/render';
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
  const from =
    process.env.EMAIL_FROM?.trim() ||
    process.env.INVITATION_FROM_EMAIL?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    'Laure Olivié <noreply@laureolivie.fr>';
  if (!apiKey) {
    return {
      ok: false,
      error: 'RESEND_API_KEY doit être configuré.',
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

  try {
    const html = await render(InvitationApprenantEmail(payload));
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      replyTo: CONTACT.email,
      to: params.to,
      subject,
      html,
      text: invitationEmailText(payload),
    });

    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erreur d’envoi email';
    console.error('[sendInvitationEmail]', msg);
    return { ok: false, error: msg };
  }
}
