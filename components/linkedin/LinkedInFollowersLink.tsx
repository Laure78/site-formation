import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import {
  LINKEDIN_FOLLOWERS_PROOF_TEXT,
  LINKEDIN_PROFILE_ARIA,
  LINKEDIN_PROFILE_URL,
} from '@/lib/linkedin-profile';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type Props = {
  className?: string;
  /** Variante visuelle : lien discret, muted, ou bouton secondaire (heroes). */
  variant?: 'hero' | 'muted' | 'button';
};

const VARIANT_CLASS = {
  hero: 'inline-flex max-w-full items-center gap-2 rounded-lg text-sm font-medium text-slate-600 underline-offset-2 transition-colors hover:text-[#377CF3] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]',
  muted:
    'inline-flex max-w-full items-center gap-2 rounded-lg text-sm font-medium text-slate-500 underline-offset-2 transition-colors hover:text-[#377CF3] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]',
  button: `${OFC_CTA_SECONDARY} inline-flex min-h-11 max-w-full items-center justify-center gap-2 px-5 py-2.5 text-sm`,
} as const;

/**
 * Lien / bouton preuve sociale LinkedIn — sous les CTA (pas de widget tiers).
 */
export function LinkedInFollowersLink({ className = '', variant = 'hero' }: Props) {
  return (
    <ExternalLinkAnchor
      href={LINKEDIN_PROFILE_URL}
      aria-label={LINKEDIN_PROFILE_ARIA.proof}
      title={LINKEDIN_PROFILE_ARIA.proof}
      className={`${VARIANT_CLASS[variant]}${className ? ` ${className}` : ''}`}
    >
      <LinkedInIcon className="h-4 w-4 shrink-0 text-[#377CF3]" />
      <span className="min-w-0">{LINKEDIN_FOLLOWERS_PROOF_TEXT}</span>
    </ExternalLinkAnchor>
  );
}
