'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from 'lucide-react';
import { createProspectAndAppointment, type QualificationFormData } from '@/app/actions/prospects';

const SECTEURS = [
  { value: 'btp', label: 'BTP' },
  { value: 'automobile', label: 'Automobile' },
  { value: 'industrie', label: 'Industrie' },
  { value: 'service', label: 'Service' },
  { value: 'autre', label: 'Autre' },
];

const TAILLES = [
  { value: '1-10', label: '1 à 10' },
  { value: '10-50', label: '10 à 50' },
  { value: '50-250', label: '50 à 250' },
  { value: '250+', label: '250+' },
];

const NIVEAUX_IA = [
  { value: 'oui_regulier', label: 'Oui, régulièrement' },
  { value: 'teste', label: 'J\'ai testé quelques outils' },
  { value: 'jamais', label: 'Jamais utilisé' },
];

const OBJECTIFS = [
  { value: 'temps_admin', label: 'Gagner du temps administratif' },
  { value: 'automatisation', label: 'Automatiser des tâches' },
  { value: 'marketing', label: 'Marketing / communication' },
  { value: 'recrutement', label: 'Recrutement RH' },
  { value: 'prospection', label: 'Prospection commerciale' },
  { value: 'autre', label: 'Autre' },
];

const BUDGETS = [
  { value: 'moins_1000', label: 'Moins de 1000 €' },
  { value: '1000_5000', label: '1000 € à 5000 €' },
  { value: '5000_plus', label: '5000 € et plus' },
];

interface Props {
  slotIso: string;
  endAtIso: string;
}

export function QualificationForm({ slotIso, endAtIso }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    setError(null);

    const result = await createProspectAndAppointment({
      start_at: slotIso,
      end_at: endAtIso,
      prenom: (fd.get('prenom') as string)?.trim() || '',
      nom: (fd.get('nom') as string)?.trim() || '',
      email: (fd.get('email') as string)?.trim() || '',
      telephone: (fd.get('telephone') as string)?.trim() || undefined,
      entreprise: (fd.get('entreprise') as string)?.trim() || undefined,
      secteur: (fd.get('secteur') as string) || undefined,
      taille_entreprise: (fd.get('taille_entreprise') as string) || undefined,
      niveau_ia: (fd.get('niveau_ia') as string) || undefined,
      objectif: (fd.get('objectif') as string) || undefined,
      budget: (fd.get('budget') as string) || undefined,
      projet: (fd.get('projet') as string)?.trim() || undefined,
    });

    setSubmitting(false);
    if (result.ok) {
      const token = 'questionnaireToken' in result ? result.questionnaireToken : undefined;
      router.push(token ? `/merci-rdv?t=${token}` : '/merci-rdv');
    } else {
      setError(result.error ?? 'Une erreur est survenue.');
    }
  };

  const time = slotIso ? new Date(slotIso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="font-semibold text-slate-900">Vos coordonnées</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-slate-700">Prénom *</label>
            <input id="prenom" name="prenom" type="text" required placeholder="Jean"
              className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
          </div>
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-slate-700">Nom *</label>
            <input id="nom" name="nom" type="text" required placeholder="Dupont"
              className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email *</label>
            <input id="email" name="email" type="email" required placeholder="j.dupont@entreprise.fr"
              className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
          </div>
          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-slate-700">Téléphone</label>
            <input id="telephone" name="telephone" type="tel" placeholder="06 12 34 56 78"
              className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="entreprise" className="block text-sm font-medium text-slate-700">Entreprise</label>
          <input id="entreprise" name="entreprise" type="text" placeholder="Nom de votre entreprise"
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="font-semibold text-slate-900">Qualification commerciale</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="secteur" className="block text-sm font-medium text-slate-700">Secteur d&apos;activité</label>
            <select id="secteur" name="secteur"
              className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]">
              <option value="">— Sélectionner —</option>
              {SECTEURS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="taille_entreprise" className="block text-sm font-medium text-slate-700">Nombre de salariés</label>
            <select id="taille_entreprise" name="taille_entreprise"
              className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]">
              <option value="">— Sélectionner —</option>
              {TAILLES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="niveau_ia" className="block text-sm font-medium text-slate-700">Avez-vous déjà utilisé l&apos;IA dans votre entreprise ?</label>
          <select id="niveau_ia" name="niveau_ia"
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]">
            <option value="">— Sélectionner —</option>
            {NIVEAUX_IA.map((n) => (
              <option key={n.value} value={n.value}>{n.label}</option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="objectif" className="block text-sm font-medium text-slate-700">Objectif principal</label>
          <select id="objectif" name="objectif"
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]">
            <option value="">— Sélectionner —</option>
            {OBJECTIFS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="budget" className="block text-sm font-medium text-slate-700">Budget estimé pour la formation</label>
          <select id="budget" name="budget"
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]">
            <option value="">— Sélectionner —</option>
            {BUDGETS.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="projet" className="block text-sm font-medium text-slate-700">Décrivez votre projet ou votre besoin</label>
          <textarea id="projet" name="projet" rows={4} placeholder="Votre projet de formation IA, nombre de participants, période souhaitée..."
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-slate-700">
          <Calendar size={20} strokeWidth={1.5} />
          <span>Rendez-vous : {time} (30 min)</span>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? 'Envoi...' : 'Réserver ce créneau'}
        </button>
      </div>
    </form>
  );
}
