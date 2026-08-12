import * as React from 'react';
import { SCHEMA_CONTACT, SCHEMA_GEO } from '@/lib/schema-constants';
import { INVITATION_TTL_DAYS_LABEL } from '@/lib/invitation-token';

export type InvitationApprenantEmailProps = {
  formationTitle: string;
  inviteUrl: string;
  loginUrl: string;
  email: string;
  temporaryPassword?: string | null;
  /** Compte déjà actif : pas de nouveau mot de passe, connexion avec identifiants existants. */
  accountAlreadyActive?: boolean;
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
  const lines = [
    hello,
    '',
    `Vous êtes invité(e) à accéder à la formation « ${props.formationTitle} » sur la plateforme Laure Olivié.`,
    '',
  ];

  if (props.temporaryPassword) {
    lines.push(
      'Vos identifiants de connexion :',
      `Email : ${props.email}`,
      `Mot de passe temporaire : ${props.temporaryPassword}`,
      '',
      `Connectez-vous ici : ${props.loginUrl}`,
      '',
      'Après connexion, changez ce mot de passe temporaire pour plus de sécurité.',
      ''
    );
  } else if (props.accountAlreadyActive) {
    lines.push(
      'Votre compte est déjà actif. Connectez-vous avec vos identifiants habituels :',
      props.loginUrl,
      '',
      'Vous avez été inscrit(e) à cette nouvelle formation.',
      ''
    );
  } else {
    lines.push(
      `Créez votre mot de passe via ce lien (valable ${INVITATION_TTL_DAYS_LABEL} jours) :`,
      props.inviteUrl,
      ''
    );
  }

  lines.push(
    'Si vous n’êtes pas à l’origine de cette demande, ignorez cet email.',
    '',
    legal
  );
  return lines.join('\n');
}

/** Template React Email (inline styles) — compatible Resend `react:`. */
export function InvitationApprenantEmail({
  formationTitle,
  inviteUrl,
  loginUrl,
  email,
  temporaryPassword,
  accountAlreadyActive,
  firstName,
}: InvitationApprenantEmailProps) {
  const hello = firstName ? `Bonjour ${firstName},` : 'Bonjour,';
  const legal = invitationEmailLegalFooter();
  const hasPassword = Boolean(temporaryPassword);
  const useExistingAccount = Boolean(accountAlreadyActive && !hasPassword);

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

                        {hasPassword ? (
                          <>
                            <p style={{ margin: '0 0 12px', fontSize: 16, lineHeight: '24px' }}>
                              Voici vos identifiants pour vous connecter :
                            </p>
                            <table
                              width="100%"
                              cellPadding={0}
                              cellSpacing={0}
                              role="presentation"
                              style={{
                                margin: '0 0 20px',
                                backgroundColor: '#F8FAFC',
                                border: '1px solid #E2E8F0',
                                borderRadius: 10,
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td style={{ padding: '16px 18px' }}>
                                    <p style={{ margin: '0 0 8px', fontSize: 13, color: '#64748b' }}>
                                      Email
                                    </p>
                                    <p
                                      style={{
                                        margin: '0 0 14px',
                                        fontSize: 16,
                                        fontWeight: 600,
                                        wordBreak: 'break-all',
                                      }}
                                    >
                                      {email}
                                    </p>
                                    <p style={{ margin: '0 0 8px', fontSize: 13, color: '#64748b' }}>
                                      Mot de passe temporaire
                                    </p>
                                    <p
                                      style={{
                                        margin: 0,
                                        fontSize: 18,
                                        fontWeight: 700,
                                        letterSpacing: '0.04em',
                                        fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
                                        color: '#0F172A',
                                      }}
                                    >
                                      {temporaryPassword}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p style={{ margin: '0 0 24px', textAlign: 'center' }}>
                              <a
                                href={loginUrl}
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
                                Se connecter à mon espace
                              </a>
                            </p>
                            <p style={{ margin: 0, fontSize: 14, lineHeight: '22px', color: '#475569' }}>
                              Après votre première connexion, changez ce mot de passe temporaire pour plus de
                              sécurité. Page de connexion :{' '}
                              <span style={{ wordBreak: 'break-all' }}>{loginUrl}</span>
                            </p>
                          </>
                        ) : useExistingAccount ? (
                          <>
                            <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: '24px' }}>
                              Votre compte est déjà actif. Vous avez été inscrit(e) à cette
                              formation — connectez-vous avec vos identifiants habituels.
                            </p>
                            <p style={{ margin: '0 0 24px', textAlign: 'center' }}>
                              <a
                                href={loginUrl}
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
                                Accéder à mon espace
                              </a>
                            </p>
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
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
