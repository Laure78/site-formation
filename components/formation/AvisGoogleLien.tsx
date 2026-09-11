import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  SCHEMA_GOOGLE_REVIEW_SUBMIT_URL,
  SCHEMA_GOOGLE_REVIEWS_VIEW_URL,
} from '@/lib/schema-constants';

type Props = {
  className?: string;
};

/**
 * Liens avis Google — preuve sociale + dépôt d’avis.
 * Affiché sur toutes les fiches formation (bloc InfosPratiques / Qualiopi).
 */
export function AvisGoogleLien({ className = '' }: Props) {
  return (
    <p className={`mt-3 text-sm leading-relaxed text-slate-700 ${className}`.trim()}>
      <ExternalLinkAnchor
        href={SCHEMA_GOOGLE_REVIEWS_VIEW_URL}
        title="Ouvre les avis Google Maps dans un nouvel onglet"
        className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
      >
        Voir les avis Google
      </ExternalLinkAnchor>
      {' · '}
      <ExternalLinkAnchor
        href={SCHEMA_GOOGLE_REVIEW_SUBMIT_URL}
        title="Ouvre le formulaire d’avis Google dans un nouvel onglet"
        className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
      >
        Déposer un avis Google
      </ExternalLinkAnchor>
      <span className="text-slate-600"> — retours de professionnels du BTP formés</span>
    </p>
  );
}
