import { Star } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  QUESTIONNAIRE_SATISFACTION_LABEL,
  QUESTIONNAIRE_SATISFACTION_URL,
} from '@/lib/questionnaire-satisfaction';

type Props = {
  /** Variante compacte (ex. en-tête d’un cours). */
  compact?: boolean;
  className?: string;
};

/**
 * CTA questionnaire d’évaluation / satisfaction à chaud — plateforme LMS (toutes les formations).
 * URL unique : https://tally.so/r/3NNq7l
 */
export function QuestionnaireSatisfactionBanner({ compact = false, className = '' }: Props) {
  if (compact) {
    return (
      <div
        className={`rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 ${className}`.trim()}
      >
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Fin de formation :</span>{' '}
          <ExternalLinkAnchor
            href={QUESTIONNAIRE_SATISFACTION_URL}
            title="Ouvre le questionnaire d’évaluation Tally dans un nouvel onglet"
            className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
          >
            {QUESTIONNAIRE_SATISFACTION_LABEL}
          </ExternalLinkAnchor>
          <span className="text-slate-600"> (évaluation à chaud Qualiopi)</span>
        </p>
      </div>
    );
  }

  return (
    <aside
      className={`rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 shadow-sm ${className}`.trim()}
      aria-labelledby="questionnaire-satisfaction-lms-title"
    >
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
          <Star size={22} strokeWidth={1.75} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h2
            id="questionnaire-satisfaction-lms-title"
            className="font-display text-base font-bold text-slate-900"
          >
            Questionnaire d&apos;évaluation
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            À remplir en fin de session pour évaluer la formation, les objectifs pédagogiques et
            l&apos;accompagnement — exigence Qualiopi.
          </p>
          <ExternalLinkAnchor
            href={QUESTIONNAIRE_SATISFACTION_URL}
            title="Ouvre le questionnaire d’évaluation Tally dans un nouvel onglet"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2A6BD9]"
          >
            Remplir le questionnaire d&apos;évaluation
          </ExternalLinkAnchor>
        </div>
      </div>
    </aside>
  );
}
