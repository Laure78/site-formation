import Link from 'next/link';
import type { ReactNode } from 'react';
import { FORMATEUR_PROFILE_ACCENT_CTA } from '@/components/formateurs/profile/formateur-profile-section-styles';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

type Props = {
  headingId: string;
  title: string;
  body: string;
  visioCta: ReactNode;
  secondaryHref: string;
  secondaryLabel: string;
};

export function FormateurProfileClosingCtaSection({
  headingId,
  title,
  body,
  visioCta,
  secondaryHref,
  secondaryLabel,
}: Props) {
  return (
    <section className={FORMATEUR_PROFILE_ACCENT_CTA} aria-labelledby={headingId}>
      <div className={`${OFC_SECTION_INNER} max-w-3xl text-center text-white`}>
        <h2 id={headingId} className="font-display text-2xl font-bold text-pretty">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/95">{body}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          {visioCta}
          <Link
            href={secondaryHref}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-white px-6 py-2.5 text-base font-semibold text-white hover:bg-white/10"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}