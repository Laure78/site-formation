'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { submitCareerApplicationAction } from '@/app/actions/career-application';
import {
  CAREER_FORM_RGPD_NOTICE,
  CAREER_FORM_SUCCESS,
  CONSULTANT_EXPERTISE_LABELS,
  CONSULTANT_EXPERTISE_VALUES,
  MOBILITY_IDF_LABELS,
  MOBILITY_IDF_VALUES,
  SPONTANEOUS_TYPE_LABELS,
  SPONTANEOUS_TYPE_VALUES,
  type CareerKind,
  type ConsultantExpertiseValue,
  type SpontaneousTypeValue,
} from '@/lib/career-form-validation';
import { LINKS } from '@/lib/internal-links';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';
import { formationHref } from '@/data/formations';
import {
  careerFieldClassBase,
  careerFieldErrorClass,
  careerLabelClass,
} from '@/components/career/career-form-styles';

type FormationOption = {
  slug: string;
  titre: string;
  niveauLabel: string;
  href: string;
};

const FORMATION_OPTIONS: FormationOption[] = getPublishedFormations().map((f) => ({
  slug: f.slug,
  titre: f.titre,
  niveauLabel: f.niveauLabel,
  href: formationHref(f),
}));

type CareerApplicationFormProps = {
  kind: CareerKind;
  sourcePage: string;
  submitLabel: string;
  /** Afficher les cases formations (consultant uniquement). */
  showFormationCheckboxes?: boolean;
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-[#DC2626]" role="alert">
      {message}
    </p>
  );
}

