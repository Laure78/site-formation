/**
 * Intégration Google Calendar API — Création d'événements dans l'agenda Laure
 * Utilise un Service Account. Le calendrier doit être partagé avec l'email du service account.
 */

import { google } from 'googleapis';

export type RdvType = 'telephone' | 'visio';

export interface CreateCalendarEventParams {
  title: string;
  startAt: string; // ISO
  endAt: string; // ISO
  clientName: string;
  clientEmail: string;
  clientPhone?: string | null;
  clientMessage?: string | null;
  typeRdv: RdvType;
}

export interface CreateCalendarEventResult {
  ok: boolean;
  eventId?: string;
  meetLink?: string;
  error?: string;
}

function getCalendarClient() {
  const credsJson = process.env.GOOGLE_CALENDAR_CREDENTIALS_JSON;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!credsJson || !calendarId) {
    return { client: null, calendarId: null, error: 'GOOGLE_CALENDAR_CREDENTIALS_JSON ou GOOGLE_CALENDAR_ID manquant' };
  }
  try {
    const credentials = JSON.parse(credsJson);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'],
    });
    const calendar = google.calendar({ version: 'v3', auth });
    return { client: calendar, calendarId, error: null };
  } catch (e) {
    return { client: null, calendarId: null, error: e instanceof Error ? e.message : 'Erreur parse credentials' };
  }
}

/**
 * Crée un événement dans Google Calendar. Pour type visio, ajoute Google Meet.
 * Retourne eventId et meetLink (si visio) pour les stocker / envoyer au client.
 */
export async function createCalendarEvent(params: CreateCalendarEventParams): Promise<CreateCalendarEventResult> {
  const { client, calendarId, error } = getCalendarClient();
  if (!client || !calendarId) {
    console.error('[Google Calendar]', error);
    return { ok: false, error: error ?? 'Configuration Google Calendar manquante' };
  }

  const descParts = [
    `Client : ${params.clientName}`,
    `Email : ${params.clientEmail}`,
    params.clientPhone ? `Tél : ${params.clientPhone}` : '',
    params.typeRdv === 'telephone' ? 'RDV téléphonique — Appeler le client.' : 'RDV visio Google Meet',
    params.clientMessage ? `\nProjet : ${params.clientMessage}` : '',
  ].filter(Boolean);

  const event: Record<string, unknown> = {
    summary: `RDV formation IA — ${params.clientName}`,
    description: descParts.join('\n'),
    attendees: [{ email: params.clientEmail }],
    start: {
      dateTime: params.startAt,
      timeZone: 'Europe/Paris',
    },
    end: {
      dateTime: params.endAt,
      timeZone: 'Europe/Paris',
    },
  };

  if (params.typeRdv === 'visio') {
    (event as { conferenceData?: { createRequest?: { requestId: string; conferenceSolutionKey?: { type: string } } } }).conferenceData = {
      createRequest: {
        requestId: `rdv-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    };
  }

  try {
    const res = await client.events.insert({
      calendarId,
      requestBody: event,
      conferenceDataVersion: params.typeRdv === 'visio' ? 1 : 0,
      sendUpdates: 'all', // Envoie l'invitation par email aux participants (si on les ajoute)
    });

    const eventId = res.data.id ?? undefined;
    let meetLink = params.typeRdv === 'visio'
      ? (res.data.conferenceData?.entryPoints?.find((e) => e.entryPointType === 'video')?.uri as string | undefined)
      : undefined;

    // Fallback : si visio mais pas de lien dans la réponse, récupérer l'événement (la conf Meet peut être créée avec un léger délai)
    if (params.typeRdv === 'visio' && eventId && !meetLink) {
      await new Promise((r) => setTimeout(r, 1500));
      const ev = await client.events.get({ calendarId, eventId });
      meetLink = ev.data.conferenceData?.entryPoints?.find((e) => e.entryPointType === 'video')?.uri as string | undefined;
    }

    return { ok: true, eventId, meetLink };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erreur inconnue';
    console.error('[Google Calendar] create event', e);
    return { ok: false, error: msg };
  }
}
