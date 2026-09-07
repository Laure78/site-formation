'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { submitContactFormAction } from '@/app/actions/contact';
import {
  CONTACT_FORM_NEED_EXAMPLE,
  CONTACT_FORM_NEED_PLACEHOLDER,
  CONTACT_FORM_RGPD_NOTICE,
  CONTACT_FORM_SENSITIVE_HINT,
  CONTACT_FORM_SUCCESS,
  CONTACT_FORM_SUCCESS_CALENDLY,
  CONTACT_FORM_TITLE,
} from '@/lib/contact-page-config';
import {
  CONTACT_SUBJECT_LABELS,
  CONTACT_SUBJECT_VALUES,
  parseContactFormPayload,
  type ContactSubjectValue,
} from '@/lib/contact-form-validation';
import { LINKS } from '@/lib/internal-links';
import {
  trackContactFormError,
  trackContactFormStart,
  trackContactFormSuccess,
  trackContactCtaClick,
} from '@/lib/ga4-analytics';
import { ContactFormationHint } from '@/components/landing/ContactFormationHint';
import {
  FORMATION_FORMAT_OPTIONS,
  HORS_IDF_MESSAGE,
  IDF_DEPARTEMENT_OPTIONS,
} from '@/lib/business-delivery';

const fieldClass =
  'mt-1 w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-2.5 text-[#0F172A] focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/30';
const fieldErrorClass = 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/30';

function isValidSubject(value: string | null | undefined): value is ContactSubjectValue {
  return CONTACT_SUBJECT_VALUES.includes(value as ContactSubjectValue);
}

type ContactFormProps = {
  initialObjet?: string | null;
  formationHint?: string | null;
};

