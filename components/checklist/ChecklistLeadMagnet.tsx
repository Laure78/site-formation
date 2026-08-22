'use client';

import { useState } from 'react';
import { Check, Download, X } from 'lucide-react';
import { submitLeadChecklistAction } from '@/app/actions/leads';
import { trackDownloadGuide } from '@/lib/ga4-analytics';

const BENEFITS = [
  'Rédiger des emails clients en 30 secondes',
  'Répondre aux avis Google automatiquement',
  'Structurer un devis plus rapidement',
  'Générer des publications LinkedIn pour l’entreprise',
  'Gagner du temps sur l’administratif chantier',
] as const;

const SECTEURS = [
  { value: '', label: '— Sélectionner —' },
  { value: 'btp', label: 'BTP / Bâtiment' },
  { value: 'travaux_publics', label: 'Travaux publics' },
  { value: 'artisanat', label: 'Artisanat' },
  { value: 'autre', label: 'Autre' },
] as const;

const fieldClass =
  'mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:border-[#377CF3] focus:outline-none focus:ring-1 focus:ring-[#377CF3]';

type Props = {
  /** Si true, le titre est un H1 (page dédiée). Sinon H2 (encart). */
  asPageHero?: boolean;
};

/**
 * Lead magnet checklist 10 prompts ChatGPT BTP — charte OFC (#377CF3).
 */
export function ChecklistLeadMagnet({ asPageHero = false }: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get('consent') !== 'on') {
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
      trackDownloadGuide({
        guide_type: 'checklist',
        file_name: 'checklist-10-prompts-chatgpt-btp',
      });
      setSuccess(true);
      setOpen(false);
    } else {
      setError(result.error ?? 'Une erreur est survenue.');
    }
  };

  const TitleTag = asPageHero ? 'h1' : 'h2';

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] via-white to-[#F2F2F2] p-8 shadow-[0_16px_48px_-24px_rgba(55,124,243,0.35)] md:p-10 lg:p-12">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#377CF3]/10 blur-2xl"
          aria-hidden
        />
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#377CF3]">
          Ressource gratuite · ChatGPT BTP
        </p>
        <TitleTag
          id={asPageHero ? 'checklist-ia-btp-h1' : undefined}
          className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-4xl"
        >
          Checklist gratuite : 10 prompts ChatGPT pour gagner du temps dans le BTP
        </TitleTag>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          10 prompts prêts à l&apos;emploi pour devis, emails, comptes rendus de chantier et
          administratif — conçus pour les professionnels du bâtiment et des travaux publics.
        </p>
        <ul className="mt-8 space-y-3">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-start gap-3 text-slate-700">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#377CF3]/15 text-[#377CF3]">
                <Check size={14} strokeWidth={2.5} aria-hidden />
              </span>
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[#377CF3] px-8 py-3.5 font-semibold text-white shadow-[0_8px_24px_rgba(55,124,243,0.35)] transition hover:bg-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          <Download size={20} strokeWidth={1.75} aria-hidden />
          Télécharger la checklist gratuite
        </button>
        <p className="mt-3 text-sm text-slate-500">
          Envoi immédiat par email · Sans engagement · Par Laure Olivié (Qualiopi)
        </p>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checklist-modal-title"
            className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Fermer"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
            <h2 id="checklist-modal-title" className="font-display pr-10 text-xl font-bold text-slate-900">
              Recevoir la checklist
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Renseignez vos coordonnées pour recevoir immédiatement les 10 prompts par email.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error ? (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
                  {error}
                </div>
              ) : null}
              <div>
                <label htmlFor="lead-nom" className="block text-sm font-medium text-slate-700">
                  Nom *
                </label>
                <input id="lead-nom" name="nom" type="text" required autoComplete="name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="lead-email" className="block text-sm font-medium text-slate-700">
                  Email *
                </label>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="lead-entreprise" className="block text-sm font-medium text-slate-700">
                  Entreprise
                </label>
                <input
                  id="lead-entreprise"
                  name="entreprise"
                  type="text"
                  autoComplete="organization"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="lead-secteur" className="block text-sm font-medium text-slate-700">
                  Secteur d&apos;activité
                </label>
                <select id="lead-secteur" name="secteur" className={fieldClass}>
                  {SECTEURS.map((s) => (
                    <option key={s.value || 'empty'} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-start gap-3">
                <input
                  id="lead-consent"
                  name="consent"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#377CF3] focus:ring-[#377CF3]"
                />
                <label htmlFor="lead-consent" className="text-sm leading-relaxed text-slate-600">
                  J&apos;accepte de recevoir des conseils et ressources sur la formation IA pour le BTP
                  et l&apos;usage de ChatGPT en entreprise.
                </label>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-[#377CF3] px-6 py-3.5 font-semibold text-white transition hover:bg-[#2d66d6] disabled:opacity-60"
              >
                {submitting ? 'Envoi…' : 'Recevoir la checklist'}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {success ? (
        <div
          className="fixed bottom-4 right-4 z-50 max-w-sm rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4 shadow-lg"
          role="status"
        >
          <p className="font-medium text-emerald-800">
            Vérifiez votre boîte mail — la checklist vous a été envoyée.
          </p>
        </div>
      ) : null}
    </>
  );
}
