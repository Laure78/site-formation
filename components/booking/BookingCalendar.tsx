'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { getBusySlots } from '@/app/actions/appointments';
import { getAvailabilities } from '@/app/actions/availabilities';
import { QualificationForm } from './QualificationForm';

const DUREE_CRENEAU_MINUTES = 30;
const INTERVALLE_MINUTES = 5;

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
  const [availabilities, setAvailabilities] = useState<{ jour: number; heure_debut: string; heure_fin: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAvailabilities().then(setAvailabilities);
  }, []);

  const hasAvailabilityForDay = (jour: number) =>
    availabilities.some((a) => a.jour === jour);

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

  const timeSlots = selectedDate ? getTimeSlotsForDate(selectedDate, availabilities) : [];
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
            const hasAvailability = hasAvailabilityForDay(d.getDay());
            const isSelectable = !isPast && hasAvailability;
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

      {/* Formulaire de qualification */}
      {selectedSlot && (
        <QualificationForm
          slotIso={selectedSlot}
          endAtIso={addMinutes(selectedSlot, DUREE_CRENEAU_MINUTES)}
        />
      )}
    </div>
  );
}
