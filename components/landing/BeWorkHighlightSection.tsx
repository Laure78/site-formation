'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';
import { LINKS } from '@/lib/internal-links';
import { BEWORK_PHOTO_HERO } from '@/lib/bework-photos';
import { Reveal } from '@/components/motion/Reveal';
import { OFC_SEC } from '@/lib/ofc-section-classes';

type Props = {
  /** Ancre pour TOC / liens profonds (ex. a-propos#bework). */
  id?: string;
  /** Bande grise accueil ou carte intégrée dans un article long. */
  surface?: 'band' | 'card';
};

/**
 * Mise en avant BeWork — solutions IA sur mesure BTP (site externe), distinct des formations OFC Qualiopi.
 */
export function BeWorkHighlightSection({ id, surface = 'band' }: Props) {
  const isCard = surface === 'card';
  const headingId = id ? 'bework-heading' : 'bework-heading-home';

  return (
    <Reveal
      as="section"
      id={id}
      distance={16}
      aria-labelledby={headingId}
      className={
        isCard
          ? 'scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8'
          : OFC_SEC.mutedMesh
      }
    >
      <div className={isCard ? '' : 'ofc-section-inner'}>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5A5A5A]">
              Solutions IA sur mesure · BTP
            </p>
            <p className="mt-1 text-sm font-medium text-[#377CF3]">Autour de vos métiers, méthodes et outils</p>

            <h2
              id={headingId}
              className="mt-4 font-display text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-3xl"
            >
              Imaginez ce que l&apos;IA pourrait faire pour votre entreprise
              {id ? (
                <span className="a-propos-title-accent mt-3 block h-1 rounded-full bg-[#377CF3]" aria-hidden />
              ) : null}
            </h2>

            <p className="mt-4 text-base font-semibold leading-relaxed text-[#1A1A1A] md:text-lg">
              BeWork conçoit applications, automatisations, assistants et plateformes métier — construits autour de
              votre façon de travailler.
            </p>

            <p className="mt-4 text-[15px] leading-relaxed text-[#5A5A5A] md:text-base">
              Service distinct des{' '}
              <span className="text-[#334155]">formations Qualiopi OFC</span>. Solutions IA sur mesure, pas de
              formation.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ExternalLinkAnchor
                href={EXTERNAL_SITE_URLS.bework}
                title="BeWork — site officiel bework.fr (nouvel onglet)"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(55,124,243,0.12)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#2A6BD9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#377CF3] focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                Parler de mon besoin
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
              </ExternalLinkAnchor>
              <Link
                href={`${LINKS.bework}#bework-solutions`}
                className="inline-flex items-center justify-center rounded-lg border border-[#377CF3] bg-white px-5 py-3 text-sm font-semibold text-[#377CF3] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#EFF6FF] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                Voir ce que nous pouvons créer
              </Link>
            </div>
            <p className="mt-4 text-sm text-[#64748B]">
              Déjà client ?{' '}
              <Link href={LINKS.beworkPlateforme} className="font-medium text-[#377CF3] hover:underline">
                Accéder à la plateforme
              </Link>
            </p>
          </div>

          <figure className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_4px_16px_rgba(55,124,243,0.08)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(55,124,243,0.14)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            <Image
              src={BEWORK_PHOTO_HERO.src}
              alt={BEWORK_PHOTO_HERO.alt}
              width={BEWORK_PHOTO_HERO.width}
              height={BEWORK_PHOTO_HERO.height}
              className="h-auto w-full transition-transform duration-500 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100"
              sizes="(min-width: 1024px) 480px, 50vw"
            />
            <figcaption className="border-t border-slate-100 px-4 py-2 text-xs text-[#5A5A5A]">
              Conception · déploiement · formation · adoption · bework.fr
            </figcaption>
          </figure>
        </div>
      </div>
    </Reveal>
  );
}
