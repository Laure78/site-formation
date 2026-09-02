'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ClipboardCheck, Send } from 'lucide-react';
import { submitDiagnosticAction } from '@/app/actions/diagnostic-ia-btp';
import { DiagnosticResult } from '@/components/diagnostic/DiagnosticResult';
import {
  COMPANY_SIZE_OPTIONS,
  CONSTRUCTYS_OPTIONS,
  DATA_USAGE_OPTIONS,
  DIAGNOSTIC_ROLES,
  DIAGNOSTIC_TOTAL_STEPS,
  FREQUENCY_OPTIONS,
  MATURITY_OPTIONS,
  MAX_TASK_SELECTIONS,
  ORGANISATION_OPTIONS,
  TIME_WEEKLY_OPTIONS,
  sortCategoriesForRole,
  sortTasksInCategory,
} from '@/lib/diagnostic-ia-btp/config';
import {
  trackDiagnosticCompleted,
  trackDiagnosticRoleSelected,
  trackDiagnosticStarted,
  trackDiagnosticTaskSelected,
} from '@/lib/diagnostic-ia-btp/analytics';
import { computeDiagnosticResult } from '@/lib/diagnostic-ia-btp/scoring';
import type { DiagnosticAnswers, DiagnosticTaskId } from '@/lib/diagnostic-ia-btp/types';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';
import { LINKS } from '@/lib/internal-links';

const STEP_QUESTIONS = [
  { key: 'role', label: 'Quel est votre rôle principal dans l\'entreprise ?' },
  { key: 'tasks', label: 'Sur quelles tâches perdez-vous le plus de temps chaque semaine ?' },
  { key: 'timeWeekly', label: 'Combien de temps consacrez-vous environ à ces tâches chaque semaine ?' },
  { key: 'frequency', label: 'À quelle fréquence réalisez-vous ces tâches ?' },
  { key: 'maturity', label: 'Où en êtes-vous aujourd\'hui avec l\'IA ?' },
  {
    key: 'organisation',
    label: 'Comment vos documents et informations sont-ils organisés aujourd\'hui ?',
  },
  { key: 'dataUsage', label: 'Utilisez-vous déjà l\'IA avec des documents de votre entreprise ?' },
  { key: 'companySize', label: 'Combien de personnes travaillent dans votre entreprise ?' },
  { key: 'constructys', label: 'Votre entreprise relève-t-elle de Constructys ?' },
] as const;

type StepKey = (typeof STEP_QUESTIONS)[number]['key'];

function isStepValid(step: number, answers: DiagnosticAnswers): boolean {
  switch (step) {
    case 0:
      return Boolean(answers.role);
    case 1:
      return Boolean(answers.tasks?.length);
    case 2:
      return Boolean(answers.timeWeekly);
    case 3:
      return Boolean(answers.frequency);
    case 4:
      return answers.maturity !== undefined;
    case 5:
      return Boolean(answers.organisation);
    case 6:
      return Boolean(answers.dataUsage);
    case 7:
      return Boolean(answers.companySize);
    case 8:
      return Boolean(answers.constructys);
    default:
      return true;
  }
}

