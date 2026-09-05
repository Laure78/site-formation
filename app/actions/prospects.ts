'use server';

import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSlotWithinBookingWindow } from '@/app/actions/booking-settings';
import { createCalendarEvent } from '@/lib/google-calendar';
import { CONTACT } from '@/lib/constants';
import { Resend } from 'resend';
import { checkRateLimit } from '@/lib/rate-limit';
import {
  buildClientConfirmationEmail,
  buildLaureNotificationEmail,
  type RdvEmailContext,
} from '@/lib/rdv-emails';
import { buildGoogleCalendarUrl } from '@/lib/rdv-datetime';
import {
  buildProjetSummary,
  computeRdvLeadScore,
  mapLegacyProspectColumns,
  type CreateRdvBookingInput,
  type RdvQualificationPayload,
} from '@/lib/rdv-qualification';
import { labelFor, RDV_PRIORITE_AO } from '@/lib/rdv-form-options';
import type { SupabaseClient } from '@supabase/supabase-js';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL?.trim() || 'Laure Olivié <noreply@laureolivie.fr>';
const REPLY_TO = CONTACT.email;
const LAURE_INBOX = process.env.RDV_NOTIFY_EMAIL?.trim() || CONTACT.email;

/** @deprecated — conserver pour QualificationForm legacy éventuel */
export type QualificationFormData = {
  start_at: string;
  end_at: string;
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  entreprise?: string;
  secteur?: string;
  taille_entreprise?: string;
  niveau_ia?: string;
  objectif?: string;
  budget?: string;
  projet?: string;
  type_rdv?: 'telephone' | 'visio';
};

function siteBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laureolivie.fr').replace(/\/$/, '');
}

async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first && first.length <= 64) return first;
  }
  return h.get('x-real-ip')?.trim() || 'unknown';
}

function toEmailContext(
  q: CreateRdvBookingInput,
  extras: {
    startAt: string;
    endAt: string;
    meetLink?: string | null;
    manageUrl?: string | null;
    googleCalUrl?: string | null;
  },
): RdvEmailContext {
  return {
    prenom: q.prenom,
    nom: q.nom,
    email: q.email,
    telephone: q.telephone,
    entreprise: q.entreprise,
    fonction: q.fonction,
    taille: q.taille_entreprise,
    besoins: q.besoins ?? [],
    prioriteAo: q.priorite_ao ? labelFor(RDV_PRIORITE_AO, q.priorite_ao) : null,
    personnesConcernees: q.personnes_concernees,
    niveauIa: q.niveau_ia,
    echeance: q.echeance,
    probleme: q.probleme,
    startAt: extras.startAt,
    endAt: extras.endAt,
    dureeMinutes: 30,
    meetLink: extras.meetLink,
    typeRdv: q.type_rdv === 'telephone' ? 'telephone' : 'visio',
    manageUrl: extras.manageUrl,
    googleCalUrl: extras.googleCalUrl,
    sourcePage: q.source_page,
    utm: q.utm,
  };
}

/**
 * Crée prospect + rendez-vous confirmé, Google Calendar, emails client + Laure.
 * Idempotence soft : rate-limit IP/email + honeypot.
 */
export async function createProspectAndAppointment(
  data: CreateRdvBookingInput | QualificationFormData,
): Promise<
  | { ok: true; prospectId: string; score: number; questionnaireToken: string; manageToken: string; appointmentId: string }
  | { ok: false; error: string }
