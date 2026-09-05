/**
 * Cron rappel RDV — la veille à 15:00 Europe/Paris.
 *
 * Vercel Cron est en UTC : on planifie 13:00 et 14:00 UTC, puis on n'agit
 * que si l'heure civile à Paris est exactement 15 h.
 *
 * Règles :
 * - RDV confirmés (status ≠ annule), start_at = demain (date Paris)
 * - reminder_sent_at IS NULL (idempotence)
 * - RDV le jour même → jamais sélectionnés (pas « demain »)
 * - RDV demain réservé après 15 h J-1 → le cron J-1 a déjà tourné : pas de rappel redondant
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { CONTACT } from '@/lib/constants';
import {
  buildClientReminderEmail,
  type RdvEmailContext,
} from '@/lib/rdv-emails';
import {
  buildGoogleCalendarUrl,
  parisHour,
  parisTomorrowDateKey,
  utcRangeForParisDate,
} from '@/lib/rdv-datetime';
import { labelsForBesoins } from '@/lib/rdv-form-options';

export const maxDuration = 60;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL?.trim() || 'Laure Olivié <noreply@laureolivie.fr>';

function siteBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laureolivie.fr').replace(/\/$/, '');
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const secret = process.env.CRON_SECRET;
  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const force = req.nextUrl.searchParams.get('force') === '1';
  const hour = parisHour(now);

  // Ne s'exécute qu'à 15 h Paris (sauf force=1 pour tests manuels)
  if (!force && hour !== 15) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: `Heure Paris = ${hour}h (attendu 15h)`,
    });
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ error: 'Config Supabase manquante' }, { status: 500 });
  }

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  if (!resend) {
    return NextResponse.json({ error: 'RESEND_API_KEY manquant' }, { status: 500 });
  }

  const tomorrowKey = parisTomorrowDateKey(now);
  const { startIso, endIso } = utcRangeForParisDate(tomorrowKey);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const { data: rows, error } = await supabase
    .from('appointments')
    .select(
      `
      id,
      start_at,
      end_at,
      client_name,
      client_email,
      client_phone,
      client_message,
      status,
      meet_link,
      type_rdv,
      manage_token,
      reminder_sent_at,
      prospect_id,
      prospects (
        prenom,
        nom,
        entreprise,
        fonction,
        besoins,
        taille_entreprise,
        niveau_ia,
        personnes_concernees,
        echeance,
        priorite_detail,
        projet,
        meta
      )
    `,
    )
    .gte('start_at', startIso)
    .lt('start_at', endIso)
    .is('reminder_sent_at', null)
    .neq('status', 'annule');

  if (error) {
    console.error('[rdv-reminders]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const baseUrl = siteBaseUrl();
  let sent = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const row of rows ?? []) {
    // Claim atomique — évite double envoi multi-instance
    const { data: claimed, error: claimErr } = await supabase
      .from('appointments')
      .update({ reminder_sent_at: new Date().toISOString() })
      .eq('id', row.id)
      .is('reminder_sent_at', null)
      .neq('status', 'annule')
      .select('id, status')
      .maybeSingle();

    if (claimErr || !claimed) {
      skipped += 1;
      continue;
    }

    // Re-vérifier statut après claim
    if (claimed.status === 'annule') {
      skipped += 1;
      continue;
    }

    const prospect = Array.isArray(row.prospects) ? row.prospects[0] : row.prospects;
    const p = prospect as {
      prenom?: string;
      nom?: string;
      entreprise?: string;
      fonction?: string;
      besoins?: string[];
      taille_entreprise?: string;
      niveau_ia?: string;
      personnes_concernees?: string;
      echeance?: string;
      projet?: string;
      meta?: {
        taille_ux?: string;
        niveau_ia_ux?: string;
        echeance?: string;
        fonction?: string;
        personnes_concernees?: string;
        besoins?: string[];
      } | null;
    } | null;
    const meta = p?.meta ?? null;
    const nameParts = String(row.client_name || '').trim().split(/\s+/);
    const prenom = p?.prenom || nameParts[0] || '';
    const nom = p?.nom || nameParts.slice(1).join(' ') || '';
    const besoins = meta?.besoins || p?.besoins || [];

    const manageToken = (row as { manage_token?: string }).manage_token;
    const meetLink = row.meet_link as string | null;
    const googleCalUrl = buildGoogleCalendarUrl({
      title: 'Rendez-vous Laure Olivié — Formation IA BTP',
      startIso: row.start_at,
      endIso: row.end_at,
      details: meetLink ? `Visio : ${meetLink}` : '',
      location: meetLink || undefined,
    });

    const ctx: RdvEmailContext = {
      prenom,
      nom,
      email: row.client_email,
      telephone: row.client_phone,
      entreprise: p?.entreprise || '—',
      fonction: meta?.fonction || p?.fonction,
      taille: meta?.taille_ux || p?.taille_entreprise,
      besoins,
      personnesConcernees: meta?.personnes_concernees || p?.personnes_concernees,
      niveauIa: meta?.niveau_ia_ux || p?.niveau_ia,
      echeance: meta?.echeance || p?.echeance,
      probleme: p?.projet || (row.client_message as string | null),
      startAt: row.start_at,
      endAt: row.end_at,
      dureeMinutes: 30,
      meetLink,
      typeRdv: row.type_rdv === 'telephone' ? 'telephone' : 'visio',
      manageUrl: manageToken ? `${baseUrl}/rdv/${manageToken}` : null,
      googleCalUrl,
    };

    const mail = buildClientReminderEmail(ctx);
    const { error: sendErr } = await resend.emails.send({
      from: FROM_EMAIL,
      replyTo: CONTACT.email,
      to: row.client_email,
      subject: mail.subject,
      html: mail.html,
    });

    if (sendErr) {
      errors.push(`${row.id}: ${sendErr.message}`);
      // Libérer le claim pour retry le lendemain… non : le RDV est demain, retry inutile après 15h.
      // On laisse reminder_sent_at pour éviter spam ; log l'erreur.
      console.error('[rdv-reminders] send', row.id, sendErr);
    } else {
      sent += 1;
      // Log utile debug (sans PII email)
      console.info('[rdv-reminders] sent', row.id, labelsForBesoins(besoins).join(','));
    }
  }

  return NextResponse.json({
    ok: true,
    tomorrow: tomorrowKey,
    candidates: rows?.length ?? 0,
    sent,
    skipped,
    errors: errors.length ? errors : undefined,
  });
}
