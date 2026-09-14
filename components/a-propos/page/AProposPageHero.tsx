import Image from 'next/image';
import Link from 'next/link';
import { LinkedInPresenceCard } from '@/components/linkedin/LinkedInPresenceCard';
import { Badge } from '@/components/ui/Badge';
import {
  A_PROPOS_PAGE_H1,
  A_PROPOS_PAGE_PROOF_LINE,
  A_PROPOS_PAGE_SUBTITLE,
} from '@/lib/a-propos-page-config';
import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_HERO,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { CTA_RDV_LABEL } from '@/components/CtaRdv';

export function AProposPageHero() {
  const portrait = PHOTOS.aProposHero2026;

  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden`} aria-labelledby="a-propos-hero-title">
      <div className="relative mx-auto grid max-w-[80rem] items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(240px,340px)] lg:gap-16">
        <div className="min-w-0">
          <Badge>Formatrice IA BTP</Badge>
          <h1 id="a-propos-hero-title" className={`${OFC_TYPE_HERO} mt-5 max-w-[16ch]`}>
            {A_PROPOS_PAGE_H1}
          </h1>
          <p className={`${OFC_TYPE_LEAD} mt-5 max-w-xl text-ofc-ink-muted`}>{A_PROPOS_PAGE_SUBTITLE}</p>
          <p className="mt-3 text-sm font-medium text-ofc-ink-subtle">{A_PROPOS_PAGE_PROOF_LINE}</p>
          <div id="formations-cta" className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={LINKS.formations}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
            >
              Voir les formations
            </Link>
            <Link
              href={LINKS.prendreRdv}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
            >
              {CTA_RDV_LABEL}
            </Link>
          </div>
          <LinkedInPresenceCard variant="inline" className="mt-6" />
        </div>
        <figure className="mx-auto w-full max-w-[320px] lg:mx-0 lg:justify-self-end">
          <div className="ofc-card overflow-hidden p-1.5">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              className="h-auto w-full rounded-[1.05rem] object-cover"
              sizes="(max-width: 1024px) 280px, 320px"
              priority
              quality={80}
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
