'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Mail } from 'lucide-react';
import { CTA_RDV_LABEL } from '@/lib/cta-rdv-label';
import { CONTACT } from '@/lib/constants';
import { trackClicVisio } from '@/lib/ga4-analytics';
import { buildPrendreRdvHref } from '@/lib/prendre-rdv-href';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

const VISIO_SRC = 'accueil-cta-final';

/** CTA final accueil — bandeau maquette (titre | filet | texte | pilule visio + email). */
export function AccueilCtaFinalSection() {
  const pathname = usePathname();
  const visioHref = buildPrendreRdvHref(VISIO_SRC);

  return (
    <section className="bg-white py-8 md:py-10" aria-labelledby="accueil-cta-final">
      <div className={`${OFC_SECTION_INNER} accueil-maquette__inner px-4 sm:px-6 lg:px-8`}>
        <div className="accueil-maquette-cta-final rounded-2xl bg-[#101936] px-5 py-6 md:px-8 md:py-7 lg:px-9 lg:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 xl:gap-8">
            <div className="flex min-w-0 flex-col gap-6 lg:flex-1 lg:flex-row lg:items-center lg:gap-7 xl:gap-9">
              <h2
                id="accueil-cta-final"
                className="shrink-0 font-display font-extrabold leading-[1.12] text-white lg:max-w-[13.5rem] xl:max-w-[15rem]"
              >
                <span className="block text-[1.125rem] md:text-xl lg:text-[1.35rem]">
                  Trouvons la formation adaptée à votre
                </span>
                <span className="mt-0.5 block text-base md:text-lg lg:text-[1.2rem]">métier</span>
              </h2>

              <div
                className="hidden w-px shrink-0 self-stretch bg-white/30 lg:block lg:min-h-[4.25rem]"
                aria-hidden
              />

              <p className="min-w-0 max-w-md text-sm font-normal leading-relaxed text-white/85 md:text-[0.9375rem] lg:max-w-[16rem] lg:text-[0.9375rem] xl:max-w-[18rem] xl:text-base">
                Un échange pour définir vos besoins, vos objectifs et le format le plus adapté.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-stretch gap-2.5 lg:items-end lg:pl-2">
              <Link
                href={visioHref}
                data-cta="visio"
                className="accueil-maquette-cta-final__pill inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-[#377CF3] shadow-sm transition hover:bg-white/95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:w-auto lg:max-w-[15.5rem] xl:max-w-[17rem]"
                aria-label={CTA_RDV_LABEL}
                onClick={() => {
                  const pagePath =
                    typeof window !== 'undefined' ? window.location.pathname : pathname || 'unknown';
                  trackClicVisio(VISIO_SRC, pagePath);
                }}
              >
                <Mail className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                <span className="min-w-0 text-left text-[11px] font-semibold leading-snug sm:text-xs lg:text-[0.8125rem]">
                  {CTA_RDV_LABEL}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
              </Link>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center justify-start gap-2 text-xs text-white/90 transition hover:text-white sm:text-sm lg:justify-end"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
