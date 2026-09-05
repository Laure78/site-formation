'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { getBusySlots } from '@/app/actions/appointments';
import { getAvailabilities } from '@/app/actions/availabilities';
import { getBookingSettings } from '@/app/actions/booking-settings';
import { QualificationForm } from './QualificationForm';

export const DUREE_CRENEAU_MINUTES = 30;
const INTERVALLE_MINUTES = 0;

function formatDateISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Parse "10:00" ou "10:00:00" -> { h, m } */
function parseTime(t: string): { h: number; m: number } {
  const [h, m] = t.split(':').map(Number);
  return { h: h ?? 0, m: m ?? 0 };
}

/** Génère les créneaux 30 min avec 5 min d'intervalle dans une plage horaire */
function getTimeSlotsForDate(
  date: Date,
  availabilities: { jour: number; heure_debut: string; heure_fin: string }[]
): string[] {
  const slots: string[] = [];
  const jour = date.getDay(); // 0=dim, 1=lun, ...
  const blocks = availabilities.filter((a) => a.jour === jour);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  for (const block of blocks) {
    const { h: hDebut, m: mDebut } = parseTime(block.heure_debut);
    const { h: hFin, m: mFin } = parseTime(block.heure_fin);
    const debutMinutes = hDebut * 60 + mDebut;
    const finMinutes = hFin * 60 + mFin;

    let currentMinutes = debutMinutes;
    while (currentMinutes + DUREE_CRENEAU_MINUTES <= finMinutes) {
      const h = Math.floor(currentMinutes / 60);
      const m = currentMinutes % 60;
      slots.push(new Date(year, month, day, h, m, 0).toISOString());
      currentMinutes += DUREE_CRENEAU_MINUTES + INTERVALLE_MINUTES;
    }
  }
  return slots.sort((a, b) => a.localeCompare(b));
}

function formatDisplayTime(iso: string): string {
  const d = new Date(iso);
  const h = d.getHours();
  const m = d.getMinutes();
  return `${String(h).padStart(2, '0')}h${String(m).padStart(2, '0')}`;
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

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
}

type BookingCalendarProps = {
  /** legacy : calendrier puis QualificationForm ; confirm : créneau + bouton Confirmer */
  mode?: 'legacy' | 'confirm';
  qualificationSummary?: string;
  submitting?: boolean;
  onConfirmSlot?: (startIso: string, endIso: string) => void | Promise<void>;
  /** true s’il reste des créneaux dans la fenêtre ; false si aucun */
  onAvailabilityState?: (hasSlots: boolean | null) => void;
};

