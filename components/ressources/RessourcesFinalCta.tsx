import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import { LINKS } from '@/lib/internal-links';
import { RESSOURCES_HUB_CTA_FORMATIONS_PHOTO } from '@/lib/ressources-hub-photos';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

export function RessourcesFinalCta() {
  const photo = RESSOURCES_HUB_CTA_FORMATIONS_PHOTO;

  return (
    <section
      id="formation-cta"
      aria-labelledby="ressources-final-cta-heading"
      className="scroll-mt-28 border-t border-slate-200 bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-white py-12 md:py-16"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
        <div className="max-w-xl text-center lg:text-left">
          <h2
            id="ressources-final-cta-heading"
            className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Passez de la ressource à la pratique
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Passez du guide au{' '}
            <Link
              href={LINKS.parcoursMetiers}
              className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
            >
              parcours métier
            </Link>{' '}
            ou à une{' '}
            <Link
              href={LINKS.formations}
              className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
            >
              session catalogue Qualiopi
            </Link>{' '}
            — formations IA BTP en présentiel en Île-de-France, sur vos DCE, devis et documents de
            chantier.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href={LINKS.formations}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center gap-2 px-6 py-3 text-base`}
            >
              Découvrir les formations IA BTP
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
            <CtaVisio
              src="cmp-ressources-RessourcesFinalCta"
              variant="secondary"
              className="inline-flex min-h-11 items-center justify-center px-6 py-3"
            />
          </div>
          <p className="mt-6 text-sm text-slate-600">
            <Link
              href={LINKS.diagnostic}
              className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
            >
              Diagnostic IA BTP gratuit
            </Link>
          </p>
        </div>

        <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200/80 shadow-lg lg:max-w-[46%]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover object-[center_30%]"
            sizes="(max-width: 1024px) 100vw, 480px"
            quality={80}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
