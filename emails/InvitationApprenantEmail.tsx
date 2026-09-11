import * as React from 'react';
import { SCHEMA_CONTACT, SCHEMA_GEO } from '@/lib/schema-constants';
import { OFC_IDENTITE } from '@/lib/ofc-identite';
import { INVITATION_TTL_DAYS_LABEL } from '@/lib/invitation-token';

export type InvitationApprenantEmailProps = {
  formationTitle: string;
  inviteUrl: string;
  loginUrl: string;
  email: string;
  /** Compte déjà actif : pas de création de mot de passe, connexion habituelle. */
  accountAlreadyActive?: boolean;
  firstName?: string | null;
};

const ACCENT = '#377CF3';

/** Mentions légales pied de page email (source SCHEMA_*). */
export function invitationEmailLegalFooter(): string {
  return [
    OFC_IDENTITE.raisonSociale,
    `SIRET ${SCHEMA_CONTACT.siretFormatted}`,
    `NDA ${SCHEMA_CONTACT.nda}`,
    `${SCHEMA_GEO.streetAddress}, ${SCHEMA_GEO.postalCode} ${SCHEMA_GEO.addressLocality}`,
    SCHEMA_CONTACT.email,
    'www.laureolivie.fr',
    "Cet enregistrement ne vaut pas agrément de l'État",
  ].join(' · ');
}

export function invitationEmailSubject(_formationTitle?: string): string {
  return 'Votre accès à votre espace de formation – Laure Olivié';
}

export function invitationEmailSubjectNewFormation(formationTitle: string): string {
  return `Nouvelle formation disponible : ${formationTitle}`;
}

function greeting(firstName?: string | null): string {
  const clean = firstName?.trim();
  return clean ? `Bonjour ${clean},` : 'Bonjour,';
}

export function invitationEmailText(props: InvitationApprenantEmailProps): string {
  const hello = greeting(props.firstName);
  const legal = invitationEmailLegalFooter();

  if (props.accountAlreadyActive) {
    return [
      hello,
      '',
      `Une nouvelle formation est disponible dans votre espace : « ${props.formationTitle} ».`,
      '',
      'Connectez-vous avec votre adresse email et votre mot de passe habituels :',
      props.loginUrl,
      '',
      `Identifiant : ${props.email}`,
      '',
      'Bien cordialement,',
      '',
      'Laure Olivié',
      'Formatrice IA pour le BTP',
      OFC_IDENTITE.raisonSociale,
      'https://www.laureolivie.fr/',
      '',
      legal,
    ].join('\n');
  }

  return [
    hello,
    '',
    'Votre accès à la plateforme de formation Laure Olivié est disponible.',
    '',
    'Vous pouvez maintenant accéder à votre espace apprenant et retrouver les ressources liées à votre formation.',
    '',
    'Votre identifiant',
    props.email,
    '',
    'Votre identifiant correspond à l’adresse email utilisée lors de votre inscription.',
    '',
    'Première connexion',
    `Pour créer votre mot de passe (lien valable ${INVITATION_TTL_DAYS_LABEL} jours), ouvrez :`,
    props.inviteUrl,
    '',
    'Une fois votre mot de passe créé, connectez-vous sur :',
    'https://www.laureolivie.fr/auth/connexion',
    '',
    `Conservez votre identifiant : ${props.email}`,
    '',
    'Bien cordialement,',
    '',
    'Laure Olivié',
    'Formatrice IA pour le BTP',
    OFC_IDENTITE.raisonSociale,
    'https://www.laureolivie.fr/',
    '',
    legal,
  ].join('\n');
}

const btnPrimary = {
  display: 'inline-block',
  backgroundColor: ACCENT,
  color: '#FFFFFF',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: 16,
  padding: '14px 28px',
  borderRadius: 10,
} as const;

