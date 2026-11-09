import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Layers } from 'lucide-react';
import type { ParcoursComputed } from '@/data/catalogue-2027';
import { libelleDureeParcoursHeures } from '@/data/catalogue-2027';
import { parcoursHref } from '@/lib/catalogue-2027/parcours-href';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { PARCOURS_METIERS_CARD_IMAGE } from '@/lib/parcours-metiers-page-content';

const BADGE_OUVERTURE_2027 = 'Ouverture 2027' as const;
const MODULARITE_MENTION = 'Modules à la carte' as const;

export type ParcoursMetierCardProps = {
  parcours: ParcoursComputed;
  /** Description synthétique — une phrase distincte par métier. */
  description: string;
};

/**
 * Carte parcours métier — hub / grilles (alignée fiches /formations/parcours/*).
 */
export function ParcoursMetierCard({ parcours: p, description }: ParcoursMetierCardProps) {
  const image = PARCOURS_METIERS_CARD_IMAGE[p.id];
  const ficheHref = parcoursHref(p.id);
  const duree = libelleDureeParcoursHeures(p.dureeHeures);

  return (
    <article
      className="group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-50 transition-shadow hover:shadow-md"
      aria-labelledby={`parcours-card-title-${p.id}`}
    >
      {image ? (
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100">
          <span className="absolute left-3 top-3 z-10 rounded-lg bg-[#377CF3] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
            {BADGE_OUVERTURE_2027}
          </span>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
        <h3
          id={`parcours-card-title-${p.id}`}
          className="font-display text-lg font-semibold text-balance text-[#101936]"
        >
          {p.titre}
        </h3>
        <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-sm leading-relaxed text-slate-600">{description}</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">{MODULARITE_MENTION}</p>

        <dl className="mt-4 space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
            <dt className="sr-only">Modules</dt>
            <dd>
              <span className="font-medium text-[#101936]">{p.moduleCount}</span> modules
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
            <dt className="sr-only">Durée totale</dt>
            <dd>
              Durée totale : <span className="font-medium text-[#101936]">{duree}</span>
            </dd>
          </div>
        </dl>

        <div className="mt-auto pt-5">
          <Link
            href={ficheHref}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-4 py-2.5 text-sm`}
          >
            Découvrir le parcours
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
