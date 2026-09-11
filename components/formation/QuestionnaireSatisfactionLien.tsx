import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  QUESTIONNAIRE_SATISFACTION_LABEL,
  QUESTIONNAIRE_SATISFACTION_URL,
} from '@/lib/questionnaire-satisfaction';

type Props = {
  className?: string;
};

/**
 * Lien vers le questionnaire Tally de satisfaction à chaud.
 * Affiché sur toutes les fiches formation (bloc InfosPratiques / Qualiopi).
 */
export function QuestionnaireSatisfactionLien({ className = '' }: Props) {
  return (
    <p className={`mt-3 ${className}`.trim()}>
      <ExternalLinkAnchor
        href={QUESTIONNAIRE_SATISFACTION_URL}
        title="Ouvre le questionnaire de satisfaction Tally dans un nouvel onglet"
        className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
      >
        {QUESTIONNAIRE_SATISFACTION_LABEL}
      </ExternalLinkAnchor>
      <span className="text-slate-600">
        {' '}
        (à remplir en fin de session — évaluation à chaud Qualiopi)
      </span>
    </p>
  );
}
