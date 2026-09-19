const WEEKDAYS_FR = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
] as const;

/** Lundi 00:00 local de la semaine ISO contenant `date`. */
export function startOfWeekMonday(date = new Date()): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay(); // 0 dim … 6 sam
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfWeekSunday(weekStart: Date): Date {
  const d = new Date(weekStart);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseDateKey(dateKey: string): Date {
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(y!, (m ?? 1) - 1, d ?? 1, 0, 0, 0, 0);
}

export function isSameLocalDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatWeekRangeLabel(weekStart: Date): string {
  const end = addDays(weekStart, 6);
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  const yearOpts: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const sameMonth =
    weekStart.getMonth() === end.getMonth() &&
    weekStart.getFullYear() === end.getFullYear();
  if (sameMonth) {
    return `${weekStart.getDate()} – ${end.toLocaleDateString('fr-FR', yearOpts)}`;
  }
  return `${weekStart.toLocaleDateString('fr-FR', opts)} – ${end.toLocaleDateString('fr-FR', yearOpts)}`;
}

export function weekdayLabel(date: Date): string {
  const day = date.getDay();
  const index = day === 0 ? 6 : day - 1;
  return WEEKDAYS_FR[index] ?? 'Jour';
}

export function formatTimeFr(iso: string): string {
  return new Date(iso).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Construit un ISO UTC depuis date/heure locales du navigateur (offset en minutes, style getTimezoneOffset). */
export function combineLocalDateAndTime(
  dateKey: string,
  timeHm: string,
  timezoneOffsetMinutes: number
): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const [h, min] = timeHm.split(':').map(Number);
  // getTimezoneOffset : UTC+2 → -120 ; on ajoute l’offset pour obtenir l’UTC réel
  const utcMs =
    Date.UTC(y!, (m ?? 1) - 1, d ?? 1, h ?? 0, min ?? 0, 0) +
    timezoneOffsetMinutes * 60_000;
  return new Date(utcMs).toISOString();
}

export function toInputDateValue(date: Date): string {
  return toDateKey(date);
}

export function toInputTimeValue(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export { WEEKDAYS_FR };
