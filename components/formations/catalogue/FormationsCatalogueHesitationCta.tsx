import Link from 'next/link';
import { AccueilPrendreRdvLink } from '@/components/landing/accueil/AccueilPrendreRdvLink';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY, OFC_TYPE_H2, OFC_TYPE_BODY } from '@/lib/ofc-interaction-classes';
import { OFC_INNER_ACCENT_BAND } from '@/lib/ofc-section-classes';

/** CTA orientation — hésitation entre formations. */
export function FormationsCatalogueHesitationCta() {
  return (
    <section className="mt-16 px-0" aria-labelledby="catalogue-hesitation-cta">
      <div className={`${OFC_INNER_ACCENT_BAND} rounded-2xl px-6 py-10 text-center md:px-12 md:py-14`}>
        <h2 id="catalogue-hesitation-cta" className={`${OFC_TYPE_H2} text-white`}>
          Vous hésitez entre plusieurs formations ?
        </h2>
        <p className={`${OFC_TYPE_BODY} mx-auto mt-4 max-w-2xl text-white`}>
          Présentez-moi votre activité, les profils à former et les tâches sur lesquelles vous
          souhaitez gagner du temps. Je vous orienterai vers le parcours le plus adapté.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <AccueilPrendreRdvLink
            origin="formations-hesitation-cta"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-ofc-accent hover:bg-white/95 sm:w-auto"
          >
            Réserver un échange
          </AccueilPrendreRdvLink>
          <Link
            href={LINKS.contact}
            className={`${OFC_CTA_SECONDARY} min-h-11 w-full border-white bg-transparent px-6 py-3 text-white hover:bg-white/10 sm:w-auto`}
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </section>
  );
}
