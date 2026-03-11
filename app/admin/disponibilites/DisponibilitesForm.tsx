'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addAvailabilityAction, deleteAvailabilityAction } from '@/app/actions/availabilities';
import { Trash2 } from 'lucide-react';

const JOURS = [
  { value: 0, label: 'Dimanche' },
  { value: 1, label: 'Lundi' },
  { value: 2, label: 'Mardi' },
  { value: 3, label: 'Mercredi' },
  { value: 4, label: 'Jeudi' },
  { value: 5, label: 'Vendredi' },
  { value: 6, label: 'Samedi' },
];

const HEURES = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00',
];

interface Availability {
  id: string;
  jour: number;
  heure_debut: string;
  heure_fin: string;
}

export function DisponibilitesForm({ availabilities }: { availabilities: Availability[] }) {
  const router = useRouter();
  const [jour, setJour] = useState(1);
  const [heureDebut, setHeureDebut] = useState('09:00');
  const [heureFin, setHeureFin] = useState('12:00');
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await addAvailabilityAction(jour, heureDebut, heureFin);
    setSubmitting(false);
    if (ok) router.refresh();
  };

  const handleDelete = async (id: string) => {
    const ok = await deleteAvailabilityAction(id);
    if (ok) router.refresh();
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-4 rounded-xl border border-slate-200 bg-white p-6">
        <div>
          <label htmlFor="jour" className="block text-sm font-medium text-slate-700">Jour</label>
          <select
            id="jour"
            value={jour}
            onChange={(e) => setJour(parseInt(e.target.value, 10))}
            className="mt-1 rounded-lg border border-slate-200 px-4 py-2"
          >
            {JOURS.map((j) => (
              <option key={j.value} value={j.value}>{j.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="debut" className="block text-sm font-medium text-slate-700">Heure début</label>
          <select
            id="debut"
            value={heureDebut}
            onChange={(e) => setHeureDebut(e.target.value)}
            className="mt-1 rounded-lg border border-slate-200 px-4 py-2"
          >
            {HEURES.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="fin" className="block text-sm font-medium text-slate-700">Heure fin</label>
          <select
            id="fin"
            value={heureFin}
            onChange={(e) => setHeureFin(e.target.value)}
            className="mt-1 rounded-lg border border-slate-200 px-4 py-2"
          >
            {HEURES.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-[var(--accent)] px-6 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? 'Ajout...' : 'Ajouter'}
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-700">Créneaux configurés</h3>
        <ul className="mt-2 space-y-2">
          {(availabilities ?? []).map((a) => (
            <li key={a.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-slate-700">
                {JOURS.find((j) => j.value === a.jour)?.label ?? `Jour ${a.jour}`} — {a.heure_debut} à {a.heure_fin}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(a.id)}
                className="rounded p-2 text-red-600 hover:bg-red-50"
                aria-label="Supprimer"
              >
                <Trash2 size={18} strokeWidth={1.5} />
              </button>
            </li>
          ))}
          {(availabilities ?? []).length === 0 && (
            <li className="rounded-lg border border-dashed border-slate-200 py-6 text-center text-sm text-slate-500">
              Aucun créneau. Par défaut, le calendrier utilise Lun-Ven 9h-12h et 14h-17h.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