> {
  // Compat legacy QualificationForm
  const normalized: CreateRdvBookingInput =
    'besoins' in data && Array.isArray((data as CreateRdvBookingInput).besoins)
      ? (data as CreateRdvBookingInput)
      : (() => {
          const legacy = data as QualificationFormData;
          return {
            start_at: legacy.start_at,
            end_at: legacy.end_at,
            prenom: legacy.prenom,
            nom: legacy.nom,
            email: legacy.email,
            telephone: legacy.telephone,
            entreprise: legacy.entreprise || '',
            besoins: legacy.objectif ? [String(legacy.objectif)] : ['autre'],
            taille_entreprise: legacy.taille_entreprise,
            niveau_ia:
              legacy.niveau_ia === 'jamais'
                ? 'pas_encore'
                : legacy.niveau_ia === 'teste'
                  ? 'un_peu'
                  : legacy.niveau_ia === 'oui_regulier'
                    ? 'regulierement'
                    : undefined,
            probleme: legacy.projet,
            type_rdv: legacy.type_rdv,
          } satisfies CreateRdvBookingInput;
        })();

  if (normalized.website?.trim()) {
    return { ok: true, prospectId: 'honeypot', score: 0, questionnaireToken: '', manageToken: '', appointmentId: '' };
  }

  const email = normalized.email.trim().toLowerCase();
  const prenom = normalized.prenom.trim();
  const nom = normalized.nom.trim();
  const entreprise = normalized.entreprise.trim();

  if (!prenom || !nom || !email || !entreprise) {
    return { ok: false, error: 'Merci de renseigner prénom, nom, email et entreprise.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Adresse email invalide.' };
  }
  if (!normalized.besoins?.length) {
    return { ok: false, error: 'Sélectionnez au moins un besoin.' };
  }

  const ip = await clientIp();
  const rlIp = checkRateLimit(`rdv:ip:${ip}`, 8, 60 * 60_000);
  const rlEmail = checkRateLimit(`rdv:email:${email}`, 4, 60 * 60_000);
  if (!rlIp.ok || !rlEmail.ok) {
    return { ok: false, error: 'Trop de tentatives. Réessayez dans quelques minutes.' };
  }

  const withinWindow = await isSlotWithinBookingWindow(normalized.start_at);
  if (!withinWindow) {
    return {
      ok: false,
      error:
        "Ce créneau n'est plus disponible. La réservation est limitée à la fenêtre d'ouverture. Merci de choisir une autre date.",
    };
  }

  let supabase: SupabaseClient;
  try {
    supabase = createAdminClient();
  } catch {
    supabase = await createClient();
  }

  const score = computeRdvLeadScore(normalized);
  const legacy = mapLegacyProspectColumns(normalized);
  const questionnaireToken = crypto.randomUUID();
  const manageToken = crypto.randomUUID();
  const projet = buildProjetSummary(normalized);

  const meta = {
    source_page: normalized.source_page ?? null,
    utm: normalized.utm ?? null,
    referer: normalized.referer ?? null,
    formation_consultee: normalized.formation_consultee ?? null,
    form_started_at: normalized.form_started_at ?? null,
    created_via: 'rdv_booking_flow',
    taille_ux: normalized.taille_entreprise ?? null,
    niveau_ia_ux: normalized.niveau_ia ?? null,
    echeance: normalized.echeance ?? null,
    fonction: normalized.fonction ?? null,
    personnes_concernees: normalized.personnes_concernees ?? null,
    besoins: normalized.besoins,
    priorite_ao: normalized.priorite_ao ?? null,
  };

  const { data: prospect, error: errProspect } = await supabase
    .from('prospects')
    .insert({
      nom,
      prenom,
      email,
      telephone: normalized.telephone?.trim() || null,
      entreprise,
      secteur: legacy.secteur,
      // Toujours legacy-safe (CHECK) ; valeurs UX dans meta + colonnes étendues
      taille_entreprise: legacy.taille_entreprise_legacy,
      niveau_ia: legacy.niveau_ia_legacy,
      objectif: legacy.objectif_legacy,
      budget: null,
      projet: projet || null,
      fonction: normalized.fonction || null,
      besoins: normalized.besoins,
      personnes_concernees: normalized.personnes_concernees || null,
      echeance: normalized.echeance || null,
      priorite_detail: normalized.priorite_ao
        ? labelFor(RDV_PRIORITE_AO, normalized.priorite_ao)
        : null,
      source_page: normalized.source_page || null,
      utm: normalized.utm || null,
      meta,
      score,
      pipeline_etape: 'rdv_programme',
      questionnaire_token: questionnaireToken,
    })
    .select('id')
    .single();

  if (errProspect) {
    console.error('[createProspect]', errProspect);
    const { data: prospectFallback, error: err2 } = await supabase
      .from('prospects')
      .insert({
        nom,
        prenom,
        email,
        telephone: normalized.telephone?.trim() || null,
        entreprise,
        secteur: legacy.secteur,
        taille_entreprise: legacy.taille_entreprise_legacy,
        niveau_ia: legacy.niveau_ia_legacy,
        objectif: legacy.objectif_legacy,
        budget: null,
        projet: JSON.stringify({
          ...meta,
          probleme: normalized.probleme,
          score,
        }),
        score,
        pipeline_etape: 'rdv_programme',
        questionnaire_token: questionnaireToken,
      })
      .select('id')
      .single();
    if (err2 || !prospectFallback) {
      return { ok: false, error: err2?.message || errProspect.message };
    }
    return finalizeAppointment(supabase, {
      prospectId: prospectFallback.id,
      normalized,
      email,
      prenom,
      nom,
      score,
      questionnaireToken,
      manageToken,
      projet,
    });
  }

  return finalizeAppointment(supabase, {
    prospectId: prospect.id,
    normalized,
    email,
    prenom,
    nom,
    score,
    questionnaireToken,
    manageToken,
    projet,
  });
}

async function finalizeAppointment(
  supabase: SupabaseClient,
  args: {
    prospectId: string;
    normalized: CreateRdvBookingInput;
    email: string;
    prenom: string;
    nom: string;
    score: number;
    questionnaireToken: string;
    manageToken: string;
    projet: string;
  },
): Promise<
  | { ok: true; prospectId: string; score: number; questionnaireToken: string; manageToken: string; appointmentId: string }
  | { ok: false; error: string }