/** Template React Email — jamais de mot de passe en clair. */
export function InvitationApprenantEmail({
  formationTitle,
  inviteUrl,
  loginUrl,
  email,
  accountAlreadyActive,
  firstName,
}: InvitationApprenantEmailProps) {
  const hello = greeting(firstName);
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

                        {accountAlreadyActive ? (
                          <>
                            <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: '24px' }}>
                              Une nouvelle formation est disponible dans votre espace :{' '}
                              <strong>« {formationTitle} »</strong>.
                            </p>
                            <p style={{ margin: '0 0 8px', fontSize: 14, color: '#64748b' }}>
                              Identifiant
                            </p>
                            <p
                              style={{
                                margin: '0 0 24px',
                                fontSize: 16,
                                fontWeight: 600,
                                wordBreak: 'break-all',
                              }}
                            >
                              {email}
                            </p>
                            <p style={{ margin: '0 0 24px', textAlign: 'center' }}>
                              <a href={loginUrl} style={btnPrimary}>
                                Accéder à mon espace
                              </a>
                            </p>
                            <p style={{ margin: 0, fontSize: 14, lineHeight: '22px', color: '#475569' }}>
                              Connectez-vous avec votre mot de passe habituel. En cas d&apos;oubli,
                              utilisez « Mot de passe oublié » sur la page de connexion.
                            </p>
                          </>
                        ) : (
                          <>
                            <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: '24px' }}>
                              Votre accès à la plateforme de formation Laure Olivié est disponible.
                            </p>
                            <p style={{ margin: '0 0 20px', fontSize: 16, lineHeight: '24px' }}>
                              Vous pouvez maintenant accéder à votre espace apprenant et retrouver les
                              ressources liées à votre formation
                              {formationTitle ? (
                                <>
                                  {' '}
                                  <strong>« {formationTitle} »</strong>
                                </>
                              ) : null}
                              .
                            </p>

                            <p
                              style={{
                                margin: '0 0 8px',
                                fontSize: 13,
                                fontWeight: 600,
                                letterSpacing: '0.06em',
                                textTransform: 'uppercase',
                                color: ACCENT,
                              }}
                            >
                              Votre identifiant
                            </p>
                            <p
                              style={{
                                margin: '0 0 8px',
                                fontSize: 18,
                                fontWeight: 700,
                                wordBreak: 'break-all',
                              }}
                            >
                              {email}
                            </p>
                            <p style={{ margin: '0 0 24px', fontSize: 14, lineHeight: '22px', color: '#64748b' }}>
                              Votre identifiant correspond à l&apos;adresse email utilisée lors de votre
                              inscription.
                            </p>

                            <p
                              style={{
                                margin: '0 0 8px',
                                fontSize: 13,
                                fontWeight: 600,
                                letterSpacing: '0.06em',
                                textTransform: 'uppercase',
                                color: ACCENT,
                              }}
                            >
                              Première connexion
                            </p>
                            <p style={{ margin: '0 0 20px', fontSize: 16, lineHeight: '24px' }}>
                              Cliquez sur le bouton ci-dessous afin de créer votre mot de passe (lien
                              valable {INVITATION_TTL_DAYS_LABEL} jours, usage unique).
                            </p>
                            <p style={{ margin: '0 0 20px', textAlign: 'center' }}>
                              <a href={inviteUrl} style={btnPrimary}>
                                Créer mon mot de passe
                              </a>
                            </p>
                            <p style={{ margin: '0 0 16px', fontSize: 13, lineHeight: '20px', color: '#64748b' }}>
                              Si le bouton ne fonctionne pas, copiez ce lien :
                              <br />
                              <span style={{ wordBreak: 'break-all' }}>{inviteUrl}</span>
                            </p>
                            <p style={{ margin: '0 0 16px', fontSize: 15, lineHeight: '22px' }}>
                              Une fois votre mot de passe créé, connectez-vous sur{' '}
                              <a href={loginUrl} style={{ color: ACCENT }}>
                                laureolivie.fr
                              </a>
                              .
                            </p>
                            <p style={{ margin: 0, fontSize: 15, lineHeight: '22px' }}>
                              Conservez votre identifiant : <strong>{email}</strong>
                            </p>
                          </>
                        )}

                        <p style={{ margin: '28px 0 4px', fontSize: 16, lineHeight: '24px' }}>
                          Bien cordialement,
                        </p>
                        <p style={{ margin: '12px 0 0', fontSize: 16, lineHeight: '24px' }}>
                          <strong>Laure Olivié</strong>
                          <br />
                          Formatrice IA pour le BTP
                          <br />
                          {OFC_IDENTITE.raisonSociale}
                          <br />
                          <a href="https://www.laureolivie.fr/" style={{ color: ACCENT }}>
                            www.laureolivie.fr
                          </a>
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
