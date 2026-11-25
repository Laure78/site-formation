import type { ExtranetMissionRow, ExtranetMissionStatus } from './phase2-types';

/** Session affichée dans l’agenda formateur (dérivée d’une mission extranet). */
export type FormateurAgendaSession = {
  id: string;
  title: string;
  startsOn: string;
  endsOn: string | null;
  status: ExtranetMissionStatus;
  modality: string;
  scheduleText: string | null;
  durationHours: number | null;
  locationName: string | null;
  locationCity: string | null;
  clientCompanyName: string | null;
};

export function missionToAgendaSession(m: ExtranetMissionRow): FormateurAgendaSession {
  return {
    id: m.id,
    title: m.title,
    startsOn: m.starts_on.slice(0, 10),
    endsOn: m.ends_on ? m.ends_on.slice(0, 10) : null,
    status: m.status,
    modality: m.modality,
    scheduleText: m.schedule_text,
    durationHours: m.duration_hours,
    locationName: m.location_name,
    locationCity: m.location_city,
    clientCompanyName: m.client_company_name,
  };
}

export function dateKeyFromParts(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export function parseDateKey(key: string): { year: number; month: number; day: number } {
  const [y, m, d] = key.split('-').map(Number);
  return { year: y, month: m - 1, day: d };
}

export function missionOccursOn(session: FormateurAgendaSession, dateKey: string): boolean {
  const end = session.endsOn ?? session.startsOn;
  return dateKey >= session.startsOn && dateKey <= end;
}

export function sessionsOnDate(sessions: FormateurAgendaSession[], dateKey: string): FormateurAgendaSession[] {
  return sessions.filter((s) => missionOccursOn(s, dateKey));
}

/** Grille du mois : semaines × 7 jours (cases hors mois = null). */
export function buildMonthGrid(year: number, month: number): (string | null)[][] {
  const first = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0).getDate();
  // Lundi = 0 … dimanche = 6 (ISO)
  const firstWeekday = (first.getDay() + 6) % 7;

  const cells: (string | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= lastDay; day++) {
    cells.push(dateKeyFromParts(year, month, day));
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (string | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

export function addMonths(year: number, month: number, delta: number): { year: number; month: number } {
  const d = new Date(year, month + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

export const AGENDA_STATUS_TONE: Record<ExtranetMissionStatus, string> = {
  draft: 'bg-slate-100 text-slate-700 border-slate-200',
  assigned: 'bg-sky-50 text-sky-900 border-sky-200',
  confirmed: 'bg-[#EFF6FF] text-[#1e40af] border-[#93c5fd]',
  in_progress: 'bg-violet-50 text-violet-900 border-violet-200',
  completed: 'bg-emerald-50 text-emerald-900 border-emerald-200',
  cancelled: 'bg-red-50 text-red-800 border-red-200',
};