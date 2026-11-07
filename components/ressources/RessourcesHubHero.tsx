import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { RESSOURCES_HUB_HERO_PHOTO } from '@/lib/ressources-hub-photos';
import { RESSOURCES_HUB_H1, RESSOURCES_HUB_INTRO } from '@/lib/ressources-catalog';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

/** Hero hub ressources — deux colonnes, charte parcours métiers (maquette 2026). */
export function RessourcesHubHero() {
  const photo = RESSOURCES_HUB_HERO_PHOTO;

  return (
    <section
      className="ressources-hub-hero border-b border-slate-100 bg-white"
      aria-labelledby="ressources-hero-title"
    >
      <div className="mx-auto max-w-[80rem] px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-slate-600" aria-label="Fil d'Ariane">
          <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
            <li>
              <Link href="/" className="underline decoration-slate-300 underline-offset-2 hover:text-[#377CF3]">
                Accueil
              </Link>
            </li>
            <li className="text-slate-400" aria-hidden>
              /
            </li>
            <li className="font-medium text-[#101936]" aria-current="page">
              Ressources
            </li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto grid max-w-[80rem] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-14">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#377CF3]">
            Ressources gratuites · IA BTP
          </p>
          <h1 id="ressources-hero-title" className="ofc-type-hero mt-4 text-balance text-[#101936]">
            {RESSOURCES_HUB_H1}
          </h1>
          <p className="ofc-type-lead mt-4 text-balance text-[#101936]">{RESSOURCES_HUB_INTRO}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="#guides-pdf"
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
            >
              Explorer les ressources
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
            <Link
              href="#bibliotheque-ressources"
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
            >
              <Play className="h-4 w-4 shrink-0" aria-hidden />
              Voir les tutoriels
            </Link>
          </div>
        </div>

        <div className="relative min-h-0 w-full">
          <figure className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
