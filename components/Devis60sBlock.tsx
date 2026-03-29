'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Send, Lock } from 'lucide-react';
import { submitDevis60sAction } from '@/app/actions/devis60s';

const METIER_OPTIONS = [
  { value: 'artisan', label: 'Artisan' },
  { value: 'conducteur_travaux', label: 'Conducteur de travaux' },
  { value: 'bureau_etude', label: 'Bureau d\'études' },
  { value: 'administratif', label: 'Administratif' },
  { value: 'autre', label: 'Autre' },
];

const PROBLEMATIQUE_OPTIONS = [
  { value: 'automatiser_devis', label: 'Automatiser les devis' },
  { value: 'gain_temps_admin', label: 'Gagner du temps administratif' },
  { value: 'communication_client', label: 'Améliorer la communication client' },
  { value: 'chatgpt_entreprise', label: 'Utiliser ChatGPT dans l\'entreprise' },
];

const NB_SALARIES_OPTIONS = [
  { value: '1-5', label: '1 à 5' },
  { value: '6-10', label: '6 à 10' },
  { value: '11-50', label: '11 à 50' },
  { value: '50+', label: '50+' },
];

export function Devis60sBlock() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await submitDevis60sAction({
      nom: (formData.get('nom') as string)?.trim() || '',
      prenom: (formData.get('prenom') as string)?.trim() || '',
      email: (formData.get('email') as string)?.trim() || '',
      telephone: (formData.get('telephone') as string)?.trim() || undefined,
      entreprise: (formData.get('entreprise') as string)?.trim() || undefined,
      metier: (formData.get('metier') as string) || undefined,
      nb_salaries: (formData.get('nb_salaries') as string) || undefined,
      problematique: (formData.get('problematique') as string) || undefined,
    });
    setSubmitting(false);
    if (result.ok) {
      router.push('/merci-devis');
    } else {
      setError(result.error ?? 'Une erreur est survenue.');
    }
  };

  const inputClass =
    'w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]';
  const labelClass = 'block text-sm font-medium text-slate-700';

  return (
    <section
      id="devis-60s"
      className="border-b border-slate-200 bg-gradient-to-br from-[var(--accent)] to-[#14502a] px-4 py-12 text-white"
    >
      <div className="mx-auto max-w-2xl text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
          <FileText size={24} strokeWidth={1.5} />
        </div>
        <h2 className="font-display mt-4 text-2xl font-bold md:text-3xl">
          Demande de devis en 60 secondes pour votre formation IA BTP
        </h2>
        <p className="mt-3 text-blue-100">
          Découvrez comment l&apos;IA peut vous aider à gagner du temps sur vos devis, emails et
          tâches administratives dans votre entreprise du bâtiment.
        </p>
        {!expanded ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-[var(--accent)] transition-colors hover:bg-blue-50"
          >
            Demander un devis en 1 clic
          </button>
        ) : (
          <div className="mt-8 rounded-2xl border-2 border-white/30 bg-white p-6 text-left shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="devis60s-prenom" className={labelClass}>
                    Prénom *
                  </label>
                  <input
                    id="devis60s-prenom"
                    name="prenom"
                    type="text"
                    required
                    placeholder="Jean"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="devis60s-nom" className={labelClass}>
                    Nom *
                  </label>
                  <input
                    id="devis60s-nom"
                    name="nom"
                    type="text"
                    required
                    placeholder="Dupont"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="devis60s-email" className={labelClass}>
                  Email *
                </label>
                <input
                  id="devis60s-email"
                  name="email"
                  type="email"
                  required
                  placeholder="jean.dupont@entreprise.fr"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="devis60s-tel" className={labelClass}>
                  Téléphone *
                </label>
                <input
                  id="devis60s-tel"
                  name="telephone"
                  type="tel"
                  required
                  placeholder="06 12 34 56 78"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="devis60s-entreprise" className={labelClass}>
                  Entreprise
                </label>
                <input
                  id="devis60s-entreprise"
                  name="entreprise"
                  type="text"
                  placeholder="Nom de votre entreprise"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="devis60s-metier" className={labelClass}>
                  Métier
                </label>
                <select id="devis60s-metier" name="metier" className={inputClass}>
                  <option value="">Sélectionnez</option>
                  {METIER_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="devis60s-nb_salaries" className={labelClass}>
                  Nombre de salariés
                </label>
                <select id="devis60s-nb_salaries" name="nb_salaries" className={inputClass}>
                  <option value="">Sélectionnez</option>
                  {NB_SALARIES_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="devis60s-problematique" className={labelClass}>
                  Problématique principale
                </label>
                <select id="devis60s-problematique" name="problematique" className={inputClass}>
                  <option value="">Sélectionnez</option>
                  {PROBLEMATIQUE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              {error && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-4 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-70"
              >
                <Send size={20} strokeWidth={1.5} />
                {submitting ? 'Envoi...' : 'Envoyer ma demande de devis'}
              </button>
              <p className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Lock size={14} strokeWidth={1.5} />
                Vos données sont protégées et utilisées uniquement pour établir votre devis. Réponse sous
                24h.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
