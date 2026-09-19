const MONTHS_FR = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
] as const;

export const WEEKDAYS_FR = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
] as const;

export function monthTitle(date: Date): string {
  return MONTHS_FR[date.getMonth()] ?? 'Mois';
}

export function nextMonthDate(from = new Date()): Date {
  return new Date(from.getFullYear(), from.getMonth() + 1, 1);
}

/** Lundi de la semaine (ISO) contenant `date`. */
export function startOfIsoWeek(date = new Date()): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay(); // 0 dimanche … 6 samedi
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function formatWeekRangeLabel(from = new Date()): string {
  const start = startOfIsoWeek(from);
  const end = new Date(start);
  end.setDate(start.getDate() + 4); // vendredi
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  const a = start.toLocaleDateString('fr-FR', opts);
  const b = end.toLocaleDateString('fr-FR', opts);
  return `Semaine du ${a} au ${b}`;
}
