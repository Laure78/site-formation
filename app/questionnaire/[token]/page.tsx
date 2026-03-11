'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle, ClipboardList } from 'lucide-react';
import { submitQuestionnaireAction } from '@/app/actions/prospects';
import Link from 'next/link';

export default function QuestionnairePage() {
  const params = useParams();
  const router = useRouter();
  const token = (params?.token as string) || '';
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    setError(null);

    const result = await submitQuestionnaireAction(token, {
      nb_salaries: (fd.get('nb_salaries') as string)?.trim() || undefined,
      outils_utilises: (fd.get('outils_utilises') as string)?.trim() || undefined,
      taches_chronophages: (fd.get('taches_chronophages') as string)?.trim() || undefined,
    });

    setSubmitting(false);
    if (result.ok) {
      setSuccess(true);
    } else {
      setError(result.error ?? 'Une erreur est survenue.');
    }
  };

  if (!token) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <p className="text-slate-600">Lien de questionnaire invalide.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[60vh] bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle size={36} strokeWidth={1.5} />
              </div>
            </div>
            <h1 className="mt-6 text-center font-display text-2xl font-bold text-slate-900">
              Questionnaire envoyé !
            </h1>
            <p className="mt-3 text-center text-slate-600">
              Merci pour vos réponses. Elles nous permettront de mieux préparer notre échange.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <ClipboardList size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-slate-900">
                Questionnaire avant notre rendez-vous
              </h1>
              <p className="text-sm text-slate-600">
                Quelques questions pour mieux préparer notre échange
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="nb_salaries" className="block text-sm font-medium text-slate-700">
                Combien de salariés dans votre entreprise ?
              </label>
              <input
                id="nb_salaries"
                name="nb_salaries"
                type="text"
                placeholder="Ex. 12, moins de 10, 50..."
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>

            <div>
              <label htmlFor="outils_utilises" className="block text-sm font-medium text-slate-700">
                Quels outils utilisez-vous actuellement ?
              </label>
              <input
                id="outils_utilises"
                name="outils_utilises"
                type="text"
                placeholder="Ex. Excel, logiciel devis, CRM..."
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>

            <div>
              <label htmlFor="taches_chronophages" className="block text-sm font-medium text-slate-700">
                Quelles tâches vous prennent le plus de temps ?
              </label>
              <textarea
                id="taches_chronophages"
                name="taches_chronophages"
                rows={4}
                placeholder="Ex. Les devis, les comptes-rendus de chantier, la prospection..."
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-[var(--accent)] px-6 py-4 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? 'Envoi...' : 'Envoyer mes réponses'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
