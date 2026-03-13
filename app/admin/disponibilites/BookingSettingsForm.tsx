'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  updateBookingWindowAction,
  addBlockedDateAction,
  addBlockedDateRangeAction,
  removeBlockedDateAction,
  removeBlockedDateRangeAction,
  getBookingSettings,
  getAllBlockedDates,
} from '@/app/actions/booking-settings';
import { groupBlockedDatesIntoRanges } from '@/lib/booking-utils';
import { Trash2 } from 'lucide-react';

const WINDOW_OPTIONS = [30, 45, 60] as const;

function formatRangeLabel(start: string, end: string): string {
  const dStart = new Date(start + 'T12:00:00');
  const dEnd = new Date(end + 'T12:00:00');
  const sameMonth = dStart.getMonth() === dEnd.getMonth() && dStart.getFullYear() === dEnd.getFullYear();
  if (start === end) {
    return dStart.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  }
  if (sameMonth) {
    return `${dStart.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} – ${dEnd.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`;
  }
  return `${dStart.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} – ${dEnd.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`;
}

export function BookingSettingsForm() {
  const router = useRouter();
  const [windowDays, setWindowDays] = useState(45);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [newBlockedStart, setNewBlockedStart] = useState('');
  const [newBlockedEnd, setNewBlockedEnd] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([getBookingSettings(), getAllBlockedDates()]).then(([s, blocked]) => {
      setWindowDays(s.booking_window_days);
      setBlockedDates(blocked);
      setLoading(false);
    });
  }, []);

  const handleWindowChange = async (days: number) => {
    setSaving(true);
    const result = await updateBookingWindowAction(days);
    setSaving(false);
    if (result.ok) {
      setWindowDays(days);
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const handleAddBlocked = async (e: React.FormEvent) => {
    e.preventDefault();
    const start = newBlockedStart.trim();
    const end = newBlockedEnd.trim() || start;
    if (!start) return;
    setSaving(true);
    const result =
      start === end
        ? await addBlockedDateAction(start)
        : await addBlockedDateRangeAction(start, end);
    setSaving(false);
    if (result.ok) {
      const dates: string[] = [];
      const d = new Date(start);
      const endD = new Date(end);
      while (d <= endD) {
        dates.push(d.toISOString().slice(0, 10));
        d.setDate(d.getDate() + 1);
      }
      setBlockedDates((prev) => [...new Set([...prev, ...dates])].sort());
      setNewBlockedStart('');
      setNewBlockedEnd('');
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const handleRemoveRange = async (start: string, end: string) => {
    setSaving(true);
    const result =
      start === end
        ? await removeBlockedDateAction(start)
        : await removeBlockedDateRangeAction(start, end);
    setSaving(false);
    if (result.ok) {
      const startD = new Date(start);
      const endD = new Date(end);
      const toRemove = new Set<string>();
      const d = new Date(startD);
      while (d <= endD) {
        toRemove.add(d.toISOString().slice(0, 10));
        d.setDate(d.getDate() + 1);
      }
      setBlockedDates((prev) => prev.filter((x) => !toRemove.has(x)));
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const todayStr = new Date().toISOString().slice(0, 10);
  const ranges = groupBlockedDatesIntoRanges(blockedDates);

  if (loading) return <p className="text-sm text-slate-500">Chargement...</p>;

  return (
    <div className="mt-10 space-y-8">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-slate-900">
          Fenêtre de réservation
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Les utilisateurs ne peuvent réserver que dans cette plage (à partir d&apos;aujourd&apos;hui).
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {WINDOW_OPTIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => handleWindowChange(d)}
              disabled={saving}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                windowDays === d
                  ? 'bg-[var(--accent)] text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {d} jours
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-slate-900">
          Mes indisponibilités
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Aucune réservation possible ces jours-là. Ajoutez une date ou une plage.
        </p>
        <form onSubmit={handleAddBlocked} className="mt-4 flex flex-wrap items-end gap-3">
          <div>
            <label htmlFor="blocked-start" className="block text-sm font-medium text-slate-700">
              Du
            </label>
            <input
              id="blocked-start"
              type="date"
              value={newBlockedStart}
              onChange={(e) => setNewBlockedStart(e.target.value)}
              className="mt-1 rounded-lg border border-slate-200 px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="blocked-end" className="block text-sm font-medium text-slate-700">
              Au (optionnel)
            </label>
            <input
              id="blocked-end"
              type="date"
              min={newBlockedStart || todayStr}
              value={newBlockedEnd}
              onChange={(e) => setNewBlockedEnd(e.target.value)}
              className="mt-1 rounded-lg border border-slate-200 px-4 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={saving || !newBlockedStart}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
          >
            Bloquer
          </button>
        </form>
        <ul className="mt-6 divide-y divide-slate-200">
          {ranges.length === 0 ? (
            <li className="py-6 text-center text-sm text-slate-500">Aucune indisponibilité</li>
          ) : (
            <>
              <li className="pb-2 text-sm font-medium text-slate-500">
                {new Date(ranges[0]?.start + 'T12:00:00').getFullYear()}
              </li>
              {ranges.map((r) => (
                <li
                  key={`${r.start}-${r.end}`}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{formatRangeLabel(r.start, r.end)}</p>
                    <p className="text-sm text-slate-600">Indisponible</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveRange(r.start, r.end)}
                    disabled={saving}
                    className="rounded p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    aria-label="Supprimer"
                  >
                    <Trash2 size={18} strokeWidth={1.5} />
                  </button>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
