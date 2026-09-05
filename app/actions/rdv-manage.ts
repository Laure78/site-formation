'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { cancelCalendarEvent, updateCalendarEvent } from '@/lib/google-calendar';
import { isSlotWithinBookingWindow } from '@/app/actions/booking-settings';
import { Resend } from 'resend';
import { CONTACT } from '@/lib/constants';
import { formatRdvDateTimeLong } from '@/lib/rdv-datetime';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL?.trim() || 'Laure Olivié <noreply@laureolivie.fr>';

export type ManagedAppointment = {
  id: string;
  start_at: string;
  end_at: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  status: string;
  meet_link: string | null;
  type_rdv: string | null;
  google_event_id: string | null;
};

function admin() {
  return createAdminClient();
}

export async function getAppointmentByManageToken(
  token: string,
): Promise<ManagedAppointment | null> {
  if (!token?.trim()) return null;
  try {
    const supabase = admin();
    const { data, error } = await supabase
      .from('appointments')
      .select(
        'id, start_at, end_at, client_name, client_email, client_phone, status, meet_link, type_rdv, google_event_id',
      )
      .eq('manage_token', token.trim())
      .maybeSingle();
    if (error || !data) return null;
    return data as ManagedAppointment;
  } catch {
    return null;
  }
}

export async function cancelAppointmentByToken(
  token: string,
): Promise<{ ok: boolean; error?: string }> {
  const appt = await getAppointmentByManageToken(token);
  if (!appt) return { ok: false, error: 'Rendez-vous introuvable.' };
  if (appt.status === 'annule') return { ok: true };

  try {
    const supabase = admin();
    const { error } = await supabase
      .from('appointments')
      .update({
        status: 'annule',
        reminder_sent_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', appt.id)
      .neq('status', 'annule');

    if (error) return { ok: false, error: error.message };

    if (appt.google_event_id) {
      await cancelCalendarEvent(appt.google_event_id);
    }

    if (resend) {
      await resend.emails.send({
        from: FROM_EMAIL,
        replyTo: CONTACT.email,
        to: appt.client_email,
        subject: 'Votre rendez-vous a été annulé',
        html: `<p>Bonjour,</p><p>Votre rendez-vous prévu le <strong>${formatRdvDateTimeLong(appt.start_at)}</strong> a bien été annulé.</p><p>Pour reprendre contact : <a href="https://www.laureolivie.fr/prendre-rendez-vous">réserver un nouveau créneau</a>.</p><p>Laure Olivié</p>`,
      });
      await resend.emails.send({
        from: FROM_EMAIL,
        replyTo: appt.client_email,
        to: CONTACT.email,
        subject: `RDV annulé — ${appt.client_name}`,
        html: `<p>Rendez-vous annulé : ${formatRdvDateTimeLong(appt.start_at)} — ${appt.client_name} (${appt.client_email}).</p>`,
      });
    }

    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Erreur serveur' };
  }
}

export async function rescheduleAppointmentByToken(params: {
  token: string;
  start_at: string;
  end_at: string;
}): Promise<{ ok: boolean; error?: string }> {
  const appt = await getAppointmentByManageToken(params.token);
  if (!appt) return { ok: false, error: 'Rendez-vous introuvable.' };
  if (appt.status === 'annule') {
    return { ok: false, error: 'Ce rendez-vous est annulé. Merci d’en réserver un nouveau.' };
  }

  const withinWindow = await isSlotWithinBookingWindow(params.start_at);
  if (!withinWindow) {
    return { ok: false, error: 'Ce créneau n’est plus disponible.' };
  }

  try {
    const supabase = admin();

    // Reset reminder_sent_at → le rappel suivra la nouvelle date (pas l’ancienne)
    const { error } = await supabase
      .from('appointments')
      .update({
        start_at: params.start_at,
        end_at: params.end_at,
        reminder_sent_at: null,
        status: 'confirme',
        updated_at: new Date().toISOString(),
      })
      .eq('id', appt.id);

    if (error) return { ok: false, error: error.message };

    if (appt.google_event_id) {
      await updateCalendarEvent({
        eventId: appt.google_event_id,
        startAt: params.start_at,
        endAt: params.end_at,
      });
    }

    if (resend) {
      await resend.emails.send({
        from: FROM_EMAIL,
        replyTo: CONTACT.email,
        to: appt.client_email,
        subject: 'Votre rendez-vous a été reporté',
        html: `<p>Bonjour,</p><p>Votre rendez-vous a été reporté au <strong>${formatRdvDateTimeLong(params.start_at)}</strong>.</p><p>Vous recevrez un rappel la veille à 15 h si le créneau le permet.</p><p>Laure Olivié</p>`,
      });
      await resend.emails.send({
        from: FROM_EMAIL,
        replyTo: appt.client_email,
        to: CONTACT.email,
        subject: `RDV reporté — ${appt.client_name}`,
        html: `<p>Ancien : ${formatRdvDateTimeLong(appt.start_at)}<br/>Nouveau : ${formatRdvDateTimeLong(params.start_at)}<br/>${appt.client_name} — ${appt.client_email}</p>`,
      });
    }

    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Erreur serveur' };
  }
}
