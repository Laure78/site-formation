import Link from 'next/link';
import { PRENDRE_RDV_DUREE_MINUTES } from '@/lib/prendre-rendez-vous-page-config';
import { CONTACT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

/** CTA final — visio + téléphone + email cliquables. */
export function AccueilCtaFinalSection() {
  return (
    <section className="px-4 py-16 md:py-20 lg:py-24" aria-labelledby="accueil-cta-final">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-ofc-card bg-ofc-accent px-6 py-12 text-center text-white sm:px-10 md:px-14 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 85% 0%, rgba(255,255,255,0.22), transparent 55%)',
          }}
          aria-hidden
        />
        <div className="relative">
          <h2
            id="accueil-cta-final"
            className="font-display text-xl font-extrabold tracking-tight text-balance md:text-2xl lg:text-[1.75rem]"
          >
            Trouvons la formation adaptée à votre métier
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-[1.65] text-white/90 md:text-lg">
            Visio de {PRENDRE_RDV_DUREE_MINUTES} min pour cadrer métier, niveau et format — sans
            engagement. Les formations se déroulent en présentiel en Île-de-France.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link
              href={`${LINKS.prendreRdv}?src=accueil-cta-final`}
              data-cta="rdv"
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center border-0 bg-white px-6 py-3 text-ofc-accent shadow-none hover:bg-white/95 sm:w-auto`}
            >
              Échanger sur mon besoin
            </Link>
            <p className="flex flex-col gap-2 text-sm text-white/90 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4">
              <a
                href={`tel:${CONTACT.phone}`}
                className="font-semibold underline decoration-white/40 underline-offset-2 hover:decoration-white"
              >
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className={`${OFC_LINK} font-semibold !text-white underline decoration-white/40 underline-offset-2 hover:!text-white hover:decoration-white`}
              >
                {CONTACT.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
