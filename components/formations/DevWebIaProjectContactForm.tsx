'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { submitDevWebIaProjectContactAction } from '@/app/actions/dev-web-ia-project-contact';
import {
  CONTACT_FORM_RGPD_NOTICE,
  CONTACT_FORM_SENSITIVE_HINT,
  CONTACT_FORM_SUCCESS,
  CONTACT_FORM_SUCCESS_CALENDLY,
} from '@/lib/contact-page-config';
import {
  DEV_WEB_IA_EFFECTIF_LABELS,
  DEV_WEB_IA_EFFECTIF_VALUES,
  DEV_WEB_IA_FORMAT_LABELS,
  DEV_WEB_IA_FORMAT_VALUES,
  DEV_WEB_IA_PROJECT_TYPE_LABELS,
  DEV_WEB_IA_PROJECT_TYPE_VALUES,
  parseDevWebIaProjectFormPayload,
  type DevWebIaEffectifValue,
  type DevWebIaFormatValue,
  type DevWebIaProjectTypeValue,
} from '@/lib/dev-web-ia-project-form-validation';
import { LINKS } from '@/lib/internal-links';
import {
  trackContactFormError,
  trackContactFormStart,
  trackContactFormSuccess,
  trackContactCtaClick,
} from '@/lib/ga4-analytics';
import {
  DEV_WEB_IA_CONTACT_SUBJECT,
  DEV_WEB_IA_FORMATION_TITRE,
} from '@/lib/formation-developpement-web-ia-content';

const fieldClassBase =
  'mt-1 w-full rounded-lg border border-[#CBD5E1] bg-white px-4 text-[#0F172A] focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/30 py-2.5';
const fieldErrorClass = 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/30';

type Props = {
  /** Pré-sélection du type de projet (ex. depuis une carte). */
  initialProjectType?: DevWebIaProjectTypeValue;
};

