'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import {
  CONTACT_PAGE_H1,
  CONTACT_PAGE_PROOF_LINE,
  CONTACT_PAGE_SUBTITLE,
} from '@/lib/contact-page-config';
import { trackContactCtaClick } from '@/lib/ga4-analytics';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_HERO,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

type Props = {
  /** Hero plus court pour laisser le formulaire visible dès le fold. */
  compact?: boolean;
};

export function ContactPageHero({ compact = false }: Props) {
  return (
    <section
      className={`${OFC_SEC.hero} ${compact ? '!py-8 md:!py-10' : ''}`}
      aria-labelledby="contact-hero-title"
    >
      <div className="mx-auto max-w-[80rem]">
        <Badge>Contact</Badge>
        <h1
          id="contact-hero-title"
          className={`${OFC_TYPE_HERO} mt-4 ${compact ? '!text-[clamp(1.85rem,4vw,3rem)]' : 'max-w-[16ch]'}`}
        >
          {CONTACT_PAGE_H1}
        </h1>
        <p className={`${OFC_TYPE_LEAD} mt-4 max-w-xl text-ofc-ink-muted ${compact ? '!text-base' : ''}`}>
          {CONTACT_PAGE_SUBTITLE}
        </p>
        <p className="mt-2 text-sm font-medium text-ofc-ink-subtle">{CONTACT_PAGE_PROOF_LINE}</p>
        {!compact ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="?objet=devis#contact-form"
              onClick={() => trackContactCtaClick('devis')}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
            >
              Demander un devis
            </Link>
            <Link
              href="#contact-rdv"
              onClick={() => trackContactCtaClick('rdv')}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
            >
              <Calendar className="h-5 w-5 shrink-0" aria-hidden />
              Réserver un échange de 30 minutes
            </Link>
          </div>
        ) : (
          <p className="mt-5">
            <Link
              href="#contact-rdv"
              onClick={() => trackContactCtaClick('rdv')}
              className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-ofc-accent hover:underline"
            >
              <Calendar className="h-4 w-4 shrink-0" aria-hidden />
              Préférez un échange de 30 minutes ?
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
