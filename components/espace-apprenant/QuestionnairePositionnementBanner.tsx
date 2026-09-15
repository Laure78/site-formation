import { ClipboardList } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  QUESTIONNAIRE_POSITIONNEMENT_LABEL,
  QUESTIONNAIRE_POSITIONNEMENT_URL,
} from '@/lib/questionnaire-positionnement';

type Props = {
  /** Variante compacte (ex. en-tête d’un cours). */
  compact?: boolean;
  className?: string;
};

/**
 * CTA questionnaire de positionnement — plateforme LMS (toutes les formations).
 * URL unique : https://tally.so/r/mVK6Ay
 */
export function QuestionnairePositionnementBanner({ compact = false, className = '' }: Props) {
  if (compact) {
    return (
      <div
        className={`rounded-xl border border-[#D4E3FC] bg-[#F0F7FF] px-4 py-3 ${className}`.trim()}
      >
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Avant de démarrer :</span>{' '}
          <ExternalLinkAnchor
            href={QUESTIONNAIRE_POSITIONNEMENT_URL}
            title="Ouvre le questionnaire Tally dans un nouvel onglet"
            className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
          >
            {QUESTIONNAIRE_POSITIONNEMENT_LABEL}
          </ExternalLinkAnchor>
          <span className="text-slate-600"> (≈ 2 min)</span>
        </p>
      </div>
    );
  }

  return (
    <aside
      className={`rounded-2xl border border-[#D4E3FC] bg-[#F0F7FF] p-5 shadow-sm ${className}`.trim()}
      aria-labelledby="questionnaire-positionnement-lms-title"
    >
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#377CF3] shadow-sm">
          <ClipboardList size={22} strokeWidth={1.75} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h2
            id="questionnaire-positionnement-lms-title"
            className="font-display text-base font-bold text-slate-900"
          >
            Questionnaire de positionnement
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            À remplir avant votre session (ou dès votre inscription) pour adapter la formation à votre
            niveau et à vos besoins métier — moins de 2 minutes.
          </p>
          <ExternalLinkAnchor
            href={QUESTIONNAIRE_POSITIONNEMENT_URL}
            title="Ouvre le questionnaire Tally dans un nouvel onglet"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2A6BD9]"
          >
            Remplir le questionnaire
          </ExternalLinkAnchor>
        </div>
      </div>
    </aside>
  );
}