export function CareerApplicationForm({
  kind,
  sourcePage,
  submitLabel,
  showFormationCheckboxes = kind === 'consultant',
}: CareerApplicationFormProps) {
  const formId = useId();
  const errorSummaryId = `${formId}-errors`;
  const statusId = `${formId}-status`;
  const formRef = useRef<HTMLFormElement>(null);
  const formStartedAtRef = useRef<number>(0);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [expertiseDomain, setExpertiseDomain] = useState<ConsultantExpertiseValue | ''>('');
  const [applicationType, setApplicationType] = useState<SpontaneousTypeValue | ''>('');
  const [desiredRole, setDesiredRole] = useState('');
  const [presentation, setPresentation] = useState('');
  const [mobilityIdf, setMobilityIdf] = useState<(typeof MOBILITY_IDF_VALUES)[number] | ''>('');
  const [availability, setAvailability] = useState('');
  const [linkedinOrPortfolio, setLinkedinOrPortfolio] = useState('');
  const [selectedFormations, setSelectedFormations] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    formStartedAtRef.current = Date.now();
  }, []);

  const fieldClass = (name: string) =>
    `${careerFieldClassBase}${fieldErrors[name] ? ` ${careerFieldErrorClass}` : ''}`;

  const toggleFormation = useCallback((slug: string) => {
    setSelectedFormations((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const showConsultantHint =
    kind === 'spontaneous' &&
    (applicationType === 'collaboration-independante' ||
      /formateur|animer|intervenir|animation|formation/i.test(`${desiredRole} ${presentation}`));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);
    setFieldErrors({});

    const fd = new FormData();
    fd.set('kind', kind);
    fd.set('firstName', firstName);
    fd.set('lastName', lastName);
    fd.set('email', email);
    fd.set('phone', phone);
    fd.set('presentation', presentation);
    fd.set('availability', availability);
    fd.set('linkedinOrPortfolio', linkedinOrPortfolio);
    fd.set('sourcePage', sourcePage);
    fd.set('formStartedAt', String(formStartedAtRef.current));
    fd.set('website', '');

    if (kind === 'consultant') {
      fd.set('expertiseDomain', expertiseDomain);
      fd.set('mobilityIdf', mobilityIdf);
      fd.set('formationSlugs', selectedFormations.join(', '));
    } else {
      fd.set('applicationType', applicationType);
      fd.set('desiredRole', desiredRole);
    }

    const cvInput = formRef.current?.querySelector<HTMLInputElement>('input[name="cv"]');
    if (cvInput?.files?.[0]) {
      fd.set('cv', cvInput.files[0]);
    }

    const result = await submitCareerApplicationAction(fd);
    setSubmitting(false);

    if (result.ok) {
      setSuccess(true);
      formRef.current?.reset();
      setSelectedFormations([]);
      return;
    }

    setError(result.error);
    if (result.fieldErrors) {
      setFieldErrors(result.fieldErrors);
      const firstKey = Object.keys(result.fieldErrors)[0];
      const el = formRef.current?.querySelector(`[name="${firstKey}"], #${firstKey}`) as
        | HTMLElement
        | null;
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
        <p className="text-base font-medium text-slate-900">{CAREER_FORM_SUCCESS}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-2xl space-y-5"
      aria-describedby={error ? errorSummaryId : undefined}
    >
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor={`${formId}-website`}>Site web</label>
        <input id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <div
          id={errorSummaryId}
          className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#991B1B]"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-firstName`} className={careerLabelClass}>
            Prénom <span className="text-[#DC2626]">*</span>
          </label>
          <input
            id={`${formId}-firstName`}
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={fieldClass('firstName')}
            aria-invalid={Boolean(fieldErrors.firstName)}
            aria-describedby={fieldErrors.firstName ? `${formId}-err-firstName` : undefined}
          />
          <FieldError id={`${formId}-err-firstName`} message={fieldErrors.firstName} />
        </div>
        <div>
          <label htmlFor={`${formId}-lastName`} className={careerLabelClass}>
            Nom <span className="text-[#DC2626]">*</span>
          </label>
          <input
            id={`${formId}-lastName`}
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={fieldClass('lastName')}
            aria-invalid={Boolean(fieldErrors.lastName)}
            aria-describedby={fieldErrors.lastName ? `${formId}-err-lastName` : undefined}
          />
          <FieldError id={`${formId}-err-lastName`} message={fieldErrors.lastName} />
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-email`} className={careerLabelClass}>
          Email <span className="text-[#DC2626]">*</span>
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass('email')}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? `${formId}-err-email` : undefined}
        />
        <FieldError id={`${formId}-err-email`} message={fieldErrors.email} />
      </div>

      <div>
        <label htmlFor={`${formId}-phone`} className={careerLabelClass}>
          Téléphone
        </label>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={fieldClass('phone')}
        />
      </div>

      {kind === 'consultant' ? (
        <div>
          <label htmlFor={`${formId}-expertiseDomain`} className={careerLabelClass}>
            Domaine principal d’expertise <span className="text-[#DC2626]">*</span>
          </label>
          <select
            id={`${formId}-expertiseDomain`}
            name="expertiseDomain"
            required
            value={expertiseDomain}
            onChange={(e) => setExpertiseDomain(e.target.value as ConsultantExpertiseValue)}
            className={fieldClass('expertiseDomain')}
            aria-invalid={Boolean(fieldErrors.expertiseDomain)}
            aria-describedby={
              fieldErrors.expertiseDomain ? `${formId}-err-expertiseDomain` : undefined
            }
          >
            <option value="">Sélectionnez…</option>
            {CONSULTANT_EXPERTISE_VALUES.map((v) => (
              <option key={v} value={v}>
                {CONSULTANT_EXPERTISE_LABELS[v]}
              </option>
            ))}
          </select>
          <FieldError
            id={`${formId}-err-expertiseDomain`}
            message={fieldErrors.expertiseDomain}
          />
        </div>
      ) : (
        <>
          <div>
            <label htmlFor={`${formId}-applicationType`} className={careerLabelClass}>
              Type de candidature <span className="text-[#DC2626]">*</span>
            </label>
            <select
              id={`${formId}-applicationType`}
              name="applicationType"
              required
              value={applicationType}
              onChange={(e) => setApplicationType(e.target.value as SpontaneousTypeValue)}
              className={fieldClass('applicationType')}
              aria-invalid={Boolean(fieldErrors.applicationType)}
              aria-describedby={
                fieldErrors.applicationType ? `${formId}-err-applicationType` : undefined
              }
            >
              <option value="">Sélectionnez…</option>
              {SPONTANEOUS_TYPE_VALUES.map((v) => (
                <option key={v} value={v}>
                  {SPONTANEOUS_TYPE_LABELS[v]}
                </option>
              ))}
            </select>
            <FieldError
              id={`${formId}-err-applicationType`}
              message={fieldErrors.applicationType}
            />
          </div>
          <div>
            <label htmlFor={`${formId}-desiredRole`} className={careerLabelClass}>
              Fonction ou domaine souhaité <span className="text-[#DC2626]">*</span>
            </label>
            <input
              id={`${formId}-desiredRole`}
              name="desiredRole"
              type="text"
              required
              value={desiredRole}
              onChange={(e) => setDesiredRole(e.target.value)}
              className={fieldClass('desiredRole')}
              aria-invalid={Boolean(fieldErrors.desiredRole)}
              aria-describedby={fieldErrors.desiredRole ? `${formId}-err-desiredRole` : undefined}
            />
            <FieldError id={`${formId}-err-desiredRole`} message={fieldErrors.desiredRole} />
          </div>
        </>
      )}

      <div>
        <label htmlFor={`${formId}-presentation`} className={careerLabelClass}>
          {kind === 'consultant'
            ? 'Présentation (expérience BTP, pratique de l’IA, expérience pédagogique)'
            : 'Présentation de la candidature'}{' '}
          <span className="text-[#DC2626]">*</span>
        </label>
        <textarea
          id={`${formId}-presentation`}
          name="presentation"
          required
          rows={6}
          value={presentation}
          onChange={(e) => setPresentation(e.target.value)}
          className={fieldClass('presentation')}
          aria-invalid={Boolean(fieldErrors.presentation)}
          aria-describedby={fieldErrors.presentation ? `${formId}-err-presentation` : undefined}
        />
        <FieldError id={`${formId}-err-presentation`} message={fieldErrors.presentation} />
      </div>

      {kind === 'consultant' ? (
        <fieldset className="space-y-2">
          <legend className={careerLabelClass}>
            Mobilité pour intervenir en présentiel en Île-de-France{' '}
            <span className="text-[#DC2626]">*</span>
          </legend>
          {MOBILITY_IDF_VALUES.map((v) => (
            <label key={v} className="flex cursor-pointer gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="mobilityIdf"
                value={v}
                checked={mobilityIdf === v}
                onChange={() => setMobilityIdf(v)}
                className="mt-1 h-4 w-4 shrink-0 border-slate-300 text-[#377CF3] focus:ring-[#377CF3]"
              />
              {MOBILITY_IDF_LABELS[v]}
            </label>
          ))}
          <FieldError id={`${formId}-err-mobilityIdf`} message={fieldErrors.mobilityIdf} />
        </fieldset>
      ) : null}

      {showFormationCheckboxes && FORMATION_OPTIONS.length > 0 ? (
        <fieldset className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
          <legend className="px-1 text-sm font-medium text-slate-800">
            Formations du catalogue sur lesquelles vous souhaitez intervenir (facultatif)
          </legend>
          <ul className="max-h-64 space-y-2 overflow-y-auto pr-1">
            {FORMATION_OPTIONS.map((f) => (
              <li key={f.slug}>
                <label className="flex cursor-pointer gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedFormations.includes(f.slug)}
                    onChange={() => toggleFormation(f.slug)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#377CF3] focus:ring-[#377CF3]"
                  />
                  <span>
                    <span className="font-medium text-slate-900">{f.titre}</span>
                    <span className="text-slate-500"> — {f.niveauLabel}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      ) : null}

      <div>
        <label htmlFor={`${formId}-availability`} className={careerLabelClass}>
          Disponibilités
        </label>
        <input
          id={`${formId}-availability`}
          name="availability"
          type="text"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className={fieldClass('availability')}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-linkedinOrPortfolio`} className={careerLabelClass}>
          LinkedIn ou portfolio
        </label>
        <input
          id={`${formId}-linkedinOrPortfolio`}
          name="linkedinOrPortfolio"
          type="url"
          inputMode="url"
          placeholder="https://"
          value={linkedinOrPortfolio}
          onChange={(e) => setLinkedinOrPortfolio(e.target.value)}
          className={fieldClass('linkedinOrPortfolio')}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-cv`} className={careerLabelClass}>
          CV (PDF, 5 Mo maximum)
        </label>
        <input
          id={`${formId}-cv`}
          name="cv"
          type="file"
          accept="application/pdf,.pdf"
          className={`${fieldClass('cv')} file:mr-3 file:rounded-md file:border-0 file:bg-[#EFF6FF] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-[#377CF3]`}
          aria-invalid={Boolean(fieldErrors.cv)}
          aria-describedby={fieldErrors.cv ? `${formId}-err-cv` : undefined}
        />
        <FieldError id={`${formId}-err-cv`} message={fieldErrors.cv} />
      </div>

      {showConsultantHint ? (
        <p className="rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3 text-sm text-slate-700">
          Vous souhaitez intervenir comme consultant-formateur ? Vous pouvez aussi compléter le{' '}
          <Link href={LINKS.devenezConsultant} className="font-medium text-[#377CF3] underline">
            formulaire dédié aux consultants
          </Link>
          .
        </p>
      ) : null}

      <p className="text-xs leading-relaxed text-slate-600">
        {CAREER_FORM_RGPD_NOTICE}{' '}
        <Link href={LINKS.politiqueConfidentialite} className="text-[#377CF3] underline">
          Politique de confidentialité
        </Link>
        .
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="ofc-cta-primary inline-flex min-h-12 w-full items-center justify-center rounded-lg px-6 py-3 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        aria-busy={submitting}
        aria-describedby={statusId}
      >
        {submitting ? 'Envoi en cours…' : submitLabel}
      </button>
      <p id={statusId} className="sr-only" aria-live="polite">
        {submitting ? 'Envoi en cours' : ''}
      </p>
    </form>
  );
}