export function BookingCalendar({
  mode = 'legacy',
  qualificationSummary,
  submitting = false,
  onConfirmSlot,
  onAvailabilityState,
}: BookingCalendarProps = {}) {
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  // Lundi de la semaine qui contient le 1er du mois affiché
  const calendarStart = (() => {
    const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const d = new Date(firstOfMonth);
    const dayOfWeek = d.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Lundi = 1
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  })();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [availabilities, setAvailabilities] = useState<{ jour: number; heure_debut: string; heure_fin: string }[]>([]);
  const [bookingSettings, setBookingSettings] = useState<{ booking_window_days: number; blocked_dates: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAvailabilities().then(setAvailabilities);
  }, []);

  useEffect(() => {
    getBookingSettings().then(setBookingSettings);
  }, []);

  const today = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  })();
  const maxDate = (() => {
    const days = bookingSettings?.booking_window_days ?? 45;
    const d = new Date(today);
    d.setDate(d.getDate() + days);
    d.setHours(23, 59, 59, 999);
    return d;
  })();

  const isDateInWindow = (d: Date) => {
    const t = new Date(d);
    t.setHours(0, 0, 0, 0);
    return t >= today && t <= maxDate;
  };
  const isBlockedDate = (d: Date) => {
    const iso = formatDateISO(d);
    return (bookingSettings?.blocked_dates ?? []).includes(iso);
  };

  const hasAvailabilityForDay = (jour: number) =>
    availabilities.some((a) => a.jour === jour);

  const isViewMonthBeyondMax = () => {
    const lastDayOfView = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0);
    return lastDayOfView > maxDate;
  };
  const isViewMonthBeforeCurrent = () => {
    const firstOfView = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    return firstOfView < today;
  };

  const weeksToShow = 6;
  const days: Date[] = [];
  for (let w = 0; w < weeksToShow; w++) {
    for (let d = 0; d < 7; d++) {
      const x = new Date(calendarStart);
      x.setDate(calendarStart.getDate() + w * 7 + d);
      days.push(x);
    }
  }

  const rangeStart = formatDateISO(today);
  const rangeEnd = formatDateISO(maxDate);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const timeout = window.setTimeout(() => {
      if (!cancelled) {
        setLoading(false);
      }
    }, 8000);
    getBusySlots(rangeStart, rangeEnd)
      .then((slots) => {
        if (!cancelled) {
          setBusySlots(Array.isArray(slots) ? slots : []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setBusySlots([]);
          setLoading(false);
        }
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [rangeStart, rangeEnd]);

  const timeSlots = selectedDate ? getTimeSlotsForDate(selectedDate, availabilities) : [];
  const availableSlots = timeSlots.filter((s) => !busySlots.includes(s));

  const totalAvailableInWindow = (() => {
    if (loading || !bookingSettings) return -1;
    let total = 0;
    const d = new Date(today);
    while (d <= maxDate) {
      if (!isBlockedDate(d) && hasAvailabilityForDay(d.getDay())) {
        const slots = getTimeSlotsForDate(new Date(d), availabilities);
        total += slots.filter((s) => !busySlots.includes(s)).length;
      }
      d.setDate(d.getDate() + 1);
    }
    return total;
  })();

  useEffect(() => {
    if (!onAvailabilityState) return;
    if (totalAvailableInWindow < 0) {
      onAvailabilityState(null);
      return;
    }
    onAvailabilityState(totalAvailableInWindow > 0);
  }, [totalAvailableInWindow, onAvailabilityState]);

  const goPrev = () => {
    if (isViewMonthBeforeCurrent()) return;
    const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1);
    setViewMonth(d);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const goNext = () => {
    if (isViewMonthBeyondMax()) return;
    const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1);
    setViewMonth(d);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  return (
    <div className="space-y-8">
      {!loading && totalAvailableInWindow === 0 && (
        <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-6 text-center">
          <p className="font-medium text-amber-900">
            Les prochains créneaux seront ouverts prochainement.
          </p>
          <p className="mt-2 text-sm text-amber-800">
            Merci de revenir consulter le calendrier.
          </p>
        </div>
      )}
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
              disabled={isViewMonthBeforeCurrent()}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Mois précédent"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <span className="min-w-[160px] shrink-0 text-center text-base font-semibold capitalize text-slate-900">
              {formatMonthYear(viewMonth)}
            </span>
            <button
              type="button"
              onClick={goNext}
              disabled={isViewMonthBeyondMax()}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Mois suivant"
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
            const inWindow = isDateInWindow(new Date(d));
            const blocked = isBlockedDate(new Date(d));
            const hasAvailability = hasAvailabilityForDay(d.getDay());
            const isSelectable = !isPast && inWindow && !blocked && hasAvailability;
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
                  if (!isSelectable) return;
                  setSelectedDate(new Date(d));
                  setSelectedSlot(null);
                }}
                disabled={!isSelectable}
                className={`rounded-lg py-2 text-sm font-medium transition-colors ${
                  !isSelectable
                    ? 'cursor-not-allowed text-slate-300 bg-slate-50'
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
            {selectedDate.getDate()} {selectedDate.toLocaleDateString('fr-FR', { month: 'long' })}{' '}
            {selectedDate.getFullYear()}
          </h2>
          {loading ? (
            <p className="text-sm text-slate-500">Chargement...</p>
          ) : availableSlots.length === 0 ? (
            <p className="text-sm text-slate-500">
              {timeSlots.length === 0
                ? 'Aucun créneau ce jour-là. Les créneaux sont ouverts le lundi, mardi et jeudi (10h–12h).'
                : 'Tous les créneaux de ce jour sont déjà réservés.'}
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

      {/* Mode confirm : infos déjà saisies + CTA */}
      {mode === 'confirm' && selectedSlot && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
          {qualificationSummary && (
            <p className="text-sm text-slate-600">
              Réservation pour <span className="font-semibold text-slate-900">{qualificationSummary}</span>
            </p>
          )}
          <p className="mt-1 text-sm text-slate-600">
            Créneau :{' '}
            <span className="font-semibold capitalize text-slate-900">
              {new Date(selectedSlot).toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </p>
          <button
            type="button"
            disabled={submitting}
            onClick={() =>
              onConfirmSlot?.(selectedSlot, addMinutes(selectedSlot, DUREE_CRENEAU_MINUTES))
            }
            className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--accent)] px-6 text-base font-semibold text-white hover:bg-blue-700 disabled:opacity-60 sm:w-auto"
          >
            {submitting ? 'Confirmation…' : 'Confirmer mon rendez-vous'}
          </button>
        </div>
      )}

      {/* Formulaire de qualification legacy */}
      {mode === 'legacy' && selectedSlot && (
        <QualificationForm
          slotIso={selectedSlot}
          endAtIso={addMinutes(selectedSlot, DUREE_CRENEAU_MINUTES)}
        />
      )}
    </div>
  );
}
