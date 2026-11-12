'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { submitContactFormAction } from '@/app/actions/contact';
import { CONTACT_FORM_SUCCESS } from '@/lib/contact-page-config';
import { CONTACT_SUBJECT_VALUES } from '@/lib/contact-form-validation';
import { trackContactFormSuccess } from '@/lib/ga4-analytics';
import { IDF_DEPARTEMENT_OPTIONS } from '@/lib/business-delivery';

type Mode = 'inscription' | 'propose' | 'waitlist';

type Props = {
  mode: Mode;
  formationTitle: string;
  formationHref: string;
  sessionDateLabel?: string;
  triggerLabel: string;
  triggerClassName: string;
  showArrow?: boolean;
};

export function DatesLieuxSessionDialog({
  mode,
  formationTitle,
  formationHref,
  sessionDateLabel,
  triggerLabel,
  triggerClassName,
  showArrow = false,
}: Props) {
  const dialogId = useId();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (!open) {
      setError(null);
      setSuccess(false);
      startedAt.current = Date.now();
    }
  }, [open]);

  const title =
    mode === 'inscription'
      ? 'Demande d’inscription'
      : mode === 'waitlist'
        ? 'Être informé'
        : 'Proposer une date';

  const defaultMessage =
    mode === 'inscription'
      ? `Demande d'inscription — ${formationTitle}${sessionDateLabel ? ` — session du ${sessionDateLabel}` : ''}.\nMerci de confirmer les places disponibles et la suite (convention, convocation).`
      : mode === 'waitlist'
        ? `Je souhaite être informé(e) si une place se libère ou pour une prochaine session : ${formationTitle}${sessionDateLabel ? ` (${sessionDateLabel})` : ''}.`
        : `Proposition de date / période pour la formation : ${formationTitle}.\nMerci de me recontacter pour organiser une session inter ou intra en Île-de-France.`;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setPending(true);
    setError(null);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      company: String(formData.get('company') ?? ''),
      subject:
        mode === 'propose'
          ? ('choix-formation' as const)
          : ('choix-formation' as const),
      message: String(formData.get('message') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      participants: String(formData.get('participants') ?? ''),
      participantRole: '',
      location: String(formData.get('location') ?? ''),
      format: mode === 'propose' ? String(formData.get('format') ?? '') : 'inter',
      period: String(formData.get('period') ?? ''),
      formationTheme: formationTitle,
      formationHint: formationHref,
      website: '',
      formStartedAt: startedAt.current,
    };

    if (!CONTACT_SUBJECT_VALUES.includes(payload.subject)) {
      setError('Objet de demande invalide.');
      setPending(false);
      return;
    }

    const result = await submitContactFormAction(payload);
    setPending(false);
    if (result.ok) {
      setSuccess(true);
      trackContactFormSuccess('choix-formation');
    } else {
      setError(result.error);
    }
  }

  return (
    <>
      <button type="button" className={triggerClassName} onClick={() => setOpen(true)}>
        {triggerLabel}
        {showArrow ? <ArrowRight className="h-4 w-4 shrink-0" aria-hidden /> : null}
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-4 sm:items-center"
          role="presentation"
          onClick={() => !pending && setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogId}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id={dialogId} className="font-display text-xl font-bold text-[#101936]">
              {title}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {formationTitle}
              {sessionDateLabel ? ` — ${sessionDateLabel}` : ''}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              L’envoi ne constitue pas une réservation définitive. Réponse sous 48 h ouvrées.
            </p>

            {success ? (
              <p className="mt-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                {CONTACT_FORM_SUCCESS}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <label className="block text-sm">
                  Nom et prénom *
                  <input name="name" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
                </label>
                <label className="block text-sm">
                  Email professionnel *
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                  />
                </label>
                <label className="block text-sm">
                  Entreprise *
                  <input name="company" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
                </label>
                <label className="block text-sm">
                  Téléphone
                  <input name="phone" type="tel" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
                </label>
                {mode === 'propose' ? (
                  <>
                    <label className="block text-sm">
                      Participants (approx.)
                      <input
                        name="participants"
                        inputMode="numeric"
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                      />
                    </label>
                    <label className="block text-sm">
                      Période souhaitée
                      <input name="period" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
                    </label>
                    <label className="block text-sm">
                      Département
                      <select name="location" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
                        <option value="">—</option>
                        {IDF_DEPARTEMENT_OPTIONS.map((d) => (
                          <option key={d.value} value={d.label}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block text-sm">
                      Format
                      <select name="format" defaultValue="indetermine" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
                        <option value="inter">Inter-entreprises</option>
                        <option value="intra">Intra-entreprise</option>
                        <option value="indetermine">À définir</option>
                      </select>
                    </label>
                  </>
                ) : (
                  <input type="hidden" name="participants" value="" />
                )}
                <label className="block text-sm">
                  Message
                  <textarea
                    name="message"
                    required
                    minLength={20}
                    defaultValue={defaultMessage}
                    rows={5}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                  />
                </label>
                {error ? <p className="text-sm text-red-600">{error}</p> : null}
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={pending}
                    className="rounded-[8px] bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {pending ? 'Envoi…' : 'Envoyer la demande'}
                  </button>
                  <button
                    type="button"
                    className="rounded-[8px] border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700"
                    disabled={pending}
                    onClick={() => setOpen(false)}
                  >
                    Fermer
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
