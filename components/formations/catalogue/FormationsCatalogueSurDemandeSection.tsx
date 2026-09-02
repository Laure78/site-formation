import Link from 'next/link';
import { getCatalogueSurDemandeOffers } from '@/lib/formations-catalogue-page-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CARD } from '@/lib/ofc-interaction-classes';

/**
 * Offres sans fiche catalogue Qualiopi — hors compteur catalogue.
 * Pas de faux CTA « Voir la formation ».
 */
export function FormationsCatalogueSurDemandeSection() {
  const offers = getCatalogueSurDemandeOffers();
  if (offers.length === 0) return null;

  return (
    <section className="mt-16 scroll-mt-24" aria-labelledby="catalogue-besoin-specifique">
      <h2 id="catalogue-besoin-specifique" className="font-display text-2xl font-bold text-ofc-ink md:text-3xl">
        Besoin spécifique ?
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
        Votre besoin ne correspond pas exactement au catalogue ? Décrivez les profils, les documents et
        les usages concernés.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {offers.map((offer) => (
          <li key={offer.id} className={`${OFC_CARD} p-4`}>
            <p className="font-display text-sm font-bold text-ofc-ink">{offer.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{offer.shortPromise}</p>
            <p className="mt-2 text-xs text-slate-500">
              {offer.durationLabel} · {offer.audience}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link
          href={LINKS.prendreRdv}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
        >
          Parler de mon besoin
        </Link>
      </div>
    </section>
  );
}
