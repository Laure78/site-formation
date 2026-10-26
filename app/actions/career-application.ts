'use server';

import { headers } from 'next/headers';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { checkRateLimit } from '@/lib/rate-limit';
import { escapeHtml } from '@/lib/contact-form-validation';
import {
  CAREER_CV_MAX_BYTES,
  CAREER_FORM_SUCCESS,
  CONSULTANT_EXPERTISE_LABELS,
  MOBILITY_IDF_LABELS,
  SPONTANEOUS_TYPE_LABELS,
  parseCareerFormPayload,
  type CareerFormInput,
} from '@/lib/career-form-validation';
import { formatConsultantParcoursSlugs } from '@/lib/consultant-parcours-metiers-options';
import { CONTACT, RECRUITMENT } from '@/lib/constants';

function careerNotifyEmail(kind: CareerFormInput['kind']): string {
  return kind === 'consultant' ? RECRUITMENT.email : CONTACT.email;
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const MIN_SUBMIT_MS = 3_000;

export type CareerApplicationActionResult =
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

function buildNotificationHtml(
  data: CareerFormInput,
  meta: {
    submittedAt: string;
    sourcePage: string;
    cvOriginalName?: string | null;
    cvSignedUrl?: string | null;
  },
): string {
  const rows: [string, string][] = [
    ['Prénom', data.firstName],
    ['Nom', data.lastName],
    ['Email', data.email],
  ];
  if (data.phone?.trim()) rows.push(['Téléphone', data.phone.trim()]);
  if (data.kind === 'consultant') {
    rows.push(['Domaine d’expertise', CONSULTANT_EXPERTISE_LABELS[data.expertiseDomain]]);
    rows.push(['Mobilité IDF', MOBILITY_IDF_LABELS[data.mobilityIdf]]);
    if (data.formationSlugs?.trim()) {
      rows.push([
        'Parcours métiers',
        formatConsultantParcoursSlugs(data.formationSlugs) || data.formationSlugs.trim(),
      ]);
    }
  } else {
    rows.push(['Type de candidature', SPONTANEOUS_TYPE_LABELS[data.applicationType]]);
    rows.push(['Fonction ou domaine', data.desiredRole]);
  }
  if (data.availability?.trim()) rows.push(['Disponibilités', data.availability.trim()]);
  if (data.linkedinOrPortfolio?.trim()) {
    rows.push(['LinkedIn / portfolio', data.linkedinOrPortfolio.trim()]);
  }
  if (meta.cvOriginalName) {
    rows.push(['CV', meta.cvSignedUrl ? `${meta.cvOriginalName} (lien sécurisé ci-dessous)` : meta.cvOriginalName]);
  }

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`,
    )
    .join('');

  const kindLabel = data.kind === 'consultant' ? 'Proposition consultant-formateur' : 'Candidature spontanée';

  return `
    <h2>${escapeHtml(kindLabel)}</h2>
    <p><strong>Date :</strong> ${escapeHtml(meta.submittedAt)}</p>
    <p><strong>Page :</strong> ${escapeHtml(meta.sourcePage)}</p>
    <table style="border-collapse:collapse;">${tableRows}</table>
    <h3>Présentation</h3>
    <p style="white-space:pre-wrap;">${escapeHtml(data.presentation)}</p>
    ${meta.cvSignedUrl ? `<p><a href="${escapeHtml(meta.cvSignedUrl)}">Télécharger le CV (lien temporaire)</a></p>` : ''}
  `;
}

async function uploadCvIfPresent(
  file: File | null,
): Promise<{ path: string | null; originalName: string | null; signedUrl: string | null }> {
  if (!file || file.size === 0) {
    return { path: null, originalName: null, signedUrl: null };
  }

  const mime = (file.type || '').toLowerCase();
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  if (mime !== 'application/pdf' || ext !== 'pdf') {
    throw new Error('CV_INVALID_TYPE');
  }
  if (file.size > CAREER_CV_MAX_BYTES) {
    throw new Error('CV_TOO_LARGE');
  }

  let admin;
  try {
    admin = createAdminClient();
  } catch {
    throw new Error('STORAGE_CONFIG_MISSING');
  }

  const safeOriginal =
    file.name.replace(/[^\w.\- ()[\]]+/g, '_').slice(0, 120) || 'cv.pdf';
  const storagePath = `applications/${Date.now()}-${Math.random().toString(36).slice(2)}.pdf`;
  const buf = await file.arrayBuffer();

  const { error: uploadError } = await admin.storage
    .from('career-cvs')
    .upload(storagePath, buf, { contentType: 'application/pdf', upsert: false });

  if (uploadError) {
    console.error('[career-application] cv upload', uploadError.message);
    throw new Error('CV_UPLOAD_FAILED');
  }

  const { data: signed, error: signError } = await admin.storage
    .from('career-cvs')
    .createSignedUrl(storagePath, 60 * 60 * 24 * 7);

  if (signError) {
    console.error('[career-application] signed url', signError.message);
  }

  return {
    path: storagePath,
    originalName: safeOriginal,
    signedUrl: signed?.signedUrl ?? null,
  };
}

export async function submitCareerApplicationAction(
  formData: FormData,
): Promise<CareerApplicationActionResult> {
  const kindRaw = formData.get('kind');
  const raw: Record<string, unknown> = {
    kind: typeof kindRaw === 'string' ? kindRaw : '',
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone') ?? '',
    availability: formData.get('availability') ?? '',
    linkedinOrPortfolio: formData.get('linkedinOrPortfolio') ?? '',
    presentation: formData.get('presentation'),
    website: formData.get('website') ?? '',
    formStartedAt: formData.get('formStartedAt'),
    sourcePage: formData.get('sourcePage') ?? '',
  };

  if (raw.kind === 'consultant') {
    raw.expertiseDomain = formData.get('expertiseDomain');
    raw.mobilityIdf = formData.get('mobilityIdf');
    raw.formationSlugs = formData.get('formationSlugs') ?? '';
  } else {
    raw.applicationType = formData.get('applicationType');
    raw.desiredRole = formData.get('desiredRole');
  }

  const parsed = parseCareerFormPayload(raw);
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
    return { ok: true, message: CAREER_FORM_SUCCESS };
  }

  const now = Date.now();
  if (data.formStartedAt && now - data.formStartedAt < MIN_SUBMIT_MS) {
    return { ok: true, message: CAREER_FORM_SUCCESS };
  }

  const ip = await getClientIp();
  const rlIp = checkRateLimit(`career:ip:${ip}`, 5, 15 * 60_000);
  if (!rlIp.ok) {
    return {
      ok: false,
      error: 'Trop de candidatures envoyées récemment. Réessayez dans quelques minutes.',
      errorCode: 'rate_limit_ip',
    };
  }

  const rlEmail = checkRateLimit(`career:email:${data.email}`, 3, 60 * 60_000);
  if (!rlEmail.ok) {
    return {
      ok: false,
      error: 'Une candidature a déjà été envoyée récemment avec cette adresse email.',
      errorCode: 'rate_limit_email',
    };
  }

  const cvFile = formData.get('cv');
  const file = cvFile instanceof File && cvFile.size > 0 ? cvFile : null;

  let cvPath: string | null = null;
  let cvOriginalName: string | null = null;
  let cvSignedUrl: string | null = null;

  try {
    if (file) {
      const uploaded = await uploadCvIfPresent(file);
      cvPath = uploaded.path;
      cvOriginalName = uploaded.originalName;
      cvSignedUrl = uploaded.signedUrl;
    }
  } catch (err) {
    const code = err instanceof Error ? err.message : 'CV_ERROR';
    if (code === 'CV_INVALID_TYPE') {
      return {
        ok: false,
        error: 'Le CV doit être un fichier PDF.',
        errorCode: 'cv_type',
        fieldErrors: { cv: 'Format PDF uniquement.' },
      };
    }
    if (code === 'CV_TOO_LARGE') {
      return {
        ok: false,
        error: 'Le CV dépasse la taille maximale (5 Mo).',
        errorCode: 'cv_size',
        fieldErrors: { cv: 'Taille maximale : 5 Mo.' },
      };
    }
    if (code === 'STORAGE_CONFIG_MISSING') {
      console.error('[career-application] SUPABASE_SERVICE_ROLE_KEY manquante pour le CV');
      return {
        ok: false,
        error: `Réception des CV temporairement indisponible. Envoyez votre candidature par email à ${careerNotifyEmail(data.kind)}.`,
        errorCode: 'storage_config_missing',
      };
    }
    return {
      ok: false,
      error: 'Échec de l’envoi du CV. Réessayez ou contactez-nous par email.',
      errorCode: 'cv_upload_failed',
    };
  }

  if (!resend) {
    console.error('[career-application] RESEND_API_KEY manquante');
    return {
      ok: false,
      error: `Envoi temporairement indisponible. Écrivez à ${careerNotifyEmail(data.kind)} avec votre CV.`,
      errorCode: 'resend_missing',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laureolivie.fr';
  const sourcePage =
    data.sourcePage.trim() ||
    `${baseUrl.replace(/\/$/, '')}${data.kind === 'consultant' ? '/devenez-consultant' : '/candidatures-spontanees'}`;
  const submittedAt = new Date().toISOString();

  const applicationRow = {
    kind: data.kind,
    application_type: data.kind === 'spontaneous' ? data.applicationType : null,
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: data.phone?.trim() || null,
    expertise_domain: data.kind === 'consultant' ? data.expertiseDomain : null,
    desired_role: data.kind === 'spontaneous' ? data.desiredRole : null,
    presentation: data.presentation,
    mobility_idf: data.kind === 'consultant' ? data.mobilityIdf : null,
    formation_slugs: data.kind === 'consultant' ? data.formationSlugs?.trim() || null : null,
    availability: data.availability?.trim() || null,
    linkedin_or_portfolio: data.linkedinOrPortfolio?.trim() || null,
    cv_storage_path: cvPath,
    cv_original_name: cvOriginalName,
    source_page: sourcePage,
  };

  let dbSaved = false;
  try {
    const admin = createAdminClient();
    const { error: adminError } = await admin.from('career_applications').insert(applicationRow);
    if (!adminError) {
      dbSaved = true;
    } else {
      console.error(
        '[career-application] admin insert',
        adminError.message,
        adminError.code,
        adminError.details,
      );
    }
  } catch (err) {
    console.error('[career-application] admin insert unavailable', err);
  }

  if (!dbSaved) {
    try {
      const supabase = await createClient();
      const { error: dbError } = await supabase.from('career_applications').insert(applicationRow);
      if (!dbError) {
        dbSaved = true;
      } else {
        console.error(
          '[career-application] anon insert',
          dbError.message,
          dbError.code,
          dbError.details,
        );
      }
    } catch (err) {
      console.error('[career-application] anon insert', err);
    }
  }

  const subjectPrefix =
    data.kind === 'consultant'
      ? '[Carrière OFC] Proposition consultant'
      : '[Carrière OFC] Candidature spontanée';
  const notificationSubject = `${subjectPrefix} — ${data.firstName} ${data.lastName}`;

  const { error: notifyError } = await resend.emails.send({
    from: 'OFC Carrière <noreply@laureolivie.fr>',
    replyTo: data.email,
    to: careerNotifyEmail(data.kind),
    subject: notificationSubject,
    html: buildNotificationHtml(data, {
      submittedAt,
      sourcePage,
      cvOriginalName,
      cvSignedUrl,
    }),
  });

  if (notifyError) {
    console.error('[career-application] notify', notifyError);
    if (dbSaved) {
      return {
        ok: false,
        error:
          'Votre candidature est enregistrée mais la notification email a échoué. Nous vous recontacterons.',
        errorCode: 'notify_failed',
      };
    }
    return {
      ok: false,
      error: `L’envoi a échoué. Réessayez ou écrivez à ${careerNotifyEmail(data.kind)}.`,
      errorCode: 'notify_failed',
    };
  }

  if (!dbSaved) {
    console.warn('[career-application] notification envoyée sans enregistrement BDD');
  }

  return { ok: true, message: CAREER_FORM_SUCCESS };
}
