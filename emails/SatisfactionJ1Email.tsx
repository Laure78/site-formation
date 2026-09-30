import * as React from 'react';
import { SCHEMA_CONTACT, SCHEMA_GEO } from '@/lib/schema-constants';
import { OFC_IDENTITE } from '@/lib/ofc-identite';
import { QUESTIONNAIRE_SATISFACTION_URL } from '@/lib/questionnaire-satisfaction';

export type SatisfactionJ1EmailProps = {
  prenom: string | null;
  nomFormation: string;
  dateFormation: string | null;
  questionnaireUrl?: string;
};

export function satisfactionJ1EmailSubject(): string {
  return 'Votre avis sur votre formation IA BTP';
}

function greeting(prenom: string | null): string {
  const clean = prenom?.trim();
  return clean ? `Bonjour ${clean},` : 'Bonjour,';
}

export function satisfactionJ1EmailText(props: SatisfactionJ1EmailProps): string {
  const qUrl = props.questionnaireUrl ?? QUESTIONNAIRE_SATISFACTION_URL;
  const lines = [
    greeting(props.prenom),
    '',
    `J’espère que la formation « ${props.nomFormation} » vous a été utile.`,
  ];
  if (props.dateFormation) {
    lines.push(`Date de la session : ${props.dateFormation}.`);
  }
  lines.push(
    '',
    'Votre retour me permet d’améliorer continuellement mes formations et fait partie du suivi qualité de mon organisme de formation.',
    '',
    'Questionnaire de satisfaction',
    `Donner mon avis sur la formation : ${qUrl}`,
    '',
    'Merci pour votre participation et votre confiance.',
    '',
    'Bien cordialement,',
    '',
    'Laure Olivié',
    'Formatrice IA pour le BTP',
    '',
    OFC_IDENTITE.raisonSociale,
    'https://www.laureolivie.fr/',
    '',
    [
      OFC_IDENTITE.raisonSociale,
      `SIRET ${SCHEMA_CONTACT.siretFormatted}`,
      `NDA ${SCHEMA_CONTACT.nda}`,
      `${SCHEMA_GEO.streetAddress}, ${SCHEMA_GEO.postalCode} ${SCHEMA_GEO.addressLocality}`,
      SCHEMA_CONTACT.email,
    ].join(' · ')
  );
  return lines.join('\n');
}

const ACCENT = '#377CF3';
const BTN_PRIMARY = {
  display: 'inline-block',
  backgroundColor: ACCENT,
  color: '#FFFFFF',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: 16,
  padding: '14px 28px',
  borderRadius: 10,
} as const;

/** Template React Email — branding OFC, questionnaire uniquement (Google via training_ops). */
export function SatisfactionJ1Email({
  prenom,
  nomFormation,
  dateFormation,
  questionnaireUrl = QUESTIONNAIRE_SATISFACTION_URL,
}: SatisfactionJ1EmailProps) {
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
                      <td style={{ padding: '28px 28px 8px' }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 13,
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: ACCENT,
                          }}
                        >
                          Suivi qualité — formation IA BTP
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px 28px 32px' }}>
                        <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: '24px' }}>
                          {greeting(prenom)}
                        </p>
                        <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: '24px' }}>
                          J&apos;espère que la formation <strong>« {nomFormation} »</strong> vous a
                          été utile.
                        </p>
                        {dateFormation ? (
                          <p style={{ margin: '0 0 16px', fontSize: 14, lineHeight: '22px', color: '#64748b' }}>
                            Session du {dateFormation}.
                          </p>
                        ) : null}
                        <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: '24px' }}>
                          Votre retour me permet d&apos;améliorer continuellement mes formations et
                          fait partie du suivi qualité de mon organisme de formation.
                        </p>
                        <p style={{ margin: '0 0 24px', fontSize: 16, lineHeight: '24px' }}>
                          Je vous remercie de prendre quelques minutes pour répondre au questionnaire
                          de satisfaction.
                        </p>

                        <p style={{ margin: '0 0 16px', textAlign: 'center' }}>
                          <a href={questionnaireUrl} style={BTN_PRIMARY}>
                            Donner mon avis sur la formation
                          </a>
                        </p>

                        <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: '24px' }}>
                          Merci pour votre participation et votre confiance.
                        </p>
                        <p style={{ margin: '0 0 4px', fontSize: 16, lineHeight: '24px' }}>
                          Bien cordialement,
                        </p>
                        <p style={{ margin: '16px 0 0', fontSize: 16, lineHeight: '24px' }}>
                          <strong>Laure Olivié</strong>
                          <br />
                          Formatrice IA pour le BTP
                          <br />
                          {OFC_IDENTITE.raisonSociale}
                          <br />
                          <a
                            href="https://www.laureolivie.fr/"
                            style={{ color: ACCENT, textDecoration: 'underline' }}
                          >
                            www.laureolivie.fr
                          </a>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: '16px 28px 28px',
                          borderTop: '1px solid #E2E8F0',
                          fontSize: 11,
                          lineHeight: '16px',
                          color: '#64748b',
                        }}
                      >
                        {OFC_IDENTITE.raisonSociale} · SIRET {SCHEMA_CONTACT.siretFormatted} · NDA{' '}
                        {SCHEMA_CONTACT.nda} · {SCHEMA_GEO.streetAddress}, {SCHEMA_GEO.postalCode}{' '}
                        {SCHEMA_GEO.addressLocality} · {SCHEMA_CONTACT.email}
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
