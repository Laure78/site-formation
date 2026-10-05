import { ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { SCHEMA_GOOGLE_REVIEW_SUBMIT_URL } from '@/lib/schema-constants';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

/** CTA post-avis — invitation à déposer un avis Google (lien officiel). */
export function AvisClientsLeaveReviewCta() {
  return (
    <section className={OFC_SEC.white} aria-labelledby="laisser-avis-google-title">
      <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
        <Reveal>
          <h2
            id="laisser-avis-google-title"
            className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Vous avez participé à l&apos;une de mes formations&nbsp;?
          </h2>
          <p className="mt-4 text-slate-600 md:text-lg">
            Votre retour m&apos;aide à faire connaître des formations IA directement applicables aux
            métiers du BTP et aux besoins des entreprises.
          </p>
          <a
            href={SCHEMA_GOOGLE_REVIEW_SUBMIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Laisser un avis Google (ouvre un nouvel onglet)"
            className={`${OFC_CTA_PRIMARY} mt-8 inline-flex w-full items-center justify-center gap-2 sm:w-auto`}
          >
            Laisser un avis Google
            <ExternalLink size={18} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
