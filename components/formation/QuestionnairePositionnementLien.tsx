import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  QUESTIONNAIRE_POSITIONNEMENT_LABEL,
  QUESTIONNAIRE_POSITIONNEMENT_URL,
} from '@/lib/questionnaire-positionnement';

type Props = {
  className?: string;
};

/**
 * Lien vers le questionnaire Tally de positionnement pré-session.
 * Affiché sur toutes les fiches formation (bloc InfosPratiques / Qualiopi).
 */
export function QuestionnairePositionnementLien({ className = '' }: Props) {
  return (
    <p className={`mt-3 ${className}`.trim()}>
      <ExternalLinkAnchor
        href={QUESTIONNAIRE_POSITIONNEMENT_URL}
        title="Ouvre le questionnaire Tally dans un nouvel onglet"
        className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
      >
        {QUESTIONNAIRE_POSITIONNEMENT_LABEL}
      </ExternalLinkAnchor>
      <span className="text-slate-600">
        {' '}
        (environ 2 minutes — pour adapter la session à votre niveau et vos besoins)
      </span>
    </p>
  );
}
