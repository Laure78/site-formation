import Link from 'next/link';
import Image from 'next/image';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { GoogleBusinessProfileCta } from '@/components/GoogleBusinessProfileCta';
import { StatCallout } from '@/components/readability/StatCallout';
import { HomeDeferredClientsLogos } from '@/components/landing/HomeDeferredClientsLogos';
import { FFBIAAccrocheSection } from '@/components/landing/FFBIAAccrocheSection';
import { PHOTOS } from '@/lib/photos';
import { OFC_INNER_ACCENT_BAND } from '@/lib/ofc-section-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Preuve sociale unifiée — référence partenaires + logos clients + accroche FFB/CSFE. */
export function AccueilPreuveSocialeSection() {
  return (
    <section
      className={OFC_SEC.whiteMesh}
      aria-labelledby="preuve-sociale-reference-heading"
    >
      <div className="mx-auto max-w-7xl min-w-0 space-y-10 md:space-y-14 lg:space-y-16">
        <div className={`${OFC_INNER_ACCENT_BAND} !mt-0 overflow-hidden rounded-2xl !px-5 py-8 sm:!px-8 sm:py-10 md:!px-10 md:py-12`}>
          <div className="flex min-w-0 flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="min-w-0 max-w-xl shrink-0">
              <Reveal>
                <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">
                  Référence & partenaires
                </p>
                <h2
                  id="preuve-sociale-reference-heading"
                  className="mt-4 font-display text-2xl font-bold text-white md:text-3xl"
                >
                  FFB, CSFE… une formation IA plébiscitée par le réseau pro
                </h2>
                <p className="mt-4 text-white/90">
                  Devis, chantier, appels d&apos;offres : cas réels, gains concrets — pas de gadget.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/a-propos#clients-partenaires"
                    className="ofc-on-accent-link w-full sm:w-auto"
                  >
                    Voir les clients & partenaires
                  </Link>
                  <GoogleBusinessProfileCta variant="inverse" label="Ma fiche Google" className="w-full sm:w-auto" />
                </div>
              </Reveal>
              <RevealGroup className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:gap-4" staggerMs={50}>
                <div className="flex flex-col justify-center rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-left text-sm text-white/95 backdrop-blur-sm sm:py-4">
                  <span className="font-semibold">Indicateurs Qualiopi</span>
                  <span className="mt-1 text-xs text-white/80">
                    Volume formé et satisfaction — sourcing en tête de page
                  </span>
                </div>
                <StatCallout
                  variant="inverse"
                  className="rounded-2xl border border-white/25 bg-white/10 px-2 py-3 backdrop-blur-sm sm:px-4 sm:py-4"
                  value="OPCO"
                  label="financement possible"
                />
              </RevealGroup>
            </div>
            <div className="relative aspect-[4/3] min-h-[14rem] w-full min-w-0 overflow-hidden rounded-2xl border border-white/25 bg-black/10 sm:aspect-auto sm:min-h-[22rem] lg:min-h-[28rem] lg:max-w-[min(100%,32rem)] xl:min-h-[32rem] xl:max-w-[36rem]">
              <Image
                src={PHOTOS.accueilReferencePartenairesLaureOFC2026.src}
                alt={PHOTOS.accueilReferencePartenairesLaureOFC2026.alt}
                title={PHOTOS.accueilReferencePartenairesLaureOFC2026.title}
                fill
                loading="lazy"
                className="object-cover object-[center_15%]"
                sizes="(max-width: 1024px) 100vw, 576px"
              
                quality={70}/>
            </div>
          </div>
        </div>

        <HomeDeferredClientsLogos embedded />

        <FFBIAAccrocheSection embedded />
      </div>
    </section>
  );
}
