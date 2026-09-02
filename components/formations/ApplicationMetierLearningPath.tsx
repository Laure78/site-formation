import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import {
  APPLICATION_METIER_PARCOURS_STEPS,
  type ApplicationMetierStepIndex,
} from '@/lib/application-metier-btp-parcours-nav';

type Props = {
  /** Niveau courant — surligné si fourni. */
  currentStep?: ApplicationMetierStepIndex;
  className?: string;
};

/**
 * Parcours visuel 3 étapes — horizontal (desktop) / vertical (mobile).
 * Chaque étape est cliquable vers la fiche formation correspondante.
 */
export function ApplicationMetierLearningPath({ currentStep, className = '' }: Props) {
  return (
    <nav
      aria-label="Parcours applications métier BTP — trois niveaux"
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6 ${className}`}
    >
      <p className="text-center text-xs font-bold uppercase tracking-[0.14em] text-[#64748B] md:text-left">
        Parcours complet — 21 h
      </p>
      <ol className="mt-4 flex flex-col gap-0 md:flex-row md:items-stretch md:gap-0">
        {APPLICATION_METIER_PARCOURS_STEPS.map((step, index) => {
          const isCurrent = currentStep === step.step;
          const isPast = currentStep != null && step.step < currentStep;
          const stepContent = (
            <>
              <span
                className={`text-[10px] font-bold uppercase tracking-[0.12em] ${
                  isCurrent ? 'text-[var(--accent)]' : 'text-[#64748B]'
                }`}
              >
                {step.step} — {step.shortLabel}
              </span>
              <span
                className={`mt-1 text-sm font-semibold leading-snug text-slate-900 ${
                  isCurrent ? '' : 'group-hover:text-[var(--accent)]'
                }`}
              >
                {step.learningPathSubtitle}
              </span>
            </>
          );
          return (
            <li key={step.ref} className="flex flex-1 flex-col md:flex-row md:items-stretch">
              <div className="flex flex-1 flex-col">
                {isCurrent ? (
                  <div
                    aria-current="step"
                    className="flex min-h-[4.5rem] flex-1 flex-col justify-center rounded-xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-3 shadow-sm"
                  >
                    {stepContent}
                  </div>
                ) : (
                  <Link
                    href={step.path}
                    className={`group flex min-h-[4.5rem] flex-1 flex-col justify-center rounded-xl border-2 px-4 py-3 transition-colors ${
                      isPast
                        ? 'border-slate-200 bg-slate-50 hover:border-[var(--accent)]/40 hover:bg-[var(--accent-soft)]/50'
                        : 'border-slate-200 bg-white hover:border-[var(--accent)]/40 hover:bg-[var(--accent-soft)]/30'
                    }`}
                  >
                    {stepContent}
                  </Link>
                )}
              </div>
              {index < APPLICATION_METIER_PARCOURS_STEPS.length - 1 ? (
                <>
                  <div
                    className="flex shrink-0 items-center justify-center py-2 text-[var(--accent)] md:hidden"
                    aria-hidden
                  >
                    <ChevronDown size={20} strokeWidth={2.5} />
                  </div>
                  <div
                    className="hidden w-8 shrink-0 items-center justify-center text-[var(--accent)] md:flex"
                    aria-hidden
                  >
                    <span className="text-lg font-bold">→</span>
                  </div>
                </>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