export function DiagnosticIABTPWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({ tasks: [] });
  const [phase, setPhase] = useState<'questions' | 'results' | 'submitted'>('questions');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startedTracked, setStartedTracked] = useState(false);

  const result = useMemo(() => computeDiagnosticResult(answers), [answers]);

  useEffect(() => {
    if (!startedTracked) {
      trackDiagnosticStarted();
      setStartedTracked(true);
    }
  }, [startedTracked]);

  const progressPct = phase === 'questions' ? ((step + 1) / DIAGNOSTIC_TOTAL_STEPS) * 100 : 100;
  const canContinue = isStepValid(step, answers);

  const goNext = () => {
    if (!canContinue) return;
    if (step === 0 && answers.role) trackDiagnosticRoleSelected(answers.role);
    if (step === 1 && answers.tasks?.length) trackDiagnosticTaskSelected(answers.tasks.length);

    if (step >= DIAGNOSTIC_TOTAL_STEPS - 1) {
      if (result) {
        trackDiagnosticCompleted(result.training.code);
        setPhase('results');
      }
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => {
    if (phase === 'results') {
      setPhase('questions');
      setStep(DIAGNOSTIC_TOTAL_STEPS - 1);
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  };

  const toggleTask = (taskId: DiagnosticTaskId) => {
    setAnswers((prev) => {
      const current = prev.tasks ?? [];
      if (current.includes(taskId)) {
        return { ...prev, tasks: current.filter((t) => t !== taskId) };
      }
      if (current.length >= MAX_TASK_SELECTIONS) return prev;
      return { ...prev, tasks: [...current, taskId] };
    });
  };

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const rgpd = (e.currentTarget.elements.namedItem('rgpd') as HTMLInputElement | null)?.checked;
    if (!rgpd) {
      setError('Veuillez accepter la politique de confidentialité pour continuer.');
      return;
    }
    if (!result) return;

    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const submitResult = await submitDiagnosticAction({
      prenom: (fd.get('prenom') as string)?.trim() || '',
      entreprise: (fd.get('entreprise') as string)?.trim() || undefined,
      email: (fd.get('email') as string)?.trim() || '',
      telephone: (fd.get('telephone') as string)?.trim() || undefined,
      answers,
      result,
    });
    setSubmitting(false);

    if (submitResult.ok) {
      setPhase('submitted');
    } else {
      setError(submitResult.error ?? 'Une erreur est survenue.');
    }
  };

  const inputClass =
    'w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:border-[#377CF3] focus:outline-none focus:ring-1 focus:ring-[#377CF3]';
  const labelClass = 'block text-sm font-medium text-slate-700';
  const optionBtnClass = (selected: boolean) =>
    [
      'flex w-full items-center justify-between rounded-xl border-2 px-4 py-3.5 text-left text-sm font-medium transition-colors sm:px-5 sm:py-4 sm:text-base',
      selected
        ? 'border-[#377CF3] bg-[#EFF6FF] text-slate-900'
        : 'border-slate-200 text-slate-800 hover:border-[#377CF3]/60 hover:bg-[#EFF6FF]/50',
    ].join(' ');

  const renderStepContent = (key: StepKey) => {
    switch (key) {
      case 'role':
        return DIAGNOSTIC_ROLES.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setAnswers((p) => ({ ...p, role: opt.id }))}
            className={optionBtnClass(answers.role === opt.id)}
          >
            <span>{opt.label}</span>
            {answers.role === opt.id ? <ClipboardCheck size={18} className="text-[#377CF3]" /> : null}
          </button>
        ));

      case 'tasks': {
        const categories = sortCategoriesForRole(answers.role);
        const selectedCount = answers.tasks?.length ?? 0;
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Sélectionnez jusqu&apos;à {MAX_TASK_SELECTIONS} tâches ({selectedCount}/{MAX_TASK_SELECTIONS}).
            </p>
            {categories.map((category) => (
              <div key={category.id} className="rounded-xl border border-slate-200 overflow-hidden">
                <p className="bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800">{category.label}</p>
                <div className="divide-y divide-slate-100">
                  {sortTasksInCategory(category, answers.role).map((task) => {
                    const selected = answers.tasks?.includes(task.id) ?? false;
                    const disabled = !selected && selectedCount >= MAX_TASK_SELECTIONS;
                    return (
                      <button
                        key={task.id}
                        type="button"
                        disabled={disabled}
                        onClick={() => toggleTask(task.id)}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition ${
                          selected ? 'bg-[#EFF6FF]' : 'bg-white hover:bg-slate-50'
                        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                      >
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                            selected ? 'border-[#377CF3] bg-[#377CF3] text-white' : 'border-slate-300'
                          }`}
                          aria-hidden
                        >
                          {selected ? '✓' : ''}
                        </span>
                        <span>{task.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        );
      }

      case 'timeWeekly':
        return TIME_WEEKLY_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setAnswers((p) => ({ ...p, timeWeekly: opt.id }))}
            className={optionBtnClass(answers.timeWeekly === opt.id)}
          >
            {opt.label}
          </button>
        ));

      case 'frequency':
        return FREQUENCY_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setAnswers((p) => ({ ...p, frequency: opt.id }))}
            className={optionBtnClass(answers.frequency === opt.id)}
          >
            {opt.label}
          </button>
        ));

      case 'maturity':
        return MATURITY_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setAnswers((p) => ({ ...p, maturity: opt.id }))}
            className={optionBtnClass(answers.maturity === opt.id)}
          >
            <span>
              <span className="font-semibold text-[#377CF3]">{opt.id}</span> — {opt.label}
            </span>
          </button>
        ));

      case 'organisation':
        return ORGANISATION_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setAnswers((p) => ({ ...p, organisation: opt.id }))}
            className={optionBtnClass(answers.organisation === opt.id)}
          >
            {opt.label}
          </button>
        ));

      case 'dataUsage':
        return DATA_USAGE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setAnswers((p) => ({ ...p, dataUsage: opt.id }))}
            className={optionBtnClass(answers.dataUsage === opt.id)}
          >
            {opt.label}
          </button>
        ));

      case 'companySize':
        return COMPANY_SIZE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setAnswers((p) => ({ ...p, companySize: opt.id }))}
            className={optionBtnClass(answers.companySize === opt.id)}
          >
            {opt.label}
          </button>
        ));

      case 'constructys':
        return CONSTRUCTYS_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setAnswers((p) => ({ ...p, constructys: opt.id }))}
            className={optionBtnClass(answers.constructys === opt.id)}
          >
            {opt.label}
          </button>
        ));

      default:
        return null;
    }
  };

  const leadForm = (
    <form onSubmit={handleLeadSubmit} className="space-y-4">
      <div>
        <h3 className="font-display text-lg font-bold text-slate-900">Recevoir mon diagnostic complet</h3>
        <p className="mt-1 text-sm text-slate-600">
          Optionnel — recevez une copie par email et permettez à Laure Olivié de vous recontacter pour
          approfondir vos usages IA.
        </p>
        {phase === 'submitted' ? (
          <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800" role="status">
            Merci — votre diagnostic est enregistré. Vous pouvez conserver cette synthèse à l&apos;écran.
          </p>
        ) : null}
      </div>
      {error ? (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
          {error}
        </div>
      ) : null}
      <div>
        <label htmlFor="diag-prenom" className={labelClass}>
          Prénom *
        </label>
        <input id="diag-prenom" name="prenom" type="text" required autoComplete="given-name" className={inputClass} />
      </div>
      <div>
        <label htmlFor="diag-entreprise" className={labelClass}>
          Entreprise *
        </label>
        <input
          id="diag-entreprise"
          name="entreprise"
          type="text"
          required
          autoComplete="organization"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="diag-email" className={labelClass}>
          Email professionnel *
        </label>
        <input id="diag-email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </div>
      <div>
        <label htmlFor="diag-telephone" className={labelClass}>
          Téléphone <span className="font-normal text-slate-500">(facultatif)</span>
        </label>
        <input id="diag-telephone" name="telephone" type="tel" autoComplete="tel" className={inputClass} />
      </div>
      <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <input
          id="diag-rgpd"
          name="rgpd"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#377CF3] focus:ring-[#377CF3]"
        />
        <label htmlFor="diag-rgpd" className="text-sm leading-relaxed text-slate-600">
          J&apos;accepte que mes données soient traitées pour recevoir mon diagnostic et être recontacté(e).{' '}
          <Link href={LINKS.politiqueConfidentialite} className="font-medium text-[#377CF3] underline underline-offset-2">
            Politique de confidentialité
          </Link>
          . *
        </label>
      </div>
      {phase !== 'submitted' ? (
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2d66d6] disabled:opacity-70 sm:w-auto"
        >
          {submitting ? 'Envoi…' : (
            <>
              <Send size={18} aria-hidden />
              Recevoir mon diagnostic complet
            </>
          )}
        </button>
      ) : null}
    </form>
  );

  return (
    <div className="py-8 md:py-12">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
          Diagnostic IA BTP gratuit
        </p>
        <h1 className="mt-3 font-display text-2xl font-bold text-slate-900 md:text-3xl lg:text-[2rem]">
          {phase === 'questions' ? (
            <>Où l&apos;IA peut-elle réellement vous faire gagner du temps ?</>
          ) : (
            <>Diagnostic IA BTP</>
          )}
        </h1>
        {phase === 'questions' ? (
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
            Identifiez en 2 minutes les tâches à fort potentiel dans votre entreprise : devis, DCE, chantier,
            administratif, appels d&apos;offres et pilotage.
          </p>
        ) : null}
        {phase === 'questions' ? (
          <ul className="mx-auto mt-4 flex max-w-lg flex-col gap-1 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4">
            <li>Votre score de maturité IA</li>
            <li>Vos 3 priorités</li>
            <li>Votre potentiel de gain de temps</li>
          </ul>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-600 sm:text-sm">
        <span>
          <strong className="text-slate-900">{formatNoteSatisfactionAffichageComplet()}</strong>
        </span>
        <span className="text-slate-300">·</span>
        <span>
          Certifié <strong className="text-slate-900">Qualiopi</strong>
        </span>
        <span className="text-slate-300">·</span>
        <span>100 % gratuit · sans engagement</span>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm">
        {phase === 'questions' ? (
          <>
            <div className="border-b border-slate-100 px-4 py-3 md:px-6">
              <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>
                  Question {step + 1} sur {DIAGNOSTIC_TOTAL_STEPS}
                </span>
                <span>{Math.round(progressPct)} %</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#377CF3] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
            <div className="p-4 md:p-8">
              <h2 className="font-display text-lg font-bold text-slate-900 md:text-xl">
                {STEP_QUESTIONS[step]?.label}
              </h2>
              <div className="mt-5 space-y-3">{renderStepContent(STEP_QUESTIONS[step]?.key)}</div>
              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 0}
                  className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  <ChevronLeft size={18} aria-hidden />
                  Précédent
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canContinue}
                  className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d66d6] disabled:cursor-not-allowed disabled:opacity-50 sm:ml-auto"
                >
                  {step >= DIAGNOSTIC_TOTAL_STEPS - 1 ? 'Voir mon diagnostic' : 'Continuer'}
                  <ChevronRight size={18} aria-hidden />
                </button>
              </div>
            </div>
          </>
        ) : result ? (
          <div className="p-4 md:p-8">
            <DiagnosticResult
              result={result}
              showLeadForm
              leadForm={leadForm}
            />
            <div className="mt-6 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#377CF3]"
              >
                <ChevronLeft size={16} aria-hidden />
                Modifier mes réponses
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