export function DevWebIaProjectContactForm({ initialProjectType }: Props) {
  const formId = useId();
  const errorSummaryId = `${formId}-errors`;
  const formRef = useRef<HTMLFormElement>(null);

  const [projectType, setProjectType] = useState<DevWebIaProjectTypeValue>(
    initialProjectType ?? 'heures-paie',
  );
  const [format, setFormat] = useState<DevWebIaFormatValue>('indetermine');
  const [effectif, setEffectif] = useState<DevWebIaEffectifValue>('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [started, setStarted] = useState(false);
  const formStartedAtRef = useRef<number>(0);

  useEffect(() => {
    formStartedAtRef.current = Date.now();
  }, []);

  const handleStart = useCallback(() => {
    if (!started) {
      setStarted(true);
      trackContactFormStart();
    }
  }, [started]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);
    setFieldErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      company: fd.get('company') || '',
      phone: fd.get('phone') || '',
      projectType: fd.get('projectType'),
      effectif: fd.get('effectif') || '',
      message: fd.get('message'),
      format: fd.get('format'),
      website: fd.get('website') || '',
      formStartedAt: formStartedAtRef.current,
    };

    const clientParsed = parseDevWebIaProjectFormPayload(payload);
    if (!clientParsed.success) {
      setSubmitting(false);
      setError('Vérifiez les champs du formulaire.');
      setFieldErrors(clientParsed.fieldErrors);
      trackContactFormError('client_validation');
      const firstKey = Object.keys(clientParsed.fieldErrors)[0];
      const el = formRef.current?.querySelector(`[name="${firstKey}"]`) as HTMLElement | null;
      el?.focus();
      return;
    }

    const result = await submitDevWebIaProjectContactAction(payload);
    setSubmitting(false);

    if (result.ok) {
      trackContactFormSuccess(DEV_WEB_IA_CONTACT_SUBJECT);
      setSuccess(true);
      formRef.current?.reset();
      setProjectType(initialProjectType ?? 'heures-paie');
      setFormat('indetermine');
      setEffectif('');
      return;
    }

    trackContactFormError(result.errorCode ?? 'server_error');
    setError(result.error);
    if (result.fieldErrors) {
      setFieldErrors(result.fieldErrors);
      const firstKey = Object.keys(result.fieldErrors)[0];
      const el = formRef.current?.querySelector(`[name="${firstKey}"]`) as HTMLElement | null;
      el?.focus();
    }
  };

  if (success) {
    return (
      <div
        className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 sm:p-8"
        role="status"
        aria-live="polite"
      >
        <p className="font-semibold text-[#0F172A]">{CONTACT_FORM_SUCCESS}</p>
        <p className="mt-3 text-sm text-[#475569]">{CONTACT_FORM_SUCCESS_CALENDLY}</p>
        <p className="mt-4">
          <Link
            href={LINKS.prendreRdv}
            onClick={() => trackContactCtaClick('rdv')}
            className="inline-flex min-h-[44px] items-center font-semibold text-[#377CF3] underline"
          >
            Réserver un échange de 30 minutes
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2
        id="dev-web-ia-project-form-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Échanger sur mon projet d&apos;ERP BTP
      </h2>
      <p className="mt-3 max-w-2xl text-base text-slate-600">
        Décrivez le module prioritaire que vous souhaitez amorcer pendant la formation «{' '}
        {DEV_WEB_IA_FORMATION_TITRE} ». Réponse sous 48 heures ouvrées.
      </p>

      {error ? (
        <div
          id={errorSummaryId}
          role="alert"
          className="mt-4 rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#991B1B]"
        >
          {error}
        </div>
      ) : null}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onFocus={handleStart}
        noValidate
        className="mt-6 space-y-5"
        aria-describedby={error ? errorSummaryId : undefined}
      >
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${formId}-website`}>Site web</label>
          <input
            id={`${formId}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-name`} className="block text-sm font-medium text-[#0F172A]">
              Nom et prénom <span className="text-[#DC2626]">*</span>
            </label>
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              required
              autoComplete="name"
              maxLength={120}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? `${formId}-name-error` : undefined}
              className={`${fieldClassBase} ${fieldErrors.name ? fieldErrorClass : ''}`}
            />
            {fieldErrors.name ? (
              <p id={`${formId}-name-error`} className="mt-1 text-sm text-[#DC2626]">
                {fieldErrors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={`${formId}-email`} className="block text-sm font-medium text-[#0F172A]">
              Adresse e-mail <span className="text-[#DC2626]">*</span>
            </label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              maxLength={254}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? `${formId}-email-error` : undefined}
              className={`${fieldClassBase} ${fieldErrors.email ? fieldErrorClass : ''}`}
            />
            {fieldErrors.email ? (
              <p id={`${formId}-email-error`} className="mt-1 text-sm text-[#DC2626]">
                {fieldErrors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-company`} className="block text-sm font-medium text-[#0F172A]">
              Entreprise <span className="text-slate-500">(facultatif)</span>
            </label>
            <input
              id={`${formId}-company`}
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={200}
              aria-invalid={Boolean(fieldErrors.company)}
              className={`${fieldClassBase} ${fieldErrors.company ? fieldErrorClass : ''}`}
            />
            {fieldErrors.company ? (
              <p className="mt-1 text-sm text-[#DC2626]">{fieldErrors.company}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor={`${formId}-phone`} className="block text-sm font-medium text-[#0F172A]">
              Téléphone <span className="text-slate-500">(facultatif)</span>
            </label>
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={30}
              className={fieldClassBase}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-projectType`} className="block text-sm font-medium text-[#0F172A]">
              Type de projet <span className="text-[#DC2626]">*</span>
            </label>
            <select
              id={`${formId}-projectType`}
              name="projectType"
              required
              value={projectType}
              onChange={(e) => setProjectType(e.target.value as DevWebIaProjectTypeValue)}
              aria-invalid={Boolean(fieldErrors.projectType)}
              className={`${fieldClassBase} ${fieldErrors.projectType ? fieldErrorClass : ''}`}
            >
              {DEV_WEB_IA_PROJECT_TYPE_VALUES.map((value) => (
                <option key={value} value={value}>
                  {DEV_WEB_IA_PROJECT_TYPE_LABELS[value]}
                </option>
              ))}
            </select>
            {fieldErrors.projectType ? (
              <p className="mt-1 text-sm text-[#DC2626]">{fieldErrors.projectType}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor={`${formId}-format`} className="block text-sm font-medium text-[#0F172A]">
              Format souhaité <span className="text-[#DC2626]">*</span>
            </label>
            <select
              id={`${formId}-format`}
              name="format"
              required
              value={format}
              onChange={(e) => setFormat(e.target.value as DevWebIaFormatValue)}
              aria-invalid={Boolean(fieldErrors.format)}
              className={`${fieldClassBase} ${fieldErrors.format ? fieldErrorClass : ''}`}
            >
              {DEV_WEB_IA_FORMAT_VALUES.map((value) => (
                <option key={value} value={value}>
                  {DEV_WEB_IA_FORMAT_LABELS[value]}
                </option>
              ))}
            </select>
            {fieldErrors.format ? (
              <p className="mt-1 text-sm text-[#DC2626]">{fieldErrors.format}</p>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-effectif`} className="block text-sm font-medium text-[#0F172A]">
            Effectif de l&apos;entreprise <span className="text-slate-500">(facultatif)</span>
          </label>
          <select
            id={`${formId}-effectif`}
            name="effectif"
            value={effectif}
            onChange={(e) => setEffectif(e.target.value as DevWebIaEffectifValue)}
            aria-invalid={Boolean(fieldErrors.effectif)}
            className={`${fieldClassBase} ${fieldErrors.effectif ? fieldErrorClass : ''}`}
          >
            <option value="">Non renseigné</option>
            {DEV_WEB_IA_EFFECTIF_VALUES.filter((value) => value !== '').map((value) => (
              <option key={value} value={value}>
                {DEV_WEB_IA_EFFECTIF_LABELS[value]}
              </option>
            ))}
          </select>
          {fieldErrors.effectif ? (
            <p className="mt-1 text-sm text-[#DC2626]">{fieldErrors.effectif}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-message`} className="block text-sm font-medium text-[#0F172A]">
            Description du projet <span className="text-[#DC2626]">*</span>
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            required
            rows={5}
            maxLength={5000}
            placeholder="Votre idée, les utilisateurs visés, ce que vous aimeriez tester en fin de journée…"
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={`${formId}-message-hint${fieldErrors.message ? ` ${formId}-message-error` : ''}`}
            className={`${fieldClassBase} resize-y ${fieldErrors.message ? fieldErrorClass : ''}`}
          />
          <p id={`${formId}-message-hint`} className="mt-1 text-xs text-[#64748B]">
            {CONTACT_FORM_SENSITIVE_HINT}
          </p>
          {fieldErrors.message ? (
            <p id={`${formId}-message-error`} className="mt-1 text-sm text-[#DC2626]">
              {fieldErrors.message}
            </p>
          ) : null}
        </div>

        <p className="text-xs leading-relaxed text-[#64748B]">
          {CONTACT_FORM_RGPD_NOTICE.replace(' Consultez la politique de confidentialité.', '')}{' '}
          <Link href={LINKS.politiqueConfidentialite} className="font-medium text-[#377CF3] underline">
            Politique de confidentialité
          </Link>
          .
        </p>

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-[#377CF3] px-6 py-3 text-base font-semibold text-white hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] sm:w-auto"
        >
          {submitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
        </button>
      </form>
    </div>
  );
}
