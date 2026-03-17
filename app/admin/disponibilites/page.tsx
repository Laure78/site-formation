import { createClient } from '@/lib/supabase/server';
import { DisponibilitesForm } from './DisponibilitesForm';
import { BookingSettingsForm } from './BookingSettingsForm';
import { TestGoogleCalendar } from './TestGoogleCalendar';

const JOURS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export default async function DisponibilitesPage() {
  const supabase = await createClient();
  const { data: availabilities } = await supabase
    .from('availabilities')
    .select('id, jour, heure_debut, heure_fin')
    .order('jour')
    .order('heure_debut');

  const byJour: Record<number, { id: string; heure_debut: string; heure_fin: string }[]> = {};
  for (let j = 0; j < 7; j++) byJour[j] = [];
  for (const a of availabilities ?? []) {
    byJour[a.jour] = byJour[a.jour] ?? [];
    byJour[a.jour].push({
      id: a.id,
      heure_debut: a.heure_debut,
      heure_fin: a.heure_fin,
    });
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">Disponibilités</h1>
      <p className="mt-2 text-slate-600">
        Définissez les jours et horaires disponibles pour les rendez-vous. Les créneaux sont générés automatiquement (30 min).
      </p>

      <DisponibilitesForm availabilities={availabilities ?? []} />

      <BookingSettingsForm />

      <TestGoogleCalendar />

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold text-slate-900">Plages actuelles</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map((j) => (
            <div key={j} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="font-medium text-slate-900">{JOURS[j]}</h3>
              {(byJour[j] ?? []).length === 0 ? (
                <p className="mt-2 text-sm text-slate-500">Aucun créneau</p>
              ) : (
                <ul className="mt-2 space-y-1">
                  {(byJour[j] ?? []).map((slot) => (
                    <li key={slot.id} className="text-sm text-slate-700">
                      {slot.heure_debut} – {slot.heure_fin}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
