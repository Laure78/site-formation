'use server';

import { headers } from 'next/headers';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit } from '@/lib/rate-limit';
import {
  CONTACT_SUBJECT_LABELS,
  escapeHtml,
  parseContactFormPayload,
  type ContactFormInput,
} from '@/lib/contact-form-validation';
import { SITE_CONFIG } from '@/lib/seo';
import { CONTACT_FORM_SUCCESS } from '@/lib/contact-page-config';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const MIN_SUBMIT_MS = 3_000;
const MAX_BODY_BYTES = 12_000;

export type ContactFormActionResult =
  | { ok: true; message: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

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

function buildNotificationHtml(data: ContactFormInput, meta: { pageUrl: string; submittedAt: string }): string {
  const optionalFields: [string, string | undefined][] = [
    ['Téléphone', data.phone],
    ['Participants (approx.)', data.participants],
    ['Fonctions des participants', data.participantRole],
    ['Lieu / département', data.location],
    ['Période envisagée', data.period],
    ['Formation / thème', data.formationTheme],
    ['Formation évoquée (URL)', data.formationHint],
  ];
  const optionalRows = optionalFields
    .filter((entry): entry is [string, string] => Boolean(entry[1]?.trim()))
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td>${escapeHtml(value.trim())}</td></tr>`,
    )
    .join('');

  return `
    <h2>Nouvelle demande — page Contact</h2>
    <p><strong>Date :</strong> ${escapeHtml(meta.submittedAt)}</p>
    <p><strong>Source :</strong> ${escapeHtml(meta.pageUrl)}</p>
    <table style="border-collapse:collapse;">
      <tr><td style="padding:4px 12px 4px 0;font-weight:600;">Nom</td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:600;">Email</td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:600;">Entreprise</td><td>${escapeHtml(data.company)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:600;">Objet</td><td>${escapeHtml(CONTACT_SUBJECT_LABELS[data.subject])}</td></tr>
      ${optionalRows}
    </table>
    <h3>Besoin</h3>
    <p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>
  `;
}

function buildConfirmationHtml(name: string): string {
  const firstName = name.trim().split(/\s+/)[0] || '';
  return `
    <p>Bonjour${firstName ? ` ${escapeHtml(firstName)}` : ''},</p>
    <p>Je confirme la bonne réception de votre message via le formulaire de contact laureolivie.fr.</p>
    <p>Je reviendrai vers vous après lecture de votre projet.</p>
    <p>Laure Olivié<br/>OFC Création d'Entreprise — Formation IA pour le BTP</p>
  `;
}

export async function submitContactFormAction(
  payload: unknown,
): Promise<ContactFormActionResult> {
  const rawSize = JSON.stringify(payload ?? {}).length;
  if (rawSize > MAX_BODY_BYTES) {
    return { ok: false, error: 'Message trop volumineux.' };
  }

  const parsed = parseContactFormPayload(payload);
  if (!parsed.success) {
    return { ok: false, error: 'Vérifiez les champs du formulaire.', fieldErrors: parsed.fieldErrors };
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
      error: 'Trop de demandes envoyées récemment. Réessayez dans quelques minutes ou contactez-nous par téléphone.',
    };
  }

  const rlEmail = checkRateLimit(`contact:email:${data.email}`, 3, 60 * 60_000);
  if (!rlEmail.ok) {
    return {
      ok: false,
      error: 'Une demande a déjà été envoyée récemment avec cette adresse email. Patience ou contact direct par téléphone.',
    };
  }

  if (!resend) {
    console.error('[submitContactForm] RESEND_API_KEY manquante');
    return { ok: false, error: 'Envoi temporairement indisponible. Utilisez le téléphone ou l’email direct.' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laureolivie.fr';
  const pageUrl = `${baseUrl.replace(/\/$/, '')}/contact`;
  const submittedAt = new Date().toISOString();

  try {
    const supabase = await createClient();
    const { error: dbError } = await supabase.from('contact_requests').insert({
      name: data.name,
      email: data.email,
      company: data.company,
      subject: data.subject,
      message: data.message,
      phone: data.phone?.trim() || null,
      participants: data.participants?.trim() || null,
      participant_role: data.participantRole?.trim() || null,
      location: data.location?.trim() || null,
      period: data.period?.trim() || null,
      formation_theme: data.formationTheme?.trim() || null,
      formation_hint: data.formationHint?.trim() || null,
      source_page: pageUrl,
    });
    if (dbError) {
      console.error('[submitContactForm] db insert', dbError.message);
    }
  } catch (err) {
    console.error('[submitContactForm] db', err);
  }

  const subjectLabel = CONTACT_SUBJECT_LABELS[data.subject];
  const notificationSubject = `[Contact OFC] ${subjectLabel} — ${data.company}`;

  const { error: notifyError } = await resend.emails.send({
    from: 'OFC Contact <noreply@laureolivie.fr>',
    replyTo: data.email,
    to: SITE_CONFIG.email,
    subject: notificationSubject,
    html: buildNotificationHtml(data, { pageUrl, submittedAt }),
  });

  if (notifyError) {
    console.error('[submitContactForm] notify', notifyError);
    return { ok: false, error: 'L’envoi a échoué. Réessayez ou contactez-nous par téléphone.' };
  }

  const { error: confirmError } = await resend.emails.send({
    from: 'Laure Olivié <noreply@laureolivie.fr>',
    replyTo: SITE_CONFIG.email,
    to: data.email,
    subject: 'Votre demande — OFC Création d’Entreprise',
    html: buildConfirmationHtml(data.name),
  });

  if (confirmError) {
    console.error('[submitContactForm] confirmation', confirmError);
  }

  return { ok: true, message: CONTACT_FORM_SUCCESS };
}
