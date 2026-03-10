'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react';
import { createAppointment, getBusySlots } from '@/app/actions/appointments';

const DUREE_CRENEAU_MINUTES = 30;
const HEURES_MATIN = [9, 10, 11]; // 9h à 12h
const HEURES_APRES_MIDI = [14, 15, 16, 17]; // 14h à 18h

function formatDateISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function getTimeSlotsForDate(date: Date): string[] {
  const slots: string[] = [];
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  for (const h of HEURES_MATIN) {
    slots.push(new Date(year, month, day, h, 0, 0).toISOString());
    if (h < 12) slots.push(new Date(year, month, day, h, 30, 0).toISOString());
  }
  for (const h of HEURES_APRES_MIDI) {
    slots.push(new Date(year, month, day, h, 0, 0).toISOString());
    slots.push(new Date(year, month, day, h, 30, 0).toISOString());
  }
  return slots;
}

function formatDisplayTime(iso: string): string {
  const d = new Date(iso);
  const h = d.getHours();
  const m = d.getMinutes();
  return `${String(h).padStart(2, '0')}h${m ? '30' : '00'}`;
}

function addMinutes(iso: string, min: number): string {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() + min);
  return d.toISOString();
}

function isDateInPast(d: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return d < today;
}

const JOURS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MOIS = [
  'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'
];

export function BookingCalendar() {
  const router = useRouter();
  const [weekStart, setWeekStart] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const weeksToShow = 4;
  const days: Date[] = [];
  for (let w = 0; w < weeksToShow; w++) {
    for (let d = 0; d < 7; d++) {
      const x = new Date(weekStart);
      x.setDate(weekStart.getDate() + w * 7 + d);
      days.push(x);
    }
  }

  const rangeStart = formatDateISO(days[0]);
  const rangeEnd = formatDateISO(days[days.length - 1]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getBusySlots(rangeStart, rangeEnd).then((slots) => {
      if (!cancelled) {
        setBusySlots(slots);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [rangeStart, rangeEnd]);

  const timeSlots = selectedDate ? getTimeSlotsForDate(selectedDate) : [];
  const availableSlots = timeSlots.filter((s) => !busySlots.includes(s));

  const goPrev = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const goNext = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedSlot) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSubmitting(true);
    setError(null);
    const endAt = addMinutes(selectedSlot, DUREE_CRENEAU_MINUTES);
    const result = await createAppointment({
      start_at: selectedSlot,
      end_at: endAt,
      client_name: (fd.get('nom') as string) || '',
      client_email: (fd.get('email') as string) || '',
      client_phone: (fd.get('tel') as string) || undefined,
      client_message: (fd.get('message') as string) || undefined,
    });
    setSubmitting(false);
    if (result.ok) {
      router.push('/merci-rdv');
    } else {
      const msg = result.error ?? 'Une erreur est survenue.';
      // Éviter d'afficher du HTML brut (erreur serveur, page 500, etc.)
      setError(
        typeof msg === 'string' && (msg.startsWith('<') || msg.includes('<!DOCTYPE'))
          ? 'Une erreur est survenue. Veuillez réessayer ou nous contacter au 06 95 66 18 18.'
          : msg
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Calendrier */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Choisir une date
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Semaine précédente"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <span className="min-w-[140px] text-center text-sm font-medium text-slate-700">
              {MOIS[weekStart.getMonth()]} {weekStart.getFullYear()}
            </span>
            <button
              type="button"
              onClick={goNext}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Semaine suivante"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-600">
          {JOURS.map((j) => (
            <div key={j} className="py-1">
              {j}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => {
            const isPast = isDateInPast(new Date(d));
            const iso = formatDateISO(d);
            const isSelected =
              selectedDate && formatDateISO(selectedDate) === iso;
            const isToday =
              formatDateISO(d) === formatDateISO(new Date());
            return (
              <button
                key={iso}
                type="button"
                onClick={() => {
                  if (isPast) return;
                  setSelectedDate(new Date(d));
                  setSelectedSlot(null);
                }}
                disabled={isPast}
                className={`rounded-lg py-2 text-sm font-medium transition-colors ${
                  isPast
                    ? 'cursor-not-allowed text-slate-300'
                    : isSelected
                      ? 'bg-[var(--accent)] text-white'
                      : isToday
                        ? 'border-2 border-[var(--accent)] text-slate-900'
                        : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Créneaux horaires */}
      {selectedDate && (
        <div>
          <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-slate-900">
            <Clock size={18} strokeWidth={1.5} />
            Créneaux disponibles le{' '}
            {selectedDate.getDate()} {MOIS[selectedDate.getMonth()]}{' '}
            {selectedDate.getFullYear()}
          </h2>
          {loading ? (
            <p className="text-sm text-slate-500">Chargement...</p>
          ) : availableSlots.length === 0 ? (
            <p className="text-sm text-slate-500">
              Aucun créneau disponible ce jour-là.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    selectedSlot === slot
                      ? 'bg-[var(--accent)] text-white'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]'
                  }`}
                >
                  {formatDisplayTime(slot)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Formulaire */}
      {selectedSlot && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="mb-6 flex items-center gap-2 font-display text-lg font-semibold text-slate-900">
            <Calendar size={18} strokeWidth={1.5} />
            Confirmer votre rendez-vous — {formatDisplayTime(selectedSlot)}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-slate-700">
                Nom complet *
              </label>
              <input
                id="nom"
                name="nom"
                type="text"
                required
                placeholder="Jean Dupont"
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="j.dupont@entreprise.fr"
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>
            <div>
              <label htmlFor="tel" className="block text-sm font-medium text-slate-700">
                Téléphone
              </label>
              <input
                id="tel"
                name="tel"
                type="tel"
                placeholder="06 12 34 56 78"
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                Message (optionnel)
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                placeholder="Votre projet, nombre de participants, période souhaitée..."
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-4 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? 'Envoi...' : 'Réserver ce créneau'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
