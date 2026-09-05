'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  cancelAppointmentByToken,
  rescheduleAppointmentByToken,
  type ManagedAppointment,
} from '@/app/actions/rdv-manage';
import { BookingCalendar } from '@/components/booking/BookingCalendar';
import { formatRdvDateTimeLong } from '@/lib/rdv-datetime';
import { LINKS } from '@/lib/internal-links';

type Props = {
  token: string;
  appointment: ManagedAppointment;
  initialAction?: 'annuler' | 'modifier' | null;
};

export function RdvManageClient({ token, appointment, initialAction }: Props) {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState(appointment.status);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'view' | 'annuler' | 'modifier'>(
    initialAction === 'annuler' || initialAction === 'modifier' ? initialAction : 'view',
  );
  const [startAt, setStartAt] = useState(appointment.start_at);

  if (status === 'annule') {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center sm:p-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">Rendez-vous annulé</h1>
        <p className="mt-3 text-slate-600">Ce créneau n’est plus actif.</p>
        <Link
          href={LINKS.prendreRdv}
          className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[var(--accent)] px-6 font-semibold text-white"
        >
          Réserver un nouveau créneau
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">Gérer mon rendez-vous</h1>
        <p className="mt-3 text-slate-600">
          Créneau actuel :{' '}
          <strong className="capitalize text-slate-900">{formatRdvDateTimeLong(startAt)}</strong>
        </p>
        {appointment.meet_link && (
          <p className="mt-2 text-sm">
            <a href={appointment.meet_link} className="font-medium text-[var(--accent)] underline">
              Lien visio
            </a>
          </p>
        )}

        {message && (
          <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            {error}
          </p>
        )}

        {mode === 'view' && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="min-h-11 rounded-xl border border-slate-200 px-5 font-semibold text-slate-800"
              onClick={() => setMode('modifier')}
            >
              Modifier mon rendez-vous
            </button>
            <button
              type="button"
              className="min-h-11 rounded-xl border border-red-200 px-5 font-semibold text-red-700"
              onClick={() => setMode('annuler')}
            >
              Annuler mon rendez-vous
            </button>
          </div>
        )}

        {mode === 'annuler' && (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-slate-600">Confirmez-vous l’annulation de ce rendez-vous ?</p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={pending}
                className="min-h-11 rounded-xl bg-red-600 px-5 font-semibold text-white disabled:opacity-60"
                onClick={() => {
                  setError(null);
                  startTransition(async () => {
                    const res = await cancelAppointmentByToken(token);
                    if (!res.ok) {
                      setError(res.error || 'Annulation impossible');
                      return;
                    }
                    setStatus('annule');
                    setMessage('Rendez-vous annulé.');
                  });
                }}
              >
                Confirmer l’annulation
              </button>
              <button
                type="button"
                className="min-h-11 rounded-xl border border-slate-200 px-5 font-semibold"
                onClick={() => setMode('view')}
              >
                Retour
              </button>
            </div>
          </div>
        )}
      </div>

      {mode === 'modifier' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold text-slate-900">Choisir un nouveau créneau</h2>
          <p className="mt-1 text-sm text-slate-600">
            Le rappel automatique suivra la nouvelle date (veille à 15 h, Europe/Paris).
          </p>
          <div className="mt-6">
            <BookingCalendar
              mode="confirm"
              submitting={pending}
              onConfirmSlot={async (start, end) => {
                setError(null);
                startTransition(async () => {
                  const res = await rescheduleAppointmentByToken({
                    token,
                    start_at: start,
                    end_at: end,
                  });
                  if (!res.ok) {
                    setError(res.error || 'Report impossible');
                    return;
                  }
                  setStartAt(start);
                  setMode('view');
                  setMessage(`Nouveau créneau confirmé : ${formatRdvDateTimeLong(start)}`);
                });
              }}
            />
          </div>
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-slate-600 underline"
            onClick={() => setMode('view')}
          >
            Annuler la modification
          </button>
        </div>
      )}
    </div>
  );
}
