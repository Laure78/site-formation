import Link from 'next/link';
import Image from 'next/image';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { Section } from '@/components/ui/Section';
import { ACCUEIL_LOGOS_PARTENAIRES, getAccueilHeroProofItems } from '@/lib/accueil-config';
import { getFilledGoogleReviews } from '@/data/googleReviews';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { LINKS } from '@/lib/internal-links';
import { PARTNER_LOGO_BAND_CELL } from '@/lib/client-logos';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { StarRating } from '@/components/avis-clients/StarRating';

/** Preuves remontées — logos, avis (si disponibles), Qualiopi en une ligne. */
export function AccueilPreuvesConfianceSection() {
  const proofItems = getAccueilHeroProofItems();
  const avis = getFilledGoogleReviews().slice(0, 3);

  return (
    <Section tone="canvas" size="compact" aria-labelledby="accueil-preuves-title">
      <h2 id="accueil-preuves-title" className="sr-only">
        Preuves de confiance
      </h2>

      <p className="text-center text-sm font-semibold text-ofc-ink">Ils me font confiance</p>
      <div className="accueil-logos-marquee mt-4 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
        <ul
          className="flex w-max min-w-full items-center gap-8 sm:w-auto sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-4"
          aria-label="Logos clients et partenaires"
        >
          {ACCUEIL_LOGOS_PARTENAIRES.map((logo) => (
            <li key={logo.id} className="shrink-0">
              <ExternalLinkAnchor
                href={logo.href}
                title={logo.linkTitle ?? `Site officiel ${logo.name}`}
                className="group block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
              >
                <div
                  className={`${PARTNER_LOGO_BAND_CELL.className} grayscale opacity-75 transition group-hover:grayscale-0 group-hover:opacity-100`}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    loading="lazy"
                    sizes={PARTNER_LOGO_BAND_CELL.sizes}
                    className="object-contain object-center"
                    quality={70}
                  />
                </div>
              </ExternalLinkAnchor>
            </li>
          ))}
        </ul>
      </div>

      {avis.length > 0 ? (
        <ul className="mt-8 grid list-none gap-4 sm:grid-cols-3">
          {avis.map((review) => (
            <li key={review.id}>
              <figure className="h-full rounded-ofc-card border border-ofc-border bg-white p-4">
                <StarRating rating={review.rating} className="text-[#377CF3]" />
                <blockquote className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">
                  « {review.text} »
                </blockquote>
                <figcaption className="mt-3 text-xs font-semibold text-ofc-ink">
                  {review.author}
                  {review.optionalCompany ? ` — ${review.optionalCompany}` : ''}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : (
        /* TODO(avis accueil) — renseigner 2–3 citations dans data/googleReviews.ts (avis réels uniquement). */
        null
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-ofc-ink-muted">
        {proofItems.map((item) => (
          <span key={item.label}>
            <span className="font-display font-bold text-ofc-ink">{item.value}</span> {item.label}
          </span>
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-ofc-ink-muted">
        {QUALIOPI_LEGAL.raisonSociale} — organisme certifié Qualiopi ·{' '}
        <Link href={QUALIOPI_LEGAL.certificatPdfHref} className={`${OFC_LINK} font-semibold`}>
          Voir le certificat
        </Link>
        {' · '}
        <Link href={LINKS.avisClients} className={`${OFC_LINK} font-semibold`}>
          Lire les avis clients
        </Link>
      </p>
    </Section>
  );
}
