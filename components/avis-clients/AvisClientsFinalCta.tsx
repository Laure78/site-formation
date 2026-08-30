import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { StarRating } from '@/components/avis-clients/StarRating';
import { LINKS } from '@/lib/internal-links';
import {
  SCHEMA_GOOGLE_REVIEWS_VIEW_URL,
} from '@/lib/schema-constants';
import {
  OFC_CTA_GHOST_ON_ACCENT,
  OFC_CTA_ON_ACCENT,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

export function AvisClientsFinalCta() {
  return (
    <section className={OFC_SEC.accentLoose}>
      <div className={`${OFC_SECTION_INNER} flex max-w-3xl flex-col items-center text-center`}>
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Vous souhaitez former vos équipes à l&apos;IA ?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-blue-100 md:text-lg">
            Échangeons sur vos métiers, vos processus et les tâches que vos équipes souhaitent simplifier
            grâce à l&apos;intelligence artificielle — sessions en présentiel en région parisienne
            (Île-de-France).
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
            href={SCHEMA_GOOGLE_REVIEWS_VIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-100 transition-colors hover:text-white"
          >
            <StarRating rating={5} size={14} className="text-amber-300" />
            <span>Consulter nos avis Google</span>
            <ExternalLink size={14} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
