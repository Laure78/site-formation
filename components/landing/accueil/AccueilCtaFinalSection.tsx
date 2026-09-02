import Link from 'next/link';
import { AccueilPrendreRdvLink } from '@/components/landing/accueil/AccueilPrendreRdvLink';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_H2,
  OFC_TYPE_BODY,
} from '@/lib/ofc-interaction-classes';
import { OFC_INNER_ACCENT_BAND } from '@/lib/ofc-section-classes';

/** CTA final — orientation formation + contact. */
export function AccueilCtaFinalSection() {
  return (
    <section className="px-4 py-12 md:py-16" aria-labelledby="accueil-cta-final">
      <div
        className={`${OFC_INNER_ACCENT_BAND} mx-auto max-w-4xl rounded-2xl px-6 py-10 text-center md:px-12 md:py-14`}
      >
        <h2 id="accueil-cta-final" className={`${OFC_TYPE_H2} text-white`}>
          Vous ne savez pas quelle formation choisir ?
        </h2>
        <p className={`${OFC_TYPE_BODY} mx-auto mt-4 text-white/90`}>
          Présentez votre activité et vos principales tâches chronophages. Nous identifierons les
          usages IA les plus pertinents et le parcours de formation adapté.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <AccueilPrendreRdvLink
            origin="accueil-cta-final"
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center border-0 bg-white px-6 py-3 text-ofc-accent hover:bg-white/95 sm:w-auto`}
          />
          <Link
            href={LINKS.contact}
            className={`${OFC_CTA_SECONDARY} min-h-11 w-full border-white bg-transparent px-6 py-3 text-white hover:bg-white/10 sm:w-auto`}
          >
            Demander un devis
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/80">
          <Link
            href={LINKS.formations}
            className="font-semibold text-white underline-offset-2 hover:underline"
          >
            Découvrir les formations
          </Link>
        </p>
      </div>
    </section>
  );
}
