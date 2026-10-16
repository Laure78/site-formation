import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CTA_RDV_LABEL } from '@/lib/cta-rdv-label';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

/** CTA final — orientation si hésitation entre plusieurs formations. */
export function AccueilCtaFinalSection() {
  return (
    <section
      className="px-4 py-16 md:py-20 lg:py-24"
      aria-labelledby="accueil-cta-final"
    >
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
          <Eyebrow className="justify-center text-white/75">
            Formation IA pour le BTP
          </Eyebrow>
          <h2
            id="accueil-cta-final"
            className="mt-4 font-display text-xl font-extrabold tracking-tight text-balance md:text-2xl lg:text-[1.75rem]"
          >
            Vous hésitez entre plusieurs formations&nbsp;?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-[1.65] text-white/90 md:text-lg">
            Échangeons sur vos missions et le niveau de votre équipe.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={`${LINKS.prendreRdv}?src=accueil-cta-final`}
              data-cta="rdv"
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center border-0 bg-white px-6 py-3 text-ofc-accent shadow-none hover:bg-white/95 sm:w-auto`}
            >
              {CTA_RDV_LABEL}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
