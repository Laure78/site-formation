import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import {
  LINKEDIN_FOLLOWERS_PROOF_TEXT,
  LINKEDIN_PROFILE_ARIA,
  LINKEDIN_PROFILE_URL,
} from '@/lib/linkedin-profile';

type Props = {
  className?: string;
  /** Variante visuelle discrète (hero) ou un peu plus marquée. */
  variant?: 'hero' | 'muted';
};

const VARIANT_CLASS = {
  hero: 'text-slate-600 hover:text-[#377CF3]',
  muted: 'text-slate-500 hover:text-[#377CF3]',
} as const;

/**
 * Lien compact preuve sociale LinkedIn — sous les CTA formation (pas de widget tiers).
 */
export function LinkedInFollowersLink({ className = '', variant = 'hero' }: Props) {
  return (
    <ExternalLinkAnchor
      href={LINKEDIN_PROFILE_URL}
      aria-label={LINKEDIN_PROFILE_ARIA.proof}
      title={LINKEDIN_PROFILE_ARIA.proof}
      className={`inline-flex max-w-full items-center gap-2 rounded-lg text-sm font-medium underline-offset-2 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${VARIANT_CLASS[variant]}${className ? ` ${className}` : ''}`}
    >
      <LinkedInIcon className="h-4 w-4 shrink-0 text-[#377CF3]" />
      <span className="min-w-0">{LINKEDIN_FOLLOWERS_PROOF_TEXT}</span>
    </ExternalLinkAnchor>
  );
}
