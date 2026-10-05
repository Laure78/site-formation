import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { LINKS } from '@/lib/internal-links';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';
import {
  OFC_CTA_GHOST_ON_ACCENT,
  OFC_CTA_ON_ACCENT,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

type AvisClientsFinalCtaProps = {
  googleUrl?: string;
};

export function AvisClientsFinalCta({
  googleUrl = SCHEMA_GOOGLE_REVIEWS_VIEW_URL,
}: AvisClientsFinalCtaProps) {
  return (
    <section className={OFC_SEC.accentLoose}>
      <div className={`${OFC_SECTION_INNER} flex max-w-3xl flex-col items-center text-center`}>
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Vous souhaitez former vos équipes à l&apos;IA&nbsp;?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-blue-100 md:text-lg">
            Échangeons sur vos métiers, vos processus et les tâches que vos équipes souhaitent
            simplifier grâce à l&apos;intelligence artificielle — sessions en présentiel en région
            parisienne (Île-de-France).
          </p>
        </Reveal>

        <Reveal className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <Link href={LINKS.formations} className={`${OFC_CTA_ON_ACCENT} w-full sm:w-auto`}>
            Découvrir les formations IA BTP
          </Link>
          <Link href={LINKS.contact} className={`${OFC_CTA_GHOST_ON_ACCENT} w-full sm:w-auto`}>
            Parler de mon besoin
          </Link>
        </Reveal>

        <Reveal className="mt-8">
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consulter les avis Google (ouvre un nouvel onglet)"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-100 transition-colors hover:text-white"
          >
            <span>Consulter nos avis Google</span>
            <ExternalLink size={14} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
