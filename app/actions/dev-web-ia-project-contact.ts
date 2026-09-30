'use server';

import { headers } from 'next/headers';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { escapeHtml } from '@/lib/contact-form-validation';
import { SITE_CONFIG } from '@/lib/seo';
import { CONTACT_FORM_SUCCESS } from '@/lib/contact-page-config';
import {
  DEV_WEB_IA_FORMAT_LABELS,
  DEV_WEB_IA_PROJECT_TYPE_LABELS,
  parseDevWebIaProjectFormPayload,
  type DevWebIaProjectFormInput,
} from '@/lib/dev-web-ia-project-form-validation';
import {
  DEV_WEB_IA_CONTACT_SUBJECT,
  DEV_WEB_IA_FORMATION_REFERENCE,
  DEV_WEB_IA_FORMATION_TITRE,
  DEV_WEB_IA_PATH,
  DEV_WEB_IA_PROJECT_FORM_ID,
} from '@/lib/formation-developpement-web-ia-content';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const MIN_SUBMIT_MS = 3_000;
const MAX_BODY_BYTES = 12_000;

export type DevWebIaProjectContactActionResult =
  | { ok: true; message: string }
  | { ok: false; error: string; errorCode?: string; fieldErrors?: Record<string, string> };

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first && first.length <= 64) return first;
  }
  const realIp = h.get('x-real-ip')?.trim();
  if (realIp && realIp.length <= 64) return realIp;
  return 'unknown';
}

function buildMessageBody(data: DevWebIaProjectFormInput): string {
  const projectLabel = DEV_WEB_IA_PROJECT_TYPE_LABELS[data.projectType];
  const formatLabel = DEV_WEB_IA_FORMAT_LABELS[data.format];
  return [
    `Type de projet : ${projectLabel}`,
    `Format souhaité : ${formatLabel}`,
    `Formation : ${DEV_WEB_IA_CONTACT_SUBJECT} (${DEV_WEB_IA_FORMATION_REFERENCE})`,
    '',
    data.message,
  ].join('\n');
}

