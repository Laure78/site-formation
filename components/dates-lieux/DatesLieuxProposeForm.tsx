'use client';

import { useRef, useState, type FormEvent } from 'react';
import { submitContactFormAction } from '@/app/actions/contact';
import { CONTACT_FORM_SUCCESS } from '@/lib/contact-page-config';
import { IDF_DEPARTEMENT_OPTIONS } from '@/lib/business-delivery';
import { trackContactFormSuccess } from '@/lib/ga4-analytics';

type Option = { slug: string; title: string; href: string };

export type DatesLieuxProposeFormProps = {
  formationOptions: Option[];
};

export function DatesLieuxProposeForm({ formationOptions }: DatesLieuxProposeFormProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const startedAt = useRef(Date.now());

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const formationSlug = String(fd.get('formationSlug') ?? '');
    const selected = formationOptions.find((f) => f.slug === formationSlug);
    const formationTitle = selected?.title ?? 'Formation catalogue IA BTP';
    const formationHref = selected?.href ?? '/formations';

    setPending(true);
    setError(null);
    const result = await submitContactFormAction({
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      company: String(fd.get('company') ?? ''),
      subject: 'choix-formation',
      message: String(fd.get('message') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      participants: String(fd.get('participants') ?? ''),
      participantRole: '',
      location: String(fd.get('location') ?? ''),
      format: String(fd.get('format') ?? 'indetermine'),
      period: String(fd.get('period') ?? ''),
      formationTheme: formationTitle,
      formationHint: formationHref,
      website: '',
      formStartedAt: startedAt.current,
    });
    setPending(false);
    if (result.ok) {
      setSuccess(true);
      trackContactFormSuccess('choix-formation');
    } else {
      setError(result.error);
    }
  }

  if (success) {
    return (
      <p className="rounded-lg bg-emerald-500/20 px-4 py-3 text-sm text-emerald-50">{CONTACT_FORM_SUCCESS}</p>
    );
  }

  const fieldClass = 'mt-1 w-full rounded-lg border border-white/20 bg-white px-3 py-2 text-sm text-slate-900';

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm font-semibold text-white">Proposer une date</p>
      <label className="block text-xs font-medium text-slate-200">
        Formation
        <select name="formationSlug" required className={fieldClass} defaultValue="">
          <option value="" disabled>
            Choisir une formation
          </option>
          {formationOptions.map((f) => (
            <option key={f.slug} value={f.slug}>
              {f.title}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-xs font-medium text-slate-200">
          Nom *
          <input name="name" required className={fieldClass} autoComplete="name" />
        </label>
        <label className="block text-xs font-medium text-slate-200">
          Email pro *
          <input name="email" type="email" required className={fieldClass} autoComplete="email" />
        </label>
      </div>
      <label className="block text-xs font-medium text-slate-200">
        Entreprise *
        <input name="company" required className={fieldClass} autoComplete="organization" />
      </label>
      <label className="block text-xs font-medium text-slate-200">
        Téléphone
        <input name="phone" type="tel" className={fieldClass} autoComplete="tel" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-xs font-medium text-slate-200">
          Participants (approx.)
          <input name="participants" className={fieldClass} inputMode="numeric" />
        </label>
        <label className="block text-xs font-medium text-slate-200">
          Période souhaitée
          <input name="period" className={fieldClass} placeholder="ex. mars–avril 2026" />
        </label>
      </div>
      <label className="block text-xs font-medium text-slate-200">
        Département
        <select name="location" className={fieldClass}>
          <option value="">—</option>
          {IDF_DEPARTEMENT_OPTIONS.filter((d) => d.value !== 'hors-idf').map((d) => (
            <option key={d.value} value={d.label}>
              {d.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs font-medium text-slate-200">
        Format
        <select name="format" defaultValue="indetermine" className={fieldClass}>
          <option value="inter">Inter-entreprises</option>
          <option value="intra">Intra-entreprise</option>
          <option value="indetermine">À définir</option>
        </select>
      </label>
      <label className="block text-xs font-medium text-slate-200">
        Précisions
        <textarea
          name="message"
          required
          minLength={20}
          rows={4}
          className={fieldClass}
          defaultValue="Nous souhaitons organiser une session en présentiel en Île-de-France. Merci de nous proposer des créneaux."
        />
      </label>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-[8px] bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60 sm:w-auto"
      >
        {pending ? 'Envoi…' : 'Envoyer la demande'}
      </button>
    </form>
  );
}
