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
            className="font-display text-2xl font-bold text-slate-900 md:text-2xl"
          >
            Laisser un avis Google
          </h2>
          <p className="mt-4 text-slate-600 md:text-lg">
            Vous avez suivi une session en entreprise&nbsp;? Votre retour sur Google aide d&apos;autres
            professionnels du BTP à choisir une formation IA concrète et applicable sur le terrain.
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
