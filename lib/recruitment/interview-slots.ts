import { RECRUITMENT_DEFAULT_PLANNING_DATE } from '@/lib/recruitment/constants';

const TZ = 'Europe/Paris';

/** Créneaux de 30 min — matin 10h00–12h30, après-midi 14h00–17h00 (heure de Paris). */
export const INTERVIEW_SLOT_TIMES = [
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
] as const;

export type InterviewSlotTime = (typeof INTERVIEW_SLOT_TIMES)[number];

/** Date YYYY-MM-DD depuis searchParams ou défaut projet. */
export function resolvePlanningDate(raw: string | null | undefined): string {
  const v = raw?.trim();
  if (v && /^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  return RECRUITMENT_DEFAULT_PLANNING_DATE;
}

/** Offset UTC+1 / +2 pour Paris (simplifié : nov. = CET +01). */
function parisOffsetForDate(dateYmd: string): string {
  const [, month] = dateYmd.split('-').map(Number);
  if (month >= 4 && month <= 9) return '+02';
  return '+01';
}

/** ISO timestamptz pour un créneau (date + HH:mm Paris). */
export function slotToInterviewAt(dateYmd: string, time: InterviewSlotTime): string {
  const offset = parisOffsetForDate(dateYmd);
  return `${dateYmd}T${time}:00${offset}`;
}

/** Extrait HH:mm Paris depuis interview_at ISO. */
export function interviewAtToSlotTime(iso: string | null | undefined): InterviewSlotTime | null {
  if (!iso) return null;
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat('fr-FR', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(d);
  const hour = parts.find((p) => p.type === 'hour')?.value ?? '00';
  const minute = parts.find((p) => p.type === 'minute')?.value ?? '00';
  const key = `${hour}:${minute}` as InterviewSlotTime;
  return INTERVIEW_SLOT_TIMES.includes(key) ? key : null;
}

/** Date YYYY-MM-DD (Paris) depuis interview_at. */
export function interviewAtToDateYmd(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(d);
}

export function formatSlotLabel(time: InterviewSlotTime): string {
  return time.replace(':', 'h');
}
