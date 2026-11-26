import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { EnBref } from '@/app/components/EnBref';
import { FormateurProfileBreadcrumb } from '@/components/formateurs/profile/FormateurProfileBreadcrumb';
import { ContentUpdatedLine } from '@/components/seo/ContentUpdatedLine';
import { FORMATEUR_PROFILE_CONTENT_UPDATED_AT } from '@/lib/content-updated-at';
import type { FormateurProfile } from '@/lib/formateurs';
import {
  FORMATEUR_SHOWCASE_PORTRAIT_FRAME,
  FORMATEUR_SHOWCASE_PORTRAIT_IMAGE,
} from '@/lib/formateurs/formateur-showcase-portrait';
import { OFC_CTA_PRIMARY, OFC_TYPE_BODY } from '@/lib/ofc-interaction-classes';
import { OFC_SECTION_INNER, ofcSectionClasses } from '@/lib/ofc-section-classes';

type Props = {
  formateur: FormateurProfile;
  h1Id: string;
  enBrefId: string;
  enBrefText: string;
  badge: string;
  h1: string;
  tagline: string;
  introParagraphs: readonly string[];
  primaryCta: { href: string; label: string };
  visioCta: ReactNode;
};

export function FormateurProfileHeroSection({
  formateur,
  h1Id,
  enBrefId,
  enBrefText,
  badge,
  h1,
  tagline,
  introParagraphs,
  primaryCta,
  visioCta,
}: Props) {
  const portrait = formateur.portrait;
  const portraitAlt =
    portrait.kind === 'photo'
      ? portrait.alt
      : `Portrait de ${formateur.prenom} ${formateur.nom}`;
  const fullName = `${formateur.prenom} ${formateur.nom}`;

  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact', mesh: false })}
      aria-labelledby={h1Id}
    >
      <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
        <FormateurProfileBreadcrumb currentName={fullName} />
        <ContentUpdatedLine className="mt-4" date={FORMATEUR_PROFILE_CONTENT_UPDATED_AT} />
        <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start lg:gap-10">
          <div className={FORMATEUR_SHOWCASE_PORTRAIT_FRAME}>
            {portrait.kind === 'photo' ? (
              <Image
                src={portrait.src}
                alt={portraitAlt}
                width={portrait.width}
                height={portrait.height}
                className={FORMATEUR_SHOWCASE_PORTRAIT_IMAGE}
                style={
                  portrait.objectPosition
                    ? { objectPosition: portrait.objectPosition }
                    : undefined
                }
                sizes="(max-width: 1024px) 60vw, 280px"
                priority
              />
            ) : null}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#377CF3]">{badge}</p>
            <h1
              id={h1Id}
              className="mt-2 font-display text-2xl font-bold text-[#101936] text-pretty sm:text-3xl"
            >
              {h1}
            </h1>
            <EnBref id={enBrefId} text={enBrefText} className="mt-4" />
            <p className="mt-4 text-lg font-semibold text-[#101936]">{tagline}</p>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
                {paragraph}
              </p>
            ))}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={primaryCta.href}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-base font-semibold`}
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              {visioCta}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}