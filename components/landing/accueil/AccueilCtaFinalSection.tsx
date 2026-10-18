import Link from 'next/link';
import { PRENDRE_RDV_DUREE_MINUTES } from '@/lib/prendre-rendez-vous-page-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

/** CTA final — échange de cadrage (visio) distinct des formations présentiel. */
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
            Un échange de {PRENDRE_RDV_DUREE_MINUTES} minutes en visioconférence pour préciser vos
            usages, votre niveau et le format adapté — sans engagement. Les sessions de formation
            restent en présentiel en Île-de-France.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={`${LINKS.prendreRdv}?src=accueil-cta-final`}
              data-cta="rdv"
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center border-0 bg-white px-6 py-3 text-ofc-accent shadow-none hover:bg-white/95 sm:w-auto`}
            >
              Échanger sur mon besoin
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
