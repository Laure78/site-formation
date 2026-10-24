'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import {
  ORIENTATION_BESOIN_OPTIONS,
  ORIENTATION_EFFECTIF_OPTIONS,
  ORIENTATION_METIER_OPTIONS,
  ORIENTATION_PRATIQUE_OPTIONS,
  computeOrientationRecommendation,
  type OrientationAnswers,
} from '@/lib/formation-orientation';
import { HEADER_PRIMARY_CTA_HREF } from '@/lib/header-cta';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

const STEPS = [
  { key: 'metier' as const, legend: 'Quel est votre métier ?' },
  { key: 'pratique' as const, legend: 'Quelle est votre pratique de l’IA ?' },
  { key: 'besoin' as const, legend: 'Quel est votre besoin prioritaire ?' },
  { key: 'effectif' as const, legend: 'Qui souhaitez-vous former ?' },
] as const;

type StepKey = (typeof STEPS)[number]['key'];

function isStepComplete(key: StepKey, answers: OrientationAnswers): boolean {
  return Boolean(answers[key]);
}

type Props = {
  onComplete?: (answers: OrientationAnswers) => void;
};

export function FormationsOrientationWizard({ onComplete }: Props = {}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OrientationAnswers>({});
  const [showResults, setShowResults] = useState(false);

  const result = useMemo(
    () => (showResults ? computeOrientationRecommendation(answers) : null),
    [answers, showResults],
  );

  const current = STEPS[step];
  const canNext = isStepComplete(current.key, answers);
  const progressPct = showResults ? 100 : ((step + 1) / STEPS.length) * 100;

  const setAnswer = <K extends StepKey>(key: K, value: NonNullable<OrientationAnswers[K]>) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setShowResults(false);
  };

  const goNext = () => {
    if (!canNext) return;
    if (step >= STEPS.length - 1) {
      setShowResults(true);
      if (onComplete && canNext) {
        onComplete(answers);
      }
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => {
    if (showResults) {
      setShowResults(false);
      setStep(STEPS.length - 1);
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  };

  return (
    <div
      className="mt-8 rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm md:p-8"
      aria-labelledby="orientation-wizard-title"
    >
      <h3 id="orientation-wizard-title" className="font-display text-lg font-bold text-ofc-ink md:text-xl">
        Questionnaire d’orientation
      </h3>
      <p className="mt-2 text-sm text-ofc-ink-muted">
        Quatre questions — résultat immédiat, sans email. Les formations restent consultables
        indépendamment de ce questionnaire.
      </p>

      <div className="mt-6" role="progressbar" aria-valuenow={Math.round(progressPct)} aria-valuemin={0} aria-valuemax={100} aria-label="Progression du questionnaire">
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-ofc-accent transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-ofc-ink-muted">
          {showResults ? 'Résultat' : `Étape ${step + 1} sur ${STEPS.length}`}
        </p>
      </div>

      {!showResults ? (
        <fieldset className="mt-8 min-w-0">
          <legend className="font-display text-base font-bold text-ofc-ink md:text-lg">
            {current.legend}
          </legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {(current.key === 'metier'
              ? ORIENTATION_METIER_OPTIONS
              : current.key === 'pratique'
                ? ORIENTATION_PRATIQUE_OPTIONS
                : current.key === 'besoin'
                  ? ORIENTATION_BESOIN_OPTIONS
                  : ORIENTATION_EFFECTIF_OPTIONS
            ).map((opt) => {
              const id = `orientation-${current.key}-${opt.id}`;
              const checked = answers[current.key] === opt.id;
              return (
                <label
                  key={opt.id}
                  htmlFor={id}
                  className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm leading-snug transition-colors ${
                    checked
                      ? 'border-ofc-accent bg-ofc-accent-soft/40 text-ofc-ink'
                      : 'border-ofc-border bg-white text-ofc-ink-muted hover:border-ofc-accent/50'
                  }`}
                >
                  <input
                    id={id}
                    type="radio"
                    name={`orientation-${current.key}`}
                    className="mt-1 h-4 w-4 shrink-0 accent-[#377CF3]"
                    checked={checked}
                    onChange={() => setAnswer(current.key, opt.id as never)}
                  />
                  <span>{opt.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : result ? (
        <div className="mt-8 space-y-6" aria-live="polite" aria-atomic="true">
          {result.primary.kind === 'formation' ? (
            <article className="rounded-lg border border-ofc-accent/30 bg-ofc-accent-soft/20 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ofc-accent">
                Formation recommandée
              </p>
              <h4 className="mt-2 font-display text-xl font-bold text-ofc-ink">
                {result.primary.titre}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted">
                {result.primary.justification}
              </p>
              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-ofc-ink">Niveau</dt>
                  <dd className="text-ofc-ink-muted">{result.primary.niveauLabel}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ofc-ink">Durée (catalogue)</dt>
                  <dd className="text-ofc-ink-muted">{result.primary.duree}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-semibold text-ofc-ink">Prérequis</dt>
                  <dd className="text-ofc-ink-muted">{result.primary.prerequis}</dd>
                </div>
              </dl>
              {result.primary.prerequisAlert ? (
                <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
                  {result.primary.prerequisAlert}
                </p>
              ) : null}
              <Link
                href={result.primary.href}
                className={`${OFC_CTA_PRIMARY} mt-6 inline-flex min-h-11 items-center justify-center px-6 py-3`}
              >
                Voir le programme
              </Link>
            </article>
          ) : (
            <article className="rounded-lg border border-ofc-border bg-slate-50 p-5">
              <h4 className="font-display text-lg font-bold text-ofc-ink">
                Échange de cadrage recommandé
              </h4>
              <p className="mt-3 text-sm text-ofc-ink-muted">{result.primary.justification}</p>
              <Link
                href={result.primary.href}
                className={`${OFC_CTA_PRIMARY} mt-6 inline-flex min-h-11 items-center justify-center px-6 py-3`}
              >
                Échanger sur cette recommandation
              </Link>
            </article>
          )}

          {result.complement ? (
            <article className="rounded-lg border border-ofc-border bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ofc-ink-muted">
                Parcours complémentaire
              </p>
              {result.complement.kind === 'formation' ? (
                <>
                  <h4 className="mt-2 font-display text-lg font-bold text-ofc-ink">
                    {result.complement.titre}
                  </h4>
                  <p className="mt-2 text-sm text-ofc-ink-muted">{result.complement.justification}</p>
                  <Link
                    href={result.complement.href}
                    className={`${OFC_CTA_SECONDARY} mt-4 inline-flex min-h-10 items-center px-5 py-2.5 text-sm font-semibold`}
                  >
                    Voir le programme
                  </Link>
                </>
              ) : (
                <>
                  <h4 className="mt-2 font-display text-lg font-bold text-ofc-ink">
                    {result.complement.titre}
                  </h4>
                  <p className="mt-2 text-sm text-ofc-ink-muted">{result.complement.justification}</p>
                  <Link
                    href={result.complement.href}
                    className={`${OFC_CTA_SECONDARY} mt-4 inline-flex min-h-10 items-center px-5 py-2.5 text-sm font-semibold`}
                  >
                    Découvrir mon parcours
                  </Link>
                </>
              )}
            </article>
          ) : null}

          {result.effectifNote ? (
            <p className="text-sm text-ofc-ink-muted">{result.effectifNote}</p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={`${HEADER_PRIMARY_CTA_HREF}?src=orientation-formation`}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
            >
              Échanger sur cette recommandation
            </Link>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-ofc-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              Recommencer
            </button>
          </div>
        </div>
      ) : null}

      {!showResults ? (
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="inline-flex min-h-11 items-center justify-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-ofc-ink-muted disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Retour
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-1 px-6 py-3 disabled:opacity-50`}
          >
            {step >= STEPS.length - 1 ? 'Voir ma recommandation' : 'Suivant'}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-ofc-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Modifier mes réponses
          </button>
        </div>
      )}
    </div>
  );
}
