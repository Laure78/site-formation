'use client';

import { useMemo, useState } from 'react';
import {
  BUSINESS_DELIVERY,
  FORMATION_FORMAT_OPTIONS,
  HORS_IDF_MESSAGE,
  IDF_DEPARTEMENT_OPTIONS,
} from '@/lib/business-delivery';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type Props = {
  /** Contenu affiché seulement si le filtre IDF est OK (Calendly / agenda). */
  children: React.ReactNode;
};

/**
 * Filtre commercial avant réservation Calendly / agenda.
 * Hors IDF : message clair, pas d’alternative distancielle.
 */
export function RdvCommercialFilter({ children }: Props) {
  const [departement, setDepartement] = useState('');
  const [participants, setParticipants] = useState('');
  const [format, setFormat] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const horsIdf = departement === 'hors-idf';
  const canUnlock = useMemo(() => {
    if (!departement || horsIdf) return false;
    const n = Number(participants);
    if (!Number.isFinite(n) || n < 2) return false;
    if (!format) return false;
    return true;
  }, [departement, participants, format, horsIdf]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
          Avant de réserver
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
          Mes formations sont proposées exclusivement en présentiel en Île-de-France, pour des
          groupes, en intra ou en inter-entreprises.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">
          Je ne propose pas de formation individuelle, à distance ou hors Île-de-France.
        </p>
        <p className="mt-3 text-sm font-medium text-slate-600">{BUSINESS_DELIVERY.compact}</p>

        <form
          className="mt-6 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (canUnlock) setUnlocked(true);
          }}
        >
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-slate-900">
              Département où doit avoir lieu la formation
            </span>
            <select
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900"
              value={departement}
              onChange={(e) => {
                setDepartement(e.target.value);
                setUnlocked(false);
              }}
              required
            >
              <option value="">Choisir…</option>
              {IDF_DEPARTEMENT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="font-medium text-slate-900">Nombre de participants prévu</span>
            <input
              type="number"
              min={2}
              max={50}
              inputMode="numeric"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900"
              value={participants}
              onChange={(e) => {
                setParticipants(e.target.value);
                setUnlocked(false);
              }}
              placeholder="Ex. 6"
              required
            />
          </label>

          <label className="block text-sm">
            <span className="font-medium text-slate-900">Format recherché</span>
            <select
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900"
              value={format}
              onChange={(e) => {
                setFormat(e.target.value);
                setUnlocked(false);
              }}
              required
            >
              <option value="">Choisir…</option>
              {FORMATION_FORMAT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          {horsIdf ? (
            <p className="sm:col-span-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
              {HORS_IDF_MESSAGE}
            </p>
          ) : null}

          {!horsIdf && Number(participants) === 1 ? (
            <p className="sm:col-span-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
              Les formations sont destinées aux groupes (minimum 2 participants).
            </p>
          ) : null}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={!canUnlock}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 disabled:cursor-not-allowed disabled:opacity-50`}
            >
              Afficher les créneaux
            </button>
            {unlocked ? (
              <button
                type="button"
                className={`${OFC_CTA_SECONDARY} ml-3 inline-flex min-h-11 items-center justify-center px-4 text-sm`}
                onClick={() => setUnlocked(false)}
              >
                Modifier
              </button>
            ) : null}
          </div>
        </form>
      </div>

      {unlocked ? children : null}
    </div>
  );
}