function buildNotificationHtml(
  data: DevWebIaProjectFormInput,
  meta: { pageUrl: string; submittedAt: string },
): string {
  const projectLabel = DEV_WEB_IA_PROJECT_TYPE_LABELS[data.projectType];
  const formatLabel = DEV_WEB_IA_FORMAT_LABELS[data.format];
  const company = data.company?.trim() || 'Non renseignée';

  const optionalFields: [string, string | undefined][] = [
    ['Téléphone', data.phone],
    ['Entreprise', data.company?.trim() || undefined],
  ];
  const optionalRows = optionalFields
    .filter((entry): entry is [string, string] => Boolean(entry[1]?.trim()))
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td>${escapeHtml(value.trim())}</td></tr>`,
    )
    .join('');

  return `
    <h2>Nouvelle demande — ${escapeHtml(DEV_WEB_IA_CONTACT_SUBJECT)}</h2>
    <p><strong>Date :</strong> ${escapeHtml(meta.submittedAt)}</p>
    <p><strong>Source :</strong> ${escapeHtml(meta.pageUrl)}</p>
    <p><strong>Référence formation :</strong> ${escapeHtml(DEV_WEB_IA_FORMATION_REFERENCE)}</p>
    <table style="border-collapse:collapse;">
      <tr><td style="padding:4px 12px 4px 0;font-weight:600;">Nom</td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:600;">Email</td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:600;">Entreprise</td><td>${escapeHtml(company)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:600;">Objet</td><td>${escapeHtml(DEV_WEB_IA_CONTACT_SUBJECT)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:600;">Type de projet</td><td>${escapeHtml(projectLabel)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:600;">Format souhaité</td><td>${escapeHtml(formatLabel)}</td></tr>
      ${optionalRows}
    </table>
    <h3>Description du projet</h3>
    <p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>
  `;
}

function buildConfirmationHtml(name: string): string {
  const firstName = name.trim().split(/\s+/)[0] || '';
  return `
    <p>Bonjour${firstName ? ` ${escapeHtml(firstName)}` : ''},</p>
    <p>Je confirme la bonne réception de votre message concernant la formation « ${escapeHtml(DEV_WEB_IA_FORMATION_TITRE)} ».</p>
    <p>Je reviendrai vers vous après lecture de votre projet.</p>
    <p>Laure Olivié<br/>OFC Création d'Entreprise</p>
  `;
}

export async function submitDevWebIaProjectContactAction(
  payload: unknown,
): Promise<DevWebIaProjectContactActionResult> {
  const rawSize = JSON.stringify(payload ?? {}).length;
  if (rawSize > MAX_BODY_BYTES) {
    return { ok: false, error: 'Message trop volumineux.', errorCode: 'payload_too_large' };
  }

  const parsed = parseDevWebIaProjectFormPayload(payload);
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Vérifiez les champs du formulaire.',
      errorCode: 'validation',
      fieldErrors: parsed.fieldErrors,
    };
  }

  const data = parsed.data;

  if (data.website?.trim()) {
    return { ok: true, message: CONTACT_FORM_SUCCESS };
  }

  const now = Date.now();
  if (data.formStartedAt && now - data.formStartedAt < MIN_SUBMIT_MS) {
    return { ok: true, message: CONTACT_FORM_SUCCESS };
  }

  const ip = await getClientIp();
  const rlIp = checkRateLimit(`contact:ip:${ip}`, 5, 15 * 60_000);
  if (!rlIp.ok) {
    return {
      ok: false,
      error:
        'Trop de demandes envoyées récemment. Réessayez dans quelques minutes ou contactez-nous par téléphone.',
      errorCode: 'rate_limit_ip',
    };
  }

  const rlEmail = checkRateLimit(`contact:email:${data.email}`, 3, 60 * 60_000);
  if (!rlEmail.ok) {
    return {
      ok: false,
      error:
        'Une demande a déjà été envoyée récemment avec cette adresse email. Patience ou contact direct par téléphone.',
      errorCode: 'rate_limit_email',
    };
  }

  if (!resend) {
    console.error('[submitDevWebIaProjectContact] RESEND_API_KEY manquante');
    return {
      ok: false,
      error: 'Envoi temporairement indisponible. Utilisez le téléphone ou l’email direct.',
      errorCode: 'resend_missing',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laureolivie.fr';
  const pageUrl = `${baseUrl.replace(/\/$/, '')}${DEV_WEB_IA_PATH}#${DEV_WEB_IA_PROJECT_FORM_ID}`;
  const submittedAt = new Date().toISOString();
  const companyForDb = data.company?.trim() || 'Non renseignée';
  const messageBody = buildMessageBody(data);

  try {
    const supabase = await createClient();
    const { error: dbError } = await supabase.from('contact_requests').insert({
      name: data.name,
      email: data.email,
      company: companyForDb,
      subject: DEV_WEB_IA_CONTACT_SUBJECT,
      message: messageBody,
      phone: data.phone?.trim() || null,
      formation_theme: DEV_WEB_IA_PROJECT_TYPE_LABELS[data.projectType],
      formation_hint: `${DEV_WEB_IA_PATH} (${DEV_WEB_IA_FORMATION_REFERENCE})`,
      source_page: pageUrl,
    });
    if (dbError) {
      console.error('[submitDevWebIaProjectContact] db insert', dbError.message);
    }
  } catch (err) {
    console.error('[submitDevWebIaProjectContact] db', err);
  }

  const notificationSubject = `[Contact OFC] ${DEV_WEB_IA_CONTACT_SUBJECT} — ${companyForDb}`;

  const { error: notifyError } = await resend.emails.send({
    from: 'OFC Contact <noreply@laureolivie.fr>',
    replyTo: data.email,
    to: SITE_CONFIG.email,
    subject: notificationSubject,
    html: buildNotificationHtml(data, { pageUrl, submittedAt }),
  });

  if (notifyError) {
    console.error('[submitDevWebIaProjectContact] notify', notifyError);
    return {
      ok: false,
      error: 'L’envoi a échoué. Réessayez ou contactez-nous par téléphone.',
      errorCode: 'notify_failed',
    };
  }

  const { error: confirmError } = await resend.emails.send({
    from: 'Laure Olivié <noreply@laureolivie.fr>',
    replyTo: SITE_CONFIG.email,
    to: data.email,
    subject: `Votre demande — ${DEV_WEB_IA_FORMATION_TITRE} (OFC)`,
    html: buildConfirmationHtml(data.name),
  });

  if (confirmError) {
    console.error('[submitDevWebIaProjectContact] confirmation', confirmError);
  }

  return { ok: true, message: CONTACT_FORM_SUCCESS };
}