export function ContactForm({ initialObjet, formationHint }: ContactFormProps) {
  const formId = useId();
  const errorSummaryId = `${formId}-errors`;
  const statusId = `${formId}-status`;
  const formationHintParam = formationHint ?? null;

  const [subject, setSubject] = useState<ContactSubjectValue>(
    isValidSubject(initialObjet) ? initialObjet : 'devis',
  );
  const [locationDept, setLocationDept] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [started, setStarted] = useState(false);
  const formStartedAtRef = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

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
      company: fd.get('company'),
      subject: fd.get('subject'),
      message: fd.get('message'),
      phone: fd.get('phone') || '',
      participants: fd.get('participants') || '',
      participantRole: fd.get('participantRole') || '',
      location: fd.get('location') || '',
      format: fd.get('format') || '',
      period: fd.get('period') || '',
      formationTheme: fd.get('formationTheme') || '',
      formationHint: formationHintParam || fd.get('formationHint') || '',
      website: fd.get('website') || '',
      formStartedAt: formStartedAtRef.current,
    };

    const clientParsed = parseContactFormPayload(payload);
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

    const result = await submitContactFormAction(payload);
    setSubmitting(false);

    if (result.ok) {
      trackContactFormSuccess(subject);
      setSuccess(true);
      formRef.current?.reset();
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

  const showExtraHint = subject === 'devis' || subject === 'intra' || subject === 'federation';

  return (
    <div>
      <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
        {CONTACT_FORM_TITLE}
      </h2>

      <div className="mt-3">
        <ContactFormationHint formationHint={formationHintParam} />
      </div>

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
              Votre nom <span className="text-[#DC2626]">*</span>
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
              className={`${fieldClass} ${fieldErrors.name ? fieldErrorClass : ''}`}
            />
            {fieldErrors.name ? (
              <p id={`${formId}-name-error`} className="mt-1 text-sm text-[#DC2626]">
                {fieldErrors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={`${formId}-email`} className="block text-sm font-medium text-[#0F172A]">
              Votre email professionnel <span className="text-[#DC2626]">*</span>
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
              className={`${fieldClass} ${fieldErrors.email ? fieldErrorClass : ''}`}
            />
            {fieldErrors.email ? (
              <p id={`${formId}-email-error`} className="mt-1 text-sm text-[#DC2626]">
                {fieldErrors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-company`} className="block text-sm font-medium text-[#0F172A]">
            Entreprise ou organisme <span className="text-[#DC2626]">*</span>
          </label>
          <input
            id={`${formId}-company`}
            name="company"
            type="text"
            required
            autoComplete="organization"
            maxLength={200}
            aria-invalid={Boolean(fieldErrors.company)}
            aria-describedby={fieldErrors.company ? `${formId}-company-error` : undefined}
            className={`${fieldClass} ${fieldErrors.company ? fieldErrorClass : ''}`}
          />
          {fieldErrors.company ? (
            <p id={`${formId}-company-error`} className="mt-1 text-sm text-[#DC2626]">
              {fieldErrors.company}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-subject`} className="block text-sm font-medium text-[#0F172A]">
            Objet de la demande <span className="text-[#DC2626]">*</span>
          </label>
          <select
            id={`${formId}-subject`}
            name="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value as ContactSubjectValue)}
            aria-invalid={Boolean(fieldErrors.subject)}
            className={`${fieldClass} ${fieldErrors.subject ? fieldErrorClass : ''}`}
          >
            {CONTACT_SUBJECT_VALUES.map((value) => (
              <option key={value} value={value}>
                {CONTACT_SUBJECT_LABELS[value]}
              </option>
            ))}
          </select>
          {fieldErrors.subject ? (
            <p className="mt-1 text-sm text-[#DC2626]">{fieldErrors.subject}</p>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-location`} className="block text-sm font-medium text-[#0F172A]">
              Localisation de la formation
            </label>
            <select
              id={`${formId}-location`}
              name="location"
              value={locationDept}
              onChange={(e) => setLocationDept(e.target.value)}
              className={fieldClass}
            >
              <option value="">Choisir…</option>
              {IDF_DEPARTEMENT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
            {locationDept.includes('Hors') ? (
              <p className="mt-2 text-sm text-amber-800">{HORS_IDF_MESSAGE}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor={`${formId}-participants`} className="block text-sm font-medium text-[#0F172A]">
              Nombre de participants
            </label>
            <input
              id={`${formId}-participants`}
              name="participants"
              type="number"
              min={2}
              max={50}
              inputMode="numeric"
              className={fieldClass}
              placeholder="Ex. 6"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${formId}-format`} className="block text-sm font-medium text-[#0F172A]">
              Format
            </label>
            <select id={`${formId}-format`} name="format" className={fieldClass} defaultValue="">
              <option value="">Choisir…</option>
              {FORMATION_FORMAT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-message`} className="block text-sm font-medium text-[#0F172A]">
            Votre besoin <span className="text-[#DC2626]">*</span>
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            required
            rows={5}
            maxLength={5000}
            placeholder={CONTACT_FORM_NEED_PLACEHOLDER}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={`${formId}-message-example ${formId}-message-hint${fieldErrors.message ? ` ${formId}-message-error` : ''}`}
            className={`${fieldClass} resize-y ${fieldErrors.message ? fieldErrorClass : ''}`}
          />
          <p id={`${formId}-message-example`} className="mt-1 text-xs text-[#64748B]">
            {CONTACT_FORM_NEED_EXAMPLE}
          </p>
          <p id={`${formId}-message-hint`} className="mt-1 text-xs text-[#64748B]">
            {CONTACT_FORM_SENSITIVE_HINT}
          </p>
          {fieldErrors.message ? (
            <p id={`${formId}-message-error`} className="mt-1 text-sm text-[#DC2626]">
              {fieldErrors.message}
            </p>
          ) : null}
        </div>

        <details className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
          <summary className="cursor-pointer text-sm font-medium text-[#0F172A]">
            Informations complémentaires (facultatif)
            {showExtraHint ? ' — utile pour un devis' : ''}
          </summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${formId}-phone`} className="block text-sm font-medium text-[#0F172A]">
                Téléphone
              </label>
              <input
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={30}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor={`${formId}-participantRole`} className="block text-sm font-medium text-[#0F172A]">
                Fonction des participants
              </label>
              <input
                id={`${formId}-participantRole`}
                name="participantRole"
                type="text"
                maxLength={120}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor={`${formId}-period`} className="block text-sm font-medium text-[#0F172A]">
                Période envisagée
              </label>
              <input
                id={`${formId}-period`}
                name="period"
                type="text"
                maxLength={120}
                className={fieldClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`${formId}-formationTheme`} className="block text-sm font-medium text-[#0F172A]">
                Formation ou thème concerné
              </label>
              <input
                id={`${formId}-formationTheme`}
                name="formationTheme"
                type="text"
                maxLength={200}
                className={fieldClass}
              />
            </div>
          </div>
        </details>

        {formationHintParam ? (
          <input type="hidden" name="formationHint" value={formationHintParam} />
        ) : null}

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

        <p id={statusId} className="sr-only" aria-live="polite">
          {submitting ? 'Envoi en cours' : ''}
        </p>
      </form>
    </div>
  );
}
