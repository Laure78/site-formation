/**
 * Dates / heures RDV — fuseau Europe/Paris (été / hiver).
 */

const PARIS = 'Europe/Paris';

export function formatRdvDateLong(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    timeZone: PARIS,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatRdvTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('fr-FR', {
    timeZone: PARIS,
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRdvDateTimeLong(iso: string): string {
  return `${formatRdvDateLong(iso)} à ${formatRdvTime(iso)}`;
}

/** YYYY-MM-DD du jour civil à Paris pour un Instant. */
export function parisDateKey(instant: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: PARIS,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(instant);
}

/** Heure 0–23 à Paris. */
export function parisHour(instant: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: PARIS,
    hour: 'numeric',
    hour12: false,
  }).formatToParts(instant);
  const h = parts.find((p) => p.type === 'hour')?.value;
  return Number(h ?? '0');
}

/** Clé date Paris du lendemain civil. */
export function parisTomorrowDateKey(instant: Date = new Date()): string {
  // Approche : midi UTC demain relatif à la date Paris d'aujourd'hui
  const todayKey = parisDateKey(instant);
  const [y, m, d] = todayKey.split('-').map(Number);
  // Midi Europe/Paris approximé via Date UTC + 12h décalé : on construit une date
  // « demain » en ajoutant 1 jour sur le calendrier civil Paris.
  const noonParisAsUtcGuess = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  // Ajuster pour que le format Paris soit bien todayKey (cas rare DST)
  let probe = noonParisAsUtcGuess;
  for (let i = 0; i < 3; i++) {
    if (parisDateKey(probe) === todayKey) break;
    probe = new Date(probe.getTime() + (parisDateKey(probe) < todayKey ? 3600_000 : -3600_000));
  }
  const tomorrow = new Date(probe.getTime() + 24 * 3600_000);
  return parisDateKey(tomorrow);
}

/**
 * Bornes UTC inclusives pour tous les instants dont la date civile Paris = dateKey.
 */
export function utcRangeForParisDate(dateKey: string): { startIso: string; endIso: string } {
  const [y, m, d] = dateKey.split('-').map(Number);
  // Cherche le premier instant UTC dont Paris = dateKey (balayage 15 min autour de minuit)
  let start = new Date(Date.UTC(y, m - 1, d - 1, 21, 0, 0)); // ~minuit Paris hiver
  while (parisDateKey(start) < dateKey) {
    start = new Date(start.getTime() + 15 * 60_000);
  }
  while (parisDateKey(new Date(start.getTime() - 60_000)) === dateKey) {
    start = new Date(start.getTime() - 60_000);
  }
  let end = new Date(start.getTime());
  while (parisDateKey(end) === dateKey) {
    end = new Date(end.getTime() + 15 * 60_000);
  }
  return { startIso: start.toISOString(), endIso: end.toISOString() };
}

export function buildGoogleCalendarUrl(params: {
  title: string;
  startIso: string;
  endIso: string;
  details?: string;
  location?: string;
}): string {
  const fmt = (iso: string) =>
    new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const q = new URLSearchParams({
    action: 'TEMPLATE',
    text: params.title,
    dates: `${fmt(params.startIso)}/${fmt(params.endIso)}`,
    details: params.details ?? '',
    location: params.location ?? '',
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

export function buildIcsContent(params: {
  title: string;
  startIso: string;
  endIso: string;
  description?: string;
  location?: string;
  uid: string;
}): string {
  const stamp = (iso: string) =>
    new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Laure Olivie//RDV//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${params.uid}`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(params.startIso)}`,
    `DTEND:${stamp(params.endIso)}`,
    `SUMMARY:${escape(params.title)}`,
    params.description ? `DESCRIPTION:${escape(params.description)}` : '',
    params.location ? `LOCATION:${escape(params.location)}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');
}
