import Image from 'next/image';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import {
  LINKEDIN_PRESENCE_CARD,
  LINKEDIN_PROFILE_ARIA,
  LINKEDIN_PROFILE_URL,
} from '@/lib/linkedin-profile';
import { OFC_CTA_SECONDARY, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';
import { PHOTOS } from '@/lib/photos';

type Props = {
  className?: string;
  /**
   * `card` — bloc élégant (accueil / formatrice).
   * `inline` — bandeau compact (À propos, près de la présentation).
   */
  variant?: 'card' | 'inline';
  /** Afficher le portrait (défaut : oui sur card, non sur inline). */
  showPhoto?: boolean;
};

const portrait = PHOTOS.siteAvatar;

/**
 * Mise en avant du profil LinkedIn — pas de widget / iframe / script externe.
 */
export function LinkedInPresenceCard({
  className = '',
  variant = 'card',
  showPhoto,
}: Props) {
  const withPhoto = showPhoto ?? variant === 'card';
  const { title, followersHighlight, followersSuffix, body, cta } = LINKEDIN_PRESENCE_CARD;

  if (variant === 'inline') {
    return (
      <aside
        className={`flex flex-col gap-4 rounded-2xl border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] to-white p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${className}`}
        aria-labelledby="linkedin-presence-inline-title"
      >
        <div className="min-w-0 flex-1">
          <p
            id="linkedin-presence-inline-title"
            className="flex flex-wrap items-center gap-2 font-display text-base font-semibold text-[#0F172A]"
          >
            <LinkedInIcon className="h-5 w-5 shrink-0 text-[#377CF3]" />
            {title}
          </p>
          <p className="mt-1 text-sm text-[#475569]">
            <span className="font-semibold tabular-nums text-[#377CF3]">
              {followersHighlight}
            </span>{' '}
            {followersSuffix} — conseils et ressources IA pour le BTP.
          </p>
        </div>
        <ExternalLinkAnchor
          href={LINKEDIN_PROFILE_URL}
          aria-label={LINKEDIN_PROFILE_ARIA.publications}
          title={LINKEDIN_PROFILE_ARIA.publications}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 shrink-0 items-center justify-center gap-2 px-5 py-2.5 text-sm`}
        >
          <LinkedInIcon className="h-4 w-4 shrink-0" />
          Voir mon profil LinkedIn
        </ExternalLinkAnchor>
      </aside>
    );
  }

  return (
    <aside
      className={`overflow-hidden rounded-2xl border border-slate-200/90 bg-[#F8FAFC] shadow-[0_12px_32px_-24px_rgba(15,23,42,0.18)] ${className}`}
      aria-labelledby="linkedin-presence-card-title"
    >
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6">
        {withPhoto ? (
          <div className="mx-auto shrink-0 sm:mx-0">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={88}
              height={88}
              className="h-20 w-20 rounded-2xl object-cover ring-2 ring-white shadow-md sm:h-[88px] sm:w-[88px]"
              sizes="88px"
              quality={70}
              loading="lazy"
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-2.5">
            <LinkedInIcon className="h-5 w-5 shrink-0 text-[#377CF3]" />
            <h3 id="linkedin-presence-card-title" className={`${OFC_TYPE_H3} text-lg`}>
              {title}
            </h3>
          </div>
          <p className="mt-3">
            <span className="font-display text-2xl font-bold tabular-nums tracking-tight text-[#377CF3] md:text-3xl">
              {followersHighlight}
            </span>
            <span className="ml-2 text-sm font-medium text-slate-600">{followersSuffix}</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{body}</p>
          <ExternalLinkAnchor
            href={LINKEDIN_PROFILE_URL}
            aria-label={LINKEDIN_PROFILE_ARIA.publications}
            title={LINKEDIN_PROFILE_ARIA.publications}
            className={`${OFC_CTA_SECONDARY} mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-2.5 text-sm sm:w-auto`}
          >
            <LinkedInIcon className="h-4 w-4 shrink-0" />
            {cta}
          </ExternalLinkAnchor>
        </div>
      </div>
    </aside>
  );
}
