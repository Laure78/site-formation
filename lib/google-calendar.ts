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

/** Annule un événement Google Calendar (soft delete). */
export async function cancelCalendarEvent(eventId: string): Promise<{ ok: boolean; error?: string }> {
  const { client, calendarId, error } = getCalendarClient();
  if (!client || !calendarId) return { ok: false, error: error ?? 'Config manquante' };
  try {
    await client.events.delete({
      calendarId,
      eventId,
      sendUpdates: 'all',
    });
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erreur inconnue';
    console.error('[Google Calendar] cancel', e);
    return { ok: false, error: msg };
  }
}

/** Met à jour date/heure d’un événement (report). Remet Meet si déjà présent. */
export async function updateCalendarEvent(params: {
  eventId: string;
  startAt: string;
  endAt: string;
  title?: string;
  description?: string;
}): Promise<{ ok: boolean; meetLink?: string; error?: string }> {
  const { client, calendarId, error } = getCalendarClient();
  if (!client || !calendarId) return { ok: false, error: error ?? 'Config manquante' };
  try {
    const res = await client.events.patch({
      calendarId,
      eventId: params.eventId,
      requestBody: {
        ...(params.title ? { summary: params.title } : {}),
        ...(params.description ? { description: params.description } : {}),
        start: { dateTime: params.startAt, timeZone: 'Europe/Paris' },
        end: { dateTime: params.endAt, timeZone: 'Europe/Paris' },
      },
      sendUpdates: 'all',
    });
    const meetLink = res.data.conferenceData?.entryPoints?.find((e) => e.entryPointType === 'video')
      ?.uri as string | undefined;
    return { ok: true, meetLink };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erreur inconnue';
    console.error('[Google Calendar] update', e);
    return { ok: false, error: msg };
  }
}

/**
 * Teste la connexion Google Calendar — pour diagnostic admin.
 * Vérifie que les variables sont définies et que l'accès au calendrier fonctionne.
 */
export async function testGoogleCalendarConnection(): Promise<{
  ok: boolean;
  message: string;
  details?: { calendarId?: string; serviceAccountEmail?: string };
}> {
  const credsJson = process.env.GOOGLE_CALENDAR_CREDENTIALS_JSON;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!credsJson || !calendarId) {
    const missing: string[] = [];
    if (!credsJson) missing.push('GOOGLE_CALENDAR_CREDENTIALS_JSON');
    if (!calendarId) missing.push('GOOGLE_CALENDAR_ID');
    return { ok: false, message: `Variables manquantes sur le serveur : ${missing.join(', ')}. Ajoutez-les dans Railway (Variables) puis redéployez.` };
  }

  let serviceAccountEmail: string | undefined;
  try {
    const credentials = JSON.parse(credsJson);
    serviceAccountEmail = credentials.client_email;
  } catch {
    return { ok: false, message: 'GOOGLE_CALENDAR_CREDENTIALS_JSON invalide (JSON mal formé). Vérifiez que le JSON est complet et sur une seule ligne.' };
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credsJson),
      scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'],
    });
    const calendar = google.calendar({ version: 'v3', auth });

    // Test 1 : récupérer les infos du calendrier (vérifie le partage)
    await calendar.calendars.get({ calendarId });
  } catch (e: unknown) {
    const err = e as { code?: number; message?: string };
    if (err.code === 404 || err.message?.includes('404')) {
      return {
        ok: false,
        message: `Calendrier introuvable (404). Vérifiez que GOOGLE_CALENDAR_ID est correct (ex. laureolivie@gmail.com). Valeur actuelle : "${calendarId}"`,
        details: { calendarId, serviceAccountEmail },
      };
    }
    if (err.code === 403 || err.message?.includes('403') || err.message?.includes('Access denied')) {
      return {
        ok: false,
        message: `Accès refusé. Le calendrier doit être partagé avec le compte de service. Allez sur calendar.google.com → Paramètres du calendrier → Partager avec des personnes → Ajoutez "${serviceAccountEmail}" avec le droit "Peut modifier les créneaux".`,
        details: { calendarId, serviceAccountEmail },
      };
    }
    return {
      ok: false,
      message: err.message ?? 'Erreur inconnue',
      details: { calendarId, serviceAccountEmail },
    };
  }

  return {
    ok: true,
    message: 'Connexion OK. Le calendrier est accessible. Les événements devraient apparaître dans ton agenda.',
    details: { calendarId, serviceAccountEmail },
  };
}
