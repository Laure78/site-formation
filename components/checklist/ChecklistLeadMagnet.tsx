'use client';

import { useState } from 'react';
import { Check, Download, X } from 'lucide-react';
import { submitLeadChecklistAction } from '@/app/actions/leads';

const BENEFITS = [
  'rédiger des emails clients en 30 secondes',
  'répondre aux avis Google automatiquement',
  'créer des devis plus rapidement',
  'générer des publications LinkedIn pour son entreprise',
  'gagner du temps sur l\'administratif',
];

const SECTEURS = [
  { value: '', label: '— Sélectionner —' },
  { value: 'btp', label: 'BTP / Bâtiment' },
  { value: 'travaux_publics', label: 'Travaux publics' },
  { value: 'artisanat', label: 'Artisanat' },
  { value: 'autre', label: 'Autre' },
];

export function ChecklistLeadMagnet() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const consent = fd.get('consent');
    if (consent !== 'on') {
      setError('Vous devez accepter de recevoir des conseils et ressources.');
      return;
    }
    setSubmitting(true);
    setError(null);
    const result = await submitLeadChecklistAction({
      nom: (fd.get('nom') as string)?.trim() || '',
      email: (fd.get('email') as string)?.trim() || '',
      entreprise: (fd.get('entreprise') as string)?.trim() || undefined,
      secteur: (fd.get('secteur') as string) || undefined,
      consent_rgpd: fd.get('consent') === 'on',
    });
    setSubmitting(false);
    if (result.ok) {
      setSuccess(true);
      setOpen(false);
    } else {
      setError(result.error ?? 'Une erreur est survenue.');
    }
  };

  return (
    <>
      <section className="rounded-2xl border-2 border-[#166534] bg-[#166534]/5 p-8 md:p-12">
        <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
          Checklist gratuite : 10 Prompts ChatGPT pour gagner du temps dans votre entreprise BTP
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Découvrez comment les entreprises du BTP utilisent l&apos;intelligence artificielle pour automatiser leurs tâches administratives et gagner plusieurs heures par semaine.
        </p>
        <ul className="mt-6 space-y-3">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-center gap-3 text-slate-700">
              <Check size={20} strokeWidth={2} className="shrink-0 text-[#166534]" />
              {b}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#166534] px-8 py-4 font-semibold text-white transition-colors hover:bg-[#14502a]"
        >
          <Download size={22} strokeWidth={1.5} />
          Télécharger la checklist gratuite
        </button>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Fermer"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
            <h3 className="font-display text-xl font-bold text-slate-900">
              Recevoir la checklist
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Renseignez vos coordonnées pour recevoir immédiatement la checklist par email.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
              )}
              <div>
                <label htmlFor="lead-nom" className="block text-sm font-medium text-slate-700">Nom *</label>
                <input id="lead-nom" name="nom" type="text" required
                  className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[#166534] focus:outline-none focus:ring-1 focus:ring-[#166534]" />
              </div>
              <div>
                <label htmlFor="lead-email" className="block text-sm font-medium text-slate-700">Email *</label>
                <input id="lead-email" name="email" type="email" required
                  className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[#166534] focus:outline-none focus:ring-1 focus:ring-[#166534]" />
              </div>
              <div>
                <label htmlFor="lead-entreprise" className="block text-sm font-medium text-slate-700">Entreprise</label>
                <input id="lead-entreprise" name="entreprise" type="text"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[#166534] focus:outline-none focus:ring-1 focus:ring-[#166534]" />
              </div>
              <div>
                <label htmlFor="lead-secteur" className="block text-sm font-medium text-slate-700">Secteur d&apos;activité</label>
                <select id="lead-secteur" name="secteur"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-[#166534] focus:outline-none focus:ring-1 focus:ring-[#166534]">
                  {SECTEURS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-start gap-3">
                <input id="lead-consent" name="consent" type="checkbox" required
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#166534] focus:ring-[#166534]" />
                <label htmlFor="lead-consent" className="text-sm text-slate-600">
                  J&apos;accepte de recevoir des conseils et ressources sur l&apos;intelligence artificielle appliquée aux entreprises.
                </label>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-[#166534] px-6 py-4 font-semibold text-white transition-colors hover:bg-[#14502a] disabled:opacity-60"
              >
                {submitting ? 'Envoi...' : 'Recevoir la checklist'}
              </button>
            </form>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4 shadow-lg">
          <p className="font-medium text-emerald-800">
            ✓ Vérifiez votre boîte mail, la checklist vous a été envoyée !
          </p>
        </div>
      )}
    </>
  );
}
