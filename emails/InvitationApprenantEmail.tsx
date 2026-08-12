import * as React from 'react';
import { SCHEMA_CONTACT, SCHEMA_GEO } from '@/lib/schema-constants';
import { INVITATION_TTL_DAYS_LABEL } from '@/lib/invitation-token';

export type InvitationApprenantEmailProps = {
  formationTitle: string;
  inviteUrl: string;
  firstName?: string | null;
};

/** Mentions légales pied de page email (source SCHEMA_*). */
export function invitationEmailLegalFooter(): string {
  return [
    "OFC Création d'Entreprise",
    `SIRET ${SCHEMA_CONTACT.siretFormatted}`,
    `NDA ${SCHEMA_CONTACT.nda}`,
    `${SCHEMA_GEO.streetAddress}, ${SCHEMA_GEO.postalCode} ${SCHEMA_GEO.addressLocality}`,
    SCHEMA_CONTACT.email,
    'www.laureolivie.fr',
    "Cet enregistrement ne vaut pas agrément de l'État",
  ].join(' · ');
}

export function invitationEmailSubject(formationTitle: string): string {
  return `Votre accès à la formation ${formationTitle}`;
}

export function invitationEmailText(props: InvitationApprenantEmailProps): string {
  const hello = props.firstName ? `Bonjour ${props.firstName},` : 'Bonjour,';
  const legal = invitationEmailLegalFooter();
  return [
    hello,
    '',
    `Vous êtes invité(e) à accéder à la formation « ${props.formationTitle} » sur la plateforme Laure Olivié.`,
    '',
    `Créez votre mot de passe via ce lien (valable ${INVITATION_TTL_DAYS_LABEL} jours) :`,
    props.inviteUrl,
    '',
    'Si vous n’êtes pas à l’origine de cette demande, ignorez cet email.',
    '',
    legal,
  ].join('\n');
}

/** Template React Email (inline styles) — compatible Resend `react:`. */
export function InvitationApprenantEmail({
  formationTitle,
  inviteUrl,
  firstName,
}: InvitationApprenantEmailProps) {
  const hello = firstName ? `Bonjour ${firstName},` : 'Bonjour,';
  const legal = invitationEmailLegalFooter();

  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#F2F2F2',
          fontFamily: 'Poppins, Century Gothic, Arial, sans-serif',
          color: '#0f172a',
        }}
      >
        <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
          <tbody>
            <tr>
              <td align="center" style={{ padding: '32px 16px' }}>
                <table
                  width="100%"
                  style={{ maxWidth: 560, backgroundColor: '#FFFFFF', borderRadius: 12 }}
                  cellPadding={0}
                  cellSpacing={0}
                  role="presentation"
                >
                  <tbody>
                    <tr>
                      <td style={{ padding: '32px 28px' }}>
                        <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: '24px' }}>{hello}</p>
                        <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: '24px' }}>
                          Vous êtes invité(e) à accéder à la formation{' '}
                          <strong>{formationTitle}</strong> sur la plateforme Laure Olivié.
                        </p>
                        <p style={{ margin: '0 0 24px', fontSize: 16, lineHeight: '24px' }}>
                          Créez votre mot de passe pour activer votre compte. Ce lien expire dans{' '}
                          {INVITATION_TTL_DAYS_LABEL} jours.
                        </p>
                        <p style={{ margin: '0 0 28px', textAlign: 'center' }}>
                          <a
                            href={inviteUrl}
                            style={{
                              display: 'inline-block',
                              backgroundColor: '#377CF3',
                              color: '#FFFFFF',
                              textDecoration: 'none',
                              fontWeight: 600,
                              fontSize: 16,
                              padding: '14px 28px',
                              borderRadius: 10,
                            }}
                          >
                            Créer mon mot de passe
                          </a>
                        </p>
                        <p style={{ margin: 0, fontSize: 13, lineHeight: '20px', color: '#64748b' }}>
                          Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :
                          <br />
                          <span style={{ wordBreak: 'break-all' }}>{inviteUrl}</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: '16px 28px 28px',
                          borderTop: '1px solid #e2e8f0',
                          fontSize: 11,
                          lineHeight: '16px',
                          color: '#94a3b8',
                        }}
                      >
                        {legal}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