> {
  const { prospectId, normalized, email, prenom, nom, score, questionnaireToken, manageToken, projet } =
    args;
  const typeRdv = normalized.type_rdv === 'telephone' ? 'telephone' : 'visio';
  const clientName = `${prenom} ${nom}`;
  const startAt = normalized.start_at;
  const endAt = normalized.end_at;

  let googleEventId: string | null = null;
  let meetLink: string | undefined;
  const calResult = await createCalendarEvent({
    title: `RDV formation IA — ${clientName}`,
    startAt,
    endAt,
    clientName,
    clientEmail: email,
    clientPhone: normalized.telephone || null,
    clientMessage: projet || null,
    typeRdv,
  });
  if (calResult.ok && calResult.eventId) {
    googleEventId = calResult.eventId;
    meetLink = calResult.meetLink;
  } else if (calResult.error) {
    console.error('[Google Calendar]', calResult.error);
  }

  const insertPayload: Record<string, unknown> = {
    start_at: startAt,
    end_at: endAt,
    client_name: clientName,
    client_email: email,
    client_phone: normalized.telephone || null,
    client_message: projet || null,
    prospect_id: prospectId,
    type_rdv: typeRdv,
    google_event_id: googleEventId,
    meet_link: meetLink || null,
    status: 'confirme',
    manage_token: manageToken,
  };

  let { data: appt, error: errAppt } = await supabase
    .from('appointments')
    .insert(insertPayload)
    .select('id, manage_token')
    .single();

  if (errAppt?.message?.includes('manage_token') || errAppt?.code === 'PGRST204') {
    delete insertPayload.manage_token;
    const retry = await supabase
      .from('appointments')
      .insert(insertPayload)
      .select('id')
      .single();
    appt = retry.data ? { id: retry.data.id, manage_token: manageToken } : null;
    errAppt = retry.error;
  }

  if (errAppt || !appt) {
    console.error('[createAppointment]', errAppt);
    return { ok: false, error: errAppt?.message || 'Erreur enregistrement rendez-vous' };
  }

  const token = (appt as { manage_token?: string }).manage_token || manageToken;
  const baseUrl = siteBaseUrl();
  const manageUrl = `${baseUrl}/rdv/${token}`;
  const googleCalUrl = buildGoogleCalendarUrl({
    title: `Rendez-vous Laure Olivié — Formation IA BTP`,
    startIso: startAt,
    endIso: endAt,
    details: meetLink ? `Visio : ${meetLink}` : 'Rendez-vous découverte formation IA BTP',
    location: meetLink || undefined,
  });

  const ctx = toEmailContext(normalized, {
    startAt,
    endAt,
    meetLink,
    manageUrl,
    googleCalUrl,
  });

  if (resend) {
    const clientMail = buildClientConfirmationEmail(ctx);
    const laureMail = buildLaureNotificationEmail(ctx);

    const { error: errClient } = await resend.emails.send({
      from: FROM_EMAIL,
      replyTo: REPLY_TO,
      to: email,
      subject: clientMail.subject,
      html: clientMail.html,
    });
    if (errClient) console.error('[rdv] email client', errClient);

    const { error: errLaure } = await resend.emails.send({
      from: FROM_EMAIL,
      replyTo: email,
      to: LAURE_INBOX,
      subject: laureMail.subject,
      html: laureMail.html,
    });
    if (errLaure) console.error('[rdv] email laure', errLaure);
  } else {
    console.warn('[rdv] RESEND_API_KEY manquant — emails non envoyés');
  }

  return {
    ok: true,
    prospectId,
    score,
    questionnaireToken,
    manageToken: token,
    appointmentId: appt.id,
  };
}

export async function addProspectNoteAction(
  prospectId: string,
  data: { type_note: 'note' | 'cr_rdv' | 'action_suivante'; contenu: string },
): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase.from('prospect_notes').insert({
    prospect_id: prospectId,
    type_note: data.type_note,
    contenu: data.contenu,
    created_by: user.id,
  });
  return !error;
}

export type QuestionnaireData = {
  nb_salaries?: string;
  outils_utilises?: string;
  taches_chronophages?: string;
};

export async function submitQuestionnaireAction(
  token: string,
  data: QuestionnaireData,
): Promise<{ ok: boolean; error?: string }> {
  if (!token?.trim()) return { ok: false, error: 'Token manquant' };
  const supabase = await createClient();
  const { data: res, error } = await supabase.rpc('update_prospect_questionnaire', {
    p_token: token.trim(),
    p_nb_salaries: data.nb_salaries?.trim() || null,
    p_outils: data.outils_utilises?.trim() || null,
    p_taches: data.taches_chronophages?.trim() || null,
  });
  if (error) return { ok: false, error: error.message };
  if (res && typeof res === 'object' && 'ok' in res && !(res as { ok: boolean }).ok) {
    return { ok: false, error: 'Token invalide ou expiré' };
  }
  return { ok: true };
}

export type { RdvQualificationPayload, CreateRdvBookingInput };
